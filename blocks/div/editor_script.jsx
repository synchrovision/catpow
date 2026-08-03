CP.config.div = {
	devices: ["tb", "sp"],
	imageKeys: {
		iconImage: { src: "iconImageSrc", alt: "iconImageAlt" },
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
		const { classes, vars, clipVars, color, frameImageCss, borderImageCss } = attributes;

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
						isTypeFrame: ["hasIcon"],
						isTypeColumns: [{ preset: "itemSize", label: "カラム幅" }],
					},
				},
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
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="スタイル" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
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
			</div>
		);
	},
});
