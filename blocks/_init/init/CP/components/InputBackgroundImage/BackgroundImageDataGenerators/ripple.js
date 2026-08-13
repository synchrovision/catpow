import { baseGradientParams, alphaParams, wParam, positionParams, getBaseGradientCode, complementParams } from "./common";
const { __ } = wp.i18n;

export const ripple = {
	label: __("リップル", "catpow"),
	order: 2,
	params: {
		...baseGradientParams,
		...positionParams,
		w1: wParam,
		w2: wParam,
		...alphaParams,
	},
	getData(params = {}) {
		const { position: { x, y }, w1, w2, alpha } = complementParams(params, ripple.params);
		const gradient1 = `repeating-radial-gradient(circle at ${x}% ${y}%,#0000,#0000 ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1 + w2}px)`;
		const gradient2 = getBaseGradientCode(params);
		return {
			image: [gradient1, gradient2],
			size: ["cover"],
			blendmode: ["screen", "normal"],
		};
	},
};
