import {CP} from './CP.jsx';

CP.SelectPatternClass=(props)=>{
	const {BaseControl}=wp.components;
	const {label,help,selected,onChange}=props;

	var items=Array.from(Array(6),(v,i)=>{
		var classes='bgPattern'+i;
		const value='pattern'+i;
		if(value==selected){classes+=' active';}
		return (
			<li
				className={classes}
				onClick={()=>onChange(value)}
				key={value}
			> </li>
		);
	});

	return (
		<BaseControl label={label} help={help}>
			<ul className="selectPattern">{items}</ul>
		</BaseControl>
	);
};