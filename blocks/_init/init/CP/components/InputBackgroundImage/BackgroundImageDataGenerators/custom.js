const { __ } = wp.i18n;

export const custom = {
	label: __("アップロード画像", "catpow"),
	params: {
		image: { "@editor": "Image" },
		size: {
			properties: {
				type: { enum: ["cover", "contain", "custom"] },
			},
			oneOf: [
				{
					properties: {
						type: { const: "custom" },
						value: { minimum: 10, maximum: 2000, multipleOf: 10, defaut: 300 },
					},
				},
				{
					properties: {
						type: { enum: ["cover", "contain"] },
					},
				},
			],
		},
		position: {
			"@editor": "Position",
			grid: 10,
			width: 100,
			height: 100,
			margin: 10,
			properties: {
				x: { default: 50 },
				y: { default: 50 },
			},
		},
		repeat: {
			enum: ["no-repeat", "repeat-x", "repeat-y", "repeat"],
			default: "repeat",
		},
	},
	getData(params = {}) {
		const { image, size = "cover", position = { x: 50, y: 50 }, repeat = "repeat" } = params;
		const { x, y } = position;
		return {
			image: [`url('${image.url}')`],
			size: [size.type === "custom" ? `${size.value}px` : size.type],
			position: [`${x}% ${y}%`],
			repeat: [repeat],
			blendmode: ["normal"],
		};
	},
};
