const { __ } = wp.i18n;
import { clsx } from "clsx";

CP.config.section = {
	devices: ["tb", "sp"],
	imageKeys: {
		navIcon: { src: "navIcon" },
		titleImage: { mime: "titleImageMime", src: "titleImageSrc", alt: "titleImageAlt", srcset: "titleImageSrcset", sources: "titleImageSources" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset", sources: "headerImageSources" },
		decoration: { pictures: "decoration" },
	},
};
wp.blocks.registerBlockType("catpow/section", {
	example: CP.example,
	edit(props) {
		const { InnerBlocks, BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, TextControl } = wp.components;
		const { attributes, setAttributes } = props;
		const { useMemo, useState } = wp.element;
		const { SectionTag, HeadingTag, color, anchor, classes, bodyClasses, headerClasses, titleClasses, vars, clipVars, headerVars, bodyVars, title, lead, titleImageCode, headerImageCode } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.section;
		const [mainBlock, setMainBlock] = useState();

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys } = CP.config.section;
			const selectiveClasses = [
				{ name: "sectionTag", input: "buttons", key: "SectionTag", label: __("セクションタグ", "catpow"), values: ["article", "section", "aside", "div"], required: true },
				"headingTag",
				"level",
				{
					name: "type",
					label: __("タイプ", "catpow"),
					type: "gridbuttons",
					values: { isTypeScene: "scene", isTypeArticle: "aticle", isTypeColumn: "column" },
					required: true,
					sub: {
						isTypeScene: [
							{
								name: "hasContentWidth",
								label: __("ヘッダコンテンツ幅", "catpow"),
								classKey: "titleClasses",
								values: "hasContentWidth",
								sub: [
									{
										name: "headerContentWidth",
										preset: "contentWidth",
										label: false,
										vars: "headerVars",
										classKey: "headerClasses",
									},
								],
							},
							{ name: "titleImage", label: __("タイトル画像", "catpow"), values: "hasTitleImage", sub: [{ input: "picture", keys: imageKeys.titleImage, devices }] },
							{ preset: "clipPath", label: __("ヘッダクリップ", "catpow"), name: "headerClip", classKey: "headerClasses", vars: "headerVars" },
						],
						isTypeArticle: ["headingType"],
						isTypeColumn: [
							{ preset: "itemSize", label: __("ヘッダサイズ", "catpow"), name: "headerSize", classKey: "headerClasses", vars: "headerVars" },
							{ preset: "hasBorderImage", classKey: "bodyClasses" },
							{ preset: "hasPadding", classKey: "bodyClasses" },
						],
					},
					bind: {
						isTypeArticle: {
							bodyClasses: ["hasContentWidth"],
						},
						isTypeColumn: {
							bodyClasses: ["hasContentWidth"],
						},
					},
				},
				"contentWidth",
				"hasPadding",
				"hasMargin",
				{ preset: "clipPath", vars: "clipVars" },
				"align",
				{ preset: "textAlign", classKey: "headerClasses" },

				"color",
				"colorScheme",
				"backgroundColor",
				"backgroundImage",
				"backgroundPattern",

				{ preset: "colorScheme", label: __("ヘッダ配色", "catpow"), classKey: "headerClasses" },
				{ preset: "backgroundColor", label: __("ヘッダ背景色", "catpow"), name: "headerBackgroundColor", classKey: "headerClasses" },
				{ preset: "backgroundImage", label: __("ヘッダ背景画像", "catpow"), name: "headerBackgroundImage", classKey: "headerClasses", vars: "headerVars" },
				{ preset: "backgroundPattern", label: __("ヘッダ背景パターン", "catpow"), name: "headerBackgroundPattern", classKey: "headerClasses", vars: "headerVars" },

				{ name: "headerImage", label: __("ヘッダ画像", "catpow"), values: "hasHeaderImage", sub: [{ input: "picture", keys: imageKeys.headerImage }] },
				"hasIcon",
				{ name: "lead", label: __("リード", "catpow"), values: "hasLead" },
				{ name: "decoration", label: __("デコレーション", "catpow"), values: "hasDecoration" },
				{
					name: "navIcon",
					label: __("メニューアイコン", "catpow"),
					values: "hasNavIcon",
					sub: [{ input: "image", label: __("アイコン", "catpow"), keys: imageKeys.navIcon, size: "thumbnail" }],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.section.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const blockProps = useBlockProps({
			id: anchor,
			className: classes,
			style: states.hasClipPath ? { ...vars, ...clipVars } : vars,
		});

		return (
			<>
				<BlockControls>
					<CP.AlignClassToolbar setAttributes={setAttributes} attributes={attributes} />
				</BlockControls>
				<CP.Bem prefix="wp-block-catpow">
					<SectionTag ref={setMainBlock} {...blockProps}>
						<div className={bodyClasses} style={bodyVars}>
							{states.hasDecoration && <CP.PlacedPictures.Edit className="decoration_" setAttributes={setAttributes} attributes={attributes} devices={devices} keys={imageKeys.decoration} />}
							<header className={headerClasses} style={headerVars}>
								{states.hasHeaderImage && (
									<div className="_image">
										{states.isTemplate && headerImageCode ? (
											<CP.DummyImage text={headerImageCode} />
										) : (
											<CP.SelectResponsiveImage className="_picture" setAttributes={setAttributes} attributes={attributes} keys={imageKeys.headerImage} />
										)}
									</div>
								)}
								<div className={titleClasses}>
									{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
									{states.hasTitleImage ? (
										<HeadingTag className="_titleimage">
											{states.isTemplate && titleImageCode ? (
												<CP.DummyImage text={titleImageCode} />
											) : (
												<CP.SelectResponsiveImage className="_image" setAttributes={setAttributes} attributes={attributes} keys={imageKeys.titleImage} devices={devices} />
											)}
										</HeadingTag>
									) : (
										<RichText tagName={HeadingTag} className="_heading" value={title} placeholder="Title" onChange={(title) => setAttributes({ title })} />
									)}
									{states.hasLead && <RichText tagName="div" className="_lead" value={lead} placeholder="Lead" onChange={(lead) => setAttributes({ lead })} />}
								</div>
							</header>
							<div className="contents_">
								<InnerBlocks />
							</div>
						</div>
					</SectionTag>
				</CP.Bem>
				<InspectorControls>
					<CP.ColorVarTracer target={mainBlock}>
						<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} initialOpen={true} />
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
	save({ attributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { SectionTag, HeadingTag, anchor, navIcon, classes, bodyClasses, headerClasses, titleClasses, vars, clipVars, headerVars, bodyVars, title, lead, titleImageCode, headerImageCode } =
			attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.section;

		const blockProps = useBlockProps.save({
			id: anchor,
			className: classes,
			style: states.hasClipPath ? { ...vars, ...clipVars } : vars,
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<SectionTag data-icon={navIcon} {...blockProps}>
					<div className={bodyClasses} style={bodyVars}>
						{states.hasDecoration && <CP.PlacedPictures className="decoration_" attributes={attributes} keys={imageKeys.decoration} />}
						<header className={headerClasses} style={headerVars}>
							{states.hasHeaderImage && (
								<div className="_image">{states.isTemplate && headerImageCode ? headerImageCode : <CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.headerImage} />}</div>
							)}
							<div className={titleClasses}>
								{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
								{states.hasTitleImage ? (
									<HeadingTag className="_titleimage">
										{states.isTemplate && titleImageCode ? titleImageCode : <CP.ResponsiveImage className="_image" attributes={attributes} keys={imageKeys.titleImage} devices={devices} />}
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
				</SectionTag>
			</CP.Bem>
		);
	},
});
