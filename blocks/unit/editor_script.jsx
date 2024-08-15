CP.config.unit={
	devices:['sp','tb'],
	imageKeys:{
		image:{sources:'sources',src:"src",alt:"alt",code:"code"}
	}
};
wp.blocks.registerBlockType('catpow/unit',{
	title:'🐾 Unit',
	description:'画像とテキストを並べてレイアウトするためのブロックです。',
	icon:'align-pull-left',
	category:'catpow',
	transforms:{
		from: [
			{
				type:'block',
				blocks:['core/group'],
				transform:(attributes,innerBlocks)=>{
					return wp.blocks.createBlock('catpow/unit',{classes:'wp-block-catpow-unit'},innerBlocks);
				},
			},
		]
	},
	attributes:{
		classes:{source:'attribute',selector:'.wp-block-catpow-unit',attribute:'class',default:'wp-block-catpow-unit'},

		sources:CP.getPictureSoucesAttributesForDevices(CP.config.unit.devices),

		mime:{source:'attribute',selector:'[src]',attribute:'data-mime'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:wpinfo.theme_url+'/images/dummy.jpg'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		code:{source:'text'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes}){
		const {InnerBlocks,InspectorControls}=wp.blockEditor;
		const {PanelBody,TextareaControl} = wp.components;
		const {classes}=attributes;

		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.unit;

		var selectiveClasses=[
			'color',
			{
				label:'タイプ',
				filter:'type',
				values:['default','snap','panel'],
				sub:{
					frame:[
						{label:'色',values:'hasColor',sub:['color']},
					],
					columns:[
						{label:'幅',values:{narrow:'狭い',regular:'普通',wide:'広い'}}
					]
				}
			},
			{input:'picture',label:'画像',keys:imageKeys.image,devices,isTemplate:states.isTemplate},
			{
				label:'テンプレート',
				values:'isTemplate',
				sub:[
					{
						input:'text',
						label:'画像コード',
						key:'code',
						cond:true
					}
				]
			}
		];

		return (
			<>
				<div className={classes}>
					<figure className="image">
						<ResponsiveImage
							attr={attributes}
							keys={imageKeys.image}
						/>
					</figure>
					<div className="contents">
						<InnerBlocks template={[['core/paragraph',{content:CP.dummyText.text}]]} templateLock={false}/>
					</div>
				</div>
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
		const {classes=''}=attributes;

		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.unit;

		return (
			<div className={classes}>
				<figure className="image">
					<ResponsiveImage
						attr={attributes}
						keys={imageKeys.image}
					/>
				</figure>
				<div className="contents">
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	}
});

