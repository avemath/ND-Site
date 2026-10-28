// Checks content.js on every push (see .github/workflows/check-content.yml).
// It makes sure the file runs, that the parts the site needs are there, that dates
// are written the way the timeline reads them, and that every file it points to
// (photos, videos, the PDF) exists. Problems show up on GitHub with a line number.
// Run it yourself with: node .github/scripts/check-content.js
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..", "..");
const file = path.join(root, "content.js");
const src = fs.readFileSync(file, "utf8");
const lines = src.split("\n");
const problems = [];

// GitHub shows "::error file=...,line=...::" lines as a red note on that line
function report(msg, line) {
  problems.push({ msg, line });
  const where = line ? `content.js line ${line}` : "content.js";
  console.log(`::error file=content.js${line ? ",line=" + line : ""}::${msg}`);
  console.error(`  ${where}: ${msg}`);
}
// the first line that contains this text (to point at the right spot)
function lineOf(text) {
  if (!text) return 0;
  const i = lines.findIndex((l) => l.includes(text));
  return i < 0 ? 0 : i + 1;
}
// where each top-level section starts (the same title can appear in projects and resume)
const startOf = (name) => Math.max(0, lines.findIndex((l) => l.startsWith(`  ${name}:`)));
let section = 0;
// the first line with `text` at or after the line with `anchor` (a title or role),
// searching from the start of the current section
function lineNear(anchor, text) {
  const a = anchor ? lines.findIndex((l, k) => k >= section && l.includes(`"${anchor}"`)) : -1;
  const i = lines.findIndex((l, k) => k >= Math.max(0, a) && l.includes(text));
  return i < 0 ? lineOf(text) : i + 1;
}
function lineFromStack(err) {
  const m = /content\.js:(\d+)/.exec(String(err && err.stack));
  return m ? +m[1] : 0;
}

// 1. it runs
let SITE;
try {
  const script = new vm.Script(src, { filename: "content.js" });
  const sandbox = { window: {} };
  script.runInNewContext(sandbox);
  SITE = sandbox.window.SITE;
} catch (err) {
  const line = lineFromStack(err);
  report(`${err.name}: ${err.message}. Check for a missing comma or quote near this line (often the line just above).`, line);
  process.exit(1);
}
if (!SITE || typeof SITE !== "object") {
  report("window.SITE isn't set. The file should start with window.SITE = { and end with };");
  process.exit(1);
}

// 2. the parts the site needs
const need = (obj, key, where) => {
  if (!obj || obj[key] === undefined || obj[key] === null) report(`Missing "${key}"${where ? " in " + where : ""}.`, lineOf(where || ""));
};
["firstName", "lastName", "school", "graduation", "links", "projects", "experience", "skills"].forEach((k) => need(SITE, k));
if (SITE.links) need(SITE.links, "email", "links");
const list = (v, name) => {
  if (v !== undefined && !Array.isArray(v)) { report(`"${name}" should be a list in [square brackets].`, lineOf(name + ":")); return []; }
  return (v || []).filter((x) => x && !x.draft);
};

// 3. dates the timeline can read: "Mar 2026 to May 2027", "Mar 2026 to now", "2017 to 2022", or "" (no dates)
const MON = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
const DATE = new RegExp(`^((${MON} )?\\d{4})( to ((${MON} )?\\d{4}|now))?$`);
function checkDates(d, label) {
  if (d === undefined || d === "") return;
  if (typeof d !== "string" || !DATE.test(d.trim())) {
    report(`Dates for "${label}" should look like "Mar 2026 to May 2027", "Mar 2026 to now", or "2017 to 2022" (got "${d}").`, lineNear(label, String(d)));
  }
}

if (SITE.featured && !SITE.featured.draft) need(SITE.featured, "title", "featured");
section = startOf("projects");
list(SITE.projects, "projects").forEach((p, i) => {
  if (!p.title) report(`Project ${i + 1} has no "title".`);
  checkDates(p.dates, p.title || `project ${i + 1}`);
});
section = startOf("experience");
list(SITE.experience, "experience").forEach((j, i) => {
  if (!j.role) report(`Experience item ${i + 1} has no "role".`);
  checkDates(j.dates, j.role || `experience ${i + 1}`);
  (j.segments || []).forEach((s) => checkDates(s, j.role));
});
list(SITE.skills, "skills").forEach((g, i) => {
  if (!g.group) report(`Skills group ${i + 1} has no "group" name.`);
  (g.items || []).forEach((t) => { if (!t || !t.tool) report(`A skill in "${g.group}" has no "tool" name.`, lineOf(g.group)); });
});
if (SITE.resume) {
  section = startOf("resume");
  list(SITE.resume.experience, "experience").forEach((e) => checkDates(e.dates, e.title));
  list(SITE.resume.projects, "projects").forEach((e) => checkDates(e.dates, e.title));
}

// 4. every file it points to exists (a typo in a photo name shows here)
(function walk(v) {
  if (typeof v === "string") {
    if (/^assets\//.test(v) && !fs.existsSync(path.join(root, v))) report(`File not found: ${v} (check the name and that it's in that folder).`, lineOf(v));
  } else if (v && typeof v === "object") Object.values(v).forEach(walk);
})(SITE);

// 5. no phone numbers (the repo is public)
lines.forEach((l, i) => {
  if (/(\(\d{3}\)\s*|\b\d{3}[-. ])\d{3}[-. ]\d{4}\b/.test(l)) report("This line looks like it has a phone number. The repo is public, so leave it off.", i + 1);
});

if (problems.length) {
  console.error(`\ncontent.js: ${problems.length} problem${problems.length === 1 ? "" : "s"} found.`);
  process.exit(1);
}
console.log("content.js looks good.");
