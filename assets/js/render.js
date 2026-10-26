/* Builds the page from window.SITE (defined in content.js) and runs the
   motion: dot fields, line drawings, scrambling text, counters,
   the menu, accordions, and the top bar color switching.
   You shouldn't need to edit this file to change the site's text. */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) {
    document.getElementById("main").innerHTML =
      '<p class="load-error">content.js didn\'t load. Check it for a missing quote or comma.</p>';
    return;
  }

  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = mq.matches;
  var onMotionChange = [];
  (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function (e) {
    reduceMotion = e.matches;
    onMotionChange.forEach(function (f) { f(); });
  });

  /* ======================= helpers ======================= */

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

  function link(href, label, cls) {
    var a = el("a", cls, [label]);
    a.href = href;
    if (/^https?:/.test(href)) {
      a.target = "_blank"; a.rel = "noopener";
      a.appendChild(el("span", "sr-only", [" (opens in a new tab)"]));
    }
    return a;
  }

  function slot(name) { return document.querySelector('[data-slot="' + name + '"]'); }

  function live(list) { return (list || []).filter(function (x) { return x && !x.draft; }); }

  function hide(node, menuHash) {
    if (node) node.hidden = true;
    var m = menuHash && document.querySelector('.menu a[href="' + menuHash + '"]');
    if (m) m.parentNode.hidden = true;
  }

  function pills(items, cls) {
    return el("ul", "pills " + (cls || ""), (items || []).map(function (t) {
      return el("li", "tag mono", [t]);
    }));
  }

  function bullets(items, fmt) {
    return el("ul", "points", (items || []).map(function (x) { return el("li", null, [fmt ? fmt(x) : x]); }));
  }

  // "(see Featured)" or "(see Projects)" in a bullet becomes a link to that section.
  function seeLinks(str) {
    var frag = document.createDocumentFragment(), re = /\(see (Featured|Projects)\)/g, last = 0, m;
    while ((m = re.exec(str))) {
      frag.appendChild(text(str.slice(last, m.index) + "(see "));
      var a = el("a", "see-link", [m[1]]);
      a.href = m[1] === "Featured" ? "#featured" : "#projects";
      frag.appendChild(a);
      frag.appendChild(text(")"));
      last = re.lastIndex;
    }
    frag.appendChild(text(str.slice(last)));
    return frag;
  }

  var L = S.links || {};
  var fullName = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = fullName + " | " + (S.discipline || "Portfolio");

  /* ======================= search engine info (schema.org Person) ======================= */
  try {
    var ld = {
      "@context": "https://schema.org", "@type": "Person", name: fullName,
      url: S.siteUrl || undefined, email: L.email ? "mailto:" + L.email : undefined,
      jobTitle: S.discipline ? S.discipline + " student" : undefined,
      affiliation: S.school ? { "@type": "CollegeOrUniversity", name: S.school } : undefined,
      knowsAbout: (S.skills || []).reduce(function (all, g) { return all.concat(g.items || []); }, []),
      sameAs: [L.linkedin, L.github].filter(Boolean),
    };
    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(ld);
    document.head.appendChild(tag);
  } catch (e) {}

  /* ======================= hero ======================= */

  var hero = slot("hero");
  // Each part (with its trailing slash) stays on one line, so a narrow
  // screen breaks between parts and no line starts with "/".
  var kicker = el("p", "mono kicker");
  var kparts = [S.discipline, S.schoolShort || S.school,
    S.graduation ? "Class of " + S.graduation.replace(/\D*(\d{4}).*/, "$1") : ""].filter(Boolean);
  kparts.forEach(function (part, i) {
    var last = i === kparts.length - 1;
    kicker.appendChild(el("span", "kicker-part", [part + (last ? "" : " /")]));
    if (!last) kicker.appendChild(document.createTextNode(" "));
  });

  var name = el("h1", "hero-name dot", [el("span", null, [S.firstName]), el("span", null, [S.lastName])]);
  name.setAttribute("aria-label", fullName);
  [].forEach.call(name.children, function (s) {
    s.setAttribute("data-scramble", ""); s.setAttribute("aria-hidden", "true");
  });

  function actionRow(primaryLabel) {
    var row = el("div", "actions");
    if (L.email) row.appendChild(link("mailto:" + L.email, primaryLabel || "Email me", "pill pill-solid"));
    if (L.linkedin) row.appendChild(link(L.linkedin, "LinkedIn", "pill pill-ghost"));
    if (L.github) row.appendChild(link(L.github, "GitHub", "pill pill-ghost"));
    if (L.resume) {
      var isPdf = /\.pdf$/i.test(L.resume);
      var r = link(L.resume, isPdf ? "Resume (PDF)" : "Resume", "pill pill-ghost");
      if (isPdf) r.setAttribute("download", "");
      row.appendChild(r);
    }
    return row;
  }

  hero.appendChild(kicker);
  hero.appendChild(name);
  if (S.tagline) hero.appendChild(el("p", "tagline", [S.tagline]));
  if (S.status) hero.appendChild(el("p", "status mono", [el("span", "rec", []), S.status]));
  hero.appendChild(actionRow());

  /* ======================= numbers strip ======================= */

  var nums = slot("numbers");
  if (S.numbers && S.numbers.length) {
    var ul = el("ul", "num-list");
    S.numbers.forEach(function (n) {
      var v = el("span", "num-value dot", [n.value]);
      v.setAttribute("data-count", n.value);
      if (String(n.value).length > 3) v.classList.add("is-long");
      ul.appendChild(el("li", "num", [
        el("p", "num-fig", [n.pre ? el("span", "num-pre mono", [n.pre]) : null, v, n.unit ? el("span", "num-unit mono", [n.unit]) : null]),
        el("p", "num-label", [n.label]),
      ]));
    });
    nums.appendChild(ul);
  } else hide(nums);

  /* ======================= about ======================= */

  var ab = slot("about");
  if (S.about && S.about.length) {
    ab.className = "about";
    var copy = el("div", "about-copy");
    S.about.forEach(function (p, i) { copy.appendChild(el("p", i === 0 ? "lead" : "body", [p])); });
    ab.appendChild(copy);
    ab.appendChild(el("dl", "facts mono", [
      ["School", S.school], ["Degree", "B.S. " + S.discipline], ["Minor", S.minor],
      ["Graduating", S.graduation], [S.locationLabel || "Hometown", S.location],
    ].filter(function (f) { return f[1]; }).map(function (f) {
      return el("div", null, [el("dt", null, [f[0]]), el("dd", null, [f[1]])]);
    })));
  } else hide(document.getElementById("about"), "#about");

  /* ======================= project media: video, photo, or line drawing ======================= */
  // Priority: video, then photo, then the illustration from drawings.js.

  var DRAW = window.DRAWINGS || {};
  var revealQ = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      reveal(e.target);
      revealQ.unobserve(e.target);
    });
  }, { threshold: 0.35 });

  function reveal(box) {
    box.classList.add("drawn");
    var anim = box.querySelector("animateMotion");
    if (anim && !reduceMotion && anim.beginElement) {
      setTimeout(function () { try { anim.beginElement(); } catch (e) {} }, 1300);
    }
  }

  // Builds the maze drawing from its grid and solves it, so the route is real.
  function mazeSpec(spec) {
    var g = spec.grid, rows = g.length, cols = g[0].length;
    var cell = Math.min(372 / cols, 196 / rows);
    var ox = (400 - (cols - 1) * cell) / 2, oy = (225 - (rows - 1) * cell) / 2;
    var out = "", start, end;
    function at(r, c) { return [ox + c * cell, oy + r * cell]; }
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      var ch = g[r][c], p = at(r, c);
      if (ch === "#") out += '<circle class="wall" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (cell * 0.34).toFixed(1) + '"/>';
      if (ch === "S") start = [r, c];
      if (ch === "E") end = [r, c];
    }
    // breadth-first search for the shortest route
    var prev = {}, q = [start], key = function (a) { return a[0] + "," + a[1]; };
    prev[key(start)] = null;
    while (q.length) {
      var cur = q.shift();
      if (cur[0] === end[0] && cur[1] === end[1]) break;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        var n = [cur[0] + d[0], cur[1] + d[1]];
        if (g[n[0]] && g[n[0]][n[1]] && g[n[0]][n[1]] !== "#" && !(key(n) in prev)) { prev[key(n)] = cur; q.push(n); }
      });
    }
    var pts = [], k = end;
    while (k) { pts.unshift(k); k = prev[key(k)]; }
    var d = pts.map(function (pt, i) { var p = at(pt[0], pt[1]); return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
    var s = at(start[0], start[1]), e = at(end[0], end[1]);
    out += '<path class="ln acc route" d="' + d + '"/>';
    out += '<circle class="end" cx="' + e[0] + '" cy="' + e[1] + '" r="' + (cell * 0.45).toFixed(1) + '"/>';
    out += '<g class="robot"><circle r="' + (cell * 0.5).toFixed(1) + '" cx="0" cy="0"/>' +
      (reduceMotion ? "" : '<animateMotion dur="7s" repeatCount="indefinite" begin="indefinite" path="' + d + '"/>') + "</g>";
    var mid = at(pts[Math.floor(pts.length * 0.55)][0], pts[Math.floor(pts.length * 0.55)][1]);
    return { svg: out, anchors: [s, mid], robotStart: s };
  }

  function drawing(item) {
    var spec = DRAW[item.art];
    if (!spec) return null;
    var built = spec.grid ? mazeSpec(spec) : spec;
    var labels = (item.callouts || []).slice(0, built.anchors.length);
    var marks = labels.map(function (t, i) {
      var a = built.anchors[i];
      return '<g class="mk" data-i="' + i + '" transform="translate(' + a[0] + " " + a[1] + ')"><circle r="9"/><text y="3.6" text-anchor="middle">' + (i + 1) + "</text></g>";
    }).join("");
    var holder = el("div", "drawing-wrap");
    holder.innerHTML = '<svg class="drawing" viewBox="' + (built.box || "0 0 400 225") + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + built.svg + marks + "</svg>";
    var svg = holder.firstChild;
    if (built.robotStart) {
      var rb = svg.querySelector(".robot");
      if (reduceMotion) rb.setAttribute("transform", "translate(" + built.robotStart[0] + " " + built.robotStart[1] + ")");
    }
    // every line draws itself in, staggered
    [].forEach.call(svg.querySelectorAll(".ln"), function (n, i) {
      n.setAttribute("pathLength", "1");
      n.style.setProperty("--i", i);
    });
    var parts = [el("span", "art-tag mono", ["Illustration"]), holder];
    if (labels.length) {
      var legend = el("ol", "callouts mono", labels.map(function (t, i) {
        var li = el("li", null, [el("span", "callout-n", [String(i + 1)]), t]);
        li.addEventListener("mouseenter", function () { svg.querySelector('.mk[data-i="' + i + '"]').classList.add("hot"); });
        li.addEventListener("mouseleave", function () { svg.querySelector('.mk[data-i="' + i + '"]').classList.remove("hot"); });
        return li;
      }));
      parts.push(legend);
    }
    return parts;
  }

  function media(item, cls) {
    var box = el("div", cls);
    if (item.video) {
      var v = document.createElement("video");
      v.src = item.video; v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute("playsinline", ""); v.preload = "metadata";
      if (item.imageAlt) v.setAttribute("aria-label", item.imageAlt);
      if (item.image) v.poster = item.image;
      if (reduceMotion) v.controls = true; else v.autoplay = true;
      box.appendChild(v);
      box.classList.add("has-photo");
    } else if (item.image) {
      var img = document.createElement("img");
      img.src = item.image; img.alt = item.imageAlt || ""; img.loading = "lazy";
      box.appendChild(img);
      box.classList.add("has-photo");
    } else {
      var parts = drawing(item);
      if (parts) {
        box.classList.add("has-drawing");
        parts.forEach(function (p) { box.appendChild(p); });
        if (reduceMotion) box.classList.add("drawn"); else revealQ.observe(box);
      } else box.classList.add("is-empty");
    }
    return box;
  }

  /* ======================= featured ======================= */

  var F = S.featured;
  var fslot = slot("featured");
  if (F && !F.draft) {
    var info = el("div", "feat-info", [
      el("p", "feat-meta mono", [el("span", null, ["Featured"]), el("span", null, [[F.org, F.dates].filter(Boolean).join("  /  ")])]),
      el("h3", "feat-title", [F.title]),
      F.hook ? el("p", "feat-hook", [F.hook]) : null,
      F.points && F.points.length ? bullets(F.points) : null,
      F.result ? el("p", "feat-result", [F.result]) : null,
      F.tools && F.tools.length ? pills(F.tools) : null,
    ]);
    fslot.appendChild(el("article", "feature pane-dark", [media(F, "feat-media art-box"), info]));
  }

  /* ======================= projects ======================= */

  var projects = live(S.projects);
  if (projects.length) {
    var cards = slot("projects");
    projects.forEach(function (p) {
      var card = el("article", "card", [
        media(p, "card-media art-box"),
        el("div", "card-body", [
          el("p", "card-meta mono", [el("span", null, [p.dates]), el("span", null, [p.role])]),
          el("h3", "card-title", [p.title]),
          p.hook ? el("p", "card-hook", [p.hook]) : null,
          p.points && p.points.length ? bullets(p.points) : null,
          p.result ? el("p", "card-result", [p.result]) : null,
          p.tools && p.tools.length ? pills(p.tools) : null,
          p.link ? link(p.link, "View project", "pill pill-ghost card-link") : null,
        ]),
      ]);
      card.id = "project-" + String(p.title).toLowerCase().replace(/\[[^\]]*\]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      cards.appendChild(card);
    });
  } else hide(document.getElementById("projects"));
  if ((!F || F.draft) && !projects.length) hide(document.getElementById("featured"), "#featured");

  /* ======================= timeline (built from the dates) ======================= */

  var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  function when(str, isEnd) {
    str = String(str || "").trim().toLowerCase();
    if (str === "now") { var d = new Date(); return d.getFullYear() + d.getMonth() / 12; }
    var m = str.match(/^([a-z]{3})?[a-z]*\s*(\d{4})$/);
    if (!m) return null;
    var mo = m[1] in MONTHS ? MONTHS[m[1]] : (isEnd ? 11 : 0);
    return +m[2] + (mo + (isEnd ? 1 : 0)) / 12;
  }
  function range(dates) {
    var parts = String(dates || "").split(/\s+to\s+/i);
    var a = when(parts[0], false), b = when(parts[1] || parts[0], true);
    return a == null || b == null ? null : [a, b, /now/i.test(parts[1] || "")];
  }

  function buildTimeline() {
    var T = S.timeline;
    if (!T) return null;
    var rowsData = [];
    jobs.forEach(function (j) {
      var r = range(j.dates);
      if (r) rowsData.push({ label: j.timelineLabel || (j.compact ? j.role : j.org), kind: "work", r: r, faint: !!j.compact, dates: j.dates });
    });
    live(S.projects).forEach(function (p) {
      var r = range(p.dates);
      if (r) rowsData.push({ label: p.timelineLabel || p.title, kind: "project", r: r, dates: p.dates });
    });
    if (S.featured && !S.featured.draft) {
      // the featured project overlaps the Integer job; it's already shown there
    }
    rowsData.sort(function (a, b) { return a.r[0] - b.r[0]; });
    var from = T.from, to = T.to, span = to - from;
    // Years before "cut" are squeezed into a narrow strip (share of the width),
    // so a long early stretch like high school robotics doesn't leave the chart empty.
    var cut = T.cut && T.cut > from && T.cut < to ? T.cut : null, share = T.share || 0.18;
    function frac(v) {
      v = Math.max(from, Math.min(to, v));
      if (!cut) return (v - from) / span;
      return v < cut ? (v - from) / (cut - from) * share : share + (v - cut) / (to - cut) * (1 - share);
    }
    function pct(v) { return (frac(v) * 100).toFixed(2) + "%"; }
    // markers that span all rows sit inside the track column, right of the labels
    function across(v) { return "calc(var(--tl-label) + (100% - var(--tl-label)) * " + frac(v).toFixed(4) + ")"; }

    var wrap = el("figure", "tl");
    var axis = el("div", "tl-axis mono");
    for (var y = from; y <= to; y++) {
      var early = cut && y < cut;
      if (early && ((y - from) % 2 || y >= cut - 1)) continue;   // sparse labels in the squeezed part
      var t = el("span", "tl-year" + (y % 2 ? " odd" : "") + (early && y !== from ? " early" : "") + (y === to ? " end" : ""), [String(y)]);
      t.style.left = pct(y);
      axis.appendChild(t);
    }
    if (cut) {
      var brk = el("span", "tl-break", []);
      brk.style.left = pct(cut - 0.35);
      brk.setAttribute("aria-hidden", "true");
      axis.appendChild(brk);
    }
    var grid = el("div", "tl-rows");
    var gradAt = when(S.graduation, false);
    rowsData.forEach(function (d) {
      var bar = el("span", "tl-bar " + d.kind + (d.r[2] ? " current" : "") + (d.faint ? " faint" : ""));
      bar.style.left = pct(d.r[0]);
      bar.style.width = "calc(" + pct(d.r[1]) + " - " + pct(d.r[0]) + ")";
      grid.appendChild(el("div", "tl-row", [el("span", "tl-label", [d.label, el("span", "sr-only", [", " + d.dates])]), el("span", "tl-track", [bar])]));
    });
    if (T.next && gradAt) {
      var nb = el("span", "tl-bar next");
      nb.style.left = pct(gradAt + 0.25);
      nb.style.width = "calc(" + pct(to) + " - " + pct(gradAt + 0.25) + ")";
      grid.appendChild(el("div", "tl-row", [el("span", "tl-label", [T.next]), el("span", "tl-track", [nb])]));
    }
    if (gradAt) {
      var g = el("span", "tl-grad mono", [el("span", null, ["B.S. " + S.graduation])]);
      g.style.left = across(gradAt);
      grid.appendChild(g);
    }
    if (cut) {
      var gap = el("span", "tl-gap");
      gap.style.left = across(cut - 0.35);
      grid.appendChild(gap);
    }
    var nowMark = el("span", "tl-now");
    nowMark.style.left = across(when("now"));
    grid.appendChild(nowMark);
    wrap.appendChild(el("figcaption", "tl-key mono", [
      el("span", "k work", ["Work and research"]), el("span", "k project", ["Projects"]), el("span", "k current", ["Ongoing"]),
    ]));
    wrap.appendChild(axis);
    wrap.appendChild(grid);
    return wrap;
  }

  /* ======================= experience ======================= */

  var jobs = live(S.experience);
  if (jobs.length) {
    var list = el("ol", "xp");
    jobs.forEach(function (job, i) {
      var head = [
        el("span", "xp-dates mono", [job.dates]),
        el("span", "xp-title", [el("span", "xp-role", [job.role]),
          el("span", "xp-org", [[job.org, job.place].filter(Boolean).join(", ")])]),
      ];
      var item = el("li", "xp-item" + (job.compact ? " compact" : ""));
      if (job.compact || !(job.points && job.points.length)) {
        item.appendChild(el("div", "xp-head", head));
      } else {
        var id = "xp-" + i, open = i < 2;
        var btn = el("button", "xp-head", head.concat([el("span", "xp-toggle", [])]));
        btn.type = "button";
        btn.setAttribute("aria-controls", id);
        btn.setAttribute("aria-expanded", String(open));
        var panel = el("div", "xp-panel", [bullets(job.points, seeLinks)]);
        panel.id = id;
        panel.inert = !open;           // hidden bullets stay out of screen readers and tab order
        if (open) item.classList.add("open");
        btn.addEventListener("click", function () {
          var isOpen = item.classList.toggle("open");
          btn.setAttribute("aria-expanded", String(isOpen));
          panel.inert = !isOpen;
        });
        item.appendChild(btn);
        item.appendChild(panel);
      }
      list.appendChild(item);
    });
    var tl = buildTimeline();
    if (tl) slot("experience").appendChild(tl);
    slot("experience").appendChild(list);
  } else hide(document.getElementById("experience").parentNode, "#experience");

  /* ======================= coursework band ======================= */

  var band = slot("coursework");
  if (S.coursework && S.coursework.length) {
    var track = el("div", "marquee-track");
    track.setAttribute("aria-hidden", "true");
    for (var k = 0; k < 2; k++) {
      S.coursework.forEach(function (c) {
        track.appendChild(el("span", "marquee-item dot", [c]));
        track.appendChild(el("span", "marquee-sep", []));
      });
    }
    var pause = el("button", "pill marquee-btn", ["Pause"]);
    pause.type = "button";
    pause.setAttribute("aria-label", "Pause the coursework ticker");
    pause.addEventListener("click", function () {
      var paused = band.classList.toggle("paused");
      pause.firstChild.textContent = paused ? "Play" : "Pause";
      pause.setAttribute("aria-label", (paused ? "Play" : "Pause") + " the coursework ticker");
    });
    band.appendChild(el("p", "marquee-label mono", ["Coursework"]));
    band.appendChild(el("p", "sr-only", ["Related coursework: " + S.coursework.join(", ") + "."]));
    band.appendChild(el("div", "marquee-window", [track]));
    band.appendChild(pause);
  } else hide(band);

  /* ======================= skills (spec sheet) ======================= */

  var skills = live(S.skills);
  if (skills.length) {
    var sk = slot("skills");
    var caps = live(S.capabilities);
    if (caps.length) {
      sk.appendChild(el("div", "caps", caps.map(function (cap) {
        return el("article", "cap", [el("h3", "cap-title dot", [cap.title]), bullets(cap.proof)]);
      })));
    }
    var dl = el("dl", "spec");
    skills.forEach(function (g) {
      dl.appendChild(el("div", "spec-row", [
        el("dt", "mono", [g.group]),
        el("dd", null, [el("ul", "spec-items", (g.items || []).map(function (t) { return el("li", null, [t]); }))]),
      ]));
    });
    sk.appendChild(dl);
  } else hide(document.getElementById("skills").parentNode, "#skills");

  /* ======================= hobbies (only shows if content.js has a hobbies block) ======================= */

  var H = S.hobbies;
  var hp = document.getElementById("hobbies-pane");
  if (H && !H.draft && hp) {
    hp.hidden = false;
    var hs = slot("hobbies");
    if (H.title) document.getElementById("hobbies-h").textContent = H.title;
    if (H.intro) hs.appendChild(el("p", "hob-intro", [H.intro]));
    var hgrid = el("div", "hob-grid");
    (H.items || []).forEach(function (it) {
      var hasPhotos = it.photos && it.photos.length;
      var card = el("article", "hob-card" + (hasPhotos || it.wide ? " wide" : ""), [
        el("h3", "hob-name dot", [it.name]),
        it.text ? el("p", "hob-text", [it.text]) : null,
      ]);
      if (it.keys) card.appendChild(keyboard());
      if (hasPhotos) {
        card.appendChild(el("div", "hob-photos", it.photos.map(function (ph) {
          var f = el("figure", "hob-photo" + (ph.image ? "" : " empty"));
          if (ph.image) {
            var im = document.createElement("img");
            im.src = ph.image; im.alt = ph.alt || ""; im.loading = "lazy";
            f.appendChild(im);
          } else f.appendChild(el("span", "mono", ["Photo"]));
          if (ph.caption) f.appendChild(el("figcaption", "mono", [ph.caption]));
          return f;
        })));
      }
      hgrid.appendChild(card);
    });
    hs.appendChild(hgrid);
    var menuList = document.querySelector(".menu-list");
    var li = el("li", null, []);
    var a = el("a", null, [H.menuLabel || "Off the clock"]);
    a.href = "#hobbies"; a.setAttribute("data-scramble", "");
    li.appendChild(a);
    menuList.insertBefore(li, menuList.lastElementChild);
  }

  // A one-octave keyboard that plays real notes (Web Audio). Keys A to K work too.
  function keyboard() {
    var notes = [["C", 261.63, 0], ["C#", 277.18, 1], ["D", 293.66, 0], ["D#", 311.13, 1], ["E", 329.63, 0],
      ["F", 349.23, 0], ["F#", 369.99, 1], ["G", 392.0, 0], ["G#", 415.3, 1], ["A", 440.0, 0], ["A#", 466.16, 1],
      ["B", 493.88, 0], ["C", 523.25, 0]];
    var keysMap = "awsedftgyhujk";
    var ctx = null;
    function play(f) {
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
        o.type = "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.25, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 1.2);
      } catch (e) {}
    }
    var kb = el("div", "kb");
    kb.setAttribute("role", "group");
    kb.setAttribute("aria-label", "Playable keyboard, one octave");
    var whiteIndex = 0, buttons = [];
    notes.forEach(function (n, i) {
      var b = el("button", "kb-key " + (n[2] ? "black" : "white"), []);
      b.type = "button";
      b.setAttribute("aria-label", "Play " + n[0].replace("#", " sharp") + (i === 12 ? " (high)" : ""));
      if (n[2]) b.style.left = "calc(" + (whiteIndex / 8 * 100) + "% - var(--bk) / 2)";
      else whiteIndex++;
      function hit() { play(n[1]); b.classList.add("down"); setTimeout(function () { b.classList.remove("down"); }, 160); }
      b.addEventListener("pointerdown", function (e) { e.preventDefault(); hit(); });
      b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(); } });
      buttons.push({ b: b, hit: hit });
      kb.appendChild(b);
    });
    kb.addEventListener("keydown", function (e) {
      var i = keysMap.indexOf(e.key.toLowerCase());
      if (i > -1 && !e.repeat) buttons[i].hit();
    });
    return el("div", "kb-wrap", [kb, el("p", "kb-hint mono", ["Tap a key"])]);
  }

  /* ======================= contact + footer ======================= */

  var c = slot("contact");
  if (S.contactLine) c.appendChild(el("p", "contact-text", [S.contactLine]));
  var ca = actionRow(L.email);
  if (L.email && navigator.clipboard) {
    var copy = el("button", "pill pill-ghost copy-btn", ["Copy email"]);
    copy.type = "button";
    var copyStatus = el("span", "sr-only", []);
    copyStatus.setAttribute("role", "status");
    function setLabel(n, t) {
      if (n._scr) cancelAnimationFrame(n._scr);   // stop any hover scramble so it can't overwrite this
      n.removeAttribute("data-final");
      n.setAttribute("aria-label", t);
      n.textContent = t;
    }
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(L.email).then(function () {
        setLabel(copy, "Copied");
        copyStatus.textContent = "Email address copied";
        setTimeout(function () { setLabel(copy, "Copy email"); copyStatus.textContent = ""; }, 1800);
      }, function () { setLabel(copy, L.email); });
    });
    ca.appendChild(copy);
    ca.appendChild(copyStatus);
  }
  c.appendChild(ca);

  // The footer is laid out like the title block in the corner of an engineering drawing.
  (function () {
    var initials = (S.firstName || "").charAt(0) + ". " + (S.lastName || "");
    function cell(label, value, cls) {
      return el("div", "tb-cell" + (cls ? " " + cls : ""), [el("span", "tb-label", [label]), el("span", "tb-value", [value])]);
    }
    var tb = el("div", "tblock mono", [
      cell("Title", fullName + ", portfolio and resume", "tb-title"),
      cell("Engineer", initials),
      cell("Discipline", S.discipline || ""),
      cell("Date", S.lastUpdated || ""),
      cell("Scale", "1:1"),
      cell("Units", "in."),
      cell("Sheet", "1 of 1"),
      cell("Rev", S.revision || "A", "tb-rev"),
    ]);
    tb.setAttribute("role", "group");
    tb.setAttribute("aria-label", "Site details");
    slot("footer").appendChild(tb);
    slot("footer").appendChild(el("p", "tb-copy", ["\u00A9 " + new Date().getFullYear() + " " + fullName]));
  })();

  /* ======================= scrambling dot text ======================= */

  var LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", DIGITS = "0123456789";
  function scramble(node, ms, glyphs) {
    if (reduceMotion || node.querySelector(".todo, .sr-only")) return;
    var final = node.getAttribute("data-final");
    if (!final) {
      final = node.textContent;
      node.setAttribute("data-final", final);
      // Keep the accessible name readable while the letters are scrambled.
      if (!node.hasAttribute("aria-label") && !node.hasAttribute("aria-hidden")) node.setAttribute("aria-label", final);
    }
    if (node._scr) cancelAnimationFrame(node._scr);
    var set = glyphs || LETTERS;
    var start = performance.now(), dur = ms || 650, lastTick = 0;
    function frame(now) {
      var t = (now - start) / dur;
      if (now - lastTick > 45 || t >= 1) {
        lastTick = now;
        var out = "";
        for (var i = 0; i < final.length; i++) {
          var ch = final[i];
          var keep = !/[A-Za-z0-9]/.test(ch) || t >= 1 || i / final.length < t * 1.15 - 0.15;
          out += keep ? ch : set[(Math.random() * set.length) | 0];
        }
        node.textContent = out;
      }
      if (t < 1) node._scr = requestAnimationFrame(frame);
    }
    node._scr = requestAnimationFrame(frame);
  }

  // Headings and numbers decode the first time they scroll into view.
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var n = e.target;
      if (n.hasAttribute("data-count")) scramble(n, 1100, DIGITS);
      else scramble(n);
      seen.unobserve(n);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".sec [data-scramble], .contact [data-scramble], [data-count]").forEach(function (n) {
    seen.observe(n);
  });

  // Small controls re-scramble on hover. The email pill is skipped so the address stays readable.
  document.querySelectorAll('.pill:not([href^="mailto"]):not(.marquee-btn), .bar-name').forEach(function (n) {
    n.addEventListener("mouseenter", function () { scramble(n, 380); });
  });

  /* ======================= menu ======================= */

  if (L.resume) {
    var ml = document.querySelector(".menu-list"), rli = el("li", null, []);
    var ra = el("a", null, ["Resume"]); ra.href = L.resume; ra.setAttribute("data-scramble", "");
    rli.appendChild(ra); ml.appendChild(rli);
  }
  var menu = document.getElementById("menu");
  var menuBtn = document.querySelector(".menu-btn");
  var menuLinks = menu.querySelectorAll("a");
  var behind = [document.querySelector(".skip"), document.getElementById("main"), document.querySelector(".foot")];
  document.getElementById("bar-name").addEventListener("click", function () {
    if (document.body.classList.contains("menu-open")) setMenu(false);
  });

  function setMenu(open) {
    if (menuBtn._scr) cancelAnimationFrame(menuBtn._scr); // stop any hover scramble
    menuBtn.removeAttribute("data-final");
    menuBtn.removeAttribute("aria-label");
    menuBtn.textContent = open ? "Close" : "Menu";
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    behind.forEach(function (b) { if (b) b.inert = open; }); // keep Tab inside the menu
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("open"); });
      menuLinks.forEach(function (a, i) {
        setTimeout(function () { scramble(a, 520); }, 60 + i * 70);
      });
      setTimeout(function () { menuLinks[0] && menuLinks[0].focus({ preventScroll: true }); }, 50);
    } else {
      menu.classList.remove("open");
      setTimeout(function () { if (!menu.classList.contains("open")) menu.hidden = true; }, reduceMotion ? 0 : 320);
    }
  }
  menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
  menuLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
      // Move focus to the section heading so keyboard users land where they jumped.
      var t = a.hash && document.querySelector(a.hash + " h2");
      if (t) { t.tabIndex = -1; setTimeout(function () { t.focus({ preventScroll: true }); }, 0); }
    });
    a.addEventListener("mouseenter", function () { scramble(a, 380); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
  });

  /* ======================= top bar follows the pane color ======================= */

  var bar = document.querySelector(".bar");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var panes = document.querySelectorAll("[data-pane]");
  var THEME = { dark: "#000000", light: "#F4F4F4", white: "#FFFFFF", red: "#D71921" };
  var barTick = 0;
  function updateBar() {
    barTick = 0;
    var y = bar.offsetHeight / 2, kind = "dark";
    for (var i = 0; i < panes.length; i++) {
      var r = panes[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { kind = panes[i].getAttribute("data-pane"); break; }
    }
    bar.setAttribute("data-on", kind);
    if (themeMeta) themeMeta.content = THEME[kind] || THEME.dark;
    turnGear();
  }

  /* ---------- scroll gear: turns as you scroll, teeth fill red toward the bottom ---------- */
  var gearHost = document.querySelector(".gear"), gearRot = null, gearTeeth = [];
  if (gearHost) {
    var NS = "http://www.w3.org/2000/svg", TEETH = 12;
    var svgG = document.createElementNS(NS, "svg");
    svgG.setAttribute("viewBox", "-20 -20 40 40");
    svgG.setAttribute("focusable", "false");
    gearRot = document.createElementNS(NS, "g");
    for (var ti = 0; ti < TEETH; ti++) {
      var tooth = document.createElementNS(NS, "rect");
      tooth.setAttribute("x", "-2.6"); tooth.setAttribute("y", "-18"); tooth.setAttribute("width", "5.2");
      tooth.setAttribute("height", "6.5"); tooth.setAttribute("rx", "1");
      tooth.setAttribute("transform", "rotate(" + (ti * 360 / TEETH) + ")");
      tooth.setAttribute("class", "gear-tooth");
      gearRot.appendChild(tooth);
      gearTeeth.push(tooth);
    }
    var body = document.createElementNS(NS, "circle");
    body.setAttribute("r", "12.5"); body.setAttribute("class", "gear-body");
    var hub = document.createElementNS(NS, "circle");
    hub.setAttribute("r", "4"); hub.setAttribute("class", "gear-hub");
    var keyway = document.createElementNS(NS, "rect");
    keyway.setAttribute("x", "-1.2"); keyway.setAttribute("y", "-6.4"); keyway.setAttribute("width", "2.4"); keyway.setAttribute("height", "3");
    keyway.setAttribute("class", "gear-key");
    gearRot.appendChild(body); gearRot.appendChild(hub); gearRot.appendChild(keyway);
    svgG.appendChild(gearRot);
    gearHost.appendChild(svgG);
  }
  function turnGear() {
    if (!gearRot) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    gearRot.setAttribute("transform", reduceMotion ? "" : "rotate(" + (p * 720).toFixed(1) + ")");
    var lit = Math.round(p * gearTeeth.length);
    gearTeeth.forEach(function (t, i) { t.classList.toggle("lit", i < lit); });
  }
  window.addEventListener("scroll", function () { if (!barTick) barTick = requestAnimationFrame(updateBar); }, { passive: true });
  window.addEventListener("resize", updateBar);
  updateBar();

  /* ======================= dot field ======================= */
  // A grid of dots that brighten near the pointer, with random dots
  // blinking on and off like the Glyph lights on Nothing phones.

  function dotfield(canvas) {
    var ctx = canvas.getContext("2d");
    var host = canvas.parentElement;
    var gap, cols, rows, w, h, dpr, rgb, baseA;
    var px = -9999, py = -9999, visible = false, raf = 0;
    var blinks = [], lastSpawn = 0;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var cs = getComputedStyle(host);
      rgb = cs.getPropertyValue("--dot-rgb").trim() || "255,255,255";
      baseA = parseFloat(cs.getPropertyValue("--dot-a")) || 0.13;
      gap = w < 600 ? 16 : 20;
      cols = Math.ceil(w / gap) + 1; rows = Math.ceil(h / gap) + 1;
      blinks = [];
      draw(performance.now());
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      var R = 150, ox = (w % gap) / 2, oy = (h % gap) / 2;
      var lit = {};
      blinks = blinks.filter(function (b) { return now - b.t < b.life; });
      blinks.forEach(function (b) {
        lit[b.i] = { a: Math.sin(((now - b.t) / b.life) * Math.PI), red: b.red };
      });
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = ox + c * gap, y = oy + r * gap;
          var dx = x - px, dy = y - py, d = Math.sqrt(dx * dx + dy * dy);
          var near = d < R ? Math.pow(1 - d / R, 2) : 0;
          var b = lit[r * cols + c];
          var a = Math.min(1, baseA + near * 0.75 + (b ? b.a * 0.8 : 0));
          ctx.fillStyle = b && b.red ? "rgba(215,25,33," + a + ")" : "rgba(" + rgb + "," + a + ")";
          ctx.beginPath(); ctx.arc(x, y, 1 + near * 1.1 + (b ? b.a * 0.8 : 0), 0, 6.2832); ctx.fill();
        }
      }
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden || reduceMotion) return;
      if (now - lastSpawn > 140) {
        lastSpawn = now;
        blinks.push({ i: (Math.random() * cols * rows) | 0, t: now, life: 900 + Math.random() * 900, red: Math.random() < 0.06 });
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf && !reduceMotion) raf = requestAnimationFrame(loop); }

    host.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left; py = e.clientY - rect.top;
      if (reduceMotion) draw(performance.now()); else kick();
    });
    host.addEventListener("pointerleave", function () {
      px = py = -9999;
      if (reduceMotion) draw(performance.now());
    });
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) kick();
    }).observe(host);
    document.addEventListener("visibilitychange", kick);
    onMotionChange.push(function () { blinks = []; draw(performance.now()); kick(); });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 150); });
    size();
  }

  document.querySelectorAll(".dotfield").forEach(dotfield);

  onMotionChange.push(function () {
    document.querySelectorAll("svg.drawing").forEach(function (s) {
      try { if (reduceMotion) s.pauseAnimations(); else s.unpauseAnimations(); } catch (e) {}
    });
  });

  /* ---------- CAD-style crosshair in the hero ----------
     With a mouse, the cursor becomes a crosshair that snaps to the dot grid,
     with live X/Y coordinates in inches from the hero's center (Y up is
     positive, like a sketch in SolidWorks). Touch screens skip this. */
  (function () {
    var heroEl = document.querySelector(".hero");
    if (!heroEl || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var hl = el("span", "cad-h", []), vl = el("span", "cad-v", []), box = el("span", "cad-box", []);
    var read = el("p", "cad-read mono", []);
    [hl, vl, box, read].forEach(function (n) { n.setAttribute("aria-hidden", "true"); heroEl.appendChild(n); });
    heroEl.classList.add("cad-on");
    var raf = 0, ex = 0, ey = 0;
    function fmt(v) { return (v >= 0 ? "+" : "\u2212") + Math.abs(v).toFixed(3); }
    function draw() {
      raf = 0;
      var w = heroEl.clientWidth, h = heroEl.clientHeight, gap = w < 600 ? 16 : 20;
      var ox = (w % gap) / 2, oy = (h % gap) / 2;
      var sx = ox + Math.round((ex - ox) / gap) * gap, sy = oy + Math.round((ey - oy) / gap) * gap;
      hl.style.transform = "translateY(" + sy + "px)";
      vl.style.transform = "translateX(" + sx + "px)";
      box.style.transform = "translate(" + sx + "px," + sy + "px)";
      read.textContent = "X " + fmt((sx - w / 2) / 96) + "   Y " + fmt((h / 2 - sy) / 96) + "   IN   SNAP: GRID";
    }
    heroEl.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var r = heroEl.getBoundingClientRect();
      ex = e.clientX - r.left; ey = e.clientY - r.top;
      heroEl.classList.add("cad-active");
      if (!raf) raf = requestAnimationFrame(draw);
    });
    heroEl.addEventListener("pointerleave", function () { heroEl.classList.remove("cad-active"); });
  })();

  /* ======================= content rises in on scroll ======================= */
  // Blocks fade up a short distance the first time they scroll into view.
  // Blocks entering together are staggered slightly. Skipped for reduced motion.
  (function () {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll(".num, .about-copy, .facts, .feature, .card, .tl, .xp-item, " +
      ".cap, .spec, .hob-intro, .hob-card, .contact-text");
    function show(n, delay) {
      n.style.transitionDelay = delay + "ms";
      n.classList.add("in");
      // clear the delay afterwards so hover transitions on the block stay instant
      setTimeout(function () { n.style.transitionDelay = ""; }, delay + 800);
    }
    var pending = [].slice.call(targets);
    function done(n) { io.unobserve(n); pending.splice(pending.indexOf(n), 1); }
    var io = new IntersectionObserver(function (es) {
      var k = 0;
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        show(e.target, Math.min(k++, 4) * 80);
        done(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (n) { n.classList.add("rise"); io.observe(n); });
    // A jump (link, reload partway down) can carry a block from below the screen to
    // above it without it ever intersecting. Show those right away.
    var skipTick = 0;
    function catchUp() {
      skipTick = 0;
      pending.slice().forEach(function (n) {
        if (n.getBoundingClientRect().bottom < 0) { n.classList.add("in"); done(n); }
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() { if (!skipTick) skipTick = requestAnimationFrame(catchUp); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", catchUp);
    onMotionChange.push(function () {
      if (reduceMotion) pending.slice().forEach(function (n) { n.classList.add("in"); done(n); });
    });
  })();

  // Hero name decodes on load.
  setTimeout(function () {
    name.querySelectorAll("[data-scramble]").forEach(function (s, i) {
      setTimeout(function () { scramble(s, 900); }, i * 180);
    });
  }, 150);
})();
