import { translateColor } from "catpow/scssc";

export const aParam = { minimum: 1, maximum: 10 };
export const rParam = { "@editor": "Angle" };
export const wParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 } };
export const hParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 } };

export const baseGradientParams = {
	useAccentColor: { type: "boolean" },
	useInvertibleColor: { type: "boolean" },
	baseGradientRotate: { "@editor": "Angle" },
	baseGradientRange: { steps: { [-180]: 0, [-90]: 30, 90: 15, 180: 30 } },
};
export const invertParams = {
	invert: { type: "boolean" },
};
export const contrastParams = {
	contrast: { steps: { 6: 1, 10: 2, 60: 5, 100: 10 } },
};
export const alphaParams = {
	alpha: { steps: { 6: 1, 10: 2, 60: 5, 100: 10 } },
};
export const positionParams = {
	position: {
		"@editor": "Position",
		grid: 10,
		width: 100,
		height: 100,
		margin: 10,
		properties: {
			x: { default: 50 },
			y: { default: 50 },
		},
	},
};
export const aParams = {
	a: aParam,
};
export const rParams = {
	r: rParam,
};
export const wParams = {
	w: wParam,
};
export const hParams = {
	h: hParam,
};
export const seedParams = {
	seed: { minimum: 1, maximum: 100 },
};

export const getBaseGradientCode = (params) => {
	const {
		useAccentColor = true,
		useInvertibleColor = true,
		baseGradientRotate = 0,
		baseGradientRange = 0,
		colorKey = useInvertibleColor ? (useAccentColor ? "sx" : "bx") : useAccentColor ? "a" : "m",
	} = params;
	return `linear-gradient(${baseGradientRotate}deg in oklch,${translateColor(colorKey)},oklch(from ${translateColor(colorKey)} l c calc(h + ${baseGradientRange})))`;
};
