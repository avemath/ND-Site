# Nicholas Domke's portfolio site

I built this site for Nicholas Domke, and I keep it up to date. It's his portfolio
and a longer version of his resume. It's hosted for free on GitHub Pages (GitHub's
service that turns a repo into a website).

It's just plain HTML, CSS, and JavaScript files. There's no build step (nothing to
compile or convert first) and nothing to install.

Live site: https://avemath.github.io/ND-Site/
Printable resume: `resume.html` (the same address with `resume.html` on the end)

## What the site looks like

I based the design on nothing.tech:

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
  with a blue stripe along its top edge.
- The menu opens full screen.
- The top section has a grid of dots that reacts to the mouse.
- Each project has a line drawing that sketches itself in as you scroll to it.
- The welding arm card shows Nicholas's real CAD as a 3D model, drawn in the same
  line style, with his end effector in blue. Hovering over the card (or tapping it
  on a phone) pulls the end effector apart like an exploded view on an assembly
  drawing, and you can drag the arm to turn it a little.
- Headings "decode" into place, like a scrambled sign settling.

Since he's a mechanical engineer, I added a few engineering touches:

- The footer looks like the title block in the corner of an engineering drawing.
- A gear in the top bar turns as you scroll.
- The top bar shows which section you're in, like a sheet label on a drawing.
- On a computer, the mouse pointer in the top section becomes a CAD crosshair. It
  snaps to the dot grid and shows X/Y coordinates in inches.
- Each row of the timeline in the Experience section links to that project card or job.
- On a computer, hovering over a card (a project, a skill, or a hobby) selects it
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
| `resume.html` | A printable resume built from `content.js`. No phone number. Visitors can save it as a PDF |
| `assets/css/style.css` | How the main page looks |
| `assets/css/resume.css` | How the resume page looks, on screen and printed |
| `assets/js/render.js` | Builds the main page from `content.js` |
| `assets/js/resume.js` | Builds the resume page from `content.js` |
| `assets/js/drawings.js` | The project line drawings (used until photos replace them) |
| `assets/js/model3d.js` | The 3D model viewer on the welding arm card |
| `assets/models/` | The 3D model file (`welding-arm.glb`), made from Nicholas's CAD |
| `assets/og.png` | The preview image that shows up when the link is shared in a text, on LinkedIn, or in Slack |
| `assets/favicon.svg`, `assets/apple-touch-icon.png` | The little "N" icon in browser tabs, search results, and on phone home screens |
| `404.html` | The page people see if they go to an address on the site that doesn't exist |
| `sitemap.xml` | A list of the site's pages for search engines |
| `assets/img/` | Project photos. Each one has its location and camera data removed and is under 300 KB |
| `assets/video/` | Short silent clips, like his path planning simulation (an MP4, a WebM, and a still frame) |
| `.nojekyll` | A hidden, empty file that tells GitHub Pages to serve the files as they are. Leave it. |

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
- **Second photo:** the featured project can also show a second photo under its
  bullets, with a small caption. Fill in `image2`, `image2Alt`, and `image2Caption`.
  Leave `image2` as `""` to hide it.
- **Results:** `result` on a project adds a highlighted line about how it turned out.
  Leave it `""` until there's a real one.
- **Spec table:** `specs` on the featured project is the small table (Role, CAD,
  Materials, and so on). When it's filled in, it shows instead of the tool pills
  (the small rounded labels).
- **Resume bullets:** jobs and projects can have `resumePoints`, which are bullets
  used only on the resume page. I use them to keep the resume on one page.
  `resume: false` leaves a project off the resume (the two iCORE Lab cards are
  already covered under the iCORE job).
- **Revision letter:** `revision` is the REV box in the footer. Bump the letter
  (C to D, and so on) when the site gets a real update.
- **If the page goes blank after an edit,** look for a missing quote or comma.

To edit on github.com: open `content.js`, click the pencil icon, make your changes,
then click **Commit changes** (GitHub's word for saving). The live site updates in
about a minute.

## Still needed

All of his info is filled in from his October 2026 resume and his answers to my
questions. Here's what's left:

- [ ] Get his answers to the open questions at the top of `content.js` (things
      like the SARbot, the competition name, and which Arduino the arm uses)
- [ ] Photos of his iCORE Lab work (he said it's all public and he'll send some),
      plus any of the maze robot and the senior design boat. The BlueROV2 and
      WildStang photos are up (Integer approved theirs)
- [ ] Drone photos for "Off the clock" (3 to 6 is plenty)
- [ ] Have him read the tagline and the About paragraphs (I drafted them in his voice)
- [ ] Optional: link his GitHub (github.com/nmdomke) once he has projects on it
- [ ] Optional: add the site to Google Search Console and submit `sitemap.xml`, so
      Google finds it sooner
- [ ] Keep `content.js` in sync whenever his resume changes

## Turning on GitHub Pages

1. On GitHub, open the repo, then go to **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Set the branch to `main` and the folder to `/ (root)`. Click **Save**.
4. After a minute or two, the site is live at
   `https://<username>.github.io/<repo-name>/`
   (right now that's `https://avemath.github.io/ND-Site/`).

## Handing it off to Nicholas

When I hand this off to Nicholas, I'll do one of these:

- **Transfer the repo** (this keeps the full history of changes): go to
  Settings > General > Danger Zone > Transfer ownership, and enter his GitHub
  username. Then he turns on Pages in his copy (steps above). The address becomes
  `https://<his-username>.github.io/ND-Site/`.
  - After the transfer, he adds me (avemath) as a collaborator with write access, so
    I can keep updating it. That's under Settings > Collaborators.
  - He can also rename the repo to `<his-username>.github.io` (Settings > General >
    Repository name). Then the address is just `https://<his-username>.github.io/`,
    with no repo name on the end.
- **Fresh copy:** he makes a new repo, uploads all of these files (including the
  hidden `.nojekyll`), and turns on Pages. The same naming tip works here: if he
  names the new repo `<his-username>.github.io`, the address is the shorter one.

### After the move, update the address

Link previews and search engines need the full address, so the old one has to be
replaced everywhere it appears. There are ten spots in five files:

`content.js`
- [ ] `siteUrl`: the site's address, used on the resume page and in the info for
      search engines

`index.html` (near the top)
- [ ] `canonical`: tells search engines which address is the main one
- [ ] `og:url`: the address that link previews point to
- [ ] `og:image`: the full address of the preview image (`assets/og.png`)

`resume.html` (near the top)
- [ ] `canonical`: same as above, for the resume page (keep `resume.html` on the end)
- [ ] `og:url`: same as above, for the resume page (keep `resume.html` on the end)
- [ ] `og:image`: the full address of the preview image

`sitemap.xml`
- [ ] Both addresses: the main page and `resume.html`

`404.html` (near the top)
- [ ] `<base href="/ND-Site/">`: change `/ND-Site/` to the new repo name, like
      `/<new-repo-name>/`. If he renames the repo to `<his-username>.github.io`,
      it's just `/`

## The 3D model

The welding arm model is made from Nicholas's STEP files, which I keep in a private
folder outside this repo (along with the steps and scripts to redo it). The short
version: a converter turns the STEP assembly into one 3D file, a cleanup script
takes out the limit switch (it was never built) and gives every part a plain name,
and a last step shrinks the file to about 175 KB. The result replaces
`assets/models/welding-arm.glb`.

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
