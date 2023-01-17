CP.config.panes={
	imageKeys:{
		image:{src:"src",alt:"alt",code:"imageCode",items:"items"},
		symbol:{src:"symbolSrc",alt:"symbolAlt",code:"symbolCode",items:"items"},
	}
};

wp.blocks.registerBlockType('catpow/panes',{
	title: '🐾 Panes',
	description:'矩形の画像とテキストのペアのリスト。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-panes';
					return createBlock('catpow/panes',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {items=[],classes='',loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		var states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.panes;


		var selectiveClasses=[
			{label:'シンボル',values:'hasSymbol'},
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
			'pattern',
			{input:'symbol',keys:imageKeys.symbol,cond:states.hasSymbol},
			{
				input:'text',
				label:'シンボル画像コード',
				key:'symbolCode',
				cond:states.isTemplate && states.hasSymbol
			},
			{
				input:'text',
				label:'画像コード',
				key:'imageCode',
				cond:states.isTemplate
			},

		];

		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		let rtn=[];

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
					<div className="image">
						<CP.SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							size='large'
							isTemplate={states.isTemplate}
						/>
					</div>
					<div className="contents">
						<div className='text'>
							{states.hasSymbol &&
								<div className="symbol">
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.symbol}
										index={index}
										size='medium'
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<h3>
								<RichText
									onChange={(title)=>{item.title=title;save();}}
									value={item.title}
								/>
							</h3>
							<p>
								<RichText
									onChange={(titleCaption)=>{item.titleCaption=titleCaption;save();}}
									value={item.titleCaption}
								/>
							</p>
						</div>
					</div>
					{states.hasLink && isSelected &&
						<div className='link'>
							<p
								contentEditable={true}
								suppressContentEditableWarning={true}
								onBlur={(e)=>{
									item.linkUrl=e.currentTarget.innerHTML;
									save();
								}}
							>{item.linkUrl}</p>
						</div>
					}
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
				/>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.panes || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
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
						filters={CP.filters.panes || {}}
					/>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{EditMode?(
					<div className="alt_content">
						<div className="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{type:'image',label:'image',keys:imageKeys.image,cond:true},
								{type:'text',key:'imageCode',cond:states.isTemplate},
								{type:'text',key:'title',cond:states.hasTitle},
								{type:'text',key:'titleCaption',cond:states.hasTitleCaption},
								{type:'text',key:'linkUrl',cond:states.hasLink}
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
		);
	},
	save({attributes,className}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {items=[],classes='',linkUrl,loopParam,doLoop}=attributes;
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.panes;

		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes} key={index}>
					<div className='image'>
						<CP.ResponsiveImage
							attr={attributes}
							keys={imageKeys.image}
							index={index}
							isTemplate={states.isTemplate}
						/>
					</div>
					<div className="contents">
						<div className='text'>
							{states.hasSymbol &&
								<div className="symbol">
									<CP.ResponsiveImage
										attr={attributes}
										keys={imageKeys.symbol}
										index={index}
										size='medium'
										isTemplate={states.isTemplate}
									/>
								</div>
							}
							<h3>
								<RichText.Content value={item.title}/>
							</h3>
							<p>
								<RichText.Content value={item.titleCaption}/>
							</p>
						</div>
					</div>
					{states.hasLink && item.linkUrl && <div className='link'><a href={item.linkUrl}> </a></div>}
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