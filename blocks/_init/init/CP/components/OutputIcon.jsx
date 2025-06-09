export const OutputIcon = (props) => {
	return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Output, props);
};
