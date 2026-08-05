const { __ } = wp.i18n;

CP.config.pricecard = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/pricecard", {
	title: "🐾 PriceCard",
	description: __("サービス・商品情報の一覧ブロックです。", "catpow"),
	icon: "index-card",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { Fragment, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const {
			isTemplate,
			items = [],
			classes = "",
			vars,
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
				{ name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: __("副見出しタグ", "catpow"), classKey: "contentsClasses", cond: "hasSubTitle" },
				{ name: "contentsLevel", preset: "level", label: __("コンテンツレベル", "catpow"), classKey: "contentsClasses" },
				{ name: "headerColorScheme", preset: "colorScheme", label: __("ヘッダ配色", "catpow"), classKey: "headerClasses" },
				{ name: "contentsColorScheme", preset: "colorScheme", label: __("コンテンツ配色", "catpow"), classKey: "contentsClasses" },
				{ input: "text", label: __("価格単位", "catpow"), key: "priceUnit" },
				{
					type: "radio",
					label: __("単位の位置", "catpow"),
					values: { hasUnitBefore: __("前", "catpow"), hasUnitAfter: __("後", "catpow") },
				},
				{ label: __("タイトル", "catpow"), values: "hasTitle" },
				{ label: __("キャプション", "catpow"), values: "hasTitleCaption" },
				{
					label: __("リンク", "catpow"),
					values: "hasLink",
					sub: [{ input: "text", label: __("リンク文字列", "catpow"), key: "linkText" }],
				},
				{ label: __("画像", "catpow"), values: "hasImage" },
				{ label: __("サブタイトル", "catpow"), values: "hasSubTitle" },
				{ label: __("テキスト", "catpow"), values: "hasText" },
				{ label: __("スペック", "catpow"), values: "hasSpec" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const itemSelectiveClasses = useMemo(() => {
			const itemSelectiveClasses = [
				"color",
				{
					label: __("タイプ", "catpow"),
					values: {
						isTypeNormal: __("通常", "catpow"),
						isTypeRecommended: __("おすすめ", "catpow"),
						isTypeDeprecated: __("非推奨", "catpow"),
						isTypeCheap: __("安価", "catpow"),
						isTypeExpensive: __("高級", "catpow"),
					},
				},
				{ label: __("値引き", "catpow"), values: "isDiscount" },
				{
					label: __("画像コード", "catpow"),
					input: "text",
					key: "imageCode",
					cond: isTemplate,
				},
			];
			wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveItemClasses", CP.finderProxy(itemSelectiveClasses));
			return itemSelectiveClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title={__("アイテム", "catpow")} icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={itemSelectiveClasses} />
					<CP.ItemControlInfoPanel />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
				{attributes.EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
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
									cond: states.hasImage && isTemplate,
								},
								{ type: "text", key: "subTitle", cond: states.hasSubTitle },
								{ type: "text", key: "text", cond: states.hasText },
								{ type: "text", key: "listPrice", cond: true },
								{ type: "text", key: "salePrice", cond: true },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
							]}
							isTemplate={isTemplate}
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
														<CP.SelectResponsiveImage
															attributes={attributes}
															setAttributes={setAttributes}
															keys={imageKeys.image}
															itemKeys={["items", index]}
															size="vga"
															isTemplate={isTemplate}
														/>
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
															<CP.Link.Edit className="_link" setAttributes={setAttributes} attributes={attributes} keys={{ href: "linkUrl", items: "items" }} itemKeys={["items", index]}>
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
		const { isTemplate, items = [], classes = "", vars, headerClasses, contentsClasses = "", HeadingTag, SubHeadingTag, priceUnit, priceCaption, linkText, loopCount, doLoop } = attributes;
		const { imageKeys } = CP.config.pricecard;

		const states = CP.classNamesToFlags(classes);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps.save({ className: classes, style: vars })}>
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<li className={item.classes} key={index}>
									{states.hasImage && (
										<div className="_image">
											<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" isTemplate={isTemplate} />
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
												<CP.Link className="_link" attributes={attributes} keys={{ href: "linkUrl", items: "items" }} itemKeys={["items", index]}>
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
