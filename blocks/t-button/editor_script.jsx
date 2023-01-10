wp.blocks.registerBlockType('catpow/t-button',{
	title:'🐾 T-Button',
	description:'HTMLメール用のテーブルレイアウトのボタンです。',
	icon:'editor-code',
	category:'catpow-mail',
	parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	attributes:{
		classes:{source:'attribute',selector:'a',attribute:'class',default:'wp-block-catpow-t-button medium'},
		title:{source:'children',selector:'tbody td',default:'Title'},
		url:{source:'attribute',selector:'a',attribute:'href',default:wpinfo.home_url},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {InspectorControls,RichText}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {classes,title}=attributes;
		const primaryClass='wp-block-catpow-t-button';
		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				'color',
				{name:'size',label:'サイズ',values:['large','medium','small']},
				{name:'url',input:'text',label:'URL',key:'url'}
			];
			wp.hooks.applyFilters('catpow.blocks.t-button.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return (
			<>
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
					<CP.SelectClassPanel
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
			</>
		);
	},


	save({attributes,className,setAttributes}){
		const {RichText}=wp.blockEditor;
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

