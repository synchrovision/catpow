﻿CP.config.ranking = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" },
	},
};
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
					if (!attributes.countPrefix) {
						attributes.countPrefix = "Step.";
					}
					return wp.blocks.createBlock("catpow/ranking", attributes);
				},
			},
		],
	},
	attributes: {
		version: { type: "number", default: 0 },
		classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-ranking" },
		items: {
			source: "query",
			selector: "li.item",
			query: {
				classes: { source: "attribute", attribute: "class" },
				title: { source: "html", selector: "header .text h3" },
				titleCaption: { source: "html", selector: "header .text p" },
				src: { source: "attribute", selector: "li>.image [src]", attribute: "src" },
				alt: { source: "attribute", selector: "li>.image [src]", attribute: "alt" },
				subTitle: { source: "html", selector: ".contents h4" },
				text: { source: "html", selector: ".contents p" },
				linkUrl: { source: "attribute", selector: ".link a", attribute: "href" },
			},
			default: [...Array(3)].map(() => {
				return {
					classes: "item",
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
		countPrefix: { source: "text", selector: ".counter .prefix", default: "" },
		countSuffix: { source: "text", selector: ".counter .suffix", default: "" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { items = [], classes = "", countPrefix, countSuffix } = attributes;
		const primaryClass = "wp-block-catpow-ranking";

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.ranking;

		var selectiveClasses = [
			{ label: "画像", values: "hasImage" },
			{ label: "タイトルキャプション", values: "hasTitleCaption" },
			{ label: "サブタイトル", values: "hasSubTitle" },
			{ label: "リンク", values: "hasLink" },
		];

		let rtn = [];
		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		items.map((item, index) => {
			if (!item.controlClasses) {
				item.controlClasses = "control";
			}
			rtn.push(
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} key={index}>
					{states.hasImage && (
						<div className="image">
							<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" />
						</div>
					)}
					<header>
						{states.hasCounter && (
							<div className="counter">
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index + 1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						)}
						<div className="text">
							<h3>
								<RichText
									onChange={(text) => {
										items[index].title = text;
										save();
									}}
									value={item.title}
								/>
							</h3>
							{states.hasTitleCaption && (
								<p>
									<RichText
										onChange={(text) => {
											items[index].titleCaption = text;
											save();
										}}
										value={item.titleCaption}
									/>
								</p>
							)}
						</div>
					</header>
					<div className="contents">
						{states.hasSubTitle && (
							<h4>
								<RichText
									onChange={(subTitle) => {
										items[index].subTitle = subTitle;
										save();
									}}
									value={item.subTitle}
									placeholder="SubTitle"
								/>
							</h4>
						)}
						<p>
							<RichText
								onChange={(text) => {
									items[index].text = text;
									save();
								}}
								value={item.text}
							/>
						</p>
					</div>
					{states.hasLink && (
						<div className="link">
							<TextControl
								onChange={(linkUrl) => {
									items[index].linkUrl = linkUrl;
									save();
								}}
								value={item.linkUrl}
								placeholder="URLを入力"
							/>
						</div>
					)}
				</CP.Item>
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

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
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<ul className={attributes.EditMode ? primaryClass + " edit" : classes}>{rtn}</ul>
			</>
		);
	},
	save({ attributes, className }) {
		const { RichText } = wp.blockEditor;
		const { items = [], classes = "", countPrefix, countSuffix } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.ranking;

		let rtn = [];
		items.map((item, index) => {
			rtn.push(
				<li className={item.classes} key={index}>
					{states.hasImage && (
						<div className="image">
							<img src={item.src} alt={item.alt} />
						</div>
					)}
					<header>
						{states.hasCounter && (
							<div className="counter">
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index + 1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						)}
						<div className="text">
							<h3>
								<RichText.Content value={item.title} />
							</h3>
							{states.hasTitle && states.hasTitleCaption && (
								<p>
									<RichText.Content value={item.titleCaption} />
								</p>
							)}
						</div>
					</header>
					<div className="contents">
						{states.hasSubTitle && (
							<h4>
								<RichText.Content value={item.subTitle} />
							</h4>
						)}
						{states.hasText && (
							<p>
								<RichText.Content value={item.text} />
							</p>
						)}
					</div>
					{states.hasLink && item.linkUrl && (
						<div className="link">
							<a href={item.linkUrl}> </a>
						</div>
					)}
				</li>
			);
		});
		return <ul className={classes}>{rtn}</ul>;
	},
});
