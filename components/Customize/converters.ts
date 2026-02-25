type role = {
	label: string;
};
type converter = {
	steps: { [value: number]: number };
	height: number;
	getRowLabels: (label: string) => string[];
	toValues: (size: string) => number[];
	toSizes: (val1: number, val2?: number, val3?: number, val4?: number) => string;
	getDisplayValue: (val: number, index: number) => number | string;
};
const contentSizeInputConfig = {
	steps: {
		80: 0,
		480: 20,
		960: 40,
		1920: 80,
		4000: 160,
	},
	height: 600,
};
const itemSizeInputConfig = {
	steps: {
		80: 0,
		480: 20,
		960: 40,
	},
	height: 320,
};
const spaceSizeInputConfig = {
	steps: {
		20: 4,
		40: 8,
		80: 16,
		160: 32,
		320: 64,
	},
	height: 160,
};
const gapSizeInputConfig = {
	steps: {
		4: 1,
		8: 2,
		24: 4,
		48: 8,
	},
	height: 120,
};
const letterSpacingConfig = {
	steps: {
		25: 5,
		100: 25,
	},
	height: 80,
};
const lineHeightConfig = {
	steps: {
		100: 0,
		125: 5,
		300: 25,
	},
	height: 100,
};
const fontSizeConfig = {
	steps: {
		8: 0,
		24: 1,
		32: 2,
		64: 4,
		128: 8,
		256: 16,
		512: 32,
	},
	height: 400,
};
const relativeFontSizeConfig = {
	steps: {
		4: 0,
		16: 1,
		32: 2,
		64: 4,
	},
	height: 400,
};
const fontWeightConfig = {
	steps: {
		100: 0,
		900: 100,
	},
	height: 80,
};

export const responsiveSizeConverter: converter = {
	...contentSizeInputConfig,
	getRowLabels: (label) => ["(vw)", "(rem)"].map((suffix) => label + suffix),
	toValues: (size) => (size.match(/min\((.+?)vw,(.+?)rem\)/) || [, 0, 0]).slice(1).map((v, i) => (i === 0 ? parseFloat(v) * 4 : parseFloat(v) * 16)),
	toSizes: (vw, rem) => `min(${(vw / 4).toFixed(2)}vw,${(rem / 16).toFixed(2)}rem)`,
	getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
};
export const responsiveItemSizeConverter: converter = {
	...responsiveSizeConverter,
	...itemSizeInputConfig,
};
export const responsiveSpaceSizeConverter: converter = {
	...responsiveSizeConverter,
	...spaceSizeInputConfig,
};
export const responsiveGapConverter: converter = {
	...spaceSizeInputConfig,
	getRowLabels: (label) => ["縦(vw)", "縦(rem)", "横(vw)", "横(rem)"].map((suffix) => label + suffix),
	toValues: (size) => (size.match(/min\((.+?)vw,(.+?)rem\) min\((.+?)vw,(.+?)rem\)/) || [, 0, 0, 0, 0]).slice(1).map((v, i) => (i % 2 === 0 ? parseFloat(v) * 4 : parseFloat(v) * 16)),
	toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
	getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
};

export const responsivePaddingConverter: converter = {
	...spaceSizeInputConfig,
	getRowLabels: (label) => ["縦(vw)", "縦(rem)", "横(vw)", "横(rem)"].map((suffix) => label + suffix),
	toValues: (size) => (size.match(/min\((.+?)vw,(.+?)rem\) min\((.+?)vw,(.+?)rem\)/) || [, 0, 0, 0, 0]).slice(1).map((v, i) => (i % 2 === 0 ? parseFloat(v) * 4 : parseFloat(v) * 16)),
	toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) 0 min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
	getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
};
export const responsiveMarginConverter: converter = {
	...responsivePaddingConverter,
};
export const responsiveVerticalPaddingConverter: converter = {
	...spaceSizeInputConfig,
	getRowLabels: (label) => ["上(vw)", "上(rem)", "下(vw)", "下(rem)"].map((suffix) => label + suffix),
	toValues: (size) => (size.match(/min\((.+?)vw,(.+?)rem\) (?:0|auto) min\((.+?)vw,(.+?)rem\)/) || [, 0, 0, 0, 0]).slice(1).map((v, i) => (i % 2 === 0 ? parseFloat(v) * 4 : parseFloat(v) * 16)),
	toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) 0 min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
	getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
};

export const responsiveVerticalMarginConverter: converter = {
	...responsiveVerticalPaddingConverter,
	toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) auto min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
};

export const relativeSizeConverter: converter = {
	...itemSizeInputConfig,
	getRowLabels: (label) => [label + "(em)"],
	toValues: (size) => [parseFloat(size) * 16],
	toSizes: (value) => `${value / 16}em`,
	getDisplayValue: (val) => val / 16,
};
export const relativeSpacingConverter: converter = {
	...relativeSizeConverter,
	...spaceSizeInputConfig,
};
export const relativeBorderRadiusConverter: converter = {
	...relativeSizeConverter,
	...gapSizeInputConfig,
};
export const relativeBorderWidthConverter: converter = {
	...relativeSizeConverter,
	...gapSizeInputConfig,
};
export const relativePaddingConverter: converter = {
	...gapSizeInputConfig,
	getRowLabels: (label) => [label + "縦(em)", label + "横(em)"],
	toValues: (size) => (size.match(/(.+?)em (.+?)em/) || [, 0, 0]).slice(1).map((v) => parseFloat(v) * 16),
	toSizes: (v, h) => `${v / 16}em ${h / 16}em`,
	getDisplayValue: (val) => val / 16,
};
export const relativeMarginConverter: converter = {
	...relativePaddingConverter,
};
export const letterSpacingConverter: converter = {
	...letterSpacingConfig,
	getRowLabels: (label) => [label + "(%)"],
	toValues: (size) => [size === "normal" ? 0 : parseFloat(size)],
	toSizes: (value) => (value === 0 ? "normal" : `${value}%`),
	getDisplayValue: (val) => val,
};
export const lineHeightConverter: converter = {
	...letterSpacingConverter,
	...lineHeightConfig,
};

export const fontSizeConverter: converter = {
	...responsiveSizeConverter,
	...fontSizeConfig,
};
export const relativeFontSizeConverter: converter = {
	...relativeSizeConverter,
	...relativeFontSizeConfig,
};

export const fontWeightConverter: converter = {
	...fontWeightConfig,
	getRowLabels: (label) => [label],
	toValues: (size) => [parseFloat(size)],
	toSizes: (value) => `${value}`,
	getDisplayValue: (val) => val,
};
