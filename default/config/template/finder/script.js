((cb) => (document.readyState !== "loading" ? cb() : document.addEventListener("DOMContentLoaded", cb)))(() => {
	wp.apiFetch({
		path: "/cp/v1/post/post/finder/test/a/b/c",
	}).then(function (posts) {
		wp.element.render(wp.element.createElement(Finder), document.getElementById("finder"));
	});
});
