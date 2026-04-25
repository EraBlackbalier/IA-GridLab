/*
 * /public/share.js
 *
 * Loaded as a classic <script> by the lab page. Exposes a single global
 * helper `window.GridLabShare` used by the "Share" button. The script lives
 * in /public so it can be served as a static asset (no bundling) and reused
 * by exported labs.
 *
 * Responsibilities:
 *   - Encode the current lab state into a base64 URL fragment (#s=...).
 *   - Decode the fragment back into a state object on page load.
 *   - Copy the resulting share link to the clipboard.
 *
 * NOTE: We use the URL hash (instead of a query param) so the payload
 *       never hits the server logs and so very large states don't run
 *       into URL-length limits as quickly.
 */
(function () {
  'use strict';

  /** UTF-8 safe base64. */
  function toB64(str) {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /** Inverse of toB64. */
  function fromB64(b64) {
    const padded = b64.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(escape(atob(padded)));
  }

  /**
   * Builds the share URL for a given state object and copies it to the
   * clipboard. Returns the URL so callers can also display it.
   */
  async function share(state) {
    const json = JSON.stringify(state);
    const payload = toB64(json);
    const url = `${location.origin}${location.pathname}#s=${payload}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      // Clipboard API can fail on insecure contexts — fall back to prompt().
      window.prompt('Copy this share link:', url);
    }
    return url;
  }

  /**
   * If the current URL contains an `#s=...` fragment, decode it and return
   * the embedded state. Otherwise returns null.
   */
  function readFromHash() {
    const m = /#s=([^&]+)/.exec(location.hash);
    if (!m) return null;
    try {
      return JSON.parse(fromB64(m[1]));
    } catch (err) {
      console.warn('[gridlab] Could not decode shared state:', err);
      return null;
    }
  }

  window.GridLabShare = { share: share, readFromHash: readFromHash };
})();
