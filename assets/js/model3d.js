/* Interactive 3D CAD model for a project card (the "model" field in content.js).
   The card shows its line drawing first. When the card is about to scroll into
   view, this loads three.js (pinned in index.html's import map) and the GLB,
   then swaps the drawing for the model, drawn in the same line style: flat
   fill, black edges, and his own parts in blue. If anything fails (no WebGL,
   an old browser, the file won't load), the line drawing simply stays.

   Hovering the card (or tapping, or Enter/Space) explodes the end effector
   along the Sharpie's axis, like an exploded view on an assembly drawing.
   Dragging turns the model a little; it eases back on release.
   It only draws when something changes, and never while off screen. */
(function () {
  "use strict";

  var DUR = 800;                       // explode / reassemble time, ms
  var VIEW = { az: 120, el: 18 };      // degrees around from the CAD's front, and above
  var TURN = { az: 40, el: 14 };       // how far a drag can turn it
  var CREASE = 28;                     // edge angle, degrees

  function webgl() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  }

  function attach(box, item, env) {
    // browsers won't load the model from a page opened straight from disk, so
    // the drawing stays there (run a local server to see the model)
    if (location.protocol === "file:" || !webgl()) return;
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      Promise.all([import("three"), import("three/addons/loaders/GLTFLoader.js")])
        .then(function (mods) {
          return new mods[1].GLTFLoader().loadAsync(item.model).then(function (gltf) { build(mods[0], gltf, box, item, env); });
        })
        .catch(function () { /* keep the line drawing */ });
    }, { rootMargin: "600px 0px" });
    io.observe(box);
  }

  function build(THREE, gltf, box, item, env) {
    var css = getComputedStyle(box);
    var INK = new THREE.Color(css.getPropertyValue("--fg").trim() || "#000");
    var ACC = new THREE.Color(css.getPropertyValue("--accent").trim() || "#1450A8");
    var FILL = new THREE.Color("#FFFFFF"), EEFILL = new THREE.Color("#E6EEFA");

    var wrap = box.querySelector(".drawing-wrap");
    var holder = document.createElement("div");
    holder.className = "model3d";
    holder.tabIndex = 0;
    holder.setAttribute("role", "button");
    holder.setAttribute("aria-pressed", "false");
    if (item.modelLabel) holder.setAttribute("aria-label", item.modelLabel);

    var renderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    holder.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var root = gltf.scene;
    scene.add(root);
    root.updateMatrixWorld(true);

    /* ---------- materials and lines ---------- */
    var parts = [], ee = [];
    root.traverse(function (o) {
      if (!o.isMesh) return;
      var mine = /^ee-/.test(o.name);
      o.material = new THREE.MeshBasicMaterial({ color: mine ? EEFILL : FILL, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
      var lineMat = new THREE.LineBasicMaterial({ color: mine ? ACC : INK });
      o.add(new THREE.LineSegments(new THREE.EdgesGeometry(o.geometry, CREASE), lineMat));
      var sil = silhouette(THREE, o.geometry, lineMat);
      o.add(sil.lines);
      var p = { mesh: o, sil: sil, home: o.position.clone(), off: new THREE.Vector3() };
      parts.push(p);
      if (mine) ee.push(p);
    });
    if (!ee.length) return;

    /* ---------- the explode: an ordered stack along the Sharpie's axis ---------- */
    // bounds from the part's own geometry (not its outline children)
    function bbox(p) {
      if (!p.mesh.geometry.boundingBox) p.mesh.geometry.computeBoundingBox();
      return p.mesh.geometry.boundingBox.clone().applyMatrix4(p.mesh.matrixWorld);
    }
    function center(p) { return bbox(p).getCenter(new THREE.Vector3()); }
    function find(n) { return ee.filter(function (p) { return p.mesh.name.indexOf(n) === 0; }); }
    var sharpie = find("ee-sharpie")[0], base = find("ee-base")[0], shield = find("ee-shield")[0];
    var cap = find("ee-cap")[0], braces = find("ee-brace");
    var axis = new THREE.Vector3(0, -1, 0);               // the Sharpie points straight down in his CAD
    if (sharpie) {
      var sb = bbox(sharpie).getSize(new THREE.Vector3());
      axis.set(sb.x > sb.y && sb.x > sb.z ? 1 : 0, sb.y >= sb.x && sb.y >= sb.z ? 1 : 0, sb.z > sb.x && sb.z > sb.y ? 1 : 0);
      if (cap && center(cap).dot(axis) > center(sharpie).dot(axis)) { /* tip is along +axis */ } else axis.negate();
    }
    function flat(v) { return v.clone().sub(axis.clone().multiplyScalar(v.dot(axis))); }   // drop the axial part
    var boxC = shield && base ? center(shield).add(center(base)).multiplyScalar(0.5) : center(ee[0]);
    var away = shield && base ? flat(center(shield).sub(center(base))).normalize() : new THREE.Vector3(1, 0, 0);
    // the shield pulls straight off the holder; the braces that join them spread out
    // to the sides, halfway between; the cap drops off the bottom, and the Sharpie
    // slides out below it, clear of the cap
    if (shield) shield.off.copy(away).multiplyScalar(36);
    braces.forEach(function (b) {
      var side = flat(center(b).sub(boxC));
      side.sub(away.clone().multiplyScalar(side.dot(away)));
      b.off.copy(side.normalize().multiplyScalar(22)).add(away.clone().multiplyScalar(18));
    });
    function span(p) {   // where a part starts and ends along the axis
      var bb = bbox(p), lo = Infinity, hi = -Infinity;
      [bb.min.x, bb.max.x].forEach(function (x) { [bb.min.y, bb.max.y].forEach(function (y) { [bb.min.z, bb.max.z].forEach(function (z) {
        var d = axis.x * x + axis.y * y + axis.z * z; lo = Math.min(lo, d); hi = Math.max(hi, d);
      }); }); });
      return [lo, hi];
    }
    var capDrop = 28;
    if (cap) cap.off.copy(axis).multiplyScalar(capDrop);
    if (sharpie) {
      var clear = cap ? capDrop + span(cap)[1] - span(sharpie)[0] + 10 : 90;
      sharpie.off.copy(axis).multiplyScalar(clear);
    }

    // a dashed center line along the axis, like on an assembly drawing; it shows only when exploded
    var axisLine = null;
    if (sharpie) {
      var sz = bbox(sharpie).getSize(new THREE.Vector3());
      var sc = center(sharpie), half = Math.abs(sz.dot(axis)) / 2;
      var a0 = sc.clone().sub(axis.clone().multiplyScalar(half - 20)), a1 = sc.clone().add(axis.clone().multiplyScalar(half + sharpie.off.length() + 12));
      var ag = new THREE.BufferGeometry().setFromPoints([a0, a1]);
      axisLine = new THREE.Line(ag, new THREE.LineDashedMaterial({ color: ACC, dashSize: 6, gapSize: 4, transparent: true, opacity: 0 }));
      axisLine.computeLineDistances();
      scene.add(axisLine);
    }

    /* ---------- camera: a fixed orthographic frame that fits both states ---------- */
    var cam = new THREE.OrthographicCamera(-1, 1, 1, -1, -5000, 5000);
    var target = new THREE.Vector3(), frame = { w: 1, h: 1 };
    function place(az, el) {
      var a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el), d = 1000;
      cam.position.set(Math.sin(a) * Math.cos(e) * d, Math.sin(e) * d, Math.cos(a) * Math.cos(e) * d).add(target);
      cam.up.set(0, 1, 0);
      cam.lookAt(target);
      cam.updateMatrixWorld(true);
    }
    function fit() {
      // project every vertex in both states from the default view and the drag limits
      var lo = new THREE.Vector2(Infinity, Infinity), hi = new THREE.Vector2(-Infinity, -Infinity), v = new THREE.Vector3();
      var all = new THREE.Box3();
      parts.forEach(function (p) { all.union(bbox(p)); });
      target.copy(all.getCenter(new THREE.Vector3()));
      // fitted to the resting view (a drag may run a little past the edges, then eases back)
      [[0, 0]].forEach(function (d) {
        place(VIEW.az + d[0], VIEW.el + d[1]);
        var inv = cam.matrixWorldInverse;
        [0, 1].forEach(function (s) {
          parts.forEach(function (p) {
            var pos = p.mesh.geometry.attributes.position, m = p.mesh.matrixWorld.clone();
            m.setPosition(new THREE.Vector3().setFromMatrixPosition(m).add(p.off.clone().multiplyScalar(s)));
            for (var i = 0; i < pos.count; i += 3) {
              v.fromBufferAttribute(pos, i).applyMatrix4(m).applyMatrix4(inv);
              lo.min(v); hi.max(v);
            }
          });
        });
      });
      // the frame is centered on the view's midpoint
      place(VIEW.az, VIEW.el);
      var right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0), up = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 1);
      target.add(right.multiplyScalar((lo.x + hi.x) / 2)).add(up.multiplyScalar((lo.y + hi.y) / 2));
      frame.w = (hi.x - lo.x) * 1.04; frame.h = (hi.y - lo.y) * 1.04;
    }
    fit();

    /* ---------- state, animation, drawing on demand ---------- */
    var st = { p: 0, to: 0, az: 0, el: 0, dragging: false, onScreen: true, raf: 0, last: 0, hover: false, sticky: false };
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function draw() {
      var e = ease(st.p);
      ee.forEach(function (p) { p.mesh.position.copy(p.home).addScaledVector(p.off, e); });
      if (axisLine) axisLine.material.opacity = Math.max(0, (e - 0.35) / 0.65) * 0.8;
      place(VIEW.az + st.az, VIEW.el + st.el);
      var w = holder.clientWidth || 1, h = holder.clientHeight || 1, k = Math.max(frame.w / w, frame.h / h);
      cam.left = -w * k / 2; cam.right = w * k / 2; cam.top = h * k / 2; cam.bottom = -h * k / 2;
      cam.updateProjectionMatrix();
      root.updateMatrixWorld(true);
      var dir = new THREE.Vector3(); cam.getWorldDirection(dir);
      parts.forEach(function (p) { p.sil.update(dir, p.mesh.matrixWorld); });
      renderer.render(scene, cam);
    }
    function tick(now) {
      st.raf = 0;
      var dt = st.last ? Math.min(64, now - st.last) : 16;
      st.last = now;
      var moving = false;
      if (st.p !== st.to) {
        if (env.reduceMotion()) st.p = st.to;
        else {
          var step = dt / DUR;
          st.p = st.to > st.p ? Math.min(st.to, st.p + step) : Math.max(st.to, st.p - step);
        }
        moving = st.p !== st.to;
      }
      if (!st.dragging && (st.az || st.el)) {
        if (env.reduceMotion()) st.az = st.el = 0;
        else {
          var f = 1 - Math.pow(0.002, dt / 1000);   // ease back over about half a second
          st.az -= st.az * f; st.el -= st.el * f;
          if (Math.abs(st.az) < 0.05 && Math.abs(st.el) < 0.05) st.az = st.el = 0;
          moving = moving || st.az !== 0 || st.el !== 0;
        }
      }
      draw();
      if (moving && st.onScreen && st.tabShown !== false) kick(); else st.last = 0;
    }
    function kick() { if (!st.raf && st.onScreen && st.tabShown !== false) st.raf = requestAnimationFrame(tick); }
    function set(open) {
      st.to = open ? 1 : 0;
      holder.setAttribute("aria-pressed", String(!!open));
      kick();
    }
    function update() { set(st.hover || st.sticky); }

    function size() {
      var w = holder.clientWidth, h = holder.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      kick();
    }
    new ResizeObserver(size).observe(holder);
    new IntersectionObserver(function (es) {
      st.onScreen = es[0].isIntersecting;
      if (st.onScreen) kick();
    }).observe(holder);
    env.onMotionChange(function () { kick(); });
    // inside media tabs: stop drawing while another tab is showing
    box.addEventListener("tabvisibility", function (e) {
      st.tabShown = e.detail;
      if (e.detail) kick();
    });

    /* ---------- input ---------- */
    var card = box.closest(".card") || box;
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    card.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") { st.hover = true; update(); } });
    card.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") { st.hover = false; update(); } });
    holder.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); st.sticky = !(st.hover || st.sticky); st.hover = false; update(); }
    });
    var drag = null;
    holder.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      drag = { x: e.clientX, y: e.clientY, az: st.az, el: st.el, moved: false, id: e.pointerId, type: e.pointerType };
    });
    holder.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 6) return;
      // on a touch screen, a mostly-up-and-down swipe is the page scrolling, not a turn
      if (!drag.moved && drag.type !== "mouse" && Math.abs(dy) > Math.abs(dx)) { drag = null; return; }
      if (!drag.moved) { drag.moved = true; st.dragging = true; holder.classList.add("dragging"); try { holder.setPointerCapture(e.pointerId); } catch (x) {} }
      var w = holder.clientWidth || 300;
      st.az = Math.max(-TURN.az, Math.min(TURN.az, drag.az - dx / w * 90));
      if (drag.type === "mouse") st.el = Math.max(-TURN.el, Math.min(TURN.el, drag.el + dy / w * 60));
      kick();
    });
    function end(e, cancelled) {
      if (st.dragging) { st.dragging = false; holder.classList.remove("dragging"); kick(); }
      if (!drag || e.pointerId !== drag.id) return;
      // a tap (no drag) toggles the explode on touch screens and pens; a cancel
      // (the browser took the swipe to scroll the page) doesn't
      if (!cancelled && !drag.moved && drag.type !== "mouse") { st.sticky = !st.sticky; update(); }
      drag = null;
    }
    holder.addEventListener("pointerup", function (e) { end(e, false); });
    holder.addEventListener("pointercancel", function (e) { end(e, true); });

    /* ---------- swap the drawing for the model ---------- */
    var legendH = (box.querySelector(".callouts") || {}).offsetHeight || 0;   // measured before it hides
    wrap.appendChild(holder);
    box.classList.add("has-model");
    var tag = box.querySelector(".art-tag");
    if (tag && item.modelTag) tag.textContent = tag.textContent.replace(/\/.*$/, "/ " + item.modelTag);
    // under the model: one key (his parts are the blue ones) and the hint. The
    // drawing's numbered callouts name things that aren't in the model, so they hide.
    var foot = document.createElement("div");
    foot.className = "model-foot mono";
    if (item.modelKey) {
      var key = document.createElement("span");
      key.className = "model-key";
      key.textContent = item.modelKey;
      foot.appendChild(key);
    }
    if (item.modelHint) {
      var hint = document.createElement("span");
      hint.className = "model-hint";
      hint.setAttribute("aria-hidden", "true");
      hint.textContent = fine.matches ? item.modelHint : (item.modelHintTouch || item.modelHint);
      foot.appendChild(hint);
    }
    var legend = box.querySelector(".callouts");
    // the key takes the drawing list's place at the same height, so nothing below moves
    if (legendH) { foot.style.boxSizing = "border-box"; foot.style.minHeight = legendH + "px"; }
    box.insertBefore(foot, legend || null);
    size();
    draw();
  }

  /* Outline lines: the edges where a curved surface turns away from the camera.
     Crease edges alone miss these (a cylinder would have no sides), so they're
     worked out again whenever the view changes. */
  function silhouette(THREE, geo, mat) {
    var pos = geo.attributes.position, idx = geo.index;
    var n = idx ? idx.count : pos.count, tri = n / 3;
    var get = idx ? function (i) { return idx.getX(i); } : function (i) { return i; };
    var key = {}, keyOf = function (i) {
      var k = pos.getX(i).toFixed(4) + "," + pos.getY(i).toFixed(4) + "," + pos.getZ(i).toFixed(4);
      return key[k] == null ? (key[k] = i) : key[k];   // merge vertices that share a position
    };
    var normals = new Float32Array(tri * 3), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    var edges = {}, list = [];
    for (var t = 0; t < tri; t++) {
      var i0 = keyOf(get(t * 3)), i1 = keyOf(get(t * 3 + 1)), i2 = keyOf(get(t * 3 + 2));
      a.fromBufferAttribute(pos, i0); b.fromBufferAttribute(pos, i1); c.fromBufferAttribute(pos, i2);
      c.sub(b); b.sub(a); b.cross(c).normalize();
      normals[t * 3] = b.x; normals[t * 3 + 1] = b.y; normals[t * 3 + 2] = b.z;
      [[i0, i1], [i1, i2], [i2, i0]].forEach(function (e) {
        var k = e[0] < e[1] ? e[0] + "_" + e[1] : e[1] + "_" + e[0];
        if (edges[k]) edges[k].push(t); else { edges[k] = [e[0], e[1], t]; list.push(edges[k]); }
      });
    }
    var out = new Float32Array(list.length * 6);
    var g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(out, 3));
    g.setDrawRange(0, 0);
    var lines = new THREE.LineSegments(g, mat);
    lines.frustumCulled = false;
    var inv = new THREE.Matrix4(), d = new THREE.Vector3();
    function update(dirWorld, mw) {
      inv.copy(mw).invert();
      d.copy(dirWorld).transformDirection(inv);
      var m = 0;
      for (var i = 0; i < list.length; i++) {
        var e = list[i];
        if (e.length < 4) continue;   // open edge
        var f1 = e[2], f2 = e[3];
        var s1 = normals[f1 * 3] * d.x + normals[f1 * 3 + 1] * d.y + normals[f1 * 3 + 2] * d.z;
        var s2 = normals[f2 * 3] * d.x + normals[f2 * 3 + 1] * d.y + normals[f2 * 3 + 2] * d.z;
        if ((s1 < 0) === (s2 < 0)) continue;
        out[m++] = pos.getX(e[0]); out[m++] = pos.getY(e[0]); out[m++] = pos.getZ(e[0]);
        out[m++] = pos.getX(e[1]); out[m++] = pos.getY(e[1]); out[m++] = pos.getZ(e[1]);
      }
      g.attributes.position.needsUpdate = true;
      g.setDrawRange(0, m / 3);
    }
    return { lines: lines, update: update };
  }

  window.CADMODEL = { attach: attach };
})();
