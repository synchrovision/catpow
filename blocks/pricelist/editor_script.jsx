registerBlockType('catpow/pricelist',{
	title: '🐾 PriceList',
	description:'価格表のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	attributes:{
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-pricelist'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				imageSrc:{source:'attribute',selector:'.image [src]',attribute:'src'},
				imageAlt:{source:'attribute',selector:'.image [src]',attribute:'alt'},
				imageCode:{source:'text',selector:'.image'},
				title:{source:'children',selector:'.title'},
				caption:{source:'children',selector:'.caption'},
				price:{source:'children',selector:'.price'},
			},
			default:[...Array(3)].map((n,i)=>{
				return {
					classes:'item hasCaption level'+(i+1),
					imageSrc:cp.theme_url+'/images/dummy.jpg',
					imageAlt:'dummy',
					imageCode:'',
					title:['Product'],
					caption:['caption'],
					price:['¥0,000'],
				}
			})
		},
		loopParam:{type:'text',default:''},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,loopParam,loopCount}=attributes;
		const primaryClass='wp-block-catpow-pricelist';
		
		var states=CP.wordsToFlags(classes);
		
        
		var selectiveClasses=[
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
			{label:'見出し',values:'isHeading'},
			{label:'レベル',values:{level1:'1',level2:'2',level3:'3'}},
			{label:'画像',values:'hasImage'},
			{label:'キャプション',values:'hasCaption'}
		];
		
		let rtn=[];
		const imageKeys={
			image:{src:"imageSrc",alt:"imageAlt",items:"items"}
		};
		const save=()=>{
			setAttibutes({items:JSON.parse(JSON.stringify(items))});
		};

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
				>
					{itemStates.hasImage &&
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
					<div className='title'>
						<RichText
							onChange={(title)=>{item.title=title;save();}}
							value={item.title}
						/>
					</div>
					{!itemStates.isHeading &&
						<Fragment>
							<div className="line"></div>
							<div className='price'>
								<RichText
									onChange={(price)=>{item.price=price;save();}}
									value={item.price}
								/>
							</div>
						</Fragment>
					}
					{itemStates.hasCaption &&
						<div className='caption'>
							<RichText
								onChange={(caption)=>{item.caption=caption;save();}}
								value={item.caption}
							/>
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
					filters={CP.filters.pricelist || {}}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classes}
					/>
				</PanelBody>
				<SelectItemClassPanel
					title='リストアイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					itemClasses={itemSelectiveClasses}
					filters={CP.filters.pricelist || {}}
				/>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items,classes,loopParam,loopCount}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		const imageKeys={
			image:{src:"imageSrc",alt:"imageAlt",items:"items"}
		};
		
		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes}>
					{itemStates.hasImage &&
						<div className='image'>
							<ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
							/>
						</div>
					}
					<div className='title'><RichText.Content value={item.title}/></div>
					{!itemStates.isHeading &&
						<Fragment>
							<div className="line"></div>
							<div className='price'><RichText.Content value={item.price}/></div>
						</Fragment>
					}
					{itemStates.hasCaption &&
						<div className='caption'><RichText.Content value={item.caption}/></div>
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