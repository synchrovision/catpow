registerBlockType('catpow/banners',{
	title: '🐾 Banners',
	description:'リンク付きのバナー画像を並べて表示するブロックです。',
	icon: 'images-alt',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-banners medium hasTitle';
					return createBlock('catpow/banners',attributes);
				}
			}
		]
	},
	attributes:{
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-banners medium hasTitle'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'h3'},
				src:{source:'attribute',selector:'[src]',attribute:'src'},
				srcset:{source:'attribute',selector:'[src]',attribute:'srcset'},
				alt:{source:'attribute',selector:'[src]',attribute:'alt'},
				linkUrl:{source:'attribute',selector:'a',attribute:'href'},
				target:{source:'attribute',selector:'a',attribute:'target'},
				event:{source:'attribute',selector:'a',attribute:'data-event'},
				loopImage:{source:'text',selector:'a'}
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					linkUrl:cp.home_url,
					loopImage:'[output image]'
				}
			})
		},
		loopParam:{type:'text',default:''},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,loopCount,loopImage}=attributes;
		const primaryClass='wp-block-catpow-banners';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states=CP.wordsToFlags(classes);
		const imageKeys={
			image:{src:"src",srcset:"srcset",alt:"alt",items:"items"}
		};
        
		var selectiveClasses=[
			{label:'サイズ',values:['small','medium','large']},
			{label:'タイトル',values:'hasTitle'},
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
		const selectiveItemClasses=[
			{input:'image',label:'PC版画像',keys:imageKeys.image},
			{input:'image',label:'SP版画像',keys:imageKeys.image,ofSP:true,sizes:'480px'},
			{input:'text',label:'alt',key:'alt'},
			{input:'text',label:'target',key:'target'},
			'event'
		];
		const itemTemplateSelectiveClasses=[
			{input:'text',label:'画像',key:'loopImage'}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		
		let rtn=[];

		itemsCopy.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={index}
					isSelected={isSelected}
				>
					{states.hasTitle &&
						<h3>
							<RichText
								onChange={(text)=>{itemsCopy[index].title=text;setAttributes({items:itemsCopy});}}
								value={item.title}
							/>
						</h3>
					}
					<a>
						{states.isTemplate?(
							<DummyImage text={item.loopImage}/>
						):(
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.image}
								index={index}
								size='vga'
							/>
						)}
					</a>
					{isSelected &&
						<div className='link'>
							<p
								contentEditable
								onBlur={(e)=>{
									itemsCopy[index].linkUrl=e.currentTarget.innerHTML;
									setAttributes({items:itemsCopy});
								}}
							>{item.linkUrl}</p>
						</div>
					}
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
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.banners || {}}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
				{states.isTemplate?(
					<SelectItemClassPanel
						title='テンプレート'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={itemsCopy}
						index={attributes.currentItemIndex}
						itemClasses={itemTemplateSelectiveClasses}
						filters={CP.filters.banners || {}}
					/>
				):(
					<SelectItemClassPanel
						title='バナー'
						icon='edit'
						set={setAttributes}
						attr={attributes}
						items={itemsCopy}
						index={attributes.currentItemIndex}
						itemClasses={selectiveItemClasses}
						filters={CP.filters.banners || {}}
					/>
				)}
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items,classes,loopParam}=attributes;
		
		var states=CP.wordsToFlags(classes);
		const imageKeys={
			image:{src:"src",srcset:"srcset",alt:"alt",items:"items"}
		};
		
		return (
			<ul className={classes}>
				{states.doLoop && '[loop_template '+loopParam+']'}
				{
					items.map((item,index)=>{
						return (
							<li className={item.classes}>
								{states.hasTitle && <h3><RichText.Content value={item.title}/></h3>}
								<a href={item.linkUrl} target={item.target} data-event={item.event} rel={item.target?'noopener noreferrer':''}>
									{states.isTemplate?(
										item.loopImage
									):(
										<ResponsiveImage
											attr={attributes}
											keys={imageKeys.image}
											index={index}
										/>
									)}
								</a>
							</li>
						);
					})
				}
				{states.doLoop && '[/loop_template]'}
			</ul>
		);
	},
});