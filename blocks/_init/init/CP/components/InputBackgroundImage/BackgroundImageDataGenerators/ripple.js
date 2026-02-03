import { baseGradientParams, alphaParams, rParam, wParam, getBaseGradientCode } from "./common";
const { __ } = wp.i18n;

export const ripple = {
	label: __("リップル", "catpow"),
	params: {
		...baseGradientParams,
		x: { minimum: -100, maximum: 200, multipleOf: 10 },
		y: { minimum: -100, maximum: 200, multipleOf: 10 },
		w1: wParam,
		w2: wParam,
		...alphaParams,
	},
	getData(params = {}) {
		const { x = 50, y = 50, w1 = 10, w2 = 10, alpha = 50 } = params;
		const gradient1 = `repeating-radial-gradient(circle at ${x}% ${y}%,#0000,#0000 ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1 + w2}px)`;
		const gradient2 = getBaseGradientCode(params);
		return {
			image: [gradient1, gradient2],
			size: ["cover"],
			blendmode: ["screen", "normal"],
		};
	},
};
