import { translateColor } from "catpow/scssc";

export const aParam = { minimum: 1, maximum: 10 };
export const rParam = { "@editor": "Angle" };
export const wParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 } };
export const hParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 } };

export const baseGradientParams = {
	useAccentColor: { type: "boolean" },
	baseGradientRotate: { "@editor": "Angle" },
	baseGradientColor1: { minimum: 1, maximum: 12 },
	baseGradientColor2: { minimum: 1, maximum: 12 },
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
	const { useAccentColor = true, baseGradientRotate = 0, baseGradientColor1 = 6, baseGradientColor2 = 7 } = params;
	const colorKey = useAccentColor ? "sx" : "bx";
	return `linear-gradient(${baseGradientRotate}deg in oklch,${translateColor(colorKey + baseGradientColor1)},${translateColor(colorKey + baseGradientColor2)})`;
};
