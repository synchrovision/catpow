wp.blocks.registerBlockType('catpow/pricelist',{
	title: '🐾 PriceList',
	description:'価格表のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {items=[],classes,loopParam,loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-pricelist';

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
			wp.hooks.applyFilters('catpow.blocks.pricelist.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const selectiveItemClasses=[
				{name:'heading',label:'見出し',values:'isHeading'},
				{name:'level1',label:'レベル',values:{level1:'1',level2:'2',level3:'3'}},
				{name:'image',label:'画像',values:'hasImage'},
				{name:'caption',label:'キャプション',values:'hasCaption'}
			];
			wp.hooks.applyFilters('catpow.blocks.pricelist.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
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
					isSelected={isSelected}
					key={index}
				>
					{itemStates.hasImage &&
						<div className='image'>
							<CP.SelectResponsiveImage
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
						<>
							<div className="line"></div>
							<div className='price'>
								<RichText
									onChange={(price)=>{item.price=price;save();}}
									value={item.price}
								/>
							</div>
						</>
					}
					{itemStates.hasCaption &&
						<div className='caption'>
							<RichText
								onChange={(caption)=>{item.caption=caption;save();}}
								value={item.caption}
							/>
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
						filters={CP.filters.pricelist || {}}
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
						filters={CP.filters.pricelist || {}}
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

		const imageKeys={
			image:{src:"imageSrc",alt:"imageAlt",items:"items"}
		};

		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes} key={index}>
					{itemStates.hasImage &&
						<div className='image'>
							<CP.ResponsiveImage
								attr={attributes}
								keys={imageKeys.image}
							/>
						</div>
					}
					<div className='title'><RichText.Content value={item.title}/></div>
					{!itemStates.isHeading &&
						<>
							<div className="line"></div>
							<div className='price'><RichText.Content value={item.price}/></div>
						</>
					}
					{itemStates.hasCaption &&
						<div className='caption'><RichText.Content value={item.caption}/></div>
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
				const {items=[],classes='',loopParam,loopCount}=attributes;
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
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
									/>
								</div>
							}
							<div className='title'><RichText.Content value={item.title}/></div>
							{!itemStates.isHeading &&
								<>
									<div className="line"></div>
									<div className='price'><RichText.Content value={item.price}/></div>
								</>
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