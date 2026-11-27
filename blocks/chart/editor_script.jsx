const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/chart", {
	icon: "chart-bar",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo, createElement: el } = wp.element;
		const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { classes, graph, EditMode = false } = attributes;
		const primaryClass = "wp-block-catpow-chart";

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					label: __("タイプ", "catpow"),
					filter: "type",
					values: {
						BarChart: __("棒グラフ", "catpow"),
						PieChart: __("円グラフ", "catpow"),
						LineChart: __("折れ線グラフ", "catpow"),
						RadarChart: __("レーダーチャート", "catpow"),
					},
				},
				{ name: "value", label: __("値を表示", "catpow"), values: "hasValue", sub: [{ label: __("単位を表示", "catpow"), values: "hasUnit" }] },
				{ name: "frame", label: __("枠線を表示", "catpow"), values: "hasFrame" },
				{ name: "grid", label: __("罫線を表示", "catpow"), values: "hasGrid" },
			];
			wp.hooks.applyFilters("catpow.blocks.chart.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);

		const states = CP.classNamesToFlags(classes);
		const save = () => {
			setAttributes({ graph: JSON.parse(JSON.stringify(graph)) });
		};

		const DataTable = () => {
			return (
				<div className="dataTable">
					<table className="editItemsTable">
						<thead>
							<tr>
								<th
									align="center"
									onBlur={(e) => {
										graph[0].title = e.currentTarget.innerHTML;
										save();
									}}
									contentEditable={true}
									suppressContentEditableWarning={true}
									colSpan={graph[0].cols.length + 1}
								>
									{graph[0].title}
								</th>
							</tr>
							<tr>
								<th></th>
								{graph[0].cols.map((col, c) => {
									return (
										<th
											align="center"
											onBlur={(e) => {
												col.label = e.currentTarget.innerHTML;
												save();
											}}
											contentEditable={true}
											suppressContentEditableWarning={true}
										>
											{col.label}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{graph[0].rows.map((row, r) => {
								return (
									<tr key={r}>
										<th
											align="center"
											onBlur={(e) => {
												row.label = e.currentTarget.innerHTML;
												save();
											}}
											contentEditable={true}
											suppressContentEditableWarning={true}
										>
											{row.label}
										</th>
										{row.vals.map((val, c) => {
											return (
												<td
													align="center"
													onBlur={(e) => {
														val.value = e.currentTarget.innerHTML;
														save();
													}}
													contentEditable={true}
													suppressContentEditableWarning={true}
													key={c}
												>
													{val.value}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			);
		};

		const blockProps = useBlockProps({ className: classes });

		return (
			<>
				<BlockControls>
					<ToolbarGroup
						controls={[
							{
								icon: "edit",
								title: "EditMode",
								isActive: EditMode,
								onClick: () => setAttributes({ EditMode: !EditMode }),
							},
						]}
					/>
				</BlockControls>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
				{EditMode ? DataTable() : <div {...blockProps}>{Catpow[type + "Output"] ? el(Catpow[type + "Output"], { ...states, ...graph[0] }) : <div className="alert">Invalid Chart Type</div>}</div>}
			</>
		);
	},
	save({ attributes }) {
		const { createElement: el } = wp.element;
		const { useBlockProps } = wp.blockEditor;
		const { classes, graph } = attributes;

		var selectiveClasses = [
			{
				label: __("タイプ", "catpow"),
				values: {
					BarChart: __("棒グラフ", "catpow"),
					PieChat: __("円グラフ", "catpow"),
					LineChart: __("折れ線グラフ", "catpow"),
					RadarChart: __("レーダーチャート", "catpow"),
				},
			},
		];
		let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);
		const states = CP.classNamesToFlags(classes);

		return <div {...useBlockProps.save({ className: classes })}>{el(Catpow[type + "Output"], { ...states, ...graph[0] })}</div>;
	},
});
