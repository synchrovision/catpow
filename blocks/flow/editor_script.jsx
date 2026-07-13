CP.config.flow = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" },
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/flow", {
	title: "🐾 Flow",
	description: "手順や順番の一覧ブロックです。",
	icon: "editor-ol",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-flow is-size-medium has-counter is-level3";
					if (!attributes.countPrefix) {
						attributes.countPrefix = "Step.";
					}
					return wp.blocks.createBlock("catpow/flow", attributes);
				},
			},
		],
	},
	attributes: {
		version: { type: "number", default: 0 },
		classes: {
			source: "attribute",
			selector: "ul",
			attribute: "class",
			default: "wp-block-catpow-flow is-type-flat has-counter",
		},
		vars: { type: "object", default: {} },
		HeadingTag: { type: "string", default: "h3" },
		SubHeadingTag: { type: "string", default: "h4" },
		items: {
			source: "query",
			selector: ".wp-block-catpow-flow__item",
			query: {
				classes: { source: "attribute", attribute: "class" },
				title: { source: "html", selector: ".wp-block-catpow-flow__item-texts-header-text-title" },
				titleCaption: { source: "html", selector: " .wp-block-catpow-flow__item-texts-header-text-caption" },
				src: {
					source: "attribute",
					selector: ".wp-block-catpow-flow__item-image [src]",
					attribute: "src",
				},
				alt: {
					source: "attribute",
					selector: ".wp-block-catpow-flow__item-image [src]",
					attribute: "alt",
				},
				subTitle: { source: "html", selector: ".wp-block-catpow-flow__item-texts-contents-subtitle" },
				text: { source: "html", selector: ".wp-block-catpow-flow__item-texts-contents-text" },
				linkUrl: {
					source: "attribute",
					selector: ".wp-block-catpow-flow__item-link",
					attribute: "href",
				},
			},
			default: [...Array(3)].map(() => {
				return {
					classes: "wp-block-catpow-flow__item",
					title: ["Title"],
					titleCaption: ["Caption"],
					subTitle: ["SubTitle"],
					src: wpinfo.theme_url + "/images/dummy.jpg",
					alt: "dummy",
					text: ["Text"],
					linkUrl: wpinfo.home_url,
				};
			}),
		},
		countPrefix: { source: "text", selector: ".wp-block-catpow-flow__item-texts-header-counter-prefix", default: "" },
		countSuffix: { source: "text", selector: ".wp-block-catpow-flow__item-texts-header-counter-suffix", default: "" },
		contentsClasses: { source: "attribute", selector: ".wp-block-catpow-flow__item-texts-contents", attribute: "class", default: "wp-block-catpow-flow__item-texts-contents is-level4" },
	},
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { HeadingTag, SubHeadingTag, items = [], classes, vars, contentsClasses, countPrefix, countSuffix, EditMode } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.flow;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: { isTypeFlat: "フラット", isTypeCard: "カード", isTypeTimeline: "タイムライン" },
				},
				"hasContentWidth",
				"hasMargin",
				{ preset: "itemSize", cond: (states) => states.isTypeFlat || states.isTypeTimeline },
				"headingTag",
				{ name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: "副見出しタグ", classKey: "contentsClasses", cond: "hasSubTitle" },
				"level",
				{ name: "contentsLevel", preset: "level", label: "コンテンツレベル", classKey: "contentsClasses" },
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
				{ name: "image", label: "画像", values: "hasImage" },
				{
					name: "titleCaption",
					label: "タイトルキャプション",
					values: "hasTitleCaption",
				},
				{ name: "subTitle", label: "サブタイトル", values: "hasSubTitle" },
				{ name: "link", label: "リンク", values: "hasLink" },
			];
			wp.hooks.applyFilters("catpow.blocks.flow.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}
		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });

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
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
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
								{ type: "text", key: "title" },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
								{ type: "text", key: "subTitle", cond: states.hasSubTitle },
								{ type: "text", key: "text" },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
							]}
							isTemplate={states.isTemplate}
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
									<CP.Item tag="li" className="_item" {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
										{states.hasImage && (
											<div className="_image">
												<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" />
											</div>
										)}
										<div className="_texts">
											<header className="_header">
												{states.hasCounter && (
													<div className="_counter">
														{countPrefix && <span className="_prefix">{countPrefix}</span>}
														<span className="_number">{index + 1}</span>
														{countSuffix && <span className="_suffix">{countSuffix}</span>}
													</div>
												)}
												<div className="_text">
													<RichText
														className="_title"
														tagName={HeadingTag}
														onChange={(text) => {
															items[index].title = text;
															save();
														}}
														value={item.title}
													/>
													{states.hasTitleCaption && (
														<RichText
															className="_caption"
															tagName="p"
															onChange={(text) => {
																items[index].titleCaption = text;
																save();
															}}
															value={item.titleCaption}
														/>
													)}
												</div>
											</header>
											<div className={contentsClasses}>
												{states.hasSubTitle && (
													<RichText
														className="_subtitle"
														tagName={SubHeadingTag}
														onChange={(subTitle) => {
															items[index].subTitle = subTitle;
															save();
														}}
														value={item.subTitle}
														placeholder="SubTitle"
													/>
												)}
												<RichText
													tagName="p"
													className="_text"
													onChange={(text) => {
														items[index].text = text;
														save();
													}}
													value={item.text}
												/>
											</div>
											{states.hasLink && <CP.Link.Edit className="_link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index} />}
										</div>
									</CP.Item>
								);
							})}
						</ul>
					</CP.Bem>
				)}
			</>
		);
	},
	save({ attributes }) {
		const { RichText, useBlockProps } = wp.blockEditor;
		const { HeadingTag, SubHeadingTag, items = [], classes = "", vars, contentsClasses = "", countPrefix, countSuffix } = attributes;

		const states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul {...useBlockProps.save({ className: classes, style: vars })}>
					{items.map((item, index) => {
						return (
							<li className={item.classes} key={index}>
								{states.hasImage && (
									<div className="_image">
										<img src={item.src} alt={item.alt} />
									</div>
								)}
								<div className="_texts">
									<header className="_header">
										{states.hasCounter && (
											<div className="_counter">
												{countPrefix && <span className="_prefix">{countPrefix}</span>}
												<span className="_number">{index + 1}</span>
												{countSuffix && <span className="_suffix">{countSuffix}</span>}
											</div>
										)}
										<div className="_text">
											<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
											{states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
										</div>
									</header>
									<div className={contentsClasses}>
										{states.hasSubTitle && <RichText.Content tagName={SubHeadingTag} className="_subtitle" value={item.subTitle} />}
										<RichText.Content tagName="p" className="_text" value={item.text} />
									</div>
									{states.hasLink && item.linkUrl && <CP.Link className="_link" attr={attributes} keys={linkKeys.link} index={index} />}
								</div>
							</li>
						);
					})}
				</ul>
			</CP.Bem>
		);
	},
});
