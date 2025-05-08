import { CP } from "./CP.jsx";
import { bem } from "catpow/util";

CP.DataSetInput = (props) => {
	const { useMemo, useCallback } = wp.element;
	const { param, value: dataSet = [], onChange } = props;
	const classes = bem("cp-datasetinput");

	const appendData = useCallback(() => {
		const data = {};
		Object.keys(param.items).forEach((key) => {
			const item = param.items[key];
			if (item.hasOwnProperty("default")) {
				data[key] = item.default;
			} else {
				data[key] = null;
			}
		});
		dataSet.push(data);
		onChange(dataSet.slice());
	}, [param.items, dataSet, onChange]);

	return (
		<ul className={classes()}>
			{dataSet &&
				dataSet.map((data, index) => {
					const dataProps = {
						tag: "li",
						set: ({ dataSet }) => {
							onChange(dataSet);
						},
						items: dataSet,
						itemsKey: "dataset",
						index,
					};
					return (
						<li className={classes.row()} key={index}>
							<ul className={classes.row.items()}>
								{Object.keys(param.items).map((key) => {
									return (
										<li className={classes.row.items.item()} key={key}>
											<CP.DynamicInput
												param={param.items[key]}
												value={data[key]}
												onChange={(value) => {
													data[key] = value;
													onChange(dataSet.slice());
												}}
											/>
										</li>
									);
								})}
							</ul>
							<CP.ItemControl
								controls={{
									delete: (e) => CP.deleteItem(dataProps),
									clone: (e) => CP.cloneItem(dataProps),
									up: (e) => CP.upItem(dataProps),
									down: (e) => CP.downItem(dataProps),
								}}
							/>
						</li>
					);
				})}
			<li className={classes.row()}>
				<div className={classes.row.button("is-button-append")} onClick={appendData}></div>
			</li>
		</ul>
	);
};
