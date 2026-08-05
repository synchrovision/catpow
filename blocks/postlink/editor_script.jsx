const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/postlink", {
	title: "🐾 PostLink",
	description: __("前の投稿・次の投稿へのリンクを表示します。", "catpow"),
	icon: "editor-code",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody } = wp.components;
		const { serverSideRender: ServerSideRender } = wp;
		const { classes, vars, func, param } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					label: __("タイプ", "catpow"),
					type: "buttons",
					values: { isTypeText: __("テキスト", "catpow"), isTypeButton: __("ボタン", "catpow") },
				},
			];
			wp.hooks.applyFilters("catpow.blocks.postlink.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps({ className: classes, style: vars })}>
					<ServerSideRender block="catpow/postlink" attributes={Object.assign({}, attributes, { preview: true })} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="Path"></PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return "null";
	},
});
