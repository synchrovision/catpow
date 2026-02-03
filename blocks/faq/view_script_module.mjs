import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("faq", {
	actions: {
		onClickToggle(e) {
			const ctx = getContext();
			const index = parseInt(e.currentTarget.dataset.index);
			ctx.openItems[index] = !ctx.openItems[index];
		},
	},
	callbacks: {
		initBlock: () => {
			const resizeObserver = new ResizeObserver((entries) => {
				for (let entry of entries) {
					entry.target.querySelectorAll(".wp-block-catpow-faq__item").forEach((item) => {
						item.style.setProperty("--contents-height", item.querySelector(".wp-block-catpow-faq__item-contents-body").scrollHeight + "px");
					});
				}
			});
			resizeObserver.observe(getElement().ref);
		},
		isOpen: () => getContext().openItems[getElement().attributes["data-index"]],
	},
});
