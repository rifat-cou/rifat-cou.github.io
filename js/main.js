/**
 * main.js
 * Theme toggle + "latest updates" grid (top 3).
 * The hero banner (assets/banner.svg) is a self-contained animated SVG —
 * it needs no JS at all, it animates on its own via SMIL/CSS.
 * Runs after partials.js injects the navbar (listens for 'partials:ready').
 */

/* ---------------------------------------------------------------------
   1. THEME TOGGLE
   Persists via localStorage on the real deployed site. Falls back to
   the visitor's OS preference on first visit.
--------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  function getStored() {
    try { return localStorage.getItem('rifat-theme'); } catch (e) { return null; }
  }
  function store(value) {
    try { localStorage.setItem('rifat-theme', value); } catch (e) { /* storage unavailable — theme just won't persist */ }
  }

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = getStored() || (prefersLight ? 'light' : 'dark');
  applyTheme(initial);

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    if (toggle) toggle.setAttribute('aria-checked', String(theme === 'light'));
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      store(next);
    });
  }
}

/* ---------------------------------------------------------------------
   2. LATEST UPDATES — top 3, static (no scrolling)
   Edit the UPDATES array below. Keep the most recent item first — only
   the first 3 entries are shown. Tags: 'blog' | 'research' | 'achievement' | 'notes'
--------------------------------------------------------------------- */
const UPDATES = [
  { tag: 'research', title: 'PoxNetX thesis — 20-model CNN ensemble benchmark entering final write-up', date: 'Jul 2026' },
  { tag: 'achievement', title: 'CoUSC 2026 recruitment drive crosses 200 active members', date: 'Jun 2026' },
  { tag: 'blog', title: 'Grad-CAM vs LIME: choosing the right XAI tool for medical imaging', date: 'Jun 2026' },
  { tag: 'notes', title: 'New notes uploaded: Optical Fiber Communication, full semester', date: 'May 2026' },
  { tag: 'achievement', title: 'Completed Git & GitHub certification, IBM / Coursera', date: 'Jun 2025' },
  { tag: 'research', title: 'CheckPox web app deployed — FastAPI + 6-model ensemble voting', date: 'Apr 2026' },
];

function renderTicker() {
  const grid = document.getElementById('tickerTrack');
  if (!grid) return;

  const itemHTML = (u) => `
    <div class="ticker-item">
      <span class="tag" data-tag="${u.tag}">${u.tag}</span>
      <span class="ti-title">${u.title}</span>
      <span class="ti-date">${u.date}</span>
    </div>`;

  grid.innerHTML = UPDATES.slice(0, 3).map(itemHTML).join('');
}

/* ---------------------------------------------------------------------
   Init — theme runs immediately; nav-dependent bits wait for partials
--------------------------------------------------------------------- */
initTheme();
renderTicker();

window.addEventListener('partials:ready', () => {
  // Re-bind theme toggle now that the real navbar (with #themeToggle) exists.
  initTheme();
});
