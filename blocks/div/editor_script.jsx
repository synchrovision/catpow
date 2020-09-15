registerBlockType('catpow/div',{
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
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-div frame thinBorder'},
		
		iconImageSrc:{source:'attribute',selector:'.wp-block-catpow-div>.icon [src]',attribute:'src',default:cp.theme_url+'/images/dummy_icon.svg'},
		
		backgroundImageSrc:{source:'attribute',selector:'.wp-block-catpow-div>.background [src]',attribute:'src',default:cp.theme_url+'/images/dummy_bg.jpg'},
		backgroundImageSrcset:{source:'attribute',selector:'.wp-block-catpow-div>.background [src]',attribute:'srcset'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
        const {classes}=attributes;
		const primaryClass='wp-block-catpow-div';
		var classArray=_.uniq((className+' '+classes).split(' '));
		
		var states={
			hasIcon:false,
			hasBackgroundImage:false
		}
		
		const imageKeys={
			iconImage:{src:"iconImageSrc"},
			backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset"}
		};
		
		var selectiveClasses=[
			{
				label:'タイプ',
				filter:'type',
				values:['block','frame','columns'],
				sub:{
					frame:[
						{label:'色',values:'hasColor',sub:['color']},
						{label:'パターン',values:'hasPattern',sub:['pattern']},
						{label:'アイコン',values:'hasIcon'},
						{label:'線',values:{noBorder:'なし',thinBorder:'細',boldBorder:'太'}},
						{label:'角丸',values:'round'},
						{label:'影',values:'shadow',sub:[{label:'内側',values:'inset'}]}
					],
					columns:[
						{label:'幅',values:{narrow:'狭い',regular:'普通',wide:'広い'}}
					]
				}
			},
			{label:'背景画像',values:'hasBackgroundImage',sub:[
				{input:'image',label:'PC版背景画像',keys:imageKeys.backgroundImage},
				{input:'image',label:'SP版背景画像',keys:imageKeys.backgroundImage,ofSP:true,sizes:'480px'}
			]},
			{label:'余白','values':{noPad:'なし',thinPad:'極細',lightPad:'細',mediumPad:'中',boldPad:'太',heavyPad:'極太'}}
		];
		
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		Object.keys(states).forEach(function(key){this[key]=hasClass(key);},states);
		
        return [
			<div className={classes}>
				{states.hasIcon && 
					<div class="icon">
						<SelectResponsiveImage
							set={setAttributes}
							attr={attributes}
							keys={imageKeys.iconImage}
							size='middle'
						/>
					</div>
				}
				{states.hasBackgroundImage && 
					<div class="background">
						<ResponsiveImage
							set={setAttributes}
							attr={attributes}
							keys={imageKeys.backgroundImage}
						/>
					</div>
				}
				<InnerBlocks/>
			</div>,
			<InspectorControls>
				<SelectClassPanel
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
						onChange={(clss)=>setAttributes({classes:clss})}
						value={classArray.join(' ')}
					/>
				</PanelBody>
			</InspectorControls>
        ];
    },


	save({attributes,className,setAttributes}){
        const {classes}=attributes;
		
		var classArray=classes.split(' ');
		const hasClass=(cls)=>(classArray.indexOf(cls)!==-1);
		var hasIcon=hasClass('hasIcon');
		var hasBackgroundImage=hasClass('hasBackgroundImage');
		
		const imageKeys={
			iconImage:{src:"iconImageSrc"},
			backgroundImage:{src:"backgroundImageSrc",srcset:"backgroundImageSrcset"}
		};
		
		return (
			<div className={classes}>
				{hasIcon && 
					<div class="icon">
						<ResponsiveImage
							attr={attributes}
							keys={imageKeys.iconImage}
						/>
					</div>
				}
				{hasBackgroundImage && 
					<div class="background">
						<ResponsiveImage
							attr={attributes}
							keys={imageKeys.backgroundImage}
						/>
					</div>
				}
				<InnerBlocks.Content/>
			</div>
		);
	}
});

