CP.config.div = {
	devices: ["sp", "tb"],
	imageKeys: {
		iconImage: { src: "iconImageSrc", alt: "iconImageAlt" },
		backgroundImage: { src: "backgroundImageSrc", sources: "backgroundImageSources" },
	},
};
wp.blocks.registerBlockType("catpow/div", {
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					return wp.blocks.createBlock("catpow/div", { classes: "wp-block-catpow-div frame thinBorder" }, innerBlocks);
				},
			},
		],
	},
	example: CP.example,
	edit(props) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { attributes, className, setAttributes, context } = props;
		const { classes, vars, color, frameImageCss, borderImageCss } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.div;

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys } = CP.config.div;
			const selectiveClasses = [
				{
					name: "type",
					label: "タイプ",
					filter: "type",
					type: "buttons",
					values: { isTypeBlock: "block", isTypeFrame: "frame", isTypeColumns: "columns" },
					sub: {
						isTypeBlock: ["contentWidth"],
						isTypeFrame: [
							{ label: "アイコン", values: "hasIcon", sub: [{ input: "icon", label: "アイコン", color }] },
							{ type: "buttons", label: "線", values: { hasNoBorder: "なし", hasThinBorder: "細", hasBoldBorder: "太" } },
							{ label: "角丸", values: "hasBorderRadius" },
							{ label: "影", values: "hasBoxShadow", sub: [{ label: "内側", values: "hasBoxShadowInset" }] },
							"customContentWidth",
						],
						isTypeColumns: [{ type: "buttons", label: "幅", values: { narrow: "狭い", regular: "普通", wide: "広い" } }],
					},
					bind: {
						isTypeFrame: ["hasContentWidth"],
					},
				},
				"color",
				"colorScheme",
				"backgroundColor",
				"backgroundPattern",
				{
					name: "borderImage",
					type: "buttons",
					label: "ボーダー画像",
					values: { noBorder: "なし", hasFrameImage: "フレーム", hasBorderImage: "ボーダー" },
					sub: {
						hasFrameImage: [{ input: "frame", css: "frameImageCss", sel: ({ attr }) => "#" + attr.anchor, color }],
						hasBorderImage: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => "#" + attr.anchor, color }],
					},
				},
				"customPadding",
				"customMargin",
			];
			wp.hooks.applyFilters("catpow.blocks.div.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const blockProps = useBlockProps({ className: classes, style: vars });

		return (
			<>
				<div {...blockProps}>
					{states.hasIcon && <CP.OutputIcon item={attributes} />}
					<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
					{states.hasBorderImage && <style className="borderImageCss">{borderImageCss}</style>}
					{states.hasFrameImage && <style className="frameImageCss">{frameImageCss}</style>}
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
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { classes = "", vars, frameImageCss, borderImageCss } = attributes;

		const states = CP.classNamesToFlags(classes);

		const blockProps = useBlockProps.save({ className: classes, style: vars });

		return (
			<div {...blockProps}>
				{states.hasIcon && <CP.OutputIcon item={attributes} />}
				<InnerBlocks.Content />
				{states.hasBorderImage && <style className="borderImageCss">{borderImageCss}</style>}
				{states.hasFrameImage && <style className="frameImageCss">{frameImageCss}</style>}
			</div>
		);
	},
});
