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
	description:__('見出しと内容のまとまりを表すセクションのブロックです。','catpow'),
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
			{input:'buttons',filter:'sectionTag',key:'SectionTag',label:__('セクションタグ','catpow'),values:['article','section','aside','div']},
			{input:'buttons',filter:'headingTag',key:'HeadingTag',label:__('見出しタグ','catpow'),values:['h2','h3','h4'],effect:(val)=>{
				for(const key in states){
					if(key.substr(0,5)==='level'){states[key]=false;}
				}
				if(/^h\d$/.test(val)){states['level'+val[1]]=true;}
				setAttributes({classes:CP.flagsToWords(states)});
			}},
			{
				label:__('タイプ','catpow'),
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
						{label:__('プレフィクス','catpow'),values:'hasPrefix'},
						{label:__('ヘッダ画像','catpow'),values:'hasHeaderImage',sub:[
							{input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage}
						]},
						{label:__('ヘッダ背景画像','catpow'),values:'hasHeaderBackgroundImage',sub:[
							{input:'picture',label:__('背景画像','catpow'),keys:imageKeys.headerBackgroundImage,devices},
							{label:__('薄く','catpow'),values:'paleHeaderBG'}
						]},
						{label:__('抜き色文字','catpow'),values:'inverseText',sub:[
							{label:__('ヘッダ背景色','catpow'),values:'hasHeaderBackgroundColor',sub:[
								{label:__('パターン画像','catpow'),values:'hasHeaderPatternImage',sub:[
									{input:'pattern',css:'headerPatternImageCss',sel:'#'+id+' > .contents > .header'},
								]}
							]}
						]},
						{label:__('リード','catpow'),values:'hasLead'},
						{label:__('背景画像','catpow'),values:'hasBackgroundImage',sub:[
							{input:'picture',label:__('背景画像','catpow'),keys:imageKeys.backgroundImage,devices},
							{label:__('薄く','catpow'),values:'paleBG'}
						]},
						{label:__('背景色','catpow'),values:'hasBackgroundColor'},
						{label:__('メニューアイコン','catpow'),values:'hasNavIcon',sub:[
							{input:'image',label:__('アイコン','catpow'),keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{
							label:__('テンプレート','catpow'),
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:__('ヘッダ画像コード','catpow'),
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:__('ヘッダ背景画像コード','catpow'),
									key:'headerBackgroundImageCode',
									cond:states.hasHeaderBackgroundImage
								},
								{
									input:'text',
									label:__('背景画像コード','catpow'),
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					article:[
						'color',
						{type:'buttons',label:__('レベル','catpow'),values:{level2:'2',level3:'3',level4:'4'}},
						{type:'gridbuttons',label:__('見出しタイプ','catpow'),filter:'heading_type',values:['header','headline','catch']},
						{label:__('ヘッダ画像','catpow'),values:'hasHeaderImage',sub:[
							{
								input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage,
								cond:(!states.isTemplate || !headerImageCode)
							}
						]},
						{label:__('リード','catpow'),values:'hasLead'},
						{label:__('背景画像','catpow'),values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:__('薄く','catpow'),values:'paleBG'}
						]},
						{label:__('背景色','catpow'),values:'hasBackgroundColor'},
						{label:__('メニューアイコン','catpow'),values:'hasNavIcon',sub:[
							{input:'image',label:__('アイコン','catpow'),keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:__('パターン画像','catpow'),values:'hasPatternImage',sub:[
							{input:'pattern',css:'patternImageCss',sel:'#'+id,color},
						]},
						{label:__('フレーム画像','catpow'),values:'hasFrameImage',sub:[
							{input:'frame',css:'frameImageCss',sel:'#'+id,color},
						]},
						{label:__('ボーダー画像','catpow'),values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents',color},
						]},
						{
							label:__('テンプレート','catpow'),
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:__('ヘッダ画像コード','catpow'),
									key:'headerImageCode',
									cond:states.hasHeaderImage
								},
								{
									input:'text',
									label:__('背景画像コード','catpow'),
									key:'backgroundImageCode',
									cond:states.hasBackgroundImage
								}
							]
						}
					],
					column:[
						'color',
						'pattern',
						{label:__('アイコン','catpow'),values:'hasIcon',sub:[
							{input:'icon',color}
						]},
						{label:__('画像','catpow'),values:'hasImage',sub:[
							{input:'image',keys:imageKeys.image}
						]},
						{label:__('背景画像','catpow'),values:'hasBackgroundImage',sub:[
							{input:'picture',keys:imageKeys.backgroundImage,devices,cond:(!states.isTemplate || !backgroundImageCode)},
							{label:__('薄く','catpow'),values:'paleBG'}
						]},
						{label:__('線','catpow'),values:{no_border:__('なし','catpow'),thin_border:__('細','catpow'),bold_border:__('太','catpow')}},
						{label:__('角丸','catpow'),values:'round'},
						{label:__('影','catpow'),values:'shadow',sub:[{label:__('内側','catpow'),values:'inset'}]},
						{label:__('メニューアイコン','catpow'),values:'hasNavIcon',sub:[
							{input:'image',label:__('アイコン','catpow'),keys:imageKeys.navIcon,size:'thumbnail'}
						]},
						{label:__('ボーダー画像','catpow'),values:'hasBorderImage',sub:[
							{input:'border',css:'borderImageCss',sel:'#'+id+' > .contents',color},
						]},
						{
							label:__('テンプレート','catpow'),
							values:'isTemplate',
							sub:[
								{
									input:'text',
									label:__('画像コード','catpow'),
									key:'imageCode',
									cond:states.hasImage
								},
								{
									input:'text',
									label:__('背景画像コード','catpow'),
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
					title={__('クラス','catpow')}
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
						label={__('クラス','catpow')}
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