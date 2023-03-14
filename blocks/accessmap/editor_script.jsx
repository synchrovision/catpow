CP.config.accessmap={
	imageKeys:{
		mapImage:{src:"mapImageSrc",alt:"mapImageAlt",code:"mapImageCode",items:"items"}
	}
};

wp.blocks.registerBlockType('catpow/accessmap',{
	title: '🐾 Access Map',
	description:'地図とアクセス情報を表示',
	icon: 'location-alt',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo,useCallback,useEffect}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {Icon,PanelBody,TextareaControl}=wp.components;
		const {classes,TitleTag,items=[],z,t,hl,loopCount,doLoop}=attributes;
		const primaryClassName='wp-block-catpow-accessmap';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		const {bem,classNamesToFlags,flagsToClassNames}=Catpow.util;

		var states=useMemo(()=>CP.wordsToFlags(classes),[classes]);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'size',type:'buttons',label:'サイズ',values:['small','medium','large']},
				{name:'titleTag',input:'buttons',filter:'titleTag',key:'TitleTag',label:'タイトルタグ',values:['h2','h3','h4'],effect:(val,{set})=>{
					if(/^h\d$/.test(val)){set({titleTag:'h'+(parseInt(val[1])+1)})}
				}},
				{name:'t',key:'t',input:'select',label:'タイプ',values:{m:'地図',k:'航空写真',h:'地図 + 航空写真',p:'地形図',e:'Google Earth'}},
				{name:'z',key:'z',input:'range',label:'ズーム',min:0,max:23},
				{name:'hl',key:'hl',input:'buttons',label:'言語',values:['ja','us','zh-CN','zh-TW']},
				{
					name:'template',
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
			wp.hooks.applyFilters('catpow.blocks.accessmap.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const selectiveItemClasses=[
				{name:'q',key:'q',input:'text',label:'マーカー'},
				{name:'ll',key:'ll',input:'text',label:'中心座標'}
			];
			wp.hooks.applyFilters('catpow.blocks.accessmap.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);
		const selectiveItemTemplateClasses=useMemo(()=>{
			const selectiveItemTemplateClasses=[
				{
					name:'imageMapCode',
					input:'text',
					label:'地図画像コード',
					key:'imageCode',
					cond:'hasImage'
				}
			];
			wp.hooks.applyFilters('catpow.blocks.accessmap.selectiveItemTemplateClasses',CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		},[]);

		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		let rtn=[];
		const {imageKeys}=CP.config.accessmap;

		[...Array(Math.max(items.length,loopCount)).keys()].forEach((i)=>{
			const index=i%items.length;
			const item=items[index];
			let q=item.q || item.address.replace(/<br\/?>|\n/,' ');
			let url=`https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
			if(!!item.ll){url+=`&ll=${item.ll}`;}
			
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
					key={i}
				>
					<div className="map">
						{states.isTemplate?(
							<CP.DummyImage text={q}/>
						):(
							<iframe src={url} frameBorder="0" className="gmap" data-ll={item.ll || false} data-q={item.q || false}></iframe>
						)}
					</div>
					<div className="access">
						<RichText
							tagName={TitleTag}
							className="title"
							onChange={(title)=>{item.title=title;save();}}
							value={item.title}
						/>
						<RichText
							tagName='div'
							className="address"
							onChange={(address)=>{item.address=address;save();}}
							value={item.address}
						/>
						<RichText
							tagName='div'
							className="info"
							onChange={(info)=>{item.info=info;save();}}
							value={item.info}
						/>
					</div>
				</CP.Item>
			);
		});
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
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
						filters={CP.filters.accessmap || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
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
						filters={CP.filters.accessmap || {}}
					/>
					{states.isTemplate &&
						<CP.SelectClassPanel
							title='テンプレート'
							icon='edit'
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={selectiveItemTemplateClasses}
							filters={CP.filters.accessmap || {}}
						/>
					}
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
								{type:'text',key:'q'},
								{type:'text',key:'ll'},
								{type:'text',key:'title'},
								{type:'text',key:'zipcode'},
								{type:'text',key:'address'},
								{type:'text',key:'info'},
								{type:'text',key:'tel'},
								{type:'text',key:'mail'}
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				):(
					<>
						{(attributes.AltMode && doLoop)?(
							<div className="alt_content">
								<div className="label">
									<Icon icon="welcome-comments"/>
								</div>
								<InnerBlocks/>
							</div>
						):(
							<div className={classes}>{rtn}</div>
						)}
					</>
				)}
			</>
		);
	},
	save({attributes,className}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {classes,TitleTag,items=[],z,t,hl,doLoop}=attributes;
		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.accessmap;

		let rtn=[];
		items.map((item,index)=>{
			let url=`https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=`;
			url+=item.q || item.address;
			if(!!item.ll){url+=`&ll=${item.ll}`;}
			rtn.push(
				<div className="item" key={index}>
					<div className="map">
						<iframe src={url} frameBorder="0" className="gmap" ll={item.ll} q={item.q}></iframe>
					</div>
					<div className="access">
						<RichText.Content tagName={TitleTag} className="title" value={item.title}/>
						<RichText.Content tagName="div" className="address" value={item.address}/>
						<RichText.Content tagName="div" className="info" value={item.info}/>
					</div>
				</div>
			);
		});
		return (
			<>
				<div className={classes}>
					{rtn}
				</div>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</>
		);
	}
});