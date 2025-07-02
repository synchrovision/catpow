import { Bem } from "catpow/component";
import clsx from "clsx";

export const SelectPictureSources = (props) => {
	const { Icon } = wp.components;
	const {
		devices = ["tb", "sp"],
		keys = {
			mime: "mime",
			src: "src",
			alt: "alt",
			srcset: "srcset",
			sources: "sources",
		},
		compact = false,
	} = props;

	return (
		<Bem>
			<table className={clsx("cp-selectpicturesources", { "is-compact": compact })}>
				<tbody className="_tbody">
					<tr className="_tr">
						<td className="_td" colSpan={devices.length}>
							<CP.SelectResponsiveImage {...props} className="-image is-device-pc" keys={keys} devices={devices} />
						</td>
					</tr>
					<tr className="_tr">
						{devices.map((device) => (
							<td className="_td" key={device}>
								<div className="_label">
									<Icon icon={CP.devices[device].icon} />
								</div>
								<CP.SelectResponsiveImage {...props} className={clsx("-image", `is-device-${device}`)} keys={keys} devices={devices} device={device} />
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</Bem>
	);
};
