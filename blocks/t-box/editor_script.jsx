const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-box", {
	title: "🐾 T-Box",
	description: "HTMLメール用のレイアウト調整用コンテナブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-box has-mail-content-width" },
		width: { source: "attribute", selector: "table", attribute: "width", default: "600" },
		padding: { source: "attribute", selector: "table", attribute: "cellpadding", default: "0" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, width, padding } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "range", input: "range", label: __("幅", "catpow"), key: "width", min: 400, max: 800, step: 10 },
				{ name: "range", input: "range", label: __("余白", "catpow"), key: "padding", min: 0, max: 100, step: 5 },
			];
			wp.hooks.applyFilters("catpow.blocks.t-box.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table width={width} cellPadding={padding} style={{ width: `${width}px`, padding: `${padding}px` }} align="center" className={classes}>
						<tbody>
							<tr>
								<td>
									<InnerBlocks />
								</td>
							</tr>
						</tbody>
					</table>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { classes, width, padding } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table width={width} cellPadding={padding} style={{ width: `${width}px`, padding: `${padding}px` }} align="center" className={classes}>
					<tbody>
						<tr>
							<td>
								<InnerBlocks.Content />
							</td>
						</tr>
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
