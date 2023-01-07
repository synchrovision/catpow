wp.blocks.registerBlockType('catpow/loop',{
	title:'🐾 Loop',
	description:'テーマに定義されたテンプレートで投稿を表示します。',
	icon:'editor-code',
	category:'catpow-embed',
	example:CP.example,
	edit({attributes,setAttributes,className,clientId}){
		const {InnerBlocks,BlockControls,InspectorControls}=wp.blockEditor;
		const {PanelBody,TreeSelect,TextareaControl,ServerSideRender} = wp.components;
		const {content_path,deps={},query,config,EditMode=false}=attributes;
		const {useMemo}=wp.element;
		let configData;

		const itemMap=useMemo(()=>{
			const map={};
			Object.keys(cpEmbeddablesTree.loop).map((label)=>{
				cpEmbeddablesTree.loop[label].children.map((item)=>{map[item.id]=item;});
			});
			return map;
		},[]);
		const item=useMemo(()=>content_path && itemMap[content_path],[itemMap,content_path]);

		if(!config){
		   if(content_path && itemMap[content_path].has_config){
				const path=content_path.substr(0,content_path.lastIndexOf('/'));
				wp.apiFetch({path:'/cp/v1/'+path+'/config'}).then((config)=>{
					Object.keys(config).map((key)=>config[key].json='config');
					setAttributes({config:JSON.stringify(config)});
				}).catch((res)=>{
					setAttributes({config:'{}'});
				});
			}
			configData={};
		}
		else{
			configData=JSON.parse(config);
		}
		
		return (
			<>
				{configData.template && 
					<BlockControls>
						<Toolbar
							controls={[
								{
									icon:'edit',
									title:'EditMode',
									isActive:EditMode,
									onClick:() => setAttributes({EditMode:!EditMode})
								}
							]}
						/>
					</BlockControls>
				}
				{(configData.template && EditMode)?(
					<div className="alt_content loopContents">
						<div class="label">
							<Icon icon="edit"/>
						</div>
						<InnerBlocks
							allowedBlocks={['catpow/loopcontent']}
							template={configData.template}
							templateLock={configData.templateLock || "ALL"}
						/>
					</div>
				):(
					<div class="embedded_content">
						<div class="label">{content_path}</div>
						<ServerSideRender block='catpow/loop' attributes={attributes}/>
					</div>
				)}
				{item?.deps?.css && (
					<link rel="stylesheet" href={item.deps.css}/>
				)}
				{item?.deps?.js && (
					<script type="text/javascript" src={item.deps.js}></script>
				)}
				<InspectorControls>
					<PanelBody title="Query">
						<TreeSelect
							label='content path'
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.loop)}
							onChange={(content_path)=>{
								const path=content_path.substr(0,content_path.lastIndexOf('/'));
								const {has_template}=itemMap[content_path]
								if(has_template){
									wp.apiFetch({path:'/cp/v1/'+path+'/template'}).then((template)=>{
										wp.data.dispatch('core/block-editor').replaceInnerBlocks(
											clientId,
											CP.createBlocks(template)
										);
									});
								}
								setAttributes({content_path,config:null});
							}}
						/>
						{content_path && content_path.substr(-8)==='loop.php' &&
							<TextareaControl
								label='query'
								value={query}
								onChange={(query)=>{setAttributes({query:query});}}
							/>
						}
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({attributes,className,setAttributes}){
		const {InnerBlocks}=wp.blockEditor;
		return <InnerBlocks.Content/>;
	},

	deprecated:[{
		save(){return 'null';}
	}]
});


registerBlockType('catpow/loopcontent',{
	title:'🐾 LoopContent',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/loop'],
	attributes:{
		name:{type:'attribute',label:'名前',selector:'loopContent',attribute:'name',default:'content'},
	},
	edit({attributes,className,setAttributes,clientId}){
		const {name}=attributes;

		const template=(name=='on_empty')?[['core/paragraph',{align:'center',content:'Not Found'}]]:[['catpow/section']];

		return (
			<div className={'loopContent'}>
				<InnerBlocks template={template} templateLock={false}/>
			</div>
		);
	},
	save({attributes,className,setAttributes}){
		const {name}=attributes;
		return (
			<>
				<loopContent name={name}>
					<InnerBlocks.Content/>
				</loopContent>
			</>
		);
	}
});