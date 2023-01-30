wp.blocks.registerBlockType('catpow/pricecard',{
	title: '🐾 PriceCard',
	description:'サービス・商品情報の一覧ブロックです。',
	icon: 'index-card',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {Fragment}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl} = wp.components;
		const {items=[],classes='',priceUnit,priceCaption,linkText,loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-pricecard';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');

		var states=CP.wordsToFlags(classes);


		var selectiveClasses=[
			{input:'text',label:'価格単位',key:'priceUnit'},
			{type:'radio',label:'単位の位置',values:{"unitBefore":"前","unitAfter":"後"}},
			{label:'タイトル',values:'hasTitle'},
			{label:'キャプション',values:'hasTitleCaption'},
			{label:'リンク',values:'hasLink',sub:[
				{input:'text',label:'リンク文字列',key:'linkText'},
			]},
			{label:'画像',values:'hasImage'},
			{label:'サブタイトル',values:'hasSubTitle'},
			{label:'テキスト',values:'hasText'},
			{label:'スペック',values:'hasSpec'},
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
		const itemSelectiveClasses=[
			'color',
			{label:'タイプ',values:{'normal':"通常",'recommended':"おすすめ",'deprecated':"非推奨",'cheap':"安価",'expensive':"高級"}},
			{label:'値引き',values:'discount'},
			{label:'画像コード',input:'text',key:'imageCode',cond:states.isTemplate}
		];

		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",code:'imageCode',items:"items"}
		};
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

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
						<div className='image'>
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
					<header>
						<div className='text'>
							{states.hasTitle &&
								<h3>
									<RichText
										onChange={(text)=>{items[index].title=text;save();}}
										value={item.title}
									/>
								</h3>
							}
							{states.hasTitle && states.hasTitleCaption && 
								<p>
									<RichText
										onChange={(text)=>{items[index].titleCaption=text;save();}}
										value={item.titleCaption}
									/>
								</p>
							}
							<div className="price">
								<span className="listPrice">
									{states.unitBefore && <span className="unit">{priceUnit}</span>}
									<span className="number">
										<RichText
											onChange={(listPrice)=>{items[index].listPrice=listPrice;save();}}
											value={item.listPrice}
										/>
									</span>
									{states.unitAfter && <span className="unit">{priceUnit}</span>}
								</span>
								<span className="price">
									{states.unitBefore && <span className="unit">{priceUnit}</span>}
									<span className="number">
										<RichText
											onChange={(price)=>{items[index].price=price;save();}}
											value={item.price}
										/>
									</span>
									{states.unitAfter && <span className="unit">{priceUnit}</span>}
								</span>
								<span className="priceCaption">
									<RichText
										onChange={(priceCaption)=>{setAttributes({priceCaption});}}
										value={priceCaption}
									/>
								</span>
							</div>
						</div>
					</header>
					{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && 
						<div className="contents">
							{states.hasSubTitle &&
								<h4>
									<RichText
										onChange={(subTitle)=>{items[index].subTitle=subTitle;save();}}
										value={item.subTitle}
										placeholder='SubTitle'
									/>
								</h4>
							}
							{states.hasText && 
								<p>
									<RichText
										onChange={(text)=>{items[index].text=text;save();}}
										value={item.text}
									/>
								</p>
							}
							{states.hasSpec && 
								<dl className="spec">
									{item.specLabels.map((label,specIndex)=>{
										return (
											<Fragment key={specIndex}>
												<dt>
													<RichText
														onChange={(text)=>{
															items[index].specLabels[specIndex].text=text;
															save();
														}}
														value={items[index].specLabels[specIndex].text}
													/>
												</dt>
												<dd>
													<RichText
														onChange={(text)=>{
															items[index].specValues[specIndex].text=text;
															save();
														}}
														value={items[index].specValues[specIndex].text}
													/>
												</dd>
											</Fragment>
										);
									})}
								</dl>
							}
							{states.hasLink &&
								<div className='link'>
									{linkText}
									{isSelected && 
										<TextControl onChange={(linkUrl)=>{
											items[index].linkUrl=linkUrl;
											save();
										}} value={item.linkUrl} placeholder='URLを入力'/>
									}
								</div>
							}
						</div>
					}
				</CP.Item>
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
						filters={CP.filters.pricecard || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<CP.SelectClassPanel
						title='アイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={itemSelectiveClasses}
						filters={CP.filters.pricecard || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{attributes.EditMode?(
					<CP.EditItemsTable
						set={setAttributes}
						attr={attributes}
						columns={[
							{type:'text',key:'title',cond:states.hasTitle},
							{type:'text',key:'titleCaption',cond:states.hasTitleCaption},
							{type:'image',keys:imageKeys.image,cond:states.hasImage},
							{type:'text',key:'imageCode',cond:states.hasImage && states.isTemplate},
							{type:'text',key:'subTitle',cond:states.hasSubTitle},
							{type:'text',key:'text',cond:states.hasText},
							{type:'text',key:'listPrice',cond:true},
							{type:'text',key:'price',cond:true},
							{type:'text',key:'linkUrl',cond:states.hasLink}
						]}
						isTemplate={states.isTemplate}
					/>
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
		const {Fragment}=wp.element;
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {items=[],classes='',priceUnit,priceCaption,linkText,loopCount,doLoop}=attributes;
		const primaryClass='wp-block-catpow-pricecard';
		var classArray=_.uniq(classes.split(' '));

		var states=CP.wordsToFlags(classes);


		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",code:'imageCode',items:"items"}
		};
		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<li className={item.classes} key={index}>
					{states.hasImage &&
						<div className='image'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								size='vga'
								isTemplate={states.isTemplate}
							/>
						</div>
					}
					<header>
						<div className='text'>
							{states.hasTitle &&
								<h3><RichText.Content value={item.title}/></h3>
							}
							{states.hasTitle && states.hasTitleCaption && 
								<p><RichText.Content value={item.titleCaption}/></p>
							}
							<div className="price">
								<span className="listPrice">
									{states.unitBefore && <span className="unit">{priceUnit}</span>}
									<span className="number">{item.listPrice}</span>
									{states.unitAfter && <span className="unit">{priceUnit}</span>}
								</span>
								<span className="price">
									{states.unitBefore && <span className="unit">{priceUnit}</span>}
									<span className="number">{item.price}</span>
									{states.unitAfter && <span className="unit">{priceUnit}</span>}
								</span>
								<span className="priceCaption"><RichText.Content value={priceCaption}/></span>
							</div>
						</div>
					</header>
					{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && 
						<div className="contents">
							{states.hasSubTitle &&
								<h4><RichText.Content value={item.subTitle}/></h4>
							}
							{states.hasText && 
								<p><RichText.Content value={item.text}/></p>
							}
							{states.hasSpec && 
								<dl className="spec">
									{item.specLabels.map((label,specIndex)=>{
										return (
											<Fragment key={specIndex}>
												<dt><RichText.Content value={items[index].specLabels[specIndex].text}/></dt>
												<dd><RichText.Content value={items[index].specValues[specIndex].text}/></dd>
											</Fragment>
										);
									})}
								</dl>
							}
							{states.hasLink &&
								<a className='link' href={item.linkUrl}>
									{linkText}
								</a>
							}
						</div>
					}
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
				const {items=[],classes='',priceUnit,priceCaption,linkText,loopCount}=attributes;
				const primaryClass='wp-block-catpow-pricecard';
				var classArray=_.uniq(classes.split(' '));

				var states=CP.wordsToFlags(classes);


				let rtn=[];
				const imageKeys={
					image:{src:"src",alt:"alt",code:'imageCode',items:"items"}
				};
				items.map((item,index)=>{
					if(!item.controlClasses){item.controlClasses='control';}
					rtn.push(
						<li className={item.classes}>
							{states.hasImage &&
								<div className='image'>
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										index={index}
										size='vga'
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<header>
								<div className='text'>
									{states.hasTitle &&
										<h3><RichText.Content value={item.title}/></h3>
									}
									{states.hasTitle && states.hasTitleCaption && 
										<p><RichText.Content value={item.titleCaption}/></p>
									}
									<div className="price">
										<span className="listPrice">
											{states.unitBefore && <span className="unit">{priceUnit}</span>}
											<span className="number">{item.listPrice}</span>
											{states.unitAfter && <span className="unit">{priceUnit}</span>}
										</span>
										<span className="price">
											{states.unitBefore && <span className="unit">{priceUnit}</span>}
											<span className="number">{item.price}</span>
											{states.unitAfter && <span className="unit">{priceUnit}</span>}
										</span>
										<span className="priceCaption"><RichText.Content value={priceCaption}/></span>
									</div>
								</div>
							</header>
							{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && 
								<div className="contents">
									{states.hasSubTitle &&
										<h4><RichText.Content value={item.subTitle}/></h4>
									}
									{states.hasText && 
										<p><RichText.Content value={item.text}/></p>
									}
									{states.hasSpec && 
										<dl className="spec">
											{item.specLabels.map((label,specIndex)=>{
												return [
													<dt><RichText.Content value={items[index].specLabels[specIndex].text}/></dt>,
													<dd><RichText.Content value={items[index].specValues[specIndex].text}/></dd>
												];
											})}
										</dl>
									}
									{states.hasLink &&
										<a className='link' href={item.linkUrl}>
											{linkText}
										</a>
									}
								</div>
							}
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