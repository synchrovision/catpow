const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-list", {
	title: "🐾 T-List",
	description: "HTMLメール用のリストです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-list has-font-weight-regular is-ordered has-font-size-middle has-marker-color-main" },
		marginTop: { type: "number", default: 0.5 },
		marginBetween: { type: "number", default: 0.5 },
		marginBottom: { type: "number", default: 0.5 },
		markerSize: { type: "string", default: "1em" },
		markerWidth: { type: "string", default: "1.5em" },
		markerMargin: { type: "string", default: "0.1em" },
		markerClasses: { source: "attribute", selector: ".wp-block-catpow-t-list__item-marker", attribute: "class", default: "wp-block-catpow-t-list__item-marker has-font-weight-regular" },
		markerIndexSize: { type: "string", default: "1em" },
		markerIndexPad: { type: "number", default: 1 },
		markerAlign: { source: "attribute", selector: ".wp-block-catpow-t-list__item-marker", attribute: "align", default: "left" },
		prefix: { source: "html", selector: ".wp-block-catpow-t-list__item-marker-prefix", default: "●" },
		sufix: { source: "html", selector: ".wp-block-catpow-t-list__item-marker-suffix", default: "" },
		items: {
			source: "query",
			selector: ".wp-block-catpow-t-list__item",
			query: {
				text: { source: "html", selector: ".wp-block-catpow-t-list__item-text" },
			},
			default: [
				{
					text: "Item 1",
				},
				{
					text: "Item 2",
				},
				{
					text: "Item 3",
				},
			],
		},
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, marginTop, marginBottom, marginBetween, markerSize, markerWidth, markerAlign, markerMargin, markerClasses, markerIndexSize, markerIndexPad, prefix, suffix, items } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"fontSize",
				"fontWeight",
				{ name: "marginTop", input: "range", label: "上間隔", key: "marginTop", min: 0, max: 4, step: 0.25 },
				{ name: "marginBetween", input: "range", label: "間隔", key: "marginBetween", min: 0, max: 4, step: 0.25 },
				{ name: "marginBottom", input: "range", label: "下間隔", key: "marginBottom", min: 0, max: 4, step: 0.25 },
				{
					name: "isOrdered",
					label: __("番号付きリスト", "catpow"),
					values: "isOrdered",
					sub: [
						{ name: "markerIndexSize", input: "range", label: __("番号サイズ", "catpow"), key: "markerIndexSize", min: 1, max: 3, step: 0.1, unit: "em" },
						{ name: "markerIndexPad", input: "range", label: __("番号の桁数", "catpow"), key: "markerIndexPad", min: 1, max: 4 },
					],
				},
				{
					name: "markerColor",
					type: "buttons",
					label: "マーカー色",
					values: {
						hasMarkerColorText: __("文字", "catpow"),
						hasMarkerColorMain: __("基本", "catpow"),
						hasMarkerColorAccent: __("強調", "catpow"),
						hasMarkerColorHighlight: __("強調文字", "catpow"),
					},
				},
				{ name: "markerWeigth", preset: "fontWeight", label: "マーカー太さ", classKey: "markerClasses" },
				{ name: "markerSize", input: "range", label: "マーカーサイズ", key: "markerSize", min: 1, max: 4, step: 0.1, unit: "em" },
				{ name: "markerWidth", input: "range", label: "マーカー幅", key: "markerWidth", min: 1, max: 8, step: 0.25, unit: "em" },
				{ name: "markerMargin", input: "range", label: "マーカー間隔", key: "markerMargin", min: 0.1, max: 2, step: 0.1, unit: "em" },
				{ name: "markerAlign", input: "buttons", label: "マーカー位置", key: "markerAlign", options: ["left", "center", "right"] },
			];
			wp.hooks.applyFilters("catpow.blocks.t-list.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes} width="100%" align="center">
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }} colspan="3"></td>
								</tr>
							)}
							{items.map((item, index) => (
								<>
									{index > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${marginBetween}em` }} colspan="3"></td>
										</tr>
									)}
									<tr className="item_">
										<td className={markerClasses} width={markerWidth} align={markerAlign} style={{ width: markerWidth, textAlign: markerAlign, fontSize: markerSize }}>
											<RichText
												className="_prefix"
												tagName="span"
												onChange={(prefix) => {
													setAttributes({ prefix });
												}}
												value={prefix}
											/>
											{states.isOrdered && (
												<>
													<span className="_index" style={{ fontSize: markerIndexSize }}>
														{markerIndexPad > 1 ? (index + 1).toString().padStart(markerIndexPad, "0") : index + 1}
													</span>
													<RichText
														className="_suffix"
														tagName="span"
														onChange={(suffix) => {
															setAttributes({ suffix });
														}}
														value={suffix}
													/>
												</>
											)}
										</td>
										<td className="_spacer" width={markerMargin} style={{ width: markerMargin }}></td>
										<RichText
											className="_text"
											tagName="td"
											onChange={(text) => {
												items[index].text = text;
												setAttributes({ items: JSON.parse(JSON.stringify(items)) });
											}}
											value={item.text}
										/>
									</tr>
								</>
							))}
							{marginBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginBottom}em` }} colspan="3"></td>
								</tr>
							)}
						</tbody>
					</table>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { RichText } = wp.blockEditor;
		const { classes, marginTop, marginBottom, marginBetween, markerSize, markerWidth, markerAlign, markerMargin, markerClasses, markerIndexSize, markerIndexPad, prefix, suffix, items } = attributes;
		var states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes} width="100%" align="center">
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }} colspan="3"></td>
							</tr>
						)}
						{items.map((item, index) => (
							<>
								{index > 0 && (
									<tr>
										<td className="_td is-spacer-cell" style={{ height: `${marginBetween}em` }} colspan="3"></td>
									</tr>
								)}
								<tr className="item_">
									<td className={markerClasses} width={markerWidth} align={markerAlign} style={{ width: markerWidth, textAlign: markerAlign, fontSize: markerSize }}>
										<RichText.Content className="_prefix" tagName="span" value={prefix} />
										{states.isOrdered && (
											<>
												<span className="_index" style={{ fontSize: markerIndexSize }}>
													{markerIndexPad > 1 ? (index + 1).toString().padStart(markerIndexPad, "0") : index + 1}
												</span>
												<RichText.Content className="_suffix" tagName="span" value={suffix} />
											</>
										)}
									</td>
									<td className="_spacer" width={markerMargin} style={{ width: markerMargin }}></td>
									<RichText.Content className="_text" tagName="td" value={item.text} />
								</tr>
							</>
						))}
						{marginBottom > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginBottom}em` }} colspan="3"></td>
							</tr>
						)}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
