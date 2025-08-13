const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-box", {
	title: "🐾 T-Box",
	description: "HTMLメール用のレイアウト調整用コンテナブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-box has-mail-content-width" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes } = attributes;
		const primaryClass = "wp-block-catpow-t-box";
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ label: __("メールコンテンツ幅", "catpow"), values: "hasMailContentWidth" },
				{ label: __("余白", "catpow"), values: "hasPadding" },
			];
			wp.hooks.applyFilters("catpow.blocks.t-box.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table width={states.hasMailContentWidth ? "600" : "100%"} align="center" className={classes}>
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
		const { classes } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table width={states.hasMailContentWidth ? "600" : "100%"} align="center" className={classes}>
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
