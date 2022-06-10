registerBlockType('catpow/siteheader',{
	title:'🐾 SiteHeader',
	description:__('サイト共通ヘッダのブロックです。','catpow'),
	icon:'welcome-widgets-menus',
	category:'catpow-parts',
	example:CP.example,
	edit({attributes,setAttributes,className,clientId}){
		const {content_path,query,config,EditMode=false}=attributes;
		
		return (
			<Fragment>
				<CP.ServerSideRender block='catpow/siteheader' attributes={attributes}/>
			</Fragment>
		);
	},

	save({attributes,className,setAttributes}){
		return null;
	}
});