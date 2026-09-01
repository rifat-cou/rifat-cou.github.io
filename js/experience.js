/**
 * experience.js
 * Renders the Experience page from the EXPERIENCE array below and wires
 * up the accordion (one card open at a time, across BOTH groups —
 * opening any card closes every other one, professional or extracurricular).
 *
 * TO EDIT AN ENTRY: change the fields below. Order = display order within
 * its group, so put newest/current first.
 *
 * category: 'professional' | 'extracurricular' — decides which of the two
 *           sections a card renders in.
 * active:   true shows a green "Active" badge next to the institution name.
 *
 * responsibilities / achievements are optional — [] or omit and that block
 * is skipped. gallery is NOT optional — every card always shows a Gallery
 * block; leave it as [] and a "Coming Soon.." placeholder tile shows
 * instead. Once you have a photo, add: { src: 'assets/gallery/x.jpg',
 * caption: 'Your caption' }
 */
const EXPERIENCE = [
  {
    id: 'cousc-president',
    category: 'extracurricular',
    institution: 'Comilla University Science Club (CoUSC)',
    logo: 'assets/CoUSC.jpg',
    position: 'President',
    period: '5 March 2026 – Present',
    active: true,
    link: 'https://www.cousc.org/',
    linkLabel: 'cousc.org',
    responsibilities: ['Managing the club\u2019s digital and virtual presence'],
    achievements: [
      'Organised the Fresher\u2019s Reception, welcoming 150+ new members',
      'Led the Science Fair Project Instructor team at International Peace School and College, Cumilla'
    ],
    gallery: []
  },
  {
    id: 'cours-it-secretary',
    category: 'extracurricular',
    institution: 'Comilla University Research Society (CoURS)',
    logo: 'assets/CoURS.jpg',
    position: 'IT Secretary',
    period: '5 November 2025 – Present',
    active: true,
    link: 'https://www.facebook.com/couresearch/',
    linkLabel: 'facebook.com/couresearch',
    responsibilities: ['Managing online sessions, registration, and outreach for the society'],
    achievements: ['Organised a webinar on the EMJM / Erasmus Mundus Scholarship with 150+ participants'],
    gallery: []
  },
  {
    id: 'cousc-it-secretary',
    category: 'extracurricular',
    institution: 'Comilla University Science Club (CoUSC)',
    logo: 'assets/CoUSC.jpg',
    position: 'IT Secretary',
    period: '16 September 2024 – 4 March 2026',
    active: false,
    link: 'https://www.cousc.org/',
    linkLabel: 'cousc.org',
    responsibilities: [
      'Conducted robotics sessions at BARD Model School, Cumilla',
      'Maintained the club\u2019s digital workspace across Facebook, LinkedIn, and its website'
    ],
    achievements: ['Convener of the 20th Apex Astro Olympiad'],
    gallery: []
  },
  {
    id: 'cousc-wing-committee',
    category: 'extracurricular',
    institution: 'Comilla University Science Club (CoUSC)',
    logo: 'assets/CoUSC.jpg',
    position: 'Wing Committee Member',
    period: '16 October 2022 – 15 September 2024',
    active: false,
    link: 'https://www.cousc.org/',
    linkLabel: 'cousc.org',
    responsibilities: ['Joined the club\u2019s school robotics outreach campaign'],
    achievements: ['Co-convener of the 2nd National Science Fest'],
    gallery: []
  },
  {
    id: 'cousc-member',
    category: 'extracurricular',
    institution: 'Comilla University Science Club (CoUSC)',
    logo: 'assets/CoUSC.jpg',
    position: 'Member',
    period: '1 April 2022 – 15 October 2022',
    active: false,
    link: 'https://www.cousc.org/',
    linkLabel: 'cousc.org',
    responsibilities: [],
    achievements: ['Attended the JUSC National Science Fest, Poster Presentation segment'],
    gallery: []
  },
  {
    id: 'sciencebee-editor',
    category: 'professional',
    institution: 'Science Bee',
    logo: 'assets/ScienceBee.jpg',
    position: 'News Editor',
    period: '1 October 2024 – 31 August 2025',
    active: false,
    link: 'https://www.sciencebee.com.bd',
    linkLabel: 'sciencebee.com.bd',
    responsibilities: [
      'Edited and refined drafts from contributing researchers before publication',
      'Guided new researchers on sourcing and structuring science news',
      'Managed and maintained the team\u2019s WordPress publishing site'
    ],
    achievements: [
      'Edited 10+ published science news pieces',
      'Led a 3-member research team within the wider 10-member editorial team'
    ],
    gallery: []
  },
  {
    id: 'sciencebee-researcher',
    category: 'professional',
    institution: 'Science Bee',
    logo: 'assets/ScienceBee.jpg',
    position: 'News Researcher',
    period: '15 April 2024 – September 2024',
    active: false,
    link: 'https://www.sciencebee.com.bd',
    linkLabel: 'sciencebee.com.bd',
    responsibilities: [
      'Sourced science news from renowned international outlets',
      'Wrote original science news content for Bengali-speaking readers'
    ],
    achievements: [
      'Published news reaching 2,000+ readers across roughly 10 pieces',
      'Worked within a 10-member editorial team',
      'Co-wrote a science-fiction piece for the platform',
      'Helped register around 30 participants for a platform initiative'
    ],
    gallery: []
  }
];

