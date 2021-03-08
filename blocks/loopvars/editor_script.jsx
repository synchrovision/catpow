registerBlockType('catpow/loopvars',{
	title: '🐾 LoopVars',
	description:'ブロックの内容を変数のテーブルをループして表示します。各変数はブロック内で[var 変数名]のショートコードで利用できます。',
	icon: 'editor-code',
	category: 'catpow-functional',
	example:CP.example,
	edit({attributes,setAttributes,className}){
        const {items,columns,EditMode=false}=attributes;
		
        return (
			<Fragment>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				{EditMode?(
					<div className="alt_content">
						<div class="label">
							<Icon icon="edit"/>
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={columns}
						/>
					</div>
				):(
					<div className={"embedded_content"}>
						<div className="label">LoopVars</div>
						<InnerBlocks template={[
							['catpow/section',{title:'[var title]'},[
								['core/paragraph',{content:'[var text]'}]
							]]
						]}/>
					</div>
				)}
				<InspectorControls>
					<PanelBody title="変数">
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							itemsKey='columns'
							columns={[
								{type:'text',key:'type'},
								{type:'text',key:'key'},
							]}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
        );
    },

	save({attributes,className,setAttributes}){
		return <InnerBlocks.Content/>;
	}
});