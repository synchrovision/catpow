wp.blocks.registerBlockType('catpow/instagramfeed',{
	title: '🐾 InstagramFeed',
	icon: 'instagram',
	category: 'catpow',
	edit({attributes,className,setAttributes,isSelected}){
		const {items,classes}=attributes;
		const {useMemo}=wp.element;
		const {InspectorControls} = wp.blockEditor;
		const {PanelBody,TreeSelect,TextareaControl,TextControl}=wp.components;
        
		const [users,serUsers]=wp.coreData.useEntityProp('root','site','ig_users');
		const flags=useMemo(()=>Catpow.util.classNamesToFlags(attributes.classes),[attributes.classes]);
		
		console.log(flags);
		
        return (
			<>
				<InspectorControls>
					<PanelBody title="設定">
						{users && users.map((user)=>(
							<label key={user.id}>{user.username}</label>
						))}
					</PanelBody>
				</InspectorControls>
				<div className={Catpow.util.flagsToClassNames(flags)}>
					<Catpow.InstagramFeed/>
				</div>
			</>
        );
    },
	save({attributes,className}){
        return (
			<div
				className={attributes.classes}
				data-users={attributes.users && attributes.users.join(',')}
			>instagram</div>
        );
	},
});