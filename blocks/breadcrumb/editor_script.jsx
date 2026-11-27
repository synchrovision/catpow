
wp.blocks.registerBlockType("catpow/breadcrumb", {
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
