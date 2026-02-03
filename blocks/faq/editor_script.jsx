import { clsx } from "clsx";

CP.config.faq = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" },
	},
};
wp.blocks.registerBlockType("catpow/faq", {
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-faq accordion";
					return wp.blocks.createBlock("catpow/faq", attributes);
				},
			},
		],
	},
	attributes: {
		version: { type: "number", default: 0 },
		classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-faq" },
		vars: { type: "object" },
		items: {
			source: "query",
			selector: ".wp-block-catpow-faq__item",
			query: {
				classes: { source: "attribute", attribute: "class" },
				src: { source: "attribute", selector: ".wp-block-catpow-faq__item-header-image [src]", attribute: "src" },
				alt: { source: "attribute", selector: ".wp-block-catpow-faq__item-header-image [src]", attribute: "alt" },
				title: { source: "html", selector: ".wp-block-catpow-faq__item-header-text-title" },
				titleCaption: { source: "html", selector: ".wp-block-catpow-faq__item-header-text-caption" },
				subTitle: { source: "html", selector: ".wp-block-catpow-faq__item-contents-body-subtitle" },
				text: { source: "html", selector: ".wp-block-catpow-faq__item-contents-body-text" },
			},
			default: [...Array(3)].map(() => {
				return {
					classes: "wp-block-catpow-faq__item",
					title: ["Title"],
					titleCaption: ["Caption"],
					subTitle: ["SubTitle"],
					src: wpinfo.theme_url + "/images/dummy.jpg",
					alt: "dummy",
					text: ["Text"],
				};
			}),
		},
		counterPrefix: { source: "text", selector: ".wp-block-catpow-faq__item-header-counter-prefix", default: "" },
		counterSuffix: { source: "text", selector: ".wp-block-catpow-faq__item-header-counter-suffix", default: "" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { items = [], classes = "", vars, counterPrefix, counterSuffix } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.faq;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"hasContentWidth",
				{ name: "titleCaption", label: "Qにキャプション", values: "hasTitleCaption" },
				{ name: "subTitle", label: "Aに見出し", values: "hasSubTitle" },
				{ name: "hasImage", label: "画像", values: "hasImage" },
				{
					name: "counter",
					label: "番号",
					values: "hasCounter",
					sub: [
						{
							name: "counterPrefix",
							input: "text",
							label: "番号前置テキスト",
							key: "counterPrefix",
						},
						{
							name: "counterSuffix",
							input: "text",
							label: "番号後置テキスト",
							key: "counterSuffix",
						},
					],
				},
				{ name: "accordion", label: "アコーディオン", values: "isAccordion" },
			];
			wp.hooks.applyFilters("catpow.blocks.faq.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		let rtn = [];
		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

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
				<CP.Bem prefix="wp-block-catpow">
					<ul className={clsx(classes, { edit: attributes.EditMode })} style={vars}>
						{items.map((item, index) => {
							if (!item.controlClasses) {
								item.controlClasses = "control";
							}
							return (
								<CP.Item tag="li" className={item.classes + " is-open"} set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
									<header className="_header">
										{states.hasCounter && (
											<div className="_counter">
												{counterPrefix && <span className="_prefix">{counterPrefix}</span>}
												<span className="_number">{index + 1}</span>
												{counterSuffix && <span className="_suffix">{counterSuffix}</span>}
											</div>
										)}
										{states.hasImage && (
											<div className="_image">
												<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" />
											</div>
										)}
										<div className="_text">
											<RichText
												tagName="h3"
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
										{states.isAccordion && <button className="_button" />}
									</header>
									<div className="_contents">
										<div className="_body">
											{states.hasSubTitle && (
												<RichText
													tagName="h4"
													className="_subtitle"
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
		const { RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", vars, counterPrefix, counterSuffix } = attributes;

		const states = CP.classNamesToFlags(classes);

		const blockProps = useBlockProps.save({
			className: classes,
			"data-wp-interactive": "faq",
			"data-wp-context": JSON.stringify({
				openItems: {},
			}),
			"data-wp-init": "callbacks.initBlock",
			style: vars,
		});

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul {...blockProps}>
					{items.map((item, index) => (
						<li id={`{$uid}-${index + 1}`} className={item.classes} data-wp-class--is-open="callbacks.isOpen" data-index={index} key={index}>
							<header id={`{$uid}-${index + 1}-header`} className="_header" data-wp-on--click="actions.onClickToggle" data-index={index}>
								{states.hasCounter && (
									<div className="_counter">
										{counterPrefix && <span className="_prefix">{counterPrefix}</span>}
										<span className="_number">{index + 1}</span>
										{counterSuffix && <span className="_suffix">{counterSuffix}</span>}
									</div>
								)}
								{states.hasImage && (
									<div className="_image">
										<img src={item.src} alt={item.alt} />
									</div>
								)}
								<div className="_text">
									<RichText.Content tagName="h3" className="_title" value={item.title} />
									{states.hasTitleCaption && <RichText.Content tagName="p" className="_caption" value={item.titleCaption} />}
								</div>
								{states.isAccordion && (
									<button
										className="_button"
										data-wp-bind--aria-expanded="callbacks.isOpen"
										data-wp-on--click="actions.onClickToggle"
										aria-controls={`{$uid}-${index + 1}-contents`}
										data-index={index}
									/>
								)}
							</header>
							<div id={`{$uid}-${index + 1}-contents`} className="_contents" data-wp-bind--aria-hidden="!callbacks.isOpen" data-index={index}>
								<div className="_body">
									{states.hasSubTitle && <RichText.Content tagName="h4" className="_subtitle" value={item.subTitle} />}
									<RichText.Content tagName="p" className="_text" value={item.text} />
								</div>
							</div>
						</li>
					))}
				</ul>
			</CP.Bem>
		);
	},
});
