import { baseGradientParams, alphaParams, rParam, wParam, getBaseGradientCode } from "./common";
const { __ } = wp.i18n;

export const stripe = {
	label: __("ストライプ", "catpow"),
	params: {
		...baseGradientParams,
		r: rParam,
		w1: wParam,
		w2: wParam,
		...alphaParams,
	},
	getData(params = {}) {
		const { r = 0, w1 = 10, w2 = 10, alpha = 50 } = params;
		const gradient1 = `repeating-linear-gradient(${r}deg,#0000,#0000 ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1 + w2}px)`;
		const gradient2 = getBaseGradientCode(params);
		return {
			image: [gradient1, gradient2],
			size: ["cover"],
			blendmode: ["screen", "normal"],
		};
	},
};
