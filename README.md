# Rifat's Website

## What's in this build

```
rifat-site/
├── index.html                     ← home page
├── education.html                 ← Education (accordion cards)
├── experience.html                ← Experience (Professional + Extracurricular)
├── projects.html                  ← Projects (accordion cards)
├── research.html                  ← Research (accordion cards + metrics)
├── achievements.html              ← placeholder — "Coming Soon"
├── blogs.html                     ← placeholder — "Coming Soon"
├── notes.html                     ← placeholder — "Coming Soon"
├── css/style.css                  ← all styling, one file, used by every page
├── js/
│   ├── partials.js                ← navbar + footer markup + injection (edit here)
│   ├── main.js                    ← theme toggle, top-3 updates grid (index only)
│   ├── education.js               ← EDUCATION data + accordion behavior
│   ├── experience.js              ← EXPERIENCE data + accordion behavior
│   ├── projects.js                ← PROJECTS data + accordion behavior
│   └── research.js                ← RESEARCH data + accordion behavior
├── assets/
│   ├── banner.svg                 ← animated hero banner (also usable on GitHub)
│   ├── Profile.jpg                ← your photo
│   ├── Logo_of_Comilla_University.png
│   ├── Bakalia_Government_College_logo.svg
│   ├── south-satkania-golambari-high-school.svg
│   ├── CoUSC.jpg
│   ├── CoURS.jpg
│   ├── ScienceBee.jpg
│   └── redketchup/                ← generated favicon package (see below)
├── Projects/
│   └── bangla-voice-form/         ← the Bangla Speech Study tool, live at this path
│       ├── index.html
│       ├── Code.gs
│       └── README.md
└── README.md
```

Design: dark-navy / off-white toggle, **DM Serif Display** for headings and
your name, **Outfit** for body text, **JetBrains Mono** for small
telemetry-style labels. The animated waveform line in the hero and section
dividers is the one recurring visual motif ("signal"), tying to your
embedded systems / communications background.

