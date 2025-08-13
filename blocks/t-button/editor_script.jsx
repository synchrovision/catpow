const blockClassName = "wp-block-catpow-t-button";

wp.blocks.registerBlockType("catpow/t-button", {
	title: "🐾 T-Button",
	description: "HTMLメール用のテーブルレイアウトのボタンです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-button is-size-medium" },
		title: { source: "html", selector: "a", default: "Title" },
		url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, title } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["color", "size", { name: "url", input: "text", label: "URL", key: "url" }];
			wp.hooks.applyFilters("catpow.blocks.t-button.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes} align="center" width="100%">
						<tbody>
							<tr>
								<td className="spacer_" colspan="3"></td>
							</tr>
							<tr>
								<td className="spacer_"></td>
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
								<td className="spacer_"></td>
							</tr>
							<tr>
								<td className="spacer_" colspan="3"></td>
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
		const { RichText } = wp.blockEditor;
		const { classes, title, url } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes} align="center" width="100%">
					<tbody>
						<tr>
							<td className="spacer_" colspan="3"></td>
						</tr>
						<tr>
							<td className="spacer_"></td>
							<td className="button_">
								<a className="_link" href={url}>
									<RichText.Content value={title} />
								</a>
							</td>
							<td className="spacer_"></td>
						</tr>
						<tr>
							<td className="spacer_" colspan="3"></td>
						</tr>
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
