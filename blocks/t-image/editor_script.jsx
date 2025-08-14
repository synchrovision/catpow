const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-image", {
	title: "🐾 T-Image",
	description: "HTMLメール用の画像ブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-image" },
		src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
		alt: { source: "attribute", selector: "[src]", attribute: "alt" },
		loopImage: { source: "text", selector: "td", default: "[output image]" },
		width: { source: "attribute", selector: "table", attribute: "width", default: "100%" },
		marginTop: { type: "number", default: 0 },
		marginBottom: { type: "number", default: 0 },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, width, align, marginTop, marginBottom, src, alt, loopImage } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "align", input: "buttons", label: __("配置", "catpow"), key: "align", options: ["left", "center", "right"] },
				{ name: "range", input: "range", label: __("幅", "catpow"), key: "width", min: 10, max: 100, step: 5, unit: "%" },
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 10 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 10 },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [{ name: "loopImage", label: "画像出力コード", input: "text", key: "loopImage" }],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.t-image.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes} width={width} align={align}>
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }}></td>
								</tr>
							)}
							<tr>
								<td>
									{states.isTemplate ? (
										<img src={wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + loopImage} width="100%" height="auto" />
									) : (
										<CP.SelectResponsiveImage className="_img" set={setAttributes} attr={attributes} keys={{ src: "src", alt: "alt" }} size="large" width="100%" height="auto" />
									)}
								</td>
							</tr>
							{marginBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }}></td>
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
		const { classes, width, align, marginTop, marginBottom, src, alt, loopImage } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes} width={width} align={align}>
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }}></td>
							</tr>
						)}
						<tr>
							<td>{states.isTemplate ? loopImage : <img width="100%" height="auto" src={src} alt={alt} />}</td>
						</tr>
						{marginBottom > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }}></td>
							</tr>
						)}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
