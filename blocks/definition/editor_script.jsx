const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/definition", {
	title: "🐾 Definition",
	description: "定義リストのブロックです",
	icon: "editor-ul",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-definition";
					return wp.blocks.createBlock("catpow/definition", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;

		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				{
					name: "type",
					label: __("タイプ", "catpow"),
					type: "gridbuttons",
					values: { isTypeIndex: "index", isTypeSpec: "spec", isTypeInfo: "info" },
					required: true,
				},
				"hasContentWidth",
				"hasMargin",
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.definition.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "text", key: "title", cond: states.hasTitle },
								{ type: "text", key: "text", cond: states.hasText },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<CP.Label icon="welcome-comments" />
								<InnerBlocks />
							</div>
						) : (
							<CP.Bem prefix="wp-block-catpow">
								<div {...blockProps}>
									{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
										const index = i % items.length;
										const item = items[index];
										if (!item.controlClasses) {
											item.controlClasses = "control";
										}
										return (
											<CP.Item tag="dl" className="_item" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
												<RichText
													tagName="dt"
													className="_title"
													onChange={(title) => {
														item.title = title;
														save();
													}}
													value={item.title}
												/>
												<RichText
													tagName="dd"
													className="_text"
													onChange={(text) => {
														item.text = text;
														save();
													}}
													value={item.text}
												/>
											</CP.Item>
										);
									})}
								</div>
							</CP.Bem>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", loopCount, doLoop } = attributes;

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps.save({ className: classes })}>
						{items.map((item, index) => (
							<dl className="_item" key={index}>
								<RichText.Content tagName="dt" className="_title" value={item.title} />
								<RichText.Content tagName="dd" className="_text" value={item.text} />
							</dl>
						))}
					</div>
				</CP.Bem>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
});
