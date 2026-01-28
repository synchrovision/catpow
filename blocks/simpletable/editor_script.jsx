wp.blocks.registerBlockType("catpow/simpletable", {
	title: "🐾 SimpleTable",
	description: "見出しと本文の２列で構成されるシンプルなテーブルです。",
	icon: "editor-table",
	category: "catpow",

	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.tableConvertibles,
				isMatch: function (attributes) {
					return attributes.rows[0].cells.length === 2;
				},
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-simpletable spec";
					return wp.blocks.createBlock("catpow/simpletable", attributes);
				},
			},
		],
	},
	attributes: {
		classes: {
			source: "attribute",
			selector: "table",
			attribute: "class",
			default: "wp-block-catpow-simpletable spec",
		},
		rows: {
			source: "query",
			selector: "table tr",
			query: {
				classes: { source: "attribute", attribute: "class" },
				cond: { source: "attribute", attribute: "data-refine-cond" },
				cells: {
					source: "query",
					selector: "th,td",
					query: {
						text: { source: "html" },
						classes: { source: "attribute", attribute: "class" },
						style: { source: "attribute", attribute: "style" },
					},
				},
			},
			default: [
				{
					classes: "",
					cells: [
						{ text: ["Title"], classes: "" },
						{ text: ["Content"], classes: "" },
					],
				},
				{
					classes: "",
					cells: [
						{ text: ["Title"], classes: "" },
						{ text: ["Content"], classes: "" },
					],
				},
				{
					classes: "",
					cells: [
						{ text: ["Title"], classes: "" },
						{ text: ["Content"], classes: "" },
					],
				},
			],
		},
		blockState: { type: "object", default: { enableBlockFormat: true } },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls, RichText } = wp.blockEditor;
		const { classes, rows } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				{
					name: "type",
					type: "gridbuttons",
					label: "タイプ",
					filter: "type",
					values: { isTypeSpec: "Spec", isTypeInfo: "Information", isTypeHistory: "History", isTypeInputs: "Inputs" },
					item: {
						isTypeSpec: [
							{
								name: "type",
								type: "buttons",
								label: "種別",
								values: {
									normal: "なし",
									important: "重要",
									caution: "注意",
								},
							},
						],
						isTypeInputs: [
							{
								name: "type",
								label: "種別",
								type: "buttons",
								values: {
									normal: "なし",
									required: "必須",
									recommended: "推奨",
									optional: "任意",
									readonly: "固定",
								},
							},
							"cond",
						],
					},
				},
				"color",
			];
			wp.hooks.applyFilters("catpow.blocks.simpletable.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
		};
		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="行" icon="edit" set={setAttributes} attr={attributes} items={rows} index={attributes.currentItemIndex} triggerClasses={selectiveClasses[1]} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes}>
						<tbody>
							{rows.map((row, index) => {
								return (
									<CP.Item tag="tr" set={setAttributes} attr={attributes} items={rows} itemskey="rows" index={index} isSelected={isSelected} key={index}>
										<th>
											<RichText
												onChange={(text) => {
													row.cells[0].text = text;
													saveItems();
												}}
												value={row.cells[0].text}
											/>
										</th>
										<td>
											<RichText
												onChange={(text) => {
													row.cells[1].text = text;
													saveItems();
												}}
												value={row.cells[1].text}
											/>
										</td>
									</CP.Item>
								);
							})}
						</tbody>
					</table>
				</CP.Bem>
			</>
		);
	},

	save({ attributes, className }) {
		const { RichText } = wp.blockEditor;
		const { classes, rows } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes}>
					<tbody>
						{rows.map((row, index) => {
							return (
								<tr className={row.classes} data-refine-cond={row.cond} key={index}>
									<th className={row.cells[0].classes}>
										<RichText.Content value={row.cells[0].text} />
									</th>
									<td className={row.cells[1].classes}>
										<RichText.Content value={row.cells[1].text} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
