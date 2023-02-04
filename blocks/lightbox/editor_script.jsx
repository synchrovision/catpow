CP.config.lightbox={
	imageKeys:{
		image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
		headerImage:{src:"headerImageSrc",alt:"headerImageAlt",code:"headerImageCode",items:"items"}
	}
};

wp.blocks.registerBlockType('catpow/lightbox',{
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
					return wp.blocks.createBlock('catpow/lightbox',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl}=wp.components;
		const {items=[],classes,boxClasses,blockState,loopCount,doLoop,EditMode=false,AltMode=false,OpenMode=false,currentItemIndex=0}=attributes;
		const {imageKeys}=CP.config.lightbox;

		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'size',label:'サイズ',values:['small','medium','large']},
				{name:'headerImage',label:'サムネール画像',values:'hasHeaderImage'},
				{name:'title',label:'タイトル',values:'hasTitle'},
				{name:'titleCaption',label:'タイトルキャプション',values:'hasTitleCaption'},
				{name:'image',label:'画像',values:'hasImage'},
				{name:'subTitle',label:'タイトル',values:'hasSubTitle'},
				{name:'text',label:'テキスト',values:'hasText'},
				{name:'boxSize',label:'ボックスサイズ',values:['small','medium','large'],key:'boxClasses'},
				{
					name:'template',
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
			wp.hooks.applyFilters('catpow.blocks.lightbox.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const selectiveItemClasses=[
				{name:'image',input:'image',label:'画像',keys:imageKeys.image,cond:states.hasImage,isTemplate:states.isTemplate},
				{
					name:'imageCode',
					input:'text',
					label:'画像コード',
					key:'imageCode',
					cond:states.hasImage && states.isTemplate
				},
				{name:'',input:'image',label:'サムネール画像',keys:imageKeys.headerImage,cond:states.hasHeaderImage,isTemplate:states.isTemplate},
				{
					name:'headerImageCode',
					input:'text',
					label:'サムネール画像コード',
					key:'headerImageCode',
					cond:states.hasHeaderImage && states.isTemplate
				}
			];
			wp.hooks.applyFilters('catpow.blocks.lightbox.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);

		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		let rtn=[];		

		items.map((item,index)=>{
			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					key={index}
				>
					<header>
						{states.hasHeaderImage &&
							<div className='image'>
								<CP.SelectResponsiveImage
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
					modes={['EditMode','AltMode','OpenMode']}
				/>
				<InspectorControls>
					<CP.SelectClassPanel
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
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
						<TextareaControl
							label='ボックスクラス'
							onChange={(boxClasses)=>setAttributes({boxClasses})}
							value={boxClasses}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={selectiveItemClasses}
						filters={CP.filters.lightbox || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{!OpenMode?(
					<>
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
				):(
					<div className="lightbox_preview">
						<div id="cp_lightbox" className="cp_lightbox_container active">
							<div className="cp_lightbox_content">
								<div className="group active">
									<ul className="items">
									{items.map((item,index)=>{
										var isActive=currentItemIndex==index;
										return (
											<li className={isActive?'item active':'item'} key={index}>
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
															<CP.SelectResponsiveImage
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
									<div className="cp_lightbox_control">
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
			</>
		);
	},
	save({attributes,className}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {items=[],classes='',boxClasses,blockState,doLoop}=attributes;

		var states=CP.wordsToFlags(classes);

		const {imageKeys}=CP.config.lightbox;

		return (
			<>
				<ul className={classes}>
					{items.map((item,index)=>{
						return (
							<li className={item.classes} key={index}>
								<header>
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
									{states.hasTitle &&
										<div className='text'>
											<h3><RichText.Content value={item.title}/></h3>
											{states.hasTitleCaption && <p><RichText.Content value={item.titleCaption}/></p>}
										</div>
									}
								</header>
								<div className={boxClasses}>
									{states.hasSubTitle && <header className="title"><h4><RichText.Content value={item.subTitle}/></h4></header>}
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
									{states.hasText && <div className="text"><RichText.Content value={item.text}/></div>}
								</div>
							</li>
						);
					})}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</>
		);
	},
});