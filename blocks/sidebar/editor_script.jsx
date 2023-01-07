wp.blocks.registerBlockType('catpow/sidebar',{
	title:'🐾 Sidebar',
	description:'サイドバーのあるコンテンツ領域のコンテナです。',
	icon:'editor-code',
	category:'catpow',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-sidebar left'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {classes}=attributes;
		const primaryClass='wp-block-catpow-sidebar';
		var classArray=_.uniq((className+' '+classes).split(' '));

		return [
			<div className={classes}>
				<InnerBlocks
					template={[
						['catpow/maincolumn'],
						['catpow/sidecolumn']
					]}
					templateLock='all'
				/>
			</div>,
			<BlockControls>
				<CP.AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>,
			<InspectorControls>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
			</InspectorControls>
		];
	},


	save({attributes,className,setAttributes}){
		const {classes}=attributes;
		return (
			<div className={classes}>
				<InnerBlocks.Content/>
			</div>
		);
	}
});

registerBlockType('catpow/sidecolumn',{
	title:'🐾 SideColumn',
	icon:'editor-code',
	category:'catpow',
	parent:['catpow/sidebar'],
	edit({attributes,className,setAttributes}){
		return [
			<div className={'column column_side'}>
				<div class="column_side_container">
					<InnerBlocks template={[['catpow/articlenav']]} templateLock={false}/>
				</div>
				<div class="sidebar_button"></div>
			</div>
		];
	},
	save({attributes,className,setAttributes}){
		return (
			<div className={'column column_side'}>
				<div class="column_side_container"><InnerBlocks.Content/></div>
				<div class="sidebar_button"></div>
			</div>
		);
	},
	deprecated:[
		{
			save({attributes,className,setAttributes}){
				return (
					<div className={'column column_side'}>
						<InnerBlocks.Content/>
						<div class="sidebar_button"></div>
					</div>
				);
			}
		}
	]
});

registerBlockType('catpow/maincolumn',{
	title:'🐾 MainColumn',
	icon:'editor-code',
	category:'catpow',
	attributes:{
		columnType:{type:'string',default:'main'}
	},
	parent:['catpow/sidebar'],
	edit({attributes,className,setAttributes}){
		return [
			<div className={'column column_main'}>
				<InnerBlocks template={[['catpow/section']]} templateLock={false} />
			</div>
		];
	},
	save({attributes,className,setAttributes}){
		return (
			<div className={'column column_main'}>
				<InnerBlocks.Content/>
			</div>
		);
	}
});

registerBlockType('catpow/articlenav',{
	title:'🐾 ArticelNav',
	icon:'editor-ul',
	category:'catpow',
	parent:['catpow/sidecolumn'],
	edit({attributes,className,setAttributes,clientId}){
		const {useEffect}=wp.element;

		const parentClientId=wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId,'catpow/sidebar')[0];
		const mainContents=wp.data.select('core/block-editor').getBlock(parentClientId).innerBlocks[0].innerBlocks;

		const getSectionTitles=(innerBlocks)=>{
			return innerBlocks.filter((block)=>block.name=='catpow/section').map((block)=>{
				return block.attributes.title;
			});
		}

		return [
			<div className={className}>
				<ul class="article_nav">
					{getSectionTitles(mainContents).map((title)=>{
						return <li><h3><RichText.Content value={title}/></h3></li>;
					})}
				</ul>
			</div>
		];
	},
	save({attributes,className,setAttributes}){
		return (
			<div className={className}></div>
		);
	}
});