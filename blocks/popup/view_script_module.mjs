import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/popup", {
	state: {
		openPopup: null,
		linksByAnchor: {},
	},
	actions: {
		close(e) {
			state.openPopup = null;
			Object.values(state.linksByAnchor).forEach((links) =>
				links.forEach((link) => {
					console.log({ link });
					link.setAttribute("aria-expanded", false);
				}),
			);
		},
	},
	callbacks: {
		initBlock: () => {
			const anchor = getContext().anchor;
			const registerLink = (el) => {
				el.setAttribute("aria-haspopup", "dialog");
				el.setAttribute("aria-controls", anchor);
				if (state.linksByAnchor[anchor] == null) {
					state.linksByAnchor[anchor] = new Set();
				}
				state.linksByAnchor[anchor].add(el);
				el.addEventListener("click", (e) => {
					e.preventDefault();
					state.openPopup = anchor;
					for (const linksAnchor in state.linksByAnchor) {
						console.log({ linksAnchor, anchor });
						state.linksByAnchor[linksAnchor].forEach((link) => {
							link.setAttribute("aria-expanded", linksAnchor === anchor);
						});
					}
				});
			};
			document.querySelectorAll(`a[href="#${anchor}"]`).forEach(registerLink);
			const observer = new MutationObserver((entries) => {
				entries.forEach((entry) => entry.addedNodes.forEach((addedNode) => addedNode.querySelectorAll(`a[href="#${anchor}"]`).forEach(registerLink)));
			});
			observer.observe(document.body, { subtree: true, childList: true });
		},
		isOpen: () => getContext().anchor === state.openPopup,
	},
});
