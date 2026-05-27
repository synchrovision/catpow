const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/postlink", {
	title: "🐾 PostLink",
	description: "前の投稿・次の投稿へのリンクを表示します。",
	icon: "editor-code",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody } = wp.components;
		const { serverSideRender: ServerSideRender } = wp;
		const { func, param } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"hasContentWidth",
				"hasMargin",
				{
					name: "type",
					label: "タイプ",
					type: "buttons",
					values: { isTypeText: "テキスト", isTypeButton: "ボタン" },
				},
			];
			wp.hooks.applyFilters("catpow.blocks.postlink.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps()}>
					<ServerSideRender block="catpow/postlink" attributes={Object.assign({}, attributes, { preview: true })} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="Path"></PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return "null";
	},
});
