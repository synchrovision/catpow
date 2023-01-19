import {CP} from './CP.jsx';

CP.SelectThemeColor=(props)=>{
	const {selected,onChange}=props;
	const {useCallback,useMemo}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem('CP-SelectThemeColor');
	
	const data=useMemo(()=>CP.parseColorClass(selected),[selected]);
	
	const Selections=useCallback((props)=>{
		const {absolute=false,relative=false,selected}=props;
		return (
			<ul className={classes.items({absolute})}>
			{Array.from(Array(13),(v,value)=>{
				const colorClass=CP.generateColorClass({absolute,relative,value})
				return (
					<li
						className={classes.items.item(colorClass,{active:colorClass==selected,absolute,relative})}
						onClick={()=>onChange(colorClass)}
						key={colorClass}
					> </li>
				);
			})}
			</ul>
		);
	},[]);

	return (
		<div className={classes()}>
			<Selections selected={selected} absolute={true}/>
			<Selections selected={selected}/>
			<Selections selected={selected} relative={true}/>
		</div>
	);
};