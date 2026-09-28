(() => {
  // node_modules-included/catpow/src/util/observer/ready.js
  var ready = (cb) => document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb);

  // node_modules-included/catpow/src/util/observer/scrollspy.js
  var scrollspy = function(items, param = {}) {
    const app = {};
    app.param = Object.assign({ threshold: [0, 0.01, 0.25, 0.5, 1] }, param);
    app.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("has-visibled");
        }
        if (entry.intersectionRatio >= 0.25) {
          entry.target.classList.add("has-quarter-visibled");
        }
        if (entry.intersectionRatio >= 0.5) {
          entry.target.classList.add("has-half-visibled");
        }
        if (entry.intersectionRatio === 1) {
          entry.target.classList.add("has-full-visibled");
        }
        entry.target.classList.toggle("is-visible", entry.intersectionRatio > 0);
        entry.target.classList.toggle("is-quarter-visible", entry.intersectionRatio >= 0.25);
        entry.target.classList.toggle("is-half-visible", entry.intersectionRatio >= 0.5);
        entry.target.classList.toggle("is-full-visible", entry.intersectionRatio === 1);
      });
    }, app.param);
    items.forEach((item) => app.observer.observe(item));
    return app;
  };

  // ../blocks/_init/script/index.jsx
  ready(() => {
    scrollspy(document.querySelectorAll(".has-animation"));
  });
})();
