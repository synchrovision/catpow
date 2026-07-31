CP.config.unit = {
	devices: ["tb", "sp"],
	imageKeys: {
		image: { sources: "sources", src: "src", alt: "alt", code: "code" },
	},
};
wp.blocks.registerBlockType("catpow/unit", {
	title: "🐾 Unit",
	description: "画像とテキストを並べてレイアウトするためのブロックです。",
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
	attributes: {
		isTemplate: { type: "boolean", default: false },
		vars: { type: "object", default: {} },
		classes: { source: "attribute", selector: ".wp-block-catpow-unit", attribute: "class", default: "wp-block-catpow-unit" },

		sources: CP.getPictureSoucesAttributesForDevices(CP.config.unit.devices),

		mime: { source: "attribute", selector: "[src]", attribute: "data-mime" },
		src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
		alt: { source: "attribute", selector: "[src]", attribute: "alt" },
		code: { source: "text" },
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
				label: "タイプ",
				type: "buttons",
				values: ["snap", "panel"],
			},
			{ input: "picture", label: "画像", keys: imageKeys.image, devices, isTemplate: isTemplate },
			{
				label: "テンプレート",
				values: "isTemplate",
				sub: [
					{
						input: "text",
						label: "画像コード",
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
					<CP.SelectClassPanel title="スタイル" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
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
