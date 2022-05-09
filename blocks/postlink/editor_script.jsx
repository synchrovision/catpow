registerBlockType('catpow/postlink',{
	title: '🐾 PostLink',
	description:'前の投稿・次の投稿へのリンクを表示します。',
	icon: 'editor-code',
	category: 'catpow',
	example:CP.example,
	edit({attributes,setAttributes,className}){
		const {func,param}=attributes;

		return [
			<ServerSideRender block='catpow/postlink' attributes={Object.assign({},attributes,{preview:true})}/>,
			<InspectorControls>
				<PanelBody title="Path">
				</PanelBody>
			</InspectorControls>
		];
	},

	save({attributes,className,setAttributes}){
		return 'null';
	}
});