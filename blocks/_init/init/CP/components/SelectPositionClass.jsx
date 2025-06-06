import { clsx } from "clsx";

export const SelectPositionClass = (props) => {
	const { BaseControl } = wp.components;
	const rows = [
		["topLeft", "top", "topRight"],
		["left", "center", "right"],
		["bottomLeft", "bottom", "bottomRight"],
	];
	const values = _.flatten(rows);
	const { label, help, itemsKey, index, disable } = props;
	let value = itemsKey ? CP.getItemSelectiveClass(props, values) : CP.getSelectiveClass(props, values);

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
											onClick={() => {
												if (itemsKey) {
													CP.switchItemSelectiveClass(props, values, col, props.key);
												} else {
													CP.switchSelectiveClass(props, values, col, props.key);
												}
											}}
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
