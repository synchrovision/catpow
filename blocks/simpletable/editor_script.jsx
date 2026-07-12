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
			default: "wp-block-catpow-simpletable is-level3 is-type-spec",
		},
		vars: {
			type: "object",
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
					classes: "wp-block-catpow-simpletable__tbody-tr",
					cells: [
						{ text: ["Title"], classes: "" },
						{ text: ["Content"], classes: "" },
					],
				},
				{
					classes: "wp-block-catpow-simpletable__tbody-tr",
					cells: [
						{ text: ["Title"], classes: "" },
						{ text: ["Content"], classes: "" },
					],
				},
				{
					classes: "wp-block-catpow-simpletable__tbody-tr",
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
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { classes, vars, rows } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"hasContentWidth",
				"hasMargin",
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
									isNormal: "なし",
									isImportant: "重要",
									isCaution: "注意",
								},
							},
						],
						isTypeInputs: [
							{
								name: "type",
								label: "種別",
								type: "buttons",
								values: {
									isNormal: "なし",
									isRequired: "必須",
									isRecommended: "推奨",
									isOptional: "任意",
									isReadonly: "固定",
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
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="行" icon="edit" {...{ setAttributes, attributes }} itemKeys={["rows", attributes.currentItemIndex]} triggerClasses={selectiveClasses[3]} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<table {...useBlockProps({ className: classes, style: vars })}>
						<tbody>
							{rows.map((row, index) => {
								return (
									<CP.Item tag="tr" className={row.classes} {...{ setAttributes, attributes }} itemKeys={["rows", index]} key={index}>
										<RichText
											tagName="th"
											className="_th"
											onChange={(text) => {
												row.cells[0].text = text;
												saveItems();
											}}
											value={row.cells[0].text}
										/>
										<RichText
											tagName="td"
											className="_td"
											onChange={(text) => {
												row.cells[1].text = text;
												saveItems();
											}}
											value={row.cells[1].text}
										/>
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
		const { RichText, useBlockProps } = wp.blockEditor;
		const { classes, vars, rows } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table {...useBlockProps.save({ className: classes, style: vars })}>
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
