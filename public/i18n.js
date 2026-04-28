/**
 * i18n.js — Client-side internationalisation for IA GridLab.
 *
 * Supports two languages: Spanish (es) and English (en).
 * Spanish is the default language.
 *
 * Usage:
 *   1. Add `data-i18n="key"` to any element whose text should be translated.
 *   2. For placeholder attributes, use `data-i18n-placeholder="key"`.
 *   3. Include this script on every page: <script src="/i18n.js" is:inline></script>
 *   4. The script reads the preferred language from localStorage('gridlab-lang')
 *      and applies translations on DOMContentLoaded.
 *   5. A toggle button with id="lang-toggle" switches between ES ↔ EN.
 *
 * Translation keys follow this convention:
 *   - Landing page:  nav_*, hero_*, form_*, how_title, how_sub, how_N_t, how_N_d,
 *                     adv_title, adv_sub, adv_N_t, adv_N_d, footer
 *   - Lab page:      lab_placeholder, lab_unsaved, lab_saved, cinema_*, lab_hint_*
 */
(function () {
  'use strict';

  /** @type {Record<string, Record<string, string>>} */
  var T = {
    es: {
      /* ── Navigation ── */
      nav_newlab:       'Nuevo lab',

      /* ── Hero ── */
      hero_sub:         'Compara lo que cada IA codifica, lado a lado.',
      form_count_label: '\u00bfCu\u00e1ntas IAs?',
      form_reto_label:  'Nombre del reto',
      form_reto_ph:     'Snake Game, landing animada, dashboard',
      form_submit:      'Crear GridLab',
      form_default_reto:'Sin t\u00edtulo',

      /* ── How it works ── */
      how_title: '\u00bfC\u00f3mo se usa?',
      how_sub:   'Seis pasos para sacarle el m\u00e1ximo provecho a IA GridLab.',
      how_1_t: 'Configura la sesi\u00f3n',
      how_1_d: 'En la pantalla principal elige cu\u00e1ntas IAs quieres comparar (de 1 a 6) y escribe el nombre del reto, por ejemplo \u00abSnake Game\u00bb o \u00abLanding animada\u00bb.',
      how_2_t: 'Abre el lab',
      how_2_d: 'Haz clic en \u00abCrear GridLab\u00bb. Se generar\u00e1 un id \u00fanico de sesi\u00f3n y ser\u00e1s redirigido al laboratorio con todas las celdas listas para trabajar.',
      how_3_t: 'Escribe o pega el prompt',
      how_3_d: 'En la pesta\u00f1a Prompt de cada celda escribe exactamente el texto que le enviaste a esa IA. Esto sirve como referencia para reproducir el experimento m\u00e1s adelante.',
      how_4_t: 'Pega el c\u00f3digo generado',
      how_4_d: 'Ve a la pesta\u00f1a C\u00f3digo y pega el HTML/CSS/JS que te devolvi\u00f3 la IA. El editor Monaco con resaltado de sintaxis se activa autom\u00e1ticamente al primer uso.',
      how_5_t: 'Previsualiza en tiempo real',
      how_5_d: 'Abre la pesta\u00f1a Resultado para ver el c\u00f3digo corriendo en un iframe sandboxed. Haz clic en Refresh para actualizar, Open para abrirlo en nueva pesta\u00f1a o Fullscreen para maximizarlo.',
      how_6_t: 'Compara y comparte',
      how_6_d: 'Usa los botones de vista (Grid, Solo c\u00f3digo, Solo resultado, Focus, 1v1) para analizar los resultados. Comparte el estado completo con un link o exporta un HTML autocontenido.',

      /* ── Advantages ── */
      adv_title: '\u00bfPor qu\u00e9 IA GridLab?',
      adv_sub:   'Construido para developers que quieren tomar decisiones basadas en evidencia.',
      adv_1_t: 'Cero backend',
      adv_1_d: 'Todo corre en tu navegador. No hay servidor que mantener, no hay base de datos, no hay costos de infraestructura.',
      adv_2_t: 'Autosave instant\u00e1neo',
      adv_2_d: 'El estado de cada sesi\u00f3n se guarda autom\u00e1ticamente en localStorage cada 2 segundos. Cierra el tab y al volver todo sigue ah\u00ed.',
      adv_3_t: 'Previews seguros',
      adv_3_d: 'Cada resultado corre en un iframe con sandbox estricto. El c\u00f3digo de las IAs no puede acceder a tu sesi\u00f3n ni al DOM del lab.',
      adv_4_t: 'Editor Monaco',
      adv_4_d: 'El mismo motor de VS Code, cargado desde CDN solo cuando lo necesitas. Resaltado HTML/CSS/JS, indentaci\u00f3n autom\u00e1tica y formato con un click.',
      adv_5_t: 'Share links',
      adv_5_d: 'El estado completo del lab \u2014prompts, c\u00f3digo y nombres\u2014 se codifica en base64 en la URL. Un link y tu equipo ve exactamente lo mismo que t\u00fa.',
      adv_6_t: 'Exportaci\u00f3n HTML',
      adv_6_d: 'Genera un archivo HTML autocontenido con prompts, c\u00f3digo y previews embebidos. Perfecto para archivar benchmarks o enviar por email.',
      adv_7_t: 'Modos de vista',
      adv_7_d: 'Grid completo, solo c\u00f3digo, solo resultado, foco en una IA o duelo 1v1. Cambia de modo con un click sin perder ning\u00fan dato.',
      adv_8_t: 'Deploy en segundos',
      adv_8_d: 'Al ser un sitio 100% est\u00e1tico (Astro output:static) se despliega gratis en Vercel, Netlify o GitHub Pages sin ninguna configuraci\u00f3n extra.',

      /* ── Footer ── */
      footer: 'Construido con Astro \u00b7 Tailwind \u00b7 sin backend \u2014 MIT',

      /* ── Lab page ── */
      lab_placeholder:  'Reto sin t\u00edtulo',
      lab_cinema_hint:  'Usa las flechas para navegar',
    },

    en: {
      /* ── Navigation ── */
      nav_newlab:       'New lab',

      /* ── Hero ── */
      hero_sub:         'Compare what each AI codes, side by side.',
      form_count_label: 'How many AIs?',
      form_reto_label:  'Challenge name',
      form_reto_ph:     'Snake Game, animated landing, dashboard',
      form_submit:      'Create GridLab',
      form_default_reto:'Untitled',

      /* ── How it works ── */
      how_title: 'How to use it?',
      how_sub:   'Six steps to get the most out of IA GridLab.',
      how_1_t: 'Set up the session',
      how_1_d: 'On the main screen, choose how many AIs you want to compare (1 to 6) and type the challenge name, e.g. "Snake Game" or "Animated Landing".',
      how_2_t: 'Open the lab',
      how_2_d: 'Click "Create GridLab". A unique session ID will be generated and you\'ll be redirected to the lab with all cells ready to work.',
      how_3_t: 'Write or paste the prompt',
      how_3_d: 'In the Prompt tab of each cell, type the exact text you sent to that AI. This serves as a reference to reproduce the experiment later.',
      how_4_t: 'Paste the generated code',
      how_4_d: 'Go to the Code tab and paste the HTML/CSS/JS the AI returned. The Monaco editor with syntax highlighting activates automatically on first use.',
      how_5_t: 'Preview in real time',
      how_5_d: 'Open the Result tab to see the code running in a sandboxed iframe. Click Refresh to update, Open to view in a new tab, or Fullscreen to maximize it.',
      how_6_t: 'Compare and share',
      how_6_d: 'Use the view buttons (Grid, Code only, Result only, Focus, 1v1) to analyze results. Share the full state with a link or export a self-contained HTML file.',

      /* ── Advantages ── */
      adv_title: 'Why IA GridLab?',
      adv_sub:   'Built for developers who want to make evidence-based decisions.',
      adv_1_t: 'Zero backend',
      adv_1_d: 'Everything runs in your browser. No server to maintain, no database, no infrastructure costs.',
      adv_2_t: 'Instant autosave',
      adv_2_d: 'Each session\u2019s state is automatically saved to localStorage every 2 seconds. Close the tab and everything is still there when you come back.',
      adv_3_t: 'Secure previews',
      adv_3_d: 'Each result runs in a strictly sandboxed iframe. AI-generated code cannot access your session or the lab\u2019s DOM.',
      adv_4_t: 'Monaco editor',
      adv_4_d: 'The same engine as VS Code, loaded from CDN only when needed. HTML/CSS/JS highlighting, auto-indent, and one-click formatting.',
      adv_5_t: 'Share links',
      adv_5_d: 'The full lab state \u2014 prompts, code, and names \u2014 is base64-encoded in the URL. One link and your team sees exactly what you see.',
      adv_6_t: 'HTML export',
      adv_6_d: 'Generate a self-contained HTML file with embedded prompts, code, and previews. Perfect for archiving benchmarks or sending by email.',
      adv_7_t: 'View modes',
      adv_7_d: 'Full grid, code only, result only, focus on one AI, or 1v1 duel. Switch modes with one click without losing any data.',
      adv_8_t: 'Deploy in seconds',
      adv_8_d: 'Being a 100% static site (Astro output:static), it deploys for free on Vercel, Netlify, or GitHub Pages with zero extra configuration.',

      /* ── Footer ── */
      footer: 'Built with Astro \u00b7 Tailwind \u00b7 no backend \u2014 MIT',

      /* ── Lab page ── */
      lab_placeholder:  'Untitled challenge',
      lab_cinema_hint:  'Arrow keys to navigate',
    },
  };

  /** Default language. */
  var DEFAULT_LANG = 'es';

  /** Read preferred language from localStorage, fallback to default. */
  function getLang() {
    try { return localStorage.getItem('gridlab-lang') || DEFAULT_LANG; }
    catch (_) { return DEFAULT_LANG; }
  }

  /** Save preferred language to localStorage. */
  function setLang(lang) {
    try { localStorage.setItem('gridlab-lang', lang); } catch (_) {}
  }

  /**
   * Apply translations for the given language to all elements with
   * data-i18n or data-i18n-placeholder attributes.
   *
   * @param {string} lang - Language code ('es' or 'en').
   */
  function applyLanguage(lang) {
    var dict = T[lang];
    if (!dict) return;

    // Translate textContent
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key && dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update toggle button label
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'es' ? 'EN' : 'ES';
      btn.title = lang === 'es' ? 'Switch to English' : 'Cambiar a Espa\u00f1ol';
    }
  }

  /** Toggle between ES and EN. */
  function toggleLanguage() {
    var current = getLang();
    var next = current === 'es' ? 'en' : 'es';
    setLang(next);
    applyLanguage(next);
  }

  // Expose for external use (e.g. lab page form handler)
  window.GridLabI18n = {
    T: T,
    getLang: getLang,
    setLang: setLang,
    applyLanguage: applyLanguage,
    toggleLanguage: toggleLanguage,
  };

  // Apply on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    var lang = getLang();
    applyLanguage(lang);

    // Wire toggle button
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggleLanguage);
  });
})();
