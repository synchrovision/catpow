wp.blocks.registerBlockType("catpow/icons", {
	title: "🐾 Icons",
	description: "リンク付きのアイコン画像を並べて表示するブロックです。",
	icon: "image-filter",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-icons medium hasSubTitle hasText";
					return wp.blocks.createBlock("catpow/icons", attributes);
				},
			},
		],
	},
	attributes: {
		version: { type: "number", default: 0 },
		classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-icons" },
		items: {
			source: "query",
			selector: ".wp-block-catpow-icons__item",
			query: {
				classes: { source: "attribute", attribute: "class" },
				src: { source: "attribute", selector: "[src]", attribute: "src" },
				alt: { source: "attribute", selector: "[src]", attribute: "alt" },
				href: { source: "attribute", selector: "a", attribute: "href" },
			},
			default: [...Array(3)].map(() => {
				return {
					classes: "wp-block-catpow-icons__item",
					src: wpinfo.theme_url + "/images/dummy_icon.svg",
					alt: "dummy",
					href: wpinfo.home_url,
				};
			}),
		},
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { items = [], classes, EditMode = false } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"hasMargin",
				"color",
				"colorScheme",
				{ name: "size", type: "buttons", label: "サイズ", values: { isSizeSmall: "小", isSizeMedium: "中", isSizeLarge: "大" } },
				{ name: "filled", label: "塗り", values: "isFilled", sub: [{ name: "shape", type: "buttons", label: "形状", values: { isShapeCircle: "丸", isShapeSquare: "四角" } }] },
			];
			wp.hooks.applyFilters("catpow.blocks.icons.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				{ name: "image", input: "image", keys: { src: "src", alt: "alt", items: "items" }, size: "thumbnail" },
				{ name: "link", input: "text", key: "href", label: "リンク" },
				"color",
			];
			wp.hooks.applyFilters("catpow.blocks.icons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes });

		return (
			<>
				<BlockControls>
					<ToolbarGroup
						controls={[
							{
								icon: "edit",
								title: "EditMode",
								isActive: attributes.EditMode,
								onClick: () => setAttributes({ EditMode: !EditMode }),
							},
						]}
					/>
					<CP.AlignClassToolbar setAttributes={setAttributes} attributes={attributes} />
				</BlockControls>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="アイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{ type: "image", key: "src" },
								{ type: "text", key: "alt" },
								{ type: "text", key: "href" },
							]}
						/>
					</div>
				) : (
					<CP.Bem prefix="wp-block-catpow">
						<ul {...blockProps}>
							{items.map((item, index) => {
								if (!item.controlClasses) {
									item.controlClasses = "control";
								}
								return (
									<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
										<a className="_link">
											<img className="_icon" src={item.src} alt={item.alt} />
										</a>
									</CP.Item>
								);
							})}
						</ul>
					</CP.Bem>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { useBlockProps } = wp.blockEditor;
		const { items = [], classes } = attributes;

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul {...useBlockProps.save({ className: classes })}>
					{items.map((item, index) => (
						<li className={item.classes} key={index}>
							<a className="_link" href={item.href}>
								<img className="_icon" src={item.src} alt={item.alt} />
							</a>
						</li>
					))}
				</ul>
			</CP.Bem>
		);
	},
});
