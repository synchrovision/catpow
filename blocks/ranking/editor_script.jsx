const blockClass = "wp-block-catpow-ranking";

const config = (CP.config.ranking = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" },
	},
	linkKeys: {
		link: { items: "items", href: "linkUrl" },
	},
});
wp.blocks.registerBlockType("catpow/ranking", {
	title: "🐾 Ranking",
	description: "ランキングの一覧ブロックです。",
	icon: "awards",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-ranking";
					if (!attributes.rankPrefix) {
						attributes.rankPrefix = "Step.";
					}
					return wp.blocks.createBlock("catpow/ranking", attributes);
				},
			},
		],
	},
	attributes: {
		version: { type: "number", default: 0 },
		classes: { source: "attribute", selector: `.${blockClass}`, attribute: "class", default: `${blockClass} is-level3 has-content-width has-item-size-medium is-type-card has-rank has-rate` },
		contentsClasses: { source: "attribute", selector: `.${blockClass}__item-contents`, attribute: "class", default: `${blockClass}__item-contents is-level4` },

		vars: { type: "object" },
		HeadingTag: { type: "string", default: "h3" },
		SubHeadingTag: { type: "string", default: "h4" },
		items: {
			source: "query",
			selector: `.${blockClass}__item`,
			query: {
				classes: { source: "attribute", attribute: "class" },
				title: { source: "html", selector: `.${blockClass}__item-header-text-title` },
				titleCaption: { source: "html", selector: `.${blockClass}__item-header-text-caption` },
				rate: { source: "attribute", attribute: "value", selector: `.${blockClass}__item-header-rate-data` },
				src: { source: "attribute", selector: `.${blockClass}__item-image [src]`, attribute: "src" },
				alt: { source: "attribute", selector: `.${blockClass}__item-image [src]`, attribute: "alt" },
				lead: { source: "html", selector: `.${blockClass}__item-contents-lead` },
				text: { source: "html", selector: `.${blockClass}__item-contents-text` },
				linkUrl: { source: "attribute", selector: `.${blockClass}__item-contents-link`, attribute: "href" },
				linkText: { source: "text", selector: `.${blockClass}__item-contents-link` },
			},
			default: [...Array(3)].map(() => {
				return {
					classes: `${blockClass}__item`,
					title: ["Title"],
					titleCaption: ["Caption"],
					rate: 3,
					lead: ["Lead"],
					src: wpinfo.theme_url + "/images/dummy.jpg",
					alt: "dummy",
					text: ["Text"],
					linkUrl: wpinfo.home_url,
					linkText: "Read More",
				};
			}),
		},
		rankPrefix: { source: "text", selector: `.${blockClass}__item-header-rank-prefix`, default: "第" },
		rankStart: { source: "attribute", attribute: "value", selector: `.${blockClass}__item-header-rank-number`, default: "1" },
		rankSuffix: { source: "text", selector: `.${blockClass}__item-header-rank-suffix`, default: "位" },
		rateLabel: { source: "text", selector: `.${blockClass}__item-header-rate-label`, default: "評価" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextControl, TextareaControl, ToolbarGroup } = wp.components;
		const { items = [], classes = "", contentsClasses, vars, HeadingTag, SubHeadingTag, rankStart, rankPrefix, rankSuffix, rateLabel } = attributes;
		const primaryClass = "wp-block-catpow-ranking";

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.ranking;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				{ name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: "副見出しタグ", classKey: "contentsClasses", cond: "hasLead" },
				"level",
				{ name: "contentsLevel", preset: "level", label: "コンテンツレベル", classKey: "contentsClasses" },
				"hasContentWidth",
				"hasMargin",
				"itemSize",
				"color",
				"colorScheme",
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: { isTypeFlat: "フラット", isTypeCard: "カード" },
				},
				{
					label: "ランク",
					values: "hasRank",
					sub: [
						{ label: "前置テキスト", input: "text", key: "rankPrefix" },
						{ label: "開始ランク", input: "text", key: "rankStart" },
						{ label: "後置テキスト", input: "text", key: "rankSuffix" },
					],
				},
				{ label: "レート", values: "hasRate", sub: [{ label: "ラベル", input: "text", key: "rateLabel" }] },
				{ label: "タイトルキャプション", values: "hasTitleCaption" },
				{ label: "リード文", values: "hasLead" },
				{ label: "リンク", values: "hasLink" },
			];
			wp.hooks.applyFilters("catpow.blocks.ranking.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = ["color", { name: "rate", label: "レート", input: "range", key: "rate", min: 0, max: 5, step: 0.1 }];
			wp.hooks.applyFilters("catpow.blocks.ranking.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

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
					<CP.SelectClassPanel title="アイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps({ className: classes, style: vars })}>
						{items.map((item, index) => {
							return (
								<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
									<div className="_image">
										<CP.SelectResponsiveImage attributes={attributes} setAttributes={setAttributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" />
									</div>
									<header className="_header">
										{states.hasRank && (
											<div className="_rank">
												{rankPrefix && <span className="_prefix">{rankPrefix}</span>}
												<data className="_number" value={index + parseInt(rankStart)}>
													{index + parseInt(rankStart)}
												</data>
												{rankSuffix && <span className="_suffix">{rankSuffix}</span>}
											</div>
										)}
										{states.hasRate && (
											<div className="_rate">
												{rateLabel && <span className="_label">{rateLabel}</span>}
												<data className="_data" value={item.rate} style={{ "--rate": item.rate }}>
													<span className="_number">{parseFloat(item.rate).toFixed(1)}</span>
													<span className="_stars"></span>
												</data>
											</div>
										)}
										<div className="_text">
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
										</div>
									</header>
									<div className={contentsClasses}>
										{states.hasLead && (
											<RichText
												tagName={SubHeadingTag}
												className="_lead"
												onChange={(lead) => {
													items[index].lead = lead;
													save();
												}}
												value={item.lead}
												placeholder="lead"
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
										{states.hasLink && (
											<CP.Link.Edit className="_link" setAttributes={setAttributes} attributes={attributes} keys={config.linkKeys.link} index={index}>
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
			</>
		);
	},
	save({ attributes, className }) {
		const { RichText } = wp.blockEditor;
		const { items = [], classes = "", contentsClasses, HeadingTag, SubHeadingTag, vars, rankStart, rankPrefix, rankSuffix, rateLabel } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.ranking;

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul className={classes} style={vars}>
					{items.map((item, index) => (
						<li className={item.classes} key={index}>
							<div className="_image">
								<img src={item.src} alt={item.alt} />
							</div>
							<header className="_header">
								{states.hasRank && (
									<div className="_rank">
										{rankPrefix && <span className="_prefix">{rankPrefix}</span>}
										<data className="_number" value={index + parseInt(rankStart)}>
											{index + parseInt(rankStart)}
										</data>
										{rankSuffix && <span className="_suffix">{rankSuffix}</span>}
									</div>
								)}
								{states.hasRate && (
									<div className="_rate">
										{rateLabel && <span className="_label">{rateLabel}</span>}
										<data className="_data" value={item.rate} style={{ "--rate": item.rate }}>
											<span className="_number">{parseFloat(item.rate).toFixed(1)}</span>
											<span className="_stars"></span>
										</data>
									</div>
								)}
								<div className="_text">
									<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
									{states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
								</div>
							</header>
							<div className={contentsClasses}>
								{states.hasLead && <RichText.Content tagName={SubHeadingTag} className="_lead" value={item.lead} />}
								<RichText.Content tagName="p" className="_text" value={item.text} />
								{states.hasLink && item.linkUrl && (
									<CP.Link className="_link" attributes={attributes} keys={config.linkKeys.link} index={index}>
										<RichText.Content value={item.linkText} />
									</CP.Link>
								)}
							</div>
						</li>
					))}
				</ul>
			</CP.Bem>
		);
	},
});
