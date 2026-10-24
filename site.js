// Theme toggle, scroll-spy, screenshot gallery, reveal motion. No dependencies.
(function () {
  var root = document.documentElement;
  root.classList.add("js-rv");
  var KEY = (window.__zyvoraTheme || {}).key || "zyvor-imaging-site-theme";
  var btn = document.getElementById("theme");

  function paint(theme) {
    root.setAttribute("data-theme", theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  var state = { mode: root.getAttribute("data-theme") === "dark" ? "dark" : "light", view: "overview" };
  var LABEL = {
    light: "light", dark: "dark",
    overview: "Overview", worklist: "Study worklist", grid: "Picture grid", orders: "Imaging orders",
    priors: "Prior studies", identity: "Wrong-patient warning", analysis: "Image checks",
    deid: "De-identified export", cohort: "Pick several studies", audit: "Audit trail", studio: "Image studio"
  };
  var NOTE = {
    overview: "Live counts and tiles for what needs attention.",
    worklist: "Search, filter and open studies. Badges flag image checks and patient IDs filed under two names.",
    grid: "The same worklist as pictures, with priority colours and tags.",
    orders: "Scheduled scans offered to the scanner; status comes back automatically.",
    priors: "Everything else filed under the same patient ID. Newer build.",
    identity: "A warning above the images when the same ID appears under another name. Newer build.",
    analysis: "Technical findings next to the viewer, clearly labelled as not a diagnosis. Newer build.",
    deid: "Preview what is removed, shifted and remapped, then download a pseudonymised copy. Newer build.",
    cohort: "Tick several studies and export them together. Newer build.",
    audit: "A tamper-evident record of who did what, filterable to de-identified exports. Newer build.",
    studio: "The research viewer. Not for diagnostic use."
  };
  // these captures exist in dark chrome only
  var FORCE = { studio: "dark", analysis: "dark", identity: "dark" };
  var img = document.getElementById("shot"), cap = document.getElementById("shot-cap"), note = document.getElementById("shot-note");
  var groups = [].slice.call(document.querySelectorAll(".seg"));

  function syncControls() {
    groups.forEach(function (g) {
      [].forEach.call(g.querySelectorAll('[role="radio"]'), function (b) {
        var on = b.getAttribute("data-value") === state[g.getAttribute("data-key")];
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
      });
    });
  }
  function render() {
    var mode = FORCE[state.view] || state.mode;
    var src = "shots/" + mode + "-" + state.view + ".jpg";
    var text = LABEL[state.view] + " · " + LABEL[mode] + " · synthetic data";
    var alt = "Zyvor Imaging: " + LABEL[state.view] + ", " + LABEL[mode] + " appearance, synthetic data";
    syncControls();
    if (note) note.textContent = NOTE[state.view] || "";
    if (!img || img.getAttribute("src") === src) { if (cap) cap.textContent = text; return; }
    img.classList.add("swap");
    var pre = new Image();
    pre.onload = pre.onerror = function () { img.src = src; img.alt = alt; img.classList.remove("swap"); };
    pre.src = src;
    if (cap) cap.textContent = text;
  }
  groups.forEach(function (g) {
    var radios = [].slice.call(g.querySelectorAll('[role="radio"]'));
    radios.forEach(function (b, i) {
      b.addEventListener("click", function () { state[g.getAttribute("data-key")] = b.getAttribute("data-value"); render(); });
      b.addEventListener("keydown", function (e) {
        var n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: radios.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault();
        var t = radios[(n + radios.length) % radios.length];
        state[g.getAttribute("data-key")] = t.getAttribute("data-value"); render(); t.focus();
      });
    });
  });

  paint(root.getAttribute("data-theme") || "light");
  render();
  if (btn) btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) { /* private mode */ }
    paint(next);
    state.mode = next; render();
  });

  var links = [].slice.call(document.querySelectorAll("#sections a"));
  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = byId[e.target.id]; if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) io.observe(el);
    });
  }

  [].forEach.call(document.querySelectorAll(".steps .step"), function (el, i) {
    el.style.setProperty("--i", String(i));
  });

  if ("IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
    }, { threshold: 0.12 });
    [].forEach.call(document.querySelectorAll(".rv"), function (el) { rio.observe(el); });
  } else {
    [].forEach.call(document.querySelectorAll(".rv"), function (el) { el.classList.add("in"); });
  }
})();