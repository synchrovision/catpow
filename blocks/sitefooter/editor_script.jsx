const {__}=wp.i18n;

wp.blocks.registerBlockType('catpow/sitefooter',{
	title:'🐾 SiteFooter',
	description:__('サイト共通フッタのブロックです。','catpow'),
	icon:'welcome-widgets-menus',
	category:'catpow-parts',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-sitefooter'},
		copyright:{source:'text',selector:'.copyright',default:'powered by wordpress'}
	},
	example:CP.example,
	edit(props){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls,RichText}=wp.blockEditor;
		const {attributes,className,setAttributes,context}=props;
		const {classes=''}=attributes;
		const {Fragment}=wp.element;
		
		const states=CP.wordsToFlags(classes);
		
		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[];
			wp.hooks.applyFilters('catpow.blocks.sitefooter.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return (
			<>
				<div id="SiteFooter" className={classes}>
					<div className="contents">
						<InnerBlocks template={[['core/paragraph',{content:CP.dummyText.text}]]} templateLock={false}/>
					</div>
					<RichText tagName="div" className="copyright" value={attributes.copyright} onChange={(copyright)=>setAttributes({copyright})}/>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
				</InspectorControls>
			</>
		);
	},


	save({attributes,className,setAttributes}){
		const {InnerBlocks,RichText}=wp.blockEditor;
		const {classes=''}=attributes;
		
		const states=CP.wordsToFlags(classes);
		
		return (
			<div id="SiteFooter" className={classes}>
				<div className="contents">
					<InnerBlocks.Content/>
				</div>
				<div className="copyright"><RichText.Content value={attributes.copyright}/></div>
			</div>
		);
	}
});

