wp.blocks.registerBlockType("catpow/postlink", {
	title: "🐾 PostLink",
	description: "前の投稿・次の投稿へのリンクを表示します。",
	icon: "editor-code",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody } = wp.components;
		const { serverSideRender: ServerSideRender } = wp;
		const { func, param } = attributes;

		return (
			<>
				<ServerSideRender block="catpow/postlink" attributes={Object.assign({}, attributes, { preview: true })} />
				<InspectorControls>
					<PanelBody title="Path"></PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return "null";
	},
});
