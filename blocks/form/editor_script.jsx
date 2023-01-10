wp.blocks.registerBlockType('catpow/form',{
	title: '🐾 Form',
	description:'テーマに定義されたフォームを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className}){
		const {content_path,post_data_path,inputs,data_id,values}=attributes;
		const {InspectorControls} = wp.blockEditor;
		const {PanelBody,TreeSelect,TextareaControl,TextControl,ServerSideRender} = wp.components;

		let postDataSelection=false;

		Object.keys(cpEmbeddablesTree.form).forEach((parentKey)=>{
			cpEmbeddablesTree.form[parentKey].children.map((item)=>{
				if(item.id===content_path && item.post_data_paths){
					postDataSelection=[];
					Object.keys(item.post_data_paths).forEach(function(key){
						postDataSelection.push({id:key,name:item.post_data_paths[key]});
					});
				}
			});
		});
		if(postDataSelection===false){
			if(post_data_path){setAttributes({post_data_path:false});}
		}
		else{
			if(!post_data_path || !postDataSelection.some((item)=>item['id']===post_data_path)){
				setAttributes({post_data_path:postDataSelection[0]['id']});
			}
		}

		return (
			<>
				<div className="embedded_content">
					<div className="label">{content_path}</div>
					<ServerSideRender block='catpow/form' attributes={attributes}/>
				</div>,
				<InspectorControls>
					<PanelBody title="フォーム">
						<TreeSelect
							label='path'
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.form)}
							onChange={(content_path)=>{
								setAttributes({content_path:content_path});
							}}
						/>
						{postDataSelection &&
							<TreeSelect
								label='form'
								selectedId={post_data_path}
								tree={postDataSelection}
								onChange={(post_data_path)=>{
									setAttributes({post_data_path:post_data_path});
								}}
							/>
						}
					</PanelBody>
					<PanelBody title="入力値" initialOpen={false}>
						<TextControl
							label='入力名'
							value={inputs}
							onChange={(inputs)=>{setAttributes({inputs});}}
						/>
						<TextControl
							label='データID'
							value={data_id}
							onChange={(data_id)=>{setAttributes({data_id});}}
						/>
						<TextareaControl
							label='初期値'
							value={values}
							onChange={(values)=>{setAttributes({values});}}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({attributes,className,setAttributes}){
		return 'null';
	}
});