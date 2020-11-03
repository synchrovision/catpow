registerBlockType('catpow/materials',{
	title: '🐾 Materials',
	description:'価格表のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items=[],classes,loopParam,loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-materials';
		
		var states=CP.wordsToFlags(classes);
		
        
		var selectiveClasses=[
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
			{label:'見出し',values:'isHeading'},
			{label:'レベル',values:{level1:'1',level2:'2',level3:'3'}},
			{label:'画像',values:'hasImage'},
			{label:'キャプション',values:'hasCaption'}
		];
		
		let rtn=[];
		const imageKeys={
			image:{src:"imageSrc",alt:"imageAlt",code:"imageCode",items:"items"}
		};
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
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
		
        return (
			<Fragment>
				<SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.materials || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
					<SelectClassPanel
						title='リストアイテム'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={itemSelectiveClasses}
						filters={CP.filters.materials || {}}
					/>
					<ItemControlInfoPanel/>
				</InspectorControls>
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
									{type:'text',key:'title',cond:true},
									{type:'text',key:'caption',cond:true},
									{type:'text',key:'price',cond:true},
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
			</Fragment>
        );
    },
	save({attributes,className}){
		const {items=[],classes='',loopParam,loopCount,doLoop}=attributes;
		var classArray=_.uniq(classes.split(' '));
		
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
			<Fragment>
				<ul className={classes}>
					{rtn}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	}
});