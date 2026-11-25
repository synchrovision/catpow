import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/siteheader", {
	state: {},
	actions: {
		onClickToggle(e) {
			const ctx = getContext();
			ctx.isOpen = !ctx.isOpen;
		},
		onEnterMenuItem(e) {
			const ctx = getContext();
			ctx.currentPanelId = ctx.panelId;
		},
		onLeaveMenuItem(e) {
			const ctx = getContext();
			ctx.currentPanelId = null;
		},
		onClickBack(e) {
			console.log("onClickToggle");
			window.scrollTo(0, 0);
		},
	},
	callbacks: {
		isPanelOpen: () => {
			if (window.innerWidth < 1280) return true;
			const { currentPanelId, panelId } = getContext() || {};
			console.log({ currentPanelId, panelId });
			return panelId === currentPanelId;
		},
	},
});
