registerBlockType('catpow/dialog',{
	title: '🐾 Dialog',
	description:'フキダシで会話を表現するブロックです。',
	icon: 'format-chat',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-dialog';
					return createBlock('catpow/dialog',attributes);
				},
			},
		]
	},
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-dialog'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				title:{source:'children',selector:'header .text h3'},
				headerImageSrc:{source:'attribute',selector:'header .image [src]',attribute:'src'},
				headerImageAlt:{source:'attribute',selector:'header .image [src]',attribute:'alt'},
				text:{source:'children',selector:'.contents p'}
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item left',
					title:['Title'],
					titleCaption:['Caption'],
					headerImageSrc:cp.theme_url+'/images/dummy.jpg',
					headerImageAlt:'dummy',
					text:['Text']
				}
			})
		},
		loopParam:{type:'text'},
		loopCount:{type:'number',default:1}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,countPrefix,countSuffix,subCountPrefix,subCountSuffix,loopCount}=attributes;
		const primaryClass='wp-block-catpow-dialog';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var selectiveClasses=[
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
			{label:'position',values:['left','right']},
			{label:'type',filter:'type',values:['say','shout','think','whisper']}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		
		
		let rtn=[];
		const imageKeys={
			headerImage:{src:"headerImageSrc",alt:"headerImageAlt",items:"items"}
		};

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
					<header>
						<div className='image'>
							<SelectResponsiveImage
								attr={attributes}
								set={setAttributes}
								keys={imageKeys.headerImage}
								index={index}
								size='thumbnail'
							/>
						</div>
						<div className='text'>
							<h3>
								<RichText
									onChange={(text)=>{itemsCopy[index].title=text;setAttributes({items:itemsCopy});}}
									value={item.title}
								/>
							</h3>
						</div>
					</header>
					<div class="contents">
						<p>
							<RichText
								onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
								value={item.text}
							/>
						</p>
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
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.banners || {}}
				/>
				<SelectItemClassPanel
					title='リストアイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={attributes.currentItemIndex}
					itemClasses={itemClasses}
					filters={CP.filters.dialog || {}}
				/>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items,classes,countPrefix,countSuffix,subCountPrefix,subCountSuffix,linkUrl,linkText,loopParam}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states=CP.wordsToFlags(classes);
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					<header>
						<div class='image'><img src={item.headerImageSrc} alt={item.headerImageAlt}/></div>
						<div className='text'>
							<h3><RichText.Content value={item.title}/></h3>
						</div>
					</header>
						<div class="contents">
						<p><RichText.Content value={item.text}/></p>
					</div>
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
	}
});