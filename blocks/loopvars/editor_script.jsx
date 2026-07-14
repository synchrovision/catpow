wp.blocks.registerBlockType("catpow/loopvars", {
	title: "🐾 LoopVars",
	description: "ブロックの内容を変数のテーブルをループして表示します。各変数はブロック内で[var 変数名]のショートコードで利用できます。",
	icon: "editor-code",
	category: "catpow-functional",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody } = wp.components;
		const { items, columns, EditMode = false } = attributes;

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : "" });

		console.log({ items, columns });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit">vars</CP.Label>
						<CP.EditItemsTable setAttributes={setAttributes} attributes={attributes} itemKeys={["items"]} columns={columns} />
					</div>
				) : (
					<div {...blockProps}>
						<CP.Label icon="admin-generic">LoopVars</CP.Label>
						<InnerBlocks template={[["catpow/section", { title: "[var title]" }, [["core/paragraph", { content: "[var text]" }]]]]} />
					</div>
				)}
				<InspectorControls>
					<PanelBody title="変数">
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							itemKeys={["columns"]}
							columns={[
								{
									type: "select",
									key: "type",
									options: [
										{ label: "Text", value: "text" },
										{ label: "Number", value: "number" },
										{ label: "Color", value: "color" },
										{ label: "Date", value: "date" },
									],
								},
								{ type: "text", key: "key" },
							]}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		return <InnerBlocks.Content />;
	},
});
