CP.config.accordion = {
	devices: ["sp", "tb"],
	imageKeys: {
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt" },
	},
	imageSizes: {
		image: "thumbnail",
	},
};

wp.blocks.registerBlockType("catpow/accordion", {
	title: "🐾 Accordion",
	description: "クリックで折り畳みできるブロックです。",
	icon: "insert",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", selector: ".wp-block-catpow-accordion", attribute: "class", default: "wp-block-catpow-accordion" },

		title: { source: "html", selector: ".title", default: "Title" },

		imageMime: { source: "attribute", selector: ".image [src]", attribute: "data-mime" },
		imageSrc: { source: "attribute", selector: ".image [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
		imageAlt: { source: "attribute", selector: ".image [src]", attribute: "alt" },
		imageCode: { source: "text", selector: ".image" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, title, imageMime, imageSrc, imageAlt, imageCode } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, imageSizes } = CP.config.accordion;

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys, imageSizes } = CP.config.accordion;
			const selectiveClasses = [
				"level",
				"color",
				{ name: "image", label: "画像", values: "hasImage", sub: [{ input: "image", keys: imageKeys.image, size: imageSizes.image }] },
				{ name: "exclusive", label: "他を閉じる", values: "exclusive" },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [
						{
							name: "imageCode",
							input: "text",
							label: "画像コード",
							key: "imageCode",
							cond: "hasImage",
						},
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.accordion.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div className={classes}>
					<div className="header">
						{states.hasImage && (
							<div className="image">
								{states.isTemplate && imageCode ? (
									<CP.DummyImage text={imageCode} />
								) : (
									<CP.SelectResponsiveImage set={setAttributes} attr={attributes} keys={imageKeys.image} size={imageSizes.image} />
								)}
							</div>
						)}
						<h3 className="title">
							<RichText tagName="div" value={title} onChange={(title) => setAttributes({ title: title })} />
						</h3>
						<span className="icon"></span>
					</div>
					<div className="container">
						<div className="contents">
							<InnerBlocks />
						</div>
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { classes, title, imageMime, imageSrc, imageAlt, imageCode } = attributes;
		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, imageSizes } = CP.config.accordion;
		const { InnerBlocks, RichText } = wp.blockEditor;

		return (
			<>
				<div className={classes}>
					<div className="header">
						{states.hasImage && <div className="image">{states.isTemplate && imageCode ? imageCode : <CP.ResponsiveImage attr={attributes} keys={imageKeys.image} size="medium_large" />}</div>}
						<h3 className="title">
							<RichText.Content value={title} />
						</h3>
						<span className="icon"></span>
					</div>
					<div className="container">
						<div className="contents">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</>
		);
	},
});
