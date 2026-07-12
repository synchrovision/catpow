const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/nav", {
	title: "🐾 Nav",
	description: __("メニューを表示するブロックです。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	edit({ attributes, setAttributes, className, clientId }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { classes, vars, nav_name } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [navSelectiveClasses, "level", "hasContentWidth", "hasPadding", "hasMargin", "itemSize", "color", "colorScheme"];
			wp.hooks.applyFilters("catpow.blocks.nav.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const blockProps = useBlockProps({ className: classes, style: vars });

		return (
			<>
				<div {...blockProps}>
					<CP.ServerSideRender block="catpow/nav" attributes={attributes} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" initialOpen={true} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return null;
	},
});
