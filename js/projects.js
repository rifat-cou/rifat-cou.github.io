/**
 * projects.js
 * Renders the Projects page from the PROJECTS array below and wires up
 * the accordion (one card open at a time).
 *
 * TO EDIT AN ENTRY: change the fields below. Order = display order,
 * newest/most relevant first.
 *
 * type: 'webapp' | 'android' | 'robotics' | 'staticsite' | 'datatool'
 *       — picks which icon shows on the card.
 * live: true shows a green "Live" badge next to the project name.
 *
 * features are optional — [] or omit and that block is skipped.
 * gallery is NOT optional — every card always shows a Gallery block;
 * leave it as [] and a "Coming Soon.." placeholder tile shows instead.
 * Once you have a screenshot, add: { src: 'assets/gallery/x.jpg',
 * caption: 'Your caption' }
 */
const PROJECTS = [
  {
    id: 'bangla-speech-study',
    type: 'datatool',
    name: 'Bangla Speech Study — Voice Recording Form',
    tagline: 'Free, self-hosted voice data collection form for a Bangla regional dialect & emotional speech research project.',
    period: '2026',
    live: true,
    tech: ['GitHub Pages', 'RecordRTC.js', 'Google Apps Script', 'Google Drive', 'Google Sheets'],
    links: [
      { label: 'Open form', href: 'Projects/bangla-voice-form/index.html' }
    ],
    features: [
      'Records 10 Bangla sentences per participant, one per emotion, plus speaker metadata (age, gender, dialect, education, device, environment)',
      'No paid services and no participant accounts — GitHub Pages frontend, free-tier Google Apps Script backend',
      'Audio saved raw: browser echo cancellation, noise suppression, and auto-gain are explicitly disabled before recording',
      'Backend validates upload size against empty/corrupted recordings and avoids ambiguous duplicate filenames',
      'Recordings and the metadata log are organised under My Drive/Project/BanglaDialect/'
    ],
    gallery: []
  },
  {
    id: 'cousc-recruitment',
    type: 'staticsite',
    name: 'CoUSC 2026 Recruitment System',
    tagline: 'Bilingual (Bangla/English) recruitment website with automated email and ID-card generation.',
    period: '2026',
    live: true,
    tech: ['Static Site', 'Google Apps Script', 'AutoCrat'],
    links: [
      { label: 'Visit site', href: 'https://cousc2015.github.io' }
    ],
    features: [
      'Led technical delivery of the club\u2019s 2026 member recruitment drive',
      'Automated email and ID-card generation using Google Apps Script and AutoCrat',
      'Ran a sponsorship outreach campaign alongside the recruitment drive',
      'Achieved 150+ member registrations through the drive'
    ],
    gallery: []
  },
  {
    id: 'portfolio-website',
    type: 'staticsite',
    name: 'Personal Portfolio Website',
    tagline: 'This site — rebuilt from a single page into a multi-page portfolio.',
    period: '2026',
    live: true,
    tech: ['HTML/CSS/JS', 'GitHub Pages'],
    links: [
      { label: 'Visit site', href: 'https://rifat-cou.github.io' },
      { label: 'GitHub', href: 'https://github.com/rifat-cou/rifat-cou.github.io' }
    ],
    features: [
      'Rebuilt from a single-page portfolio into a multi-page site covering Education, Experience, Research, Projects, Blogs, and Notes',
      'Custom animated SVG banner and a dark/light theme toggle'
    ],
    gallery: []
  },
  {
    id: 'cgpa-calculator',
    type: 'android',
    name: 'CGPA Calculator',
    tagline: 'MVC-architecture Android CGPA calculator with a Firebase backend.',
    period: '1 January 2025 – 12 March 2025',
    live: false,
    tech: ['Android', 'MVC', 'Firebase'],
    links: [
      { label: 'GitHub', href: 'https://github.com/rifat-cou/CGPACalculator' }
    ],
    features: [
      'Built and published using MVC architecture with a Firebase backend',
      'Full documentation suite: README with Mermaid workflow diagrams, a CONTRIBUTING guide, a LICENSE, and an animated SVG workflow diagram'
    ],
    gallery: [],
    note: 'Supervised by Alimul Rajee, Assistant Professor, Department of ICT, Comilla University.'
  },
  {
    id: 'checkpox',
    type: 'webapp',
    name: 'CheckPox',
    tagline: 'Clinical skin lesion detection web app — the companion application implementing the PoxNetX thesis.',
    period: '',
    live: false,
    tech: ['FastAPI', 'SQLite', 'SQLAlchemy', 'Jinja2', 'ONNX'],
    links: [
      { label: 'GitHub', href: 'https://github.com/rifat-cou/CheckPox' }
    ],
    features: [
      'Classifies five conditions — Chickenpox, Cowpox, Measles, Monkeypox, and Normal — via ensemble majority voting across six models (EfficientNet-B0, EfficientNet-B1, and MobileNetV2, each in .pth and .onnx form)',
      'Full user flow: intake form \u2192 processing animation \u2192 results page with a per-class probability table and care guidance',
      'Mandatory doctor-consultation disclaimer; results persisted to a database',
      'Delivered as a 24-file package with setup/run/cleanup scripts and a full documentation suite (README, QUICKSTART, DEPLOYMENT, INSTALLATION)'
    ],
    gallery: []
  },
  {
    id: 'line-follower-robot',
    type: 'robotics',
    name: 'Line Follower Robot',
    tagline: 'Arduino Nano line-following robot with a 5-array IR sensor and PID control.',
    period: '1 July 2024 – September 2024',
    live: false,
    tech: ['Arduino Nano (ATmega328P)', 'PID Control', '3D-Printed Chassis'],
    links: [
      { label: 'GitHub', href: 'https://github.com/rifat-cou/Line-Follower-Robot' }
    ],
    features: [
      'Designed and built using a 5-array IR sensor and PID control',
      'Designed and 3D-printed the robot chassis',
      'Full documentation: README, CONTRIBUTING, LICENSE, and an animated SVG workflow diagram'
    ],
    gallery: [],
    note: 'Supervised by Pintu Chandra Paul, Assistant Professor, Department of ICT, Comilla University.'
  }
];

