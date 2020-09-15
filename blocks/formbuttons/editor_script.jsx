registerBlockType('catpow/formbuttons',{
	title: '🐾 FormButtons',
	description:'フォーム用のボタンです。',
	icon: 'upload',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes}=attributes;
		const primaryClass='wp-block-catpow-formbuttons';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
        
		var selectiveClasses=[
			{label:'サイズ',filter:'size',values:{l:'大',m:'中',s:'小',ss:'極小'}},
			{label:'インライン',values:'i'}
		];
		const itemClasses=[
			'color',
			{label:'属性',filter:'rank',values:['default','primary','negative','danger','secure']},
			{label:'アイコン',values:'hasIcon',sub:[
				{input:'icon'}
			]},
			'event'
		];
		
		const saveItems=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		}
		
		let rtn=[];
		
		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
				>
					<div class="button">
						{itemStates.hasIcon && 
							<span className="icon">
								<img src={item.iconSrc} alt={item.iconAlt}/>
							</span>
						}
						<span
							onInput={(e)=>{item.text=e.target.innerText;}}
							onBlur={saveItems}
							contentEditable="true"
						>{item.text}</span>
						<span class="action"
							onInput={(e)=>{item.action=e.target.innerText;}}
							onBlur={saveItems}
							contentEditable="true"
						>{item.action}</span>
					</div>
				</Item>
			);
		});
		
		if(attributes.EditMode===undefined){attributes.EditMode=false;}
		
        return [
			<ul className={classes}>{rtn}</ul>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.buttons || {}}
				/>
				<SelectItemClassPanel
					title='ボタン'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					itemClasses={itemClasses}
					filters={CP.filters.buttons || {}}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<BlockControls>
				<AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>
        ];
    },
	save({attributes,className}){
		const {items,classes}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		
		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes}>
					<div
						className="button"
						data-action={item.action}
						data-target={item.target}
						ignore-message={item.ignoreMessage}
						data-event={item.event}
					>
						{itemStates.hasIcon && 
							<span className="icon">
								<img src={item.iconSrc} alt={item.iconAlt}/>
							</span>
						}
						{item.text}
					</div>
				</li>
			);
		});
		return <ul className={classes}>{rtn}</ul>;
	},
});