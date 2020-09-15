registerBlockType('catpow/t-body',{
	title:'🐾 T-Body',
	description:'HTMLメールのベースとなるヘッダ・フッタのブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-body hasHeader hasFooter'},
		headerText:{source:'children',selector:'thead th',default:['Title']},
		footerText:{source:'children',selector:'tfoot td',default:['caption']},
		body_class:{type:'string',default:'white'}
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
        const {classes,headerText,footerText,body_class}=attributes;
		const primaryClass='wp-block-catpow-t-body';
		var states=CP.wordsToFlags(classes);
		
		var selectiveClasses=[
			'color',
			{label:'ヘッダ',values:'hasHeader'},
			{label:'フッタ',values:'hasFooter'},
			{label:'背景色',values:['white','gray','black'],key:'body_class'}
		];
		
        return [
			<div className={"mail_body "+body_class}>
				<table width="100%" align="center" valign="top" className={classes}>
					{states.hasHeader &&
						<thead>
							<tr>
								<th>
									<RichText
										onChange={(headerText)=>{setAttributes({headerText});}}
										value={headerText}
									/>
								</th>
							</tr>
						</thead>
					}
					<tbody>
						<tr>
							<td>
								<center>
									<InnerBlocks/>
								</center>
							</td>
						</tr>
					</tbody>
					{states.hasFooter &&
						<tfoot>
							<tr>
								<td>
									<RichText
										onChange={(footerText)=>{setAttributes({footerText});}}
										value={footerText}
									/>
								</td>
							</tr>
						</tfoot>
					}
				</table>
			</div>,
			<InspectorControls>
				<SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters['t-body'] || {}}
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
        const {classes,headerText,footerText}=attributes;
		const primaryClass='wp-block-catpow-t-body';
		var states=CP.wordsToFlags(classes);
		return (
			<table width="100%" align="center" valign="top" className={classes}>
				{states.hasHeader &&
					<thead>
						<tr>
							<th><RichText.Content value={headerText}/></th>
						</tr>
					</thead>
				}
				<tbody>
					<tr>
						<td>
							<center>
								<InnerBlocks.Content/>
							</center>
						</td>
					</tr>
				</tbody>
				{states.hasFooter &&
					<tfoot>
						<tr>
							<td><RichText.Content value={footerText}/></td>
						</tr>
					</tfoot>
				}
			</table>
		);
	}
});

