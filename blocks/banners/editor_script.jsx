import { clsx } from "clsx";

CP.config.banners = {
	devices: ["sp", "tb"],
	imageKeys: {
		image: {
			src: "src",
			alt: "alt",
			code: "imageCode",
			items: "items",
			sources: "sources",
		},
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/banners", {
	title: "🐾 Banners",
	description: "リンク付きのバナー画像を並べて表示するブロックです。",
	icon: "images-alt",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-banners has-title";
					return wp.blocks.createBlock("catpow/banners", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { classes, HeadingTag, vars, items = [], loopCount, imageCode, doLoop, device, EditMode = false, AltMode = false } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, linkKeys } = CP.config.banners;

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = ["headingTag", "level", "itemSize", "itemGap", "hasContentWidth", "hasMargin", "hasPadding", { label: "タイトル", values: "hasTitle" }, "isTemplate"];
			wp.hooks.applyFilters("catpow.blocks.banners.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.banners;
			const selectiveItemClasses = [
				{
					name: "image",
					input: "picture",
					label: "画像",
					keys: imageKeys.image,
					devices,
				},
				{ name: "alt", input: "text", label: "alt", key: "alt" },
				{ name: "target", input: "text", label: "target", key: "target" },
				"event",
			];
			wp.hooks.applyFilters("catpow.blocks.banners.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const itemTemplateSelectiveClasses = [{ input: "text", label: "画像", key: "imageCode" }];

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({
			className: classes,
			style: vars,
		});

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					{states.isTemplate ? (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={itemTemplateSelectiveClasses}
						/>
					) : (
						<CP.SelectClassPanel title="バナー" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>

				{EditMode ? (
					<div {...blockProps} className="cp-altcontent">
						<div className="label">
							<Icon icon="edit" />
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "text", key: "title", cond: states.hasTitle },
								{
									type: "image",
									label: "image",
									keys: imageKeys.image,
									cond: true,
								},
								{ type: "text", key: "imageCode", cond: states.isTemplate },
								{ type: "text", key: "alt", cond: true },
								{ type: "text", key: "linkUrl", cond: true },
								{ type: "text", key: "target", cond: true },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps} className="cp-altcontent">
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
											<CP.Item className="_item" tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
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
												<CP.Link.Edit className="_link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index}>
													<CP.SelectResponsiveImage
														className="_image"
														attr={attributes}
														set={setAttributes}
														keys={imageKeys.image}
														index={index}
														devices={devices}
														device={device === "pc" ? null : device}
														isTemplate={states.isTemplate}
													/>
												</CP.Link.Edit>
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
	save({ attributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes, HeadingTag, vars, items = [], loopParam, doLoop } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, linkKeys } = CP.config.banners;
		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
		});

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...blockProps}>
						{items.map((item, index) => {
							return (
								<li className={item.classes} key={index}>
									{states.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={item.title} />}

									<CP.Link className="_link" attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/banners", item)}>
										<CP.ResponsiveImage className="_image" size="regular_banner" attr={attributes} keys={imageKeys.image} index={index} devices={devices} isTemplate={states.isTemplate} />
									</CP.Link>
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
	deprecated: [
		{
			save({ attributes, className }) {
				const { items = [], classes, loopParam } = attributes;

				var states = CP.classNamesToFlags(classes);
				const imageKeys = {
					image: {
						src: "src",
						srcset: "srcset",
						alt: "alt",
						code: "imageCode",
						items: "items",
					},
				};

				return (
					<ul className={classes}>
						{states?.doLoop && "[loop_template " + loopParam + "]"}
						{items.map((item, index) => {
							return (
								<li className={item.classes}>
									{states.hasTitle && (
										<h3>
											<RichText.Content value={item.title} />
										</h3>
									)}
									<a href={item.linkUrl} target={item.target} data-event={item.event} rel={item.target ? "noopener noreferrer" : ""}>
										<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
									</a>
								</li>
							);
						})}
						{states?.doLoop && "[/loop_template]"}
					</ul>
				);
			},
			migrate(attributes) {
				var states = CP.classNamesToFlags(classes);
				attributes.content_path = attributes.loopParam.split(" ")[0];
				attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
				attributes.doLoop = states?.doLoop;
				return attributes;
			},
		},
	],
});
