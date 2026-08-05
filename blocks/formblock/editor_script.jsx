const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/formblock", {
	apiVersion: 3,
	title: "🐾 FormBlock",
	description: __("テーマに定義された編集可能なフォームを表示します。", "catpow"),
	icon: "editor-code",
	category: "catpow-embed",
	example: CP.example,
	edit({ attributes, setAttributes, className, isSelected, clientId }) {
		const { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TreeSelect, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { content_path, inputs, data_id, values, actions, EditMode = false } = attributes;

		if (!actions && content_path) {
			const path = content_path.slice(0, content_path.lastIndexOf("/"));
			wp.apiFetch({ path: "cp/v1/" + path + "/actions" }).then((actions) => {
				Object.keys(actions).map((key) => (actions[key].json = "action"));
				setAttributes({ actions });
			});
		}

		return (
			<>
				<BlockControls>
					<ToolbarGroup
						controls={[
							{
								icon: "edit",
								title: "EditMode",
								isActive: EditMode,
								onClick: () => setAttributes({ EditMode: !EditMode }),
							},
						]}
					/>
				</BlockControls>
				<div {...useBlockProps({ className: "formBlock cp-embeddedcontent" + (EditMode ? " editMode" : "") })}>
					<CP.Label icon="feedback">{content_path || "not selected"}</CP.Label>
					<InnerBlocks allowedBlocks={["catpow/formblockcontent"]} />
				</div>
				<InspectorControls>
					<PanelBody title={__("フォーム", "catpow")}>
						<TreeSelect
							label="path"
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.formblock || {})}
							onChange={(content_path) => {
								const path = content_path.slice(0, content_path.lastIndexOf("/"));
								wp.apiFetch({ path: "cp/v1/" + path + "/template" }).then((template) => {
									wp.data.dispatch("core/block-editor").replaceInnerBlocks(clientId, CP.createBlocks(template));
								});
								setAttributes({ content_path, actions: null });
							}}
						/>
					</PanelBody>
					<PanelBody title={__("入力値", "catpow")} initialOpen={false}>
						<TextControl
							label={__("入力名", "catpow")}
							value={inputs}
							onChange={(inputs) => {
								setAttributes({ inputs });
							}}
						/>
						<TextControl
							label={__("データID", "catpow")}
							value={data_id}
							onChange={(data_id) => {
								setAttributes({ data_id });
							}}
						/>
						<TextareaControl
							label={__("初期値", "catpow")}
							value={values}
							onChange={(values) => {
								setAttributes({ values });
							}}
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

wp.blocks.registerBlockType("catpow/formblockcontent", {
	apiVersion: 3,
	title: "🐾 FormBlockContent",
	icon: "editor-code",
	category: "catpow",
	parent: ["catpow/formblock"],
	attributes: {
		name: {
			type: "attribute",
			label: __("名前", "catpow"),
			selector: "form-block-content",
			attribute: "name",
			default: "edit",
		},
		action: {
			type: "attribute",
			label: __("アクション", "catpow"),
			selector: "form-block-content",
			attribute: "action",
			default: "{}",
		},
	},
	edit({ attributes, className, setAttributes, clientId }) {
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextControl } = wp.components;
		const { name } = attributes;

		const parentClientId = wp.data.select("core/block-editor").getBlockParentsByBlockName(clientId, "catpow/formblock")[0];
		const parentBlock = wp.data.select("core/block-editor").getBlock(parentClientId);
		const actions = parentBlock.attributes.actions;

		return (
			<>
				<div {...useBlockProps({ className: "formBlockContent cp-embeddedcontent" })}>
					<div className="label">{name}</div>
					<InnerBlocks template={[["catpow/section"]]} templateLock={false} />
				</div>
				<InspectorControls>
					<PanelBody title={__("設定", "catpow")} initialOpen={true}>
						<TextControl
							label={__("名前", "catpow")}
							value={name}
							onChange={(name) => {
								setAttributes({ name });
							}}
						/>
					</PanelBody>
					{actions && <CP.SelectClassPanel title={__("アクション", "catpow")} icon="edit" {...{ setAttributes, attributes }} selectiveClasses={actions} initialOpen={true} />}
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { name, action } = attributes;
		return (
			<>
				<form-block-content name={name} action={action}>
					<InnerBlocks.Content />
				</form-block-content>
			</>
		);
	},
});
