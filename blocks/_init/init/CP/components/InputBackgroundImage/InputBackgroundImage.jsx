import * as BackgroundImageDataGenerators from "./BackgroundImageDataGenerators/index.js";

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

wp.domReady(() => {
	wp.hooks.applyFilters("catpow.blocks.backgroundImageDataGenerators", BackgroundImageDataGenerators);
});

export const InputBackgroundImage = (props) => {
	const { title = "BackgroundImage", attr = {}, set, keys = {}, prefix = "--cp-background-image" } = props;
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

	console.assert(CP.Bem != null, "CP.Bem is not defined. Make sure to import the CP module.");
	console.assert(Catpow.JsonEditor != null, "Catpow.JsonEditor is not defined. Make sure to import the Catpow module.");

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
