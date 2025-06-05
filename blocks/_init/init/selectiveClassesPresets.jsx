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
			hasBackgroundColorNone: __("なし", "catpow"),
			hasBackgroundColor: __("通常", "catpow"),
			hasBackgroundColorAlt: __("強調", "catpow"),
		},
	},
	backgroundImage({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "backgroundImage",
			label: __("背景画像", "catpow"),
			values: "hasBackgroundImage",
			sub: [
				{
					name: "fixed",
					label: __("固定", "catpow"),
					values: "hasBackgroundImageFixed",
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
			values: "hasBackgroundPattern",
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
			hasTextAlignLeft: __("左揃え", "catpow"),
			hasTextAlignCenter: __("中央", "catpow"),
			hasTextAlignRight: __("右揃え", "catpow"),
		},
	},
	verticalAlign: {
		name: "verticalAlign",
		type: "buttons",
		label: __("垂直方向揃え", "catpow"),
		values: {
			hasVerticalAlignTop: __("上揃え", "catpow"),
			hasVerticalAlignMiddle: __("中央", "catpow"),
			hasVerticalAlignBottom: __("下揃え", "catpow"),
		},
	},
	fontSize: {
		name: "size",
		type: "buttons",
		label: __("文字サイズ", "catpow"),
		values: {
			hasFontSizeLarge: __("大", "catpow"),
			hasFontSizeMiddle: __("中", "catpow"),
			hasFontSizeSmall: __("小", "catpow"),
		},
	},
	width: {
		name: "width",
		type: "buttons",
		label: __("幅", "catpow"),
		values: {
			hasWidthFull: __("フル", "catpow"),
			hasWidthWide: __("ワイド", "catpow"),
			hasWidthRegular: __("レギュラー", "catpow"),
			hasWidthNarrow: __("ナロー", "catpow"),
		},
	},
	size: {
		name: "size",
		type: "buttons",
		label: __("サイズ", "catpow"),
		values: {
			isSizeLarge: __("大", "catpow"),
			isSizeMedium: __("中", "catpow"),
			isSizeSmall: __("小", "catpow"),
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
			hasColorSchemeInherit: __("継承", "catpow"),
			hasColorSchemeReverted: __("通常", "catpow"),
			hasColorSchemeInverted: __("反転", "catpow"),
		},
	},
	clipPath({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "clipPath",
			label: __("クリップ", "catpow"),
			values: "hasClipPath",
			sub: [
				{
					name: "shape",
					label: __("形状", "catpow"),
					type: "buttons",
					values: {
						hasClipShapeEllipse: __("楕円", "catpow"),
						hasClipShapeSlope: __("傾斜", "catpow"),
						hasClipShapeArrow: __("アロー", "catpow"),
						hasClipShapeTail: __("フキダシ", "catpow"),
					},
					sub: {
						hasClipShapeEllipse: [
							{
								name: "direction",
								type: "buttons",
								values: {
									hasClipShapeBoth: __("両方", "catpow"),
									hasClipShapeUpper: __("上", "catpow"),
									hasClipShapeBelow: __("下", "catpow"),
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
						hasClipShapeSlope: [
							{
								name: "uppper",
								type: "buttons",
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperLeft: __("左", "catpow"),
									hasClipShapeUpperRight: __("右", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									hasClipShapeBelowNone: __("なし", "catpow"),
									hasClipShapeBelowLeft: __("左", "catpow"),
									hasClipShapeBelowRight: __("右", "catpow"),
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
						hasClipShapeArrow: [
							{
								name: "uppper",
								type: "buttons",
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperIn: __("内", "catpow"),
									hasClipShapeUpperOut: __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									hasClipShapeBelowNone: __("なし", "catpow"),
									hasClipShapeBelowIn: __("内", "catpow"),
									hasClipShapeBelowOut: __("外", "catpow"),
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
						hasClipShapeTail: [
							{
								name: "uppper",
								type: "buttons",
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperIn: __("内", "catpow"),
									hasClipShapeUpperOut: __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								values: {
									hasClipShapeBelowNone: __("なし", "catpow"),
									hasClipShapeBelowIn: __("内", "catpow"),
									hasClipShapeBelowOut: __("外", "catpow"),
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
			values: "hasCustomPadding",
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
			values: "hasCustomMargin",
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
			values: "hasCustomContentWidth",
			sub: [
				{
					name: "contentWidth",
					label: __("幅", "catpow"),
					input: "range",
					vars,
					key: "--cp-custom-content-width",
					min: 50,
					max: 100,
					unit: "vw",
				},
				{
					name: "contentMaxWidth",
					label: __("最大幅", "catpow"),
					input: "range",
					vars,
					key: "--cp-custom-content-max-width",
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
			values: "hasContentWidth",
			sub: [{ preset: "customContentWidth", vars }],
			...otherParams,
		};
	},
	customBorderRadius({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "cusotomRadius",
			label: __("角丸", "catpow"),
			values: "hasCustomBorderRadius",
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
