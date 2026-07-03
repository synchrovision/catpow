import { baseGradientParams, invertParams, alphaParams, aParams, wParams, hParams, rParams, seedParams, getBaseGradientCode } from "./common";
import { srand, pfloor } from "catpow/util";
const { __ } = wp.i18n;

export const air = {
	label: __("エア", "catpow"),
	order: 4,
	params: {
		...baseGradientParams,
		...invertParams,
		...aParams,
		...wParams,
		...hParams,
		...rParams,
		...alphaParams,
		...seedParams,
	},
	getData(params = {}) {
		const { invert = false, a = 3, w = 50, h = 50, r = 0, alpha = 25, seed = 10 } = params;
		const rand = srand(seed);

		const image = [];
		const blendmode = [];

		const c = (alpha = 100) => (invert ? `rgba(0,0,0,${alpha / 100})` : `rgba(255,255,255,${alpha / 100})`);

		for (let i = 0; i < a; i++) {
			const cr = 50 + w + rand(0, w / 4);
			const rad = ((r + rand(-30, 30)) / 180) * Math.PI + Math.PI * (i % 2);
			const or = cr + rand(-h, h);
			const ox = 50 + Math.sin(rad) * or;
			const oy = 50 + Math.cos(rad) * or;
			const p = 99 - 2000 / cr;
			blendmode.push(invert ? "multiply" : "overlay");
			image.push(`radial-gradient(${cr}% ${cr}% at ${ox}% ${oy}%,${c(0)},${c(0)} ${p}%,${c(alpha)} ${i % 4 < 2 ? 99 : p}%,${c(0)} 99%)`);
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
