const { __ } = wp.i18n;

CP.config.unit = {
	devices: ["tb", "sp"],
	imageKeys: {
		image: { sources: "sources", src: "src", alt: "alt", code: "code" },
	},
};
wp.blocks.registerBlockType("catpow/unit", {
	icon: "align-pull-left",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					return wp.blocks.createBlock("catpow/unit", { classes: "wp-block-catpow-unit" }, innerBlocks);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { isTemplate, classes, vars } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.unit;

		var selectiveClasses = [
			{
				label: __("タイプ", "catpow"),
				type: "buttons",
				values: ["snap", "panel"],
			},
			{ input: "picture", label: __("画像", "catpow"), keys: imageKeys.image, devices, isTemplate: isTemplate },
			{
				label: __("テンプレート", "catpow"),
				values: "isTemplate",
				sub: [
					{
						input: "text",
						label: __("画像コード", "catpow"),
						key: "code",
						cond: true,
					},
				],
			},
		];

		return (
			<>
				<div {...useBlockProps({ className: classes, style: vars })}>
					<figure className="image">
						<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} />
					</figure>
					<div className="contents">
						<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { classes = "", vars } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.unit;

		return (
			<div {...useBlockProps.save({ className: classes, style: vars })}>
				<figure className="image">
					<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} />
				</figure>
				<div className="contents">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
