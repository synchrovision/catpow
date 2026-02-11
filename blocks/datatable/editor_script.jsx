import { clsx } from "clsx";

wp.blocks.registerBlockType("catpow/datatable", {
	title: "🐾 DataTable",
	description: "一行または１列の見出しを持つテーブルです。",
	icon: "editor-table",
	category: "catpow",

	transforms: {
		from: [
			{
				type: "files",
				isMatch: function (files) {
					if (files[1]) {
						return false;
					}
					return files[0].type === "text/csv";
				},
				priority: 15,
				transform: (files) => {
					var attributes = {
						classes: "wp-block-catpow-datatable spec",
						rows: [{ classes: "", cells: [{ text: ["Title"], classes: "th" }] }],
						file: files[0],
					};
					return wp.blocks.createBlock("catpow/datatable", attributes);
				},
			},
			{
				type: "block",
				blocks: CP.tableConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-datatable spec";
					return wp.blocks.createBlock("catpow/datatable", attributes);
				},
			},
			{
				type: "block",
				blocks: ["core/table"],
				transform: (attributes) => {
					return wp.blocks.createBlock("catpow/datatable", {
						classes: "wp-block-catpow-datatable spec",
						rows: attributes.body.map((row) => ({
							cells: row.cells.map((cell) => ({
								text: wp.blocks.parseWithAttributeSchema(cell.content, {
									source: "html",
								}),
							})),
						})),
					});
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { classes, rows = [], doLoop, AltMode = false } = attributes;

		var states = CP.classNamesToFlags(classes);

		if (attributes.file) {
			var reader = new FileReader();
			reader.addEventListener("loadend", () => {
				var attr = {
					classes: "wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn",
					rows: [],
					file: false,
				};
				var csvData = CP.parseCSV(reader.result);
				csvData.map((row, r) => {
					attr.rows.push({
						classes: "",
						cells: row.map((val) => {
							return { text: [val], classes: "" };
						}),
					});
				});
				setAttributes(attr);
			});
			reader.readAsText(attributes.file);
		}

		var statesClasses = [
			{ label: "ヘッダ行", values: "hasHeaderRow" },
			{ label: "ヘッダ列", values: "hasHeaderColumn" },
		];
		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: {
						isStyleSpec: "spec",
						isStyleSheet: "sheet",
						isStylePlan: "plan",
					},
				},
				"level",
				"color",
				{
					name: "loop",
					input: "bool",
					label: "ループ",
					key: "doLoop",
					sub: [
						{
							name: "contentPath",
							label: "content path",
							input: "text",
							key: "content_path",
						},
						{ name: "query", label: "query", input: "textarea", key: "query" },
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.datatable.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
		};

		const addRow = (index) => {
			rows.splice(index, 0, rows[index]);
			saveItems();
		};
		const deleteRow = (index) => {
			rows.splice(index, 1);
			saveItems();
		};
		const upRow = (index) => {
			rows.splice(index + 1, 0, rows.splice(index, 1)[0]);
			saveItems();
		};
		const downRow = (index) => {
			rows.splice(index - 1, 0, rows.splice(index, 1)[0]);
			saveItems();
		};

		const addColumn = (index) => {
			rows.map((row) => row.cells.splice(index, 0, row.cells[index]));
			saveItems();
		};
		const deleteColumn = (index) => {
			rows.map((row) => row.cells.splice(index, 1));
			saveItems();
		};
		const upColumn = (index) => {
			rows.map((row) => {
				row.cells.splice(index + 1, 0, row.cells.splice(index, 1)[0]);
			});
			saveItems();
		};
		const downColumn = (index) => {
			rows.map((row) => {
				row.cells.splice(index - 1, 0, row.cells.splice(index, 1)[0]);
			});
			saveItems();
		};

		const blockProps = useBlockProps({ className: classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} modes={["AltMode"]} />
				<>
					{AltMode && doLoop ? (
						<div {...blockProps} className="cp-altcontent">
							<div className="label">
								<Icon icon="welcome-comments" />
							</div>
							<InnerBlocks />
						</div>
					) : (
						<CP.Bem prefix="wp-block-catpow">
							<table {...blockProps}>
								{states.hasHeaderRow && (
									<thead>
										<tr>
											{rows[0].cells.map((cell, index) => {
												return (
													<th className={clsx("_th", { "is-spacer": index === 0 && states.hasHeaderColumn && cell.text.length === 0 })} key={index}>
														<RichText
															onChange={(text) => {
																cell.text = text;
																saveItems();
															}}
															value={cell.text}
														/>
													</th>
												);
											})}
										</tr>
									</thead>
								)}
								<tbody>
									{rows.map((row, index) => {
										if (states.hasHeaderRow && index == 0) {
											return false;
										}
										return (
											<tr key={index}>
												{row.cells.map((cell, columnIndex) => {
													var children = [
														<RichText
															onChange={(text) => {
																cell.text = text;
																saveItems();
															}}
															value={cell.text}
															key="text"
														/>,
													];
													if (isSelected && columnIndex == row.cells.length - 1) {
														children.push(
															<CP.ItemControl
																className="is-control-row"
																controls={{
																	up: () => downRow(index),
																	delete: () => deleteRow(index),
																	clone: () => addRow(index),
																	down: () => upRow(index),
																}}
															/>,
														);
													}
													if (isSelected && index == rows.length - 1) {
														children.push(
															<CP.ItemControl
																className="is-control-column"
																controls={{
																	left: () => downColumn(columnIndex),
																	delete: () => deleteColumn(columnIndex),
																	clone: () => addColumn(columnIndex),
																	right: () => upColumn(columnIndex),
																}}
															/>,
														);
													}
													return wp.element.createElement(states.hasHeaderColumn && columnIndex == 0 ? "th" : "td", { className: cell.classes, key: columnIndex }, children);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</CP.Bem>
					)}
				</>
				<InspectorControls>
					<CP.SelectClassPanel title="表示設定" icon="admin-appearance" set={setAttributes} attr={attributes} selectiveClasses={statesClasses} />
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes = "", rows = [], loopParam, doLoop } = attributes;

		var states = CP.classNamesToFlags(classes);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table {...useBlockProps.save({ className: classes })}>
						{states.hasHeaderRow && (
							<thead>
								<tr>
									{rows[0].cells.map((cell, index) => {
										return (
											<th className={clsx("_th", { "is-spacer": index === 0 && states.hasHeaderColumn && cell.text.length === 0 })} key={index}>
												<RichText.Content value={cell.text} />
											</th>
										);
									})}
								</tr>
							</thead>
						)}
						<tbody>
							{rows.map((row, index) => {
								if (states.hasHeaderRow && index == 0) {
									return false;
								}
								return (
									<tr key={index}>
										{row.cells.map((cell, columnIndex) => {
											return wp.element.createElement(states.hasHeaderColumn && columnIndex == 0 ? "th" : "td", { className: cell.classes, key: columnIndex }, <RichText.Content value={cell.text} />);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</CP.Bem>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
	deprecated: [
		{
			save({ attributes, className }) {
				const { classes = "", rows = [], loopParam } = attributes;

				var states = CP.classNamesToFlags(classes);

				return (
					<table className={classes}>
						{states.hasHeaderRow && (
							<thead>
								<tr>
									{rows[0].cells.map((cell, index) => {
										return (
											<th className={cell.classes}>
												<RichText.Content value={cell.text} />
											</th>
										);
									})}
								</tr>
							</thead>
						)}
						<tbody>
							{states.doLoop && "[loop_template " + (loopParam || "") + "]"}
							{rows.map((row, index) => {
								if (states.hasHeaderRow && index == 0) {
									return false;
								}
								return (
									<tr>
										{row.cells.map((cell, columnIndex) => {
											return wp.element.createElement(states.hasHeaderColumn && columnIndex == 0 ? "th" : "td", { className: cell.classes }, cell.text);
										})}
									</tr>
								);
							})}
							{states.doLoop && "[/loop_template]"}
						</tbody>
					</table>
				);
			},
			migrate(attributes) {
				var states = CP.classNamesToFlags(classes);
				attributes.content_path = attributes.loopParam.split(" ")[0];
				attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
				attributes.doLoop = states.doLoop;
				return attributes;
			},
		},
	],
});
