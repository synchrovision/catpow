wp.blocks.registerBlockType('catpow/siteheader',{
	title:'🐾 SiteHeader',
	description:__('サイト共通ヘッダのブロックです。','catpow'),
	icon:'welcome-widgets-menus',
	category:'catpow-parts',
	example:CP.example,
	edit({attributes,setAttributes,className,clientId}){
		const {content_path,query,config,EditMode=false}=attributes;
		
		return (
			<>
				<CP.ServerSideRender block='catpow/siteheader' attributes={attributes}/>
			</>
		);
	},

	save({attributes,className,setAttributes}){
		return null;
	}
});