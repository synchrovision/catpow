import { clsx } from "clsx";

wp.blocks.registerBlockType("catpow/tabs", {
	attributes: {
		classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-tabs is-level3 is-type-panel is-style-flat" },
		HeadingTag: { type: "text", default: "h3" },
		vars: { type: "object", default: {} },
		items: {
			source: "query",
			selector: ".wp-block-catpow-tabs__tab-item",
			query: {
				title: { source: "html", selector: ".wp-block-catpow-tabs__tab-item-title" },
			},
			default: [...Array(3)].map((_, i) => {
				return { title: [`Tab ${i + 1}`] };
			}),
		},
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected, clientId }) {
		const { useMemo, useEffect } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { classes, HeadingTag, vars, items } = attributes;

		var currentIndex = attributes.currentIndex || 0;

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys, imageSizes } = CP.config.section;
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"colorScheme",
				"hasContentWidth",
				"hasMargin",
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: { isTypeLabel: "ラベル", isTypeBar: "バー", isTypePanel: "パネル" },
				},
				{
					name: "style",
					type: "buttons",
					label: "スタイル",
					values: { isStyleTable: "テーブル", isStyleFlat: "フラット" },
				},
			];
			wp.hooks.applyFilters("catpow.blocks.tabs.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		useEffect(() => {
			const editor = wp.data.dispatch("core/block-editor");
			const blocks = wp.data.select("core/block-editor").getBlock(clientId).innerBlocks;
			blocks.forEach((block, index) => {
				if (block.attributes.index !== index) {
					editor.updateBlockAttributes(block.clientId, { index });
				}
			});
		}, [items.length]);

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" initialOpen={true} icon="admin-generic" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: classes, style: { ...vars, "--current-index": currentIndex, "--length": items.length } })} data-current-index={currentIndex}>
						<ul className="_tab">
							{items.map((item, index) => {
								return (
									<CP.Item
										tag="li"
										className={clsx("_item", currentIndex == index ? "is-active" : currentIndex > index ? "is-before" : "is-after")}
										set={setAttributes}
										attr={attributes}
										items={items}
										index={index}
										isSelected={isSelected}
										style={{ "--index": index }}
										key={index}
									>
										<RichText
											tagName={HeadingTag}
											className="_title"
											onClick={() => {
												setAttributes({ currentIndex: index });
											}}
											onChange={(title) => {
												item.title = title;
												setAttributes({ items: [...items] });
											}}
											value={item.title}
										/>
									</CP.Item>
								);
							})}
						</ul>
						<div className="_contents">
							<InnerBlocks template={items.map((item, i) => ["catpow/tabscontent", { index: i }])} templateLock="all" />
						</div>
					</div>
				</CP.Bem>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes, HeadingTag, vars, items } = attributes;

		const blockProps = useBlockProps.save({
			className: classes,
			style: { ...vars, "--current-index": 0, "--length": items.length },
			"data-wp-interactive": "catpow/tabs",
			"data-wp-context": JSON.stringify({
				currentIndex: 0,
				currentTabId: "{$uid}-0",
				length: items.length,
			}),
			"data-wp-init": "callbacks.initBlock",
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<ul className="_tab" role="tablist">
						{items.map((item, index) => {
							return (
								<li
									id={`{$uid}-tab-${index}`}
									className="_item"
									data-wp-class--is-active="callbacks.isActiveTab"
									aria-controls={`{$uid}-${index}`}
									data-wp-bind--aria-selected="callbacks.isActiveTab"
									data-wp-on--click="actions.onClickTab"
									style={{ "--index": index }}
									data-index={index}
									role="tab"
									key={index}
								>
									<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
								</li>
							);
						})}
					</ul>
					<div className="_contents">
						<InnerBlocks.Content />
					</div>
				</div>
			</CP.Bem>
		);
	},
});

wp.blocks.registerBlockType("catpow/tabscontent", {
	apiVersion: 3,
	title: "🐾 TabsContent",
	icon: "editor-code",
	category: "catpow",
	parent: ["catpow/tabs"],
	attributes: {
		index: { type: "number" },
	},
	edit({ attributes, className, setAttributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { index } = attributes;
		return (
			<div
				{...useBlockProps({
					className: "wp-block-catpow-tabs__contents-content",
					style: { "--index": index },
					role: "tabpanel",
				})}
			>
				<InnerBlocks template={[["catpow/section", { title: `Tab Panel ${index + 1}` }]]} templateLock={false} />
			</div>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const { index } = attributes;
		return (
			<div
				{...useBlockProps.save({
					id: `{$uid}-${index}`,
					className: "wp-block-catpow-tabs__contents-content",
					"data-wp-class--is-active": "callbacks.isActivePanel",
					"data-wp-bind--aria-hidden": "!callbacks.isActivePanel",
					"data-wp-bind--inert": "!callbacks.isActivePanel",
					style: { "--index": index },
					"data-index": { index },
					role: "tabpanel",
					"aria-labelledby": `{$uid}-tab-${index}`,
				})}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});
