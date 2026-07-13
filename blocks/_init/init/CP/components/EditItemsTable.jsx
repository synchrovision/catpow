import { bem } from "catpow/util";

export const EditItemsTable = (props) => {
	const { setAttributes, attributes, itemKeys = ["items"], isTemplate = false } = props;
	const { useCallback } = wp.element;
	const { RichText } = wp.blockEditor;
	const classes = bem("cp-edititemstable");

	const items = CP.getTheItems({ attributes, itemKeys }) || [];
	const save = () => {
		setAttributes({ [itemKeys[0]]: JSON.parse(JSON.stringify(attributes[itemKeys[0]])) });
	};
	const getActiveColumns = useCallback((props) => {
		const columns = [];
		props.columns.forEach((col) => {
			if (col.hasOwnProperty("cond")) {
				if (typeof col.cond === "function") {
					if (!col.cond(attributes)) {
						return false;
					}
				} else if (!col.cond) {
					return false;
				}
			}
			if (col.type === "dynamic") {
				columns.push.apply(columns, col.getColumns(attributes));
			} else {
				columns.push(col);
			}
		});
		return columns;
	}, []);
	const columns = getActiveColumns(props);

	return (
		<CP.Bem prefix="cp">
			<table className="cp-edititemstable">
				<thead>
					<tr>
						{columns.map((col, c) => (
							<th key={c}>{col.label || col.key}</th>
						))}
						<th></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => {
						const propsForControl = { attributes, setAttributes, itemKeys: [...itemKeys, index] };
						return (
							<tr
								onClick={(e) => {
									setAttributes({ currentItemIndex: index });
								}}
								key={index}
							>
								{columns.map((col, c) => {
									switch (col.type) {
										case "select": {
											return (
												<td key={c}>
													<select
														value={item[col.key]}
														onChange={(e) => {
															item[col.key] = e.target.value;
															save();
														}}
													>
														{col.options.map((option, o) => (
															<option key={o} value={option.value}>
																{option.label}
															</option>
														))}
													</select>
												</td>
											);
										}
										case "text": {
											return (
												<td key={c}>
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
										case "number": {
											return (
												<td key={c}>
													<input
														type="number"
														value={item[col.key]}
														onChange={({ target: { value } }) => {
															item[col.key] = value;
															save();
														}}
													/>
												</td>
											);
										}
										case "color": {
											return (
												<td key={c}>
													<input
														type="color"
														value={item[col.key]}
														onChange={({ target: { value } }) => {
															item[col.key] = value;
															save();
														}}
													/>
												</td>
											);
										}
										case "date": {
											return (
												<td key={c}>
													<input
														type="date"
														value={item[col.key]}
														onChange={({ target: { value } }) => {
															item[col.key] = value;
															save();
														}}
													/>
												</td>
											);
										}
										case "image": {
											return (
												<td key={c}>
												<CP.SelectResponsiveImage {...{ attributes, setAttributes }} itemKeys={[...itemKeys, index]} keys={{ src: col.key, ...col.keys }} size={col.size || "vga"} isTemplate={isTemplate} />
												</td>
											);
										}
										case "picture": {
											return (
												<td key={c}>
												<CP.SelectPictureSources {...{ attributes, setAttributes }} itemKeys={[...itemKeys, index]} keys={col.keys} sizes={col.sizes} devices={col.devices} isTemplate={isTemplate} />
												</td>
											);
										}
										case "icon": {
											return (
												<td key={c}>
													<CP.InputIcon
														prm={col}
														item={item}
														save={(values) => {
															Object.assign(item, values);
															save();
														}}
													/>
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
												<td key={c}>
												<CP.EditItemsTable
													{...{ attributes, setAttributes }}
													itemKeys={[...itemKeys, index, col.itemsKey]}
														columns={col.columns}
														isTemplate={isTemplate}
													/>
												</td>
											);
										}
										default: {
											return <td key={c}>{item[col.key]}</td>;
										}
									}
								})}
								<CP.ItemControl
									tagName="td"
									controls={{
										delete: (e) => CP.deleteItem(propsForControl),
										clone: (e) => CP.cloneItem(propsForControl),
										up: (e) => CP.upItem(propsForControl),
										down: (e) => CP.downItem(propsForControl),
									}}
									float={false}
								/>
							</tr>
						);
					})}
				</tbody>
			</table>
		</CP.Bem>
	);
};
