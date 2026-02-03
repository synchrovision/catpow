import { translateColor } from "catpow/scssc";

export const baseGradientParams = {
	useAccentColor: { type: "boolean" },
	baseGradientRotate: { "@editor": "Angle" },
	baseGradientColor1: { minimum: 1, maximum: 12 },
	baseGradientColor2: { minimum: 1, maximum: 12 },
};
export const alphaParams = {
	alpha: { steps: { 6: 1, 10: 2, 60: 5, 100: 10 } },
};
export const rParam = { "@editor": "Angle" };
export const wParam = { steps: { 1: 0, 10: 1, 20: 2, 50: 5, 100: 10, 200: 20 } };
export const getBaseGradientCode = (params) => {
	const { useAccentColor = true, baseGradientRotate = 0, baseGradientColor1 = 6, baseGradientColor2 = 7 } = params;
	const colorKey = useAccentColor ? "sx" : "bx";
	return `linear-gradient(${baseGradientRotate}deg in hsl,${translateColor(colorKey + baseGradientColor1)},${translateColor(colorKey + baseGradientColor2)})`;
};
