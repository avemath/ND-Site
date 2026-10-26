/* Builds the page from window.SITE (defined in content.js) and runs the
   motion: dot fields, dot-matrix drawings, scrambling text, counters,
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

  function bullets(items) {
    return el("ul", "points", (items || []).map(function (x) { return el("li", null, [x]); }));
  }

  var L = S.links || {};
  var fullName = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = fullName + " | " + (S.discipline || "Portfolio");

  /* ======================= hero ======================= */

  var hero = slot("hero");
  var kicker = [S.discipline, S.schoolShort || S.school,
    S.graduation ? "Class of " + S.graduation.replace(/\D*(\d{4}).*/, "$1") : ""]
    .filter(Boolean).join("  /  ");

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
      var r = link(L.resume, "Resume (PDF)", "pill pill-ghost");
      r.setAttribute("download", "");
      row.appendChild(r);
    }
    return row;
  }

  hero.appendChild(el("p", "mono kicker", [kicker]));
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
        el("p", "num-pre mono", [n.pre || " "]),
        el("p", "num-fig", [v, n.unit ? el("span", "num-unit mono", [n.unit]) : null]),
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
      ["Graduating", S.graduation], ["Based in", S.location],
    ].filter(function (f) { return f[1]; }).map(function (f) {
      return el("div", null, [el("dt", null, [f[0]]), el("dd", null, [f[1]])]);
    })));
  } else hide(document.getElementById("about"), "#about");

  /* ======================= dot-matrix drawings ======================= */
  // Each drawing is rows of characters: "#" = lit dot, "r" = red dot, "." = off.
  var ART = {
    rov: [
      "...........rrrrrr...............",
      "...........r....r...............",
      "...........rrrrrr...............",
      ".............rr.................",
      "...#######################......",
      "...#.....................#..##..",
      ".###.....................####.#.",
      ".#.#..######.....######..#.#..#.",
      ".#.#.....................#.#..#.",
      ".###.....................####.#.",
      "...#.....................#..##..",
      "...#######################......",
      ".....##...............##........",
      "....####.............####.......",
    ],
    arm: [
      "..............######............",
      ".............#......#...........",
      "............#........#..........",
      "...........#..........#.........",
      "..........#............#........",
      ".........#..............#.......",
      "........#................#......",
      ".......##.................#.....",
      "......####.................#....",
      "......####..................#...",
      ".......##..................###..",
      ".......##...................#...",
      ".......##..................r.r..",
      ".......##...................r...",
      ".....######.....................",
      "....########...##############...",
    ],
    maze: [
      "#######################",
      "#.....#.........#.....#",
      "#.###.#.#######.#.###.#",
      "#.#...#.#.....#...#...#",
      "#.#.###.#.###.#####.###",
      "#.#.....#.#...#.....#.#",
      "#.#######.#.###.###.#.#",
      "#.........#.....#..r..#",
      "#######################",
    ],
    lathe: [
      "....######................",
      "....#....#########........",
      "....#............#######..",
      "....#..................#..",
      "....#..................#..",
      "....#............#######..",
      "....#....#########........",
      "....######................",
      "..........................",
      "....r.................r...",
      "....rrrrrrrrrrrrrrrrrrr...",
      "....r.................r...",
    ],
    playground: [
      "..........#......................",
      ".........###.....................",
      "........#####....................",
      ".......#.....#........#########..",
      ".......#.....#.......#.#.....#.#.",
      ".......#######......#..#.....#..#",
      ".......#.....##.....#..#.....#..#",
      ".......#.....#.##...#..#.....#..#",
      ".......#.....#...##.#..rr...rr..#",
      ".......#.....#.....##...........#",
      "#################################",
    ],
    frc: [
      "..............#...........",
      "..............#...........",
      "..........#########.......",
      "..............#...........",
      "..............#...........",
      "..............#...........",
      "...####################...",
      "...#..................#...",
      ".rrrrrrrrrrrrrrrrrrrrrrrr.",
      ".rrrrrrrrrrrrrrrrrrrrrrrr.",
      "....###..........###......",
      "....###..........###......",
    ],
  };

  // Draws a full grid of dim dots with the drawing lit in the middle.
  // The lit dots switch on in random order when it scrolls into view.
  function dotArt(host, key, gap) {
    var rows = ART[key];
    if (!rows) return;
    var canvas = el("canvas", "art-canvas");
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var bw = Math.max.apply(null, rows.map(function (r) { return r.length; })), bh = rows.length;
    var order = {}, progress = 0, started = false, raf = 0, w, h, cols, rws, g;

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Shrink the dot spacing if the drawing wouldn't fit.
      g = Math.min(gap, (w - 24) / (bw + 2), (h - 24) / (bh + 2));
      cols = Math.floor(w / g); rws = Math.floor(h / g);
      draw();
    }

    function draw() {
      if (!w) return;
      var cs = getComputedStyle(host);
      var rgb = cs.getPropertyValue("--dot-rgb").trim() || "255,255,255";
      ctx.clearRect(0, 0, w, h);
      var ox = (w - (cols - 1) * g) / 2, oy = (h - (rws - 1) * g) / 2;
      var c0 = Math.floor((cols - bw) / 2), r0 = Math.floor((rws - bh) / 2);
      var rad = Math.max(1, g * 0.18);
      for (var r = 0; r < rws; r++) {
        for (var c = 0; c < cols; c++) {
          var ch = (rows[r - r0] || "")[c - c0];
          var on = (ch === "#" || ch === "r") && (order[r + "," + c] || 0) <= progress;
          var x = ox + c * g, y = oy + r * g;
          ctx.fillStyle = on ? (ch === "r" ? "#D71921" : "rgba(" + rgb + ",0.95)") : "rgba(" + rgb + ",0.1)";
          ctx.beginPath(); ctx.arc(x, y, on ? rad * 1.9 : rad, 0, 6.2832); ctx.fill();
        }
      }
    }

    rows.forEach(function (row, r) {
      for (var c = 0; c < row.length; c++) order[(r) + "," + c] = 0; // filled after size
    });
    function seedOrder() {
      order = {};
      var c0 = Math.floor((cols - bw) / 2), r0 = Math.floor((rws - bh) / 2);
      rows.forEach(function (row, r) {
        for (var c = 0; c < row.length; c++) order[(r + r0) + "," + (c + c0)] = Math.random() * 0.85 + (c / bw) * 0.15;
      });
    }

    function play() {
      if (started) return;
      started = true;
      seedOrder();
      if (reduceMotion) { progress = 1; draw(); return; }
      var t0 = performance.now();
      (function step(now) {
        progress = Math.min(1, (now - t0) / 1100);
        draw();
        if (progress < 1) raf = requestAnimationFrame(step);
      })(t0);
    }

    size(); seedOrder(); progress = 0; draw();
    new IntersectionObserver(function (es, ob) {
      if (es[0].isIntersecting) { play(); ob.disconnect(); }
    }, { threshold: 0.4 }).observe(host);
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt); rt = setTimeout(function () { size(); seedOrder(); draw(); }, 150);
    });
  }

  function media(item, cls, gap) {
    var box = el("div", cls);
    if (item.image) {
      var img = document.createElement("img");
      img.src = item.image; img.alt = item.imageAlt || ""; img.loading = "lazy";
      box.appendChild(img);
      box.classList.add("has-photo");
    } else if (item.art && ART[item.art]) {
      requestAnimationFrame(function () { dotArt(box, item.art, gap); });
    } else {
      box.classList.add("is-empty");
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
    fslot.appendChild(el("article", "feature", [media(F, "feat-media art-box", 16), info]));
  }

  /* ======================= projects ======================= */

  var projects = live(S.projects);
  if (projects.length) {
    var cards = slot("projects");
    projects.forEach(function (p) {
      var card = el("article", "card", [
        media(p, "card-media art-box", 11),
        el("div", "card-body", [
          el("p", "card-meta mono", [el("span", null, [p.dates]), el("span", null, [p.role])]),
          el("h3", "card-title", [p.title]),
          p.hook ? el("p", "card-hook", [p.hook]) : null,
          p.points && p.points.length ? bullets(p.points) : null,
          p.tools && p.tools.length ? pills(p.tools) : null,
          p.link ? link(p.link, "View project", "pill pill-ghost card-link") : null,
        ]),
      ]);
      cards.appendChild(card);
    });
  } else hide(document.getElementById("projects"));
  if ((!F || F.draft) && !projects.length) hide(document.getElementById("featured"), "#featured");

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
        var panel = el("div", "xp-panel", [bullets(job.points)]);
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
    var dl = el("dl", "spec");
    skills.forEach(function (g) {
      dl.appendChild(el("div", "spec-row", [
        el("dt", "mono", [g.group]),
        el("dd", null, [el("ul", "spec-items", g.items.map(function (t) { return el("li", null, [t]); }))]),
      ]));
    });
    sk.appendChild(dl);
  } else hide(document.getElementById("skills").parentNode, "#skills");

  /* ======================= contact + footer ======================= */

  var c = slot("contact");
  if (S.contactLine) c.appendChild(el("p", "contact-text", [S.contactLine]));
  var ca = actionRow(L.email);
  c.appendChild(ca);

  slot("footer").appendChild(el("p", null, [
    "© " + new Date().getFullYear() + " " + fullName + "   /   Updated " + (S.lastUpdated || "")
  ]));

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

  var menu = document.getElementById("menu");
  var menuBtn = document.querySelector(".menu-btn");
  var menuLinks = menu.querySelectorAll("a");
  var behind = [document.getElementById("main"), document.querySelector(".foot")];

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
      var t = document.querySelector(a.hash + " h2");
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
  var THEME = { dark: "#000000", light: "#F4F4F4", red: "#D71921" };
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

  // Hero name decodes on load.
  setTimeout(function () {
    name.querySelectorAll("[data-scramble]").forEach(function (s, i) {
      setTimeout(function () { scramble(s, 900); }, i * 180);
    });
  }, 150);
})();
