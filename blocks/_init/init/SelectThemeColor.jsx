import {CP} from './CP.jsx';

CP.SelectThemeColor=(props)=>{
	const {selected,onChange}=props;
	const {useCallback,useMemo}=wp.element;
	const {Icon}=wp.components;
	const {bem}=Catpow.util;
	const classes=bem('CP-SelectThemeColor');
	
	const data=useMemo(()=>CP.parseColorClass(selected),[selected]);
	
	const Selections=useCallback((props)=>{
		const {fixed=false,absolute=false,relative=false,active=false,selected}=props;
		return (
			<ul className={classes.items({fixed,absolute,relative,active})}>
				<li className={classes.items.icon({active})}>
					<Icon icon={fixed?'lock':(absolute?'media-default':'excerpt-view')}/>
				</li>
				{Array.from(Array(13),(v,value)=>{
					const colorClass=CP.generateColorClass({fixed,absolute,relative,value})
					return (
						<li
							className={classes.items.item(colorClass,{active:colorClass==selected,fixed,absolute,relative})}
							onClick={()=>onChange(colorClass)}
							key={colorClass}
						> </li>
					);
				})}
			</ul>
		);
	},[onChange]);

	return (
		<div className={classes()}>
			<Selections selected={selected} fixed={true} active={data.fixed}/>
			<Selections selected={selected} absolute={true} active={data.absolute}/>
			<Selections selected={selected} relative={true} active={data.relative}/>
		</div>
	);
};