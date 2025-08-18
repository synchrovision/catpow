const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-box", {
	title: "🐾 T-Box",
	description: "HTMLメール用のレイアウト調整用コンテナブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: ".wp-block-catpow-t-box", attribute: "class", default: "wp-block-catpow-t-box has-mail-content-width" },
		width: { source: "attribute", selector: "table", attribute: "width", default: "600" },
		paddingTop: { type: "number", default: 1 },
		paddingInline: { type: "number", default: 1 },
		paddingBottom: { type: "number", default: 1 },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, width, paddingTop, paddingInline, paddingBottom } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"colorScheme",
				{ name: "body", type: "buttons", label: "背景色", values: { hasBgNone: "なし", hasBgNormal: "通常", hasBgStrong: "強調", hasBgAchromatic: "白黒" } },
				{ name: "range", input: "range", label: __("幅", "catpow"), key: "width", min: 400, max: 800, step: 10 },
				{ name: "range", input: "range", label: __("上余白", "catpow"), key: "paddingTop", min: 0, max: 10 },
				{ name: "range", input: "range", label: __("横余白", "catpow"), key: "paddingInline", min: 0, max: 10 },
				{ name: "range", input: "range", label: __("下余白", "catpow"), key: "paddingBottom", min: 0, max: 10 },
			];
			wp.hooks.applyFilters("catpow.blocks.t-box.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div className={classes}>
						<table width={width} cstyle={{ width: `${width}px` }} align="center">
							<tbody>
								{paddingTop > 0 && (
									<tr>
										<td className="_td is-spacer-cell" style={{ height: `${paddingTop}rem` }} colspan={paddingInline > 0 ? 3 : null}></td>
									</tr>
								)}
								<tr>
									{paddingInline > 0 && <td className="_td is-spacer-cell" style={{ width: `${paddingInline}rem` }} width={`${paddingInline}rem`}></td>}
									<td>
										<InnerBlocks />
									</td>
									{paddingInline > 0 && <td className="_td is-spacer-cell" style={{ width: `${paddingInline}rem` }} width={`${paddingInline}rem`}></td>}
								</tr>
								{paddingBottom > 0 && (
									<tr>
										<td className="_td is-spacer-cell" style={{ height: `${paddingBottom}rem` }} colspan={paddingInline > 0 ? 3 : null}></td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
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
		const { InnerBlocks } = wp.blockEditor;
		const { classes, width, paddingTop, paddingInline, paddingBottom } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div className={classes}>
					<table width={width} style={{ width: `${width}px` }} align="center">
						<tbody>
							{paddingTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${paddingTop}rem` }} colspan={paddingInline > 0 ? 3 : null}></td>
								</tr>
							)}
							<tr>
								{paddingInline > 0 && <td className="_td is-spacer-cell" style={{ width: `${paddingInline}rem` }} width={`${paddingInline}rem`}></td>}
								<td>
									<InnerBlocks.Content />
								</td>
								{paddingInline > 0 && <td className="_td is-spacer-cell" style={{ width: `${paddingInline}rem` }} width={`${paddingInline}rem`}></td>}
							</tr>
							{paddingBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${paddingBottom}rem` }} colspan={paddingInline > 0 ? 3 : null}></td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</CP.Bem>
		);
	},
});
