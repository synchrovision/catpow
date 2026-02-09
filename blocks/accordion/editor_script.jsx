import { clsx } from "clsx";

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
		classes: { source: "attribute", selector: ".wp-block-catpow-accordion", attribute: "class", default: "wp-block-catpow-accordion is-level3" },
		HeadingTag: { type: "string", default: "h3" },

		title: { source: "html", selector: ".wp-block-catpow-accordion__header-title", default: "Title" },

		imageMime: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "data-mime" },
		imageSrc: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
		imageAlt: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "alt" },
		imageCode: { source: "text", selector: ".wp-block-catpow-accordion__header-image" },
	},
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, HeadingTag, title, imageCode, isOpen = true } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, imageSizes } = CP.config.accordion;

		const selectiveClasses = useMemo(() => {
			const { imageKeys, imageSizes } = CP.config.accordion;
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"hasContentWidth",
				{ name: "image", label: "画像", values: "hasImage", sub: [{ input: "image", keys: imageKeys.image, size: imageSizes.image }] },
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
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: clsx(classes, { "is-open": isOpen }) })}>
						<div className="_header" role="button">
							{states.hasImage && (
								<div className="_image">
									{states.isTemplate && imageCode ? (
										<CP.DummyImage text={imageCode} />
									) : (
										<CP.SelectResponsiveImage set={setAttributes} attr={attributes} keys={imageKeys.image} size={imageSizes.image} />
									)}
								</div>
							)}
							<RichText tagName={HeadingTag} className="_title" value={title} onChange={(title) => setAttributes({ title: title })} />
							<span className="_icon" onClick={() => setAttributes({ isOpen: !isOpen })}></span>
						</div>
						<div className="_contents">
							<div className="_body">
								<InnerBlocks />
							</div>
						</div>
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { classes, HeadingTag, title, imageCode } = attributes;
		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.accordion;
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;

		const blockProps = useBlockProps.save({
			id: "{$uid}",
			className: classes,
			"data-wp-interactive": "catpow/accordion",
			"data-wp-context": JSON.stringify({
				accordionId: "{$uid}",
			}),
			"data-wp-init": "callbacks.initBlock",
			"data-wp-class--is-open": "callbacks.isOpen",
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<div
						id="{$uid}-header"
						className="_header"
						role="button"
						data-wp-on--click="actions.onClickToggle"
						data-wp-bind--aria-expanded="callbacks.isOpen"
						aria-controls="{$uid}-contents"
						tabindex="0"
					>
						{states.hasImage && <div className="_image">{states.isTemplate && imageCode ? imageCode : <CP.ResponsiveImage attr={attributes} keys={imageKeys.image} size="medium_large" />}</div>}
						<RichText.Content tagName={HeadingTag} className="_title" value={title} />
						<span className="_icon"></span>
					</div>
					<div id="{$uid}-contents" className="_contents" data-wp-bind--aria-hidden="!callbacks.isOpen">
						<div className="_body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</CP.Bem>
		);
	},
});

wp.blocks.registerBlockType("catpow/accordiongroup", {
	title: "🐾 AccordionGroup",
	description: "同時に開かれるアコーディオンを制限するコンテナです。",
	icon: "insert",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", selector: ".wp-block-catpow-accordiongourp", attribute: "class", default: "wp-block-catpow-accordiongroup" },
		groupId: { type: "string", default: "accordionGroup" },
	},
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextControl } = wp.components;
		const { classes, groupId } = attributes;
		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: classes })}>
						<div className="cp-label">
							<Icon icon="excerpt-view" />
							{groupId}
						</div>
						<InnerBlocks />
					</div>
				</CP.Bem>
				<InspectorControls>
					<PanelBody title="GroupId" icon="admin-generic" initialOpen={true}>
						<TextControl onChange={(groupId) => setAttributes({ groupId })} value={groupId} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { classes, groupId } = attributes;
		const blockProps = useBlockProps.save({
			className: classes,
			"data-wp-interactive": "catpow/accordion",
			"data-wp-context": JSON.stringify({
				groupId,
			}),
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<InnerBlocks.Content />
				</div>
			</CP.Bem>
		);
	},
});
