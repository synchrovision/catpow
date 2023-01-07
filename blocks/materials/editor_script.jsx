wp.blocks.registerBlockType('catpow/materials',{
	title: '🐾 Materials',
	description:'材料・成分一覧のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {items=[],classes,loopParam,loopCount,doLoop,EditMode=false,AltMode=false,currentItemIndex}=attributes;
		const primaryClass='wp-block-catpow-materials';

		var states=CP.wordsToFlags(classes);


		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
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
			wp.hooks.applyFilters('catpow.blocks.materials.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const selectiveItemClasses=[
				'color',
				{name:'label',label:'ラベル',values:'hasLabel'}
			];
			wp.hooks.applyFilters('catpow.blocks.materials.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);

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
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected && currentItemIndex==index}
				>
					{itemStates.hasLabel &&
						<div className='label'>
							<RichText
								onChange={(label)=>{item.label=label;save();}}
								value={item.label}
							/>
						</div>
					}
					<ul className="items">
					{item.items.map((subItem,subIndex)=>{
						const subItemStates=CP.wordsToFlags(subItem.classes);
						return (
							<CP.Item
								tag='li'
								set={()=>{
									item.currentItemIndex=subIndex;
									save();
								}}
								attr={item}
								items={item.items}
								index={subIndex}
								isSelected={isSelected && currentItemIndex==index && item.currentItemIndex==subIndex}
							>
								<div class="text">
									<div className="title">
										<RichText
											onChange={(title)=>{subItem.title=title;save();}}
											value={subItem.title}
										/>
									</div>
									<div className="line"></div>
									<div className="amount">
										<RichText
											onChange={(amount)=>{subItem.amount=amount;save();}}
											value={subItem.amount}
										/>
									</div>
									{subItemStates.hasCaption &&
										<div className="caption">
											<RichText
												onChange={(caption)=>{subItem.caption=caption;save();}}
												value={subItem.caption}
											/>
										</div>
									}
								</div>
							</CP.Item>
						);
					})}
					</ul>
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
						filters={CP.filters.materials || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
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
						filters={CP.filters.materials || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				<>
					{EditMode?(
						<div className="alt_content">
							<div class="label">
								<Icon icon="edit"/>
							</div>
							<CP.EditItemsTable
								set={setAttributes}
								attr={attributes}
								columns={[
									{type:'text',key:'label',cond:true},
									{type:'items',key:'items',columns:[
										{type:'text',key:'title',cond:true},
										{type:'text',key:'amount',cond:true},
										{type:'text',key:'caption',cond:true},
									],cond:true},
								]}
								isTemplate={states.isTemplate}
							/>
						</div>
					 ):(
						<>
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
						</>
					 )}
				</>
			</>
		);
	},
	save({attributes,className}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {items=[],classes='',loopParam,loopCount,doLoop}=attributes;
		var classArray=_.uniq(classes.split(' '));

		var states=CP.wordsToFlags(classes);

		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes}>
					{itemStates.hasLabel &&
						<div className='label'>
							<RichText.Content value={item.label}/>
						</div>
					}
					<ul className="items">
					{item.items.map((subItem,subIndex)=>{
						const subItemStates=CP.wordsToFlags(subItem.classes);
						return (
							<li className={subItem.classes}>
								<div class="text">
									<div className="title">
										<RichText.Content value={subItem.title} />
									</div>
									<div className="line"></div>
									<div className="amount">
										<RichText.Content value={subItem.amount} />
									</div>
									{subItemStates.hasCaption &&
										<div className="caption">
											<RichText.Content value={subItem.caption} />
										</div>
									}
								</div>
							</li>
						);
					})}
					</ul>
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
	}
});