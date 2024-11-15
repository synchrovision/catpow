﻿CP.config.picture={
	devices:['sp','tb'],
	imageKeys:{
		image:{sources:'sources',src:"src",alt:"alt",code:"code"}
	}
};

wp.blocks.registerBlockType('catpow/picture',{
	title: '🐾 Picture',
	description:'画面サイズに応じて切り替わる画像。',
	icon: 'id-alt',
	category: 'catpow',
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
		const {InspectorControls}=wp.blockEditor;
		const {Icon}=wp.components;
		const {classes,sources,src,srcset,alt,code,device}=attributes;

		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.picture;

		const selectiveClasses=[
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
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices}/>
				<div className={classes+(device?' alt_content '+device:'')}>
					{device &&
						<div className="label">
							<Icon icon={CP.devices[device].icon}/>
						</div>
					}
					<CP.SelectResponsiveImage
						attr={attributes}
						set={setAttributes}
						keys={imageKeys.image}
						device={device}
						devices={devices}
						isTemplate={states.isTemplate}
					/>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
				</InspectorControls>
			</>
		);
	},
	save({attributes,className,setAttributes}){
		const {classes,srouces,src,srcset,alt,code}=attributes;

		const states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.picture;

		return (
			<div className={classes}>
				<CP.ResponsiveImage
					attr={attributes}
					keys={imageKeys.image}
					devices={devices}
					isTemplate={states.isTemplate}
				/>
			</div>
		);
	}
});