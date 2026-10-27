/* Builds the resume page (resume.html) from window.SITE in content.js, laid out like
   his resume PDF: Education, Experience, Skills, Projects. The words come from the
   "resume" block in content.js; the name, email, LinkedIn, and site address come from
   the basics at the top of that file. */
(function () {
  "use strict";
  var S = window.SITE, root = document.getElementById("resume");
  if (!root) return;
  if (!S) { root.innerHTML = '<p class="noscript">content.js didn\'t load. Check it for a missing quote or comma.</p>'; return; }
  var R = S.resume || {}, L = S.links || {};

  function el(tag, cls, kids) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    (kids || []).forEach(function (k) {
      if (k == null || k === "") return;
      n.appendChild(typeof k === "string" ? document.createTextNode(k) : k);
    });
    return n;
  }
  function a(href, label) { var x = el("a", null, [label || href]); x.href = href; return x; }
  function b(t) { return el("strong", null, [t]); }
  function i(t) { return el("em", null, [t]); }

  // written like his PDF: "Aug 2026 to May 2027" reads "August 2026 \u2013 May 2027" (en dash), "now" reads "Present"
  var MONTHS = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", Jun: "June", Jul: "July",
    Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };
  function when(d) {
    return String(d || "").replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, function (m) { return MONTHS[m]; })
      .replace(/\bnow$/i, "Present").replace(/ to /g, " \u2013 ");
  }
  function section(title, kids, cls) { return el("section", "sec" + (cls ? " " + cls : ""), [el("h2", "sec-h", [title])].concat(kids)); }
  function row(title, dates) { return el("div", "row", [el("h3", "row-t", [title]), dates ? el("span", "row-d", [when(dates)]) : null]); }
  function list(points, cls) {
    return points && points.length ? el("ul", cls, points.map(function (t) { return el("li", null, [t]); })) : null;
  }
  // a dated entry: bold title and date on one line, the place in italics, then its bullets
  function entry(e, cls) {
    return el("article", "item", [row(e.title, e.dates), e.where ? el("p", "where", [i(e.where)]) : null, list(e.points, cls)]);
  }

  var name = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = name + " | Resume";

  /* header: name, then where he lives and his email, then his links written out */
  var line1 = [R.location, L.email ? a("mailto:" + L.email, L.email) : null].filter(Boolean);
  var line2 = [L.linkedin ? a(L.linkedin) : null, L.github ? a(L.github) : null, S.siteUrl ? a(S.siteUrl) : null].filter(Boolean);
  function joined(cls, parts) {
    var p = el("p", cls);
    parts.forEach(function (x, k) { if (k) p.appendChild(document.createTextNode(" | ")); p.appendChild(typeof x === "string" ? document.createTextNode(x) : x); });
    return p;
  }
  root.appendChild(el("header", "head", [el("h1", "name", [name]), joined("contact", line1), joined("contact links", line2)]));

  /* education */
  var E = R.education;
  if (E) {
    root.appendChild(section("Education", [
      el("div", "item", [
        row(E.school, E.dates),
        E.degree ? el("p", "line", [i(E.degree)]) : null,
        // from "minor" at the top of content.js, so it matches the rest of the site
        S.minor ? el("p", "line", [b(/,/.test(S.minor) ? "Minors" : "Minor"), ": " + S.minor]) : null,
        E.coursework ? el("p", "line", [b("Related Coursework"), ": " + E.coursework]) : null,
      ]),
      E.gradTitle ? el("div", "item grad", [
        el("h3", "row-t", [E.gradTitle]),
        E.gradPlan ? el("p", "line", [E.gradPlan]) : null,
        E.gradNote ? el("p", "line", [i(E.gradNote)]) : null,
      ]) : null,
    ]));
  }

  /* experience (round bullets), skills and projects (dashes), as on his PDF */
  if (R.experience && R.experience.length) root.appendChild(section("Experience", R.experience.map(function (e) { return entry(e, "pts dots"); })));
  if (R.skills && R.skills.length) {
    root.appendChild(section("Skills", [list(R.skills.map(function (s) { return s.label + ": " + s.text; }), "pts dashes")], "sec-skills"));
  }
  if (R.projects && R.projects.length) root.appendChild(section("Projects", R.projects.map(function (e) { return entry(e, "pts dashes"); }), "sec-projects"));

  // "Save as PDF" names the file after the page title, so give it a clean one while printing
  var screenTitle = document.title;
  window.addEventListener("beforeprint", function () { document.title = name + " Resume"; });
  window.addEventListener("afterprint", function () { document.title = screenTitle; });

  var btn = document.getElementById("print-btn");
  if (btn) btn.addEventListener("click", function () { window.print(); });
  // the Download PDF button follows links.resumePdf in content.js, and hides when it's empty
  var pdf = document.getElementById("pdf-btn");
  if (pdf) { if (L.resumePdf) pdf.href = L.resumePdf; else pdf.hidden = true; }
})();
