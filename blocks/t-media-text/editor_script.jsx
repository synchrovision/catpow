wp.blocks.registerBlockType('catpow/t-media-text',{
	title:'🐾 T-media-text',
	description:'HTMLメール用の画像・テキストのセットのブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
	parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-media-text'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy.jpg'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		imageCode:{source:'text',selector:'td.imageCell',default:wpinfo.theme_url+'/images/dummy.jpg'},
		width:{source:'attribute',selector:'td.imageCell',attribute:'width',default:'200'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,BlockControls,InspectorControls}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {classes,src,alt,imageCode,width}=attributes;
		const primaryClass='wp-block-catpow-t-media-text';
		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{
					name:'template',
					label:'テンプレート',
					values:'isTemplate',
					sub:[
						{name:'imageCode',label:'画像出力コード',input:'text',key:'imageCode'},
					]
				},
				{name:'range',input:'range',label:'画像の幅',key:'width',min:50,max:400,step:10}
			];
			wp.hooks.applyFilters('catpow.blocks.t-media-text.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return (
			<>
				<table width="100%" className={classes}>
					<tbody>
						<tr>
							<td className="imageCell" width={width}>
								<CP.SelectResponsiveImage
									set={setAttributes}
									attr={attributes}
									keys={{src:'src',alt:'alt',code:'imageCode'}}
									size="large"
									width="100%"
									height="auto"
									isTemplate={states.isTemplate}
								/>
							</td>
							<td className="spacerCell"></td>
							<td className="textCell">
								<InnerBlocks/>
							</td>
						</tr>
					</tbody>
				</table>
				<BlockControls>
					<CP.VerticalAlignClassToolbar set={setAttributes} attr={attributes}/>
				</BlockControls>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
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
		const {InnerBlocks}=wp.blockEditor;
		const {classes,src,alt,imageCode,width}=attributes;
		const primaryClass='wp-block-catpow-t-media-text';
		var states=CP.wordsToFlags(classes);
		return (
			<table width="100%" className={classes}>
				<tbody>
					<tr>
						<td className="imageCell" width={width}>
							<CP.ResponsiveImage
								attr={attributes}
								keys={{src:'src',alt:'alt',code:'imageCode'}}
								size="large"
								width="100%"
								height="auto"
								isTemplate={states.isTemplate}
							/>
						</td>
						<td className="spacerCell"></td>
						<td className="textCell">
							<InnerBlocks.Content/>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
});

