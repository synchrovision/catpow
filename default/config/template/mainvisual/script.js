(() => {
  // modules/src/util/dimension.jsx
  var simpleParallax = (el, target) => {
    if (!target || !target.getBoundingClientRect) {
      target = el.parentElement;
    }
    el.style.setProperty("position", "fixed");
    el.style.setProperty("inset", "0");
    const update = () => {
      const bnd = target.getBoundingClientRect(), wh = window.innerHeight, ww = window.innerWidth;
      const t = Math.max(0, Math.min(1, bnd.top / wh)) * 100;
      const b = Math.max(0, Math.min(1, bnd.bottom / wh)) * 100;
      const l = Math.max(0, Math.min(1, bnd.left / ww)) * 100;
      const r = Math.max(0, Math.min(1, bnd.right / ww)) * 100;
      el.style.setProperty("clip-path", `polygon(${l}% ${t}%, ${r}% ${t}%, ${r}% ${b}%, ${l}% ${b}%)`);
    };
    document.addEventListener("scroll", (cb) => window.requestAnimationFrame(update));
    window.addEventListener("resize", (cb) => window.requestAnimationFrame(update));
    window.addEventListener("load", update);
    update();
  };

  // modules/src/util/observer.jsx
  var ready = (cb) => document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb);

  // ../default/config/template/mainvisual/script/index.jsx
  ready(() => {
    document.querySelectorAll(".cp-mainvisual > .bg").forEach((el) => simpleParallax(el));
  });
})();
