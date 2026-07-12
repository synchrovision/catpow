wp.blocks.registerBlockType("catpow/materials", {
	title: "🐾 Materials",
	description: "材料・成分一覧のブロックです。",
	icon: "editor-ul",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], classes, HeadingTag, SubHeadingTag, loopParam, loopCount, doLoop, EditMode = false, AltMode = false, currentItemIndex } = attributes;
		const primaryClass = "wp-block-catpow-materials";

		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["headingTag", "level", "subHeadingTag", "hasMargin", "hasContentWidth", "itemSize", "isTemplate"];
			wp.hooks.applyFilters("catpow.blocks.materials.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = ["color", { name: "label", label: "ラベル", values: "hasLabel" }];
			wp.hooks.applyFilters("catpow.blocks.materials.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		let rtn = [];
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

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="グループ" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<>
					{EditMode ? (
						<div {...blockProps}>
							<CP.Label icon="edit" />
							<CP.EditItemsTable
								set={setAttributes}
								attr={attributes}
								columns={[
									{ type: "text", key: "label", cond: true },
									{
										type: "items",
										key: "items",
										columns: [
											{ type: "text", key: "title", cond: true },
											{ type: "text", key: "amount", cond: true },
											{ type: "text", key: "caption", cond: true },
										],
										cond: true,
									},
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
											if (!item.controlClasses) {
												item.controlClasses = "control";
											}
											const itemStates = CP.classNamesToFlags(item.classes);
											return (
												<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
													{itemStates.hasLabel && (
														<RichText
															tagName={HeadingTag}
															className="_label"
															onChange={(label) => {
																item.label = label;
																save();
															}}
															value={item.label}
														/>
													)}
													<ul className="_items">
														{item.items.map((subItem, subIndex) => {
															const subItemStates = CP.classNamesToFlags(subItem.classes);
															return (
																<CP.Item
																	tag="li"
																	className={subItem.classes}
																	set={() => {
																		item.currentItemIndex = subIndex;
																		save();
																	}}
																	attr={item}
																	items={item.items}
																	index={subIndex}
																	isSelected={isSelected && currentItemIndex == index && item.currentItemIndex == subIndex}
																>
																	<RichText
																		className="_title"
																		onChange={(title) => {
																			subItem.title = title;
																			save();
																		}}
																		value={subItem.title}
																	/>
																	<div className="_line"></div>
																	<RichText
																		tagName="div"
																		className="_amount"
																		onChange={(amount) => {
																			subItem.amount = amount;
																			save();
																		}}
																		value={subItem.amount}
																	/>
																	{subItemStates.hasCaption && (
																		<RichText
																			tagName="div"
																			className="_caption"
																			onChange={(caption) => {
																				subItem.caption = caption;
																				save();
																			}}
																			value={subItem.caption}
																		/>
																	)}
																</CP.Item>
															);
														})}
													</ul>
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
		const { items = [], classes = "", HeadingTag, SubHeadingTag, loopParam, loopCount, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		var states = CP.classNamesToFlags(classes);

		let rtn = [];
		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul className={classes}>
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<li className={item.classes} key={index}>
									{itemStates.hasLabel && <RichText.Content tagName={HeadingTag} className="_label" value={item.label} />}
									<ul className="_items">
										{item.items.map((subItem, subIndex) => {
											const subItemStates = CP.classNamesToFlags(subItem.classes);
											return (
												<li className={subItem.classes}>
													<RichText.Content tagName={SubHeadingTag} className="_title" value={subItem.title} />
													<div className="_line"></div>
													<RichText.Content tagName="div" className="_amount" value={subItem.amount} />
													{subItemStates.hasCaption && <RichText.Content tagName="div" className="caption" value={subItem.caption} />}
												</li>
											);
										})}
									</ul>
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
