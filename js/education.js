/**
 * education.js
 * Renders the Education page from the EDUCATION array below and wires up
 * the accordion (one card open at a time — opening one closes the rest).
 *
 * TO EDIT AN ENTRY: change the fields below. TO ADD A NEW ONE: copy an
 * object and put it wherever it belongs — newest at the top, since the
 * list renders in the order given here.
 *
 * Fields that are optional — leave as an empty array/string, or omit —
 * and that whole block is skipped instead of showing an empty heading:
 *   courses, achievements, gallery, note
 *
 * gallery items look like: { src: 'assets/gallery/photo.jpg', alt: '...' }
 */
const EDUCATION = [
  {
    id: 'msc-cou',
    institution: 'Comilla University',
    location: 'Cumilla, Bangladesh',
    logo: 'assets/Logo_of_Comilla_University.png',
    degree: 'M.Sc. Engineering in Information & Communication Technology (ICT)',
    subject: 'ICT',
    session: '2024–2025',
    result: 'In progress',
    years: 'August 2026 – Present',
    courses: [],
    achievements: [],
    gallery: [],
    note: 'Just started — coursework and thesis details will be added as the program progresses. Current research interests: hybrid routing in quantum communication, and trust-related issues in explainable AI.'
  },
  {
    id: 'bsc-cou',
    institution: 'Comilla University',
    location: 'Cumilla, Bangladesh',
    logo: 'assets/Logo_of_Comilla_University.png',
    degree: 'B.Sc. Engineering in Information & Communication Technology (ICT)',
    subject: 'ICT',
    session: '2020–2021',
    result: '3.68 / 4.00 CGPA · 12th in department',
    years: '22 February 2022 – July 2026 (Graduated)',
    courses: [
      'Data Structure',
      'Algorithm Design and Analysis',
      'Object Oriented Programming (C++ &amp; Java)',
      'Database Management Systems',
      'Digital Signal Processing',
      'Artificial Intelligence and Expert System',
      'Image Processing',
      'Network Security and Cyber Law'
    ],
    achievements: [
      'Interdepartmental Programming Scholarship',
      'University Stipend — top performer, 3rd semester',
      'Recognised as best presentation-slide builder and presenter across multiple courses',
      'Thesis: PoxNetX — Deep Ensemble Framework for Viral Pox Skin Lesion Classification (Advisor: Khondokar Oliullah)'
    ],
    gallery: []
  },
  {
    id: 'hsc-bgc',
    institution: 'Bakalia Govt. College',
    location: 'Chittagong, Bangladesh',
    logo: 'assets/Bakalia_Government_College_logo.svg',
    degree: 'Higher Secondary Certificate (HSC)',
    subject: 'Science',
    session: '2017–2018',
    result: '4.17 / 5.00 GPA',
    years: '1 July 2017 – 30 April 2019',
    courses: [],
    achievements: ['Participant, Physics Olympiad, Chittagong Region'],
    gallery: []
  },
  {
    id: 'ssc-ssghs',
    institution: 'South Satkania Golambari High School',
    location: 'Chittagong, Bangladesh',
    logo: 'assets/south-satkania-golambari-high-school.svg',
    degree: 'Secondary School Certificate (SSC)',
    subject: 'Science',
    session: '2015–2016',
    result: '5.00 / 5.00 GPA',
    years: '1 January 2015 – 28 February 2017',
    courses: [],
    achievements: [],
    gallery: []
  }
];

function eduDetailBlocks(e) {
  let blocks = `
    <div class="edu-block">
      <span class="eyebrow">Years</span>
      <p>${e.years}</p>
    </div>`;

  if (e.courses && e.courses.length) {
    blocks += `
    <div class="edu-block">
      <span class="eyebrow">Highlighted coursework</span>
      <ul class="edu-course-list">${e.courses.map((c) => `<li>${c}</li>`).join('')}</ul>
    </div>`;
  }

  if (e.achievements && e.achievements.length) {
    blocks += `
    <div class="edu-block">
      <span class="eyebrow">Achievements</span>
      <ul class="edu-achieve-list">${e.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>
    </div>`;
  }

  if (e.gallery && e.gallery.length) {
    blocks += `
    <div class="edu-block">
      <span class="eyebrow">Gallery</span>
      <div class="edu-gallery">${e.gallery.map((g) => `<img src="${g.src}" alt="${g.alt || ''}" loading="lazy">`).join('')}</div>
    </div>`;
  }

  if (e.note) {
    blocks += `
    <div class="edu-block">
      <span class="eyebrow">Note</span>
      <p>${e.note}</p>
    </div>`;
  }

  return blocks;
}

function eduCardHTML(e) {
  const metaParts = [e.subject, `Session ${e.session}`].filter(Boolean);
  const meta = metaParts
    .map((m) => `<span>${m}</span>`)
    .join('<span class="dot">&middot;</span>');

  return `
  <article class="edu-card" id="${e.id}">
    <div class="edu-head">
      <div class="edu-logo"><img src="${e.logo}" alt="${e.institution} logo"></div>
      <div class="edu-summary">
        <h3 class="edu-institution">${e.institution}</h3>
        <p class="edu-degree">${e.degree}</p>
        <p class="edu-meta">${meta}</p>
        <p class="edu-result">${e.result}</p>
      </div>
    </div>

    <div class="edu-foot">
      <button class="edu-toggle" aria-expanded="false" aria-controls="${e.id}-panel">
        <span class="edu-toggle-label">Expand</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="edu-panel" id="${e.id}-panel">
      <div class="edu-panel-inner">
        <div class="edu-details">${eduDetailBlocks(e)}</div>
      </div>
    </div>
  </article>`;
}

function renderEducation() {
  const list = document.getElementById('eduList');
  if (!list) return;
  list.innerHTML = EDUCATION.map(eduCardHTML).join('');
  wireEduAccordion();
}

// Accordion: opening a card closes every other one. Clicking an already-open
// card's button collapses it again.
function wireEduAccordion() {
  const cards = Array.from(document.querySelectorAll('.edu-card'));

  function closeAll() {
    cards.forEach((c) => {
      c.classList.remove('is-open');
      const b = c.querySelector('.edu-toggle');
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.edu-toggle-label').textContent = 'Expand';
    });
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.edu-toggle');
    btn.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      closeAll();
      if (willOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.edu-toggle-label').textContent = 'Collapse';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderEducation);
