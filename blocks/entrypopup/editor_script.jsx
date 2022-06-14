registerBlockType('catpow/entrypopup',{
	title:'🐾 EntryPopup',
	description:'サイト・ページ訪問時に表示されるポップアップ。',
	icon:'admin-comments',
	category:'catpow',
	edit({attributes,className,setAttributes}){
		const {Fragment,useState,useMemo}=wp.element;
		const [open,setOpen]=useState(false);
		
		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{input:'buttons',name:'target',label:'表示条件',values:{site:'サイトで一回',page:'ページで一回',every:'毎回表示'},key:'target'}
			];
			wp.hooks.applyFilters('catpow.blocks.entrypopup.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);
		
		return (
			<Fragment>
				<div className={"collapsible_content "+(open?'open':'close')}>
					<div class="label" onClick={()=>setOpen(!open)}>🐾 EntryPopup</div>
					<div className={attributes.classes}>
						<div className="body">
							<div className="contents">
								<InnerBlocks/>
							</div>
							<div className="close" onClick={()=>setOpen(false)}></div>
						</div>
						<div class="bg"></div>
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel
						title={__('クラス','catpow')}
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
				</InspectorControls>
			</Fragment>
		);
	},


	save({attributes,className,setAttributes}){
		return (
			<div className={attributes.classes}>
				<div className="body">
					<div className="contents">
						<InnerBlocks.Content/>
					</div>
					<div className="close"></div>
				</div>
				<div className="bg"></div>
			</div>
		);
	}
});

