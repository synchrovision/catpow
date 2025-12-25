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
	imagePosition: {
		name: "imagePosition",
		type: "buttons",
		label: __("画像位置", "catpow"),
		values: {
			hasImageLeft: __("左", "catpow"),
			hasImageRight: __("右", "catpow"),
		},
	},
	fontSize({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "fontSize",
			type: "buttons",
			label: __("文字サイズ", "catpow"),
			values: {
				hasFontSizeXLarge: __("極大", "catpow"),
				hasFontSizeLarge: __("大", "catpow"),
				hasFontSizeMedium: __("中", "catpow"),
				hasFontSizeSmall: __("小", "catpow"),
				hasFontSizeXSmall: __("極小", "catpow"),
				hasFontSizeCustom: ":admin-generic:",
			},
			sub: {
				hasFontSizeCustom: [
					{
						name: "fontSize",
						label: __("文字サイズ", "catpow"),
						input: "range",
						vars,
						key: "--cp-font-size-custom",
						min: 10,
						max: 160,
						default: "1rem",
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
		};
	},
	fontWeight: {
		name: "fontWeight",
		type: "buttons",
		label: __("文字ウェイト", "catpow"),
		values: {
			hasFontWeightLight: "L",
			hasFontWeightRegular: "R",
			hasFontWeightMedium: "M",
			hasFontWeightBold: "B",
			hasFontWeightHeavy: "H",
		},
	},
	safeFontFamily: {
		name: "safeFontFamily",
		type: "buttons",
		label: __("フォント", "catpow"),
		values: {
			hasFontSafeSerif: __("セリフ", "catpow"),
			hasFontSafeSansSerif: __("サンセリフ", "catpow"),
			hasFontSafeMonoSpaced: __("等幅", "catpow"),
			hasFontSafeGothic: __("ゴシック", "catpow"),
			hasFontSafeMincho: __("明朝", "catpow"),
		},
	},
	safeFontWeight: {
		name: "safeFontWeight",
		type: "buttons",
		label: __("太字", "catpow"),
		values: "hasFontWeightSafeBold",
	},
	hasBoxShadow({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasBoxShadow",
			label: __("影", "catpow"),
			values: "hasBoxShadow",
			sub: [
				{ label: __("内側", "catpow"), values: "hasBoxShadowInset" },
				{ preset: "boxShadow", vars, label: null },
			],
			...otherParams,
		};
	},
	boxShadow(preset, vars = "vars", ...otherParams) {
		return {
			name: "boxShadow",
			type: "buttons",
			label: __("影", "catpow"),
			values: {
				hasBoxShadowSmall: __("小", "catpow"),
				hasBoxShadowMedium: __("中", "catpow"),
				hasBoxShadowLarge: __("大", "catpow"),
				hasBoxShadowCustom: ":admin-generic:",
			},
			sub: {
				hasBoxShadowCustom: [
					{
						name: "boxShadow",
						input: "text",
						vars,
						key: "--cp-box-shadow-custom",
					},
				],
			},
			...otherParams,
		};
	},
	hasTextShadow({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasTextShadow",
			label: __("文字影", "catpow"),
			values: "hasTextShadow",
			sub: [{ preset: "textShadow", vars, label: null }],
			...otherParams,
		};
	},
	textShadow(preset, vars = "vars", ...otherParams) {
		return {
			name: "textShadow",
			type: "buttons",
			label: __("文字影", "catpow"),
			values: {
				hasTextShadowSmall: __("小", "catpow"),
				hasTextShadowMedium: __("中", "catpow"),
				hasTextShadowLarge: __("大", "catpow"),
				hasTextShadowCustom: ":admin-generic:",
			},
			sub: {
				hasTextShadowCustom: [
					{
						name: "textShadow",
						input: "text",
						vars,
						key: "--cp-text-shadow-custom",
					},
				],
			},
			...otherParams,
		};
	},
	hasBorderRadius({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasBorderRadius",
			label: __("角丸", "catpow"),
			values: "hasBorderRadius",
			sub: [{ preset: "borderRadius", vars, label: null }],
			...otherParams,
		};
	},
	borderRadius(preset, vars = "vars", ...otherParams) {
		return {
			name: "borderRadius",
			type: "buttons",
			label: __("角丸", "catpow"),
			values: {
				hasBorderRadiusSmall: __("小", "catpow"),
				hasBorderRadiusMedium: __("中", "catpow"),
				hasBorderRadiusLarge: __("大", "catpow"),
				hasBorderRadiusCustom: ":admin-generic:",
			},
			sub: {
				hasBorderRadiusCustom: [
					{
						name: "borderRadius",
						label: __("角丸", "catpow"),
						input: "range",
						vars,
						key: "--cp-border-radius-custom",
						min: 0,
						max: 5,
						default: "1em",
						step: 0.25,
						unit: "em",
					},
				],
			},
			...otherParams,
		};
	},
	headingType: {
		name: "headingType",
		type: "buttons",
		label: __("見出しタイプ", "catpow"),
		values: {
			hasHeadingTypeHeader: __("ヘッダー", "catpow"),
			hasHeadingTypeHeadline: __("ヘッドライン", "catpow"),
			hasHeadingTypeCatch: __("キャッチ", "catpow"),
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
			hasWidthCompact: __("コンパクト", "catpow"),
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
	itemSize(preset, vars = "vars", ...otherParams) {
		return {
			name: "itemSize",
			type: "buttons",
			label: __("アイテムサイズ", "catpow"),
			values: {
				hasItemSizeSmall: __("小", "catpow"),
				hasItemSizeMedium: __("中", "catpow"),
				hasItemSizeLarge: __("大", "catpow"),
				hasItemSizeCustom: ":admin-generic:",
			},
			sub: {
				hasItemSizeCustom: [
					{
						name: "itemSize",
						label: __("アイテムサイズ", "catpow"),
						vars: "vars",
						key: "--cp-item-size-custom",
						input: "range",
						min: 100,
						max: 1200,
						step: 10,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
		};
	},
	itemGap(preset, vars = "vars", ...otherParams) {
		return {
			name: "itemGap",
			type: "buttons",
			label: __("アイテム間隔", "catpow"),
			values: {
				hasItemGapSmall: __("小", "catpow"),
				hasItemGapMedium: __("中", "catpow"),
				hasItemGapLarge: __("大", "catpow"),
				hasItemGapCustom: ":admin-generic:",
			},
			sub: {
				hasItemGapCustom: [
					{
						name: "itemSize",
						label: __("アイテム間隔", "catpow"),
						vars: "vars",
						key: "--cp-item-gap-custom",
						input: "range",
						min: 0,
						max: 200,
						step: 4,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
		};
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
	rank: {
		name: "rank",
		type: "gridbuttons",
		label: __("ランク", "catpow"),
		values: {
			isRankPrimary: __("優先", "catpow"),
			isRankSecondary: __("標準", "catpow"),
			isRankTertiary: __("副次", "catpow"),
		},
	},
	rate: {
		name: "rate",
		type: "gridbuttons",
		label: __("レート", "catpow"),
		values: {
			isRateRecommended: __("推奨", "catpow"),
			isRateDefault: __("標準", "catpow"),
			isRateDeprecated: __("非推奨", "catpow"),
			isRateSafe: __("安全", "catpow"),
			isRateWarn: __("注意", "catpow"),
			isRateDanger: __("危険", "catpow"),
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
	hasPadding({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasPadding",
			label: __("パディング", "catpow"),
			values: "hasPadding",
			sub: [
				{ preset: "paddingTop", vars },
				{ preset: "paddingInline", vars },
				{ preset: "paddingBottom", vars },
			],
			...otherParams,
		};
	},
	paddingTop({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "paddingTop",
			type: "buttons",
			label: __("上パディング", "catpow"),
			values: {
				hasPaddingTopXLarge: __("極大", "catpow"),
				hasPaddingTopLarge: __("大", "catpow"),
				hasPaddingTopMedium: __("中", "catpow"),
				hasPaddingTopSmall: __("小", "catpow"),
				hasPaddingTopXSmall: __("極小", "catpow"),
				hasPaddingTopCustom: ":admin-generic:",
			},
			sub: {
				hasPaddingTopCustom: [
					{
						name: "paddingTopCustom",
						input: "range",
						vars,
						key: "--cp-padding-top-custom",
						min: -400,
						max: 400,
						step: 5,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
			...otherParams,
		};
	},
	paddingInline({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "paddingInline",
			type: "buttons",
			label: __("横パディング", "catpow"),
			values: {
				hasPaddingInlineXLarge: __("極大", "catpow"),
				hasPaddingInlineLarge: __("大", "catpow"),
				hasPaddingInlineMedium: __("中", "catpow"),
				hasPaddingInlineSmall: __("小", "catpow"),
				hasPaddingInlineXSmall: __("極小", "catpow"),
				hasPaddingInlineCustom: ":admin-generic:",
			},
			sub: {
				hasPaddingInlineCustom: [
					{
						name: "paddingInlineCustom",
						input: "range",
						vars,
						key: "--cp-padding-inline-custom",
						min: -400,
						max: 400,
						step: 5,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
			...otherParams,
		};
	},
	paddingBottom({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "paddingBottom",
			type: "buttons",
			label: __("下パディング", "catpow"),
			values: {
				hasPaddingBottomXLarge: __("極大", "catpow"),
				hasPaddingBottomLarge: __("大", "catpow"),
				hasPaddingBottomMedium: __("中", "catpow"),
				hasPaddingBottomSmall: __("小", "catpow"),
				hasPaddingBottomXSmall: __("極小", "catpow"),
				hasPaddingBottomCustom: ":admin-generic:",
			},
			sub: {
				hasPaddingBottomCustom: [
					{
						name: "paddingBottomCustom",
						input: "range",
						vars,
						key: "--cp-padding-bottom-custom",
						min: -400,
						max: 400,
						step: 5,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
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
	hasMargin({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasMargin",
			label: __("マージン", "catpow"),
			values: "hasMargin",
			sub: [
				{ preset: "marginTop", vars },
				{ preset: "marginBottom", vars },
			],
			...otherParams,
		};
	},
	marginTop({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "margin",
			type: "buttons",
			label: __("上マージン", "catpow"),
			values: {
				hasMarginTopXLarge: __("極大", "catpow"),
				hasMarginTopLarge: __("大", "catpow"),
				hasMarginTopMedium: __("中", "catpow"),
				hasMarginTopSmall: __("小", "catpow"),
				hasMarginTopXSmall: __("極小", "catpow"),
				hasMarginTopCustom: ":admin-generic:",
			},
			sub: {
				hasMarginTopCustom: [
					{
						name: "marginTop",
						input: "range",
						vars,
						key: "--cp-margin-top-custom",
						min: -400,
						max: 400,
						step: 5,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
			...otherParams,
		};
	},
	marginBottom({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "margin",
			type: "buttons",
			label: __("下マージン", "catpow"),
			values: {
				hasMarginBottomXLarge: __("極大", "catpow"),
				hasMarginBottomLarge: __("大", "catpow"),
				hasMarginBottomMedium: __("中", "catpow"),
				hasMarginBottomSmall: __("小", "catpow"),
				hasMarginBottomXSmall: __("極小", "catpow"),
				hasMarginBottomCustom: ":admin-generic:",
			},
			sub: {
				hasMarginBottomCustom: [
					{
						name: "marginBottom",
						input: "range",
						vars,
						key: "--cp-margin-bottom-custom",
						min: -400,
						max: 400,
						step: 5,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
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
	hasContentWidth({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasContentWidth",
			label: __("コンテンツ幅", "catpow"),
			values: "hasContentWidth",
			sub: [{ preset: "contentWidth", vars, label: null }],
			...otherParams,
		};
	},
	contentWidth({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "contentWidth",
			type: "buttons",
			label: __("コンテンツ幅", "catpow"),
			values: {
				hasContentWidthFit: __("適", "catpow"),
				hasContentWidthNarrow: __("狭", "catpow"),
				hasContentWidthCompact: __("縮", "catpow"),
				hasContentWidthRegular: __("中", "catpow"),
				hasContentWidthWide: __("広", "catpow"),
				hasContentWidthFull: __("全", "catpow"),
				hasContentWidthCustom: ":admin-generic:",
			},
			sub: {
				hasContentWidthCustom: [
					{
						name: "contentWidth",
						label: __("幅", "catpow"),
						input: "range",
						vars,
						key: "--cp-content-width-custom",
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
						key: "--cp-content-max-width-custom",
						min: 160,
						max: 1600,
						default: "60rem",
						step: 10,
						coef: 0.0625,
						unit: "rem",
					},
				],
			},
			...otherParams,
		};
	},
};
wp.domReady(() => {
	wp.hooks.applyFilters("catpow.blocks.selectiveClassesPresets", CP.finderProxy(selectiveClassesPresets));
});
