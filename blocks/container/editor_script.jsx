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
		boxSizeVars: { type: "object", default: { "--cp-content-width": 960, "--cp-container-height": 400 } },
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
				{
					name: "border",
					label: __("ボーダー", "catpow"),
					values: "hasBorder",
					sub: [{ name: "borderWidth", label: __("幅", "catpow"), vars: "boxSizeVars", key: "--cp-border-width", input: "range", min: 0, max: 16, step: 1 }],
				},
				{
					name: "shadow",
					type: "buttons",
					label: __("影", "catpow"),
					values: {
						hasNoShadow: __("なし", "catpow"),
						hasInsetShadow: __("内側", "catpow"),
						hasOutsetShadow: __("外側", "catpow"),
					},
				},
				{
					name: "scrollX",
					label: __("スクロールX", "catpow"),
					values: "hasScrollX",
					sub: [{ name: "contentWidth", label: __("コンテンツの幅", "catpow"), vars: "boxSizeVars", key: "--cp-content-width", input: "range", min: 400, max: 2000, step: 10 }],
				},
				{
					name: "scrollY",
					label: __("スクロールY", "catpow"),
					values: "hasScrollY",
					sub: [{ name: "containerHeight", label: __("コンテナの高さ", "catpow"), vars: "boxSizeVars", key: "--cp-container-height", input: "range", min: 100, max: 1000, step: 10 }],
				},
				{
					name: "margin",
					label: __("間隔", "catpow"),
					values: "hasMargin",
					sub: [
						{ name: "marginX", label: __("X間隔", "catpow"), vars: "boxSizeVars", key: "--cp-margin-x", input: "range", min: 0, max: 40, step: 1 },
						{ name: "marginY", label: __("Y間隔", "catpow"), vars: "boxSizeVars", key: "--cp-margin-y", input: "range", min: 0, max: 120, step: 1 },
					],
				},
				{
					name: "padding",
					label: __("余白", "catpow"),
					values: "hasPadding",
					sub: [
						{ name: "paddingX", label: __("X余白", "catpow"), vars: "boxSizeVars", key: "--cp-padding-x", input: "range", min: 0, max: 200, step: 5 },
						{ name: "paddingY", label: __("Y余白", "catpow"), vars: "boxSizeVars", key: "--cp-padding-y", input: "range", min: 0, max: 200, step: 5 },
					],
				},
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
