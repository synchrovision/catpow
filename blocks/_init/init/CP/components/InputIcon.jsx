export const InputIcon = (props) => {
	return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Input, props);
};
