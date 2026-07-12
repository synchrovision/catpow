CP.config.pricecard = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/pricecard", {
	title: "🐾 PriceCard",
	description: "サービス・商品情報の一覧ブロックです。",
	icon: "index-card",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { Fragment, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const {
			items = [],
			classes = "",
			headerClasses,
			contentsClasses = "",
			HeadingTag,
			SubHeadingTag,
			priceUnit,
			priceCaption,
			linkText,
			loopCount,
			doLoop,
			EditMode = false,
			AltMode = false,
		} = attributes;
		const { imageKeys } = CP.config.pricecard;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				{ name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: "副見出しタグ", classKey: "contentsClasses", cond: "hasSubTitle" },
				"level",
				{ name: "contentsLevel", preset: "level", label: "コンテンツレベル", classKey: "contentsClasses" },
				"hasContentWidth",
				"hasMargin",
				"itemSize",
				"color",
				{ name: "headerColorScheme", preset: "colorScheme", label: "ヘッダ配色", classKey: "headerClasses" },
				{ name: "contentsColorScheme", preset: "colorScheme", label: "コンテンツ配色", classKey: "contentsClasses" },
				{ input: "text", label: "価格単位", key: "priceUnit" },
				{
					type: "radio",
					label: "単位の位置",
					values: { hasUnitBefore: "前", hasUnitAfter: "後" },
				},
				{ label: "タイトル", values: "hasTitle" },
				{ label: "キャプション", values: "hasTitleCaption" },
				{
					label: "リンク",
					values: "hasLink",
					sub: [{ input: "text", label: "リンク文字列", key: "linkText" }],
				},
				{ label: "画像", values: "hasImage" },
				{ label: "サブタイトル", values: "hasSubTitle" },
				{ label: "テキスト", values: "hasText" },
				{ label: "スペック", values: "hasSpec" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const itemSelectiveClasses = useMemo(() => {
			const itemSelectiveClasses = [
				"color",
				{
					label: "タイプ",
					values: {
						isTypeNormal: "通常",
						isTypeRecommended: "おすすめ",
						isTypeDeprecated: "非推奨",
						isTypeCheap: "安価",
						isTypeExpensive: "高級",
					},
				},
				{ label: "値引き", values: "isDiscount" },
				{
					label: "画像コード",
					input: "text",
					key: "imageCode",
					cond: states.isTemplate,
				},
			];
			wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveItemClasses", CP.finderProxy(itemSelectiveClasses));
			return itemSelectiveClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="アイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={itemSelectiveClasses} />
					<CP.ItemControlInfoPanel />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
				{attributes.EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "text", key: "title", cond: states.hasTitle },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
								{ type: "image", keys: imageKeys.image, cond: states.hasImage },
								{
									type: "text",
									key: "imageCode",
									cond: states.hasImage && states.isTemplate,
								},
								{ type: "text", key: "subTitle", cond: states.hasSubTitle },
								{ type: "text", key: "text", cond: states.hasText },
								{ type: "text", key: "listPrice", cond: true },
								{ type: "text", key: "salePrice", cond: true },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
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
								<ul {...blockProps}>
									{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
										const index = i % items.length;
										const item = items[index];
										const itemStates = CP.classNamesToFlags(item.classes);
										return (
											<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
												{states.hasImage && (
													<div className="_image">
														<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" isTemplate={states.isTemplate} />
													</div>
												)}
												<header className={headerClasses}>
													<div className="_text">
														{states.hasTitle && (
															<RichText
																tagName={HeadingTag}
																className="_title"
																onChange={(text) => {
																	items[index].title = text;
																	save();
																}}
																value={item.title}
																placeholder="Title"
															/>
														)}
														{states.hasTitle && states.hasTitleCaption && (
															<RichText
																tagName="p"
																className="_caption"
																onChange={(text) => {
																	items[index].titleCaption = text;
																	save();
																}}
																value={item.titleCaption}
																placeholder="Caption"
															/>
														)}
														<div className="_price">
															{itemStates.isDiscount && (
																<span className="_listprice">
																	{states.hasUnitBefore && <span className="_unit">{priceUnit}</span>}
																	<RichText
																		tagName="span"
																		className="_number"
																		onChange={(listPrice) => {
																			items[index].listPrice = listPrice;
																			save();
																		}}
																		value={item.listPrice}
																		placeholder="0,000"
																	/>
																	{states.hasUnitAfter && <span className="_unit">{priceUnit}</span>}
																</span>
															)}
															<span className="_saleprice">
																{states.hasUnitBefore && <span className="_unit">{priceUnit}</span>}
																<RichText
																	tagName="span"
																	className="_number"
																	onChange={(salePrice) => {
																		items[index].salePrice = salePrice;
																		save();
																	}}
																	value={item.salePrice}
																	placeholder="0,000"
																/>
																{states.hasUnitAfter && <span className="_unit">{priceUnit}</span>}
															</span>
															<RichText
																tagName="span"
																className="_caption"
																onChange={(priceCaption) => {
																	setAttributes({ priceCaption });
																}}
																value={priceCaption}
																placeholder="Caption"
															/>
														</div>
													</div>
												</header>
												{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && (
													<div className={contentsClasses}>
														{states.hasSubTitle && (
															<RichText
																tagName={SubHeadingTag}
																className="_subtitle"
																onChange={(subTitle) => {
																	items[index].subTitle = subTitle;
																	save();
																}}
																value={item.subTitle}
																placeholder="SubTitle"
															/>
														)}
														{states.hasText && (
															<RichText
																tagName="p"
																className="_text"
																onChange={(text) => {
																	items[index].text = text;
																	save();
																}}
																value={item.text}
																placeholder="Text"
															/>
														)}
														{states.hasSpec && (
															<dl className="_spec">
																{item.specLabels.map((label, specIndex) => {
																	return (
																		<Fragment key={specIndex}>
																			<RichText
																				tagName="dt"
																				className="_label"
																				onChange={(text) => {
																					items[index].specLabels[specIndex].text = text;
																					save();
																				}}
																				value={items[index].specLabels[specIndex].text}
																			/>
																			<RichText
																				tagName="dd"
																				className="_value"
																				onChange={(text) => {
																					items[index].specValues[specIndex].text = text;
																					save();
																				}}
																				value={items[index].specValues[specIndex].text}
																			/>
																		</Fragment>
																	);
																})}
															</dl>
														)}
														{states.hasLink && (
															<CP.Link.Edit className="_link" set={setAttributes} attr={attributes} keys={{ href: "linkUrl", items: "items" }} index={index}>
																{linkText}
															</CP.Link.Edit>
														)}
													</div>
												)}
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
		const { Fragment } = wp.element;
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", headerClasses, contentsClasses = "", HeadingTag, SubHeadingTag, priceUnit, priceCaption, linkText, loopCount, doLoop } = attributes;
		const { imageKeys } = CP.config.pricecard;

		const states = CP.classNamesToFlags(classes);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps.save({ className: classes })}>
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<li className={item.classes} key={index}>
									{states.hasImage && (
										<div className="_image">
											<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} size="vga" isTemplate={states.isTemplate} />
										</div>
									)}
									<header className={headerClasses}>
										<div className="_text">
											{states.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={item.title} />}
											{states.hasTitle && states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
											<div className="_price">
												{itemStates.isDiscount && (
													<span className="_listprice">
														{states.hasUnitBefore && <span className="_unit">{priceUnit}</span>}
														<span className="_number">{item.listPrice}</span>
														{states.hasUnitAfter && <span className="_unit">{priceUnit}</span>}
													</span>
												)}
												<span className="_saleprice">
													{states.hasUnitBefore && <span className="_unit">{priceUnit}</span>}
													<span className="_number">{item.salePrice}</span>
													{states.hasUnitAfter && <span className="_unit">{priceUnit}</span>}
												</span>
												<RichText.Content tagName="span" className="_caption" value={priceCaption} />
											</div>
										</div>
									</header>
									{(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && (
										<div className={contentsClasses}>
											{states.hasSubTitle && <RichText.Content tagName={SubHeadingTag} className="_subtitle" value={item.subTitle} />}
											{states.hasText && <RichText.Content tagName="p" className="_text" value={item.text} />}
											{states.hasSpec && (
												<dl className="_spec">
													{item.specLabels.map((label, specIndex) => (
														<Fragment key={specIndex}>
															<RichText.Content tagName="dt" className="_label" value={items[index].specLabels[specIndex].text} />
															<RichText.Content tagName="dd" className="_value" value={items[index].specValues[specIndex].text} />
														</Fragment>
													))}
												</dl>
											)}
											{states.hasLink && (
												<CP.Link className="_link" attr={attributes} keys={{ href: "linkUrl", items: "items" }} index={index}>
													{linkText}
												</CP.Link>
											)}
										</div>
									)}
								</li>
							);
						})}
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
