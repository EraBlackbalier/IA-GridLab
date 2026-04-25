/**
 * Tiny localStorage helper for IA GridLab.
 *
 * Each lab is identified by a short id taken from the URL (`/lab/<id>`).
 * All data for that lab is serialized as JSON under a single namespaced
 * key: `gridlab:<id>`.
 *
 * Shape of the persisted object:
 * {
 *   reto:    "Snake Game",
 *   count:   3,
 *   updated: 1715379200000,
 *   instances: [
 *     { name: "AI #1", prompt: "...", code: "..." },
 *     ...
 *   ]
 * }
 */

export interface LabInstance {
  /** Editable label shown in the cell header. */
  name: string;
  /** Prompt the user sent to that AI. */
  prompt: string;
  /** Full HTML/CSS/JS the AI returned. */
  code: string;
}

export interface LabState {
  reto: string;
  count: number;
  updated: number;
  instances: LabInstance[];
}

const PREFIX = 'gridlab:';

/** True when running in a browser context (Astro renders on the server too). */
const hasStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

/** Builds the storage key for a given lab id. */
export const keyFor = (id: string): string => `${PREFIX}${id}`;

/** Returns a fresh, empty lab state with N instances pre-allocated. */
export function makeEmptyState(reto: string, count: number): LabState {
  const safeCount = Math.max(1, Math.min(6, Math.floor(count)));
  return {
    reto,
    count: safeCount,
    updated: Date.now(),
    instances: Array.from({ length: safeCount }, (_, i) => ({
      name: `AI #${i + 1}`,
      prompt: '',
      code: '',
    })),
  };
}

/** Loads a lab from localStorage, or null if it doesn't exist / is corrupt. */
export function loadLab(id: string): LabState | null {
  if (!hasStorage()) return null;
  try {
    const raw = window.localStorage.getItem(keyFor(id));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LabState;
    // Minimal validation — anything malformed is discarded.
    if (!parsed || !Array.isArray(parsed.instances)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Persists a lab to localStorage. Silent on quota errors. */
export function saveLab(id: string, state: LabState): void {
  if (!hasStorage()) return;
  try {
    state.updated = Date.now();
    window.localStorage.setItem(keyFor(id), JSON.stringify(state));
  } catch (err) {
    // Quota exceeded or storage disabled — log and move on.
    console.warn('[gridlab] Could not persist lab state:', err);
  }
}

/** Removes a lab from localStorage. */
export function clearLab(id: string): void {
  if (!hasStorage()) return;
  window.localStorage.removeItem(keyFor(id));
}

/**
 * Reconciles a saved state against the current URL params.
 * If the URL says count=4 but storage has 2 instances, we grow the array.
 * If it says count=1 but we have 4, we shrink (keeping the first 1).
 */
export function reconcileWithParams(
  state: LabState,
  desiredCount: number,
  reto: string,
): LabState {
  const safe = Math.max(1, Math.min(6, Math.floor(desiredCount)));
  const next: LabState = {
    ...state,
    reto: reto || state.reto,
    count: safe,
    instances: state.instances.slice(0, safe),
  };
  while (next.instances.length < safe) {
    next.instances.push({
      name: `AI #${next.instances.length + 1}`,
      prompt: '',
      code: '',
    });
  }
  return next;
}

/**
 * Encodes a lab state into a URL-safe base64 string.
 * Used by the "Share" button to embed everything into a link.
 */
export function encodeState(state: LabState): string {
  const json = JSON.stringify(state);
  // btoa() only handles latin-1, so we URI-encode first to survive unicode.
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Inverse of `encodeState`. Throws on malformed input. */
export function decodeState(b64: string): LabState {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(escape(atob(padded)));
  return JSON.parse(json) as LabState;
}
