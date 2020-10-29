CP.config.picture={
	devices:['sp','tb'],
	imageKeys:{
		image:{sources:'sources',src:"src",alt:"alt",code:"code"}
	}
};

registerBlockType('catpow/picture',{
	title: '🐾 Picture',
	description:'画面サイズに応じて切り替わる画像。',
	icon: 'id-alt',
	category: 'catpow',
	attributes:{
		classes:{source:'attribute',selector:'div',attribute:'class',default:'wp-block-catpow-picture'},
		
		sources:CP.getPictureSoucesAttributesForDevices(CP.config.picture.devices),

		mime:{source:'attribute',selector:'[src]',attribute:'data-mime'},
		src:{source:'attribute',selector:'[src]',attribute:'src',default:cp.theme_url+'/images/dummy.jpg'},
		alt:{source:'attribute',selector:'[src]',attribute:'alt'},
		code:{source:'text'},
	},
	example:CP.example,
	edit({attributes,className,setAttributes,isSelected}){
        const {classes,sources,src,srcset,alt,code,device}=attributes;
		
		const {devices,imageKeys}=CP.config.picture;
		
		var states=CP.wordsToFlags(classes);
		
		const selectiveClasses=[
			{input:'image',label:'画像',keys:imageKeys.image,device,devices,isTemplate:states.isTemplate},
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
			<Fragment>
				<SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices}/>
				<div className={classes+(device?' alt_content '+device:'')}>
					{device &&
						<div class="label">
							<Icon icon={CP.devices[device].icon}/>
						</div>
					}
					<SelectResponsiveImage
						attr={attributes}
						set={setAttributes}
						device={device}
						devices={devices}
						isTemplate={states.isTemplate}
						keys={imageKeys.image}
					/>
				</div>
				<InspectorControls>
					<SelectClassPanel
						title='クラス'
						icon='art'
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
						filters={CP.filters.picture || {}}
					/>
				</InspectorControls>
			</Fragment>
        );
    },
	save({attributes,className,setAttributes}){
        const {classes,srouces,src,srcset,alt,code}=attributes;
		
		var states=CP.wordsToFlags(classes);
		const {devices,imageKeys}=CP.config.picture;
		
		return (
			<div className={classes}>
				<ResponsiveImage
					attr={attributes}
					keys={imageKeys.image}
					devices={devices}
					isTemplate={states.isTemplate}
				/>
			</div>
		);
	}
});