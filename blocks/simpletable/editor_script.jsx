const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/simpletable", {
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
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { classes, vars, rows } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					type: "gridbuttons",
					label: __("タイプ", "catpow"),
					filter: "type",
					values: { isTypeSpec: "Spec", isTypeInfo: "Information", isTypeHistory: "History", isTypeInputs: "Inputs" },
					item: {
						isTypeSpec: [
							{
								name: "type",
								type: "buttons",
								label: __("種別", "catpow"),
								values: {
									isNormal: __("なし", "catpow"),
									isImportant: __("重要", "catpow"),
									isCaution: __("注意", "catpow"),
								},
							},
						],
						isTypeInputs: [
							{
								name: "type",
								label: __("種別", "catpow"),
								type: "buttons",
								values: {
									isNormal: __("なし", "catpow"),
									isRequired: __("必須", "catpow"),
									isRecommended: __("推奨", "catpow"),
									isOptional: __("任意", "catpow"),
									isReadonly: __("固定", "catpow"),
								},
							},
							"cond",
						],
					},
				},
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
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title={__("行", "catpow")} icon="edit" {...{ setAttributes, attributes }} itemKeys={["rows", attributes.currentItemIndex]} triggerClasses={selectiveClasses[0]} />
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
