const { __ } = wp.i18n;
import { clsx } from "clsx";

CP.config.section = {
	devices: ["sp", "tb"],
	imageKeys: {
		navIcon: { src: "navIcon" },
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
		titleImage: { mime: "titleImageMime", src: "titleImageSrc", alt: "titleImageAlt", srcset: "titleImageSrcset", sources: "titleImageSources" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
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
		const { InnerBlocks, BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, TextControl } = wp.components;
		const { attributes, setAttributes } = props;
		const { useMemo, useState } = wp.element;
		const {
			SectionTag,
			HeadingTag,
			color,
			anchor,
			classes,
			bodyClasses,
			headerClasses,
			titleClasses,
			vars,
			headerVars,
			prefix,
			title,
			lead,
			titleImageCode,
			headerImageCode,
			headerPatternImageCss,
			patternImageCss,
			frameImageCss,
			borderImageCss,
		} = attributes;

		const states = CP.classNamesToFlags(classes);
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
					values: { isTypeScene: "scene", isTypeArticle: "aticle", isTypeColumn: "column" },
					sub: {
						isTypeScene: [
							{
								name: "headerContentWidth",
								preset: "customContentWidth",
								label: __("ヘッダコンテンツ幅", "catpow"),
								vars: "headerVars",
								classKey: "headerClasses",
								bind: {
									titleClasses: ["hasContentWidth"],
								},
							},
							{ name: "prefix", label: __("プレフィクス", "catpow"), values: "hasPrefix" },
							{ name: "titleImage", label: __("タイトル画像", "catpow"), values: "hasTitleImage", sub: [{ input: "picture", keys: imageKeys.titleImage, devices }] },
							{ name: "headerImage", label: __("ヘッダ画像", "catpow"), values: "hasHeaderImage", sub: [{ input: "image", keys: imageKeys.headerImage, size: imageSizes.headerImage }] },
							{ name: "lead", label: __("リード", "catpow"), values: "hasLead" },
							{ preset: "backgroundColor", label: __("ヘッダ背景色", "catpow"), name: "headerBackgroundColor", classKey: "headerClasses" },
							{ preset: "backgroundImage", label: __("ヘッダ背景画像", "catpow"), name: "headerBackgroundImage", classKey: "headerClasses", vars: "headerVars" },
							{ preset: "backgroundPattern", label: __("ヘッダ背景パターン", "catpow"), name: "headerBackgroundPattern", classKey: "headerClasses", vars: "headerVars" },
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
								values: "is-template",
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
						isTypeArticle: [
							{ name: "level", type: "buttons", label: __("レベル", "catpow"), values: { level1: "1", level2: "2", level3: "3", level4: "4" } },
							{ name: "headingType", type: "gridbuttons", label: __("見出しタイプ", "catpow"), filter: "heading_type", values: ["header", "headline", "catch"] },
							{ name: "headerImage", label: __("ヘッダ画像", "catpow"), values: "hasHeaderImage", sub: [{ input: "image", keys: imageKeys.headerImage, size: imageSizes.headerImage }] },
							{ name: "lead", label: __("リード", "catpow"), values: "hasLead" },
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
								values: "is-template",
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
						isTypeColumn: [
							{ name: "icon", label: __("アイコン", "catpow"), values: "hasIcon", sub: [{ input: "icon", color }] },
							{ name: "image", label: __("画像", "catpow"), values: "hasImage", sub: [{ input: "image", keys: imageKeys.image }] },
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
						isTypeScene: {
							_: ["level2"],
						},
						isTypeArticle: {
							_: ["level3"],
							bodyClasses: ["hasContentWidth"],
						},
						isTypeColumn: {
							_: ["level3"],
							bodyClasses: ["hasContentWidth"],
						},
					},
				},
				"color",
				"colorScheme",
				"backgroundColor",
				"backgroundImage",
				"backgroundPattern",
				"customContentWidth",
			];
			wp.hooks.applyFilters("catpow.blocks.section.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const blockProps = useBlockProps({
			id: anchor,
			className: clsx("section-", classes),
			style: vars,
		});

		return (
			<>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
				<CP.Bem prefix="wp-block-catpow">
					<SectionTag ref={setMainBlock} {...blockProps}>
						<div className={clsx("body_", bodyClasses)}>
							{states.hasDecoration && <CP.PlacedPictures.Edit className="decoration_" set={setAttributes} attr={attributes} devices={devices} keys={imageKeys.decoration} />}
							<header className={clsx("header_", headerClasses)} style={headerVars}>
								<div className={clsx("_title", titleClasses)}>
									{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
									{states.hasPrefix && (
										<div className="_prefix">
											<RichText tagName="div" value={prefix} onChange={(prefix) => setAttributes({ prefix })} />
										</div>
									)}
									{states.hasHeaderImage && (
										<div className="_image">
											{states.isTemplate && headerImageCode ? (
												<CP.DummyImage text={headerImageCode} />
											) : (
												<CP.SelectResponsiveImage className="_image" set={setAttributes} attr={attributes} keys={imageKeys.headerImage} size={imageSizes.headerImage} />
											)}
										</div>
									)}
									{states.hasTitleImage ? (
										<HeadingTag className="_titleimage">
											{states.isTemplate && titleImageCode ? (
												<CP.DummyImage text={titleImageCode} />
											) : (
												<CP.SelectResponsiveImage className="_image" set={setAttributes} attr={attributes} keys={imageKeys.titleImage} devices={devices} />
											)}
										</HeadingTag>
									) : (
										<RichText tagName={HeadingTag} className="_heading" value={title} onChange={(title) => setAttributes({ title })} />
									)}
									{states.hasLead && <RichText tagName="div" className="_lead" value={lead} onChange={(lead) => setAttributes({ lead })} />}
								</div>
							</header>
							<div className="contents_">
								<InnerBlocks />
							</div>
						</div>
						{states.hasPatternImage && <style>{patternImageCss}</style>}
						{states.hasHeaderPatternImage && <style>{headerPatternImageCss}</style>}
						{states.hasBorderImage && <style>{borderImageCss}</style>}
						{states.hasFrameImage && <style>{frameImageCss}</style>}
					</SectionTag>
				</CP.Bem>
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
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const {
			SectionTag,
			HeadingTag,
			anchor,
			navIcon,
			classes,
			bodyClasses,
			headerClasses,
			titleClasses,
			vars,
			headerVars,
			prefix,
			title,
			lead,
			titleImageCode,
			headerImageCode,
			headerPatternImageCss,
			patternImageCss,
			frameImageCss,
			borderImageCss,
		} = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, imageSizes } = CP.config.section;

		const blockProps = useBlockProps.save({
			id: anchor,
			className: clsx("section-", classes),
			style: vars,
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<SectionTag data-icon={navIcon} {...blockProps}>
					<div className={clsx("body_", bodyClasses)}>
						{states.hasDecoration && <CP.PlacedPictures className="decoration_" attr={attributes} keys={imageKeys.decoration} />}
						<header className={clsx("header_", headerClasses)} style={headerVars}>
							<div className={clsx("_title", titleClasses)}>
								{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
								{states.hasPrefix && (
									<div className="_prefix">
										<RichText.Content value={prefix} />
									</div>
								)}
								{states.hasHeaderImage && (
									<div className="_image">{states.isTemplate && headerImageCode ? headerImageCode : <CP.ResponsiveImage className="_image" attr={attributes} keys={imageKeys.headerImage} />}</div>
								)}
								{states.hasTitleImage ? (
									<HeadingTag className="_titleimage">
										{states.isTemplate && titleImageCode ? titleImageCode : <CP.ResponsiveImage className="_image" attr={attributes} keys={imageKeys.titleImage} devices={devices} />}
									</HeadingTag>
								) : (
									<HeadingTag className="_heading">
										<RichText.Content value={title} />
									</HeadingTag>
								)}
								{states.hasLead && (
									<div className="_lead">
										<RichText.Content value={lead} />
									</div>
								)}
							</div>
						</header>
						<div className="contents_">
							<InnerBlocks.Content />
						</div>
					</div>
					{states.hasPatternImage && <style className="patternImageCss">{patternImageCss}</style>}
					{states.hasHeaderPatternImage && <style className="headerPatternImageCss">{headerPatternImageCss}</style>}
					{states.hasBorderImage && <style className="borderImageCss">{borderImageCss}</style>}
					{states.hasFrameImage && <style className="frameImageCss">{frameImageCss}</style>}
				</SectionTag>
			</CP.Bem>
		);
	},
});
