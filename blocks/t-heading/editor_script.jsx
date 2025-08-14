wp.blocks.registerBlockType("catpow/t-heading", {
	title: "🐾 T-Heading",
	description: "HTMLメール用の見出しブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/paragraph"],
				transform: (attributes) => {
					return wp.blocks.createBlock("catpow/t-heading", {
						classes: "wp-block-catpow-t-heading header center medium",
						text: attributes.content,
					});
				},
			},
			{
				type: "block",
				blocks: ["catpow/t-paragraph"],
				transform: (attributes) => {
					return wp.blocks.createBlock("catpow/t-heading", {
						classes: "wp-block-catpow-t-heading header center medium",
						title: attributes.text,
					});
				},
			},
		],
	},
	merge(attributes, attributesToMerge) {
		return {
			title: (attributes.title || "") + (attributesToMerge.title || ""),
		};
	},
	attributes: {
		classes: {
			source: "attribute",
			selector: "table",
			attribute: "class",
			default: "wp-block-catpow-t-heading has-text-align-left has-font-weight-medium has-font-size-middle has-heading-type-headline",
		},
		marginTop: { type: "number", default: 1 },
		marginBottom: { type: "number", default: 0.5 },
		title: { source: "html", selector: ".is-text-cell", default: "Title" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, marginTop, marginBottom, title } = attributes;
		const primaryClass = "wp-block-catpow-t-heading";
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingType",
				"textAlign",
				"fontSize",
				"fontWeight",
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 2, step: 0.25 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 2, step: 0.25 },
			];
			wp.hooks.applyFilters("catpow.blocks.t-heading.selectiveClasses", CP.finderProxy(selectiveClasses));
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
										multiline={false}
										onSplit={(val) => {
											if (!val) {
												return wp.blocks.createBlock("catpow/t-paragraph", {
													classes: "wp-block-catpow-t-paragraph has-text-align-left has-font-size-medium",
												});
											}
											return wp.blocks.createBlock("catpow/t-heading", {
												...attributes,
												title: val,
											});
										}}
										onReplace={onReplace}
										onRemove={() => onReplace([])}
										onChange={(title) => {
											setAttributes({ title });
										}}
										value={title}
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
		const { classes, marginTop, marginBottom, title } = attributes;
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
								<RichText.Content value={title} />
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
