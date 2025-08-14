const { __ } = wp.i18n;

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
	zIndex: {
		name: "zIndex",
		label: __("z-index", "catpow"),
		input: "range",
		vars: "vars",
		key: "--cp-z-index",
		min: 1,
		max: 20,
	},
	backgroundImage({ preset, vars = "vars", classKey, ...otherParams }) {
		return {
			name: "backgroundImage",
			label: __("背景画像", "catpow"),
			values: "hasBackgroundImage",
			classKey,
			sub: [
				{
					name: "fixed",
					label: __("固定", "catpow"),
					classKey,
					values: "hasBackgroundImageFixed",
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
				{
					name: "backgroundimage",
					label: __("背景画像", "catpow"),
					vars,
					prefix: "--cp-background-image",
					input: "backgroundimage",
				},
			],
			...otherParams,
		};
	},
	backgroundPattern({ preset, vars = "vars", ...otherParams }) {
		/**
		 * @todo enable to select image and get size from prepared image
		 */
		return {
			name: "backgroundPattern",
			label: __("背景パターン", "catpow"),
			values: "hasBackgroundPattern",
			sub: [
				{
					name: "backgroundimage",
					label: __("背景画像", "catpow"),
					vars,
					prefix: "--cp-background-pattern",
					input: "backgroundimage",
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
		name: "fontSize",
		type: "buttons",
		label: __("文字サイズ", "catpow"),
		values: {
			hasFontSizeXLarge: __("極大", "catpow"),
			hasFontSizeLarge: __("大", "catpow"),
			hasFontSizeMiddle: __("中", "catpow"),
			hasFontSizeSmall: __("小", "catpow"),
			hasFontSizeXSmall: __("極小", "catpow"),
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
			isSizeXlarge: __("極大", "catpow"),
			isSizeLarge: __("大", "catpow"),
			isSizeMedium: __("中", "catpow"),
			isSizeSmall: __("小", "catpow"),
			isSizeXsmall: __("極小", "catpow"),
		},
	},
	itemSize: {
		name: "itemSize",
		label: __("アイテムサイズ", "catpow"),
		vars: "vars",
		key: "--cp-item-size",
		input: "range",
		min: 100,
		max: 1200,
		step: 10,
		coef: 0.0625,
		unit: "rem",
	},
	itemGap: {
		name: "itemGap",
		label: __("アイテム間隔", "catpow"),
		vars: "vars",
		key: "--cp-item-gap",
		input: "range",
		min: 0,
		max: 40,
		step: 1,
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
	rate: {
		name: "rate",
		type: "bottons",
		label: __("レート", "catpow"),
		values: {
			isRateDefault: __("デフォルト", "catpow"),
			isRatePrimary: __("優先", "catpow"),
			isRateSecondary: __("通常", "catpow"),
			isRateRecommended: __("推奨", "catpow"),
			isRateDeprecated: __("非推奨", "catpow"),
			isRateDanger: __("危険", "catpow"),
			isRateSafe: __("安全", "catpow"),
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
					step: 5,
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
					step: 5,
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
					step: 5,
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
					step: 5,
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
					step: 5,
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
					min: 70,
					max: 100,
					default: "95%",
					unit: "%",
				},
				{
					name: "contentMaxWidth",
					label: __("最大幅", "catpow"),
					input: "range",
					vars,
					key: "--cp-custom-content-max-width",
					min: 160,
					max: 1600,
					default: "60rem",
					step: 10,
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
