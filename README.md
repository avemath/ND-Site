# Nicholas's portfolio site

A one-page portfolio and extended resume, hosted free on GitHub Pages.
Plain HTML, CSS, and JavaScript. No build step, nothing to install.

## Files

| File | What it is |
|---|---|
| `content.js` | **All of the site's text, links, and photos. This is the only file you need to edit.** |
| `index.html` | Page skeleton |
| `assets/css/style.css` | The look |
| `assets/js/render.js` | Builds the page from `content.js` |
| `assets/img/` | Put project photos and drone photos here |
| `assets/resume.pdf` | Put his resume here with this exact name (not added yet) |
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

- [ ] His last name
- [ ] School name, expected graduation date, city
- [ ] Email (and LinkedIn / GitHub links if he wants them shown)
- [ ] Resume PDF saved as `assets/resume.pdf`
- [ ] About paragraphs in his own words
- [ ] Integer Technologies: job title, dates, 2 to 4 bullet points
- [ ] Senior design project: name, summary, tools, a photo or render if allowed
- [ ] Ship collision avoidance project: current status; link only once the repo is public
- [ ] A third project (or delete that placeholder)
- [ ] Skills (CAD, analysis, fabrication, etc.)
- [ ] Drone photos for the gallery (or set `photos: []` to hide it)
- [ ] Confirm he's fine with the "Outside of engineering" section being public

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
