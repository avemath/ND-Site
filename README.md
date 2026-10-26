# Nicholas's portfolio site

A portfolio and extended resume for Nicholas Domke, hosted free on GitHub Pages.
Plain HTML, CSS, and JavaScript. No build step, nothing to install.

Live: https://avemath.github.io/ND-Site/ (resume page: `resume.html`)

Engineering touches: the footer is a drawing title block, a gear in the top bar
turns as you scroll, and on a computer the hero cursor becomes a CAD crosshair
that snaps to the dot grid and shows X/Y in inches.

The design is modeled on nothing.tech: dot-matrix type (the free Google font
Doto), alternating light grey (#F4F4F4), white, and red panes between a black hero and contact section, a soft graphite featured project card, a full-screen
menu, an interactive dot grid, line drawings of each project that sketch
themselves in, and text that "decodes" as it appears. Animations turn off
automatically for visitors who have reduced motion turned on.

## Files

| File | What it is |
|---|---|
| `content.js` | **All of the site's text and links. This is the only file you need to edit.** |
| `index.html` | Portfolio page skeleton, plus link-preview tags |
| `resume.html` | Printable resume built from `content.js`. No phone number. Visitors can save it as a PDF |
| `assets/css/style.css` | The portfolio's look |
| `assets/css/resume.css` | The resume page's look (screen and print) |
| `assets/js/render.js` | Builds the portfolio from `content.js` |
| `assets/js/resume.js` | Builds the resume page from `content.js` |
| `assets/js/drawings.js` | The project line drawings (used until photos replace them) |
| `assets/og.png` | The preview image shown when the link is shared in a text, LinkedIn, or Slack |
| `assets/img/` | Put project photos here |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. Leave it. |

## Editing the content

Open `content.js` and follow the notes at the top. Short version:

- Anything in `[square brackets]` is a placeholder. It shows on the site in red
  with a dashed underline so you can find it. Replace it and delete the brackets.
- `draft: true` on an item hides it from the live site and the resume page until it's ready.
- Set a field to `""` to hide it.
- Projects show, in order of priority: a `video`, then an `image`, then the line drawing (`art`).
- `result` on a project adds a highlighted outcome line. Leave it `""` until there's a real one.
- Experience items can have `resumePoints`: longer bullets used only on the resume page.
- `revision` (the REV box in the footer's title block): bump the letter when the site gets a real update.
- Each year, bump the "8 yrs" SolidWorks number and the "eight years" in the About text (he started in 2018).
- If the page goes blank after an edit, look for a missing quote or comma.

You can edit right on github.com: open `content.js`, click the pencil icon,
make changes, then click **Commit changes**. The live site updates in about a minute.

## Still needed (fill these in)

All of his info is filled in from his October 2026 resume. What's left:

- [ ] Senior design project: hidden as a draft. Fill in name, hook, bullets, tools, then delete `draft: true`
- [ ] Have him read the tagline and About paragraphs (drafted, in his voice)
- [ ] Location: resume says Mount Prospect, IL. Change to Baton Rouge if he prefers
- [ ] Answer the "Questions for Nicholas" at the top of content.js (results, photos, awards),
      then fill in the `result` lines
- [ ] Photos or short videos of projects (BlueROV2 housing, welding arm, maze robot, WildStang robots)
- [ ] Hobbies ("Off the clock"): live. Add a line on what he plays, where he flies, and 3 to 6 drone photos
- [ ] Optional: GitHub link
- [ ] Keep content.js in sync when his resume changes

## Turning on GitHub Pages

1. On GitHub, open the repo, then **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Click **Save**.
4. After a minute or two the site is live at
   `https://<username>.github.io/<repo-name>/`
   (right now that's `https://avemath.github.io/ND-Site/`).

## Handing it off to Nicholas

Pick one:

- **Transfer the repo** (keeps history): Settings > General > Danger Zone >
  Transfer ownership, and enter his GitHub username. Then he turns on Pages
  in his copy (steps above). The URL becomes `https://<his-username>.github.io/ND-Site/`.
- **Fresh copy**: he creates a new repo, uploads all of these files
  (including the hidden `.nojekyll`), and turns on Pages.

Tip: if he names his repo exactly `<his-username>.github.io`, the site lives at
the shorter `https://<his-username>.github.io/` with no repo name at the end.

**After the move, update the address in three places** (link previews need full addresses):
1. `siteUrl` in `content.js`
2. `og:url` and `og:image` near the top of `index.html`
3. `og:image` near the top of `resume.html`

## Previewing locally

Double-click `index.html` (or `resume.html`) to open it in a browser. That's it.
