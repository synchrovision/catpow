wp.blocks.registerBlockType('catpow/megamenu',{
	title: '🐾 MegaMenu',
	icon: 'clock',
	category: 'catpow-embed',
	example:CP.example,
	supports:{
		customClassName:false,
	},
	edit({attributes,setAttributes,className}){
		const {useState,useCallback,useMemo,useEffect}=wp.element;
		const {InspectorControls}=wp.blockEditor;
		const {config,resolvedPropsJson=null,EditMode=false}=attributes;
		
		useEffect(()=>{
			wp.apiFetch({
				path:'/cp/v1/blocks/config/megamenu/config'
			}).then((res)=>{
				setAttributes({config:res});
			}).catch((e)=>{console.error(e);});
		},[]);
		
		useEffect(()=>{
			if(!config){return;}
			const props=attributes.props || config.defaultProps;
			if(props){
				wp.apiFetch({
					path:'/cp/v1/blocks/config/megamenu/resolve',
					method:'POST',
					data:{props}
				}).then((res)=>{
					setAttributes({resolvedPropsJson:res.props});
				}).catch((e)=>{console.error(e);});
			}
		},[attributes.props,config]);
		
		const props=useMemo(()=>{
			if(!resolvedPropsJson){return null;}
			return JSON.parse(resolvedPropsJson);
		},[resolvedPropsJson]);
		
		const getAdditionalInputComponent=useCallback((schema)=>{
			if(schema.hasOwnProperty('@type')){
				switch(schema['@type']){
					case 'MenuItemAction':return (props)=>{
						
					}
				}
			}
			return null;
		},[]);
		
		const onChangeHandle=useCallback((props)=>{
			setAttributes({props});
		},[]);
		
		if(!config || !props){
			return <Catpow.Spinner/>;
		}
		
		return (
			<>
				<CP.SelectModeToolbar
					set={setAttributes}
					attr={attributes}
				/>
				{EditMode?(
					<Catpow.JsonEditor json={props} debug={true} schema={config.schema} onChange={onChangeHandle}/>
				):(
					<div className={attributes.classes}>
						<Catpow.MegaMenu {...props}/>
					</div>
				)}
			</>
		);
	},

	save({attributes,className,setAttributes}){
		return (
			<div className={attributes.classes}></div>
		);
	}
});