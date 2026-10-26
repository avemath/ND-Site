/* Builds the printable resume (resume.html) from window.SITE in content.js.
   Uses each job's "resumePoints" when present, otherwise its "points".
   Drafts and anything still holding a [placeholder] are left off. */
(function () {
  "use strict";
  var S = window.SITE, root = document.getElementById("resume");
  if (!S || !root) return;

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
  var unfinished = function (t) { return /\[[^\]]+\]/.test(String(t || "")); };
  function live(list) {
    return (list || []).filter(function (x) { return x && !x.draft && !unfinished(x.title) && !unfinished(x.role); });
  }
  function bullets(list) {
    list = (list || []).filter(function (t) { return !unfinished(t); });
    return list.length ? el("ul", "pts", list.map(function (t) { return el("li", null, [t]); })) : null;
  }
  function section(title, kids) { return el("section", "sec", [el("h2", "sec-h", [title])].concat(kids)); }
  function row(left, right, sub) {
    return el("div", "row", [el("div", "row-main", [left, sub || null]), el("div", "row-date", [right])]);
  }

  var L = S.links || {};
  var name = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = name + " | Resume";

  /* header */
  var contact = el("p", "contact");
  [S.location,
    L.email ? a("mailto:" + L.email, L.email) : null,
    L.linkedin ? a(L.linkedin, L.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) : null,
    L.github ? a(L.github, L.github.replace(/^https?:\/\//, "")) : null,
    S.siteUrl ? a(S.siteUrl, S.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")) : null,
  ].filter(Boolean).forEach(function (part, i) {
    if (i) contact.appendChild(el("span", "sep", []));
    contact.appendChild(typeof part === "string" ? document.createTextNode(part) : part);
  });
  root.appendChild(el("header", "head", [
    el("h1", "name", [name]),
    el("p", "role", [[S.discipline, S.schoolShort || S.school, S.graduation ? "Class of " + S.graduation.replace(/\D*(\d{4}).*/, "$1") : ""].filter(Boolean).join("  /  ")]),
    contact,
  ]));

  /* education */
  var edu = [row(el("h3", null, [S.school]), S.graduation,
    el("p", "sub", ["Bachelor of Science in " + S.discipline + (S.minor ? ", minor in " + S.minor : "")]))];
  if (S.coursework && S.coursework.length) edu.push(el("p", "line", [el("strong", null, ["Related coursework: "]), S.coursework.join(", ")]));
  if (S.gradIntent) edu.push(el("p", "line", [el("strong", null, ["Graduate study: "]), S.gradIntent]));
  root.appendChild(section("Education", edu));

  /* experience */
  var jobs = live(S.experience);
  if (jobs.length) {
    root.appendChild(section("Experience", jobs.map(function (j) {
      return el("article", "item", [
        row(el("h3", null, [j.role]), j.dates, el("p", "sub", [[j.org, j.place].filter(Boolean).join(", ")])),
        j.compact ? null : bullets(j.resumePoints || j.points),
      ]);
    })));
  }

  /* projects (featured first) */
  var projects = [];
  // The featured project is left out here: it's already covered under Experience (Integer).
  projects = projects.concat(live(S.projects));
  if (projects.length) {
    root.appendChild(section("Projects", projects.map(function (p) {
      var pts = (p.points || []).slice();
      if (p.result && !unfinished(p.result)) pts.push(p.result);
      return el("article", "item", [
        row(el("h3", null, [p.title]), p.dates, p.role ? el("p", "sub", [p.role]) : null),
        bullets(pts),
      ]);
    })));
  }

  /* skills */
  var skills = (S.skills || []).filter(function (g) { return g && !g.draft; });
  if (skills.length) {
    root.appendChild(section("Skills", [el("dl", "skills", skills.map(function (g) {
      return el("div", null, [el("dt", null, [g.group]), el("dd", null, [g.items.join(", ")])]);
    }))]));
  }

  root.appendChild(el("p", "foot", ["Updated " + (S.lastUpdated || "") + (S.siteUrl ? ". Portfolio: " + S.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : "")]));

  var btn = document.getElementById("print-btn");
  if (btn) btn.addEventListener("click", function () { window.print(); });
})();
