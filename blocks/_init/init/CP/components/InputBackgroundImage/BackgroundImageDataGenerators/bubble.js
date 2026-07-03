import { baseGradientParams, invertParams, alphaParams, aParams, wParams, seedParams, getBaseGradientCode } from "./common";
import { srand } from "catpow/util";
const { __ } = wp.i18n;

export const bubble = {
	label: __("バブル", "catpow"),
	order: 4,
	params: {
		...baseGradientParams,
		...invertParams,
		...aParams,
		...wParams,
		...alphaParams,
		...seedParams,
	},
	getData(params = {}) {
		const { invert = false, a = 5, w = 50, alpha = 25, seed = 10 } = params;
		const rand = srand(seed);
		const image = [];
		const blendmode = [];

		const c = (alpha = 100) => (invert ? `rgba(0,0,0,${alpha / 100})` : `rgba(255,255,255,${alpha / 100})`);

		for (let i = 0; i < a; i++) {
			const s = 10 + w / 4 + rand(0, Math.floor(w / 8));
			blendmode.push(invert ? "multiply" : "overlay");
			image.push(`radial-gradient(circle farthest-side at ${rand(-w, 100 + w)}% ${rand(-w, 100 + w)}%,${c(0)},${c(0)} ${s - s / 5}%,${c(alpha)} ${s}%,${c(0)} ${s}%,${c(0)} 100%)`);
		}
		if (invert) {
			image.push(`linear-gradient(#fff, #fff)`);
			blendmode.push("normal");
			image.unshift(getBaseGradientCode(params));
			blendmode.unshift("screen");
		} else {
			image.push(getBaseGradientCode(params));
			blendmode.push("normal");
		}
		return { image, size: ["cover"], blendmode, repeat: ["no-repeat"] };
	},
};
