CP.config.div={
	devices:['sp','tb'],
	imageKeys:{
		iconImage:{src:"iconImageSrc",alt:"iconImageAlt"},
		backgroundImage:{src:"backgroundImageSrc",sources:"backgroundImageSources"}
	}
};
wp.blocks.registerBlockType('catpow/div',{
	title:'🐾 Div',
	description:'コンテンツを枠で囲んだりレイアウト調整をするためのコンテナです。',
	icon:'editor-code',
	category:'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:['core/group'],
				transform:(attributes,innerBlocks)=>{
					return createBlock('catpow/div',{classes:'wp-block-catpow-div frame thinBorder'},innerBlocks);
				},
			},
		]
	},
	attributes:{
		color:{default:"0"},
		id:{source:'attribute',selector:'.wp-block-catpow-div',attribute:'id'},
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-div frame thinBorder'},
		
		iconImageSrc:{source:'attribute',selector:'.wp-block-catpow-div>.icon [src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy_icon.svg'},
		iconImageAlt:{source:'attribute',selector:'.wp-block-catpow-div>.icon [src]',attribute:'alt'},
		
		backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-div>.background [src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy_bg.jpg'},
		backgroundImageSources:CP.getPictureSoucesAttributesForDevices(CP.config.div.devices,'.wp-block-catpow-div>.background picture','dummy_bg.jpg'),
		
		patternImageCss:{source:'text',selector:'style.patternImageCss'},
		frameImageCss:{source:'text',selector:'style.frameImageCss'},
		borderImageCss:{source:'text',selector:'style.borderImageCss'},
	},
	example:CP.example,
	edit(props){
		const {useState,useMemo}=wp.element;
		const {InnerBlocks,InspectorControls}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {attributes,className,setAttributes,context}=props;
		const {id,classes,color,patternImageCss,frameImageCss,borderImageCss}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.div;
		
		CP.inheritColor(props,['iconImageSrc','patternImageCss','frameImageCss','borderImageCss']);
		CP.manageStyleData(props,['patternImageCss','frameImageCss','borderImageCss']);
		
		
		const selectiveClasses=useMemo(()=>{
			const {devices,imageKeys}=CP.config.div;
			const selectiveClasses=[
				{
					name:'type',
					label:'タイプ',
					filter:'type',
					type:'buttons',
					values:['block','frame','columns'],
					sub:{
						frame:[
							{label:'アイコン',values:'hasIcon',sub:[
								{input:'icon',label:'アイコン',keys:imageKeys.iconImage,color}
							]},
							{type:'buttons',label:'線',values:{noBorder:'なし',thinBorder:'細',boldBorder:'太'}},
							{label:'角丸',values:'round'},
							{label:'影',values:'shadow',sub:[{label:'内側',values:'inset'}]}
						],
						columns:[
							{label:'幅',values:{narrow:'狭い',regular:'普通',wide:'広い'}}
						]
					}
				},
				'color',
				{name:'background',type:'buttons',label:'背景',values:{noBackground:'なし',hasBackgroundColor:'色',hasBackgroundImage:'画像',hasPatternImage:'パターン'},sub:{
					hasBackgroundColor:[
						{label:'パターン',values:'hasPattern',sub:['pattern']}
					],
					hasBackgroundImage:[
						{input:'picture',label:'背景画像',keys:imageKeys.backgroundImage,devices}
					],
					hasPatternImage:[
						{input:'pattern',css:'patternImageCss',sel:({attr})=>'#'+attr.id,color},
					]
				}},
				{name:'borderImage',type:'buttons',label:'ボーダー画像',values:{noBorder:'なし',hasFrameImage:'フレーム',hasBorderImage:'ボーダー'},sub:{
					hasFrameImage:[
						{input:'frame',css:'frameImageCss',sel:({attr})=>'#'+attr.id,color}
					],
					hasBorderImage:[
						{input:'border',css:'borderImageCss',sel:({attr})=>'#'+attr.id,color}
					]
				}},
				{name:'pad',type:'buttons',label:'余白','values':{noPad:'なし',thinPad:'極細',lightPad:'細',mediumPad:'中',boldPad:'太',heavyPad:'極太'}}
			];
			wp.hooks.applyFilters('catpow.blocks.div.selectiveClasses',CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		},[]);

		return [
			<div id={id} className={classes}>
				{states.hasIcon && 
					<div class="icon">
						<CP.SelectResponsiveImage
							set={setAttributes}
							attr={attributes}
							keys={imageKeys.iconImage}
							size='middle'
						/>
					</div>
				}
				{states.hasBackgroundImage && 
					<div class="background">
						<CP.ResponsiveImage
							set={setAttributes}
							attr={attributes}
							keys={imageKeys.backgroundImage}
							devices={devices}
						/>
					</div>
				}
				<InnerBlocks template={[['core/paragraph',{content:CP.dummyText.text}]]} templateLock={false}/>
				{states.hasPatternImage && (
					<style className="patternImageCss">{patternImageCss}</style>
				)}
				{states.hasBorderImage && (
					<style className="borderImageCss">{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style className="frameImageCss">{frameImageCss}</style>
				)}
			</div>,
			<InspectorControls>
				<CP.SelectClassPanel
					title='クラス'
					icon='art'
					set={setAttributes}
					attr={attributes}
					selectiveClasses={selectiveClasses}
					filters={CP.filters.div || {}}
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
		const {InnerBlocks}=wp.blockEditor;
		const {id,classes='',color,patternImageCss,frameImageCss,borderImageCss}=attributes;
		
		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.div;
		
		return (
			<div id={id} className={classes}>
				{states.hasIcon && 
					<div class="icon">
						<CP.ResponsiveImage
							attr={attributes}
							keys={imageKeys.iconImage}
						/>
					</div>
				}
				{states.hasBackgroundImage && 
					<div class="background">
						<CP.ResponsiveImage
							attr={attributes}
							keys={imageKeys.backgroundImage}
							devices={devices}
						/>
					</div>
				}
				<InnerBlocks.Content/>
				{states.hasPatternImage && (
					<style className="patternImageCss">{patternImageCss}</style>
				)}
				{states.hasBorderImage && (
					<style className="borderImageCss">{borderImageCss}</style>
				)}
				{states.hasFrameImage && (
					<style className="frameImageCss">{frameImageCss}</style>
				)}
			</div>
		);
	}
});