function expDetailBlocks(e) {
  let blocks = '';

  if (e.responsibilities && e.responsibilities.length) {
    blocks += `
    <div class="exp-block">
      <span class="eyebrow">Responsibilities</span>
      <ul class="exp-resp-list">${e.responsibilities.map((r) => `<li>${r}</li>`).join('')}</ul>
    </div>`;
  }

  if (e.achievements && e.achievements.length) {
    blocks += `
    <div class="exp-block">
      <span class="eyebrow">Achievements</span>
      <ul class="exp-achieve-list">${e.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>
    </div>`;
  }

  // Gallery always renders — real items if present, otherwise one
  // "Coming Soon.." placeholder tile.
  const galleryItems = (e.gallery && e.gallery.length)
    ? e.gallery.map((g) => `
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
    <div class="exp-block">
      <span class="eyebrow">Gallery</span>
      <div class="exp-gallery">${galleryItems}</div>
    </div>`;

  return blocks;
}

function expCardHTML(e) {
  const badge = e.active ? '<span class="status-badge is-active">Active</span>' : '';
  return `
  <article class="exp-card" id="${e.id}">
    <div class="exp-head">
      <div class="exp-logo"><img src="${e.logo}" alt="${e.institution} logo"></div>
      <div class="exp-summary">
        <div class="exp-title-row">
          <h3 class="exp-institution">${e.institution}</h3>
          ${badge}
        </div>
        <p class="exp-position">${e.position}</p>
        <p class="exp-meta">
          <span class="exp-period">${e.period}</span>
          <span class="dot">&middot;</span>
          <a class="exp-link" href="${e.link}" target="_blank" rel="noopener">${e.linkLabel} ↗</a>
        </p>
      </div>
    </div>

    <div class="exp-foot">
      <button class="exp-toggle" aria-expanded="false" aria-controls="${e.id}-panel">
        <span class="exp-toggle-label">Expand</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
          <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div class="exp-panel" id="${e.id}-panel">
      <div class="exp-panel-inner">
        <div class="exp-details">${expDetailBlocks(e)}</div>
      </div>
    </div>
  </article>`;
}

function renderExperience() {
  const proList = document.getElementById('expProfessionalList');
  const extraList = document.getElementById('expExtracurricularList');
  if (!proList || !extraList) return;

  const professional = EXPERIENCE.filter((e) => e.category === 'professional');
  const extracurricular = EXPERIENCE.filter((e) => e.category === 'extracurricular');

  proList.innerHTML = professional.map(expCardHTML).join('');
  extraList.innerHTML = extracurricular.map(expCardHTML).join('');

  wireExpAccordion();
}

// Accordion spans BOTH groups — opening any card closes every other one,
// professional or extracurricular alike.
function wireExpAccordion() {
  const cards = Array.from(document.querySelectorAll('.exp-card'));

  function closeAll() {
    cards.forEach((c) => {
      c.classList.remove('is-open');
      const b = c.querySelector('.exp-toggle');
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.exp-toggle-label').textContent = 'Expand';
    });
  }

  cards.forEach((card) => {
    const btn = card.querySelector('.exp-toggle');
    btn.addEventListener('click', () => {
      const willOpen = !card.classList.contains('is-open');
      closeAll();
      if (willOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.exp-toggle-label').textContent = 'Collapse';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderExperience);
