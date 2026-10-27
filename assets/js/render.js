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

  // Hyphenated terms like "5-DOF" or "3D-printed" stay on one line.
  function words(frag, str) {
    str.split(/(\S*[A-Za-z0-9]-[A-Za-z0-9]\S*)/).forEach(function (part, i) {
      if (!part) return;
      if (i % 2) {
        var s = document.createElement("span");
        s.className = "nowrap";
        s.textContent = part;
        frag.appendChild(s);
      } else frag.appendChild(document.createTextNode(part));
    });
  }

  // Turn a string into nodes, wrapping any [placeholder] in a marked span.
  function text(str) {
    var frag = document.createDocumentFragment();
    var re = /\[[^\[\]]+\]/g, last = 0, m;
    str = String(str);
    while ((m = re.exec(str))) {
      if (m.index > last) words(frag, str.slice(last, m.index));
      var s = document.createElement("span");
      s.className = "todo";
      s.title = "Placeholder: replace in content.js";
      s.textContent = m[0];
      frag.appendChild(s);
      last = re.lastIndex;
    }
    if (last < str.length) words(frag, str.slice(last));
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

  function slug(str) {
    return String(str || "").toLowerCase().replace(/\[[^\]]*\]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // Ids for cards and jobs. Two items with the same title still get different ids.
  var usedIds = {};
  function uniqueId(base) {
    base = base.replace(/-$/, "") || "item";
    var id = base, n = 2;
    while (usedIds[id] || document.getElementById(id)) id = base + "-" + n++;
    usedIds[id] = true;
    return id;
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
      return el("li", "tag mono", [el("span", null, [t])]);
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
      knowsAbout: (S.skills || []).reduce(function (all, g) { return all.concat(g.items || []); }, [])
        .map(function (t) { return String(t).replace(/\s*\(.*?\)/g, ""); }),
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
  if (S.seeking) hero.appendChild(el("p", "status seeking mono", [S.seeking]));
  hero.appendChild(actionRow());

  /* ======================= numbers strip ======================= */

  var nums = slot("numbers");
  var numbers = live(S.numbers);
  if (numbers.length) {
    var ul = el("ul", "num-list");
    numbers.forEach(function (n) {
      // "since: 2018" turns into the number of years since then
      var value = n.since ? String(new Date().getFullYear() - n.since) : n.value;
      var v = el("span", "num-value dot", [value]);
      v.setAttribute("data-count", value);
      v.setAttribute("aria-hidden", "true");   // the digits scramble; screen readers get the sr-only copy

      if (String(value).length > 3) v.classList.add("is-long");
      ul.appendChild(el("li", "num", [
        el("p", "num-fig", [n.pre ? el("span", "num-pre mono", [n.pre]) : null, v, el("span", "sr-only", [n.spoken || String(value)]),
          n.unit ? el("span", "num-unit mono", [n.unit]) : null]),
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
    // Only the first sentence is set large; the rest of that paragraph joins the body text.
    var paras = S.about.slice(), m = /^(.+?[a-z0-9][.!?])\s+([A-Z].*)$/.exec(paras[0]);
    if (m) paras.splice(0, 1, m[1], m[2]);
    paras.forEach(function (p, i) { copy.appendChild(el("p", i === 0 ? "lead" : "body", [p])); });
    ab.appendChild(copy);
    ab.appendChild(el("dl", "facts mono", [
      ["School", S.school], ["Degree", "B.S. " + S.discipline], ["Minor", S.minor],
      ["Graduating", S.graduation], [S.locationLabel || "Hometown", S.location], ["Currently in", S.currentLocation],
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

  var figCount = 0;   // drawings are numbered like figures on a drawing sheet
  // keeps "Fig. 01, 02, ..." in page order (a photo that falls back to its drawing joins late)
  function renumberFigs() {
    [].forEach.call(document.querySelectorAll(".art-tag"), function (t, i) {
      t.textContent = t.textContent.replace(/^Fig\. \d+/, "Fig. " + (i < 9 ? "0" : "") + (i + 1));
    });
  }
  function drawing(item) {
    var spec = DRAW[item.art];
    if (!spec) return null;
    figCount++;
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
    // "Illustration" stays so nobody mistakes the drawing for his actual CAD
    var tag = el("span", "art-tag mono", ["Fig. " + (figCount < 10 ? "0" : "") + figCount + " / Illustration"]);
    tag.setAttribute("aria-hidden", "true");
    var parts = [tag, holder];
    if (labels.length) {
      var legend = el("ol", "callouts mono", labels.map(function (t, i) {
        var li = el("li", null, [el("span", "callout-n", [String(i + 1)]), el("span", null, [t])]);
        li.addEventListener("mouseenter", function () { svg.querySelector('.mk[data-i="' + i + '"]').classList.add("hot"); });
        li.addEventListener("mouseleave", function () { svg.querySelector('.mk[data-i="' + i + '"]').classList.remove("hot"); });
        return li;
      }));
      legend.setAttribute("aria-label", "Parts in the drawing");
      parts.push(legend);
    }
    return parts;
  }

  // Videos loop silently, but only while on screen. With reduced motion they wait
  // on their poster frame until someone presses Play.
  function syncVideo(v) {
    var want = v._userWants != null ? v._userWants : !reduceMotion;
    if (want && v._onScreen) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    else v.pause();
  }
  var videoQ = new IntersectionObserver(function (es) {
    es.forEach(function (e) { e.target._onScreen = e.isIntersecting; syncVideo(e.target); });
  });
  onMotionChange.push(function () { document.querySelectorAll(".art-box video").forEach(syncVideo); });

  function video(item, box) {
    var v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.preload = "metadata";
    [[item.videoWebm, "video/webm"], [item.video, "video/mp4"]].forEach(function (s) {
      if (!s[0]) return;
      var src = document.createElement("source");
      src.src = s[0]; src.type = s[1];
      v.appendChild(src);
    });
    if (item.imageAlt) { v.setAttribute("role", "img"); v.setAttribute("aria-label", item.imageAlt); }
    if (item.image) v.poster = item.image;
    figCount++;
    var tag = el("span", "art-tag mono", ["Fig. " + (figCount < 10 ? "0" : "") + figCount + " / " + (item.mediaTag || "Video")]);
    tag.setAttribute("aria-hidden", "true");
    var btn = el("button", "pill pill-ghost vid-btn", ["Play"]);
    btn.type = "button";
    function label() {
      var t = v.paused ? "Play" : "Pause";
      btn.textContent = t;
      btn.setAttribute("aria-label", t + " the " + (item.mediaTag || "video").toLowerCase());
    }
    v.addEventListener("play", label);
    v.addEventListener("pause", label);
    label();
    btn.addEventListener("click", function () { v._userWants = v.paused; syncVideo(v); });
    box.appendChild(tag);
    box.appendChild(el("div", "video-wrap", [v]));
    box.appendChild(btn);
    box.classList.add("has-video");
    videoQ.observe(v);
  }

  /* Media tabs: a card's picture area can switch between views, for example
     "Drawing / Photos (2)" or "3D model / Photo". The first tab is the card's usual
     media (drawing, 3D model, video, or photo); each other tab is a set of photos with
     captions. Add a tab in content.js ("tabs") and it shows up here. All panels share
     one box, so switching never changes its size. */
  function gallery(photos, label) {
    var i = 0;
    var img = document.createElement("img");
    img.loading = "lazy";
    var open = el("button", "gal-photo", [img, el("span", "sr-only", [" (opens a larger photo)"])]);
    open.type = "button";
    open.addEventListener("click", function () { var p = photos[i]; lightbox(p.image, p.alt, p.caption); });
    var cap = el("p", "gal-cap mono", []);
    var count = el("span", "gal-count mono", []);
    count.setAttribute("aria-live", "polite");
    function show(n) {
      i = (n + photos.length) % photos.length;
      img.src = photos[i].image; img.alt = photos[i].alt || "";
      cap.textContent = photos[i].caption || "";
      count.textContent = (i + 1) + " / " + photos.length;
    }
    function arrow(txt, name, d) {
      var b = el("button", "gal-arrow", [txt]);
      b.type = "button";
      b.setAttribute("aria-label", name);
      b.addEventListener("click", function () { show(i + d); });
      return b;
    }
    var nav = photos.length > 1 ? el("span", "gal-nav", [arrow("\u2190", "Previous photo", -1), count, arrow("\u2192", "Next photo", 1)]) : null;
    show(0);
    var panel = el("div", "tab-media art-box has-gallery", [el("div", "gal-stage", [open]), el("div", "gal-bar", [cap, nav])]);
    // left and right arrow keys step through the photos, like the arrow buttons
    if (photos.length > 1) panel.addEventListener("keydown", function (e) {
      var d = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
      if (!d) return;
      e.preventDefault();
      show(i + d);
    });
    panel.setAttribute("aria-label", label);
    return panel;
  }

  /* A wiring schematic tab (drawings.js has the SVG). When the tab first shows on
     screen, the parts fade in and each wire traces itself in turn; then small blue
     dots run along the wires every few seconds in the direction the signal flows
     (Pi to Arduino to motor controller to servos). Hovering, tapping, or focusing a
     part lights its wires and shows a note from content.js. Reduced motion: drawn
     at once, no dots. Nothing animates while the tab is hidden or off screen. */
  function schematic(tab) {
    var spec = DRAW[tab.schematic];
    if (!spec) return el("div", "tab-media art-box", []);
    var notes = tab.notes || {};
    var wrap = el("div", "sch-wrap", []);
    wrap.innerHTML = '<svg class="sch" viewBox="' + spec.box + '" preserveAspectRatio="xMidYMid meet" role="group" aria-label="' +
      tab.label + ' diagram">' + spec.svg + '<g class="sch-pulses" aria-hidden="true"></g></svg>';
    var svg = wrap.firstChild;
    var wires = [].slice.call(svg.querySelectorAll(".sch-wire"));
    var parts = [].slice.call(svg.querySelectorAll(".sch-part"));
    var pulses = svg.querySelector(".sch-pulses");
    var cap = el("p", "gal-cap mono sch-cap", []);
    function hint() {
      cap.textContent = "";
      cap.appendChild(el("span", "hint-mouse", [tab.hint || ""]));
      cap.appendChild(el("span", "hint-touch", [tab.hintTouch || tab.hint || ""]));
    }
    hint();

    /* highlight a part and its wires */
    var pinned = null;
    function key(g) { return g.getAttribute("data-id") || g.getAttribute("data-part"); }
    function light(g) {
      var k = g ? key(g) : null;
      parts.forEach(function (p) { p.classList.toggle("hot", p === g); });
      wires.forEach(function (w) { w.classList.toggle("hot", !!k && w.getAttribute("data-ends").split(" ").indexOf(k) > -1); });
      if (g) cap.textContent = notes[g.getAttribute("data-part")] || ""; else hint();
    }
    parts.forEach(function (g) {
      var note = notes[g.getAttribute("data-part")] || "";
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-label", note);
      g.addEventListener("mouseenter", function () { if (!pinned) light(g); });
      g.addEventListener("mouseleave", function () { if (!pinned) light(null); });
      g.addEventListener("focus", function () { light(g); });
      g.addEventListener("blur", function () { light(pinned); });
      g.addEventListener("click", function () { pinned = pinned === g ? null : g; light(pinned || g); });
    });

    /* draw-in and pulses */
    var lens = wires.map(function (w) { return w.getTotalLength ? w.getTotalLength() : 60; });
    var drawn = false, started = false, shown = true, onScreen = false, raf = 0, t0 = 0;
    function setDash(on) {
      wires.forEach(function (w, i) {
        w.style.transition = "none";
        w.style.strokeDasharray = on ? lens[i] : "";
        w.style.strokeDashoffset = on ? lens[i] : "";
      });
    }
    function finish() { drawn = true; svg.classList.add("sch-in"); setDash(false); loop(); }
    function start() {
      if (started) return;
      started = true;
      if (reduceMotion) { finish(); return; }
      svg.classList.add("sch-in");                       // parts fade in
      var step = 190, lead = 450;
      wires.forEach(function (w, i) {
        void w.getBoundingClientRect();
        w.style.transition = "stroke-dashoffset .32s linear " + (lead + i * step) + "ms";
        w.style.strokeDashoffset = "0";
      });
      setTimeout(function () { if (!drawn) finish(); }, lead + wires.length * step + 360);
    }
    // the dots run one group at a time: Pi to Arduino, then Arduino to controller,
    // then controller to servos, then a pause
    var groups = [0, 1, 2].map(function (n) { return wires.filter(function (w) { return w.getAttribute("data-step") === String(n); }); });
    var LEG = 650, REST = 2600, CYCLE = LEG * 3 + REST;
    function frame(now) {
      raf = 0;
      if (!t0) t0 = now;
      var t = (now - t0) % CYCLE, g = Math.floor(t / LEG), f = (t % LEG) / LEG;
      pulses.textContent = "";
      if (g < 3) groups[g].forEach(function (w) {
        var p = w.getPointAtLength(w.getTotalLength() * f);
        var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("class", "sch-pulse"); c.setAttribute("r", "3.2");
        c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
        pulses.appendChild(c);
      });
      loop();
    }
    function loop() {
      if (raf || !drawn || reduceMotion || !shown || !onScreen) { if (reduceMotion) pulses.textContent = ""; return; }
      raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
    function update() {
      if (shown && onScreen) { start(); loop(); } else stop();
    }
    if (!reduceMotion) setDash(true); else finish();

    var panel = el("div", "tab-media art-box has-schematic", [wrap, el("div", "gal-bar", [cap])]);
    panel.addEventListener("tabvisibility", function (e) { shown = e.detail; update(); });
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; update(); }, { threshold: 0.3 }).observe(panel);
    onMotionChange.push(function () { if (reduceMotion) { stop(); finish(); pulses.textContent = ""; } else loop(); });
    return panel;
  }

  var tabsN = 0;
  function tabbedMedia(item, cls) {
    var n = ++tabsN;
    var outer = el("div", cls + " has-tabs");
    var first = Object.assign({}, item, { tabs: null });
    var panels = item.tabs.map(function (t, k) {
      return k === 0 ? media(first, "tab-media art-box") : t.schematic ? schematic(t) : gallery(t.photos || [], t.label);
    });
    var tabs = item.tabs.map(function (t, k) {
      var count = t.photos && t.photos.length > 1 ? " (" + t.photos.length + ")" : "";
      var b = el("button", "media-tab mono", [t.label + count]);
      b.type = "button";
      b.id = "mtab-" + n + "-" + k;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "mpanel-" + n + "-" + k);
      panels[k].id = "mpanel-" + n + "-" + k;
      panels[k].setAttribute("role", "tabpanel");
      panels[k].setAttribute("aria-labelledby", b.id);
      b.addEventListener("click", function () { select(k); });
      return b;
    });
    function select(k, focus) {
      tabs.forEach(function (b, j) {
        var on = j === k;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        panels[j].classList.toggle("is-off", !on);
        panels[j].inert = !on;
        // lets a hidden 3D model stop drawing (assets/js/model3d.js)
        panels[j].dispatchEvent(new CustomEvent("tabvisibility", { detail: on }));
      });
      if (focus) tabs[k].focus();
    }
    var row = el("div", "media-tabs", tabs);
    row.setAttribute("role", "tablist");
    row.setAttribute("aria-label", "Pictures of " + item.title);
    row.addEventListener("keydown", function (e) {
      var now = tabs.indexOf(document.activeElement);
      if (now < 0) return;
      var to = { ArrowRight: now + 1, ArrowLeft: now - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      select((to + tabs.length) % tabs.length, true);
    });
    outer.appendChild(row);
    outer.appendChild(el("div", "tab-stack", panels));
    select(0);
    return outer;
  }

  function media(item, cls) {
    if (item.tabs && item.tabs.length > 1) return tabbedMedia(item, cls);
    var box = el("div", cls);
    if (item.video) {
      video(item, box);
    } else if (item.image) {
      var img = document.createElement("img");
      img.src = item.image; img.alt = item.imageAlt || ""; img.loading = "lazy";
      // if the photo can't load, the line drawing takes its place
      img.addEventListener("error", function () {
        var parts = drawing(item);
        if (!parts) return;
        box.removeChild(img);
        box.classList.remove("has-photo");
        box.classList.add("has-drawing", "drawn");
        parts.forEach(function (p) { box.appendChild(p); });
        renumberFigs();
      });
      box.appendChild(img);
      box.classList.add("has-photo");
      if (item.imageFit === "contain") box.classList.add("fit-contain");
      if (item.imagePosition) img.style.objectPosition = item.imagePosition;   // which part stays in view when cropped
    } else {
      var parts = drawing(item);
      if (parts) {
        box.classList.add("has-drawing");
        parts.forEach(function (p) { box.appendChild(p); });
        if (reduceMotion) box.classList.add("drawn"); else revealQ.observe(box);
        // a 3D CAD model replaces the drawing once it loads (assets/js/model3d.js); the drawing is the fallback
        if (item.model && window.CADMODEL) window.CADMODEL.attach(box, item, {
          reduceMotion: function () { return reduceMotion; },
          onMotionChange: function (f) { onMotionChange.push(f); },
        });
      } else box.classList.add("is-empty");
    }
    return box;
  }

  /* ======================= featured ======================= */

  // Optional second photo (image2), with a caption: on the featured card, and smaller on project cards.
  function secondPhoto(item, cls) {
    var img = document.createElement("img");
    img.src = item.image2; img.alt = item.image2Alt || ""; img.loading = "lazy";
    return el("figure", "feat-photo" + (cls ? " " + cls : ""), [img, item.image2Caption ? el("figcaption", "mono", [item.image2Caption]) : null]);
  }

  // A small spec table, like the parts list on a drawing.
  function specTable(rows) {
    var dl = el("dl", "feat-spec mono", rows.filter(function (r) { return r && r.value; }).map(function (r) {
      return el("div", null, [el("dt", null, [r.label]), el("dd", null, [r.value])]);
    }));
    dl.setAttribute("aria-label", "Project specs");
    return dl;
  }

  var F = S.featured;
  var fslot = slot("featured");
  if (F && !F.draft) {
    var info = el("div", "feat-info", [
      el("p", "feat-meta mono", [el("span", null, ["Featured"]), el("span", null, [F.org && F.dates ? F.org + "  /  " : F.org, F.dates ? el("span", "nowrap", [F.dates]) : null])]),
      el("h3", "feat-title", [F.title]),
      F.hook ? el("p", "feat-hook", [F.hook]) : null,
      F.points && F.points.length ? bullets(F.points) : null,
      F.image2 ? secondPhoto(F) : null,
      F.result ? el("p", "feat-result", [F.result]) : null,
      F.specs && F.specs.length ? specTable(F.specs) : F.tools && F.tools.length ? pills(F.tools) : null,
    ]);
    var feat = el("article", "feature", [media(F, "feat-media art-box"), info]);
    feat.id = "featured-project";   // Skills links point here
    fslot.appendChild(feat);
  }

  /* ======================= projects ======================= */

  // A photo opened larger, in a dialog (Escape, the Close button, or a click outside closes it).
  var lb = null;
  function lightbox(src, alt, caption) {
    if (!lb) {
      lb = el("dialog", "lightbox", []);
      var close = el("button", "pill pill-ghost lb-close", ["Close"]);
      close.type = "button";
      close.addEventListener("click", function () { lb.close(); });
      lb.appendChild(el("figure", "lb-fig", [document.createElement("img"), el("figcaption", "mono", [])]));
      lb.appendChild(close);
      lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
      document.body.appendChild(lb);
    }
    var img = lb.querySelector("img");
    img.src = src; img.alt = alt || "";
    lb.querySelector("figcaption").textContent = caption || "";
    if (lb.showModal) lb.showModal(); else window.open(src);
  }

  // Cards show 3 bullets; any extras open under a "+ N more" button.
  function cardBullets(items, id) {
    if (items.length <= 3) return bullets(items);
    var extra = items.length - 3;
    var rest = el("div", "more", [bullets(items.slice(3))]);
    rest.id = id;
    rest.inert = true;
    var btn = el("button", "more-btn mono", ["+ " + extra + " more"]);
    btn.type = "button";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", id);
    btn.addEventListener("click", function () {
      var open = rest.classList.toggle("open");
      rest.inert = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Show less" : "+ " + extra + " more";
    });
    return el("div", "pts", [bullets(items.slice(0, 3)), rest, btn]);
  }

  var projects = live(S.projects);
  if (projects.length) {
    var cards = slot("projects");
    projects.forEach(function (p) {
      p._id = uniqueId("project-" + slug(p.title));
      var card = el("article", "card" + (p.model ? " card-wide" : ""), [
        media(p, "card-media art-box"),
        el("div", "card-body", [
          el("p", "card-meta mono", [p.dates ? el("span", null, [p.dates]) : null, el("span", null, [p.role])]),
          el("h3", "card-title", [p.title]),
          p.hook ? el("p", "card-hook", [p.hook]) : null,
          p.points && p.points.length ? cardBullets(p.points, "more-" + p._id) : null,
          p.image2 ? secondPhoto(p, "card-photo") : null,
          p.result ? el("p", "card-result", [p.result]) : null,
          p.tools && p.tools.length ? pills(p.tools) : null,
          p.moreLink ? link(p.moreLink.href, p.moreLink.label, "card-more mono") : null,
          p.link ? link(p.link, "View project", "pill pill-ghost card-link") : null,
        ]),
      ]);
      card.id = p._id;
      cards.appendChild(card);
    });
  } else hide(document.getElementById("projects"));

  /* ======================= five robots, four seasons (WildStang) =======================
     A row of panels laid out like the revision block on a drawing (REV A to REV E).
     Selecting a panel opens that robot's details below the row; selecting it again,
     the Close button, or Escape closes them and puts focus back on the panel. */

  var R = S.robots;
  var rsec = document.getElementById("robots");
  if (R && R.items && R.items.length && rsec) {
    rsec.hidden = false;
    var rslot = slot("robots");
    var title = el("h3", "rev-title dot", [R.title]);
    title.id = "robots-h";
    rslot.appendChild(el("div", "rev-head", [
      R.kicker ? el("p", "rev-kicker mono", [R.kicker]) : null,
      title,
      R.hint ? el("p", "rev-hint mono", [R.hint]) : null,
    ]));
    var detail = el("div", "rev-detail", []);
    detail.id = "robot-detail";
    detail.hidden = true;
    var active = null;
    function tags(roles) {
      return el("span", "rev-tags", (roles || []).map(function (t) { return el("span", "rev-tag mono", [t]); }));
    }
    function closeRobot(refocus) {
      if (!active) return;
      active.setAttribute("aria-expanded", "false");
      detail.hidden = true;
      if (refocus) active.focus();
      active = null;
    }
    function openRobot(r, btn) {
      if (active) active.setAttribute("aria-expanded", "false");
      active = btn;
      btn.setAttribute("aria-expanded", "true");
      var img = document.createElement("img");
      img.src = r.thumb || r.image; img.alt = r.alt || "";
      var photo = el("button", "rev-detail-photo" + (r.fit === "contain" ? " contain" : ""), [img, el("span", "sr-only", [" (opens a larger photo)"])]);
      photo.type = "button";
      photo.addEventListener("click", function () { lightbox(r.image, r.alt, "REV " + r.rev + " / " + r.season + " / " + r.year); });
      var h = el("h4", "rev-detail-h", ["REV " + r.rev + " / " + r.season]);
      h.tabIndex = -1;
      var close = el("button", "pill pill-ghost rev-close", ["Close"]);
      close.type = "button";
      close.addEventListener("click", function () { closeRobot(true); });
      detail.textContent = "";
      detail.appendChild(photo);
      detail.appendChild(el("div", "rev-detail-body", [
        el("p", "rev-year mono", [r.year]), h, tags(r.roles), el("p", "rev-text", [r.text]), close,
      ]));
      detail.hidden = false;
      // on a swipe row, bring the chosen panel fully into view first
      var rowEl = btn.closest(".rev-row");
      if (rowEl && rowEl.scrollWidth > rowEl.clientWidth) {
        rowEl.scrollTo({ left: btn.parentNode.offsetLeft - rowEl.firstElementChild.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
      }
      h.focus({ preventScroll: true });
      detail.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    }
    var row = el("ol", "rev-row", R.items.map(function (r) {
      var img = document.createElement("img");
      img.src = r.thumb || r.image; img.alt = ""; img.loading = "lazy";   // the panel's label says what it is
      var b = el("button", "rev-panel", [
        el("span", "rev-top mono", [el("span", "rev-letter", ["REV " + r.rev]), el("span", null, [r.season])]),
        el("span", "rev-photo" + (r.fit === "contain" ? " contain" : ""), [img]),
        el("span", "rev-year mono", [r.year]),
        tags(r.roles),
        el("span", "rev-sum", [r.summary]),
        el("span", "rev-more mono", ["Details"]),
      ]);
      b.type = "button";
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", "robot-detail");
      b.setAttribute("aria-label", "REV " + r.rev + ", " + r.season + ", " + r.year + ". " + (r.roles || []).join(", ") + ". " + r.summary + " Show details.");
      b.addEventListener("click", function () { if (active === b) closeRobot(false); else openRobot(r, b); });
      return el("li", null, [b]);
    }));
    rslot.appendChild(el("div", "rev-frame", [row]));
    rslot.appendChild(detail);
    // Escape closes the open robot from anywhere (focus returns to its panel if focus was in the strip)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && active && !(lb && lb.open)) { e.preventDefault(); closeRobot(rsec.contains(document.activeElement)); }
    });
  }
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

  // Opens a closed job before jumping to it, then briefly outlines the target.
  function jumpTo(target) {
    var btn = target.querySelector("button.xp-head");
    if (btn && !target.classList.contains("open")) btn.click();
    // move keyboard and screen reader focus there too
    var f = btn || target.querySelector("h3");
    if (f) {
      if (!btn) f.tabIndex = -1;
      f.focus({ preventScroll: true });
    }
    if (reduceMotion) return;
    target.classList.remove("flash");
    void target.offsetWidth;   // restart the animation if clicked twice
    target.classList.add("flash");
    setTimeout(function () { target.classList.remove("flash"); }, 1700);
  }

  function buildTimeline() {
    var T = S.timeline;
    if (!T) return null;
    var rowsData = [];
    jobs.forEach(function (j) {
      var r = range(j.dates);
      if (r) rowsData.push({ label: j.timelineLabel || (j.compact ? j.role : j.org), kind: "work", r: r, faint: !!j.compact, dates: j.dates, target: j._id });
    });
    // (the featured project overlaps the Integer job, so it isn't a row of its own)
    projects.forEach(function (p) {
      var r = range(p.dates);
      if (r) rowsData.push({ label: p.timelineLabel || p.title, kind: "project", r: r, dates: p.dates, target: p._id });
    });
    rowsData.sort(function (a, b) { return a.r[0] - b.r[0]; });
    if (!rowsData.length) return null;
    var from = T.from || Math.floor(rowsData[0].r[0]);
    var to = T.to || Math.ceil(Math.max.apply(null, rowsData.map(function (d) { return d.r[1]; })));
    var span = to - from;
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
    wrap.setAttribute("aria-label", "Timeline of work and projects");
    var axis = el("div", "tl-axis mono");
    axis.setAttribute("aria-hidden", "true");
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
    rowsData.forEach(function (d, i) {
      var bar = el("span", "tl-bar " + d.kind + (d.r[2] ? " current" : "") + (d.faint ? " faint" : ""));
      bar.style.setProperty("--i", i);   // stagger for the draw-in
      bar.style.left = pct(d.r[0]);
      bar.style.width = "calc(" + pct(d.r[1]) + " - " + pct(d.r[0]) + ")";
      var kids = [el("span", "tl-label", [d.label, el("span", "sr-only", [" (" + d.dates + ")"])]), el("span", "tl-track", [bar])];
      // each row is a link to its project card or job (looked up on click: jobs aren't on the page yet)
      var row = el("a", "tl-row tl-link", kids);
      row.href = "#" + d.target;
      row.addEventListener("click", function () {
        var t = document.getElementById(d.target);
        if (t) jumpTo(t);
      });
      grid.appendChild(row);
    });
    if (T.next && gradAt) {
      var nb = el("span", "tl-bar next");
      nb.style.setProperty("--i", rowsData.length);
      nb.style.left = pct(gradAt + 0.25);
      nb.style.width = "calc(" + pct(to) + " - " + pct(gradAt + 0.25) + ")";
      grid.appendChild(el("div", "tl-row", [el("span", "tl-label", [T.next]), el("span", "tl-track", [nb])]));
    }
    if (gradAt) {
      var g = el("span", "tl-grad mono", [el("span", null, ["B.S. " + S.graduation])]);
      g.setAttribute("aria-hidden", "true");
      g.style.left = across(gradAt);
      grid.appendChild(g);
      // the label reads right from the blue line; where the chart has no room for it
      // (narrow screens), it runs down along the line instead of off the page
      var fitGrad = function () {
        g.classList.remove("down");
        var s = g.firstChild.getBoundingClientRect();
        if (s.width && s.right > document.documentElement.clientWidth - 12) g.classList.add("down");
      };
      requestAnimationFrame(fitGrad);
      window.addEventListener("resize", fitGrad);
    }
    if (cut) {
      var gap = el("span", "tl-gap");
      gap.style.left = across(cut - 0.35);
      grid.appendChild(gap);
    }
    var nowMark = el("span", "tl-now mono", [el("span", null, ["Now"])]);
    nowMark.setAttribute("aria-hidden", "true");
    nowMark.style.left = across(when("now"));
    grid.appendChild(nowMark);
    wrap.appendChild(el("figcaption", "tl-key mono", [
      el("span", "k work", ["Work and research"]), el("span", "k project", ["Projects"]), el("span", "k current", ["Ongoing"]),
      el("span", "tl-hint", ["Select a row to jump to it"]),
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
      item.id = job._id = uniqueId("job-" + slug(job.org || job.role));
      if (job.compact || !(job.points && job.points.length)) {
        if (job.note) head[1].appendChild(el("span", "xp-note", [job.note]));   // under the title, same left edge
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
        item.appendChild(el("h3", "xp-h", [btn]));   // a heading, so screen readers can jump between jobs
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

  /* ======================= skills: a bill of materials =======================
     Laid out like the parts list on a drawing. Each tool links to the project
     cards it was used on: hovering or focusing a row outlines those cards, and
     selecting a tag jumps to its card. Tools without a project go on one
     "Also used" line at the bottom. */

  var skills = live(S.skills);
  if (skills.length) {
    var sk = slot("skills");
    var where = {};
    projects.forEach(function (p) { where[p.title] = { id: p._id, label: p.timelineLabel || p.title }; });
    if (F && !F.draft) where.featured = { id: "featured-project", label: F.shortLabel || F.title };
    var rowsN = 0, also = [], tbody = el("tbody", null, []);
    skills.forEach(function (g) {
      var listed = (g.items || []).filter(function (t) { return t.usedOn && t.usedOn.length; });
      (g.items || []).forEach(function (t) { if (!(t.usedOn && t.usedOn.length)) also.push(t.tool); });
      if (!listed.length) return;
      var gh = el("th", "mono", [g.group]);
      gh.colSpan = 3; gh.scope = "colgroup";
      tbody.appendChild(el("tr", "bom-group", [gh]));
      listed.forEach(function (t) {
        rowsN++;
        var note = t.since ? (new Date().getFullYear() - t.since) + " yrs, since " + t.since : t.note;
        var targets = t.usedOn.map(function (k) { return where[k]; }).filter(Boolean);
        var name = el("th", "bom-tool", [el("span", "bom-name", [t.tool]), note ? el("span", "bom-note mono", [note]) : null]);
        name.scope = "row";
        var tr = el("tr", "bom-row", [
          el("td", "bom-n mono", [(rowsN < 10 ? "0" : "") + rowsN]),
          name,
          el("td", "bom-used", [el("div", "bom-links", targets.map(function (w) {
            var a = el("a", "bom-link mono", [w.label]);
            a.href = "#" + w.id;
            a.addEventListener("click", function () {
              var c = document.getElementById(w.id);
              if (!c) return;
              // after the browser follows the link: focus the card and flash it (a steady
              // outline instead of the flash when motion is reduced)
              setTimeout(function () {
                jumpTo(c);
                if (reduceMotion) { c.classList.add("skill-hot"); setTimeout(function () { c.classList.remove("skill-hot"); }, 1600); }
              }, 0);
            });
            return a;
          }))]),
        ]);
        function mark(on) {
          targets.forEach(function (w) { var c = document.getElementById(w.id); if (c) c.classList.toggle("skill-hot", on); });
        }
        tr.addEventListener("mouseenter", function () { mark(true); });
        tr.addEventListener("mouseleave", function () { mark(false); });
        tr.addEventListener("focusin", function () { mark(true); });
        tr.addEventListener("focusout", function () { mark(false); });
        tbody.appendChild(tr);
      });
    });
    var table = el("table", "bom-table", [
      el("thead", "mono", [el("tr", null, ["Item", "Tool", "Used on"].map(function (h) { var th = el("th", null, [h]); th.scope = "col"; return th; }))]),
      tbody,
    ]);
    var cell = function (k, v) { return el("span", "bom-cell", [el("span", "bom-k", [k]), el("span", "bom-v", [v])]); };
    sk.appendChild(el("div", "bom", [
      el("div", "bom-head mono", [cell("Title", S.skillsTitle || "Tools and skills"), cell("Sheet", "Parts list"), cell("Items", String(rowsN))]),
      table,
      also.length ? el("p", "bom-also", [el("span", "bom-also-k mono", [(S.skillsAlsoLabel || "Also used") + ":"]), " " + also.join(", ")]) : null,
      S.skillsHint ? el("p", "bom-hint mono", [
        el("span", "hint-mouse", [S.skillsHint]),
        el("span", "hint-touch", [S.skillsHintTouch || S.skillsHint]),
      ]) : null,
    ]));
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
    live(H.items).forEach(function (it) {
      var hasPhotos = it.photos && it.photos.length;
      var card = el("article", "hob-card" + (it.wide ? " wide" : ""), [
        el("h3", "hob-name dot", [it.name]),
        it.text ? el("p", "hob-text", [it.text]) : null,
      ]);
      if (it.keys) card.appendChild(keyboard(it.keysHint));
      if (it.strings) card.appendChild(guitar(it));
      if (hasPhotos) {
        // photos look through a drone camera's viewfinder (corner marks and a faint
        // crosshair); selecting one opens it larger
        card.appendChild(el("div", "hob-photos", it.photos.map(function (ph) {
          var f = el("figure", "hob-photo" + (ph.image ? "" : " empty"));
          if (ph.image) {
            var im = document.createElement("img");
            im.src = ph.image; im.alt = ph.alt || ""; im.loading = "lazy";
            var open = el("button", "hob-view", [im, el("span", "sr-only", [" (opens a larger photo)"])]);
            open.type = "button";
            open.addEventListener("click", function () { lightbox(ph.image, ph.alt, ph.caption); });
            f.appendChild(open);
          } else f.appendChild(el("span", "mono", ["Photo"]));
          if (ph.caption) f.appendChild(el("figcaption", "mono", [ph.caption]));
          return f;
        })));
      } else if (it.art && DRAW[it.art]) {
        // a line drawing until photos come; its propellers spin on hover or tap
        var art = el("div", "hob-art", []);
        art.innerHTML = '<svg viewBox="' + DRAW[it.art].box + '" aria-hidden="true" focusable="false">' + DRAW[it.art].svg + "</svg>";
        card.appendChild(art);
        var spin = function () {
          if (reduceMotion || card.classList.contains("spin")) return;
          card.classList.add("spin");
          setTimeout(function () { card.classList.remove("spin"); }, 1700);
        };
        card.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") spin(); });
        card.addEventListener("click", spin);
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

  // One shared Web Audio output for the piano and the guitar: a little headroom plus
  // a gentle limiter, so chords and full strums never clip.
  var sound = { ctx: null, out: null };
  function audio() {
    if (!sound.ctx) {
      var ctx = sound.ctx = new (window.AudioContext || window.webkitAudioContext)();
      sound.out = ctx.createGain(); sound.out.gain.value = 0.7;
      var lim = ctx.createDynamicsCompressor();
      lim.threshold.value = -10; lim.knee.value = 6; lim.ratio.value = 12; lim.attack.value = 0.003; lim.release.value = 0.2;
      sound.out.connect(lim); lim.connect(ctx.destination);
    }
    if (sound.ctx.state === "suspended") sound.ctx.resume();
    return sound.ctx;
  }

  // A keyboard from middle C (C4) up to D5 that plays real notes (Web Audio).
  // Equal temperament with A4 = 440 Hz: each key is 440 * 2^((n - 69) / 12),
  // where n is its MIDI note number. The computer keys A to L play it too
  // (with W, E, T, Y, U, O for the black keys), like a music app.
  function keyboard(hint) {
    var NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    var notes = [];
    for (var n = 60; n <= 74; n++) {
      var name = NAMES[n % 12];
      notes.push({ name: name, octave: Math.floor(n / 12) - 1, black: name.length > 1, f: 440 * Math.pow(2, (n - 69) / 12) });
    }
    var keysMap = "awsedftgyhujkol";
    var whites = notes.filter(function (x) { return !x.black; }).length;
    function play(f) {
      try {
        var c = audio(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
        o.type = "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.3, t + 0.012);   // soft attack, no click
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        o.connect(g); g.connect(sound.out); o.start(t); o.stop(t + 1.25);
      } catch (e) {}
    }
    var kb = el("div", "kb");
    kb.setAttribute("role", "group");
    kb.setAttribute("aria-label", "Playable keyboard, C4 to D5");
    var whiteIndex = 0, buttons = [];
    notes.forEach(function (n, i) {
      var b = el("button", "kb-key " + (n.black ? "black" : "white"), []);
      b.type = "button";
      b.setAttribute("aria-label", "Play " + n.name.replace("#", " sharp") + " " + n.octave);
      // a black key sits over the line between the two white keys around it
      if (n.black) b.style.left = "calc(" + (whiteIndex / whites * 100) + "% - var(--bk) / 2)";
      else whiteIndex++;
      function hit() { play(n.f); b.classList.add("down"); setTimeout(function () { b.classList.remove("down"); }, 160); }
      b.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        kb.classList.add("by-pointer");   // no focus marker after a click or tap
        b.focus({ preventScroll: true });   // so the letter keys keep working after a tap
        rove(i);
        hit();
      });
      b.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hit(); } });
      b.tabIndex = i ? -1 : 0;   // one tab stop for the whole keyboard; arrow keys move between keys
      buttons.push({ b: b, hit: hit });
      kb.appendChild(b);
    });
    function rove(to) {
      buttons.forEach(function (x, k) { x.b.tabIndex = k === to ? 0 : -1; });
    }
    // a key press brings the focus marker back
    kb.addEventListener("keydown", function () { kb.classList.remove("by-pointer"); });
    kb.addEventListener("keydown", function (e) {
      var now = buttons.findIndex(function (x) { return x.b === document.activeElement; });
      if (now < 0) return;
      var to = { ArrowRight: now + 1, ArrowDown: now + 1, ArrowLeft: now - 1, ArrowUp: now - 1, Home: 0, End: buttons.length - 1 }[e.key];
      if (to == null) return;
      e.preventDefault();
      to = Math.max(0, Math.min(buttons.length - 1, to));
      rove(to);
      buttons[to].b.focus();
    });
    // The letter keys work whenever the keyboard is focused, or mostly on screen
    // (but not while typing somewhere, with the menu open, or with Ctrl/Cmd/Alt held).
    var inView = false;
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }, { threshold: 0.6 }).observe(kb);
    document.addEventListener("keydown", function (e) {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (!inView && !kb.contains(document.activeElement)) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.body.classList.contains("menu-open")) return;
      var i = keysMap.indexOf(String(e.key).toLowerCase());
      if (i > -1) buttons[i].hit();
    });
    return el("div", "kb-wrap", [kb, hint ? el("p", "kb-hint mono", [hint]) : null]);
  }

  /* Six guitar strings in standard tuning (E2 A2 D3 G3 B3 E4), lowest at the bottom.
     Each is a plucked-string sound made with the Karplus-Strong method: a burst of noise
     fed around a short delay line that softens on every pass, like a real string's
     decay. Its pitch is set exactly by correcting the delay line's length, so each
     string is in tune. Sweep the mouse across them, tap or swipe sideways on a phone,
     or press 1 (high E) to 6 (low E) while the guitar is on screen. */
  function guitar(it) {
    var STR = [[64, "E", 4], [59, "B", 3], [55, "G", 3], [50, "D", 3], [45, "A", 2], [40, "E", 2]].map(function (s, i) {
      return { midi: s[0], name: s[1], oct: s[2], num: i + 1, f: 440 * Math.pow(2, (s[0] - 69) / 12) };
    });
    var bufs = {};
    function ks(s) {
      var c = audio(), sr = c.sampleRate;
      if (bufs[s.num]) return bufs[s.num];
      var N = Math.max(3, Math.round(sr / s.f + 0.5)), len = Math.floor(sr * 2.4);
      var buf = c.createBuffer(1, len, sr), d = buf.getChannelData(0), line = new Float32Array(N), prev = 0, peak = 0;
      for (var i = 0; i < N; i++) { var r = Math.random() * 2 - 1; line[i] = prev = (r + prev) / 2; }   // a softened pluck
      var decay = 0.9965 + 0.002 * (1 - s.num / 6);   // a touch more sustain on the low strings
      for (var j = 0, k = 0; j < len; j++) {
        var nx = k + 1 === N ? 0 : k + 1;
        d[j] = line[k];
        line[k] = decay * 0.5 * (line[k] + line[nx]);
        k = nx;
      }
      for (j = 0; j < len; j++) peak = Math.max(peak, Math.abs(d[j]));
      for (j = 0; j < len; j++) d[j] /= peak || 1;
      // each pass averages a sample with the one after it, so the loop rings at
      // sr / (N - 0.5); the playback rate corrects that to the exact note
      return (bufs[s.num] = { buf: buf, rate: s.f / (sr / (N - 0.5)) });
    }
    function sound1(s) {
      try {
        var c = audio(), b = ks(s), src = c.createBufferSource(), g = c.createGain();
        src.buffer = b.buf; src.playbackRate.value = b.rate;
        g.gain.value = 0.32;
        src.connect(g); g.connect(sound.out); src.start();
      } catch (e) {}
    }

    // drawing: a nut on the left, a bridge on the right, six strings (thicker toward the bass)
    var W = 300, H = 150, X0 = 26, X1 = 292;
    var wrap = el("div", "gtr", []);
    wrap.innerHTML = '<svg class="gtr-svg" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="gtr-nut" d="M' + X0 + ' 6 V' + (H - 6) + '"/><path class="gtr-bridge" d="M' + X1 + ' 10 V' + (H - 10) + '"/>' +
      STR.map(function (s, i) {
        var y = (i + 0.5) * H / 6;
        return '<path class="gtr-str" style="stroke-width:' + (1 + i * 0.32) + 'px" d="M' + X0 + " " + y + " Q" + (X0 + X1) / 2 + " " + y + " " + X1 + " " + y + '"/>';
      }).join("") + "</svg>";
    var paths = [].slice.call(wrap.querySelectorAll(".gtr-str"));
    var readout = el("p", "gtr-read mono", [it.stringsIdle || ""]);
    readout.setAttribute("aria-live", "polite");
    var group = el("div", "gtr-bands", []);
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", it.stringsLabel || "Playable guitar strings");
    var buttons = STR.map(function (s, i) {
      var b = el("button", "gtr-band", [el("span", "gtr-note mono", [s.name])]);
      b.type = "button";
      b.setAttribute("aria-label", "Play string " + s.num + ", " + s.name + s.oct);
      b.tabIndex = i ? -1 : 0;
      b.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pluck(i); }
        var to = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1 }[e.key];
        if (to == null || to < 0 || to > 5) return;
        e.preventDefault();
        buttons[i].tabIndex = -1; buttons[to].tabIndex = 0; buttons[to].focus();
      });
      group.appendChild(b);
      return b;
    });

    // the string shakes in a quick decaying wave (skipped with reduced motion)
    var vib = [0, 0, 0, 0, 0, 0], raf = 0, last = [];
    function wave(now) {
      raf = 0;
      var live = false;
      paths.forEach(function (p, i) {
        var y = (i + 0.5) * H / 6, t = (now - vib[i]) / 1000, a = 0;
        if (vib[i] && t < 1.1) { a = 7 * Math.exp(-t / 0.3) * Math.sin(2 * Math.PI * (11 + (5 - i) * 1.5) * t); live = true; } else vib[i] = 0;
        p.setAttribute("d", "M" + X0 + " " + y + " Q" + (X0 + X1) / 2 + " " + (y + a * 2) + " " + X1 + " " + y);
        p.classList.toggle("on", !!vib[i]);
      });
      if (live) raf = requestAnimationFrame(wave);
    }
    function pluck(i) {
      var now = performance.now();
      if (last[i] && now - last[i] < 60) return;   // one pluck per crossing
      last[i] = now;
      var s = STR[i];
      sound1(s);
      readout.textContent = s.name + s.oct + " \u00B7 " + s.f.toFixed(2) + " Hz";
      if (reduceMotion) { paths[i].classList.add("on"); setTimeout(function () { paths[i].classList.remove("on"); }, 400); return; }
      vib[i] = now;
      if (!raf) raf = requestAnimationFrame(wave);
    }
    function lineY(i) { var r = group.getBoundingClientRect(); return r.top + (i + 0.5) * r.height / 6; }
    function bandAt(y) { var r = group.getBoundingClientRect(); return Math.max(0, Math.min(5, Math.floor((y - r.top) / r.height * 6))); }

    // mouse: every string the pointer crosses plays; a click plays the string under it
    var lastY = null;
    group.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") lastY = e.clientY; });
    group.addEventListener("pointerleave", function () { lastY = null; });
    group.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      if (lastY != null) for (var i = 0; i < 6; i++) {
        var y = lineY(i);
        if ((lastY < y && e.clientY >= y) || (lastY > y && e.clientY <= y)) pluck(i);
      }
      lastY = e.clientY;
    });
    // touch: a tap or a sideways swipe plays the string under the finger; an up-and-down
    // swipe is left to the page, so it scrolls
    var touch = null;
    group.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse") { pluck(bandAt(e.clientY)); return; }
      touch = { x: e.clientX, y: e.clientY, i: bandAt(e.clientY), played: false };
    });
    group.addEventListener("pointermove", function (e) {
      if (!touch || e.pointerType === "mouse") return;
      var dx = e.clientX - touch.x, dy = e.clientY - touch.y;
      if (!touch.played && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) { touch.played = true; pluck(touch.i); }
    });
    group.addEventListener("pointerup", function (e) {
      if (touch && !touch.played && e.pointerType !== "mouse") pluck(touch.i);
      touch = null;
    });
    group.addEventListener("pointercancel", function () { touch = null; });
    group.addEventListener("click", function (e) { e.preventDefault(); });   // the pointer handlers already played it

    // number keys 1 to 6 while the guitar is mostly on screen (the piano uses letters)
    var inView = false;
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; }, { threshold: 0.6 }).observe(wrap);
    document.addEventListener("keydown", function (e) {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || !/^[1-6]$/.test(e.key)) return;
      if (!inView && !wrap.contains(document.activeElement)) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (document.body.classList.contains("menu-open")) return;
      pluck(+e.key - 1);
    });
    wrap.appendChild(group);
    return el("div", "gtr-wrap", [wrap, el("div", "gtr-foot", [
      readout,
      it.stringsHint ? el("p", "kb-hint mono gtr-hint", [el("span", "hint-mouse", [it.stringsHint]), el("span", "hint-touch", [it.stringsHintTouch || it.stringsHint])]) : null,
    ])]);
  }

  /* ======================= contact + footer ======================= */

  var c = slot("contact");
  if (S.contactLine) c.appendChild(el("p", "contact-text", [S.contactLine]));
  var ca = actionRow(L.email);
  if (L.email && navigator.clipboard) {
    var copyBtn = el("button", "pill pill-ghost copy-btn", ["Copy email"]);
    copyBtn.type = "button";
    var copyStatus = el("span", "sr-only", []);
    copyStatus.setAttribute("role", "status");
    function setLabel(n, t) {
      if (n._scr) cancelAnimationFrame(n._scr);   // stop any hover scramble so it can't overwrite this
      n.removeAttribute("data-final");
      n.setAttribute("aria-label", t);
      n.textContent = t;
    }
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(L.email).then(function () {
        setLabel(copyBtn, "Copied");
        copyStatus.textContent = "Email address copied";
        setTimeout(function () { setLabel(copyBtn, "Copy email"); copyStatus.textContent = ""; }, 1800);
      }, function () { setLabel(copyBtn, L.email); });
    });
    ca.appendChild(copyBtn);
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
  menu.querySelectorAll(".menu-list li").forEach(function (li, i) { li.style.setProperty("--d", i * 50 + "ms"); });
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
      requestAnimationFrame(function () {
        if (document.body.classList.contains("menu-open")) menu.classList.add("open");   // unless it was closed again first
      });
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
  var THEME = { dark: "#000000", light: "#EFF0F2", white: "#E4E6E9", blue: "#1450A8" };
  var barTick = 0;
  /* ---------- current section name in the top bar, like a sheet label ---------- */
  var secLabel = document.querySelector(".bar-sec"), secShown = "";
  var secMarks = [].filter.call(document.querySelectorAll(".sec-h"), function (h) {
    return !h.closest("[hidden]");
  }).map(function (h, i) {
    return { h: h, text: "Sec. " + (i < 9 ? "0" : "") + (i + 1) + " / " + h.textContent };
  });
  var contactH = document.querySelector(".contact-h");
  if (contactH) secMarks.push({ h: contactH, text: "Contact" });
  function readSec() {
    var t = "";
    // a section counts once its heading passes the middle of the screen
    secMarks.forEach(function (m) { if (m.h.getBoundingClientRect().top < window.innerHeight / 2) t = m.text; });
    return t;
  }
  function updateSec(t) {
    if (!secLabel || t === secShown) return;
    secShown = t;
    secLabel.classList.toggle("on", !!t);
    if (!t) return;   // fade out, keeping the old text while it does
    if (secLabel._scr) cancelAnimationFrame(secLabel._scr);
    secLabel.removeAttribute("data-final");
    secLabel.textContent = t;
    scramble(secLabel, 420);
  }

  function updateBar() {
    barTick = 0;
    var y = bar.offsetHeight / 2, kind = "dark";
    for (var i = 0; i < panes.length; i++) {
      var r = panes[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { kind = panes[i].getAttribute("data-pane"); break; }
    }
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    var sec = readSec();
    // writes after all the reads
    bar.setAttribute("data-on", kind);
    if (themeMeta) themeMeta.content = THEME[kind] || THEME.dark;
    turnGear(progress);
    updateSec(sec);
  }

  /* ---------- scroll gear: turns as you scroll, teeth fill blue toward the bottom ---------- */
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
  function turnGear(p) {
    if (!gearRot) return;
    gearRot.setAttribute("transform", reduceMotion ? "" : "rotate(" + (p * 720).toFixed(1) + ")");
    var lit = Math.round(p * gearTeeth.length);
    gearTeeth.forEach(function (t, i) { t.classList.toggle("lit", i < lit); });
  }
  function barSoon() { if (!barTick) barTick = requestAnimationFrame(updateBar); }
  window.addEventListener("scroll", barSoon, { passive: true });
  window.addEventListener("resize", barSoon);
  updateBar();

  /* ======================= dot field ======================= */
  // A grid of dots that brighten near the pointer, with random dots
  // blinking on and off like the Glyph lights on Nothing phones.

  function dotfield(canvas) {
    var ctx = canvas.getContext("2d");
    var host = canvas.parentElement;
    var gap, cols, rows, w, h, dpr, rgb, baseA;
    var px = -9999, py = -9999, visible = false, raf = 0;
    var blinks = [], lastSpawn = 0, lastDraw = 0, moved = false;
    var base = document.createElement("canvas"), bctx = base.getContext("2d");

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
      // the resting grid, drawn once and copied in each frame
      base.width = canvas.width; base.height = canvas.height;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.fillStyle = "rgba(" + rgb + "," + baseA + ")";
      var ox = (w % gap) / 2, oy = (h % gap) / 2;
      bctx.beginPath();
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
        bctx.moveTo(ox + c * gap + 1, oy + r * gap);
        bctx.arc(ox + c * gap, oy + r * gap, 1, 0, 6.2832);
      }
      bctx.fill();
      blinks = [];
      draw(performance.now());
    }

    function draw(now) {
      lastDraw = now; moved = false;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var R = 150, ox = (w % gap) / 2, oy = (h % gap) / 2;
      var lit = {};
      blinks = blinks.filter(function (b) { return now - b.t < b.life; });
      blinks.forEach(function (b) {
        lit[b.i] = { a: Math.sin(((now - b.t) / b.life) * Math.PI), accent: b.accent };
      });
      // only dots near the pointer or blinking differ from the resting grid
      var todo = Object.keys(lit).map(Number);
      if (px > -R && py > -R && px < w + R && py < h + R) {
        var c0 = Math.max(0, Math.floor((px - R - ox) / gap)), c1 = Math.min(cols - 1, Math.ceil((px + R - ox) / gap));
        var r0 = Math.max(0, Math.floor((py - R - oy) / gap)), r1 = Math.min(rows - 1, Math.ceil((py + R - oy) / gap));
        for (var r = r0; r <= r1; r++) for (var c = c0; c <= c1; c++) if (!lit[r * cols + c]) todo.push(r * cols + c);
      }
      todo.forEach(function (i) {
        var r = Math.floor(i / cols), c = i % cols;
        var x = ox + c * gap, y = oy + r * gap;
        var dx = x - px, dy = y - py, d = Math.sqrt(dx * dx + dy * dy);
        var near = d < R ? Math.pow(1 - d / R, 2) : 0;
        var b = lit[i];
        if (!near && !b) return;
        var a = Math.min(1, baseA + near * 0.75 + (b ? b.a * 0.8 : 0));
        ctx.clearRect(x - 4, y - 4, 8, 8);   // remove the resting dot underneath
        ctx.fillStyle = b && b.accent ? "rgba(122,167,255," + a + ")" : "rgba(" + rgb + "," + a + ")";
        ctx.beginPath(); ctx.arc(x, y, 1 + near * 1.1 + (b ? b.a * 0.8 : 0), 0, 6.2832); ctx.fill();
      });
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden || reduceMotion) return;
      if (now - lastSpawn > 140) {
        lastSpawn = now;
        blinks.push({ i: (Math.random() * cols * rows) | 0, t: now, life: 900 + Math.random() * 900, accent: Math.random() < 0.06 });
      }
      // blinks alone are slow, so about 30 frames a second is plenty; pointer moves draw right away
      if (moved || now - lastDraw > 30) draw(now);
      raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf && !reduceMotion) raf = requestAnimationFrame(loop); }

    host.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left; py = e.clientY - rect.top;
      moved = true;
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

  // The maze robot and the coursework ticker pause while they're off screen.
  function syncAnim(s) {
    try { if (reduceMotion || !s._onScreen) s.pauseAnimations(); else s.unpauseAnimations(); } catch (e) {}
  }
  var animQ = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.target.classList.contains("marquee")) e.target.classList.toggle("offscreen", !e.isIntersecting);
      else { e.target._onScreen = e.isIntersecting; syncAnim(e.target); }
    });
  });
  document.querySelectorAll("svg.drawing").forEach(function (s) {
    if (s.querySelector("animateMotion")) animQ.observe(s);
  });
  if (band && !band.hidden) animQ.observe(band);
  onMotionChange.push(function () {
    document.querySelectorAll("svg.drawing").forEach(syncAnim);
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
    var targets = document.querySelectorAll(".num-list, .about-copy, .facts, .feature, .card, .tl, .xp-item, " +
      ".bom, .hob-intro, .hob-card, .contact-text");
    function show(n, delay) {
      n.style.transitionDelay = delay + "ms";
      n.classList.add("in");
      // clear the delay afterwards so hover transitions on the block stay instant
      setTimeout(function () { n.style.transitionDelay = ""; }, delay + 800);
    }
    var pending = [].slice.call(targets);
    function done(n) {
      io.unobserve(n);
      var j = pending.indexOf(n);
      if (j > -1) pending.splice(j, 1);
    }
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

  // A link straight to a job (the address a timeline row leaves) opens that job.
  function fromHash() {
    var t = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (t && t.classList.contains("xp-item")) jumpTo(t);
  }
  fromHash();
  window.addEventListener("hashchange", fromHash);

  // Hero name decodes on load.
  setTimeout(function () {
    name.querySelectorAll("[data-scramble]").forEach(function (s, i) {
      setTimeout(function () { scramble(s, 900); }, i * 180);
    });
  }, 150);
})();
