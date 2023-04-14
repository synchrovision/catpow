CP.config.faq={
	imageKeys:{
		image:{src:"src",alt:"alt",items:"items"}
	}
};
wp.blocks.registerBlockType('catpow/faq',{
	title: '🐾 FaQ',
	description:'質問と回答の一覧ブロックです。',
	icon: 'editor-help',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-faq accordion';
					return wp.blocks.createBlock('catpow/faq',attributes);
				},
			},
		]
	},
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-faq'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'html',selector:'header .text h3'},
				titleCaption:{source:'html',selector:'header .text p'},
				src:{source:'attribute',selector:'li>.image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'li>.image [src]',attribute:'alt'},
				subTitle:{source:'html',selector:'.contents h4'},
				text:{source:'html',selector:'.contents p'},
				linkUrl:{source:'attribute',selector:'.link a',attribute:'href'}
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					titleCaption:['Caption'],
					subTitle:['SubTitle'],
					src:wpinfo.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					text:['Text'],
					linkUrl:wpinfo.home_url
				}
			})
		},
		countPrefix:{source:'text',selector:'.counter .prefix',default:''},
		countSuffix:{source:'text',selector:'.counter .suffix',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {BlockControls,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl,ToolbarGroup}=wp.components;
		const {items=[],classes='',countPrefix,countSuffix}=attributes;
		const primaryClass='wp-block-catpow-faq';

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.faq;

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'titleCaption',label:'Qにキャプション',values:'hasTitleCaption'},
				{name:'subTitle',label:'Aに見出し',values:'hasSubTitle'},
				{name:'accordion',label:'アコーディオン',values:'accordion'},
				{name:'link',label:'リンク',values:'hasLink'}
			];
			wp.hooks.applyFilters('catpow.blocks.faq.selectiveClasses',CP.finderProxy(selectiveClasses));
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
					{states.hasImage &&
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
					<header className="header">
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						}
						<div className='text'>
							<RichText
								tagName="h3"
								className="title"
								onChange={(text)=>{items[index].title=text;save();}}
								value={item.title}
							/>
							{states.hasTitleCaption && 
								<RichText
									tagName="p"
									className="caption"
									onChange={(text)=>{items[index].titleCaption=text;save();}}
									value={item.titleCaption}
								/>
							}
						</div>
					</header>
					<div className="contents">
						{states.hasSubTitle &&
							<RichText
								tagName="h4"
								className="subtitle"
								onChange={(subTitle)=>{items[index].subTitle=subTitle;save();}}
								value={item.subTitle}
								placeholder='SubTitle'
							/>
						}
						<RichText
							tagName="p"
							className="text"
							onChange={(text)=>{items[index].text=text;save();}}
							value={item.text}
						/>
					</div>
					{states.hasLink &&
						<div className='link'>
							<TextControl onChange={(linkUrl)=>{
								items[index].linkUrl=linkUrl;
								save();
							}} value={item.linkUrl} placeholder='URLを入力'/>
						</div>
					}
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
						filters={CP.filters.faq || {}}
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
				<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
			</>
		);
	},
	save({attributes,className}){
		const {RichText}=wp.blockEditor;
		const {items=[],classes='',countPrefix,countSuffix}=attributes;

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.faq;

		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes} key={index}>
					{states.hasImage && <div className='image'><img src={item.src} alt={item.alt}/></div>}
					<header className="header">
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						}
						<div className='text'>
							<RichText.Content tagName="h3" className="title" value={item.title}/>
							{states.hasTitle && states.hasTitleCaption && <p><RichText.Content tagName="p" className="caption" value={item.titleCaption}/></p>}
						</div>
					</header>
					<div className="contents">
						{states.hasSubTitle && <RichText.Content tagName="h4" className="subtitle" value={item.subTitle}/>}
						<RichText.Content tagName="p" className="text" value={item.text}/>
					</div>
					{states.hasLink && item.linkUrl && <div className='link'><a href={item.linkUrl}> </a></div>}
				</li>
			);
		});
		return <ul className={classes}><RichText.Content value={rtn}/></ul>;
	}
});