registerBlockType('catpow/t-loop',{
	title: '🐾 T-loop',
	description:'クエリの投稿の情報を表示するためのコンテナです。',
	icon: 'editor-code',
	category: 'catpow-functional',
	parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
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
				<div className={"wp-block-catpow-t-loop "+(AltMode?"alt_content altMode":"embedded_content")}>
					<div class="label">
						{AltMode?(
							<Icon icon="welcome-comments"/>
						):(content_path)}
					</div>
					<InnerBlocks template={[['catpow/t-loopcontent'],['catpow/t-loopcontent',{name:'on_empty'}]]} templateLock="all"/>
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


registerBlockType('catpow/t-loopcontent',{
	title:'🐾 t-loopContent',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/t-loop'],
	attributes:{
		name:{type:'attribute',label:'名前',selector:'t-loopContent',attribute:'name',default:'content'},
	},
	edit({attributes,className,setAttributes,clientId}){
		const {name}=attributes;

		const template=(name=='on_empty')?[['catpow/t-paragraph',{align:'center',content:'Not Found'}]]:[['catpow/t-paragraph']];

		return (
			<div className={'wp-block-catpow-t-loopContent'}>
				<InnerBlocks template={template} templateLock={false}/>
			</div>
		);
	},
	save({attributes,className,setAttributes}){
		const {name}=attributes;
		return (
			<Fragment>
				<t-loopContent name={name}>
					<InnerBlocks.Content/>
				</t-loopContent>
			</Fragment>
		);
	}
});