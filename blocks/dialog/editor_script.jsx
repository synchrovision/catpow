const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/dialog", {
	title: "🐾 Dialog",
	description: "フキダシで会話を表現するブロックです。",
	icon: "format-chat",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-dialog";
					return wp.blocks.createBlock("catpow/dialog", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo, useEffect } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["level", "hasContentWidth", "isTemplate"];
			wp.hooks.applyFilters("catpow.blocks.dialog.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [{ name: "type", label: "タイプ", type: "buttons", values: { isTypeTalk: "talk", isTypeShout: "shout", isTypeThink: "think" } }, "itemAlign", "color"];
			wp.hooks.applyFilters("catpow.blocks.dialog.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const imageKeys = {
			headerImage: {
				src: "headerImageSrc",
				alt: "headerImageAlt",
				code: "headerImageCode",
				items: "items",
			},
		};

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="リストアイテム" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
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
									{
										type: "image",
										label: "header",
										keys: imageKeys.headerImage,
										cond: true,
									},
									{
										type: "text",
										key: "headerImageCode",
										cond: states.isTemplate,
									},
									{ type: "text", key: "title", cond: true },
									{ type: "text", key: "text", cond: true },
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
											return (
												<CP.Item tag="li" className={item.classes} set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
													<header className="_header">
														<div className="_image">
															<CP.SelectResponsiveImage
																className="_img"
																attr={attributes}
																set={setAttributes}
																keys={imageKeys.headerImage}
																index={index}
																size="thumbnail"
																isTemplate={states.isTemplate}
															/>
														</div>
														<div className="_text">
															<RichText
																tagName="h3"
																className="_heading"
																onChange={(text) => {
																	items[index].title = text;
																	setAttributes({ items: [...items] });
																}}
																value={item.title}
															/>
														</div>
													</header>
													<div className="_contents">
														<RichText
															tagName="p"
															className="_text"
															onChange={(text) => {
																items[index].text = text;
																setAttributes({ items: [...items] });
															}}
															value={item.text}
														/>
													</div>
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
	save({ attributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", doLoop } = attributes;

		var states = CP.classNamesToFlags(classes);
		const imageKeys = {
			headerImage: {
				src: "headerImageSrc",
				alt: "headerImageAlt",
				code: "headerImageCode",
				items: "items",
			},
		};

		let rtn = [];
		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps.save({ className: classes })}>
						{items.map((item, index) => {
							return (
								<li className={item.classes} key={index}>
									<header className="_header">
										<div className="_image">
											<CP.ResponsiveImage className="_img" attr={attributes} keys={imageKeys.headerImage} index={index} isTemplate={states.isTemplate} />
										</div>
										<div className="_text">
											<RichText.Content tagName="h3" className="_heading" value={item.title} />
										</div>
									</header>
									<div className="_contents">
										<RichText.Content tagName="p" className="_text" value={item.text} />
									</div>
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
