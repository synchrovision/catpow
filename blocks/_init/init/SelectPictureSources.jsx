import {CP} from './CP.jsx';
import {bem} from 'catpow/util';

CP.SelectPictureSources=(props)=>{
	const {Icon}=wp.components;
	const {devices,compact=false}=props;
	const {useMemo}=wp.element;
	const classes=useMemo(()=>bem('CP-SelectPictureSources'),[]);
	
	return (
		<table className={classes({'is-compact':compact})}>
			<tbody className={classes.tbody()}>
				<tr className={classes.tbody.tr()}>
					<td className={classes.tbody.tr.td()} colSpan={devices.length}>
						<CP.SelectResponsiveImage {...props}/>
					</td>
				</tr>
				<tr className={classes.tbody.tr()}>
				{devices.map((device)=>(
					<td className={classes.tbody.tr.td()} key={device}>
						<div className={classes.tbody.tr.td.label()}>
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