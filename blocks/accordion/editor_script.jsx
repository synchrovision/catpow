CP.config.accordion={
	devices:['sp','tb'],
	imageKeys:{
		image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt"},
	},
	imageSizes:{
		image:'thumbnail'
	}
};

registerBlockType('catpow/accordion',{
	title: '🐾 Accordion',
	description:'クリックで折り畳みできるブロックです。',
	icon: 'insert',
	category: 'catpow',
	attributes:{
		classes:{source:'attribute',selector:'.wp-block-catpow-accordion',attribute:'class',default:'wp-block-catpow-accordion'},

		title:{type:'array',source:'children',selector:'.title',default:['Title']},

		imageMime:{source:'attribute',selector:'.image [src]',attribute:'data-mime'},
		imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
		imageCode:{source:'text',selector:'.image'},

	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState}=wp.element;
        const {
			classes,title,
			imageMime,imageSrc,imageAlt,imageCode
		}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.accordion;
		
		const selectiveClasses=[
			'color',
			{label:'画像',values:'hasImage',sub:[
				{input:'image',keys:imageKeys.image,size:imageSizes.image}
			]},
			{label:'他を閉じる',values:'exclusive'},
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{
						input:'text',
						label:'画像コード',
						key:'imageCode',
						cond:states.hasImage
					}
				]
			}
		];
		
        return (
			<Fragment>
				<div className={classes}>
					<div className="header">
						{states.hasImage &&
							<div className="image">
								{(states.isTemplate && imageCode)?(
									<DummyImage text={imageCode}/>
								):(
									<SelectResponsiveImage
										set={setAttributes}
										attr={attributes}
										keys={imageKeys.image}
										size={imageSizes.image}
									/>
								)}
							</div>
						}
						<h3 className="title"><RichText tagName="div" value={title} onChange={(title)=>setAttributes({title:title})}/></h3>
						<span className="icon"></span>
					</div>
					<div className="container">
						<div className="contents"><InnerBlocks/></div>
					</div>
				</div>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.accordion || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
        );
    },
	save({attributes,className,setAttributes}){
        const {
			classes,title,
			imageMime,imageSrc,imageAlt,imageCode
		}=attributes;
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.accordion;
		
		return (
			<Fragment>
				<div className={classes}>
					<div className="header">
						{states.hasImage && 
							<div class="image">
								{(states.isTemplate && imageCode)?(
									imageCode
								):(
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										size='medium_large'
									/>
								)}
							</div>
						}
						<h3 className="title"><RichText.Content value={title}/></h3>
						<span className="icon"></span>
					</div>
					<div className="container">
						<div className="contents"><InnerBlocks.Content/></div>
					</div>
				</div>
			</Fragment>
		);
	}
});