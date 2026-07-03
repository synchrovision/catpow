import { baseGradientParams, invertParams, alphaParams, rParams, contrastParams, wParam, getBaseGradientCode } from "./common";
const { __ } = wp.i18n;

export const dots = {
	label: __("ドット", "catpow"),
	order: 3,
	params: {
		...baseGradientParams,
		...invertParams,
		...rParams,
		w1: wParam,
		w2: wParam,
		...contrastParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { invert = false, r = 0, w1 = 80, w2 = 80, contrast = 50, alpha = 25 } = params;

		const c = (l = 100) => (invert ? `rgb(${255 - l},${255 - l},${255 - l})` : `rgb(${l},${l},${l})`);

		const l1 = c(Math.floor((alpha / 100) * 255));
		const l2 = c(Math.floor(((alpha * (100 - contrast)) / 10000) * 255));

		const [c1, c2] = invert ? ["#000", "#fff"] : ["#fff", "#000"];

		const image = [];
		image.push(getBaseGradientCode(params));
		image.push(`radial-gradient(circle at center, ${c1}, ${c1} ${w1}%, ${c2} ${w1}%, ${c2})`);
		image.push(`linear-gradient(${r}deg,${l1},${l2},${l2},${l1})`);

		return {
			image,
			size: ["cover", `${w2}px ${w2}px`, "cover"],
			repeat: ["no-repeat", "repeat", "no-repeat"],
			blendmode: ["screen", invert ? "screen" : "multiply", "normal"],
		};
	},
};
