/* Builds the printable resume (resume.html) from window.SITE in content.js.
   Uses each job's "resumePoints" when present, otherwise its "points".
   Drafts and anything still holding a [placeholder] are left off. */
(function () {
  "use strict";
  var S = window.SITE, root = document.getElementById("resume");
  if (!root) return;
  if (!S) { root.innerHTML = '<p class="noscript">content.js didn\'t load. Check it for a missing quote or comma.</p>'; return; }

  function el(tag, cls, kids) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    (kids || []).forEach(function (k) {
      if (k == null || k === "") return;
      n.appendChild(typeof k === "string" ? document.createTextNode(k) : k);
    });
    return n;
  }
  function a(href, label) { var x = el("a", null, [label]); x.href = href; return x; }
  var unfinished = function (t) { return /\[[^\[\]]+\]/.test(String(t || "")); };
  function live(list) {
    return (list || []).filter(function (x) { return x && !x.draft && !unfinished(x.title) && !unfinished(x.role); });
  }
  function bullets(list) {
    list = (list || []).filter(function (t) { return !unfinished(t); });
    return list.length ? el("ul", "pts", list.map(function (t) { return el("li", null, [t]); })) : null;
  }
  // "Mar 2026 to now" reads "Mar 2026 to Present" on the resume (content.js keeps "now" for the timeline)
  function when(dates) { return String(dates || "").replace(/\bnow$/i, "Present"); }
  function section(title, kids) { return el("section", "sec", [el("h2", "sec-h", [title])].concat(kids)); }
  function row(left, right, sub) {
    return el("div", "row", [el("div", "row-main", [left, sub || null]), el("div", "row-date", [right])]);
  }

  var L = S.links || {};
  var name = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = name + " | Resume";

  /* header */
  var contact = el("p", "contact");
  // "Baton Rouge, LA (hometown: Mount Prospect, IL)" when both are set
  [S.currentLocation ? S.currentLocation + (S.location ? " (hometown: " + S.location + ")" : "") : S.location,
    L.email ? a("mailto:" + L.email, L.email) : null,
    L.linkedin ? a(L.linkedin, L.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) : null,
    L.github ? a(L.github, L.github.replace(/^https?:\/\//, "")) : null,
    S.siteUrl ? a(S.siteUrl, S.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")) : null,
  ].filter(Boolean).forEach(function (part) {
    // each item draws its own leading dot; a dot that lands at the start of a line is clipped (resume.css)
    contact.appendChild(el("span", "ci", [part]));
  });
  root.appendChild(el("header", "head", [
    el("h1", "name", [name]),
    el("p", "role", [S.discipline, S.schoolShort || S.school, S.graduation ? "Class of " + S.graduation.replace(/\D*(\d{4}).*/, "$1") : ""]
      .filter(Boolean).reduce(function (out, t, i, all) {
        // each part (with its slash) stays on one line, so a narrow screen breaks between parts
        out.push(el("span", "role-part", [t + (i < all.length - 1 ? " /" : "")]));
        if (i < all.length - 1) out.push(" ");
        return out;
      }, [])),
    contact,
  ]));

  /* education */
  var edu = [row(el("h3", null, [S.school]), S.graduation,
    el("p", "sub", ["Bachelor of Science in " + S.discipline + (S.minor ? ", minor in " + S.minor : "")]))];
  if (S.coursework && S.coursework.length) edu.push(el("p", "line", [el("strong", null, ["Related coursework: "]), S.coursework.join(", ")]));
  if (S.gradIntent) edu.push(el("p", "line", [el("strong", null, ["Graduate study: "]), S.gradIntent]));
  root.appendChild(section("Education", edu));

  /* experience: the main jobs here; the short (compact) ones go after Projects */
  var jobs = live(S.experience);
  function job(j) {
    var where = [j.org, j.place].filter(Boolean).join(", ");
    // a short entry's note sits on its title line ("FIRST LEGO League. Refereed ...")
    var sub = j.compact && j.note ? where + ". " + j.note : where;
    return el("article", "item", [
      row(el("h3", null, [j.role]), when(j.dates), el("p", "sub", [sub])),
      j.compact ? null : bullets(j.resumePoints || j.points),
    ]);
  }
  var mainJobs = jobs.filter(function (j) { return !j.compact; }), otherJobs = jobs.filter(function (j) { return j.compact; });
  if (mainJobs.length) root.appendChild(section("Experience", mainJobs.map(job)));

  /* projects. The featured project is left out here: it's already covered under Experience (Integer). */
  var projects = live(S.projects).filter(function (p) { return p.resume !== false; });   // resume: false leaves a card off
  if (projects.length) {
    root.appendChild(section("Projects", projects.map(function (p) {
      // "resumePoints" (when set) replaces the card's bullets and result on the resume
      var pts = p.resumePoints ? p.resumePoints.slice() : (p.points || []).slice();
      if (!p.resumePoints && p.result && !unfinished(p.result)) pts.push(p.result);
      return el("article", "item", [
        row(el("h3", null, [p.title]), when(p.dates), p.role ? el("p", "sub", [p.role]) : null),
        bullets(pts),
      ]);
    })));
  }

  if (otherJobs.length) root.appendChild(section("Other experience", otherJobs.map(job)));

  /* skills */
  var skills = (S.skills || []).filter(function (g) { return g && !g.draft; });
  if (skills.length) {
    root.appendChild(section("Skills", [el("dl", "skills", skills.map(function (g) {
      // every tool in the group, with its start year if it has one ("SolidWorks (since 2018)")
      return el("div", null, [el("dt", null, [g.group]), el("dd", null, [(g.items || []).map(function (t) {
        return typeof t === "string" ? t : t.tool + (t.since ? " (since " + t.since + ")" : "");
      }).join(", ")])]);
    }))]));
  }

  root.appendChild(el("p", "foot", ["Updated " + (S.lastUpdated || "") + (S.siteUrl ? ". Portfolio: " + S.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "")]));

  // "Save as PDF" names the file after the page title, so give it a clean one while printing
  var screenTitle = document.title;
  window.addEventListener("beforeprint", function () { document.title = name + " Resume"; });
  window.addEventListener("afterprint", function () { document.title = screenTitle; });

  var btn = document.getElementById("print-btn");
  if (btn) btn.addEventListener("click", function () { window.print(); });
})();
