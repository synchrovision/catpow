registerBlockType('catpow/sphere',{
	title: '🐾 Sphere',
	description:'ログイン中のユーザーの情報を表示するためのコンテナです。',
	icon: 'image-filter',
	category: 'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:CP.listedConvertibles,
				transform:(attributes)=>{
					attributes.classes='wp-block-catpow-sphere medium hasSubTitle hasText';
					return createBlock('catpow/sphere',attributes);
				},
			},
		]
	},
	attributes:{
		version:{type:'number',default:0},
		classes:{source:'attribute',selector:'ul',attribute:'class',default:'wp-block-catpow-sphere'},
		items:{
			source:'query',
			selector:'li.item',
			query:{
				classes:{source:'attribute',attribute:'class'},
				subImageSrc:{source:'attribute',selector:'.contents .image [src]',attribute:'src'},
				subImageAlt:{source:'attribute',selector:'.contents .image [src]',attribute:'alt'},
				subTitle:{source:'children',selector:'.contents h4'},
				text:{source:'children',selector:'.contents p'},
			},
			default:[...Array(3)].map(()=>{
				return {
					classes:'item',
					title:['Title'],
					titleCaption:['Caption'],
					subTitle:['SubTitle'],
					src:cp.theme_url+'/images/dummy_icon.svg',
					alt:'dummy',
					text:['Text'],
					linkUrl:cp.home_url
				}
			})
		},
		countPrefix:{source:'text',selector:'.counter .prefix',default:''},
		countSuffix:{source:'text',selector:'.counter .suffix',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes,countPrefix,countSuffix}=attributes;
		const primaryClass='wp-block-catpow-sphere';
		var classArray=_.uniq((className+' '+classes).split(' '));
		var classNameArray=className.split(' ');
		
		var states={
			hasSubImage:false,
			hasSubTitle:false,
			hasText:false
		}
		
        
		var selectiveClasses=[
			{label:'サイズ',filter:'size',values:['small','medium','large']},
			{label:'画像',values:'hasSubImage'},
			{label:'タイトル',values:'hasSubTitle'},
			{label:'テキスト',values:'hasText'}
		];
		
		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
		
		let rtn=[];
		const imageKeys={
			image:{src:"src",alt:"alt",items:"items"}
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
					<div class="contents">
						{states.hasSubImage &&
							<div className='image'>
								<SelectResponsiveImage
									attr={attributes}
									set={setAttributes}
									keys={imageKeys.subImage}
									index={index}
									size='medium'
								/>
							</div>
						}
						{states.hasSubTitle &&
							<h4>
								<RichText
									onChange={(subTitle)=>{itemsCopy[index].subTitle=subTitle;setAttributes({items:itemsCopy});}}
									value={item.subTitle}
									placeholder='SubTitle'
								/>
							</h4>
						}
						{states.hasText &&
							<p>
								<RichText
									onChange={(text)=>{itemsCopy[index].text=text;setAttributes({items:itemsCopy});}}
									value={item.text}
								/>
							</p>
						}
					</div>
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
				<SelectItemClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={attributes.currentItemIndex}
					itemClasses={['color']}
				/>
				<ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
        ];
    },
	save({attributes,className}){
		const {items,classes,countPrefix,countSuffix}=attributes;
		var classArray=_.uniq(attributes.classes.split(' '));
		
		var states={
			hasSubImage:false,
			hasSubTitle:false,
			hasText:false
		}
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
		
		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className={item.classes}>
					<div class="contents">
						{states.hasSubImage && <div className='image'><img src={item.subImageSrc} alt={item.subImageAlt}/></div>}
						{states.hasSubTitle && <h4><RichText.Content value={item.subTitle}/></h4>}
						{states.hasText && <p><RichText.Content value={item.text}/></p>}
					</div>
				</li>
			);
		});
		return <ul className={classes}>{rtn}</ul>;
	}
});