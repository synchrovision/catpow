import { baseGradientParams, alphaParams, aParams, hParams, seedParams, getBaseGradientCode } from "./common";
import { srand, pfloor } from "catpow/util";
const { __ } = wp.i18n;

const c = (alpha = 100) => `rgba(255,255,255,${alpha / 100})`;

export const ice = {
	label: __("アイス", "catpow"),
	order: 3,
	params: {
		...baseGradientParams,
		...aParams,
		...hParams,
		...seedParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { a = 5, h = 50, seed = 10, alpha = 25 } = params;
		const rand = srand(seed);

		const image = [];
		const blendmode = [];
		const dr = (h / 10) * 9;
		for (let i = 0; i < a; i++) {
			const d = rand(-dr, dr);
			const p = rand(10, 90);
			blendmode.push("overlay");
			image.push(`linear-gradient(${d}deg,${c(0)},${c(0)} ${p}%,${c(alpha)} ${p}%,${c(0)})`);
		}
		image.push(getBaseGradientCode(params));
		blendmode.push("normal");
		return {
			image,
			size: ["cover"],
			blendmode,
		};
	},
};
