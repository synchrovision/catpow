const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/pagecontent", {
	title: "🐾 pagecontent",
	description: "現在のURLに応じたコンテンツを表示します。",
	icon: "editor-code",
	category: "catpow-embed",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { content_path, post_data_path, inputs, data_id, values } = attributes;
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody, TreeSelect, TextareaControl, TextControl } = wp.components;
		const { serverSideRender: ServerSideRender } = wp;

		return (
			<CP.Message>
				{__(
					"表示中のURLに対応したコンテンツを表示します。テーマにURLに対応したコンテンツのテンプレートが定義されている場合はそのテンプレートが利用されます。定義がない場合は個別ページにおいては投稿されたコンテンツが表示されます。"
				)}
			</CP.Message>
		);
	},

	save({ attributes, className, setAttributes }) {
		return false;
	},
});
