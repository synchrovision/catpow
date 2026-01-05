((cb) => (document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb)))(() => {
	document.querySelectorAll(".wp-block-catpow-countdown").forEach((el) => {
		wp.element.render(wp.element.createElement(Catpow.CountDown, { target: el.dataset.target }), el);
	});
});
