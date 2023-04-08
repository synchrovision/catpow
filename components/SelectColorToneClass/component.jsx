Catpow.SelectColorToneClass=(props)=>{
	const {className='SelectColorToneClass',onChange}=props;
	const {useCallback,useMemo,Fragment}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	const {colorClassProxy,parseColorClass,generateColorClass,generateToneClass}=Catpow.colorTone;
	
	const proxy=useMemo(()=>colorClassProxy(props.selected),[props.selected]);
	const data=useMemo(()=>parseColorClass(proxy.h),[proxy.h]);
	
	const ConfigIcon=useCallback((props)=>{
		const {icon}=props;
		switch(icon){
			case 'fixed':return (
				<svg id="a" data-name="image" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="8" width="16" height="11"/><path d="m16.75,8h-2c0-2.62-2.13-4.75-4.75-4.75s-4.75,2.13-4.75,4.75h-2c0-3.72,3.03-6.75,6.75-6.75s6.75,3.03,6.75,6.75Z"/></svg>
			);
			case 'absolute':return (
				<svg id="a" data-name="image" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="m1,2v17h18V2H1Zm1,1h6v7H2V3Zm16,15H2v-7h16v7Zm-1-5H3v-1h14v1Zm0,2H3v-1h14v1Zm0,2H3v-1h14v1Z"/></svg>
			);
			case 'relative':return (
				<svg id="a" data-name="image" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
				  <path d="m9.44,16.02c-.76.31-1.58.48-2.44.48-3.58,0-6.5-2.92-6.5-6.5S3.42,3.5,7,3.5s6.5,2.92,6.5,6.5c0,1.47-.5,2.82-1.32,3.91-.7-.15-1.32-.48-1.83-.94.71-.79,1.15-1.83,1.15-2.97,0-2.48-2.02-4.5-4.5-4.5s-4.5,2.02-4.5,4.5,2.02,4.5,4.5,4.5c.2,0,.4-.03.59-.06.52.63,1.15,1.16,1.85,1.58Zm3.56-12.52c-.86,0-1.69.17-2.44.48.7.42,1.33.95,1.85,1.58.2-.03.39-.06.59-.06,2.48,0,4.5,2.02,4.5,4.5s-2.02,4.5-4.5,4.5-4.5-2.02-4.5-4.5c0-1.14.44-2.18,1.15-2.97-.51-.46-1.13-.79-1.83-.94-.83,1.09-1.32,2.44-1.32,3.91,0,3.58,2.92,6.5,6.5,6.5s6.5-2.92,6.5-6.5-2.92-6.5-6.5-6.5Z"/>
				</svg>
			);
			case 'light':return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="m10,5c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Zm0,9c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Z"/><path d="m3.5,10.5H1c-.28,0-.5-.22-.5-.5s.22-.5.5-.5h2.5c.28,0,.5.22.5.5s-.22.5-.5.5ZM10,.5c-.28,0-.5.22-.5.5v2.5c0,.28.22.5.5.5s.5-.22.5-.5V1c0-.28-.22-.5-.5-.5Zm0,15.5c-.28,0-.5.22-.5.5v2.5c0,.28.22.5.5.5s.5-.22.5-.5v-2.5c0-.28-.22-.5-.5-.5ZM3.99,3.28c-.2-.2-.51-.2-.71,0-.2.2-.2.51,0,.71l1.77,1.77c.2.2.51.2.71,0,.2-.2.2-.51,0-.71l-1.77-1.77Zm10.96,10.96c-.2-.2-.51-.2-.71,0s-.2.51,0,.71l1.77,1.77c.2.2.51.2.71,0s.2-.51,0-.71l-1.77-1.77Zm4.05-4.74h-2.5c-.28,0-.5.22-.5.5s.22.5.5.5h2.5c.28,0,.5-.22.5-.5s-.22-.5-.5-.5Zm-13.95,4.74l-1.77,1.77c-.2.2-.2.51,0,.71.2.2.51.2.71,0l1.77-1.77c.2-.2.2-.51,0-.71-.2-.2-.51-.2-.71,0ZM14.95,5.76l1.77-1.77c.2-.2.2-.51,0-.71s-.51-.2-.71,0l-1.77,1.77c-.2.2-.2.51,0,.71s.51.2.71,0Z"/></svg>
			);
			case 'contrast':return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="10" y="3" width="8" height="11"/><path d="m10,1C5.03,1,1,5.03,1,10s4.03,9,9,9,9-4.03,9-9S14.97,1,10,1Zm0,17c-4.42,0-8-3.58-8-8S5.58,2,10,2v16Z"/></svg>
			);
		}
	},[]);
	const ColorSelections=useCallback((props)=>{
		const {fixed=false,absolute=false,relative=false,active=false,proxy}=props;
		const {h,s,l}=proxy;
		const hsl={h,s,l};
		return (
			<ul className={classes.colors({fixed,absolute,relative,active})}>
				<li className={classes.colors.icon({active})}>
					<ConfigIcon icon={fixed?'fixed':(absolute?'absolute':'relative')}/>
				</li>
				{Array.from(Array(13),(v,value)=>{
					const colorClass=generateColorClass({fixed,absolute,relative,value});
					const active=colorClass===h;
					return (
						<li
							className={classes.colors.item(colorClass,s,l,{active})}
							onClick={()=>{
								proxy.h=!active && colorClass;
								onChange(proxy);
							}}
							key={colorClass}
						> </li>
					);
				})}
			</ul>
		);
	},[onChange]);
	const ToneSelections=useCallback((props)=>{
		const {proxy}=props;
		const {h,s,l}=proxy;
		const hsl={h,s,l};
		return (
			<ul className={classes.tones()}>
				{['s','l'].map((r)=>(
					<Fragment key={r}>
						<li className={classes.colors.icon({active:!!hsl[r]})}>
							<ConfigIcon icon={{s:'contrast',l:'light'}[r]}/>
						</li>
						{Array.from(Array(5),(v,index)=>{
							const value=index-2;
							const toneClass=generateToneClass({[r]:true,value})
							const active=toneClass===hsl[r];
							return (
								<li
									className={classes.tones.item(h,r==='s'?l:s,toneClass,{active})}
									onClick={()=>{
										proxy[r]=!active && toneClass;
										onChange(proxy);
									}}
									key={toneClass}
								> </li>
							);
						})}
					</Fragment>
				))}
			</ul>
		);
	},[onChange]);

	return (
		<div className={classes()}>
			<ColorSelections proxy={proxy} fixed={true} active={data.fixed}/>
			<ColorSelections proxy={proxy} absolute={true} active={data.absolute}/>
			<ColorSelections proxy={proxy} relative={true} active={data.relative}/>
			<ToneSelections proxy={proxy}/>
		</div>
	);

}