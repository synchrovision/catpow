import { kebabToCamel } from "catpow/util";
const { __ } = wp.i18n;

import { SelectClassPanelContext } from "./SelectClassPanel.jsx";

export const SelectClassPanelBlock = ({ prm }) => {
	const { Fragment, useMemo, useContext, createElement: el } = wp.element;
	const { CheckboxControl, RadioControl, SelectControl, TextareaControl, TextControl, ColorPicker, __experimentalGradientPicker: GradientPicker } = wp.components;
	const { props, item, states, allStates, set, save, saveClasses, styleDatas, saveCss, primaryClassKey } = useContext(SelectClassPanelContext);
	const { subItemsKey } = props;
	if (prm.hasOwnProperty("cond")) {
		if (prm.cond === false) {
			return false;
		}
		if (Array.isArray(prm.cond) && prm.cond.some((className) => !states[className])) {
			return false;
		}
		if (typeof prm.cond === "string" && !states[prm.cond]) {
			return false;
		}
		if (typeof prm.cond === "function" && !prm.cond(states, props)) {
			return false;
		}
	}
	let rtn = [];
	if (prm.keys) {
		if (props.items) {
			prm.keys.items = prm.keys.items || props.itemsKey;
			if (subItemsKey) {
				prm.keys.subItems = prm.keys.subItems || subItemsKey;
			}
		}
	}
	if (prm.json) {
		if (prm.input) {
			switch (prm.input) {
				case "select":
				case "buttons":
				case "gridbuttons":
				case "bool":
				case "range":
				case "text":
				case "textarea": {
					rtn.push(
						<CP.DynamicInput
							param={prm}
							value={JSON.parse(props.attr[prm.json])[prm.key]}
							onChange={(val) => {
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								CP.setJsonValue(props, prm.json, prm.key, val);
								if (prm.effect) {
									prm.effect(val, states, props);
								}
							}}
						/>
					);
					break;
				}
				case "picture": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					let attr = JSON.parse(props.attr[prm.json]) || {};
					if (prm.key) {
						attr = attr[prm.key] || {};
					}
					rtn.push(
						<CP.SelectPictureSources
							index={props.index}
							set={(val) => {
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								if (prm.key) {
									CP.setJsonValue(props, prm.json, prm.key, Object.assign(attr, val));
								} else {
									CP.setJsonValues(props, prm.json, prm.keys, val);
								}
								if (prm.effect) {
									prm.effect(val, states, props);
								}
							}}
							attr={attr}
							keys={prm.keys}
							sizes={prm.sizes}
							devices={prm.devices}
							isTemplate={prm.isTemplate}
						/>
					);
					break;
				}
				case "flag": {
					let value = CP.getJsonValue(props, prm.json, prm.key) || 0;
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					Object.keys(prm.values).forEach((key) => {
						rtn.push(
							<CheckboxControl
								label={key}
								onChange={(flag) => {
									value |= prm.values[key];
									if (!flag) {
										value ^= prm.values[key];
									}
									CP.setJsonValue(props, prm.json, prm.key, value);
								}}
								checked={value & prm.values[key]}
								key={key}
							/>
						);
					});
					break;
				}
				case "color": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<ColorPicker
							color={CP.getJsonValue(props, prm.json, prm.key) || "#FFFFFF"}
							onChangeComplete={(value) => {
								CP.setJsonValue(props, prm.json, prm.key, value.hex);
							}}
						/>
					);
					break;
				}
				case "colors": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<CP.SelectColors
							colors={
								CP.getJsonValue(props, prm.json, prm.key) || [
									{ h: "40", s: "80%", l: "50%" },
									{ h: "60", s: "80%", l: "50%" },
								]
							}
							onChange={(colors) => {
								CP.setJsonValue(props, prm.json, prm.key, colors);
							}}
						/>
					);
					break;
				}
				case "gradient": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<GradientPicker
							onChange={(value) => {
								console.log(CP.parseGradientStyleValue(value));
							}}
						/>
					);
					break;
				}
			}

			switch (prm.input) {
				case "select":
				case "buttons":
				case "gridbuttons": {
					if (prm.sub) {
						if (prm.sub[JSON.parse(props.attr[prm.json])[prm.key]]) {
							let sub = [];
							prm.sub[JSON.parse(props.attr[prm.json])[prm.key]].forEach((prm) => {
								sub.push(<SelectClassPanelBlock prm={prm} />);
							});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
					break;
				}
				case "bool": {
					if (prm.sub) {
						if (JSON.parse(props.attr[prm.json])[prm.key]) {
							let sub = [];
							prm.sub.forEach((prm) => {
								sub.push(<SelectClassPanelBlock prm={prm} />);
							});
							rtn.push(<div className="sub">{sub}</div>);
						}
					}
					break;
				}
			}
		} else if (_.isObject(prm.values)) {
			let { options, values } = CP.parseSelections(prm.values);
			rtn.push(
				<SelectControl
					label={prm.label}
					value={CP.getJsonValue(props, prm.json, prm.key)}
					onChange={(val) => {
						CP.setJsonValue(props, prm.json, prm.key, val);
					}}
					options={options}
				/>
			);
			if (prm.sub) {
				let currentValue = CP.getJsonValue(props, prm.json, prm.key);
				if (currentValue && prm.sub[currentValue]) {
					let sub = [];
					prm.sub[currentValue].forEach((prm) => {
						sub.push(<SelectClassPanelBlock prm={prm} />);
					});
					rtn.push(<div className="sub">{sub}</div>);
				}
			}
		} else if (prm.values) {
			rtn.push(
				<CheckboxControl
					label={prm.label}
					onChange={() => {
						CP.switchJsonValue(props, prm.json, prm.key, prm.values);
					}}
					checked={CP.hasJsonValue(props, prm.json, prm.key, prm.values)}
				/>
			);
			if (prm.sub) {
				if (CP.getJsonValue(props, prm.json, prm.key)) {
					let sub = [];
					prm.sub.forEach((prm) => {
						sub.push(<SelectClassPanelBlock prm={prm} />);
					});
					rtn.push(<div className="sub">{sub}</div>);
				}
			}
		} else {
			rtn.push(
				<TextControl
					label={prm.label}
					value={JSON.parse(props.attr[prm.json])[prm.key]}
					onChange={(val) => {
						CP.setJsonValue(props, prm.json, prm.key, val);
					}}
				/>
			);
		}
	} else if (prm.css) {
		const { device = "pc" } = prm;
		const media = CP.getMediaQueryKeyForDevice(device);
		const sel = typeof prm.sel === "function" ? prm.sel(props) : prm.sel;
		styleDatas[prm.css] = styleDatas[prm.css] || {};
		styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
		styleDatas[prm.css][media][sel] = styleDatas[prm.css][media][sel] || {};
		const tgt = styleDatas[prm.css][media][sel];
		if (prm.input) {
			switch (prm.input) {
				case "border":
					rtn.push(
						<CP.SelectPreparedImage
							name="border"
							value={CP.getUrlInStyleCode(tgt.borderImage)}
							color={prm.color || 0}
							onChange={(image) => {
								if (!image.conf) {
									return;
								}
								const { slice, width, repeat } = image.conf;
								tgt.borderStyle = "solid";
								tgt.borderImage = "url(" + image.url + ") fill " + slice + " / " + width + " " + repeat;
								saveCss(prm.css);
							}}
						/>
					);
					break;
				case "pattern":
					rtn.push(
						<CP.SelectPreparedImage
							name="pattern"
							value={CP.getUrlInStyleCode(tgt.backgroundImage)}
							color={prm.color || 0}
							onChange={(image) => {
								if (!image.conf) {
									return;
								}
								const { size, width, height, repeat, x, y } = image.conf;
								tgt.backgroundImage = "url(" + image.url + ")";
								if (width && height) {
									tgt.backgroundSize = width + "px " + height + "px";
								} else if (size) {
									tgt.backgroundSize = CP.translateCssVal("background-size", size);
								} else {
									delete tgt.backgroundSize;
								}
								if (repeat) {
									tgt.backgroundRepeat = CP.translateCssVal("background-repeat", repeat);
								} else {
									delete tgt.backgroundRepeat;
								}
								if (x && y) {
									tgt.backgroundPosition = x + "% " + y + "%";
								} else {
									delete tgt.backgroundPosition;
								}
								saveCss(prm.css);
							}}
						/>
					);
					break;
				case "frame":
					rtn.push(
						<CP.SelectPreparedImageSet
							name="frame"
							value={CP.getUrlInStyleCode(tgt.borderImage)}
							color={prm.color || 0}
							onChange={(imageset) => {
								imageset.forEach((image) => {
									if (!image.conf) {
										return;
									}
									const { device, slice, width, repeat } = image.conf;
									const media = CP.getMediaQueryKeyForDevice(device);
									styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
									styleDatas[prm.css][media][sel] = styleDatas[prm.css][media][sel] || {};
									styleDatas[prm.css][media][sel].borderStyle = "solid";
									styleDatas[prm.css][media][sel].borderImage = "url(" + image.url + ") fill " + slice + " / " + width + " " + repeat;
								});
								saveCss(prm.css);
							}}
						/>
					);
					break;
			}
		} else {
			rtn.push(
				<TextControl
					label={prm.label}
					value={tgt[prm.attr]}
					onChange={(val) => {
						tgt[prm.attr] = val;
						saveCss(prm.css);
					}}
				/>
			);
		}
	} else if (prm.vars) {
		if (prm.input) {
			if (props.attr?.[prm.vars]?.[prm.key] === undefined && prm.default != null) {
				save({
					[prm.vars]: {
						...props.attr[prm.vars],
						[prm.key]: prm.default,
					},
				});
			}
			switch (prm.input) {
				case "select":
				case "buttons":
				case "gridbuttons":
				case "bool":
				case "range":
				case "text":
				case "textarea": {
					rtn.push(
						<CP.DynamicInput
							param={prm}
							value={props.attr?.[prm.vars]?.[prm.key]}
							onChange={(val) => {
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										[prm.key]: `${val}`,
									},
								});
							}}
						/>
					);
					break;
				}
				case "customColorVars": {
					rtn.push(
						<CP.CustomColorVars
							value={props.attr[prm.vars]}
							onChange={(vars) => {
								const newVars = { ...props.attr[prm.vars] };
								Object.keys(vars).forEach((key) => {
									if (vars[key] === null) {
										delete newVars[key];
									} else {
										newVars[key] = vars[key];
									}
								});
								save({ [prm.vars]: newVars });
							}}
						/>
					);
					break;
				}
				case "blendmode": {
					rtn.push(
						<CP.SelectBlendMode
							label={prm.label}
							value={props.attr?.[prm.vars]?.[prm.key]}
							onChange={(val) => {
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										[prm.key]: `${val}`,
									},
								});
							}}
						/>
					);
					break;
				}
				case "image": {
					rtn.push(
						<CP.SelectResponsiveImage
							attr={props.attr[prm.vars]}
							set={(data) => {
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										...data,
									},
								});
							}}
							keys={{ url: prm.key }}
						/>
					);
					break;
				}
				case "backgroundimage": {
					rtn.push(
						<CP.InputBackgroundImage
							attr={props.attr[prm.vars]}
							set={(data) => {
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										...data,
									},
								});
							}}
							keys={prm.keys}
							prefix={prm.prefix}
						/>
					);
					break;
				}
				case "position": {
					rtn.push(
						<CP.PositionInput
							label={prm.label}
							value={props.attr?.[prm.vars]?.[prm.key]}
							onChange={(val) => {
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										[prm.key]: `${val}`,
									},
								});
							}}
						/>
					);
					break;
				}
				case "size": {
					rtn.push(
						<CP.SelectSize
							label={prm.label}
							value={props.attr?.[prm.vars]?.[prm.key]}
							onChange={(val) => {
								save({
									[prm.vars]: {
										...props.attr[prm.vars],
										[prm.key]: `${val}`,
									},
								});
							}}
						/>
					);
					break;
				}
			}
		} else {
			rtn.push(
				<TextControl
					label={prm.label}
					value={props.attr?.[prm.vars]?.[prm.key]}
					onChange={(val) => {
						save({
							[prm.vars]: { ...props.attr[prm.vars], [prm.key]: `${val}` },
						});
					}}
				/>
			);
		}
	} else {
		if (prm === "color") {
			rtn.push(
				<CP.SelectColorClass
					label={__("色", "catpow")}
					selected={states}
					onChange={(proxy) => {
						if (!props.items) {
							set({ color: proxy.value });
						}
						saveClasses();
					}}
				/>
			);
		} else if (prm === "pattern") {
			/**
			 * @deprecated This feature should merge to backgroundPattern preset
			 */
			rtn.push(
				<CP.SelectPatternClass
					label={__("パターン", "catpow")}
					set={props.set}
					attr={props.attr}
					selected={Object.keys(states).find((key) => /^pattern\d+/.test(key))}
					onChange={(pattern) => {
						CP.filterFlags(states, (key) => !/^pattern\d+/.test(key));
						states[pattern] = true;
						saveClasses();
					}}
				/>
			);
		} else if (prm === "cond") {
			rtn.push(<TextareaControl label={__("表示条件", "catpow")} value={item["cond"]} onChange={(cond) => save({ cond })} />);
		} else if (prm === "event") {
			const EventInputs = useMemo(() => wp.hooks.applyFilters("catpow.EventInputs", [], { item, save }), [item, save]);
			rtn.push(...EventInputs);
		} else if (prm.input) {
			if (item[prm.key] === undefined && prm.default != null) {
				save({ [prm.key]: prm.default });
			}
			switch (prm.input) {
				case "select":
				case "buttons":
				case "gridbuttons":
				case "bool":
				case "range":
				case "text":
				case "textarea": {
					rtn.push(
						<CP.DynamicInput
							param={prm}
							value={item[prm.key]}
							onChange={(val) => {
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								save({ [prm.key]: val });
								if (prm.effect) {
									prm.effect(val, states, props);
								}
							}}
						/>
					);
					break;
				}
				case "dataset": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<CP.DataSetInput
							param={prm}
							value={item[prm.key]}
							onChange={(val) => {
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								save({ [prm.key]: val });
								if (prm.effect) {
									prm.effect(val, states, props);
								}
							}}
						/>
					);
					break;
				}
				case "image": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<CP.SelectResponsiveImage
							index={props.index}
							set={props.set}
							attr={props.attr}
							keys={prm.keys}
							size={prm.size}
							sizes={prm.sizes}
							device={prm.device}
							devices={prm.devices}
							isTemplate={prm.isTemplate}
						/>
					);
					break;
				}
				case "picture": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(<CP.SelectPictureSources index={props.index} set={props.set} attr={props.attr} keys={prm.keys} sizes={prm.sizes} devices={prm.devices} isTemplate={prm.isTemplate} />);
					break;
				}
				case "backgroundimage": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(<CP.InputBackgroundImage index={props.index} set={props.set} attr={props.attr} keys={prm.keys} sizes={prm.sizes} devices={prm.devices} isTemplate={prm.isTemplate} />);
					break;
				}
				case "position": {
					rtn.push(<CP.SelectPositionClass set={props.set} attr={props.attr} label={prm.label} key={prm.key} help={prm.help} disable={prm.disable} itemsKey={itemsKey} index={props.index} />);
				}
				case "icon": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(<CP.InputIcon prm={prm} item={item} save={save} />);
					break;
				}
				case "symbol":
				case "pattern": {
					/**
					 * @deprecated This feature should merge to backgroundPattern preset
					 */
					prm.keys = prm.keys || {};
					prm.keys.src = prm.keys.src || prm.input + "Src";
					prm.keys.alt = prm.keys.alt || prm.input + "Alt";
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<CP.SelectPreparedImage
							name={prm.input}
							value={item[prm.keys.src]}
							color={prm.color || CP.getColor({ attr: item }) || 0}
							onChange={(image) => {
								save({
									[prm.keys.src]: image.url,
									[prm.keys.alt]: image.alt,
								});
							}}
						/>
					);
					break;
				}
				case "json": {
					if (prm.label) {
						rtn.push(<h5>{prm.label}</h5>);
					}
					rtn.push(
						<Catpow.JsonEditor
							title={prm.label}
							schema={prm.schema}
							json={item[prm.key]}
							autoSave={100}
							showHeader={false}
							debug={prm.debug}
							onChange={(val) => {
								val = { ...val };
								if (prm.filter) {
									val = prm.filter(val, states, props);
								}
								save({ [prm.key]: val });
								if (prm.effect) {
									prm.effect(val, states, props);
								}
							}}
						/>
					);
					break;
				}
			}
			switch (prm.input) {
				case "select":
				case "buttons":
				case "gridbuttons": {
					if (prm.sub && prm.sub[item[prm.key]]) {
						let sub = [];
						prm.sub[item[prm.key]].forEach((prm) => {
							sub.push(<SelectClassPanelBlock prm={prm} />);
						});
						rtn.push(<div className="sub">{sub}</div>);
					}
					break;
				}
				case "bool": {
					if (prm.sub && item[prm.key]) {
						let sub = [];
						prm.sub.forEach((prm) => {
							sub.push(<SelectClassPanelBlock prm={prm} />);
						});
						rtn.push(<div className="sub">{sub}</div>);
					}
					break;
				}
			}
		} else {
			const { classKey = primaryClassKey } = prm;
			const targetStates = allStates[classKey] || {};
			const allClassFlags = CP.getAllClassFlags(prm, primaryClassKey);
			const classFlagsByValue = CP.getClassFlagsByValue(prm, primaryClassKey);
			const bindClasseFlagsByValue = CP.getBindClassFlagsByValue(prm, primaryClassKey);
			if (_.isObject(prm.values)) {
				var { options, values } = CP.parseSelections(prm.values);
				const currentClass = values.find((value) => targetStates[kebabToCamel(value)]);

				const onChangeCB = (value) => {
					const updates = CP.getUpdatesFromStatesAndClasssFlags({
						states,
						allStates,
						allClassFlags,
						classFlags: classFlagsByValue[value],
						bindClassFlags: bindClasseFlagsByValue[value],
					});
					set(updates);
					if (prm.effect) {
						prm.effect(currentClass, value, targetStates, props);
					}
				};

				switch (prm.type) {
					case "radio": {
						rtn.push(<RadioControl label={prm.label} onChange={onChangeCB} selected={currentClass} options={options} />);
						break;
					}
					case "buttons": {
						rtn.push(<CP.SelectButtons label={prm.label} onChange={onChangeCB} selected={currentClass} options={options} />);
						break;
					}
					case "gridbuttons": {
						rtn.push(<CP.SelectGridButtons label={prm.label} onChange={onChangeCB} selected={currentClass} options={options} />);
						break;
					}
					default: {
						rtn.push(<SelectControl label={prm.label} onChange={onChangeCB} value={currentClass} options={options} />);
					}
				}

				if (prm.sub) {
					if (currentClass && prm.sub[currentClass]) {
						let sub = [];
						prm.sub[currentClass].forEach((prm, index) => {
							sub.push(
								<Fragment key={index}>
									<SelectClassPanelBlock prm={prm} />
								</Fragment>
							);
						});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			} else {
				rtn.push(
					<CheckboxControl
						label={prm.label}
						onChange={() => {
							if (targetStates[prm.values]) {
								const updates = CP.getUpdatesFromStatesAndClasssFlags({
									allStates,
									allClassFlags,
								});
								set(updates);
							} else {
								const updates = CP.getUpdatesFromStatesAndClasssFlags({
									allStates,
									allClassFlags,
									classFlags: classFlagsByValue[prm.values],
									bindClassFlags: bindClasseFlagsByValue[prm.values],
								});
								set(updates);
							}
							if (prm.effect) {
								prm.effect(currentClass, value, targetStates, props);
							}
						}}
						checked={!!targetStates[prm.values]}
					/>
				);
				if (prm.sub) {
					if (targetStates[prm.values]) {
						let sub = [];
						prm.sub.forEach((prm, index) => {
							sub.push(
								<Fragment key={index}>
									<SelectClassPanelBlock prm={prm} />
								</Fragment>
							);
						});
						rtn.push(<div className="sub">{sub}</div>);
					}
				}
			}
		}
	}
	return (
		<>
			{rtn.map((item, index) => (
				<Fragment key={index}>{item}</Fragment>
			))}
		</>
	);
};
