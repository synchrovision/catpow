CP.config.sticky={
	imageKeys:{
		openButtonImage:{src:"openButtonImageSrc"},
		closeButtonImage:{src:"closeButtonImageSrc"}
	},
	imageSizes:{
		image:'vga'
	}
};
wp.blocks.registerBlockType('catpow/sticky',{
	title:'🐾 Sticky',
	description:'スクロールに追従するコンテンツを配置します。',
	icon:'menu',
	category:'catpow',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-sticky topLeft small label'},

		labelText:{source:'html',selector:'.content>.label',defalt:'ラベル'},

		openButtonImageSrc:{source:'attribute',selector:'.wp-block-catpow-sticky>.stickyButton [src].open',attribute:'src',default:wpinfo.theme_url+'/images/dummy_icon.svg'},
		closeButtonImageSrc:{source:'attribute',selector:'.wp-block-catpow-sticky>.stickyButton [src].close',attribute:'src',default:wpinfo.theme_url+'/images/dummy_icon.svg'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {classes,labelText}=attributes;

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.sticky;

		const selectiveClasses=useMemo(()=>{
			const {imageKeys}=CP.config.sticky;
			const selectiveClasses=[
				{name:'position',label:'位置',input:'position',disable:['left','center','right']},
				{name:'size',label:'サイズ',filter:'size',values:{full:'全面',large:'大',medium:'中',small:'小'}},
				{
					name:'type',
					label:'タイプ',
					filter:'type',
					values:{label:'ラベル',container:'コンテナ',collapsible:'折り畳み'},
					sub:{
						label:[
							'color'
						],
						collapsible:[
							'color',
							{
								name:'button',
								label:'ボタン',
								values:{pullButton:'引き出し',menuButton:'メニュー',labelButton:'ラベル',imageButton:'画像'},
								sub:{
									imageButton:[
										{label:'open',input:'image',keys:imageKeys.openButtonImage,size:'thumbnail'},
										{label:'close',input:'image',keys:imageKeys.closeButtonImage,size:'thumbnail'}
									]
								}
							}
						]
					}
				}
			];
			wp.hooks.applyFilters('catpow.blocks.sticky.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return (
			<>
				<div className={classes}>
					{states.collapsible && 
						<div className="stickyButton">
							<div className="stickyButtonIcon">
								{states.labelButton &&
									<div className='label'>
										<RichText onChange={(labelText)=>{setAttributes({labelText})}} value={labelText}/>
									</div>
								}
								{states.imageButton && [
									<ResponsiveImage
										className='open'
										attr={attributes}
										keys={imageKeys.openButtonImage}
									/>,
									<ResponsiveImage
										className='close'
										attr={attributes}
										keys={imageKeys.closeButtonImage}
									/>
								]}
							</div>
						</div>
					}
					<div className="content">
						{states.label &&
							<div className="label">
								<RichText onChange={(labelText)=>{setAttributes({labelText})}} value={labelText}/>
							</div>
						}
						{(states.container || states.collapsible) && <InnerBlocks/>}
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.listed || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({attributes,className,setAttributes}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {classes='',labelText}=attributes;

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.sticky;

		return (
			<div className={classes}>
				{states.collapsible && 
					<div className="stickyButton">
						<div className="stickyButtonIcon">
							{states.labelButton &&
								<div className='label'><RichText.Content value={labelText}/></div>
							}
							{states.imageButton && [
								<ResponsiveImage
									className='open'
									attr={attributes}
									keys={imageKeys.openButtonImage}
								/>,
								<ResponsiveImage
									className='close'
									attr={attributes}
									keys={imageKeys.closeButtonImage}
								/>
							]}
						</div>
					</div>
				}
				<div className="content">
					{states.label && <div className="label"><RichText.Content value={labelText}/></div>}
					{(states.container || states.collapsible) && <InnerBlocks.Content/>}
				</div>
			</div>
		);
	},
	deplicated:[
		{
			save({attributes,className,setAttributes}){
				const {classes='',labelText}=attributes;

				const states=CP.wordsToFlags(classes);
				const {imageKeys}=CP.config.sticky;

				return (
					<div className={classes}>
						{states.collapsible && 
							<div className="stickyMenuButton">
								<div className="stickyMenuButtonIcon">
									{states.labelButton &&
										<div className='label'><RichText.Content value={labelText}/></div>
									}
									{states.imageButton && [
										<ResponsiveImage
											className='open'
											attr={attributes}
											keys={imageKeys.openButtonImage}
										/>,
										<ResponsiveImage
											className='close'
											attr={attributes}
											keys={imageKeys.closeButtonImage}
										/>
									]}
								</div>
							</div>
						}
						<div className="content">
							{states.label && <div className="label"><RichText.Content value={labelText}/></div>}
							{(states.container || states.collapsible) && <InnerBlocks.Content/>}
						</div>
					</div>
				);
			},
		}
	]
});

wp.blocks.registerBlockType('catpow/stickycontent',{
	title:'🐾 StickyContent',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/sticky'],
	edit({attributes,className,setAttributes}){
		return [
			<div className={'sticky_content'}>
				<InnerBlocks template={[['core/paragraph']]} templateLock={false}/>
			</div>
		];
	},
	save({attributes,className,setAttributes}){
		return (
			<div className={'sticky_content'}>
				<InnerBlocks.Content/>
			</div>
		);
	}
});