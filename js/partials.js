/**
 * partials.js
 * The navbar and footer markup live here as plain JS strings and get
 * injected on every page. This is deliberate: earlier this used fetch()
 * to load separate navbar.html/footer.html files, but fetch() of local
 * files is blocked by the browser when a page is opened directly
 * (file://) instead of through a server — that's what broke it.
 * Plain JS injection works everywhere: double-clicked locally, a local
 * server, or GitHub Pages. No setup required.
 *
 * TO EDIT THE NAVBAR OR FOOTER: change the strings below. The change
 * applies to every page automatically — nothing else to update.
 */

const NAVBAR_HTML = `
<nav class="navbar">
  <div class="wrap">
    <a href="index.html" class="brand" aria-label="M Rifatul Islam — Home">
      <img src="assets/favicon.ico" alt="Rifatul Islam">
      <span class="brand-name">M Rifatul <em>Islam </em>Marof</span>
    </a>

    <div class="nav-right">
      <button class="nav-toggle-btn" id="navToggleBtn" aria-expanded="false" aria-controls="navLinks" aria-label="Open menu">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>

      <ul class="nav-links" id="navLinks">
        <li><a href="education.html" data-page="education">Education</a></li>
        <li><a href="experience.html" data-page="experience">Experience</a></li>
        <li><a href="achievements.html" data-page="achievements">Achievements</a></li>
        <li><a href="research.html" data-page="research">Research</a></li>
        <li><a href="projects.html" data-page="projects">Projects</a></li>
        <li><a href="blogs.html" data-page="blogs">Blogs</a></li>
        <li><a href="notes.html" data-page="notes">Notes</a></li>
      </ul>

      <button class="theme-toggle" id="themeToggle" role="switch" aria-checked="false" aria-label="Toggle dark and light mode">
        <span class="knob" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand" aria-label="M Rifatul Islam — Home">
          <img src="assets/favicon.ico" alt="Rifatul Islam">
          <span class="brand-name">M Rifatul <em>Islam </em>Marof</span>
        </a>
        <p>ICT Engineer &amp; AI/ML researcher based in Cumilla, Bangladesh. Building explainable AI, embedded systems, and the occasional automation script.</p>
      </div>

      <div class="footer-col">
        <h3>Sitemap</h3>
        <ul>
          <li><a href="education.html">Education</a></li>
          <li><a href="experience.html">Experience</a></li>
          <li><a href="achievements.html">Achievements</a></li>
          <li><a href="research.html">Research</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Work</h3>
        <ul>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="blogs.html">Blogs</a></li>
          <li><a href="notes.html">Notes</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h3>Connect</h3>
        <ul>
          <li><a href="mailto:rifat.jm223@gmail.com">Email</a></li>
          <li><a href="https://github.com/rifat-cou" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://linkedin.com/in/rifatmi71" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://linktr.ee/rifat.cou" target="_blank" rel="noopener">Linktree</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© <span id="footerYear">2026</span> Mohammad Rifatul Islam Marof. All rights reserved.</span>
      <span class="status">Cumilla, Bangladesh — Open to remote work</span>
    </div>
  </div>
</footer>`;

(function () {
  function injectPartials() {
    const navEl = document.getElementById('navbar-placeholder');
    const footEl = document.getElementById('footer-placeholder');
    if (navEl) navEl.outerHTML = NAVBAR_HTML;
    if (footEl) footEl.outerHTML = FOOTER_HTML;
  }

  function markActiveLink() {
    const current = document.body.getAttribute('data-page');
    if (!current) return;
    document.querySelectorAll('.nav-links a[data-page]').forEach((a) => {
      if (a.getAttribute('data-page') === current) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function setFooterYear() {
    const y = document.getElementById('footerYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  function wireMobileNav() {
    const btn = document.getElementById('navToggleBtn');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      })
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectPartials();
    markActiveLink();
    setFooterYear();
    wireMobileNav();
    window.dispatchEvent(new Event('partials:ready'));
  });
})();
