# Nicholas's portfolio site

A one-page portfolio and extended resume for Nicholas Domke, hosted free on
GitHub Pages. Plain HTML, CSS, and JavaScript. No build step, nothing to install.

The design is modeled on nothing.tech: black background, dot-matrix type
(the free Google font Doto), a full-screen menu, an interactive dot grid,
and text that "decodes" as it appears. Animations turn off automatically for
visitors who have reduced motion turned on.

## Files

| File | What it is |
|---|---|
| `content.js` | **All of the site's text and links. This is the only file you need to edit.** |
| `index.html` | Page skeleton |
| `assets/css/style.css` | The look |
| `assets/js/render.js` | Builds the page from `content.js` |
| `assets/img/` | Put project photos here (optional, one per project card) |
| `assets/resume.pdf` | Optional resume download (not added; see the privacy note below) |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is. Leave it. |

## Editing the content

Open `content.js` and follow the notes at the top. Short version:

- Anything in `[square brackets]` is a placeholder. It shows on the site in red
  with a dashed underline so you can find it. Replace it and delete the brackets.
- Set a field to `""` to hide it.
- If the page goes blank after an edit, look for a missing quote or comma.

You can edit right on github.com: open `content.js`, click the pencil icon,
make changes, then click **Commit changes**. The live site updates in about a minute.

## Still needed (fill these in)

All of his info is filled in from his October 2026 resume. What's left:

- [ ] Senior design project: name, what it is, his role, tools (or delete that card)
- [ ] Have him read the tagline and About paragraphs (drafted, in his voice)
- [ ] Location: resume says Mount Prospect, IL. Change to Baton Rouge if he prefers
- [ ] Resume download button: off for now. His resume lists his phone number, and
      everything in this repo is public. To turn it on, add a PDF without the phone
      number as `assets/resume.pdf` and set `resume: "assets/resume.pdf"` in content.js
- [ ] Optional: photos of projects (welding arm, maze robot, WildStang robots)
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

## Previewing locally

Double-click `index.html` to open it in a browser. That's it.
