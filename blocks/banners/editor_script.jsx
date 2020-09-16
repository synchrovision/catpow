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
				imageCode:{source:'text',selector:'a'},
				linkUrl:{source:'attribute',selector:'a',attribute:'href'},
				target:{source:'attribute',selector:'a',attribute:'target'},
				event:{source:'attribute',selector:'a',attribute:'data-event'}
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					src:cp.theme_url+'/images/dummy.jpg',
					alt:'dummy',
					linkUrl:cp.home_url,
					imageCode:'[output image]'
				}
			})
		},
		loopParam:{type:'text',default:''},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,loopCount,imageCode}=attributes;
		const primaryClass='wp-block-catpow-banners';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states=CP.wordsToFlags(classes);
		const imageKeys={
			image:{src:"src",srcset:"srcset",alt:"alt",code:'imageCode',items:"items"}
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
			{input:'text',label:'画像',key:'imageCode'}
		];
		
		const save=()=>{
			setAttibutes({items:JSON.parse(JSON.stringify(items))});
		};
		
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
					isSelected={isSelected}
				>
					{states.hasTitle &&
						<h3>
							<RichText
								onChange={(title)=>{item.title=title;save();}}
								value={item.title}
							/>
						</h3>
					}
					<a>
						<SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							size='vga'
							isTemplate={states.isTemplate}
						/>
					</a>
					{isSelected &&
						<div className='link'>
							<p
								contentEditable
								onBlur={(e)=>{
									item.linkUrl=e.currentTarget.innerHTML;
									save();
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
						items={items}
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
						items={items}
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
			image:{src:"src",srcset:"srcset",alt:"alt",code:'imageCode',items:"items"}
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
									<ResponsiveImage
										attr={attributes}
										keys={imageKeys.image}
										index={index}
										isTemplate={states.isTemplate}
									/>
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