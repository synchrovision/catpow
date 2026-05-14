import { store, getContext, getElement } from "@wordpress/interactivity";
import { applyBem } from "./bem.mjs";
import { el } from "./el.mjs";

let contentsContainer;
const container = document.body.appendChild(
	applyBem(
		el("div", { id: "cp-lightbox", class: "cp-lightbox", inert: true }, [
			(contentsContainer = el("div", { class: "_contents" })),
			el("div", {
				class: "_bg",
				onClick: () => {
					actions.close();
				},
			}),
		]),
	),
);

const { state, actions, callbacks } = store("@catpow/lightbox", {
	state: {
		isOpen: false,
		currentContentsId: null,
	},
	actions: {
		add(content) {
			if (!content.id) {
				console.error("lightbox content element should have id");
				return;
			}
			contentsContainer.appendChild(content);
		},
		open(id) {
			state.currentContentsId = id;
			state.isOpen = true;
			container.removeAttribute("inert");
			callbacks.updateState();
		},
		close() {
			state.isOpen = false;
			container.setAttribute("inert", true);
			callbacks.updateState();
		},
	},
	callbacks: {
		updateState() {
			container.classList.toggle("is-open", state.isOpen);
			[...contentsContainer.children].forEach((content) => {
				content.classList.toggle("is-active", content.id === state.currentContentsId);
			});
		},
	},
});
