registerBlockType('catpow/t-paragraph',{
	title:'🐾 T-Paragraph',
	description:'HTMLメール用の段落ブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
    parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	transforms:{
		from: [
			{
				type:'block',
				blocks:['core/paragraph'],
				transform:(attributes)=>{
					return createBlock('catpow/t-paragraph',{
						classes:'wp-block-catpow-t-paragraph left medium',
						text:attributes.content
					});
				},
			},
			{
				type:'block',
				blocks:['catpow/t-heading'],
				transform:(attributes)=>{
					return createBlock('catpow/t-paragraph',{
						classes:'wp-block-catpow-t-paragraph left medium',
						text:attributes.title
					});
				},
			},
		]
	},
	merge(attributes,attributesToMerge) {
		return {
			text:
				(attributes.text || '')+
				(attributesToMerge.text || '')
		};
	},
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-paragraph medium'},
		text:{source:'children',selector:'tbody td',default:'text'}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,onReplace,mergeBlocks}){
        const {classes,text}=attributes;
		const primaryClass='wp-block-catpow-t-paragraph';
		var states=CP.wordsToFlags(classes);
		
		var selectiveClasses=[
			{label:'サイズ',values:['large','medium','small']}
		];
		
        return [
			<table width="100%" className={classes}>
				<tbody>
					<tr>
						<td>
							<RichText
								identifier="content"
								onMerge={mergeBlocks}
								onSplit={(val)=>{
									if(!val){
										return createBlock('catpow/t-paragraph',{
											classes:'wp-block-catpow-t-paragraph left medium',
										});
									}
									return createBlock('catpow/t-paragraph',{
										...attributes,
										text:val
									});
								}}
								onReplace={onReplace}
								onRemove={()=>onReplace([])}
								onChange={(text)=>{setAttributes({text});}}
								value={text}
							/>
						</td>
					</tr>
				</tbody>
			</table>,
			<BlockControls>
				<AlignClassToolbar set={setAttributes} attr={attributes}/>
			</BlockControls>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters['t-paragraph'] || {}}
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
        const {classes,text}=attributes;
		const primaryClass='wp-block-catpow-t-paragraph';
		return (
			<table width="100%" className={classes}>
				<tbody>
					<tr>
						<td><RichText.Content value={text}/></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

