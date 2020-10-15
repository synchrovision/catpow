registerBlockType('catpow/lightbox',{
	title: '🐾 Lightbox',
	description:'クリックでポップアップ表示する画像です。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-lightbox medium hasTitle hasImage hasText';
					return createBlock('catpow/lightbox',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,boxClasses,blockState,loopCount,doLoop,EditMode=false,AltMode=false,OpenMode=false,currentItemIndex=0}=attributes;
		const primaryClass='wp-block-catpow-lightbox';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states=CP.wordsToFlags(classes);
        
		var selectiveClasses=[
			{label:'サイズ',values:['small','medium','large']},
			{label:'サムネール画像',values:'hasHeaderImage'},
			{label:'タイトル',values:'hasTitle'},
			{label:'タイトルキャプション',values:'hasTitleCaption'},
			{label:'画像',values:'hasImage'},
			{label:'タイトル',values:'hasSubTitle'},
			{label:'テキスト',values:'hasText'},
			{label:'ボックスサイズ',values:['small','medium','large'],key:'boxClasses'},
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{input:'bool',label:'ループ',key:'doLoop',sub:[
						{label:'content path',input:'text',key:'content_path'},
						{label:'query',input:'textarea',key:'query'},
						{label:'プレビューループ数',input:'range',key:'loopCount',min:1,max:16}
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
			}
		];
		const save=()=>{
			setAttibutes({items:JSON.parse(JSON.stringify(items))});
		};
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"}
		};
		
		const AnyMode=AltMode || EditMode || OpenMode;
		
		
		items.map((item,index)=>{
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
				>
					<header>
						{states.hasHeaderImage &&
							<div className='image'>
								<SelectResponsiveImage
									attr={attributes}
									set={setAttributes}
									keys={imageKeys.headerImage}
									index={index}
									size='vga'
									isTemplate={states.isTemplate}
								/>
							</div>
						}
						{states.hasTitle &&
							<div className='text'>
								<h3>
									<RichText
										onChange={(text)=>{item.title=text;save();}}
										value={item.title}
									/>
								</h3>
								{states.hasTitleCaption && 
									<p>
										<RichText
											onChange={(text)=>{item.titleCaption=text;save();}}
											value={item.titleCaption}
										/>
									</p>
								}
							</div>
						}
					</header>
				</Item>
			);
		});
		
		if(rtn.length<loopCount){
			let len=rtn.length;
			while(rtn.length<loopCount){
				rtn.push(rtn[rtn.length%len]);
			}
		}
		
        return (
			<Fragment>
				<SelectModeToolbar
					set={setAttributes}
					attr={attributes}
					modes={['EditMode','AltMode','OpenMode']}
				/>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.lightbox || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
						<TextareaControl
							label='ボックスクラス'
							onChange={(clss)=>setAttributes({boxClasses:clss})}
							value={boxClasses}
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
						filters={CP.filters.lightbox || {}}
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
							filters={CP.filters.lightbox || {}}
						/>
					}
					<ItemControlInfoPanel/>
				</InspectorControls>
				{!OpenMode?(
					<Fragment>
						{EditMode?(
							<div className="alt_content">
								<div class="label">
									<Icon icon="edit"/>
								</div>
								<EditItemsTable
									set={setAttributes}
									attr={attributes}
									columns={[
										{type:'image',label:'image',keys:imageKeys.image,cond:states.hasImage},
										{type:'text',key:'imageCode',cond:states.isTemplate && states.hasImage},
										{type:'image',label:'header',keys:imageKeys.headerImage,cond:states.hasHeaderImage},
										{type:'text',key:'headerImageCode',cond:states.isTemplate && states.hasHeaderImage},
										{type:'text',key:'title',cond:states.hasTitle},
										{type:'text',key:'titleCaption',cond:states.hasTitleCaption},
										{type:'text',key:'subTitle',cond:states.hasSubTitle},
										{type:'text',key:'text',cond:states.hasText}
									]}
									isTemplate={states.isTemplate}
								/>
							</div>
						 ):(
							<Fragment>
								{(AltMode && doLoop)?(
									<div className="alt_content">
										<div class="label">
											<Icon icon="welcome-comments"/>
										</div>
										<InnerBlocks/>
									</div>
								):(
									<ul className={classes}>{rtn}</ul>
								)}
							</Fragment>
						 )}
					</Fragment>
				):(
					<div className="lightbox_preview">
						<div id="cp_lightbox" className="cp_lightbox_container active">
							<div class="cp_lightbox_content">
								<div class="group active">
									<ul class="items">
									{items.map((item,index)=>{
										var isActive=currentItemIndex==index;
										return (
											<li className={isActive?'item active':'item'}>
												<div className={boxClasses}>
													{states.hasSubTitle &&
														<header className="title">
															<h4>
																<RichText
																	onChange={(subTitle)=>{items[index].subTitle=subTitle;setAttributes({items:items});}}
																	value={item.subTitle}
																	placeholder='SubTitle'
																/>
															</h4>
														</header>
													}
													{states.hasImage &&
														<div className='image'>
															<SelectResponsiveImage
																attr={attributes}
																set={setAttributes}
																keys={imageKeys.image}
																index={index}
																size='full'
																isTemplate={states.isTemplate}
															/>
														</div>
													}
													{states.hasText && 
														<div className="text">
															<div
																onFocus={()=>{blockState.enableBlockFormat=true;}}
																onBlur={()=>{blockState.enableBlockFormat=false;}}
															>
																<RichText
																	onChange={(text)=>{items[index].text=text;setAttributes({items:items});}}
																	value={item.text}
																/>
															</div>
														</div>
													}
												</div>
											</li>
										);
									})}
									</ul>
									<div class="cp_lightbox_control">
										<div className="prev active"></div>
										<ul className="dots active">
											{items.map((item,index)=>{
												var isActive=currentItemIndex==index;
												return (
													<li className={isActive?'dot active':'dot'} data-index={index}></li>
												);
											})}
										</ul>
										<div className="next active"></div>
										<div className="close"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items,classes,boxClasses,blockState,doLoop}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		const imageKeys={
			image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"}
		};
		
		
		return (
			<Fragment>
				<ul className={classes}>
					{items.map((item,index)=>{
						return (
							<li className={item.classes}>
								<header>
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
									{states.hasTitle &&
										<div className='text'>
											<h3><RichText.Content value={item.title}/></h3>
											{states.hasTitleCaption && <p><RichText.Content value={item.titleCaption}/></p>}
										</div>
									}
								</header>
								<div class={boxClasses}>
									{states.hasSubTitle && <header className="title"><h4><RichText.Content value={item.subTitle}/></h4></header>}
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
									{states.hasText && <div className="text"><RichText.Content value={item.text}/></div>}
								</div>
							</li>
						);
					})}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	},
});