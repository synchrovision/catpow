registerBlockType('catpow/buttons',{
	title: '🐾 Buttons',
	description:'ボタンのブロックです。',
	icon: (
		<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M19.5,11c0,2.8-2.2,5-5,5h-9c-2.8,0-5-2.2-5-5V9c0-2.8,2.2-5,5-5h9c2.8,0,5,2.2,5,5V11z M5.5,5c-2.2,0-4,1.8-4,4
				c0,2.2,1.8,4,4,4h9c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H5.5z"/>
		</svg>
	),
	category: 'catpow',
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-buttons buttons m'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				event:{source:'attribute',selector:'.button',attribute:'data-event'},
				text:{source:'text',selector:'.button'},
				url:{source:'attribute',selector:'.button',attribute:'href'},
				iconSrc:{source:'attribute',selector:'.icon img',attribute:'src'},
				iconAlt:{source:'attribute',selector:'.icon img',attribute:'alt'},
			},
			default:[
				{classes:'item mail primary',event:'',text:'お問合せ',url:'[home_url]/contact'}
			]
		},
		loopParam:{type:'text'},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,loopCount}=attributes;
		const primaryClass='wp-block-catpow-buttons';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
        
		var selectiveClasses=[
			{label:'サイズ',filter:'size',values:{l:'大',m:'中',s:'小',ss:'極小'}},
			{label:'インライン',values:'i'},
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{label:'ループ',values:'doLoop',sub:[
						{label:'パラメータ',input:'text',key:'loopParam'},
						{label:'ループ数',input:'range',key:'loopCount',min:1,max:16}
					]}
				]
			}
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
			setAttributes({rows:JSON.parse(JSON.stringify(rows))});
		}
		
		let rtn=[];
		
		items.map((item,index)=>{
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
							onInput={(e)=>{
								item.text=e.target.innerText;
							}}
							onBlur={(e)=>{saveItems();}}
							contentEditable="true"
						>{item.text}</span>
						{isSelected &&
							<span class="url"
								onInput={(e)=>{
									item.url=e.target.innerText;
								}}
								onBlur={(e)=>{saveItems();}}
								contentEditable="true"
							>{item.url}</span>
						}
					</div>
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
		const {items,classes,loopParam}=attributes;
		const states=CP.wordsToFlags(classes);
		
		let rtn=[];
		items.map((item,index)=>{
			const itemStates=CP.wordsToFlags(item.classes);
			rtn.push(
				<li className={item.classes}>
					<a
						href={item.url}
						className='button'
						data-event={item.event}
					>
						{itemStates.hasIcon && 
							<span className="icon">
								<img src={item.iconSrc} alt={item.iconAlt}/>
							</span>
						}
						{item.text}
					</a>
				</li>
			);
		});
		return (
			<ul className={classes}>
				{states.doLoop && '[loop_template '+loopParam+']'}
				{rtn}
				{states.doLoop && '[/loop_template]'}
			</ul>
		);
	},
});