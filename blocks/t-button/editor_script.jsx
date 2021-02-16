registerBlockType('catpow/t-button',{
	title:'🐾 T-Button',
	description:'HTMLメール用のテーブルレイアウトのボタンです。',
	icon:'editor-code',
	category:'catpow-mail',
    parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	attributes:{
		classes:{source:'attribute',selector:'a',attribute:'class',default:'wp-block-catpow-t-button medium'},
		title:{source:'children',selector:'tbody td',default:'Title'},
		url:{source:'attribute',selector:'a',attribute:'href',default:cp.home_url},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
        const {classes,title}=attributes;
		const primaryClass='wp-block-catpow-t-button';
		var states=CP.wordsToFlags(classes);
		
		var selectiveClasses=[
			'color',
			{label:'サイズ',values:['large','medium','small']},
			{input:'text',label:'URL',key:'url'}
		];
		
        return [
			<a className={classes}>
				<table width="100%">
					<tbody>
						<tr>
							<td>
								<RichText
									onChange={(title)=>{setAttributes({title});}}
									value={title}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</a>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters['t-button'] || {}}
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
        const {classes,title,url}=attributes;
		const primaryClass='wp-block-catpow-t-button';
		return (
			<a className={classes} href={url}>
				<table width="100%">
					<tbody>
						<tr>
							<td><RichText.Content value={title}/></td>
						</tr>
					</tbody>
				</table>
			</a>
		);
	}
});

