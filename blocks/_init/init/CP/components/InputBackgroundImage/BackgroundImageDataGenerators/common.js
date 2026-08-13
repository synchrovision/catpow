import { translateColor } from "catpow/scssc";

export const aParam = { minimum: 1, maximum: 10, default: 5 };
export const rParam = { "@editor": "Angle", default: 0 };
export const wParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 }, default: 50 };
export const hParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 }, default: 50 };

export const baseGradientParams = {
	useAccentColor: { type: "boolean", default: true },
	useInvertibleColor: { type: "boolean", default: true },
	baseGradientRotate: { "@editor": "Angle", default: 0 },
	baseGradientRange: { steps: { [-180]: 0, [-90]: 30, 90: 15, 180: 30 }, default: 60 },
};
export const invertParams = {
	invert: { type: "boolean", default: false },
};
export const contrastParams = {
	contrast: { steps: { 6: 1, 10: 2, 60: 5, 100: 10 }, default: 50 },
};
export const alphaParams = {
	alpha: { steps: { 6: 1, 10: 2, 60: 5, 100: 10 }, default: 25 },
};
export const positionParams = {
	position: {
		"@editor": "Position",
		grid: 10,
		width: 100,
		height: 100,
		margin: 10,
		properties: {
			x: { minimum: 0, maximum: 100 },
			y: { minimum: 0, maximum: 100 },
		},
		default: { x: 50, y: 50 },
	},
};
export const aParams = {
	a: aParam,
};
export const rParams = {
	r: rParam,
};
export const r1Params = {
	r1: rParam,
};
export const r2Params = {
	r2: { ...rParam, default: 90 },
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
		useAccentColor = baseGradientParams.useAccentColor.default,
		useInvertibleColor = baseGradientParams.useInvertibleColor.default,
		baseGradientRotate = baseGradientParams.baseGradientRotate.default,
		baseGradientRange = baseGradientParams.baseGradientRange.default,
		colorKey = useInvertibleColor ? (useAccentColor ? "sx" : "bx") : useAccentColor ? "a" : "m",
	} = params;
	return `linear-gradient(${baseGradientRotate}deg in oklch,${translateColor(colorKey)},oklch(from ${translateColor(colorKey)} l c calc(h + ${baseGradientRange})))`;
};

export const complementParams = (params, properties) => ({
	...Object.keys(properties).reduce((p, c) => ({ ...p, [c]: properties[c].default }), {}),
	...params,
});
