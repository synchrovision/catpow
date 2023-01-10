/*
* 規定のテンプレートを埋め込む
*/
wp.blocks.registerBlockType('catpow/embed',{
	title: '🐾 Embed',
	description:'テーマに定義された埋め込みコンテンツを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	edit({attributes,setAttributes,className}){
		const {InspectorControls}=wp.blockEditor;
		const {PanelBody,TreeSelect,ServerSideRender} = wp.components;
		const {content_path,query}=attributes;

		return (
			<>
				<div class="embedded_content">
					<div class="label">{content_path}</div>
					<ServerSideRender block='catpow/embed' attributes={attributes}/>
				</div>
				<InspectorControls>
					<PanelBody title="Path">
						<TreeSelect
							label='path'
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.embed)}
							onChange={(content_path)=>{setAttributes({content_path:content_path});}}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	example:CP.example,
	save({attributes,className,setAttributes}){
		return 'null';
	}
});