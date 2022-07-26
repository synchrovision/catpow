﻿registerBlockType('catpow/breadcrumb',{
	title:'🐾 Breadcrumb',
	description:__('パンくずリストを表示します。','catpow'),
	icon:'welcome-widgets-menus',
	category:'catpow-parts',
	example:CP.example,
	edit({attributes,setAttributes,className,clientId}){
		const {content_path,query,config,EditMode=false}=attributes;
		
		return (
			<Fragment>
				<ServerSideRender block='catpow/breadcrumb' attributes={attributes}/>
			</Fragment>
		);
	},

	save({attributes,className,setAttributes}){
		return null;
	}
});