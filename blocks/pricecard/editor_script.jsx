registerBlockType('catpow/pricecard',{
	title: '🐾 PriceCard',
	description:'サービス・商品情報の一覧ブロックです。',
	icon: 'index-card',
	category: 'catpow',
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-pricecard hasImage hasTitle hasSpec unitBefore'},
		priceUnit:{source:'text',selector:'span.price .unit',default:'¥'},
		priceCaption:{source:'children',selector:'span.priceCaption',default:['（税込）']},
		linkText:{source:'text',selector:'.link',default:'more info'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'header .text h3'},
				titleCaption:{source:'children',selector:'header .text p'},
				src:{source:'attribute',selector:'li>.image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'li>.image [src]',attribute:'alt'},
				subTitle:{source:'children',selector:'.contents h4'},
				text:{source:'children',selector:'.contents p'},
				listPrice:{source:'text',selector:'span.listPrice .number'},
				price:{source:'text',selector:'span.price .number'},
				
				specLabels:{source:'query',selector:'dl.spec dt',query:{text:{source:'children'}}},
				specValues:{source:'query',selector:'dl.spec dd',query:{text:{source:'children'}}},
				linkUrl:{source:'attribute',selector:'.link a',attribute:'href'},
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					titleCaption:['Caption'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					subTitle:['SubTitle'],
					text:['Text'],
					listPrice:'0,000',
					price:'0,000',
					specLabels:[...Array(3)].map(()=>{return {text:['label']};}),
					specValues:[...Array(3)].map(()=>{return {text:['value']};}),
					linkUrl:cp.home_url
				}
			})
		},
		loopParam:{type:'text',default:''},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,priceUnit,priceCaption,linkText,loopCount}=attributes;
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
					{label:'ループ',values:'doLoop',sub:[
						{label:'パラメータ',input:'text',key:'loopParam'},
						{label:'ループ数',input:'range',key:'loopCount',min:1,max:16}
					]}
				]
			}
		];
		const itemSelectiveClasses=[
			'color',
			{label:'タイプ',values:{'normal':"通常",'recommended':"おすすめ",'deprecated':"非推奨",'cheap':"安価",'expensive':"高級"}},
			{label:'値引き',values:'discount'},
		];
		const itemTemplateSelectiveClasses=[
			{label:'画像',values:'loopImage',sub:[
				{label:'src',input:'text',key:'src'},
				{label:'alt',input:'text',key:'alt'},
			]}
		];
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"}
		};
		const save=()=>{
			setAttibutes({items:JSON.parse(JSON.stringify(items))});
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
						<div className='image'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								index={index}
								size='vga'
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
							<div class="price">
								<span class="listPrice">
									{states.unitBefore && <span class="unit">{priceUnit}</span>}
									<span class="number">
										<RichText
											onChange={(listPrice)=>{items[index].listPrice=listPrice;save();}}
											value={item.listPrice}
										/>
									</span>
									{states.unitAfter && <span class="unit">{priceUnit}</span>}
								</span>
								<span class="price">
									{states.unitBefore && <span class="unit">{priceUnit}</span>}
									<span class="number">
										<RichText
											onChange={(price)=>{items[index].price=price;save();}}
											value={item.price}
										/>
									</span>
									{states.unitAfter && <span class="unit">{priceUnit}</span>}
								</span>
								<span class="priceCaption">
									<RichText
										onChange={(priceCaption)=>{setAttributes({priceCaption});}}
										value={priceCaption}
									/>
								</span>
							</div>
						</div>
					</header>
					{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && 
						<div class="contents">
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
										return [
											<dt>
												<RichText
													onChange={(text)=>{
														items[index].specLabels[specIndex].text=text;
														save();
													}}
													value={items[index].specLabels[specIndex].text}
												/>
											</dt>,
											<dd>
												<RichText
													onChange={(text)=>{
														items[index].specValues[specIndex].text=text;
														save();
													}}
													value={items[index].specValues[specIndex].text}
												/>
											</dd>
										];
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
		
        return [
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
			</BlockControls>,
			<InspectorControls>
				<SelectClassPanel
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
				<SelectItemClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					itemClasses={itemSelectiveClasses}
					filters={CP.filters.pricecard || {}}
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
						filters={CP.filters.pricecard || {}}
					/>
				}
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items,classes,priceUnit,priceCaption,linkText,loopCount}=attributes;
		const primaryClass='wp-block-catpow-pricecard';
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"}
		};
		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<li className={item.classes}>
					{states.hasImage &&
						<div className='image'>
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
								index={index}
								size='vga'
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
							<div class="price">
								<span class="listPrice">
									{states.unitBefore && <span class="unit">{priceUnit}</span>}
									<span class="number">{item.listPrice}</span>
									{states.unitAfter && <span class="unit">{priceUnit}</span>}
								</span>
								<span class="price">
									{states.unitBefore && <span class="unit">{priceUnit}</span>}
									<span class="number">{item.price}</span>
									{states.unitAfter && <span class="unit">{priceUnit}</span>}
								</span>
								<span class="priceCaption"><RichText.Content value={priceCaption}/></span>
							</div>
						</div>
					</header>
					{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && 
						<div class="contents">
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
});