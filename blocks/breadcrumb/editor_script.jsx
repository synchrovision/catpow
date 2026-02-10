const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/breadcrumb", {
	title: "🐾 Breadcrumb",
	description: __("パンくずリストを表示します。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	edit({ attributes }) {
		const { serverSideRender: ServerSideRender } = wp;
		const { useBlockProps } = wp.blockEditor;

		return (
			<div {...useBlockProps()}>
				<ServerSideRender block="catpow/breadcrumb" attributes={attributes} />
			</div>
		);
	},

	save({}) {
		return null;
	},
});
