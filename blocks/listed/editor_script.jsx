registerBlockType('catpow/listed',{
	title: '🐾 Listed',
	description:'目次やお知らせなどの一覧ブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText';
					return createBlock('catpow/listed',attributes);
				},
			},
		]
	},
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'header .text h3'},
				titleCaption:{source:'children',selector:'header .text p'},
				
				headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src'},
				headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
				headerImageCode:{source:'text',selector:'header .image'},
				
				subImageSrc:{source:'attribute',selector:'.contents .image [src]',attribute:'src'},
				subImageAlt:{source:'attribute',selector:'.contents .image [src]',attribute:'alt'},
				subImageCode:{source:'text',selector:'.contents .image'},
				
				src:{source:'attribute',selector:'li>.image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'li>.image [src]',attribute:'alt'},
				imageCode:{source:'text',selector:'li>.image'},
				
				subTitle:{source:'children',selector:'.contents h4'},
				text:{source:'children',selector:'.contents p'},
				linkUrl:{source:'attribute',selector:'.link a',attribute:'href'},

				backgroundImageSrc:{source:'attribute',selector:'.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
				backgroundImageSrcset:{source:'attribute',selector:'.background [src]',attribute:'srcset'},
				backgroundImageCode:{source:'text',selector:'.background'},
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					titleCaption:['Caption'],
					headerImageSrc:cp.theme_url+'/images/dummy.jpg',
					headerImageAlt:'dummy',
					subTitle:['SubTitle'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					text:['Text'],
					linkUrl:cp.home_url
				}
			})
		},
		countPrefix:{source:'text',selector:'.counter .prefix',default:''},
		countSuffix:{source:'text',selector:'.counter .suffix',default:''},
		subCountPrefix:{source:'text',selector:'.subcounter .prefix',default:''},
		subCountSuffix:{source:'text',selector:'.subcounter .suffix',default:''},
		loopParam:{type:'text',default:''},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,countPrefix,countSuffix,subCountPrefix,subCountSuffix,loopCount}=attributes;
		const primaryClass='wp-block-catpow-listed';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states=CP.wordsToFlags(classes);
		
        
		var selectiveClasses=[
			{
				label:'タイプ',
				filter:'type',
				values:{
					orderd:'連番リスト',
					news:'お知らせ',
					index:'目次',
					menu:'メニュー'
				},
				sub:{
					orderd:[
						{label:'画像',values:'hasImage'},
						{input:'text',label:'番号前置テキスト',key:'countPrefix'},
						{input:'text',label:'番号後置テキスト',key:'countSuffix'},
						{label:'タイトルキャプション',values:'hasTitleCaption'},
						{label:'サブタイトル',values:'hasSubTitle'},
						{label:'リンク',values:'hasLink'}
					],
					news:[
						{label:'リンク',values:'hasLink'}
					],
					index:[
						{label:'レベル','values':['level0','level1','level2','level3']}
					],
					menu:[
						{label:'サイズ',values:['small','medium','large']},
						{label:'画像',values:{noImage:'なし',hasImage:'大',hasHeaderImage:'小'}},
						{label:'背景画像',values:'hasBackgroundImage',sub:[
							{label:'薄く',values:'paleBG'}
						]},
						{label:'背景色',values:'hasBackgroundColor'},
						{label:'抜き色文字',values:'inverseText'},
						{label:'タイトルキャプション',values:'hasTitleCaption'},
						{label:'テキスト',values:'hasText'},
						{label:'リンク',values:'hasLink'}
					]
				},
                bind:{
                    orderd:['hasHeader','hasCounter','hasTitle','hasText'],
					news:['hasText','hasSubTitle'],
					index:['hasHeader','hasTitle','hasText'],
					menu:['hasHeader','hasTitle']
                },
				item:{
					news:[],
					index:[],
					menu:['color'],
					sphere:['color']
				}
			},
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{label:'ループ',values:'doLoop',sub:[
						{label:'パラメータ',input:'text',key:'loopParam'},
						{label:'ループ数',input:'range',key:'loopCount',min:1,max:16}
					]}
				]
			}
		];
		const itemTemplateSelectiveClasses=[
			{
				input:'text',
				label:'画像コード',
				key:'imageCode',
				cond:states.hasImage
			},
			{
				input:'text',
				label:'ヘッダ画像コード',
				key:'headerImageCode',
				cond:states.hasHeaderImage
			},
			{
				input:'text',
				label:'サブ画像コード',
				key:'subImageCode',
				cond:states.hasSubImage
			}
		];
		
		const save=()=>{
			setAttibutes({items:JSON.parse(JSON.stringify(items))});
		};
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"},
			subImage:{src:"subImageSrc",alt:"subImageAlt",code:"subImageCode",items:"items"},
			backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset",code:"backgroundImageCode",items:"items"},
		};

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
				>
					{states.hasImage && 
						<div class="image">
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								index={index}
								size='vga'
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasHeader &&
						<header>
							{states.hasCounter &&
								<div className='counter'>
									{countPrefix && <span class="prefix">{countPrefix}</span>}
									<span className="number">{index+1}</span>
									{countSuffix && <span class="suffix">{countSuffix}</span>}
								</div>
							}
							{states.hasHeaderImage && 
								<div class="image">
									<SelectResponsiveImage
										attr={attributes}
										set={setAttributes}
										keys={imageKeys.headerImage}
										index={index}
										size='thumbnail'
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<div className='text'>
								{states.hasTitle &&
									<h3>
										<RichText
											onChange={(title)=>{item.title=title;save();}}
											value={item.title}
										/>
									</h3>
								}
								{states.hasTitle && states.hasTitleCaption && 
									<p>
										<RichText
											onChange={(titleCaption)=>{item.titleCaption=titleCaption;save();}}
											value={item.titleCaption}
										/>
									</p>
								}
							</div>
						</header>
					}
					{(states.hasSubImage || states.hasSubTitle || states.hasText) && 
						<div class="contents">
							{states.hasSubCounter &&
								<div className='subcounter'>
									{subCountPrefix && <span class="prefix">{subCountPrefix}</span>}
									<span className="number">{index+1}</span>
									{subCountSuffix && <span class="suffix">{subCountSuffix}</span>}
								</div>
							}
							{states.hasSubImage && 
								<div class="image">
									<SelectResponsiveImage
										attr={attributes}
										set={setAttributes}
										keys={imageKeys.subImage}
										index={index}
										size='medium'
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{states.hasSubTitle &&
								<h4>
									<RichText
										onChange={(subTitle)=>{item.subTitle=subTitle;save();}}
										value={item.subTitle}
										placeholder='SubTitle'
									/>
								</h4>
							}
							{states.hasText && 
								<p>
									<RichText
										onChange={(text)=>{item.text=text;save();}}
										value={item.text}
									/>
								</p>
							}
						</div>
					}
					{states.hasBackgroundImage &&
						<div className='background'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.backgroundImage}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasLink && isSelected &&
						<div className='link'>
							<p
								contentEditable
								onBlur={(e)=>{
									item.linkUrl=e.currentTarget.innerHTML;
									save();
								}}
							>{item.linkUrl}</p>
						</div>
					}
				</Item>
			);
		});
		
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
		if(rtn.length<loopCount){
			let len=rtn.length;
			while(rtn.length<loopCount){
				rtn.push(rtn[rtn.length%len]);
			}
		}
		
        return (
			<Fragment>
				<BlockControls>
					<Toolbar
						controls={[
							{
								icon: 'edit',
								title: 'EditMode',
								isActive: attributes.EditMode,
								onClick: () => setAttributes({EditMode:!attributes.EditMode})
							}
						]}
					/>
				</BlockControls>
				<InspectorControls>
					<SelectClassPanel
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
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<SelectItemClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses[0]}
						filters={CP.filters.listed || {}}
					/>
					{states.isTemplate &&
						<SelectItemClassPanel
							title='テンプレート'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							itemClasses={itemTemplateSelectiveClasses}
							filters={CP.filters.listed || {}}
						/>
					}
					<ItemControlInfoPanel/>
				</InspectorControls>
				{attributes.EditMode?(
					<EditItemsTable
						set={setAttributes}
						attr={attributes}
						columns={[
							{type:'image',label:'image',keys:imageKeys.image,cond:states.hasImage},
							{type:'text',key:'imageCode',cond:states.isTemplate && states.hasImage},
							{type:'image',label:'sub',keys:imageKeys.subImage,cond:states.hasSubImage},
							{type:'text',key:'subImageCode',cond:states.isTemplate && states.hasSubImage},
							{type:'image',label:'header',keys:imageKeys.headerImage,cond:states.hasHeaderImage},
							{type:'text',key:'headerImageCode',cond:states.isTemplate && states.hasHeaderImage},
							{type:'image',label:'bg',keys:imageKeys.backgroundImage,cond:states.hasBackgroundImage},
							{type:'text',key:'backgroundImageCode',cond:states.isTemplate && states.hasBackgroundImage},
							{type:'text',key:'title',cond:states.hasTitle},
							{type:'text',key:'titleCaption',cond:states.hasTitleCaption},
							{type:'text',key:'subTitle',cond:states.hasSubTitle},
							{type:'text',key:'text',cond:states.hasText},
							{type:'text',key:'linkUrl',cond:states.hasLink}
						]}
						isTemplate={states.isTemplate}
					/>
				):(
					<ul className={classes}>{rtn}</ul>
				)}
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items,classes,countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		
		const imageKeys={
			image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"},
			subImage:{src:"subImageSrc",alt:"subImageAlt",code:"subImageCode",items:"items"},
			backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset",code:"backgroundImageCode",items:"items"},
		};
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					{states.hasImage &&
						<div className='image'>
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasHeader &&
						<header>
							{states.hasCounter &&
								<div className='counter'>
									{countPrefix && <span class="prefix">{countPrefix}</span>}
									<span className="number">{index+1}</span>
									{countSuffix && <span class="suffix">{countSuffix}</span>}
								</div>
							}
							{states.hasHeaderImage &&
								<div className='image'>
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.headerImage}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<div className='text'>
								{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
								{states.hasTitle && states.hasTitleCaption && <p><RichText.Content value={item.titleCaption}/></p>}
							</div>
						</header>
					}
					{(states.hasSubImage || states.hasSubTitle || states.hasText) && 
						<div class="contents">
							{states.hasSubCounter &&
								<div className='subcounter'>
									{subCountPrefix && <span class="prefix">{subCountPrefix}</span>}
									<span className="number">{index+1}</span>
									{subCountSuffix && <span class="suffix">{subCountSuffix}</span>}
								</div>
							}
							{states.hasSubImage &&
								<div className='image'>
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.subImage}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{states.hasSubTitle && <h4><RichText.Content value={item.subTitle}/></h4>}
							{states.hasText && <p><RichText.Content value={item.text}/></p>}
						</div>
					}
					{states.hasBackgroundImage && 
						<div className='background'>
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.backgroundImage}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasLink && item.linkUrl && <div className='link'><a href={item.linkUrl}> </a></div>}
				</li>
			);
		});
		return (
			<ul className={classes}>
				{states.doLoop && '[loop_template '+(loopParam || '')+']'}
				{rtn}
				{states.doLoop && '[/loop_template]'}
			</ul>
		);
	},
});