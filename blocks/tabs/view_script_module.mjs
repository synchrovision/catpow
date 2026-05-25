import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/tabs", {
	state: {},
	actions: {
		onClickTab(e) {
			const ctx = getContext();
			const el = getElement();
			ctx.currentTabId = el?.attributes["aria-controls"];
			ctx.currentIndex = parseInt(el.attributes?.["data-index"]);
			el.ref.closest("[data-wp-interactive]").style.setProperty("--current-index", ctx.currentIndex);
		},
	},
	callbacks: {
		initBlock: () => {},
		isActiveTab: () => getElement()?.attributes["aria-controls"] === getContext()?.currentTabId,
		isActivePanel: () => getElement()?.attributes["id"] === getContext()?.currentTabId,
	},
});
