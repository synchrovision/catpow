import { store, getElement, getContext, withScope } from "@wordpress/interactivity";

store("catpow/sidebar", {
	actions: {
		toggle(e) {
			const ctx = getContext();
			ctx.isOpen = !ctx.isOpen;
		},
	},
	callbacks: {
		initBlock() {
			console.log("initBlock");
			const ctx = getContext();
			const block = getElement();
			const observerOptions = {
				root: null,
				rootMargin: "-19% 0px -80% 0px",
				threshold: 0,
			};
			const observer = new IntersectionObserver(
				withScope((entries) => {
					console.log(entries);
					ctx.isViewing = entries.some((entry) => entry.isIntersecting);
				}),
				observerOptions,
			);
			observer.observe(block.ref);
			return () => {
				observer.disconnect();
			};
		},
		isOpen() {
			const ctx = getContext();
			return ctx.isOpen && ctx.isViewing;
		},
		isViewing() {
			const ctx = getContext();
			return ctx.isViewing;
		},
	},
});
