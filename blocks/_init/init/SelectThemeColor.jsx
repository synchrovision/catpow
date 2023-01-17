import {CP} from './CP.jsx';

CP.SelectThemeColor=(props)=>{
	const {selected,onChange}=props;
	const {bem}=Catpow.util;
	const classes=bem('fillColor');

	var items=Array.from(Array(13),(v,i)=>{
		const value='color'+i;
		return (
			<li
				className={classes(value,{active:value==selected})}
				onClick={()=>onChange(value)}
				key={value}
			> </li>
		);
	});

	return (
		<ul className="selectColor">{items}</ul>
	);
};