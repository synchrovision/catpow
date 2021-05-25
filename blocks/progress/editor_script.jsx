registerBlockType('catpow/progress',{
	title: '🐾 Progress',
	description:'進捗のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useMemo,useCallback}=wp.element;
		const {items=[],classes,currentItemIndex}=attributes;
		const primaryClass='wp-block-catpow-progress';
		
		var states=CP.wordsToFlags(classes);
		
		const selectiveClasses=useMemo(()=>[
			{input:'range',label:'進捗',min:0,max:items.length-1,key:'progress'},
			{label:'番号',values:'hasCounter',sub:[
				{input:'text',label:'番号前置テキスト',key:'countPrefix'},
				{input:'text',label:'番号後置テキスト',key:'countSuffix'}
			]}
		],[items.length]);
		
		const save=useCallback(()=>{
			setAttributes({items:JSON.parse(JSON.stringify(attributes.items))});
		},[setAttributes,attributes]);
		
		
		const Items=useCallback((props)=>{
			const {countPrefix,countSuffix}=attributes;
			const states=CP.wordsToFlags(attributes.classes);
			return attributes.items.map((item,index)=>(
				<CP.Item
					tag='li'
					className={(index==attributes.progress?'active':'')}
					set={setAttributes}
					attr={attributes}
					items={attributes.items}
					index={index}
				>
					{states.hasCounter &&
						<div className='counter'>
							{countPrefix && <span class="prefix">{countPrefix}</span>}
							<span className="number">{index+1}</span>
							{countSuffix && <span class="suffix">{countSuffix}</span>}
						</div>
					}
					<div className='label'>
						<RichText
							onChange={(label)=>{item.label=label;save();}}
							value={item.label}
						/>
					</div>
				</CP.Item>
			));
		},[setAttributes,attributes]);
		
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
						filters={CP.filters.progress || {}}
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
				<Fragment>
					<div className={classes}>
						<ul className="items"><Items/></ul>
					</div>
				</Fragment>
			</Fragment>
        );
    },
	save({attributes,className}){
		const {useMemo,useCallback}=wp.element;
		const {classes=''}=attributes;
		
		const Items=(props)=>{
			const {countPrefix,countSuffix}=attributes;
			const states=CP.wordsToFlags(attributes.classes);
			return attributes.items.map((item,index)=>(
				<li className={'item'+(index==attributes.progress?' active':'')}>
					{states.hasCounter &&
						<div className='counter'>
							{countPrefix && <span class="prefix">{countPrefix}</span>}
							<span className="number">{index+1}</span>
							{countSuffix && <span class="suffix">{countSuffix}</span>}
						</div>
					}
					<div className='label'>
						<RichText.Content value={item.label}/>
					</div>
				</li>
			));
		};
		
		return (
			<div className={classes} data-progress={attributes.progress}>
				<ul className="items"><Items/></ul>
			</div>
		);
	}
});