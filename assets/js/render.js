/* Builds the page from window.SITE (defined in content.js).
   You shouldn't need to edit this file to change the site's text. */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) {
    document.getElementById("main").innerHTML =
      '<p class="load-error">content.js didn\'t load. Check it for a missing quote or comma.</p>';
    return;
  }

  /* ---------- helpers ---------- */

  // Create an element with optional class and children (strings or nodes).
  function el(tag, cls, kids) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    (kids || []).forEach(function (k) {
      if (k == null || k === "") return;
      n.appendChild(typeof k === "string" ? text(k) : k);
    });
    return n;
  }

  // Turn a string into nodes, wrapping any [placeholder] in a marked span.
  function text(str) {
    var frag = document.createDocumentFragment();
    var re = /\[[^\]]+\]/g, last = 0, m;
    str = String(str);
    while ((m = re.exec(str))) {
      if (m.index > last) frag.appendChild(document.createTextNode(str.slice(last, m.index)));
      var s = document.createElement("span");
      s.className = "todo";
      s.title = "Placeholder: replace in content.js";
      s.textContent = m[0];
      frag.appendChild(s);
      last = re.lastIndex;
    }
    if (last < str.length) frag.appendChild(document.createTextNode(str.slice(last)));
    return frag;
  }

  function isPlaceholder(str) { return /^\s*\[[^\]]*\]\s*$/.test(str || ""); }

  function link(href, label, cls) {
    var a = el("a", cls, [label]);
    a.href = href;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function slot(name) { return document.querySelector('[data-slot="' + name + '"]'); }

  function hideSection(id) {
    var s = document.getElementById(id);
    if (s) s.hidden = true;
    var navLink = document.querySelector('.nav a[href="#' + id + '"]');
    if (navLink) navLink.parentNode.hidden = true;
  }

  // Meta column used by experience and project entries.
  function meta(lines) {
    return el("div", "entry-meta", lines.filter(Boolean).map(function (l) {
      return el("p", null, [l]);
    }));
  }

  var L = S.links || {};
  var firstName = (S.name || "").split(" ")[0] || "Portfolio";

  /* ---------- page title + nav ---------- */
  var cleanName = (S.name || "").replace(/\s*\[[^\]]*\]/g, "").trim();
  document.title = cleanName + " | " + (S.discipline || "Portfolio");
  document.getElementById("nav-name").textContent = firstName;

  /* ---------- hero ---------- */
  var hero = document.querySelector(".hero");

  var dim = el("div", "dim", [el("span", "dim-label", [
    [S.discipline, S.graduation ? "class of " + S.graduation : ""].filter(Boolean).join(", ")
  ])]);
  dim.setAttribute("aria-hidden", "true");

  var nameWrap = el("div", "name-wrap", [dim, el("h1", "name", [S.name])]);

  var actions = el("div", "actions");
  if (L.resume) {
    var r = link(L.resume, "Download resume (PDF)", "btn");
    r.setAttribute("download", "");
    actions.appendChild(r);
  }
  if (L.email) {
    actions.appendChild(isPlaceholder(L.email)
      ? el("span", "btn-text", ["Email: ", L.email])
      : link("mailto:" + L.email, "Email", "btn-text"));
  }
  if (L.linkedin) actions.appendChild(link(L.linkedin, "LinkedIn", "btn-text"));
  if (L.github) actions.appendChild(link(L.github, "GitHub", "btn-text"));

  // Title block: the info box found in the corner of every engineering drawing.
  var rows = [
    ["Name", S.name],
    ["Discipline", S.discipline],
    ["School", S.school],
    ["Graduating", S.graduation],
    ["Based in", S.location],
    ["Last updated", S.lastUpdated],
  ].filter(function (r) { return r[1]; });

  var tb = el("dl", "titleblock");
  rows.forEach(function (r) {
    tb.appendChild(el("div", "tb-row", [el("dt", null, [r[0]]), el("dd", null, [r[1]])]));
  });

  hero.appendChild(el("div", "hero-main", [
    nameWrap,
    el("p", "tagline", [S.tagline]),
    actions,
  ]));
  hero.appendChild(tb);

  /* ---------- about ---------- */
  if (S.about && S.about.length) {
    S.about.forEach(function (p) { slot("about").appendChild(el("p", null, [p])); });
  } else hideSection("about");

  /* ---------- experience ---------- */
  if (S.experience && S.experience.length) {
    S.experience.forEach(function (job) {
      var body = el("div", "entry-body", [
        el("h3", null, [job.role]),
        el("p", "entry-org", [[job.org, job.place].filter(Boolean).join(", ")]),
      ]);
      if (job.points && job.points.length) {
        body.appendChild(el("ul", "points", job.points.map(function (pt) {
          return el("li", null, [pt]);
        })));
      }
      slot("experience").appendChild(el("article", "entry", [meta([job.dates]), body]));
    });
  } else hideSection("experience");

  /* ---------- projects ---------- */
  var figNum = 0;
  function figure(src, alt, caption) {
    figNum += 1;
    var f = el("figure", "fig");
    if (src) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = alt || "";
      img.loading = "lazy";
      f.appendChild(img);
    } else {
      f.appendChild(el("div", "fig-empty", ["No image yet"]));
    }
    f.appendChild(el("figcaption", null, ["Fig. " + figNum + ". ", caption || ""]));
    return f;
  }

  if (S.projects && S.projects.length) {
    S.projects.forEach(function (p) {
      var body = el("div", "entry-body", [el("h3", null, [p.title])]);
      if (p.summary) body.appendChild(el("p", "entry-summary", [p.summary]));
      if (p.tools) body.appendChild(el("p", "entry-tools", ["Tools: ", p.tools]));
      if (p.link) body.appendChild(el("p", "entry-link", [link(p.link, "View project")]));
      if (p.image) body.appendChild(figure(p.image, p.imageAlt, p.imageAlt || p.title));
      slot("projects").appendChild(el("article", "entry", [meta([p.dates, p.role]), body]));
    });
  } else hideSection("projects");

  /* ---------- skills ---------- */
  if (S.skills && S.skills.length) {
    var dl = el("dl", "skills");
    S.skills.forEach(function (g) {
      dl.appendChild(el("div", "skill-row", [el("dt", null, [g.group]), el("dd", null, [g.items])]));
    });
    slot("skills").appendChild(dl);
  } else hideSection("skills");

  /* ---------- outside of engineering + photos ---------- */
  var out = slot("outside");
  if (S.outside) out.appendChild(el("p", "prose", [S.outside]));
  if (S.photos && S.photos.length) {
    var grid = el("div", "photos");
    S.photos.forEach(function (ph) { grid.appendChild(figure(ph.image, ph.caption, ph.caption)); });
    out.appendChild(grid);
  }
  if (!S.outside && !(S.photos && S.photos.length)) hideSection("outside");

  /* ---------- contact ---------- */
  var c = slot("contact");
  c.appendChild(el("p", "prose", [
    "The best way to reach me is by email. I'm happy to talk about internships, " +
    "full-time roles, or any of the projects above."
  ]));
  var cl = el("ul", "contact-list");
  if (L.email) cl.appendChild(el("li", null, ["Email: ",
    isPlaceholder(L.email) ? L.email : link("mailto:" + L.email, L.email)]));
  if (L.linkedin) cl.appendChild(el("li", null, ["LinkedIn: ", link(L.linkedin, L.linkedin.replace(/^https?:\/\/(www\.)?/, ""))]));
  if (L.github) cl.appendChild(el("li", null, ["GitHub: ", link(L.github, L.github.replace(/^https?:\/\//, ""))]));
  if (L.resume) cl.appendChild(el("li", null, ["Resume: ", link(L.resume, "PDF download")]));
  c.appendChild(cl);

  /* ---------- footer ---------- */
  slot("footer").appendChild(el("p", null, [
    "© " + new Date().getFullYear() + " " + cleanName + ". Last updated " + (S.lastUpdated || "") + "."
  ]));
})();
