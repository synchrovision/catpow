wp.blocks.registerBlockType('catpow/definition',{
	title: '🐾 Definition',
	description:'定義リストのブロックです',
	icon: 'editor-ul',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-definition';
					return createBlock('catpow/definition',attributes);
				},
			},
		]
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {items=[],classes='',loopCount,doLoop,EditMode=false,AltMode=false}=attributes;
		const primaryClass='wp-block-catpow-definition';
		var classArray=_.uniq((className+' '+classes).split(' '));
		
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
			wp.hooks.applyFilters('catpow.blocks.definition.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};
		
		let rtn=[];

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<CP.Item
					tag='dl'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
				>
					<dt className="title">
						<RichText
							onChange={(title)=>{item.title=title;save();}}
							value={item.title}
						/>
					</dt>
					<dd class="text">
						<RichText
							onChange={(text)=>{item.text=text;save();}}
							value={item.text}
						/>
					</dd>
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
			<Fragment>
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
						filters={CP.filters.definition || {}}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label='クラス'
							onChange={(clss)=>setAttributes({classes:clss})}
							value={classArray.join(' ')}
						/>
					</PanelBody>
					<CP.ItemControlInfoPanel/>
				</InspectorControls>
				{EditMode?(
					<div className="alt_content">
						<div class="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{type:'text',key:'title',cond:states.hasTitle},
								{type:'text',key:'text',cond:states.hasText}
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
							<div className={classes}>{rtn}</div>
						)}
					</Fragment>
				)}
			</Fragment>
		);
	},
	save({attributes,className}){
		const {items=[],classes='',loopCount,doLoop,}=attributes;
		const states=CP.wordsToFlags(classes);
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<dl className="item">
					<dt className="title"><RichText.Content value={item.title}/></dt>
					<dd className="text"><RichText.Content value={item.text}/></dd>
				</dl>
			);
		});
		return (
			<Fragment>
				<div className={classes}>
					{rtn}
				</div>
				{doLoop && <onEmpty><InnerBlocks.Content/></onEmpty>}
			</Fragment>
		);
	}
});