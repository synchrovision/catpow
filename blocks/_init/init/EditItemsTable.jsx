import { CP } from "./CP.jsx";
import { bem } from "catpow/util";

CP.EditItemsTable = (props) => {
	const { set, attr, itemsKey = "items", isTemplate = false } = props;
	const { useCallback } = wp.element;
	const { RichText } = wp.blockEditor;
	const classes = bem("cp-edititemstable");

	const items = attr[itemsKey] || [];
	const save = () => {
		set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
	};
	const getActiveColumns = useCallback((props) => {
		const columns = [];
		props.columns.forEach((col) => {
			if (col.hasOwnProperty("cond")) {
				if (typeof col.cond === "function") {
					if (!col.cond(props.attr)) {
						return false;
					}
				} else if (!col.cond) {
					return false;
				}
			}
			if (col.type === "dynamic") {
				columns.push.apply(columns, col.getColumns(props.attr));
			} else {
				columns.push(col);
			}
		});
		return columns;
	}, []);
	const columns = getActiveColumns(props);

	return (
		<table className={classes()}>
			<thead className={classes.thead()}>
				<tr className={classes.thead.tr()}>
					{columns.map((col, c) => (
						<th className={classes.thead.tr.th()} key={c}>
							{col.label || col.key}
						</th>
					))}
					<th className={classes.thead.tr.th()}></th>
				</tr>
			</thead>
			<tbody className={classes.tbody()}>
				{items.map((item, index) => {
					const propsForControl = { tag: "tr", set, itemsKey, items, index };
					return (
						<tr
							className={classes.tbody.tr()}
							onClick={(e) => {
								set({ currentItemIndex: index });
							}}
							key={index}
						>
							{columns.map((col, c) => {
								switch (col.type) {
									case "text": {
										return (
											<td className={classes.tbody.tr.td()} key={c}>
												<RichText
													value={item[col.key]}
													onChange={(value) => {
														item[col.key] = value;
														save();
													}}
												/>
											</td>
										);
									}
									case "image": {
										return (
											<td className={classes.tbody.tr.td()} key={c}>
												<CP.SelectResponsiveImage attr={attr} set={set} keys={{ items: itemsKey, src: col.key, ...col.keys }} index={index} size={col.size || "vga"} isTemplate={isTemplate} />
											</td>
										);
									}
									case "picture": {
										return (
											<td className={classes.tbody.tr.td()} key={c}>
												<CP.SelectPictureSources index={index} attr={attr} set={set} keys={{ items: itemsKey, ...col.keys }} sizes={col.sizes} devices={col.devices} isTemplate={isTemplate} />
											</td>
										);
									}
									case "items": {
										col.columns.forEach((subCol) => {
											if (subCol.keys) {
												subCol.keys.subItems = col.key;
											}
										});
										return (
											<td className={classes.tbody.tr.td()} key={c}>
												<CP.EditItemsTable
													set={() => {
														save();
													}}
													attr={item}
													itemsKey={col.itemsKey}
													columns={col.columns}
													isTemplate={isTemplate}
												/>
											</td>
										);
									}
								}
							})}
							<td className={classes.tbody.tr.td()}>
								<CP.ItemControl
									controls={{
										delete: (e) => CP.deleteItem(propsForControl),
										clone: (e) => CP.cloneItem(propsForControl),
										up: (e) => CP.upItem(propsForControl),
										down: (e) => CP.downItem(propsForControl),
									}}
									float={false}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
