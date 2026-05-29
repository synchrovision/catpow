((cb) => (document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb)))(() => {});
