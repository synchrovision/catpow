wp.blocks.registerBlockType("catpow/t-paragraph", {
	title: "🐾 T-Paragraph",
	description: "HTMLメール用の段落ブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: (attributes) => {
					return wp.blocks.createBlock("catpow/t-paragraph", {
						classes: "wp-block-catpow-t-paragraph left medium",
						text: attributes.content,
					});
				},
			},
			{
				type: "block",
				blocks: ["catpow/t-heading"],
				transform: (attributes) => {
					return wp.blocks.createBlock("catpow/t-paragraph", {
						classes: "wp-block-catpow-t-paragraph left medium",
						text: attributes.title,
					});
				},
			},
		],
	},
	merge(attributes, attributesToMerge) {
		return {
			text: (attributes.text || "") + (attributesToMerge.text || ""),
		};
	},
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-paragraph medium" },
		marginTop: { type: "number", default: 0 },
		marginBottom: { type: "number", default: 0.5 },
		text: { source: "html", selector: ".is-text-cell", default: "text" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, marginTop, marginBottom, text } = attributes;
		const primaryClass = "wp-block-catpow-t-paragraph";
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"textAlign",
				"fontSize",
				"fontWeight",
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 2, step: 0.25 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 2, step: 0.25 },
			];
			wp.hooks.applyFilters("catpow.blocks.t-paragraph.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table width="100%" className={classes}>
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }}></td>
								</tr>
							)}
							<tr>
								<td className="_td is-text-cell">
									<RichText
										identifier="content"
										onMerge={mergeBlocks}
										onSplit={(val) => {
											if (!val) {
												return wp.blocks.createBlock("catpow/t-paragraph", {
													classes: "wp-block-catpow-t-paragraph left medium",
												});
											}
											return wp.blocks.createBlock("catpow/t-paragraph", {
												...attributes,
												text: val,
											});
										}}
										onReplace={onReplace}
										onRemove={() => onReplace([])}
										onChange={(text) => {
											setAttributes({ text });
										}}
										value={text}
									/>
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
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
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
		const { RichText } = wp.blockEditor;
		const { classes, marginTop, marginBottom, text } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table width="100%" className={classes}>
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}em` }}></td>
							</tr>
						)}
						<tr>
							<td className="_td is-text-cell">
								<RichText.Content value={text} />
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
