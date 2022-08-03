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
		const {content_path,props,options}=attributes;
		const {useEffect}=wp.element;
		
		if(!options && content_path){
			const path=content_path.substr(0,content_path.lastIndexOf('/'));
			wp.apiFetch({path:'/cp/v1/blocks/config/app/options?path='+path})
			.catch((res)=>{
				console.log(res);
			})
			.then((options)=>{
				const initOption=(option)=>{
					option.json='props';
					if(option.sub){
						if(Array.isArray(option.sub)){
							option.sub.forEach(initOption);
						}
						else{
							Object.keys(option.sub).forEach((key)=>initOption(option.sub[key]));
						}
					}
				};
				options.forEach(initOption);
				setAttributes({options});
			});
		}
		
		return [
			<div class="embedded_content">
				<div class="label">{content_path}</div>
				<CP.ServerSideRender block='catpow/app' attributes={attributes}/>
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
				{options &&
					<CP.SelectClassPanel
						title='設定'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={options}
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