/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/
registerBlockType('catpow/app',{
	title: '🐾 App',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className}){
        const {content_path,query}=attributes;
		
        return [
			<div class="embedded_content">
				<div class="label">{content_path}</div>
				<ServerSideRender block='catpow/app' attributes={attributes}/>
			</div>,
			<InspectorControls>
				<PanelBody title="Path">
					<TreeSelect
						label='path'
						selectedId={content_path}
						tree={cpEmbeddablesTree.app}
						onChange={(content_path)=>{
							setAttributes({content_path:content_path});
							/*
							wp.apiFetch({path:'cp/v1/'+content_path}).then(res=>{
								setAttributes({content_path:content_path,props:res});
							});
							*/
						}}
					/>
				</PanelBody>
			</InspectorControls>
        ];
    },

	save({attributes,className,setAttributes}){
		return 'null';
	}
});