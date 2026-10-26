/* Builds the page from window.SITE (defined in content.js) and runs the
   motion: dot field, scrambling dot-matrix text, menu, and accordions.
   You shouldn't need to edit this file to change the site's text. */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) {
    document.getElementById("main").innerHTML =
      '<p class="load-error">content.js didn\'t load. Check it for a missing quote or comma.</p>';
    return;
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  function slot(name) { return document.querySelector('[data-slot="' + name + '"]'); }

  function hideSection(id) {
    var s = document.getElementById(id);
    if (s) s.hidden = true;
    var m = document.querySelector('.menu a[href="#' + id + '"]');
    if (m) m.parentNode.hidden = true;
  }

  function pills(items, cls) {
    return el("ul", "pills " + (cls || ""), (items || []).map(function (t) {
      return el("li", "tag mono", [t]);
    }));
  }

  var L = S.links || {};
  var fullName = [S.firstName, S.lastName].filter(Boolean).join(" ");
  document.title = fullName + " | " + (S.discipline || "Portfolio");

  /* ======================= hero ======================= */

  var hero = slot("hero");
  var kicker = [S.discipline, S.schoolShort || S.school, S.graduation ? "Class of " + S.graduation.replace(/\D*(\d{4}).*/, "$1") : ""]
    .filter(Boolean).join("  /  ");

  var name = el("h1", "hero-name dot", [
    el("span", null, [S.firstName]),
    el("span", null, [S.lastName]),
  ]);
  name.setAttribute("aria-label", fullName);
  [].forEach.call(name.children, function (s) { s.setAttribute("data-scramble", ""); s.setAttribute("aria-hidden", "true"); });

  var actions = el("div", "actions");
  if (L.email) actions.appendChild(link("mailto:" + L.email, "Email me", "pill pill-solid"));
  if (L.linkedin) actions.appendChild(link(L.linkedin, "LinkedIn", "pill pill-ghost"));
  if (L.github) actions.appendChild(link(L.github, "GitHub", "pill pill-ghost"));
  if (L.resume) {
    var r = link(L.resume, "Resume (PDF)", "pill pill-ghost");
    r.setAttribute("download", "");
    actions.appendChild(r);
  }

  hero.appendChild(el("p", "mono kicker", [kicker]));
  hero.appendChild(name);
  if (S.tagline) hero.appendChild(el("p", "tagline", [S.tagline]));
  if (S.status) hero.appendChild(el("p", "status mono", [el("span", "rec", []), S.status]));
  hero.appendChild(actions);

  /* ======================= about ======================= */

  if (S.about && S.about.length) {
    var ab = slot("about");
    ab.className = "about";
    S.about.forEach(function (p, i) { ab.appendChild(el("p", i === 0 ? "lead" : "body", [p])); });
    var facts = el("dl", "facts mono", [
      ["School", S.school], ["Degree", "B.S. " + S.discipline], ["Minor", S.minor],
      ["Graduating", S.graduation], ["Based in", S.location],
    ].filter(function (f) { return f[1]; }).map(function (f) {
      return el("div", null, [el("dt", null, [f[0]]), el("dd", null, [f[1]])]);
    }));
    ab.appendChild(facts);
  } else hideSection("about");

  /* ======================= experience ======================= */

  if (S.experience && S.experience.length) {
    var list = el("ol", "xp");
    S.experience.forEach(function (job, i) {
      var head = [
        el("span", "xp-dates mono", [job.dates]),
        el("span", "xp-title", [el("span", "xp-role", [job.role]), el("span", "xp-org", [[job.org, job.place].filter(Boolean).join(", ")])]),
      ];
      var item = el("li", "xp-item" + (job.compact ? " compact" : ""));
      if (job.compact || !(job.points && job.points.length)) {
        item.appendChild(el("div", "xp-head", head));
      } else {
        var id = "xp-" + i;
        var btn = el("button", "xp-head", head.concat([el("span", "xp-toggle", [])]));
        btn.type = "button";
        btn.setAttribute("aria-controls", id);
        var open = i === 0;
        btn.setAttribute("aria-expanded", String(open));
        var panel = el("div", "xp-panel", [el("ul", "points", job.points.map(function (p) { return el("li", null, [p]); }))]);
        panel.id = id;
        if (open) item.classList.add("open");
        btn.addEventListener("click", function () {
          var isOpen = item.classList.toggle("open");
          btn.setAttribute("aria-expanded", String(isOpen));
        });
        item.appendChild(btn);
        item.appendChild(panel);
      }
      list.appendChild(item);
    });
    slot("experience").appendChild(list);
  } else hideSection("experience");

  /* ======================= coursework marquee ======================= */

  var mq = slot("coursework");
  if (S.coursework && S.coursework.length) {
    var track = el("div", "marquee-track");
    track.setAttribute("aria-hidden", "true");
    for (var k = 0; k < 2; k++) {
      S.coursework.forEach(function (c) {
        track.appendChild(el("span", "marquee-item dot", [c]));
        track.appendChild(el("span", "marquee-sep", []));
      });
    }
    // Screen readers get a plain list instead of the moving text.
    var sr = el("p", "sr-only", ["Related coursework: " + S.coursework.join(", ") + "."]);
    mq.appendChild(sr);
    mq.appendChild(track);
  } else mq.hidden = true;

  /* ======================= projects ======================= */

  if (S.projects && S.projects.length) {
    var cards = slot("projects");
    S.projects.forEach(function (p) {
      var card = el("article", "card");
      if (p.image) {
        var img = document.createElement("img");
        img.src = p.image; img.alt = p.imageAlt || ""; img.loading = "lazy";
        card.appendChild(el("div", "card-media", [img]));
      }
      card.appendChild(el("p", "card-meta mono", [
        el("span", null, [p.dates]), el("span", null, [p.role]),
      ]));
      card.appendChild(el("h3", "card-title", [p.title]));
      if (p.points && p.points.length) {
        card.appendChild(el("ul", "points", p.points.map(function (x) { return el("li", null, [x]); })));
      }
      if (p.tools && p.tools.length) card.appendChild(pills(p.tools));
      if (p.link) card.appendChild(link(p.link, "View project", "pill pill-ghost card-link"));
      cards.appendChild(card);
    });
  } else hideSection("projects");

  /* ======================= skills ======================= */

  if (S.skills && S.skills.length) {
    var sk = slot("skills");
    sk.className = "skills";
    S.skills.forEach(function (g) {
      sk.appendChild(el("div", "skill-group", [el("h3", "mono label", [g.group]), pills(g.items, "pills-lg")]));
    });
  } else hideSection("skills");

  /* ======================= contact + footer ======================= */

  var c = slot("contact");
  c.appendChild(el("p", "contact-text", [
    "Open to internships, research, and full-time roles in mechanical design, robotics, and controls."
  ]));
  var ca = el("div", "actions");
  if (L.email) ca.appendChild(link("mailto:" + L.email, L.email, "pill pill-solid"));
  if (L.linkedin) ca.appendChild(link(L.linkedin, "LinkedIn", "pill pill-ghost"));
  c.appendChild(ca);

  slot("footer").appendChild(el("p", null, [
    "© " + new Date().getFullYear() + " " + fullName + "   /   Updated " + (S.lastUpdated || "")
  ]));

  /* ======================= scrambling dot text ======================= */

  var GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function scramble(node, ms) {
    if (reduceMotion || node.querySelector(".todo")) return;
    var final = node.getAttribute("data-final");
    if (!final) { final = node.textContent; node.setAttribute("data-final", final); }
    if (node._scr) cancelAnimationFrame(node._scr);
    var start = performance.now(), dur = ms || 650, lastTick = 0;
    function frame(now) {
      var t = (now - start) / dur;
      if (now - lastTick > 45 || t >= 1) {
        lastTick = now;
        var out = "";
        for (var i = 0; i < final.length; i++) {
          var ch = final[i];
          if (ch === " " || t >= 1 || i / final.length < t * 1.15 - 0.15) out += ch;
          else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        node.textContent = out;
      }
      if (t < 1) node._scr = requestAnimationFrame(frame);
    }
    node._scr = requestAnimationFrame(frame);
  }

  // Headings decode the first time they scroll into view.
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { scramble(e.target); seen.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".sec [data-scramble], .contact [data-scramble]").forEach(function (n) {
    if (!n.getAttribute("aria-hidden")) n.setAttribute("aria-label", n.textContent);
    seen.observe(n);
  });

  // Small controls re-scramble on hover, like Nothing's menus.
  document.querySelectorAll(".pill, .bar-name").forEach(function (n) {
    if (n.children.length) return;
    n.addEventListener("mouseenter", function () { scramble(n, 380); });
  });

  /* ======================= menu ======================= */

  var menu = document.getElementById("menu");
  var menuBtn = document.querySelector(".menu-btn");
  var menuLinks = menu.querySelectorAll("a");

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    if (menuBtn._scr) cancelAnimationFrame(menuBtn._scr); // stop any hover scramble
    menuBtn.removeAttribute("data-final");
    menuBtn.textContent = open ? "Close" : "Menu";
    document.body.classList.toggle("menu-open", open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(function () { menu.classList.add("open"); });
      menuLinks.forEach(function (a, i) {
        a.setAttribute("aria-label", a.getAttribute("data-final") || a.textContent);
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
    a.addEventListener("click", function () { setMenu(false); });
    a.addEventListener("mouseenter", function () { scramble(a, 380); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
  });

  /* ======================= dot field ======================= */
  // A grid of dots that brighten near the pointer, with random dots
  // blinking on and off like the Glyph lights on Nothing phones.

  function dotfield(canvas) {
    var ctx = canvas.getContext("2d");
    var host = canvas.parentElement;
    var gap, cols, rows, w, h, dpr;
    var px = -9999, py = -9999, active = false, visible = false, raf = 0;
    var blinks = [], lastSpawn = 0;
    var RED = "215,25,33";

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth; h = host.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
        var p = (now - b.t) / b.life;
        lit[b.i] = { a: Math.sin(p * Math.PI), red: b.red };
      });
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = ox + c * gap, y = oy + r * gap;
          var dx = x - px, dy = y - py, d = Math.sqrt(dx * dx + dy * dy);
          var near = d < R ? Math.pow(1 - d / R, 2) : 0;
          var b = lit[r * cols + c];
          var a = 0.13 + near * 0.75 + (b ? b.a * 0.8 : 0);
          var rad = 1 + near * 1.1 + (b ? b.a * 0.8 : 0);
          ctx.fillStyle = b && b.red ? "rgba(" + RED + "," + Math.min(a, 1) + ")" : "rgba(255,255,255," + Math.min(a, 1) + ")";
          ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.fill();
        }
      }
    }

    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
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
      px = e.clientX - rect.left; py = e.clientY - rect.top; active = true;
      if (reduceMotion) draw(performance.now()); else kick();
    });
    host.addEventListener("pointerleave", function () {
      px = py = -9999; active = false;
      if (reduceMotion) draw(performance.now());
    });
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) kick();
    }).observe(host);
    document.addEventListener("visibilitychange", kick);
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
