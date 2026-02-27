const { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
const { Icon, PanelBody, TreeSelect, TextareaControl, ToolbarGroup } = wp.components;

wp.blocks.registerBlockType("catpow/loop", {
	title: "🐾 Loop",
	description: "テーマに定義されたテンプレートで投稿を表示します。",
	icon: "editor-code",
	category: "catpow-embed",
	example: CP.example,
	edit({ attributes, setAttributes, className, clientId }) {
		const { serverSideRender: ServerSideRender } = wp;
		const { content_path, deps = {}, query, config, EditMode = false } = attributes;
		const { useMemo, useEffect } = wp.element;

		const itemMap = useMemo(() => {
			const map = {};
			Object.keys(cpEmbeddablesTree.loop).map((label) => {
				cpEmbeddablesTree.loop[label].children.map((item) => {
					map[item.id] = item;
				});
			});
			return map;
		}, []);
		const item = useMemo(() => content_path && itemMap[content_path], [itemMap, content_path]);

		useEffect(() => {
			if (content_path && itemMap[content_path].has_config) {
				const path = content_path.slice(0, content_path.lastIndexOf("/"));
				wp.apiFetch({ path: "/cp/v1/" + path + "/config" })
					.then((config) => {
						if (config.slots != null) {
							config.template = Object.keys(config.slots).map((name) => ["catpow/loopcontent", { name }, config.slots[name]]);
						}
						console.log({ config });
						setAttributes({ config });
					})
					.catch((res) => {
						setAttributes({ props: {}, config: null });
					});
			} else {
				setAttributes({ props: {}, config: null });
			}
		}, [content_path]);

		const blockProps = useBlockProps({ className: config?.template && EditMode ? "cp-altcontent loop-contents" : "" });

		return (
			<>
				{config?.template && (
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
				)}
				{config?.template && EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<InnerBlocks allowedBlocks={["catpow/loopcontent"]} template={config.template} templateLock={"ALL"} />
					</div>
				) : (
					<div {...blockProps}>
						<CP.Label>{content_path}</CP.Label>
						<ServerSideRender block="catpow/loop" attributes={attributes} httpMethod="POST" />
					</div>
				)}
				{item?.deps?.css && <link rel="stylesheet" href={item.deps.css} />}
				{item?.deps?.js && <script type="text/javascript" src={item.deps.js}></script>}
				<InspectorControls>
					<PanelBody title="Query">
						<TreeSelect
							label="content path"
							selectedId={content_path}
							tree={Object.values(cpEmbeddablesTree.loop)}
							onChange={(content_path) => {
								const path = content_path.slice(0, content_path.lastIndexOf("/"));
								const { has_template } = itemMap[content_path];
								if (has_template) {
									wp.apiFetch({ path: "/cp/v1/" + path + "/template" }).then((template) => {
										wp.data.dispatch("core/block-editor").replaceInnerBlocks(clientId, CP.createBlocks(template));
									});
								}
								setAttributes({ content_path, config: null });
							}}
						/>
						{content_path && content_path.slice(-8) === "loop.php" && (
							<TextareaControl
								label="query"
								value={query}
								onChange={(query) => {
									setAttributes({ query: query });
								}}
							/>
						)}
					</PanelBody>
					{config?.schema && (
						<Catpow.JsonEditor
							json={attributes.props}
							debug={false}
							schema={config.schema}
							autoSave={100}
							showHeader={false}
							onChange={(props) => {
								setAttributes({ props: { ...props } });
							}}
						/>
					)}
				</InspectorControls>
			</>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},

	deprecated: [
		{
			save() {
				return "null";
			},
		},
	],
});

wp.blocks.registerBlockType("catpow/loopcontent", {
	apiVersion: 3,
	title: "🐾 LoopContent",
	icon: "editor-code",
	category: "catpow",
	parent: ["catpow/loop"],
	attributes: {
		name: {
			type: "attribute",
			label: "名前",
			selector: "loop-content",
			attribute: "name",
			default: "content",
		},
	},
	edit({ attributes }) {
		const { name } = attributes;

		const template = name == "on_empty" ? [["core/paragraph", { align: "center", content: "Not Found" }]] : [["catpow/section"]];

		return (
			<div className={"loop-content"}>
				<InnerBlocks template={template} templateLock={false} />
			</div>
		);
	},
	save({ attributes }) {
		const { name } = attributes;
		return (
			<>
				<loop-content name={name}>
					<InnerBlocks.Content />
				</loop-content>
			</>
		);
	},
});
