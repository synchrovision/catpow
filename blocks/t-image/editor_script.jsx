wp.blocks.registerBlockType('catpow/t-image',{
	title:'🐾 T-Image',
	description:'HTMLメール用の画像ブロックです。',
	icon:'editor-code',
	category:'catpow-mail',
	parent:['catpow/t-body','catpow/t-box','catpow/t-loop'],
	attributes:{
		classes:{source:'attribute',selector:'table',attribute:'class',default:'wp-block-catpow-t-image'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy.jpg'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		loopImage:{source:'text',selector:'td',default:'[output image]'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {useState,useMemo}=wp.element;
		const {InspectorControls}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {classes,src,alt,loopImage}=attributes;
		const primaryClass='wp-block-catpow-t-image';
		var states=CP.wordsToFlags(classes);

		const selectiveClasses=useMemo(()=>{
			const selectiveClasses=[
				{
					name:'template',
					label:'テンプレート',
					values:'isTemplate',
					sub:[
						{name:'loopImage',label:'画像出力コード',input:'text',key:'loopImage'},
					]
				}
			];
			wp.hooks.applyFilters('catpow.blocks.t-image.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return (
			<>
				<table width="100%" className={classes}>
					<tbody>
						<tr>
							<td>
								{states.isTemplate?(
									<img
										src={wpinfo.plugins_url+'/catpow/callee/dummy_image.php?text='+loopImage}
										width="100%"
										height="auto"
									/>
								):(
									<CP.SelectResponsiveImage
										set={setAttributes}
										attr={attributes}
										keys={{src:'src',alt:'alt'}}
										size="large"
										width="100%"
										height="auto"
									/>
								)}
							</td>
						</tr>
					</tbody>
				</table>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters['t-image'] || {}}
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
		const {classes,src,alt,loopImage}=attributes;
		const primaryClass='wp-block-catpow-t-image';
		var states=CP.wordsToFlags(classes);
		return (
			<table width="100%" className={classes}>
				<tbody>
					<tr>
						<td>
							{states.isTemplate?(
								loopImage
							):(
								<img width="100%" height="auto" src={src} alt={alt}/>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
});

