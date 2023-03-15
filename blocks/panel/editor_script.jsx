CP.config.panel={
	imageKeys:{
		icon:{src:"iconSrc",alt:"iconAlt",items:"items"},
		image:{src:"src",alt:"alt",items:"items"}
	}
};
wp.blocks.registerBlockType('catpow/panel',{
	title: '🐾 Panel',
	description:'大小の矩形パネルをレイアウトします。',
	icon: 'grid-view',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {BlockControls,InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl,TextControl,ToolbarGroup} = wp.components;
		const {classes,items=[]}=attributes;
		const primaryClass='wp-block-catpow-panel';
		var classArray=_.uniq((classes).split(' '));

		const {imageKeys}=CP.config.panel;

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{
					name:'type',
					label:'タイプ',
					filter:'type',
					values:{tile:'タイル',menu:'メニュー'},
					item:{
						tile:[
							'color',
							{name:'brightText',label:'白文字',values:'brightText',sub:[
								{name:'colorBG',label:'色付き背景',values:'colorBG'}
							]},
							{name:'icon',label:'アイコン',values:'hasIcon',sub:[
								{input:'icon'}
							]},
							{name:'title',label:'タイトル',values:'hasTitle'},
							{name:'text',label:'文章',values:'hasText'},
							{name:'image',label:'画像',values:'hasImage',sub:[
								{name:'paleImage',label:'画像を薄く',values:'paleImage'},
								{name:'image',label:'画像',input:'image',keys:imageKeys.image,size:'vga'}
							]},
							{name:'link',label:'リンク',values:'hasLink',sub:[
								{name:'external',label:'外部リンク',values:'linkExternal'}
							]},
							{name:'rowSpan',type:'buttons',label:'縦サイズ',values:{rspan1:'1',rspan2:'2',rspan3:'3'}},
							{name:'colSpan',type:'buttons',label:'横サイズ',values:{cspan1:'1',cspan2:'2',cspan3:'3'}}
						],
						menu:[
							'color',
							{name:'icon',label:'アイコン',values:'hasIcon',sub:[
								{input:'icon'}
							]},
							{name:'title',label:'タイトル',values:'hasTitle'},
							{name:'text',label:'文章',values:'hasText'},
							{name:'image',label:'画像',values:'hasImage',sub:[
								{name:'image',label:'画像',input:'image',keys:imageKeys.image,size:'vga'}
							]},
							{name:'link',label:'リンク',values:'hasLink',sub:[
								{name:'external',label:'外部リンク',values:'linkExternal'}
							]},
							{name:'rowSpan',type:'buttons',label:'縦サイズ',values:{rspan1:'1',rspan2:'2',rspan3:'3'}},
							{name:'colSpan',type:'buttons',label:'横サイズ',values:{cspan1:'1',cspan2:'2',cspan3:'3'}}
						]
					},
					bind:{
						tile:['panel'],
						menu:['panel']
					}
				},
				{
					name:'size',
					label:'サイズ',
					values:{
						column1:'1/1',
						column2:'1/2',
						column3:'1/3',
						column4:'1/4'
					}
				},
				{
					name:'columnsCount',
					label:'カラム数',
					values:{
						grid18:'1-2-3-6-9-18',
						grid24:'1-2-3-4-6-8-12-24',
						grid27:'1-3-9-27',
						grid32:'1-2-4-8-16-32',
					}
				}
			];
			wp.hooks.applyFilters('catpow.blocks.panel.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));

		let rtn=[];

		let totalGrid=0;

		itemsCopy.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			var itemStates={
				hasIcon:false,
				hasTitle:false,
				hasText:false,
				hasImage:false,
				hasLink:false,
				linkExternal:false
			}
			var itemClassArray=(item.classes || '').split(' ');
			Object.keys(itemStates).forEach(function(key){this[key]=itemClassArray.indexOf(key)!==-1;},itemStates);

			totalGrid+=
				(CP.getNumberClass({attr:item},'rspan') || 1) * 
				(CP.getNumberClass({attr:item},'cspan') || 1);

			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
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
					<div className="texts">
						{itemStates.hasIcon && <CP.OutputIcon item={item}/>}
						{itemStates.hasTitle && 
							<RichText
								tagName="h3"
								className="title"
								onChange={(title)=>{itemsCopy[index].title=title;setAttributes({items:itemsCopy});}}
								value={item.title}
							/>
						}
						{itemStates.hasText &&
							<RichText
								tagName="p"
								className="text"
								onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
								value={item.text}
							/>
						}
						{itemStates.hasLink &&
							<div className='link'>
								<TextControl onChange={(linkUrl)=>{
									itemsCopy[index].linkUrl=linkUrl;
									setAttributes({items:itemsCopy});
								}} value={item.linkUrl}/>
							</div>
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
								icon:'edit',
								title:'EditMode',
								isActive:attributes.EditMode,
								onClick:()=>setAttributes({EditMode:!attributes.EditMode})
							}
						]}
					/>
				</BlockControls>
				<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
					<CP.SelectClassPanel
						title='パネル'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={itemsCopy}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses[0]}
					/>
					<PanelBody title="info" icon="admin-generic" initialOpen={false}>
						<p>合計グリッド数：{totalGrid}</p>
					</PanelBody>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
			</>
		);
	},
	save({attributes,className}){
		const {RichText}=wp.blockEditor;
		const {classes='',items=[]}=attributes;
		let rtn=[];
		items.map((item,index)=>{
			var itemStates={
				hasIcon:false,
				hasTitle:false,
				hasText:false,
				hasImage:false,
				hasLink:false,
				linkExternal:false
			}
			var itemClassArray=(item.classes || '').split(' ');
			Object.keys(itemStates).forEach(function(key){this[key]=itemClassArray.indexOf(key)!==-1;},itemStates);


			rtn.push(
				<li className={item.classes} key={index}>
					{itemStates.hasImage && <div className='image'><img src={item.src} alt={item.alt}/></div>}
					<div className="texts">
						{itemStates.hasIcon && <CP.OutputIcon item={item}/>}
						{itemStates.hasTitle && <RichText.Content tagName="h3" className="title" value={item.title}/>}
						{itemStates.hasText && <RichText.Content tagName="p" className="text" value={item.text}/>}
						{itemStates.hasLink &&
							<div className='link'>
								<a
									href={item.linkUrl}
									target={itemStates.linkExternal?'_brank':false}
									rel={itemStates.linkExternal?'noopener noreferrer':'bookmark'}
								> </a>
							</div>
						}
					</div>
				</li>
			);
		});
		return (
			<ul className={classes}>{rtn}</ul>
		);
	}
});
