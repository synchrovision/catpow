import { baseGradientParams, alphaParams, rParams, contrastParams, wParam, getBaseGradientCode } from "./common";
const { __ } = wp.i18n;

const c = (l = 100) => `rgb(${l},${l},${l})`;

export const dots = {
	label: __("水玉", "catpow"),
	order: 3,
	params: {
		...baseGradientParams,
		...rParams,
		w1: wParam,
		w2: wParam,
		...contrastParams,
		...alphaParams,
	},
	getData(params = {}) {
		const { r = 0, w1 = 80, w2 = 80, contrast = 50, alpha = 25 } = params;

		const l1 = c(Math.floor((alpha / 100) * 255));
		const l2 = c(Math.floor(((alpha * (100 - contrast)) / 10000) * 255));

		const image = [];
		image.push(getBaseGradientCode(params));
		image.push(`radial-gradient(circle at center, #fff, #fff ${w1}%, #000 ${w1}%, #000)`);
		image.push(`linear-gradient(${r}deg,${l1},${l2},${l2},${l1}`);

		return {
			image,
			size: ["cover", `${w2}px ${w2}px`, "cover"],
			repeat: ["no-repeat", "repeat", "no-repeat"],
			blendmode: ["screen", "multiply", "normal"],
		};
	},
};
