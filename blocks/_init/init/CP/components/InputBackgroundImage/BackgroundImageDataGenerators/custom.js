import { positionParams } from "./common";
const { __ } = wp.i18n;

export const custom = {
	label: __("アップロード画像", "catpow"),
	order: 1,
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
		...positionParams,
		repeat: {
			enum: ["no-repeat", "repeat-x", "repeat-y", "repeat"],
			default: "repeat",
		},
	},
	getData(params = {}) {
		const {
			image,
			size = "cover",
			position: { x = 50, y = 50 },
			repeat = "repeat",
		} = params;
		return {
			image: [`url('${image.url}')`],
			size: [size.type === "custom" ? `${size.value}px` : size.type],
			position: [`${x}% ${y}%`],
			repeat: [repeat],
			blendmode: ["normal"],
		};
	},
};
