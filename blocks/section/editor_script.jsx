registerBlockType('catpow/section',{
	title: '🐾 Section',
	description:'見出しと内容のまとまりを表すセクションのブロックです。',
	icon: 'id-alt',
	category: 'catpow',
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
	example:CP.example,
	edit({attributes,className,setAttributes}){
        const {
			id,classes,prefix,title,read,
			headerImageMime,headerImageSrc,headerImageSrcset,headerImageAlt,headerImageCode,
			headerBackgroundImageCode,
			imageMime,imageSrc,imageSrcset,imageAlt,imageCode,
			backgroundImageSrc,backgroundImageCode,
			iconSrc,iconAlt
		}=attributes;
		const primaryClass='wp-block-catpow-section';
		var classArray=_.uniq((className+' '+classes).split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		const imageKeys={
			navIcon:{src:"navIcon"},
			image:{mime:"imageMime",src:"imageSrc",alt:"imageAlt",srcset:"imageSrcset"},
			headerImage:{mime:"headerImageMime",src:"headerImageSrc",alt:"headerImageAlt",srcset:"headerImageSrcset"},
			headerBackgroundImage:{mime:"headerBackgroundImageMime",src:"headerBackgroundImageSrc",alt:"headerBackgroundImageAlt",srcset:"headerBackgroundImageSrcset"},
			backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset"}
		};
		const imageSizes={
			image:'medium',
			headerImage:'medium_large'
		};
		
		const selectiveClasses=[
			{
				label:'タイプ',
				filter:'type',
				values:[
					'scene',
					'article',
					'column'
				],
				sub:{
					scene:[
						'color',
						'pattern',
						{label:'プレフィクス',values:'hasPrefix'},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage}
						]},
						{label:'ヘッダ背景画像',values:'hasHeaderBackgroundImage',sub:[
							{input:'image',label:'PC版背景画像',keys:imageKeys.headerBackgroundImage},
							{input:'image',label:'SP版背景画像',keys:imageKeys.headerBackgroundImage,ofSP:true,sizes:'480px'},
							{label:'薄く',values:'paleHeaderBG'}
						]},
						{label:'抜き色文字',values:'inverseText',sub:[
							{label:'ヘッダ背景色',values:'hasHeaderBackgroundColor'}
						]},
						{label:'リード',values:'hasRead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage},
							{input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,ofSP:true,sizes:'480px'},
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
						{label:'レベル',values:{level2:'2',level3:'3',level4:'4'}},
						{label:'見出しタイプ',filter:'heading_type',values:{header:'ヘッダ',headline:'ヘッドライン',catch:'キャッチ'}},
						{label:'ヘッダ画像',values:'hasHeaderImage',sub:[
							{
								input:'image',keys:imageKeys.headerImage,size:imageSizes.headerImage,
								cond:(!states.isTemplate || !headerImageCode)
							}
						]},
						{label:'リード',values:'hasRead'},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{
								input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage,
								cond:(!states.isTemplate || !backgroundImageCode)
							},
							{
								input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,
								ofSP:true,sizes:'480px',
								cond:(!states.isTemplate || !backgroundImageCode)
							},
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
							{input:'icon'}
						]},
						{label:'画像',values:'hasImage',sub:[
							{input:'image',keys:imageKeys.image}
						]},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage},
							{input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,ofSP:true,sizes:'480px'},
							{label:'薄く',values:'paleBG'}
						]},
						{label:'線',values:{no_border:'なし',thin_border:'細',bold_border:'太'}},
						{label:'角丸',values:'round'},
						{label:'影',values:'shadow',sub:[{label:'内側',values:'inset'}]},
						{label:'メニューアイコン',values:'hasNavIcon',sub:[
							{input:'image',label:'アイコン',keys:imageKeys.navIcon,size:'thumbnail'}
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
					scene:['level1'],
					column:['level3']
				}
			}
		];
		
		var level=CP.getNumberClass({attr:attributes},'level');
		
        return [
			<BlockControls>
				<AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>,
			<section id={id} className={classArray.join(' ')}>
				{states.hasImage && 
					<div class="image">
						{(states.isTemplate && imageCode)?(
							<DummyImage text={imageCode}/>
						):(
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								size={imageSizes.image}
							/>
						)}
					</div>
				}
				<div class='contents'>
					<header>
						<div class="title">
							{states.hasIcon && 
								<div class="icon">
									<img src={iconSrc} alt={iconAlt}/>
								</div>
							}
							{states.hasPrefix && 
								<div class="prefix">
									<RichText tagName="div" value={prefix} onChange={(prefix)=>setAttributes({prefix:prefix})}/>
								</div>
							}
							{states.hasHeaderImage &&
								<div class="image">
									{(states.isTemplate && headerImageCode)?(
										<DummyImage text={headerImageCode}/>
									):(
										<SelectResponsiveImage
											set={setAttributes}
											attr={attributes}
											keys={imageKeys.headerImage}
											size={imageSizes.headerImage}
										/>
									)}
								</div>
							}
							{el('h'+level,{className:'heading'},<RichText tagName="div" value={title} onChange={(title)=>setAttributes({title:title})}/>)}
							{states.hasRead && 
								<p><RichText tagName="div" value={read} onChange={(read)=>setAttributes({read:read})}/></p>
							}
						</div>
						
						{states.hasHeaderBackgroundImage && 
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									<DummyImage text={headerBackgroundImageCode}/>
								):(
									<SelectResponsiveImage
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
							<DummyImage text={backgroundImageCode}/>
						):(
							<SelectResponsiveImage
								set={setAttributes}
								attr={attributes}
								keys={imageKeys.backgroundImage}
							/>
						)}
					</div>
				}
			</section>,
			<InspectorControls>
				<SelectClassPanel
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
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
			</InspectorControls>
        ];
    },
	save({attributes,className,setAttributes}){
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
							<ResponsiveImage
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
										<ResponsiveImage
											attr={attributes}
											keys={imageKeys.headerImage}
										/>
									)}
								</div>
							}
							{el('h'+level,{className:'heading'},title)}
							{states.hasRead && <p><RichText.Content value={read}/></p>}
						</div>
						{states.hasHeaderBackgroundImage &&
							<div class="background">
								{(states.isTemplate && headerBackgroundImageCode)?(
									headerBackgroundImageCode
								):(
									<ResponsiveImage
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
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
							/>
						)}
					</div>
				}
			</section>
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
									<ResponsiveImage
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
												<ResponsiveImage
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
											<ResponsiveImage
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
									<ResponsiveImage
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