wp.blocks.registerBlockType("catpow/pricelist", {
	title: "🐾 PriceList",
	description: "価格表のブロックです。",
	icon: "editor-ul",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], classes, HeadingTag, vars, loopParam, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-pricelist";

		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["hasContentWidth", "hasMargin", "isTemplate"];
			wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				{ name: "heading", label: "見出し", values: "isHeading" },
				"level",
				{ name: "indent", label: "インデント", type: "buttons", values: { hasIndent1: "1", hasIndent2: "2", hasIndent3: "3" } },
				{ name: "image", label: "画像", values: "hasImage" },
				{ name: "caption", label: "キャプション", values: "hasCaption" },
			];
			wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const imageKeys = {
			image: {
				src: "imageSrc",
				alt: "imageAlt",
				code: "imageCode",
				items: "items",
			},
		};
		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};
		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="リストアイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<>
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
										cond: states.isTemplate && states.hasImage,
									},
									{ type: "text", key: "title", cond: true },
									{ type: "text", key: "caption", cond: true },
									{ type: "text", key: "price", cond: true },
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
													{itemStates.hasImage && (
														<div className="_image">
															<CP.SelectResponsiveImage attributes={attributes} setAttributes={setAttributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" />
														</div>
													)}
													<RichText
														tagName="div"
														className="_title"
														onChange={(title) => {
															item.title = title;
															save();
														}}
														value={item.title}
														placeholder="Title"
													/>
													{!itemStates.isHeading && (
														<>
															<div className="_line"></div>
															<RichText
																tagName="div"
																className="_price"
																onChange={(price) => {
																	item.price = price;
																	save();
																}}
																value={item.price}
																placeholder="¥0,000"
															/>
														</>
													)}
													{itemStates.hasCaption && (
														<RichText
															tagName="div"
															className="_caption"
															onChange={(caption) => {
																item.caption = caption;
																save();
															}}
															value={item.caption}
															placeholder="Caption"
														/>
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
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { items = [], classes = "", loopParam, loopCount, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		var states = CP.classNamesToFlags(classes);

		const imageKeys = {
			image: { src: "imageSrc", alt: "imageAlt", items: "items" },
		};

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul className={classes}>
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<li className={item.classes} key={index}>
									{itemStates.hasImage && (
										<div className="_image">
											<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} />
										</div>
									)}
									<RichText.Content tagName="div" className="_title" value={item.title} />
									{!itemStates.isHeading && (
										<>
											<div className="_line"></div>
											<RichText.Content tagName="div" className="_price" value={item.price} />
										</>
									)}
									{itemStates.hasCaption && <RichText.Content tagName="div" className="_caption" value={item.caption} />}
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
