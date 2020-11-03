registerBlockType('catpow/icons',{
	title: '🐾 Icons',
	description:'リンク付きのアイコン画像を並べて表示するブロックです。',
	icon: 'image-filter',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-icons medium hasSubTitle hasText';
					return createBlock('catpow/icons',attributes);
				},
			},
		]
	},
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-icons'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				src:{source:'attribute',selector:'[src]',attribute:'src'},
				alt:{source:'attribute',selector:'[src]',attribute:'alt'},
				href:{source:'attribute',selector:'a',attribute:'href'},
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					src:cp.theme_url+'/images/dummy_icon.svg',
					alt:'dummy',
					href:cp.home_url
				}
			})
		}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items=[],classes,countPrefix,countSuffix}=attributes;
		const primaryClass='wp-block-catpow-icons';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
        
		var selectiveClasses=[
			{label:'サイズ',filter:'size',values:['small','medium','large']},
			{label:'塗り',values:"filled",sub:[
				 {label:'形状',filter:'shape',values:{circle:"丸",square:"四角"}},
			 ]}
		];
		
		let rtn=[];
		
		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={attributes.currentItemIndex==index}
				>
					<a>
						<img src={item.src} alt={item.alt}/>
					</a>
				</Item>
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
				<AlignClassToolbar
					set={setAttributes}
					attr={attributes}
				/>
			</BlockControls>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
				<SelectClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					selectiveClasses={[
						{input:'image',keys:{src:'src',alt:'alt'},size:'thumbnail'},
						{input:'text',key:'href',label:'リンク'},
						'color'
					]}
				/>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items=[],classes,countPrefix,countSuffix}=attributes;
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					<a href={item.href}>
						<img src={item.src} alt={item.alt}/>
					</a>
				</li>
			);
		});
		return <ul className={classes}>{rtn}</ul>;
	}
});