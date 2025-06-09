import { bem } from "catpow/util";

export const SelectPictureSources = (props) => {
	const { Icon } = wp.components;
	const {
		devices = ["sp", "tb"],
		keys = {
			mime: "mime",
			src: "src",
			alt: "alt",
			srcset: "srcset",
			sources: "sources",
		},
		compact = false,
	} = props;
	const { useMemo } = wp.element;
	const classes = useMemo(() => bem("cp-selectpicturesources"), []);

	return (
		<table className={classes({ "is-compact": compact })}>
			<tbody className={classes.tbody()}>
				<tr className={classes.tbody.tr()}>
					<td className={classes.tbody.tr.td()} colSpan={devices.length}>
						<CP.SelectResponsiveImage {...props} keys={keys} devices={devices} />
					</td>
				</tr>
				<tr className={classes.tbody.tr()}>
					{devices.map((device) => (
						<td className={classes.tbody.tr.td()} key={device}>
							<div className={classes.tbody.tr.td.label()}>
								<Icon icon={CP.devices[device].icon} />
							</div>
							<CP.SelectResponsiveImage {...props} keys={keys} devices={devices} device={device} />
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};
