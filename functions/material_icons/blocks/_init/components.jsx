wp.hooks.addFilter("catpow.IconComponent", "catpow/editor", () => "MaterialIcon");
CP.MaterialIcon = {
	Input: (props) => {
		const { className = "material-icon", item, prm, save } = props;
		return (
			<Catpow.SelectMaterialIcons
				value={item.materialIconName}
				onChange={(materialIconName) => {
					save({ materialIconName });
				}}
			/>
		);
	},
	Output: (props) => {
		const { className = "material-icon", item } = props;
		return (
			<span className={className} style={{ fontFamily: "Material Icons" }}>
				{item.materialIconName}
			</span>
		);
	},
};
