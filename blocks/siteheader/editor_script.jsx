const { __ } = wp.i18n;
const { useMemo } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;

wp.blocks.registerBlockType("catpow/siteheader", {
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					label: __("ロゴ", "catpow"),
					sub: [{ label: __("キャッチフレーズ", "catpow"), values: "hasCatchPhrase" }],
				},
				{
					label: __("メインメニュー", "catpow"),
					sub: [
						{ label: __("サブタイトル", "catpow"), values: "hasSubTitleInMainMenu" },
						{ label: __("アイコン", "catpow"), values: "hasIconInMainMenu" },
					],
				},
				{
					label: __("プライマリメニュー", "catpow"),
					sub: [
						{ label: __("サブタイトル", "catpow"), values: "hasSubTitleInPrimaryMenu" },
						{ label: __("アイコン", "catpow"), values: "hasIconInPrimaryMenu" },
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.siteheader.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
				<div {...useBlockProps()}>
					<CP.ServerSideRender block="catpow/siteheader" attributes={attributes} />
				</div>
			</>
		);
	},

	save() {
		return null;
	},
});
