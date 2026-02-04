import { baseGradientParams, alphaParams, rParam, wParams, getBaseGradientCode } from "./common";
const { __ } = wp.i18n;

export const check = {
	label: __("チェック", "catpow"),
	order: 2,
	params: {
		...baseGradientParams,
		r1: rParam,
		r2: rParam,
		...wParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { r1 = 45, r2 = 135, w = 20, alpha = 50 } = params;

		const gradient1 = getBaseGradientCode(params);
		const gradient2 = `linear-gradient(rgba(0,0,0,${1 - alpha / 100}),rgba(0,0,0,${1 - alpha / 100}))`;
		const gradient3 = `repeating-linear-gradient(${r1}deg,#000,#000 ${w}px,#fff ${w}px,#fff ${w * 2}px)`;
		const gradient4 = `repeating-linear-gradient(${r2}deg,#000,#000 ${w}px,#fff ${w}px,#fff ${w * 2}px)`;
		return {
			image: [gradient1, gradient2, gradient3, gradient4],
			size: ["cover"],
			blendmode: ["screen", "multiply", "difference", "normal"],
		};
	},
};
