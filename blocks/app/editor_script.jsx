/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/


wp.blocks.registerBlockType('catpow/app',{
	title: '🐾 App',
	description:'テーマに定義されたアプリを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	supports:{
		customClassName:false,
	},
	edit({attributes,setAttributes,className}){
		const {content_path,props,options}=attributes;
		const {useEffect}=wp.element;
		const {InspectorControls}=wp.blockEditor;
		const {PanelBody,TreeSelect}=wp.components;
		const {useSelect}=wp.data;
		
		if(!options && content_path){
			const path=content_path.slice(0,content_path.lastIndexOf('/'));
			wp.apiFetch({path:'/cp/v1/blocks/config/app/options?path='+path})
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
					<CP.ServerSideRender block='catpow/app' attributes={attributes}/>
				</div>
				<InspectorControls>
					<PanelBody title="Path">
						<TreeSelect
							label='path'
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.app)}
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