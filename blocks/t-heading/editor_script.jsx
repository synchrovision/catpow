registerBlockType('catpow/t-heading',{
	title:'🐾 T-Heading',
	description:'HTMLメール用の見出しブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
    parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	transforms:{
		from: [
			{
				type:'block',
				blocks:['core/paragraph'],
				transform:(attributes)=>{
					return createBlock('catpow/t-heading',{
						classes:'wp-block-catpow-t-heading header center medium',
						text:attributes.content
					});
				},
			},
			{
				type:'block',
				blocks:['catpow/t-paragraph'],
				transform:(attributes)=>{
					return createBlock('catpow/t-heading',{
						classes:'wp-block-catpow-t-heading header center medium',
						title:attributes.text
					});
				},
			},
		]
	},
	merge(attributes,attributesToMerge) {
		return {
			title:
				(attributes.title || '')+
				(attributesToMerge.title || '')
		};
	},
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-heading header medium center'},
		title:{source:'children',selector:'tbody td',default:'Title'}
	},
	example:CP.example,
	edit({attributes,className,setAttributes,onReplace,mergeBlocks}){
        const {classes,title}=attributes;
		const primaryClass='wp-block-catpow-t-heading';
		var states=CP.wordsToFlags(classes);
		
		var selectiveClasses=[
			'color',
			{label:'タイプ',values:['header','headline','catch']},
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
								multiline={false}
								onSplit={(val)=>{
									if(!val){
										return createBlock('catpow/t-paragraph',{
											classes:'wp-block-catpow-t-paragraph left medium'
										});
									}
									return createBlock('catpow/t-heading',{
										...attributes,
										title:val
									});
								}}
								onReplace={onReplace}
								onRemove={()=>onReplace([])}
								onChange={(title)=>{setAttributes({title});}}
								value={title}
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
					filters={CP.filters['t-heading'] || {}}
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
        const {classes,title}=attributes;
		const primaryClass='wp-block-catpow-t-heading';
		return (
			<table width="100%" className={classes}>
				<tbody>
					<tr>
						<td><RichText.Content value={title}/></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

