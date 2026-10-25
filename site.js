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
    priors: "Everything else filed under the same patient ID.",
    identity: "A warning above the images when the same ID appears under another name.",
    analysis: "Technical findings next to the viewer, clearly labelled as not a diagnosis.",
    deid: "Preview what is removed, shifted and remapped, then download a pseudonymised copy.",
    cohort: "Tick several studies and export them together.",
    audit: "A tamper-evident record of who did what, filterable to de-identified exports.",
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
// ---- 0.4.0: hero reel, tour chapters, viewer tabs, one-line live demo command, scroll progress ----
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero recording: pause on request (and always when the page is not visible), tilt a little with the pointer.
  var reel = document.getElementById("reel"), toggle = document.getElementById("reel-toggle"), rw = document.getElementById("reel-window");
  if (reel && toggle) {
    if (reduce) { reel.removeAttribute("autoplay"); reel.pause(); toggle.textContent = "Play"; toggle.setAttribute("aria-label", "Play the recording"); toggle.setAttribute("aria-pressed", "true"); }
    toggle.addEventListener("click", function () {
      if (reel.paused) { reel.play(); toggle.textContent = "Pause"; toggle.setAttribute("aria-pressed", "false"); toggle.setAttribute("aria-label", "Pause the recording"); }
      else { reel.pause(); toggle.textContent = "Play"; toggle.setAttribute("aria-pressed", "true"); toggle.setAttribute("aria-label", "Play the recording"); }
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (!e.isIntersecting) reel.pause(); else if (toggle.getAttribute("aria-pressed") === "false") reel.play().catch(function () {}); });
      }, { threshold: 0.2 }).observe(reel);
    }
  }
  if (rw && !reduce && window.matchMedia && window.matchMedia("(hover:hover)").matches) {
    rw.addEventListener("pointermove", function (e) {
      var r = rw.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      rw.style.setProperty("--rx", (x * 5).toFixed(2)); rw.style.setProperty("--ry", (-y * 4).toFixed(2)); rw.style.setProperty("--tilt", x.toFixed(2));
    });
    rw.addEventListener("pointerleave", function () { rw.style.setProperty("--rx", "0"); rw.style.setProperty("--ry", "0"); rw.style.setProperty("--tilt", "-1"); });
  }

  // Tour with chapters.
  var tour = document.getElementById("tour");
  var chapters = [].slice.call(document.querySelectorAll(".chapters button"));
  if (tour && chapters.length) {
    chapters.forEach(function (b) {
      b.addEventListener("click", function () { tour.currentTime = parseFloat(b.getAttribute("data-t")); tour.play().catch(function () {}); });
    });
    tour.addEventListener("timeupdate", function () {
      var t = tour.currentTime, current = null;
      chapters.forEach(function (b) { if (parseFloat(b.getAttribute("data-t")) <= t + 0.05) current = b; b.removeAttribute("aria-current"); });
      if (current) current.setAttribute("aria-current", "true");
    });
  }

  // Viewer showcase tabs.
  var SHOTS = {
    mpr: ["media/viewer-mpr.jpg", "MPR · made-up phantom", "Axial, coronal and sagittal planes with a shared crosshair. Click or drag to move it; scroll to step through a plane.", "MPR: three linked planes through the phantom's sphere"],
    tilt: ["media/viewer-tilt.jpg", "Tilted planes · made-up phantom", "All three planes tilted together about the patient axes. The crosshair stays where it is in the patient; Reset goes back to the standard planes.", "The three planes tilted together"],
    segment: ["media/viewer-segment.jpg", "Segment and edit · made-up phantom", "One click grows a segment. A brush, an eraser, fill holes, smoothing and undo refine it; it is saved with the series and rebuilt from the pixels.", "A grown and edited segment drawn over the planes"],
    "3d": ["media/viewer-3d.jpg", "3D volume rendering · made-up phantom", "Volume rendering with your segment in colour (the red ball). Drag to rotate, wheel to zoom, 1-4 for presets.", "3D volume rendering of the phantom with a coloured segment"],
    clip: ["media/viewer-clip.jpg", "Clip box · made-up phantom", "Six sliders cut the volume on each axis. The same picture comes from WebGPU, WebGL2 and a slow reference renderer used in the tests.", "3D view with part of the volume clipped away"]
  };
  var tabs = document.getElementById("vtabs"), vshot = document.getElementById("vshot"), vcap = document.getElementById("vshot-cap"), vnote = document.getElementById("vshot-note");
  if (tabs && vshot) {
    var radios = [].slice.call(tabs.querySelectorAll('[role="radio"]'));
    var select = function (b, focus) {
      var d = SHOTS[b.getAttribute("data-value")];
      radios.forEach(function (r) { var on = r === b; r.setAttribute("aria-checked", on ? "true" : "false"); r.tabIndex = on ? 0 : -1; });
      vshot.classList.add("swap");
      var pre = new Image();
      pre.onload = pre.onerror = function () { vshot.src = d[0]; vshot.alt = d[3]; vshot.classList.remove("swap"); };
      pre.src = d[0];
      vcap.textContent = d[1]; vnote.textContent = d[2];
      if (focus) b.focus();
    };
    radios.forEach(function (b, i) {
      b.tabIndex = i === 0 ? 0 : -1;
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: radios.length - 1 }[e.key];
        if (n === undefined) return;
        e.preventDefault(); select(radios[(n + radios.length) % radios.length], true);
      });
    });
  }

  // The one-line live demo: a fresh password is made here, in the browser, and goes nowhere else.
  var cmd = document.getElementById("cmd"), copy = document.getElementById("cmd-copy");
  if (cmd) {
    // The server wants a password of at least 32 characters; 36 random ones come from the browser's own generator.
    var bytes = new Uint8Array(36);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    var pw = "demo" + Array.prototype.map.call(bytes, function (b) { return "abcdefghijkmnpqrstuvwxyz23456789".charAt(b % 32); }).join("");
    var users = '{"admin":{"token":"' + pw + '","role":"admin"}}';
    var IMAGE = "ghcr.io/zyvorai/zyvor-imaging:0.4.0";
    var TEXT = {
      unix: "docker run --rm -p 8080:8080 -e IMAGING_SEED_DEMO=true -e IMAGING_SECURE_COOKIE=false -e IMAGING_USERS='" + users + "' " + IMAGE,
      win: "@'\nIMAGING_USERS=" + users + "\nIMAGING_SEED_DEMO=true\nIMAGING_SECURE_COOKIE=false\n'@ | Set-Content -Encoding ascii demo.env\ndocker run --rm -p 8080:8080 --env-file demo.env " + IMAGE
    };
    var os = /Win/i.test(navigator.platform || navigator.userAgent || "") ? "win" : "unix";
    var osButtons = [].slice.call(document.querySelectorAll(".cmd-tabs button"));
    var showCmd = function () {
      cmd.textContent = TEXT[os] + "\n\n# then open http://127.0.0.1:8080 and sign in as  admin  with the password  " + pw;
      osButtons.forEach(function (b) { b.setAttribute("aria-checked", b.getAttribute("data-os") === os ? "true" : "false"); });
    };
    osButtons.forEach(function (b) { b.addEventListener("click", function () { os = b.getAttribute("data-os"); showCmd(); }); });
    showCmd();
    if (copy) copy.addEventListener("click", function () {
      var done = function () { copy.textContent = "Copied"; setTimeout(function () { copy.textContent = "Copy"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(TEXT[os]).then(done, function () { selectText(cmd); });
      else selectText(cmd);
    });
  }
  function selectText(node) { var r = document.createRange(); r.selectNodeContents(node); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }

  // Scroll progress.
  if (!reduce) {
    var bar = document.createElement("div"); bar.className = "progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
    var tick = false;
    var update = function () { var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0).toFixed(4) + ")"; tick = false; };
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
