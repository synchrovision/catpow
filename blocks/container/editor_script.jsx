const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/container", {
	title: "🐾 Container",
	description: "スクロール可能領域を作成できるコンテナです。",
	icon: "editor-code",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					return wp.blocks.createBlock("catpow/container", { classes: "wp-block-catpow-container " }, innerBlocks);
				},
			},
		],
	},
	attributes: {
		boxSizeVars: { type: "object", default: { "--cp-inner-content-width": 960, "--cp-container-height": 400 } },
		classes: { source: "attribute", selector: ".wp-block-catpow-container", attribute: "class", default: "wp-block-catpow-container" },
	},
	example: CP.example,
	edit(props) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { attributes, className, setAttributes, context } = props;
		const { boxSizeVars, classes = "" } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"hasContentWidth",
				{
					name: "border",
					label: __("ボーダー", "catpow"),
					values: "hasBorder",
				},
				"boxShadow",
				{
					name: "scrollX",
					label: __("スクロールX", "catpow"),
					values: "hasScrollX",
					sub: [{ name: "contentWidth", label: __("コンテンツの幅", "catpow"), vars: "boxSizeVars", key: "--cp-inner-content-width", input: "range", min: 400, max: 2000, step: 10 }],
				},
				{
					name: "scrollY",
					label: __("スクロールY", "catpow"),
					values: "hasScrollY",
					sub: [{ name: "containerHeight", label: __("コンテナの高さ", "catpow"), vars: "boxSizeVars", key: "--cp-container-height", input: "range", min: 100, max: 1000, step: 10 }],
				},
				"hasMargin",
			];
			wp.hooks.applyFilters("catpow.blocks.container.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const blockProps = useBlockProps({ className: classes, style: boxSizeVars });

		return (
			<>
				<div {...blockProps}>
					<div className="wp-block-catpow-container__body">
						<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
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
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { boxSizeVars, classes = "" } = attributes;

		const blockProps = useBlockProps.save({ className: classes, style: boxSizeVars });

		return (
			<div {...blockProps}>
				<div className="wp-block-catpow-container__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
