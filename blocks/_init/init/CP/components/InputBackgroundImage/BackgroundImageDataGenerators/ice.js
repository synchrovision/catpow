import { baseGradientParams, invertParams, alphaParams, aParams, hParams, seedParams, getBaseGradientCode, rParams } from "./common";
import { srand, pfloor } from "catpow/util";
const { __ } = wp.i18n;

export const ice = {
	label: __("アイス", "catpow"),
	order: 4,
	params: {
		...baseGradientParams,
		...invertParams,
		...aParams,
		...hParams,
		...rParams,
		...seedParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { invert = false, a = 5, h = 50, r = 0, seed = 10, alpha = 25 } = params;
		const rand = srand(seed);

		const c = (alpha = 100) => (invert ? `rgba(0,0,0,${alpha / 100})` : `rgba(255,255,255,${alpha / 100})`);

		const image = [];
		const blendmode = [];
		const dr = (h / 10) * 9;
		for (let i = 0; i < a; i++) {
			const d = r + rand(-dr, dr);
			const p = rand(10, 90);
			blendmode.push(invert ? "multiply" : "overlay");
			image.push(`linear-gradient(${d}deg,${c(0)},${c(0)} ${p}%,${c(alpha)} ${p}%,${c(0)},${c(0)})`);
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
		return {
			image,
			size: ["cover"],
			blendmode,
		};
	},
};
