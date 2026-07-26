/* HPA engine — scene navigation for a self-contained HTML talk.
   One implementation. Do not paste a second one into a deck. */
(function () {
  "use strict";

  var GUARD_MS = 600; // a reflex clicker double-fires; one press must mean one advance

  function HPAEngine(opts) {
    opts = opts || {};
    this.scenes = Array.prototype.slice.call(document.querySelectorAll(".scene"));
    this.index = 0;
    this.guardUntil = 0;
    this.hooks = opts.hooks || {};          // { sceneId: { enter(el), exit(el) } }
    this.state = {};                        // anything a scene needs to remember
    this.progress = document.getElementById("progressBar");
    this.counter = document.getElementById("sceneCounter");
    this.reduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.init();
  }

  HPAEngine.prototype.init = function () {
    var self = this;
    document.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var k = e.key;
      if (k === "ArrowRight" || k === " " || k === "Spacebar" || k === "Enter" || k === "PageDown") {
        e.preventDefault(); self.next();
      } else if (k === "ArrowLeft" || k === "PageUp") {
        e.preventDefault(); self.prev();
      } else if (k === "Home") { e.preventDefault(); self.goTo(0); }
      else if (k === "End") { e.preventDefault(); self.goTo(self.scenes.length - 1); }
      else if (k === "r" || k === "R") { e.preventDefault(); self.replay(); }
    });

    // clicking advances, but never while a prediction point is awaiting a vote
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-choice], button, a")) return;
      if (document.body.classList.contains("awaiting")) return;
      self.next();
    });

    window.addEventListener("hashchange", function () { self.fromHash(); });
    this.fromHash();
  };

  /* --- navigation --- */

  HPAEngine.prototype.blocked = function () {
    return performance.now() < this.guardUntil;
  };
  HPAEngine.prototype.guard = function (ms) {
    this.guardUntil = performance.now() + (ms == null ? GUARD_MS : ms);
  };

  HPAEngine.prototype.next = function () {
    if (this.blocked()) return;
    if (document.body.classList.contains("awaiting")) return; // must commit first
    this.goTo(this.index + 1);
  };
  HPAEngine.prototype.prev = function () {
    if (this.blocked()) return;
    this.goTo(this.index - 1);
  };

  HPAEngine.prototype.goTo = function (i) {
    if (i < 0 || i >= this.scenes.length) return;
    var from = this.scenes[this.index], to = this.scenes[i];
    if (from && from !== to) {
      var fh = this.hooks[from.id];
      if (fh && fh.exit) fh.exit(from, this);
      from.classList.remove("active");
    }
    this.index = i;
    to.classList.add("active");
    document.body.classList.remove("awaiting");
    var th = this.hooks[to.id];
    if (th && th.enter) th.enter(to, this);
    this.paint();
    if (location.hash !== "#" + (i + 1)) {
      history.replaceState(null, "", "#" + (i + 1));
    }
  };

  HPAEngine.prototype.replay = function () {
    var el = this.scenes[this.index], h = this.hooks[el.id];
    if (h && h.enter) h.enter(el, this);
  };

  HPAEngine.prototype.fromHash = function () {
    var n = parseInt((location.hash || "").replace("#", ""), 10);
    var i = isNaN(n) ? 0 : Math.max(0, Math.min(this.scenes.length - 1, n - 1));
    var from = this.scenes[this.index];
    if (from) from.classList.remove("active");
    this.index = i;
    this.scenes[i].classList.add("active");
    var h = this.hooks[this.scenes[i].id];
    if (h && h.enter) h.enter(this.scenes[i], this);
    this.paint();
  };

  HPAEngine.prototype.paint = function () {
    if (this.progress) {
      this.progress.style.width = ((this.index + 1) / this.scenes.length * 100) + "%";
    }
    if (this.counter) {
      this.counter.textContent = (this.index + 1) + " / " + this.scenes.length;
    }
  };

  /* --- prediction points ---------------------------------------------------
     Answers live here, never in the DOM. Mark a scene `data-awaits` and give
     each option `data-choice="key"`; register the outcome in `answers`.       */

  HPAEngine.prototype.awaitVote = function (sceneEl, answers, onCommit) {
    var self = this;
    document.body.classList.add("awaiting");
    var opts = Array.prototype.slice.call(sceneEl.querySelectorAll("[data-choice]"));
    function commit(key) {
      if (!document.body.classList.contains("awaiting")) return; // one vote only
      document.body.classList.remove("awaiting");
      self.guard();
      opts.forEach(function (o) {
        o.classList.toggle("picked", o.dataset.choice === key);
        o.classList.add("locked");
      });
      if (onCommit) onCommit(key, answers ? answers[key] : undefined);
    }
    opts.forEach(function (o) {
      o.onclick = function (e) { e.stopPropagation(); commit(o.dataset.choice); };
    });
    // number keys commit too, so the presenter never has to find a target
    sceneEl._numKeys = function (e) {
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= opts.length) { e.preventDefault(); commit(opts[n - 1].dataset.choice); }
    };
    document.addEventListener("keydown", sceneEl._numKeys);
    return function cleanup() {
      document.removeEventListener("keydown", sceneEl._numKeys);
      document.body.classList.remove("awaiting");
    };
  };

  /* --- countdown ----------------------------------------------------------- */

  HPAEngine.prototype.countdown = function (barEl, seconds, done) {
    var self = this;
    if (!barEl) return function () {};
    clearTimeout(barEl._t);
    barEl.style.transition = "none";
    barEl.style.transform = "scaleX(1)";
    barEl.parentNode.classList.add("on");
    barEl.parentNode.classList.remove("out");
    if (self.reduced) { if (done) done(); return function () {}; }
    requestAnimationFrame(function () {
      barEl.style.transition = "transform " + seconds + "s linear";
      barEl.style.transform = "scaleX(0)";
    });
    barEl._t = setTimeout(function () {
      barEl.parentNode.classList.add("out");
      if (done) done();
    }, seconds * 1000);
    return function cancel() {
      clearTimeout(barEl._t);
      barEl.parentNode.classList.remove("on", "out");
    };
  };

  window.HPAEngine = HPAEngine;
})();
