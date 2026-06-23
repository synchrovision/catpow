import { store, getElement, getContext, withScope } from "@wordpress/interactivity";
import { debounce, throttle } from "@catpow/buffer.mjs";

store("catpow/slider", {
	state: {},
	actions: {
		prev: (e) => {
			const ctx = getContext();
			ctx.items[ctx.current + ctx.length - 1].scrollIntoView({ inline: "center", behavior: "smooth" });
		},
		next: (e) => {
			const ctx = getContext();
			ctx.items[ctx.current + ctx.length + 1].scrollIntoView({ inline: "center", behavior: "smooth" });
		},
		onClickItem: (e) => {
			const ctx = getContext();
			ctx.items[parseInt(e.currentTarget.closest("[data-index]").dataset.index) + ctx.length].scrollIntoView({ inline: "center", behavior: "smooth" });
		},
	},
	callbacks: {
		initBlock: () => {
			const blockEl = getElement().ref;
			const ctx = getContext();
			const contents = blockEl.querySelector(".wp-block-catpow-slider__contents");
			const orgItems = [...contents.children];
			ctx.length = orgItems.length;
			for (let i = 0; i < 2; i++) {
				orgItems.forEach((item) => {
					contents.appendChild(item.cloneNode(true));
				});
			}
			blockEl.addEventListener(
				"scroll",
				debounce((e) => {
					const gap = contents.children[orgItems.length].offsetLeft - contents.children[0].offsetLeft;
					const scrollLeftMax = gap * 3 - blockEl.clientWidth;
					const threasholdLeft = scrollLeftMax / 2 - gap / 2;
					const threasholdRight = threasholdLeft + gap;
					if (blockEl.scrollLeft < threasholdLeft) {
						blockEl.scrollTo({ left: blockEl.scrollLeft + gap, behavior: "instant" });
					} else if (blockEl.scrollLeft > threasholdRight) {
						blockEl.scrollTo({ left: blockEl.scrollLeft - gap, behavior: "instant" });
					}
				}, 160),
			);
			const items = [...contents.children];
			ctx.items = items;
			const startItem = items[0];
			const endItem = items[items.length - 1];
			const updateCssVars = withScope(() => {
				const w = endItem.offsetLeft - startItem.offsetLeft;
				const u = w / (items.length - 1);
				const o = startItem.offsetLeft - blockEl.scrollLeft - (blockEl.offsetWidth - startItem.offsetWidth) / 2;
				const activeItemIndex = Math.floor((-o / w) * items.length);
				for (let i = 0; i < items.length; i++) {
					items[i].classList.toggle("is-prev", activeItemIndex === i - 1);
					items[i].classList.toggle("is-active", activeItemIndex === i);
					items[i].classList.toggle("is-next", activeItemIndex === i + 1);
					items[i].style.setProperty("--cp-slider-item-position", o + u * i);
				}
				getContext().current = activeItemIndex % orgItems.length;
			});
			blockEl.addEventListener("scroll", updateCssVars);
			blockEl.scrollTo({ left: ((endItem.offsetLeft - startItem.offsetLeft) / (items.length - 1)) * (ctx.current + ctx.length) - (blockEl.offsetWidth - startItem.offsetWidth) / 2 });
			updateCssVars();
		},
		isActive: () => getContext().current == getElement().attributes["data-index"],
		getSlidePosition: () => parseInt(getElement().attributes["data-index"]) - getContext().current,
		getPositionClass: () => {
			const p = parseInt(getElement().attributes["data-index"]) - getContext().current;
			if (p == 0) {
				return "is-active";
			}
			if (p == 1) {
				return "is-next";
			}
			if (p == -1) {
				return "is-prev";
			}
			if (p > 0) {
				return "is-after";
			}
			if (p < 0) {
				return "is-before";
			}
		},
	},
});
