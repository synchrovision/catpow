const { __ } = wp.i18n;

export const prepared = {
	label: __("既定画像", "catpow"),
	order: 1,
	params: {
		image: { "@editor": "Image" },
	},
	getData(params = {}) {
		const { image } = params;
		return {
			image: [],
		};
	},
};
