CP.config.faq={
	imageKeys:{
		image:{src:"src",alt:"alt",items:"items"}
	}
};
registerBlockType('catpow/faq',{
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
					return createBlock('catpow/faq',attributes);
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
				title:{source:'children',selector:'header .text h3'},
				titleCaption:{source:'children',selector:'header .text p'},
				src:{source:'attribute',selector:'li>.image [src]',attribute:'src'},
				alt:{source:'attribute',selector:'li>.image [src]',attribute:'alt'},
				subTitle:{source:'children',selector:'.contents h4'},
				text:{source:'children',selector:'.contents p'},
				linkUrl:{source:'attribute',selector:'.link a',attribute:'href'}
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					titleCaption:['Caption'],
					subTitle:['SubTitle'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					text:['Text'],
					linkUrl:cp.home_url
				}
			})
		},
		countPrefix:{source:'text',selector:'.counter .prefix',default:''},
		countSuffix:{source:'text',selector:'.counter .suffix',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
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
					<header>
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span class="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span class="suffix">{countSuffix}</span>}
							</div>
						}
						<div className='text'>
							<h3>
								<RichText
									onChange={(text)=>{items[index].title=text;save();}}
									value={item.title}
								/>
							</h3>
							{states.hasTitleCaption && 
								<p>
									<RichText
										onChange={(text)=>{items[index].titleCaption=text;save();}}
										value={item.titleCaption}
									/>
								</p>
							}
						</div>
					</header>
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
						<p>
							<RichText
								onChange={(text)=>{items[index].text=text;save();}}
								value={item.text}
							/>
						</p>
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
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
		];
	},
	save({attributes,className}){
		const {items=[],classes='',countPrefix,countSuffix}=attributes;

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.faq;

		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					{states.hasImage && <div className='image'><img src={item.src} alt={item.alt}/></div>}
					<header>
						{states.hasCounter &&
							<div className='counter'>
								{countPrefix && <span class="prefix">{countPrefix}</span>}
								<span className="number">{index+1}</span>
								{countSuffix && <span class="suffix">{countSuffix}</span>}
							</div>
						}
						<div className='text'>
							<h3><RichText.Content value={item.title}/></h3>
							{states.hasTitle && states.hasTitleCaption && <p><RichText.Content value={item.titleCaption}/></p>}
						</div>
					</header>
					<div class="contents">
						{states.hasSubTitle && <h4><RichText.Content value={item.subTitle}/></h4>}
						<p><RichText.Content value={item.text}/></p>
					</div>
					{states.hasLink && item.linkUrl && <div className='link'><a href={item.linkUrl}> </a></div>}
				</li>
			);
		});
		return <ul className={classes}><RichText.Content value={rtn}/></ul>;
	}
});