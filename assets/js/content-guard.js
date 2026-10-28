/* Loads before content.js on index.html and resume.html. If content.js can't be
   loaded or has a mistake in it (like a missing comma or quote), the page shows a
   clear message with the line number instead of going blank.
   You shouldn't need to edit this file. */
(function () {
  "use strict";

  // a mistake inside content.js: remember the message and where it is
  window.addEventListener("error", function (e) {
    if (window.SITE_ERROR || !e.filename || !/content\.js(\?|#|$)/.test(e.filename)) return;
    window.SITE_ERROR = { message: e.message || "", line: e.lineno || 0, column: e.colno || 0 };
  }, true);

  function h(tag, style, text) {
    var n = document.createElement(tag);
    if (style) n.setAttribute("style", style);
    if (text != null) n.textContent = text;
    return n;
  }

  // Shows the message inside `box` (the page's main area). Called by render.js and
  // resume.js when window.SITE is missing.
  window.showContentError = function (box) {
    var err = window.SITE_ERROR || { message: "content.js didn't run.", line: 0 };
    var mono = "font-family: ui-monospace, Menlo, Consolas, monospace;";
    var panel = h("div", "max-width: min(760px, calc(100% - 32px)); margin: 96px auto; box-sizing: border-box; padding: 24px 28px; background: #fff; color: #111; " +
      "border: 1.5px solid #111; border-radius: 4px; font: 16px/1.5 system-ui, sans-serif; text-align: left;");
    panel.setAttribute("role", "alert");
    panel.appendChild(h("p", mono + "margin: 0 0 6px; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: #575757;", "Site content error"));
    panel.appendChild(h("h1", "margin: 0 0 12px; font-size: 22px; font-weight: 600;", "The site couldn't read content.js"));
    var where = err.line ? "Line " + err.line + (err.column ? ", column " + err.column : "") + ": " : "";
    panel.appendChild(h("p", mono + "margin: 0 0 12px; padding: 10px 12px; background: #F6F7F9; border-left: 3px solid #1450A8; font-size: 14px; white-space: pre-wrap;", where + err.message));
    panel.appendChild(h("p", "margin: 0 0 6px;", err.line
      ? "Check for a missing comma or quote near line " + err.line + " (the mistake is often on the line just above it). Undo your last edit if you're not sure."
      : "Check that content.js is in the main folder, then check for a missing comma or quote near your last edit."));
    box.innerHTML = "";
    box.appendChild(panel);

    // where possible, show the lines around the mistake
    if (!err.line || location.protocol === "file:" || !window.fetch) return;
    fetch("content.js", { cache: "no-store" }).then(function (r) { return r.ok ? r.text() : ""; }).then(function (text) {
      if (!text) return;
      var lines = text.split("\n"), from = Math.max(1, err.line - 3), to = Math.min(lines.length, err.line + 1);
      var pre = h("pre", mono + "margin: 12px 0 0; padding: 10px 0; background: #111; color: #DDD; font-size: 13px; overflow-x: auto; border-radius: 4px;");
      for (var n = from; n <= to; n++) {
        var on = n === err.line;
        pre.appendChild(h("div", "padding: 0 12px; white-space: pre;" + (on ? " background: #3A2A00; color: #FFD27A;" : ""),
          String(n).padStart(4, " ") + "  " + lines[n - 1]));
      }
      panel.appendChild(pre);
    }).catch(function () {});
  };
})();
