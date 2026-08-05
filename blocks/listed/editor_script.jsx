import { clsx } from "clsx";

CP.config.listed = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
		headerImage: {
			src: "headerImageSrc",
			alt: "headerImageAlt",
			code: "headerImageCode",
			items: "items",
		},
		subImage: {
			src: "subImageSrc",
			alt: "subImageAlt",
			code: "subImageCode",
			items: "items",
		},
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/listed", {
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText";
					return wp.blocks.createBlock("catpow/listed", attributes);
				},
			},
			{
				type: "block",
				blocks: ["catpow/datatable"],
				isMatch: ({ rows }) => {
					const block = wp.data.select("core/blocks").getBlockType("catpow/listed");
					return CP.isRowsConvertibleToItems(rows, block.attributes.items);
				},
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText";
					const block = wp.data.select("core/blocks").getBlockType("catpow/listed");
					attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
					return wp.blocks.createBlock("catpow/listed", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const {
			isTemplate,
			vars,
			items = [],
			HeadingTag,
			classes = "",
			commonItemClasses = "",
			countPrefix,
			countSuffix,
			subCountPrefix,
			subCountSuffix,
			loopCount,
			doLoop,
			EditMode = false,
			AltMode = false,
		} = attributes;
		var classArray = _.uniq((className + " " + classes).split(" "));

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					label: "タイプ",
					filter: "type",
					type: "gridbuttons",
					values: {
						isTypeOrderd: "連番リスト",
						isTypeNews: "お知らせ",
						isTypeIndex: "目次",
						isTypeMenu: "メニュー",
					},
					sub: {
						isTypeOrderd: [
							{ name: "image", label: "画像", values: "hasImage" },
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
							{
								name: "titleCaption",
								label: "タイトルキャプション",
								values: "hasTitleCaption",
							},
							{
								name: "subTitle",
								label: "サブタイトル",
								values: "hasSubTitle",
							},
							{ name: "link", label: "リンク", values: "hasLink" },
						],
						isTypeNews: [{ name: "link", label: "リンク", values: "hasLink" }],
						isTypeIndex: ["itemSize"],
						isTypeMenu: [
							"itemSize",
							"colorScheme",
							{
								preset: "backgroundImage",
								classKey: "commonItemClasses",
							},
							{
								name: "image",
								type: "buttons",
								label: "画像",
								values: {
									noImage: "なし",
									hasImage: "大",
									hasHeaderImage: "小",
								},
							},
							{
								name: "titleCaption",
								label: "タイトルキャプション",
								values: "hasTitleCaption",
							},
							{ name: "text", label: "テキスト", values: "hasText" },
							{ name: "link", label: "リンク", values: "hasLink" },
						],
					},
					bind: {
						isTypeOrderd: ["hasHeader", "hasCounter", "hasTitle", "hasText"],
						isTypeNews: ["hasText", "hasSubTitle"],
						isTypeIndex: ["hasHeader", "hasTitle", "hasText"],
						isTypeMenu: ["hasHeader", "hasTitle"],
					},
				},
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.listed.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemTemplateClasses = useMemo(() => {
			const selectiveItemTemplateClasses = [
				"color",
				{
					name: "imageCode",
					input: "text",
					label: "画像コード",
					key: "imageCode",
					cond: "hasImage",
				},
				{
					name: "headerImageCode",
					input: "text",
					label: "ヘッダ画像コード",
					key: "headerImageCode",
					cond: "hasHeaderImage",
				},
				{
					name: "subImageCode",
					input: "text",
					label: "サブ画像コード",
					key: "subImageCode",
					cond: "hasSubImage",
				},
			];
			wp.hooks.applyFilters("catpow.blocks.listed.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const { imageKeys, linkKeys } = CP.config.listed;

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="スタイル" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="リストアイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={["color"]} />
					{states.hasLink && <CP.SelectClassPanel title="イベント" icon="flag" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={["event"]} />}
					{isTemplate && (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							{...{ setAttributes, attributes }}
							itemKeys={["items", attributes.currentItemIndex]}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					)}
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{
									type: "image",
									label: "image",
									keys: imageKeys.image,
									cond: states.hasImage,
								},
								{
									type: "text",
									key: "imageCode",
									cond: isTemplate && states.hasImage,
								},
								{
									type: "image",
									label: "sub",
									keys: imageKeys.subImage,
									cond: states.hasSubImage,
								},
								{
									type: "text",
									key: "subImageCode",
									cond: isTemplate && states.hasSubImage,
								},
								{
									type: "image",
									label: "header",
									keys: imageKeys.headerImage,
									cond: states.hasHeaderImage,
								},
								{
									type: "text",
									key: "headerImageCode",
									cond: isTemplate && states.hasHeaderImage,
								},
								{ type: "text", key: "title", cond: states.hasTitle },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
								{ type: "text", key: "subTitle", cond: states.hasSubTitle },
								{ type: "text", key: "text", cond: states.hasText },
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
								<CP.Label icon="welcome-comments" />
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
											<CP.Item tag="li" className={clsx("_item", item.classes, commonItemClasses)} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={i}>
												{states.hasImage && (
													<div className="_image">
														<CP.SelectResponsiveImage attributes={attributes} setAttributes={setAttributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" isTemplate={isTemplate} />
													</div>
												)}
												{states.hasHeader && (
													<header className="_header">
														{states.hasCounter && (
															<div className="_counter">
																{countPrefix && <span className="_prefix">{countPrefix}</span>}
																<span className="_number">{index + 1}</span>
																{countSuffix && <span className="_suffix">{countSuffix}</span>}
															</div>
														)}
														{states.hasHeaderImage && (
															<div className="_image">
																<CP.SelectResponsiveImage
																	attributes={attributes}
																	setAttributes={setAttributes}
																	keys={imageKeys.headerImage}
																	itemKeys={["items", index]}
																	size="thumbnail"
																	isTemplate={isTemplate}
																/>
															</div>
														)}
														<div className="_text">
															{states.hasTitle && (
																<RichText
																	tagName={HeadingTag}
																	className="_title"
																	onChange={(title) => {
																		item.title = title;
																		save();
																	}}
																	value={item.title}
																/>
															)}
															{states.hasTitle && states.hasTitleCaption && (
																<RichText
																	tagName="p"
																	className="_caption"
																	onChange={(titleCaption) => {
																		item.titleCaption = titleCaption;
																		save();
																	}}
																	value={item.titleCaption}
																/>
															)}
														</div>
													</header>
												)}
												{(states.hasSubImage || states.hasSubTitle || states.hasText) && (
													<div className="_contents">
														{states.hasSubCounter && (
															<div className="_subcounter">
																{subCountPrefix && <span className="_prefix">{subCountPrefix}</span>}
																<span className="_number">{index + 1}</span>
																{subCountSuffix && <span className="_suffix">{subCountSuffix}</span>}
															</div>
														)}
														{states.hasSubImage && (
															<div className="_image">
																<CP.SelectResponsiveImage
																	attributes={attributes}
																	setAttributes={setAttributes}
																	keys={imageKeys.subImage}
																	itemKeys={["items", index]}
																	size="medium"
																	isTemplate={isTemplate}
																/>
															</div>
														)}
														{states.hasSubTitle && (
															<RichText
																tagName="p"
																className="_subtitle"
																onChange={(subTitle) => {
																	item.subTitle = subTitle;
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
																	item.text = text;
																	save();
																}}
																value={item.text}
															/>
														)}
														{states.hasLink && (
															<CP.Link.Edit className="_link" attributes={attributes} setAttributes={setAttributes} keys={linkKeys.link} itemKeys={["items", index]}>
																<RichText
																	onChange={(linkText) => {
																		item.linkText = linkText;
																		save();
																	}}
																	value={item.linkText}
																/>
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
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { isTemplate, vars, items = [], HeadingTag, classes = "", commonItemClasses, countPrefix, countSuffix, subCountPrefix, subCountSuffix, doLoop } = attributes;
		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.listed;

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps.save({ className: classes, style: vars })}>
						{items.map((item, index) => (
							<li className={clsx("_item", item.classes, commonItemClasses)} data-class={item.classes} key={index}>
								{states.hasImage && (
									<div className="_image">
										<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} itemKeys={["items", index]} isTemplate={isTemplate} />
									</div>
								)}
								{states.hasHeader && (
									<header className="_header">
										{states.hasCounter && (
											<div className="_counter">
												{countPrefix && <span className="_prefix">{countPrefix}</span>}
												<span className="_number">{index + 1}</span>
												{countSuffix && <span className="_suffix">{countSuffix}</span>}
											</div>
										)}
										{states.hasHeaderImage && (
											<div className="_image">
												<CP.ResponsiveImage attributes={attributes} keys={imageKeys.headerImage} itemKeys={["items", index]} isTemplate={isTemplate} />
											</div>
										)}
										<div className="_text">
											{states.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={item.title} />}
											{states.hasTitle && states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
										</div>
									</header>
								)}
								{(states.hasSubImage || states.hasSubTitle || states.hasText) && (
									<div className="_contents">
										{states.hasSubCounter && (
											<div className="_subcounter">
												{subCountPrefix && <span className="_prefix">{subCountPrefix}</span>}
												<span className="_number">{index + 1}</span>
												{subCountSuffix && <span className="_suffix">{subCountSuffix}</span>}
											</div>
										)}
										{states.hasSubImage && (
											<div className="_image">
												<CP.ResponsiveImage attributes={attributes} keys={imageKeys.subImage} itemKeys={["items", index]} isTemplate={isTemplate} />
											</div>
										)}
										{states.hasSubTitle && <RichText.Content tagName="p" className="_subtitle" value={item.subTitle} />}
										{states.hasText && <RichText.Content tagName="p" className="_text" value={item.text} />}
										{states.hasLink && (
											<CP.Link className="_link" attributes={attributes} keys={linkKeys.link} itemKeys={["items", index]} {...CP.extractEventDispatcherAttributes("catpow/listed", item)}>
												<RichText.Content value={item.linkText} />
											</CP.Link>
										)}
									</div>
								)}
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
