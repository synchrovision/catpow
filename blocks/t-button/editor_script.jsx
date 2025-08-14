const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-button", {
	title: "🐾 T-Button",
	description: "HTMLメール用のテーブルレイアウトのボタンです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-button is-size-medium has-font-weight-bold" },
		width: { source: "attribute", selector: "table", attribute: "width", default: "300" },
		align: { source: "attribute", selector: "table", attribute: "align", default: "center" },
		marginTop: { type: "number", default: 0.5 },
		marginBottom: { type: "number", default: 0.5 },
		title: { source: "html", selector: "a", default: "Title" },
		url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, width, align, marginTop, marginBottom, title } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "align", input: "buttons", label: __("配置", "catpow"), key: "align", options: ["left", "center", "right"] },
				"size",
				"fontWeight",
				{ name: "range", input: "range", label: __("幅", "catpow"), key: "width", min: 100, max: 600, step: 10 },
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 2, step: 0.25 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 2, step: 0.25 },
				{ name: "url", input: "text", label: "URL", key: "url" },
			];
			wp.hooks.applyFilters("catpow.blocks.t-button.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes} width={width} align={align}>
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }}></td>
								</tr>
							)}
							<tr>
								<td className="button_">
									<a className="_link">
										<RichText
											onChange={(title) => {
												setAttributes({ title });
											}}
											value={title}
										/>
									</a>
								</td>
							</tr>
							{marginBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginBottom}em` }}></td>
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
		const { classes, width, align, marginTop, marginBottom, title, url } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes} width={width} align={align}>
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }}></td>
							</tr>
						)}
						<tr>
							<td className="button_">
								<a className="_link" href={url}>
									<RichText.Content value={title} />
								</a>
							</td>
						</tr>
						{marginBottom > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginBottom}em` }}></td>
							</tr>
						)}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
