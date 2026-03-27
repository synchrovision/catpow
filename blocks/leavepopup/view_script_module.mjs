import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/leavepopup", {
	actions: {
		close(e) {
			getContext().isOpen = false;
		},
	},
	callbacks: {
		initBlock: () => {
			const ctx = getContext();
			const pushDummyStateOnce = () => {
				history.pushState(null, null, null);
				document.removeEventListener("click", pushDummyStateOnce);
			};
			document.addEventListener("click", pushDummyStateOnce);
			window.addEventListener("popstate", () => {
				ctx.isOpen = true;
			});
		},
	},
});
