wp.hooks.addFilter(
    'catpow.IconComponent',
    'catpow/editor',
    ()=>'EmbedIcon'
);
CP.EmbedIcon={
	Input:(props)=>{
		const {item,prm,save}=props;
		const parser=new DOMParser();
		const serializer=new XMLSerializer();
		return (
			<CP.SelectPreparedImage
				name='icon'
				value={item.embedIconSrc}
				color={0}
				onChange={(image)=>{
					fetch(image.url)
					.then((res)=>res.text())
					.then((text)=>{
						const el=parser.parseFromString(text,'image/svg+xml');
						save({
							embedIconSrc:image.url,
							embedIconCode:serializer.serializeToString(el)
						});
					});
				}}
			/>
		);
	},
	Output:(props)=>{
		const {item}=props;
		return (
			<div className="icon" data-src={item.embedIconSrc} dangerouslySetInnerHTML={{__html:item.embedIconCode}}/>
		);
	}
}