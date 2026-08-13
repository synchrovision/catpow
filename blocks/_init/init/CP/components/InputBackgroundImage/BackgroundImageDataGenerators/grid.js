import { baseGradientParams, invertParams, alphaParams, rParams, wParam, getBaseGradientCode, complementParams } from "./common";
const { __ } = wp.i18n;

export const grid = {
	label: __("グリッド", "catpow"),
	order: 2,
	params: {
		...baseGradientParams,
		...invertParams,
		...rParams,
		w1: wParam,
		w2: wParam,
		...alphaParams,
	},
	getData(params = {}) {
		const { invert, r, w1, w2, alpha } = complementParams(params, grid.params);

		const c = (alpha = 100) => (invert ? `rgba(0,0,0,${alpha / 100})` : `rgba(255,255,255,${alpha / 100})`);
		const image = [
			`repeating-linear-gradient(${r}deg,${c(0)},${c(0)} ${w1}px,${c(alpha)} ${w1}px,${c(alpha)} ${w1 + w2}px)`,
			`repeating-linear-gradient(${r + 90}deg,${c(0)},${c(0)} ${w1}px,${c(alpha)} ${w1}px,${c(alpha)} ${w1 + w2}px)`,
		];
		const blendmode = invert ? ["multiply", "multiply"] : ["screen", "screen"];

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
