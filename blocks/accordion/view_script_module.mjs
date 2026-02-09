import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/accordion", {
	state: {
		openByGroup: { _global: {} },
	},
	actions: {
		onClickToggle(e) {
			const { groupId = "_global", accordionId } = getContext() || {};
			if (groupId === "_global") {
				state.openByGroup[groupId][accordionId] = !state.openByGroup[groupId][accordionId];
			} else {
				state.openByGroup[groupId] = state.openByGroup[groupId] === accordionId ? null : accordionId;
			}
		},
	},
	callbacks: {
		initBlock: () => {
			const resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					entry.target.querySelectorAll(".wp-block-catpow-accordion__contents").forEach((item) => {
						item.style.setProperty("--contents-height", item.querySelector(".wp-block-catpow-accordion__contents-body").scrollHeight + "px");
					});
				}
			});
			resizeObserver.observe(getElement().ref);
		},
		isOpen: () => {
			const { groupId = "_global", accordionId } = getContext() || {};
			if (groupId === "_global") {
				return !!state.openByGroup[groupId][accordionId];
			}
			return state.openByGroup[groupId] === accordionId;
		},
	},
});