const PROJECT_ICONS = {
  webapp: '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 8.5H21" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="6.3" r=".7" fill="currentColor"/><circle cx="8.4" cy="6.3" r=".7" fill="currentColor"/></svg>',
  android: '<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="2.5" width="12" height="19" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M10 19H14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  robotics: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="12" rx="2.5" stroke="currentColor" stroke-width="1.6"/><circle cx="9" cy="14" r="1.3" fill="currentColor"/><circle cx="15" cy="14" r="1.3" fill="currentColor"/><path d="M12 8V4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="3" r="1.3" fill="currentColor"/></svg>',
  staticsite: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M3 12H21M12 3C14.5 5.8 15.8 9 15.8 12C15.8 15 14.5 18.2 12 21C9.5 18.2 8.2 15 8.2 12C8.2 9 9.5 5.8 12 3Z" stroke="currentColor" stroke-width="1.6"/></svg>',
  datatool: '<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="2.5" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 11C5.5 15 8.4 17.5 12 17.5C15.6 17.5 18.5 15 18.5 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 17.5V21.5M9 21.5H15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

function projDetailBlocks(p) {
  let blocks = '';

  if (p.features && p.features.length) {
    blocks += `
    <div class="proj-block">
      <span class="eyebrow">Key features</span>
      <ul class="proj-feature-list">${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>
    </div>`;
  }

  if (p.note) {
    blocks += `
    <div class="proj-block">
      <span class="eyebrow">Note</span>
      <p>${p.note}</p>
    </div>`;
  }

  // Gallery always renders — real items if present, otherwise a
  // "Coming Soon.." placeholder tile (same pattern as the Experience page).
  const galleryItems = (p.gallery && p.gallery.length)
    ? p.gallery.map((g) => `
      <figure>
        <img src="${g.src}" alt="${g.caption || ''}" loading="lazy">
        <figcaption>${g.caption || ''}</figcaption>
      </figure>`).join('')
    : `
      <div class="exp-gallery-placeholder">
        <span class="plus-icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </span>
        <span>Coming Soon..</span>
      </div>`;

  blocks += `
    <div class="proj-block">
      <span class="eyebrow">Gallery</span>
      <div class="exp-gallery">${galleryItems}</div>
    </div>`;

  return blocks;
}

function projCardHTML(p) {
  const badge = p.live ? '<span class="status-badge is-active">Live</span>' : '';
  const metaParts = [p.period].filter(Boolean);
  const meta = metaParts.length
    ? `<div class="proj-meta">${metaParts.map((m) => `<span>${m}</span>`).join('<span class="dot">&middot;</span>')}</div>`
    : '';
  const tech = p.tech && p.tech.length
    ? `<div class="proj-tech">${p.tech.map((t) => `<span class="tech-chip">${t}</span>`).join('')}</div>`
    : '';
  const links = p.links && p.links.length
    ? `<div class="proj-links">${p.links.map((l) => `<a class="proj-link" href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('')}</div>`
    : '';

  return `
  <article class="proj-card" id="${p.id}">
    <div class="proj-head">
      <div class="proj-icon" aria-hidden="true">${PROJECT_ICONS[p.type] || PROJECT_ICONS.webapp}</div>
      <div class="proj-summary">
        <div class="proj-title-row">
          <h3 class="proj-name">${p.name}</h3>
          ${badge}
        </div>
        <p class="proj-tagline">${p.tagline}</p>
        ${meta}
        ${tech}
        ${links}
      </div>
    </div>

    <div class="proj-foot">
      <button class="proj-toggle" aria-expanded="false" aria-controls="${p.id}-panel">
        <span class="proj-toggle-label">Expand</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="proj-panel" id="${p.id}-panel">
      <div class="proj-panel-inner">
        <div class="proj-details">${projDetailBlocks(p)}</div>
      </div>
    </div>
  </article>`;
}

function renderProjects() {
  const list = document.getElementById('projList');
  if (!list) return;
  list.innerHTML = PROJECTS.map(projCardHTML).join('');
  wireProjAccordion();
}

function wireProjAccordion() {
  const cards = Array.from(document.querySelectorAll('.proj-card'));

  function closeAll() {
    cards.forEach((c) => {
      c.classList.remove('is-open');
      const b = c.querySelector('.proj-toggle');
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.proj-toggle-label').textContent = 'Expand';
    });
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.proj-toggle');
    btn.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      closeAll();
      if (willOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.proj-toggle-label').textContent = 'Collapse';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderProjects);
