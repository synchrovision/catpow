import { store, getContext, getElement } from "@wordpress/interactivity";
import "@catpow/lightbox.mjs";

const blockClass = "wp-block-catpow-lightbox";

const { actions: lightboxActions } = store("@catpow/lightbox");

const { state } = store("catpow/lightbox", {
	state: {
		currentIndexByBlock: {},
		lengthByBlock: {},
	},
	actions: {
		open(e) {
			const { blockId } = getContext();
			const index = parseInt(e.currentTarget.dataset.index, 10);
			state.currentIndexByBlock[blockId] = index;
			lightboxActions.open(blockId);
		},
		close() {
			lightboxActions.close();
		},
		prev() {
			const context = getContext();
			const currentIndex = getCurrentIndex(context);
			state.currentIndexByBlock[context.blockId] = Math.max(0, currentIndex - 1);
		},
		next() {
			const context = getContext();
			const currentIndex = getCurrentIndex(context);
			state.currentIndexByBlock[context.blockId] = Math.min(getLength(context) - 1, currentIndex + 1);
		},
		goto(e) {
			const context = getContext();
			console.log("goto " + e.currentTarget.dataset.index);
			state.currentIndexByBlock[context.blockId] = parseInt(e.currentTarget.dataset.index, 10);
		},
	},
	callbacks: {
		initBlock: () => {
			const { blockId } = getContext();
			const root = getElement().ref;
			const sliderItems = root.querySelectorAll(`.${blockClass}__slider-items-item`);
			root.querySelectorAll(`.${blockClass}__contents`).forEach((contents, index) => {
				sliderItems[index].append(contents);
			});
			lightboxActions.add(root.querySelector(`.${blockClass}__slider`));
		},
		getCurrentIndex: () => getCurrentIndex(getContext()),
		getLength: () => getLength(getContext()),
		isCurrent: () => {
			return parseInt(getElement().attributes["data-index"], 10) === getCurrentIndex(getContext());
		},
		hasDots: () => getLength(getContext()) > 1,
		hasPrev: () => getCurrentIndex(getContext()) > 0,
		hasNext: () => {
			const context = getContext();
			return getCurrentIndex(context) < getLength(context) - 1;
		},
	},
});

const getCurrentIndex = (context) => state.currentIndexByBlock[context.blockId] ?? 0;
const getLength = (context) => state.lengthByBlock[context.blockId] ?? context.length ?? 0;
