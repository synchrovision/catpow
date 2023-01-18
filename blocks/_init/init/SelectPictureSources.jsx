import {CP} from './CP.jsx';

CP.SelectPictureSources=(props)=>{
	const {Icon}=wp.components;
	const {devices}=props;
	return (
		<table className="SelectPictureSources">
			<tbody>
				<tr>
					<td colSpan={devices.length}>
						<CP.SelectResponsiveImage {...props}/>
					</td>
				</tr>
				<tr>
				{devices.map((device)=>(
					<td key={device}>
						<div className="label">
							<Icon icon={CP.devices[device].icon}/>
						</div>
						<CP.SelectResponsiveImage
							device={device}
							{...props}
						/>
					</td>
				))}
				</tr>
			</tbody>
		</table>
	);
};