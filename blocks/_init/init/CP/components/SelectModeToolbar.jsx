export const SelectModeToolbar = (props) => {
	const { BlockControls } = wp.blockEditor;
	const { ToolbarGroup } = wp.components;

	const { setAttributes, attributes, modes = ["EditMode", "AltMode"] } = props;
	const SomeMode = modes.some((mode) => attributes[mode]);
	const icons = {
		EditMode: "edit",
		OpenMode: "video-alt3",
		AltMode: "welcome-comments",
		TextMode: "media-text",
	};
	const cond = {
		AltMode: "doLoop",
	};
	return (
		<BlockControls>
			{modes.map((mode) => {
				if (!attributes[mode] && SomeMode) {
					return false;
				}
				if (cond[mode] && !attributes[cond[mode]]) {
					return false;
				}
				return (
					<ToolbarGroup
						controls={[
							{
								icon: icons[mode],
								title: mode,
								isActive: attributes[mode],
								onClick: () => setAttributes({ [mode]: !attributes[mode] }),
							},
						]}
						key={mode}
					/>
				);
			})}
		</BlockControls>
	);
};