**Layout fix in this pass:** every interior page (Education, Experience,
Projects, Research, and the three placeholders) was rendering its
heading partly hidden behind the fixed navbar — clearance had only ever
been handled locally, on the homepage's hero, not globally. `main {
padding-top: var(--nav-h); }` in `css/style.css` now handles it for
every page at once; `.page-head`'s own padding was trimmed slightly
since the two no longer need to compensate for each other.

## Reconciled with your real files (this pass)

You'd swapped in real assets since the last build, so this pass updated
every reference to match what's actually in your repo instead of my
placeholders:

- **Logos** — `education.js` and `experience.js` now point at
  `Logo_of_Comilla_University.png`, `Bakalia_Government_College_logo.svg`,
  `south-satkania-golambari-high-school.svg`, `CoUSC.jpg`, `CoURS.jpg`, and
  `ScienceBee.jpg` — your real files, not the old `assets/logos/*` placeholders.
- **Favicon** — every page's `<head>` now links the full icon set from
  `assets/redketchup/` (favicon.ico, 16×16, 32×32, apple-touch-icon,
  manifest) instead of the old single `favicon.svg`, which no longer
  exists in your tree.
- **Profile photo** — fixed a real bug: the HTML referenced
  `assets/profile.jpg` (lowercase) but your file is `Profile.jpg`
  (capital P). Harmless on Windows/Mac, but GitHub Pages' server is
  case-sensitive — that mismatch would have 404'd on the live site.

**Two things in your tree I didn't touch, worth a look when you get a
chance:**
- `partials/navbar.html` and `partials/footer.html` — these are dead
  files from an earlier version, before the navbar/footer moved into
  `js/partials.js` to fix the "JS can't connect" bug. Nothing loads them
  anymore; safe to delete.
- `files/` — looks like a leftover copy of an earlier delivery (old
  `assets/logos/*.svg` filenames, a duplicate `style.css`, etc.), sitting
  outside the live site structure. Probably safe to delete too, but
  flagging rather than assuming.
- `assets/favicon.ico`, `favicon.png`, `favicon_32.png` — loose files at
  the assets root, separate from the `redketchup/` package. If those
  predate the `redketchup/` set, they're likely redundant.

## Hero banner + dark/light mode

`assets/banner.svg` is loaded as a plain `<img>` — the same file works on
GitHub (profile README, repo banner, anywhere you'd embed an image) and
on the site. Its light/dark coloring is built into the file itself via
`prefers-color-scheme`, so it follows the **visitor's operating system**
setting automatically, wherever it's used — different from the rest of
the site, which follows your manual toggle switch. Simpler and more
reliable than keeping two copies in sync; say the word if you'd rather
it match the manual toggle exactly instead.

## Favicon

`assets/redketchup/` is a generated favicon package — every page links
`favicon.ico`, the 16×16 and 32×32 PNGs, `apple-touch-icon.png`, and
`site.webmanifest`. One thing I couldn't verify from here: favicon
generators usually assume their output sits at your site's root, and
`site.webmanifest` may reference icon paths that don't account for being
nested inside `redketchup/`. If the manifest icons don't show up
correctly (mainly affects "Add to Home Screen" on mobile), open
`site.webmanifest` and check its icon `src` paths start with
`assets/redketchup/`.

## 1. Preview it locally

Double-click any `.html` file and it works directly — no server needed
(the navbar/footer are plain JS, not fetched). Running it through a
local server works too, and is closer to how GitHub Pages serves it:

```bash
cd rifat-site
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## 2. Placeholder pages, and building real ones later

All 7 nav links now go somewhere. Education, Experience, Projects, and
Research have real content. `achievements.html`, `blogs.html`, and
`notes.html` are placeholders — same navbar/footer/theme toggle as
every other page, just a centered "Not yet ready. Coming Soon...."
message (the `.coming-soon` styles in `css/style.css`) instead of
content.

When you're ready to build one of them for real, replace what's inside
`<main>` — everything else (head, navbar, footer, scripts) is already
wired up correctly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Achievements — Mohammad Rifatul Islam Marof</title>
<link rel="icon" href="assets/redketchup/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="assets/redketchup/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/redketchup/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/redketchup/apple-touch-icon.png">
<link rel="manifest" href="assets/redketchup/site.webmanifest">
<link rel="stylesheet" href="css/style.css">
</head>
<body data-page="achievements"> <!-- match: achievements / blogs / notes -->

<a href="#main" class="skip-link">Skip to content</a>
<div id="navbar-placeholder"></div>

<main id="main">
  <!-- replace the placeholder .coming-soon block with real content here -->
</main>

<div id="footer-placeholder"></div>
<script src="js/partials.js"></script>
<script src="js/main.js"></script>
</body>
</html>
```

The `data-page` value on `<body>` must match a `data-page` attribute on
the corresponding link inside `NAVBAR_HTML` in `js/partials.js` — that's
what underlines the current page in the nav.

## The Education page (accordion cards)

`education.html` renders itself from the `EDUCATION` array in
`js/education.js` — nothing about the entries lives in the HTML. Cards
show latest-first, in the order given in the array.

```js
{
  id: 'bsc-cou',
  institution: 'Comilla University',
  logo: 'assets/Logo_of_Comilla_University.png',
  degree: 'B.Sc. Engineering in Information & Communication Technology (ICT)',
  subject: 'ICT',
  session: '2020–2021',
  result: '3.68 / 4.00 CGPA · 12th in department',
  years: '22 February 2022 – July 2026 (Graduated)',
  courses: ['Data Structure', '…'],       // optional — omit or [] to hide
  achievements: ['…'],                    // optional — omit or [] to hide
  gallery: [{ src: 'assets/gallery/x.jpg', alt: '…' }], // optional
  note: 'Free-text note shown at the end' // optional
}
```

`courses`, `achievements`, `gallery`, and `note` are optional — leave any
of them out (or as `[]`) and that section just doesn't render, instead of
showing an empty heading.

## The Experience page (Professional + Extracurricular)

`experience.html` renders from the `EXPERIENCE` array in
`js/experience.js`. Each entry has a `category` of `'professional'` or
`'extracurricular'`, which decides which of the two centered sections it
lands in — order within each section is newest-first, so put current
roles first.

```js
{
  id: 'cousc-president',
  category: 'extracurricular',
  institution: 'Comilla University Science Club (CoUSC)',
  logo: 'assets/CoUSC.jpg',
  position: 'President',
  period: '5 March 2026 – Present',
  active: true,                    // shows the green "Active" badge
  link: 'https://www.cousc.org/',
  linkLabel: 'cousc.org',
  responsibilities: ['…'],         // optional
  achievements: ['…'],             // optional
  gallery: []                      // NOT optional — see below
}
```

**The accordion spans both sections** — opening a card in Professional
closes an open one in Extracurricular too, not just within its own group.

**Gallery is always shown**, unlike Education's — every card renders a
Gallery block, and an empty `gallery: []` shows a dashed "+ Coming
Soon.." placeholder tile rather than hiding the section. Add
`{ src, caption }` entries once you have photos for a role.

## The Projects page (accordion cards)

`projects.html` renders from the `PROJECTS` array in `js/projects.js`,
same accordion pattern, newest first.

```js
{
  id: 'checkpox',
  type: 'webapp',        // 'webapp' | 'android' | 'robotics' | 'staticsite' | 'datatool'
  name: 'CheckPox',
  tagline: 'One line describing the project',
  period: '2025–2026',   // optional — omit if there's no clean date range
  live: false,            // true shows a green "Live" badge
  tech: ['FastAPI', 'SQLite'],       // shown as small chips
  links: [{ label: 'GitHub', href: '…' }],   // any number of links
  features: ['…'],        // optional
  gallery: []              // NOT optional — same "Coming Soon.." pattern as Experience
}
```

`type` picks one of five hand-drawn icons (browser window, phone, robot
head, globe, microphone) shown in the card's logo slot — there's no
per-project logo image to source, so this substitutes a category glyph
instead. The Bangla Speech Study card links to `Projects/bangla-voice-form/`
since it lives in this same repo, not a separate one.

## The Research page (accordion cards + metrics)

`research.html` renders from the `RESEARCH` array in `js/research.js`,
same accordion shell as Education/Experience/Projects, with two things
added for academic work: a headline result line on the collapsed card,
and a metrics grid in the expanded panel for quantitative results.

```js
{
  id: 'poxnetx',
  type: 'thesis',          // 'thesis' | 'journal' | 'conference'
  name: 'PoxNetX — Deep Ensemble Framework for …',
  tagline: 'One or two sentences — what the work is and why it matters',
  overview: 'Longer paragraph — shown in the expanded panel',
  advisor: 'Khondokar Oliullah',        // optional
  period: 'Assigned 1 Sep 2025 · Submitted 25 Jun 2026',  // optional
  status: 'Manuscript in progress for submission to an Elsevier journal', // optional
  dataset: 'Fourteen public datasets, five classes',  // optional
  headline: '94.07% Accuracy · 0.9937 AUC',   // shown on the collapsed card
  links: [{ label: 'GitHub', href: '…' }],
  contributions: ['…'],     // optional — bullet list
  metrics: [{ label: 'Accuracy', value: '94.07%' }, /* … */],  // optional
  gallery: []               // NOT optional — same "Coming Soon.." pattern as Experience
}
```

There's only one entry right now — the array is built to hold more
(a future M.Sc. paper, a conference submission) without any template
changes, same as every other data-driven page on this site.

## Blog / Notes pages (card grid linking to Medium/Notion)

Still not built. The plan from earlier still stands: a `posts.json` file
(title, excerpt, image, external URL, platform) rendered as cards, so
publishing a new post means adding one JSON entry instead of new HTML.

## Deploying

This whole folder is your `rifat-cou.github.io` repo root — push it as
one. If you've bought a custom domain, add a `CNAME` file at the repo
root as covered previously. `Projects/bangla-voice-form/` deploys along
with everything else automatically since it's just a subfolder; it'll be
live at `rifat-cou.github.io/Projects/bangla-voice-form/`.