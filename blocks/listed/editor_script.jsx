CP.config.listed={
	imageKeys:{
		image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
		headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"},
		subImage:{src:"subImageSrc",alt:"subImageAlt",code:"subImageCode",items:"items"},
		backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset",code:"backgroundImageCode",items:"items"},
	}
};

wp.blocks.registerBlockType('catpow/listed',{
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
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {items=[],TitleTag,SubTitleTag,classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-listed';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');

		var states=CP.wordsToFlags(classes);


		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'titleTag',input:'buttons',filter:'titleTag',key:'TitleTag',label:'タイトルタグ',values:['h2','h3','h4'],effect:(val,{set})=>{
					if(/^h\d$/.test(val)){set({SubTitleTag:'h'+(parseInt(val[1])+1)})}
				}},
				{name:'titleTag',input:'buttons',filter:'subTitleTag',key:'SubTitleTag',label:'サブタイトルタグ',values:['h3','h4','h5'],cond:'hasSubTitle'},
				{
					name:'type',
					label:'タイプ',
					filter:'type',
					type:'gridbuttons',
					values:{
						orderd:'連番リスト',
						news:'お知らせ',
						index:'目次',
						menu:'メニュー'
					},
					sub:{
						orderd:[
							{name:'image',label:'画像',values:'hasImage'},
							{name:'countPrefix',input:'text',label:'番号前置テキスト',key:'countPrefix'},
							{name:'countSuffix',input:'text',label:'番号後置テキスト',key:'countSuffix'},
							{name:'titleCaption',label:'タイトルキャプション',values:'hasTitleCaption'},
							{name:'subTitle',label:'サブタイトル',values:'hasSubTitle'},
							{name:'link',label:'リンク',values:'hasLink'}
						],
						news:[
							{name:'link',label:'リンク',values:'hasLink'}
						],
						index:[
							{name:'level',label:'レベル','values':['level0','level1','level2','level3']}
						],
						menu:[
							{name:'size',type:'buttons',label:'サイズ',values:['small','medium','large']},
							{name:'image',type:'buttons',label:'画像',values:{noImage:'なし',hasImage:'大',hasHeaderImage:'小'}},
							{name:'backgroundImage',label:'背景画像',values:'hasBackgroundImage',sub:[
								{name:'paleBG',label:'薄く',values:'paleBG'}
							]},
							{name:'backgroundColor',label:'背景色',values:'hasBackgroundColor'},
							{name:'inverseText',label:'抜き色文字',values:'inverseText'},
							{name:'titleCaption',label:'タイトルキャプション',values:'hasTitleCaption'},
							{name:'text',label:'テキスト',values:'hasText'},
							{name:'link',label:'リンク',values:'hasLink'}
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
					name:'template',
					label:'テンプレート',
					values:'isTemplate',
					sub:[
						{name:'loop',input:'bool',label:'ループ',key:'doLoop',sub:[
							{name:'contentPath',label:'content path',input:'text',key:'content_path'},
							{name:'query',label:'query',input:'textarea',key:'query'},
							{name:'loopCount',label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
						]}
					]
				}
			];
			wp.hooks.applyFilters('catpow.blocks.listed.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemTemplateClasses=useMemo(()=>{
			const selectiveItemTemplateClasses=[
				{
					name:'imageCode',
					input:'text',
					label:'画像コード',
					key:'imageCode',
					cond:'hasImage'
				},
				{
					name:'headerImageCode',
					input:'text',
					label:'ヘッダ画像コード',
					key:'headerImageCode',
					cond:'hasHeaderImage'
				},
				{
					name:'subImageCode',
					input:'text',
					label:'サブ画像コード',
					key:'subImageCode',
					cond:'hasSubImage'
				}
			];
			wp.hooks.applyFilters('catpow.blocks.listed.selectiveItemTemplateClasses',CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		},[]);

		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		let rtn=[];
		const {imageKeys}=CP.config.listed;

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
					key={index}
				>
					{states.hasImage && 
						<div className="image">
							<CP.SelectResponsiveImage
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
						<header className="header">
							{states.hasCounter &&
								<div className='counter'>
									{countPrefix && <span className="prefix">{countPrefix}</span>}
									<span className="number">{index+1}</span>
									{countSuffix && <span className="suffix">{countSuffix}</span>}
								</div>
							}
							{states.hasHeaderImage && 
								<div className="image">
									<CP.SelectResponsiveImage
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
									<RichText
										tagName={TitleTag}
										className="title"
										onChange={(title)=>{item.title=title;save();}}
										value={item.title}
									/>
								}
								{states.hasTitle && states.hasTitleCaption && 
									<RichText
										className="titlecaption"
										onChange={(titleCaption)=>{item.titleCaption=titleCaption;save();}}
										value={item.titleCaption}
									/>
								}
							</div>
						</header>
					}
					{(states.hasSubImage || states.hasSubTitle || states.hasText) && 
						<div className="contents">
							{states.hasSubCounter &&
								<div className='subcounter'>
									{subCountPrefix && <span className="prefix">{subCountPrefix}</span>}
									<span className="number">{index+1}</span>
									{subCountSuffix && <span className="suffix">{subCountSuffix}</span>}
								</div>
							}
							{states.hasSubImage && 
								<div className="image">
									<CP.SelectResponsiveImage
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
								<RichText
									tagName={SubTitleTag}
									className="subtitle"
									onChange={(subTitle)=>{item.subTitle=subTitle;save();}}
									value={item.subTitle}
									placeholder='SubTitle'
								/>
							}
							{states.hasText && 
								<RichText
									tagName="p"
									className="text"
									onChange={(text)=>{item.text=text;save();}}
									value={item.text}
								/>
							}
						</div>
					}
					{states.hasBackgroundImage &&
						<div className='background'>
							<CP.SelectResponsiveImage
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
				</CP.Item>
			);
		});

		if(rtn.length<loopCount){
			let len=rtn.length;
			while(rtn.length<loopCount){
				rtn.push(rtn[rtn.length%len]);
			}
		}

		return (
			<>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
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
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses[2]}
						filters={CP.filters.listed || {}}
					/>
					{states.isTemplate &&
						<CP.SelectClassPanel
							title='テンプレート'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={selectiveItemTemplateClasses}
							filters={CP.filters.listed || {}}
						/>
					}
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{EditMode?(
					<div className="alt_content">
						<div className="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
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
					</div>
				):(
					<>
						{(AltMode && doLoop)?(
							<div className="alt_content">
								<div className="label">
									<Icon icon="welcome-comments"/>
								</div>
								<InnerBlocks/>
							</div>
						):(
							<ul className={classes}>{rtn}</ul>
						)}
					</>
				)}
			</>
		);
	},
	save({attributes,className}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {items=[],TitleTag,SubTitleTag,classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam,doLoop}=attributes;
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.listed;

		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes} key={index}>
					{states.hasImage &&
						<div className='image'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					{states.hasHeader &&
						<header className="header">
							{states.hasCounter &&
								<div className='counter'>
									{countPrefix && <span className="prefix">{countPrefix}</span>}
									<span className="number">{index+1}</span>
									{countSuffix && <span className="suffix">{countSuffix}</span>}
								</div>
							}
							{states.hasHeaderImage &&
								<div className='image'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.headerImage}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<div className='text'>
								{states.hasTitle && <RichText.Content tagName={TitleTag} className="title" value={item.title}/>}
								{states.hasTitle && states.hasTitleCaption && <RichText.Content tagName="p" className="titlecaption" value={item.titleCaption}/>}
							</div>
						</header>
					}
					{(states.hasSubImage || states.hasSubTitle || states.hasText) && 
						<div className="contents">
							{states.hasSubCounter &&
								<div className='subcounter'>
									{subCountPrefix && <span className="prefix">{subCountPrefix}</span>}
									<span className="number">{index+1}</span>
									{subCountSuffix && <span className="suffix">{subCountSuffix}</span>}
								</div>
							}
							{states.hasSubImage &&
								<div className='image'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.subImage}
										index={index}
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							{states.hasSubTitle && <RichText.Content tagName={SubTitleTag} className="subtitle" value={item.subTitle}/>}
							{states.hasText && <RichText.Content tagName="p" className="text" value={item.text}/>}
						</div>
					}
					{states.hasBackgroundImage && 
						<div className='background'>
							<CP.ResponsiveImage
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
			<>
				<ul className={classes}>
					{rtn}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</>
		);
	},
	deprecated:[
		{
			save({attributes,className}){
				const {items=[],classes='',countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam}=attributes;
				var classArray=_.uniq(classes.split(' '));

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
									<CP.ResponsiveImage
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
											{countPrefix && <span className="prefix">{countPrefix}</span>}
											<span className="number">{index+1}</span>
											{countSuffix && <span className="suffix">{countSuffix}</span>}
										</div>
									}
									{states.hasHeaderImage &&
										<div className='image'>
											<CP.ResponsiveImage
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
								<div className="contents">
									{states.hasSubCounter &&
										<div className='subcounter'>
											{subCountPrefix && <span className="prefix">{subCountPrefix}</span>}
											<span className="number">{index+1}</span>
											{subCountSuffix && <span className="suffix">{subCountSuffix}</span>}
										</div>
									}
									{states.hasSubImage &&
										<div className='image'>
											<CP.ResponsiveImage
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
									<CP.ResponsiveImage
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
			migrate(attributes){
				var states=CP.wordsToFlags(classes);
				attributes.content_path=attributes.loopParam.split(' ')[0];
				attributes.query=attributes.loopParam.split(' ').slice(1).join("\n");
				attributes.doLoop=states.doLoop;
				return attributes;
			}
		}
	]
});