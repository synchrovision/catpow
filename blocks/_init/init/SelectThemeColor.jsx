import {CP} from './CP.jsx';
import {bem} from 'catpow/util';

CP.SelectThemeColor=(props)=>{
	const {onChange}=props;
	const {useCallback,useMemo,Fragment}=wp.element;
	const {Icon}=wp.components;
	const classes=bem('CP-SelectThemeColor');
	
	const proxy=useMemo(()=>CP.colorClassProxy(props.selected),[props.selected]);
	const data=useMemo(()=>CP.parseColorClass(proxy.h),[proxy.h]);
	
	const ColorSelections=useCallback((props)=>{
		const {fixed=false,absolute=false,relative=false,active=false,proxy}=props;
		const {h,s,l}=proxy;
		const hsl={h,s,l};
		return (
			<ul className={classes.colors({fixed,absolute,relative,active})}>
				<li className={classes.colors.icon({active})}>
					<Icon icon={fixed?'lock':(absolute?'media-default':'excerpt-view')}/>
				</li>
				{Array.from(Array(13),(v,value)=>{
					const colorClass=CP.generateColorClass({fixed,absolute,relative,value});
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
							<CP.ConfigIcon icon={{s:'contrast',l:'light'}[r]}/>
						</li>
						{Array.from(Array(5),(v,index)=>{
							const value=index-2;
							const toneClass=CP.generateToneClass({[r]:true,value})
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
};