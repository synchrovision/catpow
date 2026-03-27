import { store, getContext, getElement, withScope } from "@wordpress/interactivity";

const { state } = store("catpow/entrypopup", {
	actions: {
		close(e) {
			getContext().isOpen = false;
		},
	},
});
