registerBlockType('catpow/loopblock',{
	title: '🐾 Loopblock',
	description:'クエリの投稿の情報を表示するためのコンテナです。',
	icon: 'editor-code',
	category: 'catpow-functional',
	example:CP.example,
	edit({attributes,setAttributes,className}){
		const {content_path,query,AltMode=false}=attributes;

		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={[
							{
								icon: 'welcome-comments',
								title: 'AltMode',
								isActive: AltMode,
								onClick: () => setAttributes({AltMode:!AltMode})
							}
						]}
					/>
				</BlockControls>
				<div className={"loopBlock "+(AltMode?"alt_content altMode":"embedded_content")}>
					<div class="label">
						{AltMode?(
							<Icon icon="welcome-comments"/>
						):(content_path)}
					</div>
					<InnerBlocks template={[['catpow/loopblockcontent'],['catpow/loopblockcontent',{name:'on_empty'}]]} templateLock="all"/>
				</div>
				<InspectorControls>
					<PanelBody title="Query">
						<TextControl
							label='content path'
							value={content_path}
							onChange={(content_path)=>{setAttributes({content_path});}}
						/>
						<TextareaControl
							label='query'
							value={query}
							onChange={(query)=>{setAttributes({query});}}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	save({attributes,className,setAttributes}){
		return <InnerBlocks.Content/>;
	}
});


registerBlockType('catpow/loopblockcontent',{
	title:'🐾 LoopBlockContent',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/loopblock'],
	attributes:{
		name:{type:'attribute',label:'名前',selector:'loopBlockContent',attribute:'name',default:'content'},
	},
	edit({attributes,className,setAttributes,clientId}){
		const {name}=attributes;

		const template=(name=='on_empty')?[['core/paragraph',{align:'center',content:'Not Found'}]]:[['catpow/section']];

		return (
			<div className={'loopBlockContent'}>
				<InnerBlocks template={template} templateLock={false}/>
			</div>
		);
	},
	save({attributes,className,setAttributes}){
		const {name}=attributes;
		return (
			<Fragment>
				<loopBlockContent name={name}>
					<InnerBlocks.Content/>
				</loopBlockContent>
			</Fragment>
		);
	}
});