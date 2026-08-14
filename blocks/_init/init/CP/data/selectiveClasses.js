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
	backgroundImage({ preset, classKey, vars = "vars", ...otherParams }) {
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
	align: {
		name: "align",
		type: "buttons",
		label: __("横揃え", "catpow"),
		required: true,
		values: {
			isAlignLeft: __("左", "catpow"),
			isAlignCenter: __("中", "catpow"),
			isAlignRight: __("右", "catpow"),
		},
	},
	alignContent: {
		name: "alignContent",
		type: "buttons",
		label: __("コンテンツ揃え", "catpow"),
		values: {
			hasAlignContentStart: __("上", "catpow"),
			hasAlignContentCenter: __("中央", "catpow"),
			hasAlignContentSpaceBetween: __("両端", "catpow"),
			hasAlignContentEnd: __("下", "catpow"),
		},
	},
	textAlign: {
		name: "textAlign",
		type: "buttons",
		label: __("テキスト揃え", "catpow"),
		required: true,
		values: {
			hasTextAlignLeft: __("左揃え", "catpow"),
			hasTextAlignCenter: __("中央", "catpow"),
			hasTextAlignRight: __("右揃え", "catpow"),
		},
	},
	hasTextType({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasTextType",
			label: __("テキストタイプ", "catpow"),
			classKey,
			values: "hasTextType",
			sub: [{ preset: "textType", label: null }],
			...otherParams,
		};
	},
	textType: {
		name: "textType",
		type: "gridbuttons",
		label: __("テキストタイプ", "catpow"),
		required: true,
		values: {
			hasTextTypeHeading: __("見出し", "catpow"),
			hasTextTypeLead: __("リード", "catpow"),
			hasTextTypeParagraph: __("本文", "catpow"),
			hasTextTypeUi: __("UI", "catpow"),
			hasTextTypeCaption: __("注釈", "catpow"),
		},
	},
	verticalAlign: {
		name: "verticalAlign",
		type: "buttons",
		label: __("垂直方向揃え", "catpow"),
		required: true,
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
		required: true,
		values: {
			hasImageLeft: __("左", "catpow"),
			hasImageRight: __("右", "catpow"),
		},
	},
	hasButtons: {
		label: __("ボタン", "catpow"),
		values: "hasButtons",
		sub: ["buttonsOptions"],
	},
	buttonOptions: {
		sub: [{ name: "microcopy", label: __("マイクロコピー", "catpow"), values: "hasMicroCopy" }, "hasIcon", { name: "caption", label: __("キャプション", "catpow"), values: "hasCaption" }],
	},
	buttonParams: {
		sub: ["color", "uiType", "rank", "event"],
	},
	hasIcon: { label: __("アイコン", "catpow"), values: "hasIcon", sub: ["icon"] },
	icon: { input: "icon", label: __("アイコン", "catpow") },
	hasFontSize({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasFontSize",
			label: __("文字サイズ", "catpow"),
			values: "hasFontSize",
			classKey,
			sub: [{ preset: "fontSize", classKey, vars, label: null }],
			...otherParams,
		};
	},
	fontSize({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "fontSize",
			type: "buttons",
			label: __("文字サイズ", "catpow"),
			classKey,
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
	hasFontWeight({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasFontWeight",
			label: __("文字の太さ", "catpow"),
			classKey,
			values: "hasFontWeight",
			sub: [{ preset: "fontWeight", classKey, label: null }],
			...otherParams,
		};
	},
	fontWeight: {
		name: "fontWeight",
		type: "buttons",
		label: __("文字の太さ", "catpow"),
		values: {
			hasFontWeightLight: "L",
			hasFontWeightRegular: "R",
			hasFontWeightMedium: "M",
			hasFontWeightBold: "B",
			hasFontWeightHeavy: "H",
		},
	},
	hasFontFamily({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasFontFamily",
			label: __("フォント", "catpow"),
			classKey,
			values: "hasFontFamily",
			sub: [{ preset: "fontFamily", classKey, label: null }],
			...otherParams,
		};
	},
	fontFamily: {
		name: "fontFamily",
		type: "gridbuttons",
		label: __("フォント", "catpow"),
		values: {
			hasFontFamilyGothic: __("ゴシック", "catpow"),
			hasFontFamilyMincho: __("明朝", "catpow"),
			hasFontFamilyEnglish: __("英数", "catpow"),
			hasFontFamilyCode: __("コード", "catpow"),
			hasFontFamilyDecoration: __("装飾", "catpow"),
			hasFontFamilyScript: __("筆記", "catpow"),
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
	boxShadow: {
		name: "boxShadow",
		type: "buttons",
		label: __("影", "catpow"),
		values: {
			hasBoxShadowInset: __("内", "catpow"),
			hasBoxShadowOutset: __("外", "catpow"),
		},
		sub: {
			hasBoxShadowInset: [
				{
					name: "boxShadowInset",
					type: "buttons",
					values: {
						hasBoxShadowInsetSmall: __("小", "catpow"),
						hasBoxShadowInsetMedium: __("中", "catpow"),
						hasBoxShadowInsetLarge: __("大", "catpow"),
					},
				},
			],
			hasBoxShadowOutset: [
				{
					name: "boxShadowOutset",
					type: "buttons",
					values: {
						hasBoxShadowSmall: __("小", "catpow"),
						hasBoxShadowMedium: __("中", "catpow"),
						hasBoxShadowLarge: __("大", "catpow"),
					},
				},
			],
		},
	},
	hasTextShadow({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasTextShadow",
			label: __("文字影", "catpow"),
			classKey,
			values: "hasTextShadow",
			sub: [{ preset: "textShadow", vars, label: null }],
			...otherParams,
		};
	},
	textShadow({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "textShadow",
			type: "buttons",
			label: __("文字影", "catpow"),
			classKey,
			values: {
				hasTextShadowSmall: __("小", "catpow"),
				hasTextShadowMedium: __("中", "catpow"),
				hasTextShadowLarge: __("大", "catpow"),
			},
			...otherParams,
		};
	},
	hasBorder({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasBorder",
			label: __("枠線", "catpow"),
			classKey,
			values: "hasBorder",
			sub: [{ preset: "borderWidth", vars, label: null }],
			...otherParams,
		};
	},
	borderColor: {
		name: "borderColor",
		type: "buttons",
		label: __("線色", "catpow"),
		values: {
			hasBorderColorNone: __("なし", "catpow"),
			hasBorderColor: __("通常", "catpow"),
			hasBorderColorAlt: __("強調", "catpow"),
		},
	},
	borderWidth({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "borderWidth",
			type: "buttons",
			label: __("枠線", "catpow"),
			classKey,
			values: {
				hasBorderWidthThin: __("細", "catpow"),
				hasBorderWidthMedium: __("中", "catpow"),
				hasBorderWidthBold: __("太", "catpow"),
				hasBorderWidthCustom: ":admin-generic:",
			},
			sub: {
				hasBorderWidthCustom: [
					{
						name: "borderWidthCustom",
						label: __("枠線", "catpow"),
						input: "range",
						vars,
						key: "--cp-border-width-custom",
						min: 0,
						max: 4,
						default: ".2rem",
						step: 0.1,
						unit: "rem",
					},
				],
			},
			...otherParams,
		};
	},
	hasBorderRadius({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasBorderRadius",
			label: __("角丸", "catpow"),
			classKey,
			values: "hasBorderRadius",
			sub: [{ preset: "borderRadius", vars, label: null }],
			...otherParams,
		};
	},
	borderRadius({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "borderRadius",
			type: "buttons",
			label: __("角丸", "catpow"),
			classKey,
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
	hasBorderImage({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "hasBorderImage",
			label: __("ボーダー画像", "catpow"),
			values: "hasBorderImage",
			sub: [{ preset: "borderImage", vars, label: null }],
			...otherParams,
		};
	},
	borderImage({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "borderImage",
			input: "border",
			vars,
			key: "--cp-border-image",
			...otherParams,
		};
	},
	headingTag({ preset, name = "headingTag", label = __("見出しタグ", "catpow"), key = "HeadingTag", classKey, ...otherParams }) {
		return {
			name,
			input: "buttons",
			key,
			label: __(label, "catpow"),
			values: ["h1", "h2", "h3", "h4", "h5", "h6"],
			classKey,
			effect: (val, states, { attr, set }) => {
				const flags = CP.classNamesToFlags(attr[classKey]);
				for (const key in flags) {
					if (key.slice(0, 7) === "isLevel") {
						flags[key] = false;
					}
				}
				if (/^h\d$/.test(val)) {
					flags["isLevel" + val[1]] = true;
				}
				set({ [classKey]: CP.flagsToClassNames(flags) });
			},
			required: true,
			...otherParams,
		};
	},
	subHeadingTag({ preset, name = "headingTag", label = __("副見出しタグ", "catpow"), key = "SubHeadingTag", ...otherParams }) {
		return {
			name,
			input: "buttons",
			key,
			label: __(label, "catpow"),
			values: ["h1", "h2", "h3", "h4", "h5", "h6"],
			required: true,
			...otherParams,
		};
	},
	level: { name: "level", type: "buttons", label: __("レベル", "catpow"), values: { isLevel1: "1", isLevel2: "2", isLevel3: "3", isLevel4: "4", isLevel5: "5", isLevel6: "6" } },
	hasHeadingType({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasHeadingType",
			label: __("見出しタイプ", "catpow"),
			classKey,
			values: "hasBorderRadius",
			sub: [{ preset: "headingType", label: null }],
			...otherParams,
		};
	},
	headingType: {
		name: "headingType",
		type: "buttons",
		label: __("見出しタイプ", "catpow"),
		required: true,
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
	itemSize({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "itemSize",
			type: "buttons",
			label: __("アイテムサイズ", "catpow"),
			required: true,
			classKey,
			values: {
				hasItemSizeXSmall: __("極小", "catpow"),
				hasItemSizeSmall: __("小", "catpow"),
				hasItemSizeMedium: __("中", "catpow"),
				hasItemSizeLarge: __("大", "catpow"),
				hasItemSizeXLarge: __("極大", "catpow"),
				hasItemSizeCustom: ":admin-generic:",
			},
			sub: {
				hasItemSizeCustom: [
					{
						name: "itemSize",
						label: __("アイテムサイズ", "catpow"),
						vars: "vars",
						key: "--cp-size-i-custom",
						input: "responsiveItemSize",
					},
				],
			},
			...otherParams,
		};
	},
	itemAlign: {
		name: "itemAlign",
		type: "buttons",
		label: __("アイテム位置", "catpow"),
		values: {
			hasItemAlignLeft: __("左", "catpow"),
			hasItemAlignRight: __("右", "catpow"),
		},
	},
	hasItemGap({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasItemGap",
			label: __("アイテム間隔", "catpow"),
			classKey,
			values: "hasItemGap",
			sub: [
				{ preset: "itemGapBlock", vars },
				{ preset: "itemGapInline", vars },
			],
			...otherParams,
		};
	},
	itemGapBlock({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "itemGapBlock",
			type: "buttons",
			label: __("縦間隔", "catpow"),
			values: {
				hasItemGapBlockXLarge: __("極大", "catpow"),
				hasItemGapBlockLarge: __("大", "catpow"),
				hasItemGapBlockMedium: __("中", "catpow"),
				hasItemGapBlockSmall: __("小", "catpow"),
				hasItemGapBlockXSmall: __("極小", "catpow"),
				hasItemGapBlockCustom: ":admin-generic:",
			},
			sub: {
				hasItemGapBlockCustom: [
					{
						name: "itemGapBlockCustom",
						input: "range",
						vars,
						key: "--cp-item-gap-block-custom",
						min: 0,
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
	itemGapInline({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "itemGapInline",
			type: "buttons",
			label: __("横間隔", "catpow"),
			classKey,
			values: {
				hasItemGapInlineXLarge: __("極大", "catpow"),
				hasItemGapInlineLarge: __("大", "catpow"),
				hasItemGapInlineMedium: __("中", "catpow"),
				hasItemGapInlineSmall: __("小", "catpow"),
				hasItemGapInlineXSmall: __("極小", "catpow"),
				hasItemGapInlineCustom: ":admin-generic:",
			},
			sub: {
				hasItemGapInlineCustom: [
					{
						name: "itemGapInlineCustom",
						input: "range",
						vars,
						key: "--cp-item-gap-inline-custom",
						min: 0,
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
	cond: {
		name: "cond",
		input: "cond",
		label: __("表示条件", "catpow"),
	},
	event: {
		name: "event",
		input: "event",
		label: __("イベント", "catpow"),
	},
	color: {
		name: "color",
		input: "color",
		label: __("色", "catpow"),
	},
	colorScheme: {
		name: "colorScheme",
		type: "buttons",
		label: __("配色", "catpow"),
		values: {
			hasColorSchemeReverted: __("通常", "catpow"),
			hasColorSchemeInverted: __("反転", "catpow"),
		},
	},
	uiType: {
		name: "uiType",
		type: "gridbuttons",
		label: __("UIタイプ", "catpow"),
		values: {
			isUiTypeSolid: __("ソリッド", "catpow"),
			isUiTypeLinear: __("リニア", "catpow"),
			isUiTypeText: __("テキスト", "catpow"),
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
	clipPath({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "clipPath",
			label: __("クリップ", "catpow"),
			values: "hasClipPath",
			classKey,
			sub: [
				{
					name: "shape",
					label: __("形状", "catpow"),
					type: "buttons",
					required: true,
					classKey,
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
								required: true,
								classKey,
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
								required: true,
								classKey,
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperLeft: __("左", "catpow"),
									hasClipShapeUpperRight: __("右", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								required: true,
								classKey,
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
								required: true,
								classKey,
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperIn: __("内", "catpow"),
									hasClipShapeUpperOut: __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								required: true,
								classKey,
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
								required: true,
								classKey,
								values: {
									hasClipShapeUpperNone: __("なし", "catpow"),
									hasClipShapeUpperIn: __("内", "catpow"),
									hasClipShapeUpperOut: __("外", "catpow"),
								},
							},
							{
								name: "below",
								type: "buttons",
								required: true,
								classKey,
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
	hasSpacingType({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasSpacingType",
			label: __("間隔・余白タイプ", "catpow"),
			type: "buttons",
			values: { hasSpacingTypeBlock: __("ブロック", "catpow"), hasSpacingTypeFrame: __("フレーム", "catpow"), hasSpacingTypeCustom: __("カスタム", "catpow") },
			classKey,
			sub: { hasSpacingTypeCustom: ["hasMargin", "hasPadding"] },
			...otherParams,
		};
	},
	hasMarginType({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasMarginType",
			label: __("間隔タイプ", "catpow"),
			type: "buttons",
			values: { hasMarginTypeBlock: __("ブロック", "catpow"), hasMarginTypeFrame: __("フレーム", "catpow"), hasMarginTypeCustom: __("カスタム", "catpow") },
			classKey,
			sub: { hasMarginTypeCustom: ["hasMargin"] },
			...otherParams,
		};
	},
	hasPadding({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasPadding",
			label: __("パディング", "catpow"),
			values: "hasPadding",
			classKey,
			sub: [
				{ preset: "paddingTop", classKey, vars },
				{ preset: "paddingInline", classKey, vars },
				{ preset: "paddingBottom", classKey, vars },
			],
			...otherParams,
		};
	},
	paddingTop({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "paddingTop",
			type: "buttons",
			label: __("上パディング", "catpow"),
			classKey,
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
						classKey,
						vars,
						key: "--cp-padding-top-custom",
						min: 0,
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
	paddingInline({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "paddingInline",
			type: "buttons",
			label: __("横パディング", "catpow"),
			classKey,
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
						classKey,
						vars,
						key: "--cp-padding-inline-custom",
						min: 0,
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
	paddingBottom({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "paddingBottom",
			type: "buttons",
			label: __("下パディング", "catpow"),
			classKey,
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
						classKey,
						vars,
						key: "--cp-padding-bottom-custom",
						min: 0,
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
	customPadding({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "customPadding",
			label: __("余白", "catpow"),
			values: "hasCustomPadding",
			sub: [
				{
					name: "paddingTop",
					label: __("上余白", "catpow"),
					input: "range",
					classKey,
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
					classKey,
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
					classKey,
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
	hasMargin({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasMargin",
			label: __("マージン", "catpow"),
			values: "hasMargin",
			classKey,
			sub: [
				{ preset: "marginTop", classKey, vars },
				{ preset: "marginBottom", classKey, vars },
			],
			...otherParams,
		};
	},
	marginTop({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "margin",
			type: "buttons",
			label: __("上マージン", "catpow"),
			classKey,
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
						classKey,
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
	marginBottom({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "margin",
			type: "buttons",
			label: __("下マージン", "catpow"),
			classKey,
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
						classKey,
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
	customMargin({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "customMargin",
			label: __("間隔", "catpow"),
			values: "hasCustomMargin",
			classKey,
			sub: [
				{
					name: "marginTop",
					label: __("上間隔", "catpow"),
					input: "range",
					classKey,
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
					classKey,
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
	hasContentWidth({ preset, classKey, vars = "vars", ...otherParams }) {
		return {
			name: "hasContentWidth",
			label: __("コンテンツ幅", "catpow"),
			values: "hasContentWidth",
			classKey,
			sub: [{ preset: "contentWidth", classKey, vars, label: null }],
			...otherParams,
		};
	},
	contentWidth({ preset, vars = "vars", ...otherParams }) {
		return {
			name: "contentWidth",
			type: "gridbuttons",
			label: __("コンテンツ幅", "catpow"),
			values: {
				hasContentWidthFit: __("適", "catpow"),
				hasContentWidthXSmall: __("極小", "catpow"),
				hasContentWidthSmall: __("小", "catpow"),
				hasContentWidthMedium: __("中", "catpow"),
				hasContentWidthLarge: __("大", "catpow"),
				hasContentWidthXLarge: __("極大", "catpow"),
				hasContentWidthFull: __("全", "catpow"),
				hasContentWidthCustom: ":admin-generic:",
			},
			sub: {
				hasContentWidthCustom: [
					{
						name: "contentWidth",
						label: __("幅", "catpow"),
						input: "responsiveSize",
						vars,
						key: "--cp-size-c-custom",
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
