Catpow.InstagramFeed=(props)=>{
	const {users}=props;
	const {useEffect,useState,useMemo}=wp.element;
	const [medias,setMedias]=useState(false);
	const classes=Catpow.util.bem('wp-block-catpow-instagramfeed');
	
	useEffect(()=>{
		wp.apiFetch({path:'/cp/v1/instagram/media'}).then((res)=>{
			setMedias(res.medias);
		});
	},[]);
	
	
	return (
		<div className={classes.items()}>
			{medias && medias.map((media)=>(
				<div className={classes.items.item()} key={media.id}>
					<img className={classes.items.item.img()} src={media.media_url} alt=""/>
				</div>
			))}
		</div>
	);
};