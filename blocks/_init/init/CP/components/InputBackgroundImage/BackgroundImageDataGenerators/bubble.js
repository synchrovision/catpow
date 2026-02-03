import { baseGradientParams, alphaParams, wParam, getBaseGradientCode } from "./common";
import { srand } from "catpow/util";
const { __ } = wp.i18n;

export const bubble = {
	label: __("バブル", "catpow"),
	params: {
		...baseGradientParams,
		a: { minimum: 1, maximum: 10 },
		w: wParam,
		...alphaParams,
		seed: { minimum: 1, maximum: 100 },
	},
	getData(params = {}) {
		const { a = 5, w = 50, alpha = 25, seed = 10 } = params;
		const rand = srand(seed);
		const image = [];
		const blendmode = [];
		for (let i = 0; i < a; i++) {
			const s = 10 + w / 4 + rand(0, Math.floor(w / 8));
			image.push(
				`radial-gradient(circle farthest-side at ${rand(-w, 100 + w)}% ${rand(-w, 100 + w)}%,rgba(255,255,255,0),rgba(255,255,255,0) ${s - s / 5}%,rgba(255,255,255,${
					alpha / 200
				}) ${s}%,rgba(255,255,255,0) ${s}%,rgba(255,255,255,0) 100%)`,
			);
			blendmode.push("overlay");
		}
		image.push(getBaseGradientCode(params));
		blendmode.push("normal");
		return { image, size: ["cover"], blendmode, repeat: ["no-repeat"] };
	},
};
