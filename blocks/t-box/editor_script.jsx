registerBlockType('catpow/t-box',{
	title:'🐾 T-Box',
	description:'HTMLメール用のレイアウト調整用コンテナブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
	parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-box large'}
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {classes}=attributes;
		const primaryClass='wp-block-catpow-t-box';
		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{name:'size',label:'サイズ',values:['large','medium','small']}
			];
			wp.hooks.applyFilters('catpow.blocks.t-box.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return [
			<table className={classes}>
				<tbody>
					<tr>
						<td>
							<InnerBlocks/>
						</td>
					</tr>
				</tbody>
			</table>,
			<InspectorControls>
				<CP.SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters['t-box'] || {}}
				/>
				<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
					<TextareaControl
						label='クラス'
						onChange={(classes)=>setAttributes({classes})}
						value={classes}
					/>
				</PanelBody>
			</InspectorControls>
		];
	},


	save({attributes,className,setAttributes}){
		const {classes}=attributes;
		const primaryClass='wp-block-catpow-t-box';
		var states=CP.wordsToFlags(classes);
		return (
			<table className={classes}>
				<tbody>
					<tr>
						<td>
							<InnerBlocks.Content/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
});

