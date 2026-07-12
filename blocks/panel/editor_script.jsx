CP.config.panel = {
	imageKeys: {
		icon: { src: "iconSrc", alt: "iconAlt", items: "items" },
		image: { src: "src", alt: "alt", items: "items" },
	},
};
wp.blocks.registerBlockType("catpow/panel", {
	title: "🐾 Panel",
	description: "大小の矩形パネルをレイアウトします。",
	icon: "grid-view",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { classes, HeadingTag, vars, items = [] } = attributes;
		const primaryClass = "wp-block-catpow-panel";

		const { imageKeys } = CP.config.panel;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				"level",
				"hasContentWidth",
				"hasMargin",
				{
					name: "type",
					label: "タイプ",
					type: "buttons",
					values: { isTypeTile: "タイル", isTypeMenu: "メニュー" },
					item: {
						isTypeTile: [
							"color",
							"colorScheme",
							{ name: "icon", label: "アイコン", values: "hasIcon", sub: [{ input: "icon" }] },
							{ name: "title", label: "タイトル", values: "hasTitle" },
							{ name: "text", label: "文章", values: "hasText" },
							{
								name: "image",
								label: "画像",
								values: "hasImage",
								sub: [
									{ name: "paleImage", label: "画像を薄く", values: "paleImage" },
									{ name: "image", label: "画像", input: "image", keys: imageKeys.image, size: "vga" },
								],
							},
							{ name: "link", label: "リンク", values: "hasLink", sub: [{ name: "external", label: "外部リンク", values: "linkExternal" }] },
							{ name: "rowSpan", type: "buttons", label: "縦サイズ", values: { hasRspan1: "1", hasRspan2: "2", hasRspan3: "3" } },
							{ name: "colSpan", type: "buttons", label: "横サイズ", values: { hasCspan1: "1", hasCspan2: "2", hasCspan3: "3" } },
						],
						isTypeMenu: [
							"color",
							{ name: "icon", label: "アイコン", values: "hasIcon", sub: [{ input: "icon" }] },
							{ name: "title", label: "タイトル", values: "hasTitle" },
							{ name: "text", label: "文章", values: "hasText" },
							{ name: "image", label: "画像", values: "hasImage", sub: [{ name: "image", label: "画像", input: "image", keys: imageKeys.image, size: "vga" }] },
							{ name: "link", label: "リンク", values: "hasLink", sub: [{ name: "external", label: "外部リンク", values: "linkExternal" }] },
							{ name: "rowSpan", type: "buttons", label: "縦サイズ", values: { hasRspan1: "1", hasRspan2: "2", hasRspan3: "3" } },
							{ name: "colSpan", type: "buttons", label: "横サイズ", values: { hasCspan1: "1", hasCspan2: "2", hasCspan3: "3" } },
						],
					},
				},
				{
					name: "size",
					label: "グリッドサイズ",
					type: "buttons",
					values: {
						hasGridSize1: "1",
						hasGridSize2: "2",
						hasGridSize3: "3",
						hasGridSize4: "4",
					},
				},
				{
					label: "カラム約数（2^n）",
					type: "buttons",
					values: {
						hasGrid2n: "2",
						hasGrid4n: "4",
						hasGrid8n: "8",
						hasGrid16n: "16",
						hasGrid32n: "32",
					},
				},
				{
					label: "カラム約数（3^n）",
					type: "buttons",
					values: {
						hasGrid3n: "3",
						hasGrid9n: "9",
						hasGrid27n: "27",
					},
				},
				{
					label: "カラム約数（5^n）",
					type: "buttons",
					values: {
						hasGrid5n: "5",
						hasGrid25n: "25",
					},
				},
			];
			wp.hooks.applyFilters("catpow.blocks.panel.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const totalGrid = items.reduce((total, item) => {
			const itemStates = CP.classNamesToFlags(item.classes);
			const rowSpan = itemStates.hasRspan2 ? 2 : itemStates.hasRspan3 ? 3 : 1;
			const colSpan = itemStates.hasCspan2 ? 2 : itemStates.hasCspan3 ? 3 : 1;
			return total + rowSpan * colSpan;
		}, 0);
		const expectedGrid = useMemo(() => classes.match(/\bhas-grid\d+n\b/g)?.reduce((p, c) => p * parseInt(c.match(/\d+/)), 1) || 1, [classes]);

		return (
			<>
				<BlockControls>
					<ToolbarGroup
						controls={[
							{
								icon: "edit",
								title: "EditMode",
								isActive: attributes.EditMode,
								onClick: () => setAttributes({ EditMode: !attributes.EditMode }),
							},
						]}
					/>
				</BlockControls>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: attributes.EditMode ? primaryClass + " edit" : classes })}>
						<ul className="_items">
							{items.map((item, index) => {
								const itemStates = CP.classNamesToFlags(item.classes);

								return (
									<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
										{itemStates.hasImage && (
											<div className="_image">
												<CP.SelectResponsiveImage className="_img" attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" />
											</div>
										)}
										<div className="_texts">
											{itemStates.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
											{itemStates.hasTitle && (
												<RichText
													tagName={HeadingTag}
													className="_title"
													onChange={(title) => {
														items[index].title = title;
														setAttributes({ items: [...items] });
													}}
													value={item.title}
												/>
											)}
											{itemStates.hasText && (
												<RichText
													tagName="p"
													className="_text"
													placeholder="Text"
													onChange={(text) => {
														items[index].text = text;
														setAttributes({ items: [...items] });
													}}
													value={item.text}
												/>
											)}
											{itemStates.hasLink && (
												<div className="_link">
													<TextControl
														onChange={(linkUrl) => {
															items[index].linkUrl = linkUrl;
															setAttributes({ items: [...items] });
														}}
														value={item.linkUrl}
													/>
												</div>
											)}
										</div>
									</CP.Item>
								);
							})}
						</ul>
					</div>
				</CP.Bem>
				<InspectorControls>
					<PanelBody title="info" icon="admin-generic" initialOpen={true}>
						<p>合計グリッド数：{totalGrid}</p>
						<p>期待グリッド数：{expectedGrid}</p>
					</PanelBody>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="パネル" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} triggerClasses={selectiveClasses[4]} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className }) {
		const { RichText } = wp.blockEditor;
		const { classes, HeadingTag = "h3", vars, items = [] } = attributes;

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div className={classes} style={vars}>
					<ul className="_items">
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<li className={item.classes} key={index}>
									{itemStates.hasImage && (
										<div className="_image">
											<img className="_img" src={item.src} alt={item.alt} />
										</div>
									)}
									<div className="_texts">
										{itemStates.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
										{itemStates.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={item.title} />}
										{itemStates.hasText && <RichText.Content tagName="p" className="_text" value={item.text} />}
										{itemStates.hasLink && (
											<div className="_link">
												<a href={item.linkUrl} target={itemStates.linkExternal ? "_brank" : false} rel={itemStates.linkExternal ? "noopener noreferrer" : "bookmark"}>
													{" "}
												</a>
											</div>
										)}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</CP.Bem>
		);
	},
});
