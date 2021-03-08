/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/
registerBlockType('catpow/app',{
	title: '🐾 App',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	supports:{
		customClassName:false,
	},
	edit({attributes,setAttributes,className}){
        const {content_path,props,config}=attributes;
		
		if(!config && content_path){
			const path=content_path.substr(0,content_path.lastIndexOf('/'));
			wp.apiFetch({path:'cp/v1/'+path+'/config'}).then((config)=>{
				Object.keys(config).map((key)=>config[key].json='props');
				setAttributes({config});
			});
		}
		
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
							const path=content_path.substr(0,content_path.lastIndexOf('/'));
							setAttributes({content_path,config:false,props:JSON.stringify({path})});
						}}
					/>
				</PanelBody>
				{config &&
					<CP.SelectClassPanel
						title='設定'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={config}
						initialOpen={true}
					/>
				}
			</InspectorControls>
        ];
    },

	save({attributes,className,setAttributes}){
		return 'null';
	}
});