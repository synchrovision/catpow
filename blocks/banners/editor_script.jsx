CP.config.banners={
	imageKeys:{
		image:{src:"src",srcset:"srcset",alt:"alt",code:'imageCode',items:"items"}
	}
};

registerBlockType('catpow/banners',{
	title: '🐾 Banners',
	description:'リンク付きのバナー画像を並べて表示するブロックです。',
	icon: 'images-alt',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-banners medium hasTitle';
					return createBlock('catpow/banners',attributes);
				}
			}
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items=[],classes,loopCount,imageCode,doLoop,EditMode=false,AltMode=false}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.banners;
        
		var selectiveClasses=[
			{label:'サイズ',values:['small','medium','large']},
			{label:'タイトル',values:'hasTitle'},
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
		const selectiveItemClasses=[
			{input:'image',label:'PC版画像',keys:imageKeys.image},
			{input:'image',label:'SP版画像',keys:imageKeys.image,ofSP:true,sizes:'480px'},
			{input:'text',label:'alt',key:'alt'},
			{input:'text',label:'target',key:'target'},
			'event'
		];
		const itemTemplateSelectiveClasses=[
			{input:'text',label:'画像',key:'imageCode'}
		];
		
		let rtn=[];
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
					{states.hasTitle &&
						<h3>
							<RichText
								onChange={(title)=>{item.title=title;save();}}
								value={item.title}
							/>
						</h3>
					}
					<a>
						<SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							size='vga'
							isTemplate={states.isTemplate}
						/>
					</a>
					{isSelected &&
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
						filters={CP.filters.banners || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
					{states.isTemplate?(
						<SelectItemClassPanel
							title='テンプレート'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							itemClasses={itemTemplateSelectiveClasses}
							filters={CP.filters.banners || {}}
						/>
					):(
						<SelectItemClassPanel
							title='バナー'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							itemClasses={selectiveItemClasses}
							filters={CP.filters.banners || {}}
						/>
					)}
					<ItemControlInfoPanel/>
				</InspectorControls>
				
				{EditMode?(
					<div className="alt_content">
						<div class="label">
							<Icon icon="edit"/>
						</div>
						<EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{type:'text',key:'title',cond:states.hasTitle},
								{type:'image',label:'image',keys:imageKeys.image,cond:true},
								{type:'text',key:'imageCode',cond:states.isTemplate},
								{type:'text',key:'linkUrl',cond:true},
								{type:'text',key:'target',cond:true},
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
        );
    },
	save({attributes,className}){
		const {items=[],classes,loopParam,doLoop}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.banners;
		
		return (
			<Fragment>
				<ul className={classes}>
					{
						items.map((item,index)=>{
							return (
								<li className={item.classes}>
									{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
									<a href={item.linkUrl} target={item.target} data-event={item.event} rel={item.target?'noopener noreferrer':''}>
										<ResponsiveImage
											attr={attributes}
											keys={imageKeys.image}
											index={index}
											isTemplate={states.isTemplate}
										/>
									</a>
								</li>
							);
						})
					}
				</ul>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	},
	deprecated:[
		{
			save({attributes,className}){
				const {items=[],classes,loopParam}=attributes;

				var states=CP.wordsToFlags(classes);
				const imageKeys={
					image:{src:"src",srcset:"srcset",alt:"alt",code:'imageCode',items:"items"}
				};

				return (
					<ul className={classes}>
						{states.doLoop && '[loop_template '+loopParam+']'}
						{
							items.map((item,index)=>{
								return (
									<li className={item.classes}>
										{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
										<a href={item.linkUrl} target={item.target} data-event={item.event} rel={item.target?'noopener noreferrer':''}>
											<ResponsiveImage
												attr={attributes}
												keys={imageKeys.image}
												index={index}
												isTemplate={states.isTemplate}
											/>
										</a>
									</li>
								);
							})
						}
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