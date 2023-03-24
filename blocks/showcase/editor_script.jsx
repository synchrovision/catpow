CP.config.showcase={
	imageKeys:{
		image:{src:"src",alt:"alt",code:"imageCode",items:"items"}
	},
	linkKeys:{
		link:{href:"linkUrl",items:"items"}
	}
};
wp.blocks.registerBlockType('catpow/showcase',{
	title: '🐾 showcase',
	description:'画像とテキストを並べて表示します。',
	icon: 'columns',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-showcase hasCounter';
					return wp.blocks.createBlock('catpow/showcase',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {BlockControls,InspectorControls,RichText}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl,TextControl,ToolbarGroup}=wp.components;
		const {items=[],classes,TitleTag,countPrefix,countSuffix}=attributes;
		const primaryClass='wp-block-catpow-showcase';
		var classArray=_.uniq((className+' '+classes).split(' '));
		
		const states=CP.wordsToFlags(classes);
		const {imageKeys,linkKeys}=CP.config.showcase;

		const selectiveClasses=useMemo(()=>{
			const {imageKeys}=CP.config.showcase;
			const selectiveClasses=[
				{name:'counter',label:'番号',values:'hasCounter',sub:[
					{name:'countPrefix',input:'text',label:'番号前置テキスト',key:'countPrefix'},
					{name:'countSuffix',input:'text',label:'番号後置テキスト',key:'countSuffix'},
				]},
				{name:'titleCaption',label:'タイトルキャプション',values:'hasTitleCaption'},
				{name:'size',type:'buttons',label:'サイズ',values:['small','medium','large']},
				{name:'link',label:'リンク',values:'hasLink'}
			];
			wp.hooks.applyFilters('catpow.blocks.showcase.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		let rtn=[];
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
					<div className='image'>
						<CP.SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							size='full'
						/>
					</div>
					<div className="texts">
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						}
						<RichText
							tagName={TitleTag}
							className="title"
							onChange={(text)=>{items[index].title=text;save();}}
							value={item.title}
						/>
						{states.hasTitleCaption && 
							<RichText
								tagName="p"
								className="titleCaption"
								onChange={(text)=>{items[index].titleCaption=text;save();}}
								value={item.titleCaption}
							/>
						}
						<div className="text" onFocus={()=>{attributes.blockState.enableBlockFormat=true;}}>
							<RichText
								onChange={(text)=>{items[index].text=text;save();}}
								value={item.text}
							/>
						</div>
						{states.hasLink &&
							<CP.Link.Edit
								className="link"
								attr={attributes}
								set={setAttributes}
								keys={linkKeys.link}
								index={index}
								isSelected={isSelected}
							>
								<RichText
									onChange={(linkText)=>{items[index].linkText=linkText;save();}}
									value={item.linkText}
								/>
							</CP.Link.Edit>
						}
					</div>
				</CP.Item>
			);
		});

		if(attributes.EditMode===undefined){attributes.EditMode=false;}

		return (
			<>
				<BlockControls>
					<ToolbarGroup
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
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.showcase || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(classes)=>setAttributes({classes})}
							value={classes}
						/>
					</PanelBody>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{attributes.EditMode?(
					<div className="alt_content">
						<div className="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{type:'image',label:'image',keys:imageKeys.image},
								{type:'text',key:'title'},
								{type:'text',key:'titleCaption',cond:states.hasTitleCaption},
								{type:'text',key:'text'},
								{type:'text',key:'linkText',cond:states.hasLink},
								{type:'text',key:'linkUrl',cond:states.hasLink}
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				):(
					<ul className={classes}>{rtn}</ul>
				)}
			</>
		);
	},
	save({attributes,className}){
		const {RichText}=wp.blockEditor;
		const {items=[],classes='',TitleTag,countPrefix,countSuffix}=attributes;
		var classArray=_.uniq(classes.split(' '));

		const states=CP.wordsToFlags(classes);
		const {imageKeys,linkKeys}=CP.config.showcase;

		let rtn=[];
		items.forEach((item,index)=>{
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
					<div className="texts">
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						}
						<RichText.Content
							tagName={TitleTag}
							className="title"
							value={item.title}
						/>
						{states.hasTitleCaption && 
							<RichText.Content
								tagName="p"
								className="titleCaption"
								value={item.titleCaption}
							/>
						}
						<div className="text">
							<RichText.Content value={item.text}/>
						</div>
						{states.hasLink &&
							<CP.Link
								className="link"
								attr={attributes}
								keys={linkKeys.link}
								index={index}
							>
								<RichText.Content value={item.linkText}/>
							</CP.Link>
						}
					</div>
				</li>
			);
		});
		console.log(rtn);
		return <ul className={classes}>{rtn}</ul>;
	}
});