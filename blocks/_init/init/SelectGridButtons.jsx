import {CP} from './CP.jsx';

CP.SelectGridButtons=(props)=>{
	const {BaseControl}=wp.components;
	const maxStrlen=props.options.reduce((acc,cur)=>Math.max(acc,cur.label.length+cur.label.replace(/[ -~]+/,'').length),3);
	const colNum=Math.min(6,Math.floor(36/(maxStrlen+2)));
	return (
		<BaseControl label={props.label} help={props.help} id={'CP-SelectGridButtons-'+wp.compose.useInstanceId(CP.SelectGridButtons)}>
			<ul className={"selectGridButtons col"+colNum}>
				{props.options.map((option)=>(
					<li
						onClick={()=>props.onChange(option.value)}
						className={'item'+((props.selected===option.value)?' active':'')}
						key={option.value}
					>{option.label}</li>
				))}
			</ul>
		</BaseControl>
	);
};