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
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-heading header medium center" },
		title: { source: "html", selector: "tbody td", default: "Title" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, title } = attributes;
		const primaryClass = "wp-block-catpow-t-heading";
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["headingType", "textAlign", "fontSize", "fontWeight"];
			wp.hooks.applyFilters("catpow.blocks.t-heading.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table width="100%" className={classes}>
						<tbody>
							<tr>
								<td>
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
						</tbody>
					</table>
				</CP.Bem>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
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
		const { classes, title } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table width="100%" className={classes}>
					<tbody>
						<tr>
							<td>
								<RichText.Content value={title} />
							</td>
						</tr>
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
