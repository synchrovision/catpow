CP.config.sphere={
	imageKeys:{
		image:{src:"src",alt:"alt",items:"items"}
	}
};
wp.blocks.registerBlockType('catpow/sphere',{
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
					src:wpinfo.theme_url+'/images/dummy_icon.svg',
					alt:'dummy',
					text:['Text'],
					linkUrl:wpinfo.home_url
				}
			})
		},
		countPrefix:{source:'text',selector:'.counter .prefix',default:''},
		countSuffix:{source:'text',selector:'.counter .suffix',default:''}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {useState,useMemo}=wp.element;
		const {items=[],classes='',countPrefix,countSuffix}=attributes;
		const primaryClass='wp-block-catpow-sphere';

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.sphere;

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'size',type:'buttons',label:'サイズ',filter:'size',values:['small','medium','large']},
				{name:'image',label:'画像',values:'hasSubImage'},
				{name:'subTitle',label:'タイトル',values:'hasSubTitle'},
				{name:'text',label:'テキスト',values:'hasText'}
			];
			wp.hooks.applyFilters('catpow.blocks.sphere.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		const selectiveItemClasses=useMemo(()=>{
			const selectiveItemClasses=['color'];
			wp.hooks.applyFilters('catpow.blocks.sphere.selectiveItemClasses',CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		},[]);

		let rtn=[];
		const save=()=>{
			setAttributes({items:JSON.parse(JSON.stringify(items))});
		};

		items.map((item,index)=>{
			if(!item.controlClasses){item.controlClasses='control';}
			rtn.push(
				<CP.Item
					tag='li'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
				>
					<div class="contents">
						{states.hasSubImage &&
							<div className='image'>
								<CP.SelectResponsiveImage
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
									onChange={(subTitle)=>{items[index].subTitle=subTitle;save();}}
									value={item.subTitle}
									placeholder='SubTitle'
								/>
							</h4>
						}
						{states.hasText &&
							<p>
								<RichText
									onChange={(text)=>{items[index].text=text;save();}}
									value={item.text}
								/>
							</p>
						}
					</div>
				</CP.Item>
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
				<CP.SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classes}
					/>
				</PanelBody>
				<CP.SelectClassPanel
					title='アイテム'
					icon='edit'
					set={setAttributes}
					attr={attributes}
					items={items}
					index={attributes.currentItemIndex}
					selectiveClasses={selectiveItemClasses}
				/>
				<CP.ItemControlInfoPanel/>
			</InspectorControls>,
			<ul className={attributes.EditMode?(primaryClass+' edit'):classes}>{rtn}</ul>
		];
	},
	save({attributes,className}){
		const {items=[],classes='',countPrefix,countSuffix}=attributes;

		const states=CP.wordsToFlags(classes);
		const {imageKeys}=CP.config.sphere;

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