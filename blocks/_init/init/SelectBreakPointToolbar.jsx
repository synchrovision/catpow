import {CP} from './CP.jsx';

CP.SelectBreakPointToolbar=(props)=>{
	const {ToolbarGroup}=wp.components;

	return (
		<ToolbarGroup
			controls={props.breakpoints.map((bp)=>{
				let title=bp=="0"?'ー':bp;
				return {
					icon:(
						<svg viewBox="0 0 100 100">
							<text style={{"font-size":"50px"}} x={50} y={50} textAnchor="middle" dominantBaseline="middle">{title}</text>
						</svg>
					),
					isActive: props.value==bp,
					onClick: () => props.onChange(bp)
				};
			})}
		/>
	);
};