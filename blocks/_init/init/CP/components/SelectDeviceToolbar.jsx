export const SelectDeviceToolbar = (props) => {
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup } = wp.components;
	const { setAttributes, attributes, devices = ["sp", "pc"], defaultInput } = props;
	return (
		<BlockControls>
			{devices.map((device) => {
				return (
					<ToolbarGroup
						controls={[
							{
								icon: CP.devices[device].icon,
								title: device,
								isActive: attributes.device === device,
								onClick: () => {
									if (attributes.device === device) {
										setAttributes({ device: defaultInput || null });
									} else {
										setAttributes({ device });
									}
								},
							},
						]}
						key={device}
					/>
				);
			})}
		</BlockControls>
	);
};
