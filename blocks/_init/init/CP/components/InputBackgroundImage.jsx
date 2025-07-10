import { translateColor } from "catpow/scssc";
import { pfloor, srand } from "catpow/util";
const { useState, useMemo } = wp.element;
const { __ } = wp.i18n;

const valueKeys = {
	type: "-type",
	params: "-params",
	image: "",
	repeat: "-repeat",
	position: "-position",
	size: "-size",
	blendmode: "-background-blendmode",
};
const fillValueKeys = (keys = {}, prefix = "--cp-background-image") => {
	for (const key in valueKeys) {
		if (keys[key] == null) {
			keys[key] = prefix + valueKeys[key];
		}
	}
	return keys;
};
const extractData = (atts, keys) => {
	const data = {};
	for (const key in keys) {
		if (key === "type") {
			data.type = atts[keys.type];
		} else if (key === "params") {
			data.params = JSON.parse(atts[keys.params] || "{}") || {};
		} else {
			data[key] = atts[keys[key]]?.split(",\n");
		}
	}
	return data;
};
const getValuesFromData = (data, keys) => {
	const values = {};
	for (const key in keys) {
		if (key === "type") {
			values[keys.type] = data.type;
		} else if (key === "params") {
			values[keys.params] = JSON.stringify(data.params || {});
		} else {
			if (Array.isArray(data[key])) {
				values[keys[key]] = data[key].join(",\n");
			}
		}
	}
	return values;
};

const baseGradientParams = {
	useAccentColor: { type: "boolean" },
	baseGradientRotate: { minimum: 0, maximum: 360, multipleOf: 5 },
	baseGradientColor1: { minimum: 1, maximum: 12 },
	baseGradientColor2: { minimum: 1, maximum: 12 },
};
const getBaseGradientCode = (params) => {
	const { useAccentColor = true, baseGradientRotate = 0, baseGradientColor1 = 6, baseGradientColor2 = 7 } = params;
	const colorKey = useAccentColor ? "sx" : "bx";
	return `linear-gradient(${baseGradientRotate}deg in hsl,${translateColor(colorKey + baseGradientColor1)},${translateColor(colorKey + baseGradientColor2)})`;
};

