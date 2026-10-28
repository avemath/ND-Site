# Nicholas Domke's portfolio site

This is your portfolio site: a longer version of your resume, with your projects,
your experience, and a little about you. It lives in your GitHub account and is
hosted for free on GitHub Pages (GitHub's service that turns a repo into a website).
Ave (GitHub: avemath) built it and is a collaborator on the repo, so she can help
keep it up to date.

It's just plain HTML, CSS, and JavaScript files. There's no build step (nothing to
compile or convert first) and nothing to install. Almost everything you'll want to
change is in one file, `content.js`.

Live site: https://nmdomke.github.io/
Printable resume: https://nmdomke.github.io/resume.html

## What the site looks like

The design is based on nothing.tech:

- The big lettering is dot-matrix type, using Doto, a free Google font.
- The page has a black top section (the hero) and a black contact section. In
  between, the sections take turns:
  - About and Experience are a light grey (#EFF0F2).
  - Projects and Skills are one shade darker (#E4E6E9) with a faint dot grid, like
    a drafting table. The cards on them are white with a thin border and a soft
    shadow, so they sit on the grey like sheets of paper.
  - The coursework strip and "Off the clock" are blueprint blue (#1450A8), drawn
    like blueprint paper with a grid.
- The featured project gets a big white card at the top of the Projects section,
  with a blue stripe along its top edge. On a wide screen its picture and spec table
  stay in view on the left while the text scrolls past.
- Under it, the welding arm and USV path planning get full-width cards with the
  picture and text side by side. The rest of the projects sit in a grid of smaller
  cards packed like bricks, so there are no empty gaps between them. Each card
  decides on its own width whether its picture sits beside the text or above it.
- Four big numbers (SolidWorks years, robots built, regionals won, years as a
  driver) sit in a white title-block card on the bottom edge of the black top
  section, half on it and half on About. They count up the first time you see them.
- The menu opens full screen.
- The top section has a grid of dots that reacts to the mouse.
- Each project has a line drawing that sketches itself in as you scroll to it.
- The welding arm card shows your real CAD as a 3D model, drawn in the same line
  style, with your end effector in blue. Hovering over the card (or tapping it on a
  phone) pulls the end effector apart like an exploded view on an assembly drawing,
  and you can drag the arm to turn it a little.
- Headings "decode" into place, like a scrambled sign settling.

A few engineering touches, since you're a mechanical engineer:

- The footer looks like the title block in the corner of an engineering drawing.
- A gear in the top bar turns as you scroll.
- The top bar shows which section you're in, like a sheet label on a drawing.
- On a computer, the mouse pointer in the top section becomes a CAD crosshair. It
  snaps to the dot grid and shows X/Y coordinates in inches.
- Each row of the timeline in the Experience section links to that project card or job.
  Under the timeline, the jobs are listed as a change log, like the revision table on
  an engineering drawing: Date, Role, Organization, and What I did, newest first, with
  current roles marked Now. Selecting a job on the timeline scrolls to its line and
  highlights it. Each line can link to its project cards (`cards` in `content.js`),
  and `segments` splits one timeline row into separate bars (the two server jobs).
- Skills is four groups (CAD, Code and controls, Fabrication, Equipment and
  standards) inside one thin title-block frame. Under each skill, the projects it
  was used on are grey links: hovering a skill outlines those project cards, and
  selecting a project jumps to its card. On a wide screen the groups sit in two
  columns; `sheet: 1` or `sheet: 2` on a group in `content.js` picks its column.
- In "Off the clock", the piano and the guitar are playable (the guitar is in
  standard tuning and shows the note you played), and the drone's propellers spin
  when you hover over or tap its card.
- Right after the project cards, "Five robots, four seasons" shows your five
  WildStang robots like the revision block on a drawing, REV A (2019) through REV E
  (2022). Selecting one opens its details. On a phone the robots scroll sideways.
- On a computer, hovering over a card (a project or a hobby) selects it
  like a part in CAD: the card lifts a little, its border turns blue, and small
  corner brackets snap in around it. Tabbing into a card with the keyboard does
  the same thing.

If a visitor has "reduce motion" turned on in their device settings, the animations
turn off automatically.

## The files

| File | What it is |
|---|---|
| `content.js` | **All of the site's text and links. This is the only file you need to edit.** |
| `index.html` | The main page's structure, plus the link preview tags (what shows up when the link is shared) |
| `resume.html` | Your resume as a web page, built from `content.js` and styled like your PDF. No phone number. Visitors can print it or download your PDF |
| `assets/Nicholas_Domke_Resume.pdf` | Your resume PDF (the Download PDF buttons). No phone number |
| `assets/css/style.css` | How the main page looks |
| `assets/css/resume.css` | How the resume page looks, on screen and printed |
| `assets/js/render.js` | Builds the main page from `content.js` |
| `assets/js/resume.js` | Builds the resume page from `content.js` |
| `assets/js/drawings.js` | The project line drawings (used until photos replace them) |
| `assets/js/model3d.js` | The 3D model viewer on the welding arm card |
| `assets/js/content-guard.js` | If `content.js` has a mistake, this shows a message with the line number instead of a blank page |
| `assets/models/` | The 3D model file (`welding-arm.glb`), made from your CAD |
| `assets/og.png` | The preview image that shows up when the link is shared in a text, on LinkedIn, or in Slack |
| `assets/favicon.svg`, `assets/apple-touch-icon.png` | The little "N" icon in browser tabs, search results, and on phone home screens |
| `assets/img/` | Project photos. Each one has its location and camera data removed and is under 300 KB |
| `assets/video/` | Short silent clips, like your path planning simulation (an MP4, a WebM, and a still frame) |
| `404.html` | The page people see if they go to an address on the site that doesn't exist |
| `sitemap.xml`, `robots.txt` | A list of the site's pages for search engines, and a note pointing them to it |
| `.nojekyll` | A hidden, empty file that tells GitHub Pages to serve the files as they are. Leave it. |
| `.github/` | The automatic check that runs on `content.js` every time you save a change to GitHub (see below) |

## Editing the content

Open `content.js` and follow the notes at the top. The short version:

- **Placeholders:** anything in `[square brackets]` shows up on the site in blue
  with a dashed underline, so it's easy to find. Replace it and delete the brackets.
- **Drafts:** putting `draft: true` on an item hides it from the site and the resume
  page until it's ready.
- **Hiding one field:** set it to `""` (empty quotes).
- **Photos:** each project shows the first thing it has, in this order: a `video`,
  then an `image`, then its line drawing (`art`). A video plays silently on a loop
  while it's on screen, with a Play/Pause button.
- **Tabs:** a card's picture area can have tabs, like "Drawing / Photos (2)" on the
  featured card or "3D model / Wiring / Photo" on the welding arm. The Wiring tab is
  your wiring schematic, redrawn in `assets/js/drawings.js`; its part notes are in
  `content.js`. The first tab is the card's usual picture; each other tab is a list
  of photos with captions, shown one at a time with arrows. To add a tab, copy one
  of the entries under `tabs`.
- **Spotlights:** `spotlight: 1` and `spotlight: 2` on a project make it one of the
  full-width cards under the featured one (now the welding arm, then USV path
  planning). Leave it off to put a project in the grid of smaller cards.
- **Second photo:** a project card can also show a smaller second photo under its
  bullets, with a small caption. Fill in `image2`, `image2Alt`, and
  `image2Caption`. Leave `image2` as `""` to hide it.
- **Results:** `result` on a project adds a highlighted line about how it turned out.
  Leave it `""` until there's a real one.
- **Spec table:** `specs` on the featured project is the small table (Role, CAD,
  Materials, and so on). When it's filled in, it shows instead of the tool pills
  (the small rounded labels).
- **Resume page:** the `resume` block in `content.js` is your resume PDF, line for
  line and in the same order (education, experience, skills, projects). The resume
  page is built from it and styled like your PDF: Times New Roman style font, black
  on white, two printed pages with Projects starting on the second. When your resume
  changes, update that block and replace `assets/Nicholas_Domke_Resume.pdf`
  together. Before adding a new PDF, check it has no phone number and that it links
  to the site's current address.
- **Resume PDF:** `resumePdf` under `links` is your PDF. The Resume button at the top
  and bottom of the main page has a small "PDF" half that downloads it, and the
  resume page has a Download PDF button next to Print. Leave `resumePdf` as `""`
  to hide those.
- **Revision letter:** `revision` is the REV box in the footer. Bump the letter
  (C to D, and so on) when the site gets a real update.
- **If something's wrong after an edit,** the page shows a message with the line
  number. See "If the page shows an error" below.

## Making common edits

### Two ways to edit

**On github.com (easiest):** open the repo, click `content.js`, then click the pencil
icon (top right of the file). Make your change, click **Commit changes...** (GitHub's
word for saving), add a short note about what you changed, and click **Commit
changes** again. The live site updates in about a minute.

**On your computer:** download the repo (the green **Code** button, then **Download
ZIP**, or clone it with Git), edit `content.js` in any text editor, and preview it
(see "Previewing on your computer" at the bottom). Then upload the changed files on
github.com (**Add file > Upload files**), or push them with Git.

Every time a change is saved to GitHub, an automatic check reads `content.js`. A
green check next to the commit means it's fine. A red X means it found a problem:
click the X, then **Details**, and it tells you the line number and what's wrong
(a missing comma, a date the timeline can't read, or a photo file that isn't there).
The check only looks; it never changes or blocks anything, so the site still
publishes either way. Fix the line and commit again.

The top of `content.js` has copy-paste templates for the edits below.

### Add a project card

1. In `content.js`, find `projects: [`.
2. Copy the "ADD A PROJECT CARD" template from the top of the file and paste it
   where you want the card (the order in the list is the order on the page).
3. Fill in the title, role, dates, a one-line hook, and the bullets. Dates look like
   `"Jan 2027 to May 2027"` or `"Jan 2027 to now"`; the timeline adds the project
   on its own.
4. For a picture, add a photo (below), or leave `image` as `""` for now.

### Add an Experience row

1. Find `experience: [` (newest first) and paste the "ADD AN EXPERIENCE ROW"
   template.
2. Fill in the role, organization, place, dates, and what you did. Use `"now"` as the
   end date for a current job; it gets a Now tag.
3. To link it to project cards, list their exact titles in `cards`.
4. The resume page keeps its own copy of each job (under `resume:`, matching the
   PDF), so add it there too, and update the PDF (below).

### Add a skill

1. Find `skills: [` and pick the group: CAD, Code and controls, Fabrication, or
   Equipment and standards.
2. Paste `{ tool: "Tool Name", note: "", usedOn: ["Project Name"] },` into that
   group's `items` list.
3. `usedOn` takes exact project titles, so each one becomes a link to that card.
   `note` is the small grey label next to the name (leave it `""` if there isn't one).
4. The resume page's Skills lines are under `resume:` > `skills`.

### Add or swap a photo

1. Get the photo ready: remove its location and camera data (EXIF), make it 2000
   pixels wide or less, and keep it under about 300 KB. squoosh.app (free, in the
   browser) does all three: open the photo, set the width, and download the result.
   Don't use photos that show other people's faces.
2. On github.com, open the `assets/img` folder, click **Add file > Upload files**,
   drop the photo in, and commit.
3. In `content.js`, set the card's `image` to `"assets/img/your-photo.jpg"` and
   write `imageAlt` (what the photo shows, for screen readers).
4. To swap a photo, upload the new one with the same file name (it replaces the
   old one), or upload it with a new name and change `image`.

### Add drone photos

1. Get each photo ready the same way (no location data, 2000 pixels wide or less,
   under about 300 KB) and upload them to `assets/img/`.
2. In `content.js`, find the drone item under `hobbies:` and fill in its `photos`
   list (the "DRONE PHOTOS" template). 3 to 6 look best. They replace the drone
   drawing.

### Hide something until it's ready (drafts)

Add `draft: true,` to any item (a project, a job, a skill group) and it's hidden
from the site and the resume page. Delete the line to show it again.

### Update the resume PDF

1. Export the new PDF and name it `Nicholas_Domke_Resume.pdf`.
2. Check it has no phone number, and that its portfolio link is the site's current
   address (https://nmdomke.github.io/).
3. On github.com, open the `assets` folder, click **Add file > Upload files**, drop
   in the new PDF (it replaces the old one), and commit.
4. Update the `resume:` block in `content.js` to match, so the resume page and the
   PDF say the same thing.

### Change the "Now" line

Near the top of `content.js`, `status` is the line with the blue dot in the top
section ("Now: building a path planner ..."), and `seeking` is the line under it.
Change the text in the quotes. Set either to `""` to hide it.

### Update the numbers card

The four big numbers are under `numbers:` near the top of `content.js`. Each has a
`value` (or `since: 2018`, which counts the years on its own), a small `unit` like
`"yrs"`, and a `label` under it. `spoken` is what screen readers say instead (so
"4/5" is read as "4 of 5"); update it if you change that value.

### If the page shows an error

If `content.js` has a mistake, the site shows a box with the line number and the
lines around it instead of the page.

1. Go to that line (the mistake is usually there or on the line just above).
2. Look for a missing comma at the end of a line, a missing or extra quote, or a
   bracket that isn't closed.
3. If you can't find it, undo the edit: on github.com, open `content.js`, click
   **History**, open the last version that worked, copy all of it, then edit the
   current file, paste it in, and commit.

## Still to do

- [ ] Look over the spots marked `TODO: confirm with Nicholas` in `content.js` and
      fix anything that isn't quite right (then delete the TODO).
- [ ] Photos of your iCORE Lab work, plus any of the senior design boat. The
      BlueROV2 and WildStang photos are up (Integer approved theirs)
- [ ] Drone photos for "Off the clock" (3 to 6 is plenty). Before adding them, strip
      their location and camera data, like the other photos. They replace the drone
      drawing with a grid framed like a drone camera view
- [ ] The welding arm photo is a small copy. Swap in the full-size original
      (see the TODO next to it in `content.js`)
- [ ] Optional: link your GitHub (github.com/nmdomke) under `links` once it has
      projects on it
- [ ] Optional: add the site to Google Search Console and submit `sitemap.xml`, so
      Google finds it sooner
- [ ] Keep `content.js` (and the PDF) in sync whenever your resume changes

## GitHub Pages

The site is published from this repo by GitHub Pages. If it's ever turned off (for
example after moving the repo), turn it back on:

1. On GitHub, open the repo, then go to **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Set the branch to `main` and the folder to `/ (root)`. Click **Save**.
4. After a minute or two, the site is live at https://nmdomke.github.io/. (Because
   the repo is named `nmdomke.github.io`, the address has no repo name on the end.)

## Who can edit

The repo is yours. Ave (avemath) is a collaborator with write access, so she can
help with updates. You can see and change who has access under **Settings >
Collaborators**. If avemath isn't listed there, add her so she can keep helping.

## If the site address ever changes

Link previews and search engines need the site's full address, so it's written out
in a few places. If the address changes (for example, if the repo is renamed), update
each of these:

- `content.js`: `siteUrl` (used on the resume page and in the info for search engines)
- `index.html` (near the top): `canonical`, `og:url`, and `og:image`
- `resume.html` (near the top): `canonical`, `og:url`, and `og:image` (keep
  `resume.html` on the end of the first two)
- `sitemap.xml`: both addresses
- `robots.txt`: the sitemap address
- `404.html` (near the top): `<base href="/">`. At https://nmdomke.github.io/ it's
  `/`; if the site ever lives in a folder, like `/my-site/`, use that.
- The portfolio link in your resume PDF
- The live site line at the top of this README

## The 3D model

The welding arm model is made from your STEP files. The STEP files and the scripts
used to rebuild the model are kept outside this repo; ask Ave (avemath) for a copy.
The short version of how it's made: a converter turns the STEP assembly into one 3D
file, a cleanup script takes out the limit switch (it isn't part of the finished arm)
and gives every part a plain name, and a last step shrinks the file to about 175 KB.
The result replaces `assets/models/welding-arm.glb`.

The viewer uses three.js, a free 3D library. The site only downloads it when the
welding arm card is about to scroll into view, so it doesn't slow down the rest of
the page. If a browser can't show 3D, the card keeps its line drawing instead.

The text for the model (its label, the screen reader description, and the "Hover to
explode" hint) is in `content.js`, under the welding arm project.

## Previewing on your computer

Double-click `index.html` (or `resume.html`) to open it in your browser. That's it.
One exception: the 3D model doesn't load from a double-clicked file (browsers block
that), so the welding arm shows its line drawing. To see the model, open a terminal
in this folder, run `python3 -m http.server`, and go to http://localhost:8000.
(`404.html` only looks right on the live site, because its links start from the
site's address.)
