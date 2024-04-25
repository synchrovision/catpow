import {DataContext,StateContext} from './MegaMenu.jsx';

export const SiteInfo=(props)=>{
	const {className='MegaMenu-SiteInfo',item}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const data=useContext(DataContext);
	
	return (
		<div className={classes()}>
			<h1 className={classes.title()}>
				<a className={classes.title.body()} href={data.siteInfo.url}>
				{data.siteInfo.logo?(
					<img
						className={classes.title.body.logo()}
						src={data.siteInfo.logo.src}
						width={data.siteInfo.logo.width}
						height={data.siteInfo.logo.height}
						alt={data.siteInfo.name}
					/>
				):(
					<span className={classes.title.body.text()}>{data.siteInfo.name}</span>
				)}
				</a>
				{data.siteInfo.desc && <span className={classes.title.desc()}>{data.siteInfo.desc}</span>}
			</h1>
		</div>
	);
}