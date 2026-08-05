const { __ } = wp.i18n;

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
	description: __("画像とテキストを並べて表示します。", "catpow"),
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
		const { isTemplate, items = [], classes, vars, HeadingTag, countPrefix, countSuffix, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-showcase";
		var classArray = _.uniq((className + " " + classes).split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.showcase;

		const selectiveClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveClasses = [
				{
					name: "type",
					type: "buttons",
					label: __("タイプ", "catpow"),
					values: { isTypeFlat: __("フラット", "catpow"), isTypeCard: __("カード", "catpow"), isTypeFrame: __("フーレム", "catpow") },
				},
				{
					name: "counter",
					label: __("番号", "catpow"),
					values: "hasCounter",
					sub: [
						{
							name: "countPrefix",
							input: "text",
							label: __("番号前置テキスト", "catpow"),
							key: "countPrefix",
						},
						{
							name: "countSuffix",
							input: "text",
							label: __("番号後置テキスト", "catpow"),
							key: "countSuffix",
						},
					],
				},
				{
					name: "titleCaption",
					label: __("タイトルキャプション", "catpow"),
					values: "hasTitleCaption",
				},
				{ name: "link", label: __("リンク", "catpow"), values: "hasLink" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveItemClasses = ["color", { name: "image", input: "image", label: __("画像", "catpow"), keys: imageKeys.image }, "event"];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const selectiveItemTemplateClasses = useMemo(() => {
			const selectiveItemTemplateClasses = [
				{
					name: "imageCode",
					input: "text",
					label: __("画像コード", "catpow"),
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
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					{isTemplate ? (
						<CP.SelectClassPanel
							title={__("テンプレート", "catpow")}
							icon="edit"
							{...{ setAttributes, attributes }}
							itemKeys={["items", attributes.currentItemIndex]}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					) : (
						<CP.SelectClassPanel title={__("アイテム", "catpow")} icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
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
								{ type: "text", key: "imageCode", cond: isTemplate },
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
							isTemplate={isTemplate}
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
														isTemplate={isTemplate}
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
														<CP.Link.Edit className="_link" attributes={attributes} setAttributes={setAttributes} keys={linkKeys.link} itemKeys={["items", index]}>
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
		const { isTemplate, items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix, doLoop } = attributes;
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
									<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} itemKeys={["items", index]} isTemplate={isTemplate} />
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
										<CP.Link className="_link" attributes={attributes} keys={linkKeys.link} itemKeys={["items", index]}>
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
