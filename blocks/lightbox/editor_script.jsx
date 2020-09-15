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
	attributes:{
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-lightbox medium hasTitle hasImage hasText'},
		boxClasses:{source:'attribute',selector:'.contents',attribute:'class',default:'contents'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'header .text h3'},
				titleCaption:{source:'children',selector:'header .text p'},
				headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src'},
				headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
				src:{source:'attribute',selector:'.contents .image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'.contents .image [src]',attribute:'alt'},
				subTitle:{source:'children',selector:'.contents .title h4'},
				text:{source:'children',selector:'.contents .text'},
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
				}
			})
		},
		blockState:{type:'object',default:{enableBlockFormat:false}}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,boxClasses,blockState}=attributes;
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
			{label:'ボックスサイズ',values:['small','medium','large'],key:'boxClasses'}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"},
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",items:"items"}
		};
		
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
		
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
						items={itemsCopy}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses[0]}
						filters={CP.filters.lightbox || {}}
					/>
					<ItemControlInfoPanel/>
				</InspectorControls>
				<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>
					{itemsCopy.map((item,index)=>{
						return (
							<Item
								tag='li'
								set={setAttributes}
								attr={attributes}
								items={itemsCopy}
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
											/>
										</div>
									}
									{states.hasTitle &&
										<div className='text'>
											<h3>
												<RichText
													onChange={(text)=>{itemsCopy[index].title=text;setAttributes({items:itemsCopy});}}
													value={item.title}
												/>
											</h3>
											{states.hasTitle && 
												<p>
													<RichText
														onChange={(text)=>{itemsCopy[index].titleCaption=text;setAttributes({items:itemsCopy});}}
														value={item.titleCaption}
													/>
												</p>
											}
										</div>
									}
								</header>
							</Item>
						);
					})}
				</ul>
				{isSelected &&　attributes.currentItemIndex>=0 &&
					<div className="lightbox_preview">
						<div id="cp_lightbox" className="cp_lightbox_container active">
							<div class="cp_lightbox_content">
								<div class="group active">
									<ul class="items">
									{itemsCopy.map((item,index)=>{
										var isActive=attributes.currentItemIndex==index;
										return (
											<li className={isActive?'item active':'item'}>
												<div className={boxClasses}>
													{states.hasSubTitle &&
														<header className="title">
															<h4>
																<RichText
																	onChange={(subTitle)=>{itemsCopy[index].subTitle=subTitle;setAttributes({items:itemsCopy});}}
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
																	onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
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
												var isActive=attributes.currentItemIndex==index;
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
				}
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items,classes,boxClasses,blockState}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		return (
			<ul className={classes}>
				{items.map((item,index)=>{
					return (
						<li className={item.classes}>
							<header>
								{states.hasHeaderImage && <div class='image'><img src={item.headerImageSrc} alt={item.headerImageAlt}/></div>}
								{states.hasTitle &&
									<div className='text'>
										<h3><RichText.Content value={item.title}/></h3>
										{tates.hasTitleCaption && <p><RichText.Content value={item.titleCaption}/></p>}
									</div>
								}
							</header>
							<div class={boxClasses}>
								{states.hasSubTitle && <header className="title"><h4><RichText.Content value={item.subTitle}/></h4></header>}
								{states.hasImage && <div className='image'><img src={item.src} alt={item.alt}/></div>}
								{states.hasText && <div className="text"><RichText.Content value={item.text}/></div>}
							</div>
						</li>
					);
				})}
			</ul>
		);
	},
});