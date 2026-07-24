import { clsx } from "clsx";

export const SelectPositionClass = (props) => {
	const { BaseControl } = wp.components;
	const rows = [
		["topLeft", "top", "topRight"],
		["left", "center", "right"],
		["bottomLeft", "bottom", "bottomRight"],
	];
	const values = _.flatten(rows);
	const { label, help, attributes, setAttributes, itemKeys, disable, key: classKey = "classes" } = props;
	const item = (itemKeys ? CP.getTheItem(props) : attributes) || {};
	const classSet = new Set((item[classKey] || "").split(" "));
	const value = values.find((value) => classSet.has(value));
	const select = (value) => {
		values.forEach((value) => classSet.delete(value));
		classSet.add(value);
		const data = { [classKey]: [...classSet].filter(Boolean).join(" ") };
		if (itemKeys) {
			const targetItem = CP.getTheItem(props);
			if (!targetItem) {
				return;
			}
			Object.assign(targetItem, data);
			CP.saveItem(props);
		} else {
			setAttributes(data);
		}
	};

	return (
		<BaseControl label={label} help={help}>
			<CP.Bem prefix="cp">
				<table className="selectposition-">
					<tbody className="_body">
						{rows.map((cols, index) => (
							<tr className="_row" key={index}>
								{cols.map((col) => {
									var isChecked = value == col;
									if (disable && disable.includes(col)) {
										return (
											<td className="_cell is-disabled" key={col}>
												{" "}
											</td>
										);
									}
									return (
										<td
											className={clsx("_cell", { "is-active": isChecked })}
											onClick={() => select(col)}
											key={col}
										>
											{" "}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</CP.Bem>
		</BaseControl>
	);
};
