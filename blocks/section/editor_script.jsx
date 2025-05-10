const { __ } = wp.i18n;

CP.config.section = {
	devices: ["sp", "tb"],
	imageKeys: {
		navIcon: { src: "navIcon" },
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
		titleImage: { mime: "titleImageMime", src: "titleImageSrc", alt: "titleImageAlt", srcset: "titleImageSrcset", sources: "titleImageSources" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
		headerBackgroundImage: {
			mime: "headerBackgroundImageMime",
			src: "headerBackgroundImageSrc",
			alt: "headerBackgroundImageAlt",
			srcset: "headerBackgroundImageSrcset",
			sources: "headerBackgroundImageSources",
		},
		backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" },
		decoration: { pictures: "decoration" },
	},
	imageSizes: {
		image: "medium",
		headerImage: "medium_large",
	},
};
wp.blocks.registerBlockType("catpow/section", {
	example: CP.example,
	edit(props) {
		const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl, TextControl } = wp.components;
		const { attributes, className, setAttributes } = props;
		const { useMemo, useState } = wp.element;
		const {
			SectionTag,
			HeadingTag,
			color,
			anchor,
			classes,
			prefix,
			title,
			lead,
			headerImageMime,
			headerImageSrc,
			headerImageSrcset,
			headerImageAlt,
			headerImageCode,
			headerBackgroundImageCode,
			imageMime,
			imageSrc,
			imageSrcset,
			imageAlt,
			imageCode,
			backgroundImageSrc,
			backgroundImageCode,
			headerPatternImageCss,
			patternImageCss,
			frameImageCss,
			borderImageCss,
			iconSrc,
			iconAlt,
			vars,
		} = attributes;

		const states = CP.wordsToFlags(classes);
		const { devices, imageKeys, imageSizes } = CP.config.section;
		const [mainBlock, setMainBlock] = useState();

		CP.inheritColor(props, ["iconSrc", "patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);
		CP.manageStyleData(props, ["patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys, imageSizes } = CP.config.section;
			const selectiveClasses = [
				{ name: "sectionTag", input: "buttons", key: "SectionTag", label: __("セクションタグ", "catpow"), values: ["article", "section", "aside", "div"] },
				{
					name: "headingTag",
					input: "buttons",
					key: "HeadingTag",
					label: __("見出しタグ", "catpow"),
					values: ["h1", "h2", "h3", "h4"],
					effect: (val, states, { set }) => {
						for (const key in states) {
							if (key.slice(0, 5) === "level") {
								states[key] = false;
							}
						}
						if (/^h\d$/.test(val)) {
							states["level" + val[1]] = true;
						}
						set({ classes: CP.flagsToWords(states) });
					},
				},
				{
					name: "type",
					label: __("タイプ", "catpow"),
					type: "gridbuttons",
					values: ["scene", "article", "column"],
					sub: {
						scene: [
							"color",
							{ name: "prefix", label: __("プレフィクス", "catpow"), values: "hasPrefix" },
							{ name: "titleImage", label: __("タイトル画像", "catpow"), values: "hasTitleImage", sub: [{ input: "picture", keys: imageKeys.titleImage, devices }] },
							{ name: "headerImage", label: __("ヘッダ画像", "catpow"), values: "hasHeaderImage", sub: [{ input: "image", keys: imageKeys.headerImage, size: imageSizes.headerImage }] },
							{
								name: "headerBackgroundImage",
								label: __("ヘッダ背景画像", "catpow"),
								values: "hasHeaderBackgroundImage",
								sub: [
									{ input: "picture", label: __("背景画像", "catpow"), keys: imageKeys.headerBackgroundImage, devices },
									{ label: __("薄く", "catpow"), values: "paleHeaderBG" },
								],
							},
							{
								name: "inverseText",
								label: __("抜き色文字", "catpow"),
								values: "inverseText",
								sub: [
									{
										label: __("ヘッダ背景色", "catpow"),
										values: "hasHeaderBackgroundColor",
										sub: [
											{
												label: __("パターン画像", "catpow"),
												values: "hasHeaderPatternImage",
												sub: [{ input: "pattern", css: "headerPatternImageCss", sel: ({ attr }) => "#" + attr.anchor + " > .contents > .header" }],
											},
										],
									},
								],
							},
							{ name: "lead", label: __("リード", "catpow"), values: "hasLead" },
							{
								name: "backgroundImage",
								label: __("背景画像", "catpow"),
								values: "hasBackgroundImage",
								sub: [
									{ input: "picture", label: __("背景画像", "catpow"), keys: imageKeys.backgroundImage, devices },
									{ name: "paleBG", label: __("薄く", "catpow"), values: "paleBG" },
								],
							},
							"backgroundPattern",
							{ name: "backgroundColor", label: __("背景色", "catpow"), values: "hasBackgroundColor" },
							"textColor",
							{
								name: "navIcon",
								label: __("メニューアイコン", "catpow"),
								values: "hasNavIcon",
								sub: [{ input: "image", label: __("アイコン", "catpow"), keys: imageKeys.navIcon, size: "thumbnail" }],
							},
							{ name: "decoration", label: __("デコレーション", "catpow"), values: "hasDecoration" },
							"clipPath",
							"customPadding",
							"customMargin",
							{
								name: "template",
								label: __("テンプレート", "catpow"),
								values: "isTemplate",
								sub: [
									{
										name: "headerImageCode",
										input: "text",
										label: __("ヘッダ画像コード", "catpow"),
										key: "headerImageCode",
										cond: "hasHeaderImage",
									},
									{
										name: "headerBackgroundImageCode",
										input: "text",
										label: __("ヘッダ背景画像コード", "catpow"),
										key: "headerBackgroundImageCode",
										cond: "hasHeaderBackgroundImage",
									},
									{
										name: "backgroundImageCode",
										input: "text",
										label: __("背景画像コード", "catpow"),
										key: "backgroundImageCode",
										cond: "hasBackgroundImage",
									},
								],
							},
						],
						article: [
							"color",
							{ name: "level", type: "buttons", label: __("レベル", "catpow"), values: { level1: "1", level2: "2", level3: "3", level4: "4" } },
							{ name: "headingType", type: "gridbuttons", label: __("見出しタイプ", "catpow"), filter: "heading_type", values: ["header", "headline", "catch"] },
							{
								name: "headerImage",
								label: __("ヘッダ画像", "catpow"),
								values: "hasHeaderImage",
								sub: [
									{
										input: "image",
										keys: imageKeys.headerImage,
										size: imageSizes.headerImage,
										cond: (states, { attr }) => !states.isTemplate || !attr.headerImageCode,
									},
								],
							},
							{ name: "lead", label: __("リード", "catpow"), values: "hasLead" },
							{
								name: "backgroundImage",
								label: __("背景画像", "catpow"),
								values: "hasBackgroundImage",
								sub: [
									{ input: "picture", keys: imageKeys.backgroundImage, devices, cond: (states, { attr }) => !states.isTemplate || !attr.backgroundImageCode },
									{ label: __("薄く", "catpow"), values: "paleBG" },
								],
							},
							"backgroundPattern",
							{ name: "backgroundColor", label: __("背景色", "catpow"), values: "hasBackgroundColor" },
							"textColor",
							{
								name: "navIcon",
								label: __("メニューアイコン", "catpow"),
								values: "hasNavIcon",
								sub: [{ input: "image", label: __("アイコン", "catpow"), keys: imageKeys.navIcon, size: "thumbnail" }],
							},
							{
								name: "patternImage",
								label: __("パターン画像", "catpow"),
								values: "hasPatternImage",
								sub: [{ input: "pattern", css: "patternImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }],
							},
							{ name: "frameImage", label: __("フレーム画像", "catpow"), values: "hasFrameImage", sub: [{ input: "frame", css: "frameImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }] },
							{
								name: "borderImage",
								label: __("ボーダー画像", "catpow"),
								values: "hasBorderImage",
								sub: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }],
							},
							{ name: "decoration", label: __("デコレーション", "catpow"), values: "hasDecoration" },
							"clipPath",
							"customPadding",
							"customMargin",
							{
								name: "template",
								label: __("テンプレート", "catpow"),
								values: "isTemplate",
								sub: [
									{
										input: "text",
										label: __("ヘッダ画像コード", "catpow"),
										key: "headerImageCode",
										cond: "hasHeaderImage",
									},
									{
										input: "text",
										label: __("背景画像コード", "catpow"),
										key: "backgroundImageCode",
										cond: "hasBackgroundImage",
									},
								],
							},
						],
						column: [
							"color",
							"pattern",
							{ name: "icon", label: __("アイコン", "catpow"), values: "hasIcon", sub: [{ input: "icon", color }] },
							{ name: "image", label: __("画像", "catpow"), values: "hasImage", sub: [{ input: "image", keys: imageKeys.image }] },
							{ name: "backgroundColor", label: __("背景色", "catpow"), values: "hasBackgroundColor" },
							"textColor",
							{
								name: "backgroundImage",
								label: __("背景画像", "catpow"),
								values: "hasBackgroundImage",
								sub: [
									{ input: "picture", keys: imageKeys.backgroundImage, devices, cond: (states, { attr }) => !states.isTemplate || !attr.backgroundImageCode },
									{ label: __("薄く", "catpow"), values: "paleBG" },
								],
							},
							"backgroundPattern",
							{ name: "border", label: __("線", "catpow"), values: { no_border: __("なし", "catpow"), thin_border: __("細", "catpow"), bold_border: __("太", "catpow") } },
							{ name: "round", label: __("角丸", "catpow"), values: "round" },
							{ name: "shadow", label: __("影", "catpow"), values: "shadow", sub: [{ label: __("内側", "catpow"), values: "inset" }] },
							{
								name: "navIcon",
								label: __("メニューアイコン", "catpow"),
								values: "hasNavIcon",
								sub: [{ input: "image", label: __("アイコン", "catpow"), keys: imageKeys.navIcon, size: "thumbnail" }],
							},
							{
								name: "borderImage",
								label: __("ボーダー画像", "catpow"),
								values: "hasBorderImage",
								sub: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }],
							},
							{ name: "decoration", label: __("デコレーション", "catpow"), values: "hasDecoration" },
							{
								name: "template",
								label: __("テンプレート", "catpow"),
								values: "isTemplate",
								sub: [
									{
										input: "text",
										label: __("画像コード", "catpow"),
										key: "imageCode",
										cond: "hasImage",
									},
									{
										input: "text",
										label: __("背景画像コード", "catpow"),
										key: "backgroundImageCode",
										cond: "hasBackgroundImage",
									},
								],
							},
						],
					},
					bind: {
						scene: ["level2"],
						column: ["level3"],
					},
				},
			];
			wp.hooks.applyFilters("catpow.blocks.section.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		var level = CP.getNumberClass({ attr: attributes }, "level");

		return (
			<>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
				<SectionTag id={anchor} className={classes} ref={setMainBlock} style={vars}>
					{states.hasImage && (
						<div className="image">
							{states.isTemplate && imageCode ? (
								<CP.DummyImage text={imageCode} />
							) : (
								<CP.SelectResponsiveImage className="image" attr={attributes} set={setAttributes} keys={imageKeys.image} size={imageSizes.image} />
							)}
						</div>
					)}
					<div className="contents">
						{states.hasDecoration && <CP.PlacedPictures.Edit className="decoration" set={setAttributes} attr={attributes} devices={devices} keys={imageKeys.decoration} />}
						<header className="header">
							<div className="title">
								{states.hasIcon && <CP.OutputIcon item={attributes} />}
								{states.hasPrefix && (
									<div className="prefix">
										<RichText tagName="div" value={prefix} onChange={(prefix) => setAttributes({ prefix })} />
									</div>
								)}
								{states.hasHeaderImage && (
									<div className="image">
										{states.isTemplate && headerImageCode ? (
											<CP.DummyImage text={headerImageCode} />
										) : (
											<CP.SelectResponsiveImage className="image" set={setAttributes} attr={attributes} keys={imageKeys.headerImage} size={imageSizes.headerImage} />
										)}
									</div>
								)}
								{states.hasTitleImage ? (
									<HeadingTag className="titleImage">
										{states.isTemplate && titleImageCode ? (
											<CP.DummyImage text={titleImageCode} />
										) : (
											<CP.SelectResponsiveImage className="image" set={setAttributes} attr={attributes} keys={imageKeys.titleImage} devices={devices} />
										)}
									</HeadingTag>
								) : (
									<RichText tagName={HeadingTag} className="heading" value={title} onChange={(title) => setAttributes({ title })} />
								)}
								{states.hasLead && <RichText tagName="div" className="lead" value={lead} onChange={(lead) => setAttributes({ lead })} />}
							</div>

							{states.hasHeaderBackgroundImage && (
								<div className="background">
									{states.isTemplate && headerBackgroundImageCode ? (
										<CP.DummyImage text={headerBackgroundImageCode} />
									) : (
										<CP.SelectResponsiveImage className="image" set={setAttributes} attr={attributes} keys={imageKeys.headerBackgroundImage} />
									)}
								</div>
							)}
						</header>
						<div className="text">
							<InnerBlocks />
						</div>
					</div>
					{states.hasBackgroundImage && (
						<div className="background">
							{states.isTemplate && backgroundImageCode ? (
								<CP.DummyImage text={backgroundImageCode} />
							) : (
								<CP.SelectResponsiveImage className="image" set={setAttributes} attr={attributes} keys={imageKeys.backgroundImage} />
							)}
						</div>
					)}
					{states.hasPatternImage && <style>{patternImageCss}</style>}
					{states.hasHeaderPatternImage && <style>{headerPatternImageCss}</style>}
					{states.hasBorderImage && <style>{borderImageCss}</style>}
					{states.hasFrameImage && <style>{frameImageCss}</style>}
				</SectionTag>
				<InspectorControls>
					<CP.ColorVarTracer target={mainBlock}>
						<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
						<PanelBody title="ID" icon="admin-links" initialOpen={false}>
							<TextControl
								label="ID"
								onChange={(anchor) => {
									setAttributes({ anchor });
								}}
								value={anchor}
							/>
						</PanelBody>
						<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
							<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
						</PanelBody>
					</CP.ColorVarTracer>
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const {
			SectionTag,
			HeadingTag,
			anchor,
			navIcon,
			classes,
			prefix,
			title,
			lead,
			headerImageSrc,
			headerImageSrcset,
			headerImageAlt,
			headerImageCode,
			headerBackgroundImageCode,
			imageSrc,
			imageSrcset,
			imageAlt,
			imageCode,
			backgroundImageSrc,
			backgroundImageCode,
			headerPatternImageCss,
			patternImageCss,
			frameImageCss,
			borderImageCss,
			iconSrc,
			iconAlt,
			vars,
		} = attributes;

		var level = CP.getNumberClass({ attr: attributes }, "level");

		const states = CP.wordsToFlags(classes);
		const { devices, imageKeys, imageSizes } = CP.config.section;

		return (
			<SectionTag id={anchor} className={classes} data-icon={navIcon} style={vars}>
				{states.hasImage && (
					<div className="image">{states.isTemplate && imageCode ? imageCode : <CP.ResponsiveImage className="image" attr={attributes} keys={imageKeys.image} size="medium_large" />}</div>
				)}
				<div className="contents">
					{states.hasDecoration && <CP.PlacedPictures className="decoration" attr={attributes} keys={imageKeys.decoration} />}
					<header className="header">
						<div className="title">
							{states.hasIcon && <CP.OutputIcon item={attributes} />}
							{states.hasPrefix && (
								<div className="prefix">
									<RichText.Content value={prefix} />
								</div>
							)}
							{states.hasHeaderImage && (
								<div className="image">{states.isTemplate && headerImageCode ? headerImageCode : <CP.ResponsiveImage className="image" attr={attributes} keys={imageKeys.headerImage} />}</div>
							)}
							{states.hasTitleImage ? (
								<HeadingTag className="titleImage">
									{states.isTemplate && titleImageCode ? titleImageCode : <CP.ResponsiveImage className="image" attr={attributes} keys={imageKeys.titleImage} devices={devices} />}
								</HeadingTag>
							) : (
								<HeadingTag className="heading">
									<RichText.Content value={title} />
								</HeadingTag>
							)}
							{states.hasLead && (
								<div className="lead">
									<RichText.Content value={lead} />
								</div>
							)}
						</div>
						{states.hasHeaderBackgroundImage && (
							<div className="background">
								{states.isTemplate && headerBackgroundImageCode ? (
									headerBackgroundImageCode
								) : (
									<CP.ResponsiveImage className="image" attr={attributes} keys={imageKeys.headerBackgroundImage} devices={devices} />
								)}
							</div>
						)}
					</header>
					<div className="text">
						<InnerBlocks.Content />
					</div>
				</div>
				{states.hasBackgroundImage && (
					<div className="background">
						{states.isTemplate && backgroundImageCode ? backgroundImageCode : <CP.ResponsiveImage className="image" attr={attributes} keys={imageKeys.backgroundImage} devices={devices} />}
					</div>
				)}
				{states.hasPatternImage && <style className="patternImageCss">{patternImageCss}</style>}
				{states.hasHeaderPatternImage && <style className="headerPatternImageCss">{headerPatternImageCss}</style>}
				{states.hasBorderImage && <style className="borderImageCss">{borderImageCss}</style>}
				{states.hasFrameImage && <style className="frameImageCss">{frameImageCss}</style>}
			</SectionTag>
		);
	},
});
