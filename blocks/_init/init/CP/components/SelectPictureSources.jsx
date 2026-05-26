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
			<div className={clsx("cp-selectpicturesources", { "is-compact": compact })}>
				<div className="_item" style={{ gridColumn: `span ${devices.length}` }}>
					<div className="_label">
						<Icon icon={CP.devices.pc.icon} />
					</div>
					<CP.SelectResponsiveImage {...props} className="-image is-device-pc" keys={keys} devices={devices} />
				</div>
				{devices.map((device) => (
					<div className="_item" key={device}>
						<div className="_label">
							<Icon icon={CP.devices[device].icon} />
						</div>
						<CP.SelectResponsiveImage {...props} className={clsx("-image", `is-device-${device}`)} keys={keys} devices={devices} device={device} />
					</div>
				))}
			</div>
		</Bem>
	);
};