const BackgroundImageDataGenerators = {
	prepared: {
		label: __("既定画像", "catpow"),
		params: {
			image: { "@editor": "Image" },
		},
		getData(params = {}) {
			const { image } = params;
			return {
				image: [],
			};
		},
	},
	custom: {
		label: __("カスタム", "catpow"),
		params: {
			image: { "@editor": "Image" },
			w: { minimum: 5, maximum: 200 },
		},
		getData(params = {}) {
			const { image, w } = params;
			return {
				image: [`url('${image.url}')`],
				size: [`${w}px`],
				blendmode: ["normal"],
			};
		},
	},
	stripe: {
		label: __("ストライプ", "catpow"),
		params: {
			...baseGradientParams,
			r: { minimum: 0, maximum: 180, multipleOf: 5 },
			w1: { minimum: 1, maximum: 100 },
			w2: { minimum: 1, maximum: 100 },
			alpha: { minimum: 0, maximum: 100, multipleOf: 10 },
		},
		getData(params = {}) {
			const { r = 0, w1 = 10, w2 = 10, alpha = 50 } = params;
			const gradient1 = `repeating-linear-gradient(${r}deg,#0000,#0000 ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1 + w2}px)`;
			const gradient2 = getBaseGradientCode(params);
			return {
				image: [gradient1, gradient2],
				size: ["cover"],
				blendmode: ["screen", "normal"],
			};
		},
	},
	ripple: {
		label: __("リップル", "catpow"),
		params: {
			...baseGradientParams,
			x: { minimum: -100, maximum: 200, multipleOf: 10 },
			y: { minimum: -100, maximum: 200, multipleOf: 10 },
			w1: { minimum: 1, maximum: 100 },
			w2: { minimum: 1, maximum: 100 },
			alpha: { minimum: 0, maximum: 100, multipleOf: 10 },
		},
		getData(params = {}) {
			const { x = 50, y = 50, w1 = 10, w2 = 10, alpha = 50 } = params;
			const gradient1 = `repeating-radial-gradient(circle at ${x}% ${y}%,#0000,#0000 ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1}px,rgba(255,255,255,${alpha / 100}) ${w1 + w2}px)`;
			const gradient2 = getBaseGradientCode(params);
			return {
				image: [gradient1, gradient2],
				size: ["cover"],
				blendmode: ["screen", "normal"],
			};
		},
	},
	check: {
		label: __("チェック", "catpow"),
		params: {
			...baseGradientParams,
			r1: { minimum: 0, maximum: 180, multipleOf: 5 },
			r2: { minimum: 0, maximum: 180, multipleOf: 5 },
			w: { minimum: 5, maximum: 200 },
			alpha: { minimum: 0, maximum: 100, multipleOf: 10 },
		},
		getData(params = {}) {
			const { r1 = 45, r2 = 135, w = 20, alpha = 50 } = params;

			const gradient1 = getBaseGradientCode(params);
			const gradient2 = `linear-gradient(rgba(0,0,0,${1 - alpha / 100}),rgba(0,0,0,${1 - alpha / 100}))`;
			const gradient3 = `repeating-linear-gradient(${r1}deg,#000,#000 ${w}px,#fff ${w}px,#fff ${w * 2}px)`;
			const gradient4 = `repeating-linear-gradient(${r2}deg,#000,#000 ${w}px,#fff ${w}px,#fff ${w * 2}px)`;
			return {
				image: [gradient1, gradient2, gradient3, gradient4],
				size: ["cover"],
				blendmode: ["screen", "multiply", "difference", "normal"],
			};
		},
	},
	air: {
		label: __("エア", "catpow"),
		params: {
			...baseGradientParams,
			w: { minimum: 5, maximum: 200 },
			h: { minimum: 5, maximum: 200 },
			alpha: { minimum: 0, maximum: 100, multipleOf: 10 },
		},
		getData(params = {}) {
			const { w = 50, h = 50, alpha = 25 } = params;
			const p1 = 50 + pfloor(h / 5, 1),
				p2 = 50 + pfloor(h / 10, 1),
				p3 = 50 + pfloor(h / 3, 1);
			const gradient1 = `radial-gradient(${80 + w / 2}% 100% at 40% 0%,rgba(255,255,255,0),rgba(255,255,255,0) ${p1}%,rgba(255,255,255,${alpha / 100}) ${p1}%,rgba(255,255,255,0))`;
			const gradient2 = `radial-gradient(${100 + w}% 100% at 25% 100%,rgba(255,255,255,0),rgba(255,255,255,${alpha / 100}) ${p2}%,rgba(255,255,255,0) ${p2}%,rgba(255,255,255,0))`;
			const gradient3 = `radial-gradient(${100 + w}% 100% at 100% 100%,rgba(255,255,255,0),rgba(255,255,255,${alpha / 100}) ${p3}%,rgba(255,255,255,0) ${p3}%,rgba(255,255,255,0))`;
			const gradient4 = getBaseGradientCode(params);
			return {
				image: [gradient1, gradient2, gradient3, gradient4],
				size: ["cover"],
				blendmode: ["overlay", "overlay", "overlay", "normal"],
			};
		},
	},
	bubble: {
		label: __("バブル", "catpow"),
		params: {
			...baseGradientParams,
			a: { minimum: 1, maximum: 10 },
			w: { minimum: 5, maximum: 200 },
			alpha: { minimum: 0, maximum: 100, multipleOf: 10 },
			seed: { minimum: 1, maximum: 100 },
		},
		getData(params = {}) {
			const { a = 5, w = 50, alpha = 25, seed = 10 } = params;
			const rand = srand(seed);
			const image = [];
			const blendmode = [];
			for (let i = 0; i < a; i++) {
				const s = 10 + w / 4 + rand(0, Math.floor(w / 8));
				image.push(
					`radial-gradient(circle farthest-side at ${rand(-w, 100 + w)}% ${rand(-w, 100 + w)}%,rgba(255,255,255,0),rgba(255,255,255,0) ${s - s / 5}%,rgba(255,255,255,${
						alpha / 200
					}) ${s}%,rgba(255,255,255,0) ${s}%,rgba(255,255,255,0) 100%)`
				);
				blendmode.push("overlay");
			}
			image.push(getBaseGradientCode(params));
			blendmode.push("normal");
			return { image, size: ["cover"], blendmode, repeat: ["no-repeat"] };
		},
	},
};

wp.domReady(() => {
	wp.hooks.applyFilters("catpow.blocks.backgroundImageDataGenerators", BackgroundImageDataGenerators);
});

export const InputBackgroundImage = (props) => {
	const { title = "BackgroundImage", attr, set, keys = {}, prefix = "--cp-background-image" } = props;
	fillValueKeys(keys, prefix);
	const [data, setData] = useState(extractData(attr, keys));

	const schema = useMemo(() => {
		const schema = {
			properties: {
				type: { "@editor": "Select", options: {} },
			},
			oneOf: [],
		};
		for (const key in BackgroundImageDataGenerators) {
			schema.properties.type.options[BackgroundImageDataGenerators[key].label] = key;
			schema.oneOf.push({
				properties: {
					type: { const: key },
					params: {
						properties: BackgroundImageDataGenerators[key].params,
					},
				},
			});
		}
		return schema;
	}, []);

	return (
		<CP.Bem>
			<div className="cp-inputbackgroundimage">
				<Catpow.JsonEditor
					title={title}
					schema={schema}
					json={data}
					autoSave={100}
					showHeader={false}
					debug={false}
					onChange={(data) => {
						const gen = BackgroundImageDataGenerators[data.type];
						if (gen != null) {
							const mergedData = { ...data, ...gen.getData(data.params) };
							setData(mergedData);
							set(getValuesFromData(mergedData, keys));
						}
					}}
				/>
			</div>
		</CP.Bem>
	);
};
