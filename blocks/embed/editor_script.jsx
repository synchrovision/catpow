/*
* 規定のテンプレートを埋め込む
*/
wp.blocks.registerBlockType('catpow/embed',{
	title: '🐾 Embed',
	description:'テーマに定義された埋め込みコンテンツを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className}){
		const {InspectorControls}=wp.blockEditor;
		const {PanelBody,TreeSelect}=wp.components;
		const {serverSideRender:ServerSideRender}=wp;
		const {content_path,props,options=false}=attributes;

		
		if(!options && content_path){
			const path=content_path.slice(0,content_path.lastIndexOf('/'));
			wp.apiFetch({path:'/cp/v1/blocks/config/embed/options?path='+path})
			.catch((res)=>{
				console.log(res);
			})
			.then((options)=>{
				const newProps=JSON.parse(props);
				const initOption=(option,key)=>{
					option.key=key;
					option.json='props';
					if(option.hasOwnProperty('default') && !newProps.hasOwnProperty(key)){
						newProps[key]=option.default;
					}
					if(option.sub){
						for(const subKey in option.sub){initOption(option.sub[subKey],subKey);}
					}
				};
				for(const key in options){initOption(options[key],key);}
				setAttributes({options,props:JSON.stringify(newProps)});
			});
		}
		
		return (
			<>
				<div className="embedded_content">
					<div className="label">{content_path}</div>
					<ServerSideRender block='catpow/embed' attributes={attributes}/>
				</div>
				<InspectorControls>
					<PanelBody title="Path">
						<TreeSelect
							label='path'
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.embed)}
							onChange={(content_path)=>{
								const path=content_path.slice(0,content_path.lastIndexOf('/'));
								setAttributes({content_path,options:false,props:JSON.stringify({path})});
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
			</>
		);
	},
	save({attributes,className,setAttributes}){
		return 'null';
	}
});