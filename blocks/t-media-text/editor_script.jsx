const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-media-text", {
	title: "🐾 T-media-text",
	description: "HTMLメール用の画像・テキストのセットのブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-media-text has-vertical-align-top has-image-left" },
		src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
		alt: { source: "attribute", selector: "[src]", attribute: "alt" },
		imageCode: { source: "text", selector: "td.is-image-cell", default: wpinfo.theme_url + "/images/dummy.jpg" },
		width: { source: "attribute", selector: "td.is-image-cell", attribute: "width", default: "200" },
		gap: { source: "attribute", selector: "tr:has(td.is-image-cell) td.is-spacer-cell", attribute: "width", default: "20" },
		marginTop: { type: "number", default: 1 },
		marginBottom: { type: "number", default: 1 },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, BlockControls, InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, marginTop, marginBottom, src, alt, imageCode, width, gap } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"imagePosition",
				"verticalAlign",
				{ name: "range", input: "range", label: "画像の幅", key: "width", min: 50, max: 400, step: 10 },
				{ name: "range", input: "range", label: "間隔", key: "gap", min: 0, max: 100, step: 5 },
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 10 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 10 },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [{ name: "imageCode", label: "画像出力コード", input: "text", key: "imageCode" }],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.t-media-text.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table width="100%" className={classes}>
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }} colSpan="3"></td>
								</tr>
							)}
							{states.hasImageLeft ? (
								<tr>
									<td className="_td is-image-cell" width={width}>
										<CP.SelectResponsiveImage
											set={setAttributes}
											attr={attributes}
											keys={{ src: "src", alt: "alt", code: "imageCode" }}
											size="large"
											width="100%"
											height="auto"
											isTemplate={states.isTemplate}
										/>
									</td>
									<td className="_td is-spacer-cell" style={{ width: `${gap}px` }} width={gap}></td>
									<td className="_td is-text-cell">
										<InnerBlocks />
									</td>
								</tr>
							) : (
								<tr>
									<td className="_td is-text-cell">
										<InnerBlocks />
									</td>
									<td className="_td is-spacer-cell" style={{ width: `${gap}px` }} width={gap}></td>
									<td className="_td is-image-cell" width={width}>
										<CP.SelectResponsiveImage
											set={setAttributes}
											attr={attributes}
											keys={{ src: "src", alt: "alt", code: "imageCode" }}
											size="large"
											width="100%"
											height="auto"
											isTemplate={states.isTemplate}
										/>
									</td>
								</tr>
							)}
							{marginBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }} colSpan="3"></td>
								</tr>
							)}
						</tbody>
					</table>
				</CP.Bem>
				<BlockControls>
					<CP.ImagePositionClassToolbar set={setAttributes} attr={attributes} />
					<CP.VerticalAlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
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
		const { classes, marginTop, marginBottom, src, alt, imageCode, width, gap } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table width="100%" className={classes}>
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }} colSpan="3"></td>
							</tr>
						)}
						{states.hasImageLeft ? (
							<tr>
								<td className="_td is-image-cell" width={width}>
									<CP.ResponsiveImage attr={attributes} keys={{ src: "src", alt: "alt", code: "imageCode" }} size="large" width="100%" height="auto" isTemplate={states.isTemplate} />
								</td>
								<td className="_td is-spacer-cell" style={{ width: `${gap}px` }} width={gap}></td>
								<td className="_td is-text-cell">
									<InnerBlocks.Content />
								</td>
							</tr>
						) : (
							<tr>
								<td className="_td is-text-cell">
									<InnerBlocks.Content />
								</td>
								<td className="_td is-spacer-cell" style={{ width: `${gap}px` }} width={gap}></td>
								<td className="_td is-image-cell" width={width}>
									<CP.ResponsiveImage attr={attributes} keys={{ src: "src", alt: "alt", code: "imageCode" }} size="large" width="100%" height="auto" isTemplate={states.isTemplate} />
								</td>
							</tr>
						)}
						{marginBottom > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }} colSpan="3"></td>
							</tr>
						)}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
