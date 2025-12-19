import { useMemo, useCallback, useState } from "react";
import { Input } from "./Input.jsx";

export const ObjectInput = (props) => {
	const { className = "cp-jsoneditor-input-objectinput", compact = false, popoverSize = "large", level = 0, agent, lastChanged } = props;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const schema = agent.getMergedSchemaForInput();
	const layout = schema.layout || props.layout || "block";
	const size = schema.size || props.size || "medium";

	const InputComponent = useMemo(() => {
		const InputBodyComponent = (() => {
			const stateClassNames = `is-layout-${layout} is-size-${size} is-level-${level}`;
			switch (layout) {
				case "block": {
					return (props) => {
						const { agent } = props;
						const schema = agent.getMergedSchemaForInput();
						return (
							<div className={classes.block(stateClassNames)}>
								{Object.keys(schema.properties).map((name) => {
									if (agent.properties[name] == null || agent.properties[name].getMergedSchemaForInput().hidden) {
										return false;
									}
									const schema = agent.properties[name].getMergedSchemaForInput();
									return (
										<div className={classes.block.item()} key={name}>
											<div className={classes.block.item.title()}>{schema.title || schema.key || name}</div>
											<div className={classes.block.item.body()}>
												<Input agent={agent.properties[name]} level={level + 1} layout={layout} size={size} />
											</div>
										</div>
									);
								})}
							</div>
						);
					};
				}
				case "table": {
					return (props) => {
						const { agent } = props;
						const schema = agent.getMergedSchemaForInput();
						return (
							<table className={classes.table(stateClassNames)}>
								<tbody className={classes.table.tbody()}>
									{Object.keys(schema.properties).map((name) => {
										if (agent.properties[name] == null || agent.properties[name].getMergedSchemaForInput().hidden) {
											return false;
										}
										const schema = agent.properties[name].getMergedSchemaForInput();
										return (
											<tr className={classes.table.tbody.tr()} key={name}>
												<th className={classes.table.tbody.tr.th()}>{schema.title || schema.key}</th>
												<td className={classes.table.tbody.tr.td()}>
													<Input agent={agent.properties[name]} level={level + 1} layout={layout} size={size} />
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						);
					};
				}
				case "inline": {
					return (props) => {
						const { agent } = props;
						const schema = agent.getMergedSchemaForInput();
						return (
							<div className={classes.row(stateClassNames)}>
								{Object.keys(schema.properties).map((name) => {
									if (agent.properties[name] == null || agent.properties[name].getMergedSchemaForInput().hidden) {
										return false;
									}
									const schema = agent.properties[name].getMergedSchemaForInput();
									return (
										<div className={classes.row.item()} key={name}>
											<div className={classes.row.item.title()}>{schema.title || schema.key}</div>
											<div className={classes.row.item.body()}>
												<Input agent={agent.properties[name]} level={level + 1} layout={layout} size={size} />
											</div>
										</div>
									);
								})}
							</div>
						);
					};
				}
			}
		})();
		if (compact) {
			return (props) => {
				const { agent } = props;
				const schema = agent.getMergedSchemaForInput();
				const [open, setOpen] = useState(false);
				const onClose = useCallback(() => setOpen(false), [setOpen]);

				const getLabel = useMemo(() => {
					if (!schema.label) {
						return () => schema.title || schema.key;
					}
					if (schema.label.includes("{")) {
						return (agent) =>
							schema.label.replaceAll(/{(.+?)}/g, (match, p1) => {
								const names = p1.split("|");
								for (let name of names) {
									if (/^("|').+\1$/.test(name)) {
										return name.slice(1, -1);
									}
									if (agent.properties[name]) {
										let value = agent.properties[name].getValue();
										if (value) {
											return value;
										}
									}
								}
								return "";
							});
					}
					return () => schema.label;
				}, [schema.label]);
				const label = getLabel(agent);

				return (
					<div className={classes(`is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`, open ? "is-open" : "is-close")}>
						<div className={classes.label()} onClick={() => setOpen(!open)}>
							{label}
						</div>
						<Catpow.Popover open={open} size={popoverSize} onClose={onClose} closeButton={true} closeOnClickAway={false}>
							<div className={classes.body()}>
								<InputBodyComponent agent={agent} />
							</div>
						</Catpow.Popover>
					</div>
				);
			};
		}
		return InputBodyComponent;
	}, [classes, layout, size, compact, popoverSize, level]);

	if (schema.properties == null) {
		return <div className={classes.message()}></div>;
	}

	return <InputComponent agent={agent} />;
};
