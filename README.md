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
  between, the sections switch between light grey (#F4F4F4), white, and blueprint
  blue (#1450A8). The blue sections are drawn like blueprint paper, with a grid.
- The featured project sits on a soft dark grey card.
- The menu opens full screen.
- The top section has a grid of dots that reacts to the mouse.
- Each project has a line drawing that sketches itself in as you scroll to it.
- Headings "decode" into place, like a scrambled sign settling.

Since he's a mechanical engineer, I added a few engineering touches:

- The footer looks like the title block in the corner of an engineering drawing.
- A gear in the top bar turns as you scroll.
- The top bar shows which section you're in, like a sheet label on a drawing.
- On a computer, the mouse pointer in the top section becomes a CAD crosshair. It
  snaps to the dot grid and shows X/Y coordinates in inches.
- Each row of the timeline in the Experience section links to that project card or job.

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
| `assets/og.png` | The preview image that shows up when the link is shared in a text, on LinkedIn, or in Slack |
| `assets/img/` | Project photos go here |
| `.nojekyll` | A hidden, empty file that tells GitHub Pages to serve the files as they are. Leave it. |

## Editing the content

Open `content.js` and follow the notes at the top. The short version:

- **Placeholders:** anything in `[square brackets]` shows up on the site in blue
  with a dashed underline, so it's easy to find. Replace it and delete the brackets.
- **Drafts:** putting `draft: true` on an item hides it from the site and the resume
  page until it's ready.
- **Hiding one field:** set it to `""` (empty quotes).
- **Photos:** each project shows the first thing it has, in this order: a `video`,
  then an `image`, then its line drawing (`art`).
- **Second photo:** the featured project can also show a second photo under its
  bullets, with a small caption. Fill in `image2`, `image2Alt`, and `image2Caption`.
  Leave `image2` as `""` to hide it.
- **Results:** `result` on a project adds a highlighted line about how it turned out.
  Leave it `""` until there's a real one.
- **Spec table:** `specs` on the featured project is the small table (Role, CAD,
  Materials, and so on). When it's filled in, it shows instead of the tool pills
  (the small rounded labels).
- **Resume bullets:** jobs can have `resumePoints`, which are longer bullets used
  only on the resume page.
- **Revision letter:** `revision` is the REV box in the footer. Bump the letter
  (C to D, and so on) when the site gets a real update.
- **Every year:** bump the "8 yrs" SolidWorks number and the "eight years" in the
  About text. He started in 2018.
- **If the page goes blank after an edit,** look for a missing quote or comma.

To edit on github.com: open `content.js`, click the pencil icon, make your changes,
then click **Commit changes** (GitHub's word for saving). The live site updates in
about a minute.

## Still needed

All of his info is filled in from his October 2026 resume. Here's what's left:

- [ ] Senior design project: it's hidden as a draft. Fill in the name, hook, bullets,
      and tools, then delete `draft: true`
- [ ] Have him read the tagline and the About paragraphs (I drafted them in his voice)
- [ ] Get his answers to the "Questions for Nicholas" at the top of `content.js`
      (results, photos, awards), then fill in the `result` lines
- [ ] Photos or short videos of his projects (BlueROV2 housing, welding arm, maze
      robot, WildStang robots)
- [ ] Hobbies ("Off the clock"): this section is already live. Add a line on what he
      plays, where he flies, and 3 to 6 drone photos
- [ ] Optional: link his GitHub (github.com/nmdomke) once he has projects on it
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
replaced everywhere it appears. There are seven spots in three files:

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

## Previewing on your computer

Double-click `index.html` (or `resume.html`) to open it in your browser. That's it.
