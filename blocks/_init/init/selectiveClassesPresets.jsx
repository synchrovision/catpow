import { CP } from "./CP.jsx";
import { ucFirst } from "catpow/util";
const { __ } = wp.i18n;

export const resolveSelectiveClassesPresets = (prms) => {
	prms.forEach((prm, index) => {
		if (typeof prm === "string" && selectiveClassesPresets.hasOwnProperty(prm)) {
			prms[index] = prm = { preset: prm };
		}
		if (prm.preset) {
			if (selectiveClassesPresets.hasOwnProperty(prm.preset)) {
				const preset = selectiveClassesPresets[prm.preset];
				if (typeof preset === "function") {
					prms[index] = preset(prm);
				} else {
					prms[index] = { ...preset, ...prm };
				}
			}
		}
		if (prm.sub) {
			if (Array.isArray(prm.sub)) {
				resolveSelectiveClassesPresets(prm.sub);
			} else {
				Object.values(prm.sub).forEach(resolveSelectiveClassesPresets);
			}
		}
	});
	return prms;
};

export const selectiveClassesPresets = {
	customColorVars: {
		name: "customColorVars",
		input: "customColorVars",
		label: __("カスタムカラー", "catpow"),
		vars: "vars",
	},
	isTemplate: {
		name: "template",
		input: "bool",
		key: "isTemplate",
		label: __("テンプレート", "catpow"),
		sub: [
			{
				name: "loop",
				input: "bool",
				label: __("ループ", "catpow"),
				key: "doLoop",
				sub: [
					{
						name: "contentPath",
						label: "content path",
						input: "text",
						key: "content_path",
					},
					{ name: "query", label: "query", input: "textarea", key: "query" },
					{
						name: "loopCount",
						label: __("プレビューループ数", "catpow"),
						input: "range",
						key: "loopCount",
						min: 1,
						max: 16,
					},
				],
			},
		],
	},
	backgroundColor: {
		name: "backgroundColor",
		type: "buttons",
		label: __("背景色", "catpow"),
		values: {
			"has-background-color-none": __("なし", "catpow"),
			"has-background-color": __("通常", "catpow"),
			"has-background-color-alt": __("強調", "catpow"),
		},
	},
	backgroundImage({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "backgroundImage",
			label: __("背景画像", "catpow"),
			values: "has-background-image",
			sub: [
				{
					name: "fixed",
					label: __("固定", "catpow"),
					values: "has-background-image-fixed",
				},
				{
					name: "image",
					label: __("画像", "catpow"),
					vars,
					key: "--cp-background-image",
					input: "image",
				},
				{
					name: "repeat",
					label: __("繰り返し", "catpow"),
					vars,
					key: "--cp-background-image-repeat",
					input: "buttons",
					values: { repeat: "両方", "repeat-x": "横", "repeat-y": "縦", "no-repeat": "なし" },
				},
				{
					name: "position",
					label: __("位置", "catpow"),
					vars,
					key: "--cp-background-image-position",
					input: "position",
				},
				{
					name: "size",
					label: __("サイズ", "catpow"),
					vars,
					key: "--cp-background-image-size",
					input: "size",
				},
				{
					name: "blendmode",
					label: __("モード", "catpow"),
					vars,
					key: "--cp-background-image-blendmode",
					input: "blendmode",
				},
				{
					name: "opacity",
					label: __("不透明度", "catpow"),
					vars,
					key: "--cp-background-image-opacity",
					input: "range",
					min: 0,
					max: 1,
					step: 0.1,
				},
			],
			...otherParams,
		};
	},
	backgroundPattern({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "backgroundPattern",
			label: __("背景パターン", "catpow"),
			values: "has-background-pattern",
			sub: [
				{
					name: "image",
					label: __("画像", "catpow"),
					vars,
					key: "--cp-background-pattern-image",
					input: "image",
				},
				{
					name: "repeat",
					label: __("繰り返し", "catpow"),
					vars,
					key: "--cp-background-pattern-repeat",
					input: "buttons",
					values: { repeat: "両方", "repeat-x": "横", "repeat-y": "縦", "no-repeat": "なし" },
				},
				{
					name: "position",
					label: __("位置", "catpow"),
					vars,
					key: "--cp-background-pattern-position",
					input: "position",
				},
				{
					name: "size",
					label: __("サイズ", "catpow"),
					vars,
					key: "--cp-background-pattern-size",
					input: "size",
				},
			],
			...otherParams,
		};
	},
	textAlign: {
		name: "textAlign",
		type: "buttons",
		label: __("テキスト揃え", "catpow"),
		values: {
			"has-text-align-left": __("左揃え", "catpow"),
			"has-text-align-center": __("中央", "catpow"),
			"has-text-align-right": __("右揃え", "catpow"),
		},
	},
	verticalAlign: {
		name: "verticalAlign",
		type: "buttons",
		label: __("垂直方向揃え", "catpow"),
		values: {
			"has-vertical-align-top": __("上揃え", "catpow"),
			"has-vertical-align-middle": __("中央", "catpow"),
			"has-vertical-align-bottom": __("下揃え", "catpow"),
		},
	},
	fontSize: {
		name: "size",
		type: "buttons",
		label: __("文字サイズ", "catpow"),
		values: {
			"has-font-size-large": __("大", "catpow"),
			"has-font-size-middle": __("中", "catpow"),
			"has-font-size-small": __("小", "catpow"),
		},
	},
	width: {
		name: "width",
		type: "buttons",
		label: __("幅", "catpow"),
		values: {
			"has-width-full": __("フル", "catpow"),
			"has-width-wide": __("ワイド", "catpow"),
			"has-width-regular": __("レギュラー", "catpow"),
			"has-width-narrow": __("ナロー", "catpow"),
		},
	},
	size: {
		name: "size",
		type: "buttons",
		label: __("サイズ", "catpow"),
		values: {
			"is-size-large": __("大", "catpow"),
			"is-size-medium": __("中", "catpow"),
			"is-size-small": __("小", "catpow"),
		},
	},
	itemSize: {
		name: "itemSize",
		label: __("サイズ", "catpow"),
		vars: "vars",
		key: "--cp-item-size",
		input: "range",
		min: 100,
		max: 1200,
		step: 10,
		coef: 0.0625,
		unit: "rem",
	},
	colorScheme: {
		name: "colorScheme",
		type: "buttons",
		label: __("配色", "catpow"),
		values: {
			"has-color-scheme-inherit": __("継承", "catpow"),
			"has-color-scheme-reverted": __("通常", "catpow"),
			"has-color-scheme-inverted": __("反転", "catpow"),
		},
	},
	clipPath({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "clipPath",
			label: __("クリップ", "catpow"),
			values: "has-clip-path",
			sub: [
				{
					name: "shape",
					label: __("形状", "catpow"),
					type: "buttons",
					values: {
						"has-clip-shape-ellipse": __("楕円", "catpow"),
						"has-clip-shape-slope": __("傾斜", "catpow"),
						"has-clip-shape-arrow": __("アロー", "catpow"),
						"has-clip-shape-tail": __("フキダシ", "catpow"),
					},
					sub: {
						"has-clip-shape-ellipse": [
							{
								name: "direction",
								type: "buttons",
								values: {
									"has-clip-shape-both": __("両方", "catpow"),
									"has-clip-shape-upper": __("上", "catpow"),
									"has-clip-shape-below": __("下", "catpow"),
								},
							},
							{
								name: "amount",
								label: __("量", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-amount",
								min: 1,
								max: 100,
							},
						],
						"has-clip-shape-slope": [
							{
								name: "uppper",
								type: "buttons",
								values: {
									"has-clip-shape-upper-none": __("なし", "catpow"),
									"has-clip-shape-upper-left": __("左", "catpow"),
									"has-clip-shape-upper-right": __("右", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									"has-clip-shape-below-none": __("なし", "catpow"),
									"has-clip-shape-below-left": __("左", "catpow"),
									"has-clip-shape-below-right": __("右", "catpow"),
								},
							},
							{
								name: "upperHeight",
								label: __("上高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-upper-height",
								min: 8,
								max: 400,
							},
							{
								name: "belowHeight",
								label: __("下高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-below-height",
								min: 8,
								max: 400,
							},
						],
						"has-clip-shape-arrow": [
							{
								name: "uppper",
								type: "buttons",
								values: {
									"has-clip-shape-upper-none": __("なし", "catpow"),
									"has-clip-shape-upper-in": __("内", "catpow"),
									"has-clip-shape-upper-out": __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									"has-clip-shape-below-none": __("なし", "catpow"),
									"has-clip-shape-below-in": __("内", "catpow"),
									"has-clip-shape-below-out": __("外", "catpow"),
								},
							},
							{
								name: "upperHeight",
								label: __("上高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-upper-height",
								min: 8,
								max: 400,
							},
							{
								name: "belowHeight",
								label: __("下高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-below-height",
								min: 8,
								max: 400,
							},
						],
						"has-clip-shape-tail": [
							{
								name: "uppper",
								type: "buttons",
								values: {
									"has-clip-shape-upper-none": __("なし", "catpow"),
									"has-clip-shape-upper-in": __("内", "catpow"),
									"has-clip-shape-upper-out": __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									"has-clip-shape-below-none": __("なし", "catpow"),
									"has-clip-shape-below-in": __("内", "catpow"),
									"has-clip-shape-below-out": __("外", "catpow"),
								},
							},
							{
								name: "upperWidth",
								label: __("上幅", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-upper-width",
								min: 8,
								max: 400,
							},
							{
								name: "upperHeight",
								label: __("上高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-upper-height",
								min: 8,
								max: 400,
							},
							{
								name: "belowWidth",
								label: __("下幅", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-below-width",
								min: 8,
								max: 400,
							},
							{
								name: "belowHeight",
								label: __("下高さ", "catpow"),
								input: "range",
								vars,
								key: "--cp-clip-shape-below-height",
								min: 8,
								max: 400,
							},
						],
					},
				},
			],
			...otherParams,
		};
	},
	customPadding({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "customPadding",
			label: __("余白", "catpow"),
			values: "has-custom-padding",
			sub: [
				{
					name: "paddingTop",
					label: __("上余白", "catpow"),
					input: "range",
					vars,
					key: "--cp-padding-top",
					min: 0,
					max: 400,
					coef: 0.0625,
					unit: "rem",
				},
				{
					name: "paddingBottom",
					label: __("下余白", "catpow"),
					input: "range",
					vars,
					key: "--cp-padding-bottom",
					min: 0,
					max: 400,
					coef: 0.0625,
					unit: "rem",
				},
				{
					name: "paddingInline",
					label: __("横余白", "catpow"),
					input: "range",
					vars,
					key: "--cp-padding-inline",
					min: 0,
					max: 100,
					coef: 0.0625,
					unit: "rem",
				},
			],
			...otherParams,
		};
	},
	customMargin({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "customMargin",
			label: __("間隔", "catpow"),
			values: "has-custom-margin",
			sub: [
				{
					name: "marginTop",
					label: __("上間隔", "catpow"),
					input: "range",
					vars,
					key: "--cp-margin-top",
					min: -400,
					max: 400,
					coef: 0.0625,
					unit: "rem",
				},
				{
					name: "marginBottom",
					label: __("下間隔", "catpow"),
					input: "range",
					vars,
					key: "--cp-margin-bottom",
					min: -400,
					max: 400,
					coef: 0.0625,
					unit: "rem",
				},
			],
			...otherParams,
		};
	},
	customContentWidth({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "customContentWidth",
			label: __("カスタムコンテンツ幅", "catpow"),
			values: "has-custom-content-width",
			sub: [
				{
					name: "contentWidth",
					label: __("幅", "catpow"),
					input: "range",
					vars,
					key: "--cp-content-width",
					min: 50,
					max: 100,
					unit: "vw",
				},
				{
					name: "contentMaxWidth",
					label: __("最大幅", "catpow"),
					input: "range",
					vars,
					key: "--cp-content-max-width",
					min: 200,
					max: 1600,
					coef: 0.0625,
					unit: "rem",
				},
			],
			...otherParams,
		};
	},
	contentWidth({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "contentWidth",
			label: __("コンテンツ幅", "catpow"),
			values: "has-content-width",
			sub: [{ preset: "customContentWidth", vars }],
			...otherParams,
		};
	},
	customBorderRadius({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "cusotomRadius",
			label: __("角丸", "catpow"),
			values: "has-custom-border-radius",
			sub: [
				{
					name: "borderRadius",
					label: __("径", "catpow"),
					input: "range",
					vars,
					key: "--cp-border-radius",
					min: 1,
					max: 100,
				},
			],
			...otherParams,
		};
	},
};
wp.domReady(() => {
	wp.hooks.applyFilters("catpow.blocks.selectiveClassesPresets", CP.finderProxy(selectiveClassesPresets));
});
