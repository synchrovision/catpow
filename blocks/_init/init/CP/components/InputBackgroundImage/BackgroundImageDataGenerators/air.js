import { baseGradientParams, alphaParams, wParams, hParams, getBaseGradientCode } from "./common";
import { pfloor } from "catpow/util";
const { __ } = wp.i18n;

export const air = {
	label: __("エア", "catpow"),
	order: 3,
	params: {
		...baseGradientParams,
		...wParams,
		...hParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { w = 50, h = 50, alpha = 25 } = params;
		const p1 = 50 + pfloor(h / 5, 1),
			p2 = 50 + pfloor(h / 10, 1),
			p3 = 50 + pfloor(h / 3, 1);
		const gradient1 = `radial-gradient(${80 + w / 2}% 100% at 40% 0%,rgba(255,255,255,0),rgba(255,255,255,0) ${p1}%,rgba(255,255,255,${alpha / 100}) ${p1}%,rgba(255,255,255,0))`;
		const gradient2 = `radial-gradient(${100 + w}% 100% at 25% 100%,rgba(255,255,255,0),rgba(255,255,255,${alpha / 100}) ${p2}%,rgba(255,255,255,0) ${p2}%,rgba(255,255,255,0))`;
		const gradient3 = `radial-gradient(${100 + w}% 100% at 100% 100%,rgba(255,255,255,0),rgba(255,255,255,${alpha / 100}) ${p3}%,rgba(255,255,255,0) ${p3}%,rgba(255,255,255,0))`;
		const gradient4 = getBaseGradientCode(params);
		return {
			image: [gradient1, gradient2, gradient3, gradient4],
			size: ["cover"],
			blendmode: ["overlay", "overlay", "overlay", "normal"],
		};
	},
};
