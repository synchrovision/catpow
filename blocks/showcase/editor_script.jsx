const blockConfig = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};
CP.config.showcase = blockConfig;

wp.blocks.registerBlockType("catpow/showcase", {
	title: "🐾 showcase",
	description: "画像とテキストを並べて表示します。",
	icon: "columns",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-showcase has-counter";
					return wp.blocks.createBlock("catpow/showcase", attributes);
				},
			},
			{
				type: "block",
				blocks: ["catpow/datatable"],
				isMatch: ({ rows }) => {
					const block = wp.data.select("core/blocks").getBlockType("catpow/showcase");
					return CP.isRowsConvertibleToItems(rows, block.attributes.items);
				},
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-showcase has-counter";
					const block = wp.data.select("core/blocks").getBlockType("catpow/showcase");
					attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
					return wp.blocks.createBlock("catpow/showcase", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { items = [], classes, vars, HeadingTag, countPrefix, countSuffix, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-showcase";
		var classArray = _.uniq((className + " " + classes).split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.showcase;

		const selectiveClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"colorScheme",
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: { isTypeFlat: "フラット", isTypeCard: "カード", isTypeFrame: "フーレム" },
				},
				{
					name: "counter",
					label: "番号",
					values: "hasCounter",
					sub: [
						{
							name: "countPrefix",
							input: "text",
							label: "番号前置テキスト",
							key: "countPrefix",
						},
						{
							name: "countSuffix",
							input: "text",
							label: "番号後置テキスト",
							key: "countSuffix",
						},
					],
				},
				{
					name: "titleCaption",
					label: "タイトルキャプション",
					values: "hasTitleCaption",
				},
				"hasMargin",
				"hasPadding",
				"hasContentWidth",
				{ name: "link", label: "リンク", values: "hasLink" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveItemClasses = ["color", { name: "image", input: "image", label: "画像", keys: imageKeys.image }, "event"];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const selectiveItemTemplateClasses = useMemo(() => {
			const selectiveItemTemplateClasses = [
				{
					name: "imageCode",
					input: "text",
					label: "画像コード",
					key: "imageCode",
				},
			];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });

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
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					{states.isTemplate ? (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							{...{ setAttributes, attributes }}
							itemKeys={["items", attributes.currentItemIndex]}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					) : (
						<CP.SelectClassPanel title="アイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div className="cp-altcontent">
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{ type: "image", label: "image", keys: imageKeys.image },
								{ type: "text", key: "imageCode", cond: states.isTemplate },
								{ type: "text", key: "title" },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
								{ type: "text", key: "text" },
								{ type: "text", key: "linkText", cond: states.hasLink },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<div className="label">
									<Icon icon="welcome-comments" />
								</div>
								<InnerBlocks />
							</div>
						) : (
							<CP.Bem prefix="wp-block-catpow">
								<ul {...blockProps}>
									{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
										const index = i % items.length;
										const item = items[index];
										if (!item.controlClasses) {
											item.controlClasses = "control";
										}
										return (
											<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
												<div className="_image">
													<CP.SelectResponsiveImage
														attributes={attributes}
														setAttributes={setAttributes}
														keys={imageKeys.image}
														itemKeys={["items", index]}
														size="full"
														isTemplate={states.isTemplate}
													/>
												</div>
												<div className="_texts">
													{states.hasCounter && (
														<div className="_counter">
															{countPrefix && <span className="_prefix">{countPrefix}</span>}
															<span className="_number">{index + 1}</span>
															{countSuffix && <span className="_suffix">{countSuffix}</span>}
														</div>
													)}
													<RichText
														tagName={HeadingTag}
														className="_title"
														onChange={(text) => {
															items[index].title = text;
															save();
														}}
														value={item.title}
													/>
													{states.hasTitleCaption && (
														<RichText
															tagName="p"
															className="_caption"
															onChange={(text) => {
																items[index].titleCaption = text;
																save();
															}}
															value={item.titleCaption}
														/>
													)}
													<div
														className="_text"
														onFocus={() => {
															attributes.blockState.enableBlockFormat = true;
														}}
													>
														<RichText
															onChange={(text) => {
																items[index].text = text;
																save();
															}}
															value={item.text}
														/>
													</div>
													{states.hasLink && (
														<CP.Link.Edit className="_link" attributes={attributes} setAttributes={setAttributes} keys={linkKeys.link} index={index}>
															<RichText
																onChange={(linkText) => {
																	items[index].linkText = linkText;
																	save();
																}}
																value={item.linkText}
															/>
														</CP.Link.Edit>
													)}
												</div>
											</CP.Item>
										);
									})}
								</ul>
							</CP.Bem>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.showcase;

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps.save({ className: classes, style: vars })}>
						{items.map((item, index) => (
							<li className={item.classes} key={index}>
								<div className="_image">
									<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} itemKeys={["items", index]} isTemplate={states.isTemplate} />
								</div>
								<div className="_texts">
									{states.hasCounter && (
										<div className="_counter">
											{countPrefix && <span className="_prefix">{countPrefix}</span>}
											<span className="_number">{index + 1}</span>
											{countSuffix && <span className="_suffix">{countSuffix}</span>}
										</div>
									)}
									<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
									{states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
									<div className="_text">
										<RichText.Content value={item.text} />
									</div>
									{states.hasLink && (
										<CP.Link className="_link" attributes={attributes} keys={linkKeys.link} index={index}>
											<RichText.Content value={item.linkText} />
										</CP.Link>
									)}
								</div>
							</li>
						))}
					</ul>
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
