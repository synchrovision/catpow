wp.blocks.registerBlockType('catpow/tabs',{
	title:'🐾 Tabs',
	description:'タブによる表示切り替えのブロックです。',
	icon:'editor-code',
	category:'catpow',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-tabs left'},
		items:{
			source:'query',
			selector:'ul.tab li.item',
			query:{
				title:{source:'html',selector:'h3'},
			},
			default:[...Array(3)].map(()=>{
				return {title:['title']};
			})
		}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {classes,items}=attributes;
		const primaryClass='wp-block-catpow-tabs';

		var template=[],realTabs=[];
		for(var i=0;i<items.length;i++){
			template.push(['catpow/tabscontent']);
		}

		let itemsCopy=items.map((obj)=>jQuery.extend(true,{},obj));
		let rtn=[];

		var currentIndex=attributes.currentIndex || 0;

		itemsCopy.map((item,index)=>{
			var className=(currentIndex==index)?'active':(currentIndex>index)?'before':'after';
			rtn.push(
				<CP.Item
					tag='li'
					className={className}
					set={setAttributes}
					attr={attributes}
					items={itemsCopy}
					index={index}
					isSelected={isSelected}
					key={index}
				>
					<h3 onClick={()=>{setAttributes({currentIndex:index})}}>
						<RichText
							onChange={(title)=>{itemsCopy[index].title=title;setAttributes({items:itemsCopy});}}
							value={item.title}
						/>
					</h3>
				</CP.Item>
			)
		});

		return (
			<div className={classes} data-current-index={currentIndex}>
				<ul className="tab">{rtn}</ul>
				<div className="contents">
					<InnerBlocks
						template={template}
						templateLock='all'
					/>
				</div>
			</div>
		);
	},


	save({attributes,className,setAttributes}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {classes,items}=attributes;

		let rtn=[];
		items.map((item,index)=>{
			rtn.push(
				<li className='item' key={index}><h3><RichText.Content value={item.title}/></h3></li>
			);
		});

		return (
			<div className={classes}>
				<ul className="tab">{rtn}</ul>
				<div className="contents">
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	}
});

wp.blocks.registerBlockType('catpow/tabscontent',{
	title:'🐾 TabsContent',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/tabs'],
	edit({attributes,className,setAttributes}){
		const {InnerBlocks}=wp.blockEditor;
		return (
			<div className={'tabs_content'}>
				<InnerBlocks template={[['catpow/section']]} templateLock={false}/>
			</div>
		);
	},
	save({attributes,className,setAttributes}){
		const {InnerBlocks}=wp.blockEditor;
		return (
			<div className={'tabs_content'}>
				<InnerBlocks.Content/>
			</div>
		);
	}
});