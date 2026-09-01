# Rifat's Website — Index Page

## What's in this build

```
rifat-site/
├── index.html              ← the home page
├── css/style.css           ← all styling (one file, used by every page)
├── js/
│   ├── partials.js         ← navbar + footer markup + injection (edit here)
│   └── main.js              ← theme toggle, top-3 updates grid
├── assets/
│   ├── banner.svg           ← animated hero banner — one file, used on the
│   │                          site (via <img>) and on GitHub, identically
│   ├── favicon.svg          ← browser-tab icon (RI monogram)
│   └── profile.jpg         ← placeholder — replace with your real photo
└── README.md
```

## Hero banner + dark/light mode

`assets/banner.svg` is loaded as a plain `<img>` — the same file works on
GitHub (profile README, repo banner, anywhere you'd embed an image) and
on the site. Its light/dark coloring is built into the file itself via
`prefers-color-scheme`, so it follows the **visitor's operating system**
setting automatically, wherever it's used. That's different from the
rest of the site, whose theme follows your manual toggle switch — a
minor inconsistency, but far simpler and more reliable than keeping two
copies in sync. If you'd rather it match the site's manual toggle
exactly, that's possible too, just say so and I'll wire it back up.

## Favicon

`assets/favicon.svg` is the browser-tab icon — same gradient mark as the
navbar logo. SVG favicons are supported in all current major browsers.
Add the same `<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">`
tag to each new page's `<head>` (see the page skeleton below).

Design: dark-navy / off-white toggle, **DM Serif Display** for headings and
your name, **Outfit** for body text, **JetBrains Mono** for small
telemetry-style labels — matching the fonts your current portfolio already
uses. The animated waveform line in the hero and section divider is the
one recurring visual motif ("signal"), tying to your embedded systems /
communications background.

## What changed from the last version

- **Navbar/footer now work everywhere.** They used to be loaded with
  `fetch()` from separate files, which browsers block when you open a page
  directly (double-clicking `index.html` uses the `file://` protocol, and
  `fetch()` of local files is blocked there — that's what "JS can't
  connect" was). They're now plain JS strings in `js/partials.js`, injected
  straight into the page. No server needed to preview, and it still works
  the same way on GitHub Pages.
- **Hero is now a compact banner**, sized to the same 1584:396 proportions
  as a LinkedIn cover photo, sitting right below the navbar. It scrolls
  away normally as you scroll down — no parallax, no sticky behavior.
- **Photo + quick links + short description are now one section** (`.profile`),
  not two. Photo on the left; name, role, short bio, and quick links
  stacked together on the right.
- **Latest updates is now a static grid of your 3 most recent items** —
  no horizontal auto-scroll.

## 1. Preview it locally

You can now just double-click `index.html` and it will work. If you'd
rather run it through a local server (closer to how GitHub Pages serves
it), that still works too:

```bash
cd rifat-site
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## 2. Add your real content

| What | Where | How |
|---|---|---|
| Your photo | `assets/profile.jpg` | Replace the file (keep the same name, or update the `src` in `index.html`) |
| Resume | `assets/resume.pdf` | Add this file — the "Resume" quick link points to it |
| Hero slide text | `index.html` → `.slide` blocks | Edit the 4 `<article class="slide">` blocks directly |
| Short description | `index.html` → `.short-desc` paragraph | Edit the text directly |
| Quick links | `index.html` → `.quick-links` | Edit the `<li>` items |
| Latest updates (top 3) | `js/main.js` → `UPDATES` array | Keep the newest item first — only the first 3 show. Add/remove entries freely |
| Nav links / footer links | `js/partials.js` → `NAVBAR_HTML` / `FOOTER_HTML` | Edit once, applies to every page site-wide |

## 3. Building the other 6 pages

Each new page (`experience.html`, `achievements.html`, `research.html`,
`projects.html`, `blogs.html`, `notes.html`) should reuse this shell so
the navbar/footer/theme toggle work everywhere. `education.html` is
already built — see the section below for how it works.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Experience — Mohammad Rifatul Islam Marof</title>
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
<link rel="stylesheet" href="css/style.css">
</head>
<body data-page="experience"> <!-- match: experience / achievements / research / projects / blogs / notes -->

<a href="#main" class="skip-link">Skip to content</a>
<div id="navbar-placeholder"></div>

<main id="main" style="padding-top: var(--nav-h);">
  <!-- your page content goes here -->
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

Each entry looks like this:

```js
{
  id: 'bsc-cou',                 // unique, used for the panel's element id
  institution: 'Comilla University',
  logo: 'assets/logos/comilla-university.svg',
  degree: 'B.Sc. Engineering in Information & Communication Technology (ICT)',
  subject: 'ICT',                // shown next to the session
  session: '2020–2021',
  result: '3.68 / 4.00 CGPA · 12th in department',
  years: '22 February 2022 – July 2026 (Graduated)',
  courses: ['Data Structure', '…'],       // optional — omit or [] to hide
  achievements: ['…'],                    // optional — omit or [] to hide
  gallery: [{ src: 'assets/gallery/x.jpg', alt: '…' }], // optional
  note: 'Free-text note shown at the end' // optional
}
```

`courses`, `achievements`, `gallery`, and `note` are all optional — leave
any of them out (or as an empty array) and that section just doesn't
render, instead of showing an empty heading. That's why the M.Sc. and
SSC cards look leaner than the B.Sc. one right now.

**Logos** are placeholder badges (`assets/logos/*.svg`, initials on a
gradient circle) — swap them for the real institution logos whenever you
have them; same filenames, same folder, any image format works since
it's just an `<img src="…">`.

**Gallery** is built and ready to use but empty everywhere right now — add
entries to any card's `gallery` array to start showing photos there.

**Expand/collapse** is a plain accordion: opening a card closes whichever
one was open. Clicking the open card's button again collapses it. No
data to edit for this part — it's pure behavior in `js/education.js`.

## 4. Blog / Notes pages (card grid linking to Medium/Notion)

Still not built in this pass. The plan from earlier still stands: a
`posts.json` file (title, excerpt, image, external URL, platform)
rendered as cards on `blogs.html`, so publishing a new post means adding
one JSON entry instead of new HTML. Say the word and I'll build
`blogs.html` and `notes.html` next.

## 5. Deploying

Drop this whole folder into your `rifat-cou.github.io` repo root (it will
replace your current `index.html` — back that up first) and push. If
you've bought a custom domain, add a `CNAME` file at the repo root as
covered previously.
