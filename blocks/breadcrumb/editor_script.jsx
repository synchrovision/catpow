﻿const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/breadcrumb", {
	title: "🐾 Breadcrumb",
	description: __("パンくずリストを表示します。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, setAttributes, className, clientId }) {
		const { serverSideRender: ServerSideRender } = wp;
		const { content_path, query, config, EditMode = false } = attributes;

		return (
			<>
				<ServerSideRender block="catpow/breadcrumb" attributes={attributes} />
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return null;
	},
});
