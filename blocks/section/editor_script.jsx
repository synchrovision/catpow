CP.config.section={
	devices:['sp','tb'],
	imageKeys:{
		navIcon:{src:"navIcon"},
		image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt",srcset:"imageSrcset"},
		headerImage:{mime:"headerImageMime",src:"headerImageSrc",alt:"headerImageAlt",srcset:"headerImageSrcset"},
		headerBackgroundImage:{mime:"headerBackgroundImageMime",src:"headerBackgroundImageSrc",alt:"headerBackgroundImageAlt",srcset:"headerBackgroundImageSrcset",sources:"headerBackgroundImageSources"},
		backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset",sources:"backgroundImageSources"}
	},
	imageSizes:{
		image:'medium',
		headerImage:'medium_large'
	}
};

registerBlockType('catpow/section',{
	title: '🐾 Section',
	description:'見出しと内容のまとまりを表すセクションのブロックです。',
	icon: 'id-alt',
	category: 'catpow',
	attributes:{
		color:{default:"0"},
		id:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'id'},
		classes:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'class',default:'wp-block-catpow-section article level3 center catch'},
		navIcon:{source:'attribute',selector:'.wp-block-catpow-section',attribute:'data-icon'},
		
		SectionTag:{type:'text',default:'section'},
		HeadingTag:{type:'text',default:'h2'},

		prefix:{source:'children',selector:'header div.prefix'},
		title:{type:'array',source:'children',selector:'header h2,header .heading',default:['Title']},
		lead:{type:'array',source:'children',selector:'header p,header .lead'},

		headerImageMime:{source:'attribute',selector:'header .image [src]',attribute:'data-mime'},
		headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		headerImageSrcset:{source:'attribute',selector:'header .image [src]',attribute:'srcset'},
		headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
		headerImageCode:{source:'text',selector:'header .image'},
		
		headerBackgroundImageMime:{source:'attribute',selector:'header .background [src]',attribute:'data-mime'},
		headerBackgroundImageSrc:{source:'attribute',selector:'header .background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		headerBackgroundImageSrcset:{source:'attribute',selector:'header .background [src]',attribute:'srcset'},
		headerBackgroundImageAlt:{source:'attribute',selector:'header .background [src]',attribute:'alt'},
		headerBackgroundImageCode:{source:'text',selector:'header .background'},
		headerBackgroundImageSources:CP.getPictureSoucesAttributesForDevices(
			CP.config.section.devices,'header .background picture','dummy_bg.jpg'
		),

		imageMime:{source:'attribute',selector:'.image [src]',attribute:'data-mime'},
		imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		imageSrcset:{source:'attribute',selector:'.image [src]',attribute:'srcset'},
		imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
		imageCode:{source:'text',selector:'.image'},

		backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		backgroundImageSrcset:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'srcset'},
		backgroundImageCode:{source:'text',selector:'.wp-block-catpow-section>.background'},
		backgroundImageSources:CP.getPictureSoucesAttributesForDevices(
			CP.config.section.devices,'.wp-block-catpow-section>.background picture','dummy_bg.jpg'
		),
		
		patternImageCss:{source:'text',selector:'style.patternImageCss'},
		headerPatternImageCss:{source:'text',selector:'style.headerPatternImageCss'},
		frameImageCss:{source:'text',selector:'style.frameImageCss'},
		borderImageCss:{source:'text',selector:'style.borderImageCss'},
		
		iconSrc:{source:'attribute',selector:'.icon [src]',attribute:'src',default:cp.theme_url+'/images/dummy_icon.svg'},
		iconAlt:{source:'attribute',selector:'.icon [src]',attribute:'alt'},
	},
	providesContext:{'catpow/color':'color'},
	usesContext:['catpow/color'],
	example:CP.example,
	edit(props){
		const {attributes,className,setAttributes}=props;
        const {
			SectionTag,HeadingTag,
			color,id,classes,prefix,title,lead,
			headerImageMime,headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
			headerBackgroundImageCode,
			imageMime,imageSrc,imageSrcset,imageAlt,imageCode,
			backgroundImageSrc,backgroundImageCode,
			headerPatternImageCss,patternImageCss,frameImageCss,borderImageCss,
			iconSrc,iconAlt
		}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.section;
		
		CP.inheritColor(props,['iconSrc','patternImageCss','headerPatternImageCss','frameImageCss','borderImageCss']);
		CP.manageStyleData(props,['patternImageCss','headerPatternImageCss','frameImageCss','borderImageCss']);
		
		const selectiveClasses=[
			{input:'buttons',filter:'sectionTag',key:'SectionTag',label:'セクションタグ',values:['article','section','aside','div']},
			{input:'buttons',filter:'headingTag',key:'HeadingTag',label:'見出しタグ',values:['h2','h3','h4'],effect:(val)=>{
				for(const key in states){
					if(key.substr(0,5)==='level'){states[key]=false;}
				}
				if(/^h\d$/.test(val)){states['level'+val[1]]=true;}
				setAttributes({classes:CP.flagsToWords(states)});
			}},
			{
				label:'タイプ',
				filter:'type',
				type:'gridbuttons',
				values:[
					'scene',
					'article',
					'column'
				],
				sub:{
					scene:[
						'color',
						{label:'プレフィクス',values:'hasPrefix'},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage}
						]},
						{label:'ヘッダ背景画像',values:'hasHeaderBackgroundImage',sub:[
							{input:'picture',label:'背景画像',keys:imageKeys.headerBackgroundImage,devices},
							{label:'薄く',values:'paleHeaderBG'}
						]},
						{label:'抜き色文字',values:'inverseText',sub:[
							{label:'ヘッダ背景色',values:'hasHeaderBackgroundColor',sub:[
								{label:'パターン画像',values:'hasHeaderPatternImage',sub:[
									{input:'pattern',css:'headerPatternImageCss',sel:'#'+id+' > .contents > .header'},
								]}
							]}
						]},
						{label:'リード',values:'hasLead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',label:'背景画像',keys:imageKeys.backgroundImage,devices},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'背景色',values:'hasBackgroundColor'},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'ヘッダ画像コード',
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:'ヘッダ背景画像コード',
									key:'headerBackgroundImageCode',
									cond:states.hasHeaderBackgroundImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					article:[
						'color',
						{type:'buttons',label:'レベル',values:{level2:'2',level3:'3',level4:'4'}},
						{type:'gridbuttons',label:'見出しタイプ',filter:'heading_type',values:['header','headline','catch']},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{
								input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage,
								cond:(!states.isTemplate || !headerImageCode)
							}
						]},
						{label:'リード',values:'hasLead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'背景色',values:'hasBackgroundColor'},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:'パターン画像',values:'hasPatternImage',sub:[
							{input:'pattern',css:'patternImageCss',sel:'#'+id,color},
						]},
						{label:'フレーム画像',values:'hasFrameImage',sub:[
							{input:'frame',css:'frameImageCss',sel:'#'+id,color},
						]},
						{label:'ボーダー画像',values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents',color},
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'ヘッダ画像コード',
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					column:[
						'color',
						'pattern',
						{label:'アイコン',values:'hasIcon',sub:[
							{input:'icon',color}
						]},
						{label:'画像',values:'hasImage',sub:[
							{input:'image',keys:imageKeys.image}
						]},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'線',values:{no_border:'なし',thin_border:'細',bold_border:'太'}},
						{label:'角丸',values:'round'},
						{label:'影',values:'shadow',sub:[{label:'内側',values:'inset'}]},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:'ボーダー画像',values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents',color},
						]},
						{
							label:'テンプレート',
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:'画像コード',
									key:'imageCode',
									cond:states.hasImage
								},
								{
									input:'text',
									label:'背景画像コード',
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					]
				},
				bind:{
					scene:['level2'],
					column:['level3']
				}
			}
		];
		
		var level=CP.getNumberClass({attr:attributes},'level');
		
		
        return [
			<BlockControls>
				<CP.AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>,
			<SectionTag id={id} className={classes}>
				{states.hasImage && 
					<div class="image">
						{(states.isTemplate && imageCode)?(
							<CP.DummyImage text={imageCode}/>
						):(
							<CP.SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								size={imageSizes.image}
							/>
						)}
					</div>
				}
				<div class='contents'>
					<header class='header'>
						<div class="title">
							{states.hasIcon && 
								<div class="icon">
									<img src={iconSrc} alt={iconAlt}/>
								</div>
							}
							{states.hasPrefix && 
								<div class="prefix">
									<RichText tagName="div" value={prefix} onChange={(prefix)=>setAttributes({prefix})}/>
								</div>
							}
							{states.hasHeaderImage &&
								<div class="image">
									{(states.isTemplate && headerImageCode)?(
										<CP.DummyImage text={headerImageCode}/>
									):(
										<CP.SelectResponsiveImage
											set={setAttributes}
											attr={attributes}
											keys={imageKeys.headerImage}
											size={imageSizes.headerImage}
										/>
									)}
								</div>
							}
							<HeadingTag className="heading">
								<RichText tagName="div" value={title} onChange={(title)=>setAttributes({title})}/>
							</HeadingTag>
							{states.hasLead && 
								<p className="lead"><RichText tagName="div" value={lead} onChange={(lead)=>setAttributes({lead})}/></p>
							}
						</div>
						
						{states.hasHeaderBackgroundImage && 
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									<CP.DummyImage text={headerBackgroundImageCode}/>
								):(
									<CP.SelectResponsiveImage
										set={setAttributes}
										attr={attributes}
										keys={imageKeys.headerBackgroundImage}
									/>
								)}
							</div>
						}
					</header>
					<div class="text"><InnerBlocks/></div>
				</div>
				{states.hasBackgroundImage && 
					<div class="background">
						{(states.isTemplate && backgroundImageCode)?(
							<CP.DummyImage text={backgroundImageCode}/>
						):(
							<CP.SelectResponsiveImage
								set={setAttributes}
								attr={attributes}
								keys={imageKeys.backgroundImage}
							/>
						)}
					</div>
				}
				{states.hasPatternImage && (
					<style>{patternImageCss}</style>
				)}
				{states.hasHeaderPatternImage && (
					<style>{headerPatternImageCss}</style>
				)}
				{states.hasBorderImage && (
					<style>{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style>{frameImageCss}</style>
				)}
			</SectionTag>,
			<InspectorControls>
				<CP.SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.section || {}}
				/>
				<PanelBody title="ID" icon="admin-links" initialOpen={false}>
					<TextControl
						label='ID'
						onChange={(id)=>{setAttributes({id:id});}}
						value={id}
					/>
				</PanelBody>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classes}
					/>
				</PanelBody>
			</InspectorControls>
        ];
    },
	save({attributes,className,setAttributes}){
        const {
			SectionTag,HeadingTag,
			id,navIcon,classes,prefix,title,lead,
			headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
			headerBackgroundImageCode,
			imageSrc,imageSrcset,imageAlt,imageCode,
			backgroundImageSrc,backgroundImageCode,
			headerPatternImageCss,patternImageCss,frameImageCss,borderImageCss,
			iconSrc,iconAlt
		}=attributes;
		
		var level=CP.getNumberClass({attr:attributes},'level');
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys,imageSizes}=CP.config.section;
		
		return (
			<SectionTag id={id} className={classes} data-icon={navIcon}>
				{states.hasImage && 
					<div class="image">
						{(states.isTemplate && imageCode)?(
							imageCode
						):(
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								size='medium_large'
							/>
						)}
					</div>
				}
				<div class="contents">
					<header class='header'>
						<div class="title">
							{states.hasIcon && 
								<div class="icon">
									<img src={iconSrc} alt={iconAlt}/>
								</div>
							}
							{states.hasPrefix && 
								<div class="prefix"><RichText.Content value={prefix}/></div>
							}
							{states.hasHeaderImage &&
								<div class="image">
									{(states.isTemplate && headerImageCode)?(
										headerImageCode
									):(
										<CP.ResponsiveImage
											attr={attributes}
											keys={imageKeys.headerImage}
										/>
									)}
								</div>
							}
							<HeadingTag className="heading">
								<RichText.Content value={title}/>
							</HeadingTag>
							{states.hasLead && <p className="lead"><RichText.Content value={lead}/></p>}
						</div>
						{states.hasHeaderBackgroundImage &&
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									headerBackgroundImageCode
								):(
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.headerBackgroundImage}
										devices={devices}
									/>
								)}
							</div>
						}
					</header>
					<div class="text"><InnerBlocks.Content/></div>
				</div>
				{states.hasBackgroundImage && 
					<div class="background">
						{(states.isTemplate && backgroundImageCode)?(
							backgroundImageCode
						):(
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
								devices={devices}
							/>
						)}
					</div>
				}
				{states.hasPatternImage && (
					<style className="patternImageCss">{patternImageCss}</style>
				)}
				{states.hasHeaderPatternImage && (
					<style className="headerPatternImageCss">{headerPatternImageCss}</style>
				)}
				{states.hasBorderImage && (
					<style className="borderImageCss">{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style className="frameImageCss">{frameImageCss}</style>
				)}
			</SectionTag>
		);
	},
	deprecated:[
		{
			attributes:{
				id:{source:'attribute',selector:'section',attribute:'id'},
				classes:{source:'attribute',selector:'section',attribute:'class',default:'wp-block-catpow-section article level3 center catch'},
				navIcon:{source:'attribute',selector:'section',attribute:'data-icon'},

				prefix:{source:'children',selector:'header div.prefix'},
				title:{type:'array',source:'children',selector:'header h2,header .heading',default:['Title']},
				read:{type:'array',source:'children',selector:'header p'},

				headerImageMime:{source:'attribute',selector:'header .image [src]',attribute:'data-mime'},
				headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
				headerImageSrcset:{source:'attribute',selector:'header .image [src]',attribute:'srcset'},
				headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
				headerImageCode:{source:'text',selector:'header .image'},

				headerBackgroundImageMime:{source:'attribute',selector:'header .background [src]',attribute:'data-mime'},
				headerBackgroundImageSrc:{source:'attribute',selector:'header .background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
				headerBackgroundImageSrcset:{source:'attribute',selector:'header .background [src]',attribute:'srcset'},
				headerBackgroundImageAlt:{source:'attribute',selector:'header .background [src]',attribute:'alt'},
				headerBackgroundImageCode:{source:'text',selector:'header .background'},

				imageMime:{source:'attribute',selector:'.image [src]',attribute:'data-mime'},
				imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
				imageSrcset:{source:'attribute',selector:'.image [src]',attribute:'srcset'},
				imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
				imageCode:{source:'text',selector:'.image'},

				backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
				backgroundImageSrcset:{source:'attribute',selector:'.wp-block-catpow-section>.background [src]',attribute:'srcset'},
				backgroundImageCode:{source:'text',selector:'.wp-block-catpow-section>.background'},

				iconSrc:{source:'attribute',selector:'.icon [src]',attribute:'src',default:cp.theme_url+'/images/dummy_icon.svg'},
				iconAlt:{source:'attribute',selector:'.icon [src]',attribute:'alt'},
			},
			save({attributes,className}){
				const {
					id,navIcon,classes,prefix,title,read,
					headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
					headerBackgroundImageCode,
					imageSrc,imageSrcset,imageAlt,imageCode,
					backgroundImageSrc,backgroundImageCode,
					iconSrc,iconAlt
				}=attributes;

				var states=CP.wordsToFlags(classes);
				var level=CP.getNumberClass({attr:attributes},'level');

				const imageKeys={
					navIcon:{src:"icon"},
					image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt",srcset:"imageSrcset"},
					headerImage:{mime:"headerImageMime",src:"headerImageSrc",alt:"headerImageAlt",srcset:"headerImageSrcset"},
					headerBackgroundImage:{mime:"headerBackgroundImageMime",src:"headerBackgroundImageSrc",alt:"headerBackgroundImageAlt",srcset:"headerBackgroundImageSrcset"},
					backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset"}
				};

				return (
					<section id={id} className={classes} data-icon={navIcon}>
						{states.hasImage && 
							<div class="image">
								{(states.isTemplate && imageCode)?(
									imageCode
								):(
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										size='medium_large'
									/>
								)}
							</div>
						}
						<div class="contents">
							<header>
								<div class="title">
									{states.hasIcon && 
										<div class="icon">
											<img src={iconSrc} alt={iconAlt}/>
										</div>
									}
									{states.hasPrefix && 
										<div class="prefix"><RichText.Content value={prefix}/></div>
									}
									{states.hasHeaderImage &&
										<div class="image">
											{(states.isTemplate && headerImageCode)?(
												headerImageCode
											):(
												<CP.ResponsiveImage
													attr={attributes}
													keys={imageKeys.headerImage}
												/>
											)}
										</div>
									}
									<h2>{title}</h2>
									{states.hasRead && <p><RichText.Content value={read}/></p>}
								</div>
								{states.hasHeaderBackgroundImage &&
									<div class="background">
										{(states.isTemplate && headerBackgroundImageCode)?(
											headerBackgroundImageCode
										):(
											<CP.ResponsiveImage
												attr={attributes}
												keys={imageKeys.headerBackgroundImage}
											/>
										)}
									</div>
								}
							</header>
							<div class="text"><InnerBlocks.Content/></div>
						</div>
						{states.hasBackgroundImage && 
							<div class="background">
								{(states.isTemplate && backgroundImageCode)?(
									backgroundImageCode
								):(
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.backgroundImage}
									/>
								)}
							</div>
						}
					</section>
				);
			},
			migrate(attributes){
				attributes.classes+=' level2';
				return attributes;
			}
		}
	]
});