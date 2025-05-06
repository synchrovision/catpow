﻿const { __ } = wp.i18n;

CP.JsonLdBlockContext = wp.element.createContext({});

wp.blocks.registerBlockType("catpow/jsonld", {
	title: "🐾 JsonLD",
	description: "各種の構造化データを記述。",
	icon: "analytics",
	category: "catpow",
	edit({ attributes, className, setAttributes }) {
		const { useState, useCallback, useMemo, useEffect, useContext, useRef } = wp.element;
		const { Icon } = wp.components;
		const { InspectorControls } = wp.blockEditor;
		const { types, formals, data = {}, EditMode } = attributes;
		const { SelectBox, RadioButtons, CheckBoxes, Toggle, SelectMedia, InputDateTime } = Catpow;
		const classes = useMemo(() => Catpow.util.bem("wp-block-catpow-jsonld"), []);

		const save = useCallback(() => {
			setAttributes({ data: { ...data } });
		}, [data, setAttributes]);

		const consoleError = useCallback((message) => console.error("JsonLD Block : " + message), []);
		const convertDefaultValue = useCallback((value, conf) => {
			switch (conf.input) {
				case "datetime": {
					return Catpow.util.getDateTimeValue(Catpow.util.getRelativeDateTimeObject(value));
				}
				default: {
					return value;
				}
			}
		}, []);
		const extractDefaultData = useCallback((conf, type = null) => {
			if (conf.type === "object") {
				const itemConf = conf.isDynamicType ? conf.confs[type || Object.keys(conf.confs)[0]] : conf;
				if (!itemConf.items) {
					return conf.multiple ? [{}] : {};
				}
				const data = itemConf.hasOwnProperty("default")
					? itemConf.default
					: itemConf.items.reduce((p, c) => {
							p[c.name] = extractDefaultData(c);
							return p;
					  }, {});
				if (type) {
					data["@type"] = type;
				} else if (itemConf["@type"]) {
					data["@type"] = itemConf["@type"];
				}
				const cloneData = JSON.parse(JSON.stringify(data));
				console.log({ phase: "extractDefaultData", conf, data, cloneData });
				return conf.multiple ? [data] : data;
			}
			if (conf.hasOwnProperty("default")) {
				const value = convertDefaultValue(conf.default, conf);
				return conf.multiple ? [value] : value;
			}
			return conf.multiple ? [""] : "";
		}, []);
		const fillUndefinedData = useCallback((data, conf) => {
			const itemConf = conf.isDynamicType ? conf.confs[(conf.multiple ? data[0]["@type"] : data["@type"]) || Object.keys(conf.confs)[0]] : conf;
			itemConf.items.forEach((item) => {
				if (item.type === "object") {
					if (item.multiple) {
						if (!data.hasOwnProperty(item.name) || !Array.isArray(data[item.name])) {
							data[item.name] = [{}];
						}
						data[item.name].forEach((dataItem) => fillUndefinedData(dataItem, item));
					} else {
						if (!data.hasOwnProperty(item.name)) {
							data[item.name] = {};
						}
						fillUndefinedData(data[item.name], item);
					}
				} else {
					if (!data.hasOwnProperty(item.name)) {
						data[item.name] = item.multiple ? [""] : "";
					}
				}
			});
			return data;
		}, []);
		const filterEmptyData = useCallback((data, conf) => {
			return data;
			Object.keys(data).forEach((key) => {
				if (Array.isArray(data[key])) {
					data[key] = data[key].filter((item, index) => {
						if (typeof item === "object") {
							data[key][index] = filterEmptyData(data[key][index]);
							return Object.keys(data[key][index]).length > (data[key][index].hasOwnProperty("@type") ? 1 : 0);
						}
						return item !== "";
					});
					if (data[key].length === 0) {
						delete data[key];
					}
				} else if (typeof data[key] === "object") {
					data[key] = filterEmptyData(data[key]);
					if (Object.keys(data[key]).length === (data[key].hasOwnProperty("@type") ? 1 : 0)) {
						delete data[key];
					}
				} else if (data[key] === "") {
					delete data[key];
				}
			});
			return data;
		}, []);
		const SelectType = useCallback(
			(props) => {
				const { classes, types, formals, data, setAttributes } = props;
				const cache = useRef({});

				const updateType = useCallback(
					(type) => {
						cache.current[data["@type"]] = JSON.parse(JSON.stringify(data));
						if (cache.current[type]) {
							setAttributes({ data: cache.current[type] });
						} else {
							const data = extractDefaultData(types[type], type);
							fillUndefinedData(data, types[type]);
							setAttributes({ data });
						}
					},
					[data, cache, setAttributes, fillUndefinedData, extractDefaultData]
				);

				return (
					<select className={classes()} value={data["@type"]} onChange={(e) => updateType(e.target.value)}>
						{Object.keys(types).map((type) => (
							<option value={type} key={type}>
								{types[type].label || types[type].name}
							</option>
						))}
					</select>
				);
			},
			[convertDefaultValue, extractDefaultData]
		);
		const Input = useCallback((props) => {
			const { classes, itemClasses, data, name, index, conf, level } = props;
			let value = index !== undefined ? data[name][index] : data[name];
			const { save } = useContext(CP.JsonLdBlockContext);

			const updateValue = useCallback(
				(value) => {
					if (index !== undefined) {
						if (!Array.isArray(data[name])) {
							data[name] = [];
						}
						data[name][index] = value;
					} else {
						data[name] = value;
					}
					save();
				},
				[data, name, index, save]
			);

			switch (conf.input) {
				case "object":
					if (typeof data[name] !== "object") {
						data[name] = {};
					}
					return (
						<div className={classes.object()}>
							{conf.items &&
								conf.items.map((item) => {
									return <InputItem classes={itemClasses} data={index !== undefined ? data[name][index] : data[name]} name={item.name} conf={item} level={level + 1} key={item.name} />;
								})}
						</div>
					);
				case "text":
					return (
						<input
							className={classes.text()}
							type="text"
							value={value}
							onChange={(e) => {
								updateValue(e.target.value);
							}}
						/>
					);
				case "textarea":
					return (
						<textarea
							className={classes.textarea()}
							onChange={(e) => {
								updateValue(e.target.value);
							}}
							value={value}
						/>
					);
				case "number":
				case "range": {
					return (
						<input
							className={classes.number()}
							type="number"
							min={conf.min || 0}
							max={conf.max || 100}
							value={value}
							onChange={(e) => {
								updateValue(e.target.value);
							}}
						/>
					);
				}
				case "select":
					return <SelectBox options={conf.options} value={value} onChange={updateValue} />;
				case "radio":
					return <RadioButtons options={conf.options} value={value} onChange={updateValue} />;
				case "checkbox":
					return <CheckBoxes options={conf.options} value={value} onChange={updateValue} />;
				case "toggle":
					return <Toggle options={conf.options} value={value} onChange={updateValue} />;
				case "image":
					return <SelectMedia src={value} onChange={(media) => updateValue(media.url)} />;
				case "datetime":
					return <InputDateTime value={value} onChange={updateValue} format={conf.format} placeholder={conf.placeholder} />;
				default:
					console.error("undefined input type " + conf.input);
					return <div>{conf.input}</div>;
			}
		}, []);
		const InputItem = useCallback(
			(props) => {
				const { classes, data, name, conf, level } = props;
				let value = data[name];
				const { save } = useContext(CP.JsonLdBlockContext);
				const cache = useRef({});

				const itemConf = useMemo(() => {
					if (conf && conf.isDynamicType) {
						if (!value["@type"] || !conf.confs[value["@type"]]) {
							value["@type"] = Object.keys(conf.confs)[0];
						}
						return conf.confs[value["@type"]];
					}
					return conf;
				}, [conf.isDynamicType && value && value["@type"]]);
				const onChangeType = useCallback(
					(e) => {
						const type = e.target.value;
						if (Array.isArray(data[name])) {
							const prevType = data[name][0]["@type"];
							cache.current[prevType] = JSON.parse(JSON.stringify(data[name]));
							data[name] = cache.current[type] || [extractDefaultData(conf, type)];
							data[name].forEach((item) => (item["@type"] = type));
						} else {
							const prevType = data[name]["@type"];
							cache.current[prevType] = JSON.parse(JSON.stringify(data[name]));
							data[name] = cache.current[type] || extractDefaultData(conf, type);
							data[name]["@type"] = type;
						}
						save();
					},
					[save, data]
				);

				const cloneItem = useCallback(
					(index) => {
						if (!Array.isArray(data[name])) {
							return;
						}
						data[name].splice(index, 0, JSON.parse(JSON.stringify(data[name][index])));
						save();
					},
					[data, name, save]
				);
				const removeItem = useCallback(
					(index) => {
						if (!Array.isArray(data[name])) {
							return;
						}
						data[name].splice(index, 1);
						save();
					},
					[data, name, save]
				);

				return (
					<div className={classes("is-level-" + level)}>
						<div className={classes.label()}>
							{conf.label || conf.name}
							{conf.url && <a className={classes.label.help()} href={conf.url} target="_blank" rel="noopener noreferer"></a>}
						</div>
						<div className={classes.inputs()}>
							{conf.isDynamicType && (
								<select className={classes.selecttype()} value={value["@type"]} onChange={onChangeType}>
									{conf["@type"].map((type) => (
										<option value={type} key={type}>
											{conf.confs[type].label || type}
										</option>
									))}
								</select>
							)}
							{itemConf.multiple ? (
								<div className={classes.inputs.group()}>
									{data[name].map((item, index) => (
										<div className={classes.inputs.group.item()} key={index}>
											<div className={classes.inputs.group.item.body()}>
												<Input classes={classes.inputs.input} itemClasses={classes} data={data} name={name} index={index} conf={itemConf} level={level} />
											</div>
											<div className={classes.inputs.group.item.control()}>
												{data[name].length > 1 && <div className={classes.inputs.group.item.control.decrease()} onClick={() => removeItem(index)}></div>}
												<div className={classes.inputs.group.item.control.increase()} onClick={() => cloneItem(index)}></div>
											</div>
										</div>
									))}
								</div>
							) : (
								<Input classes={classes.inputs.input} itemClasses={classes} data={data} name={name} conf={itemConf} level={level} />
							)}
						</div>
					</div>
				);
			},
			[Input]
		);
		const typeLabel = useMemo(() => types && data["@type"] && (types[data["@type"]]?.label || data["@type"]), [types, data["@type"]]);

		useEffect(() => {
			wp.apiFetch({ path: "/cp/v1/blocks/config/jsonld/types" }).then((res) => {
				const fillConf = (conf) => {
					if (!conf.type) {
						if (!conf.input) {
							conf.input = conf.items || conf["@type"] ? "object" : conf.options ? "select" : "text";
						}
						switch (conf.input) {
							case "object":
								conf.type = "object";
								break;
							case "range":
								conf.type = "number";
								break;
							default:
								conf.type = "string";
						}
					}
					if (!conf.input) {
						if (conf.options) {
							conf.input = "select";
						} else if (conf.items) {
							conf.input = "object";
						} else {
							conf.inuput = "text";
						}
					}
					if (conf.input === "checkbox") {
						conf.bulkInput = true;
					}
					if (conf.items) {
						conf.items.forEach(fillConf);
					}
					if (conf["@type"]) {
						if (Array.isArray(conf["@type"])) {
							const name = conf.name;
							conf.isDynamicType = true;
							conf.confs = conf["@type"].reduce((p, c) => Object.assign(p, { [c]: fillConf({ ...formals[c], name }) }), {});
						} else {
							if (formals[conf["@type"]]) {
								Object.keys(formals[conf["@type"]]).forEach((key) => {
									if (!conf.hasOwnProperty(key)) {
										conf[key] = formals[conf["@type"]][key];
									}
								});
							} else {
								consoleError(`@type ${conf["@type"]} not found in formal schema`);
							}
						}
					}
					checkConf(conf);
					return conf;
				};
				const checkConf = (conf) => {
					const errors = [];
					if (!conf.name) {
						errors.push("require name property");
					}
					if (!conf.type) {
						errors.push("require type property");
					}
					if (conf.type === "object") {
						if (conf.isDynamicType) {
							if (!conf.confs) {
								errors.push("require confs property for dinaymic type item");
							}
						} else {
							if (!conf.items) {
								errors.push("require items property for input type object");
							}
						}
					}
					if (["select", "checkbox", "radio"].includes(conf.input) && !conf.options) {
						errors.push("require options property for input type ".conf.input);
					}
					if (errors.length) {
						errors.forEach(consoleError);
						console.error(conf);
					}
				};
				const { types, formals } = res;
				Object.keys(formals).forEach((key) => {
					formals[key].items.forEach(fillConf);
				});
				Object.keys(types).forEach((key) => {
					types[key].type = "object";
					types[key].items.forEach(fillConf);
				});
				const data = JSON.parse(attributes.json);
				setAttributes({ data: fillUndefinedData(data, types[data["@type"]]), types, formals });
			});
		}, []);
		useEffect(() => {
			const timer = setTimeout(() => {
				if (data) {
					const filteredCloneData = filterEmptyData(JSON.parse(JSON.stringify(data)));
					setAttributes({ json: JSON.stringify(filteredCloneData) });
					console.log("JsonLD Block : update json");
				}
			}, 1000);
			return () => clearTimeout(timer);
		}, [data]);

		if (!types || !data) {
			return false;
		}
		return (
			<CP.JsonLdBlockContext.Provider value={{ types, save }}>
				<div className={classes()}>
					<CP.SelectModeToolbar attr={attributes} set={setAttributes} />
					{EditMode ? (
						<div className={classes.editor()}>
							<div className={classes.editor.type()}>
								<SelectType classes={classes.editor.type.select} types={types} formals={formals} data={data} setAttributes={setAttributes} />
								{types[data["@type"]] && <a className={classes.editor.type.help()} href={types[data["@type"]].url} target="_blank" rel="noopener noreferer"></a>}
							</div>
							<div className={classes.editor.items()}>
								{types[data["@type"]].items.map((conf) => (
									<InputItem classes={classes.editor.items.item} conf={conf} data={data} name={conf.name} level={0} key={conf.name} />
								))}
							</div>
						</div>
					) : (
						<div className={classes.label()}>
							<div className={classes.label.icon()}>
								<CP.ConfigIcon icon="json" />
							</div>
							<div className={classes.label.text()}>JSON-LD : {typeLabel}</div>
						</div>
					)}
				</div>
			</CP.JsonLdBlockContext.Provider>
		);
	},

	save({ attributes, className, setAttributes }) {
		return <script type="application/ld+json">{attributes.json}</script>;
	},
});
