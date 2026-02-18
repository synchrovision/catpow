CP.config.contactinfo = {
	linkKeys: {
		link: { href: "href", items: "items" },
	},
};

const getSubHeadingTag = (HeadingTag) => HeadingTag.replace(/h(\d)/, (m, num) => `h${Math.min(parseInt(num) + 1, 6)}`);

wp.blocks.registerBlockType("catpow/contactinfo", {
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo, useEffect } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { classes, HeadingTag = "h3", itemsClasses, items = [], title, lead, caption, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-contactinfo";
		const { bem, classNamesToFlags, flagsToClassNames } = Catpow.util;

		const states = useMemo(() => classNamesToFlags(classes), [classes]);

		const { linkKeys } = CP.config.contactinfo;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"hasContentWidth",
				{ name: "title", label: "タイトル", values: "hasTitle" },
				{ name: "lead", label: "リード", values: "hasLead" },
				{ name: "caption", label: "キャプション", values: "hasCaption" },
				{
					name: "icon",
					label: "アイコン",
					values: "hasIcon",
					sub: [{ input: "icon" }],
				},
				{ name: "itemTitle", label: "個別タイトル", values: "hasItemTitle", sub: [{ name: "itemsLevel", preset: "level", classKey: "itemsClasses" }] },
				{ name: "itemLead", label: "個別リード", values: "hasItemLead" },
				{
					name: "itemCaption",
					label: "個別キャプション",
					values: "hasItemCaption",
				},
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = ["color", "event"];
			wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const len = Math.max(items.length, loopCount);

		useEffect(() => {
			states.hasMultipleItems = len > 1;
			setAttributes({ classes: flagsToClassNames(states) });
		}, [len > 1]);

		const blockProps = useBlockProps({ className: classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="アイテム" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
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
								{ type: "text", key: "title", cond: states.hasItemTitle },
								{ type: "text", key: "lead", cond: states.hasItemLead },
								{ type: "text", key: "link" },
								{ type: "text", key: "href" },
								{ type: "text", key: "caption", cond: states.hasItemCaption },
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
								<div {...blockProps}>
									{states.hasTitle && (
										<RichText
											tagName={HeadingTag}
											className="_title"
											placeholder="Input Title"
											onChange={(title) => {
												setAttributes({ title });
											}}
											value={title}
										/>
									)}
									{states.hasLead && (
										<RichText
											tagName="p"
											className="_lead"
											placeholder="Input Lead"
											onChange={(lead) => {
												setAttributes({ lead });
											}}
											value={lead}
										/>
									)}
									<ul className={itemsClasses}>
										{[...Array(len).keys()].map((i) => {
											const index = i % items.length;
											const item = items[index];
											return (
												<CP.Item className="_item" tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={i}>
													{states.hasItemTitle && (
														<RichText
															tagName={getSubHeadingTag(HeadingTag)}
															className="_title"
															placeholder="Input Title"
															onChange={(title) => {
																item.title = title;
																save();
															}}
															value={item.title}
														/>
													)}
													{states.hasItemLead && (
														<RichText
															tagName="p"
															className="_lead"
															placeholder="Input Lead"
															onChange={(lead) => {
																item.lead = lead;
																save();
															}}
															value={item.lead}
														/>
													)}
													<CP.Link.Edit className="_link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index}>
														{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
														<RichText
															tagName="span"
															className="_text"
															placeholder="Input Link"
															onChange={(link) => {
																items[index].link = link;
																save();
															}}
															value={item.link}
														/>
													</CP.Link.Edit>
													{states.hasItemCaption && (
														<RichText
															tagName="small"
															className="_caption"
															placeholder="Input Caption"
															onChange={(caption) => {
																item.caption = caption;
																save();
															}}
															value={item.caption}
														/>
													)}
												</CP.Item>
											);
										})}
									</ul>
									{states.hasCaption && (
										<RichText
											tagName="small"
											className="_caption"
											placeholder="Input Caption"
											onChange={(caption) => {
												setAttributes({ caption });
											}}
											value={caption}
										/>
									)}
								</div>
							</CP.Bem>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes, HeadingTag = "h3", itemsClasses, items = [], title, lead, caption, doLoop } = attributes;
		const states = Catpow.util.classNamesToFlags(classes);

		const { linkKeys } = CP.config.contactinfo;

		let rtn = [];

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps.save({ className: classes })}>
						{states.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={title} />}
						{states.hasLead && <RichText.Content tagName="p" className="_lead" value={lead} />}
						<ul className={itemsClasses}>
							{items.map((item, index) => {
								return (
									<li className="_item" key={index}>
										{states.hasItemTitle && <RichText.Content tagName={getSubHeadingTag(HeadingTag)} className="_title" value={item.title} />}
										{states.hasItemLead && <RichText.Content tagName="p" className="_lead" value={item.lead} />}
										<CP.Link className="_link" attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/contactinfo", item)}>
											{states.hasIcon && <CP.OutputIcon className="_icon" item={attributes} />}
											<RichText.Content tagName="span" className="_text" value={item.link} />
										</CP.Link>
										{states.hasItemCaption && <RichText.Content tagName="small" className="_caption" value={item.caption} />}
									</li>
								);
							})}
						</ul>
						{states.hasLead && <RichText.Content tagName="small" className="_caption" value={caption} />}
					</div>
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
