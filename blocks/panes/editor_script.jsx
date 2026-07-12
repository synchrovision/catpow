CP.config.panes = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
		symbol: {
			src: "symbolSrc",
			alt: "symbolAlt",
			code: "symbolCode",
			items: "items",
		},
	},
};

wp.blocks.registerBlockType("catpow/panes", {
	title: "🐾 Panes",
	description: "矩形の画像とテキストのペアのリスト。",
	icon: "editor-ul",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-panes";
					return wp.blocks.createBlock("catpow/panes", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], classes = "", HeadingTag, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		var states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.panes;

		var selectiveClasses = ["headingTag", "level", "hasContentWidth", "hasMargin", { label: "シンボル", values: "hasSymbol" }, "isTemplate"];
		const itemSelectiveClasses = ["color", { input: "icon" }];

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="アイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={itemSelectiveClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{
									type: "image",
									label: "image",
									keys: imageKeys.image,
									cond: true,
								},
								{ type: "text", key: "imageCode", cond: states.isTemplate },
								{ type: "text", key: "title", cond: states.hasTitle },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
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
										return (
											<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
												<div className="_image">
													<CP.SelectResponsiveImage class="_img" attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="large" isTemplate={states.isTemplate} />
												</div>
												<div className="_contents">
													<div className="_text">
														{states.hasSymbol && <CP.OutputIcon className="_symbol" item={item} />}
														<RichText
															tagName={HeadingTag}
															className="_title"
															onChange={(title) => {
																item.title = title;
																save();
															}}
															value={item.title}
														/>
														<RichText
															tagName="p"
															className="_caption"
															onChange={(titleCaption) => {
																item.titleCaption = titleCaption;
																save();
															}}
															value={item.titleCaption}
														/>
													</div>
												</div>
												{states.hasLink && isSelected && (
													<CP.Link.Edit className="_link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index}>
														<RichText
															onChange={(linkText) => {
																item.linkText = linkText;
																save();
															}}
															value={item.linkText}
														/>
													</CP.Link.Edit>
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
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { items = [], classes = "", HeadingTag, vars, linkUrl, loopParam, doLoop } = attributes;
		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.panes;

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul className={classes}>
						{items.map((item, index) => (
							<li className={item.classes} key={index}>
								<div className="_image">
									<CP.ResponsiveImage className="_img" attr={attributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
								</div>
								<div className="_contents">
									<div className="_text">
										{states.hasSymbol && <CP.OutputIcon className="_symbol" item={item} />}
										<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
										<RichText.Content tagName="p" className="_caption" value={item.titleCaption} />
									</div>
								</div>
								{states.hasLink && item.linkUrl && (
									<CP.Link className="_link" attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/panes", item)}>
										<RichText.Content value={item.linkText} />
									</CP.Link>
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
