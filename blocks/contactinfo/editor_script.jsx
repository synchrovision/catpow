CP.config.contactinfo = {
	linkKeys: {
		link: { href: "href", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/contactinfo", {
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo, useEffect } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], title, lead, caption, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-contactinfo";
		const { bem, classNamesToFlags, flagsToClassNames } = Catpow.util;

		const states = useMemo(() => classNamesToFlags(attributes.classes), [attributes.classes]);
		const classes = useMemo(() => bem(attributes.classes), [attributes.classes]);

		const { linkKeys } = CP.config.contactinfo;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "size",
					label: "サイズ",
					type: "buttons",
					values: {
						"is-size-small": "小",
						"is-size-medium": "中",
						"is-size-large": "大",
					},
				},
				{ name: "title", label: "タイトル", values: "has-title" },
				{ name: "lead", label: "リード", values: "has-lead" },
				{ name: "caption", label: "キャプション", values: "has-caption" },
				{
					name: "icon",
					label: "アイコン",
					values: "has-icon",
					sub: [{ input: "icon" }],
				},
				{ name: "itemTitle", label: "個別タイトル", values: "has-item-title" },
				{ name: "itemLead", label: "個別リード", values: "has-item-lead" },
				{
					name: "itemCaption",
					label: "個別キャプション",
					values: "has-item-caption",
				},
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.banners;
			const selectiveItemClasses = ["color", "event"];
			wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		let rtn = [];
		const { imageKeys } = CP.config.contactinfo;
		const len = Math.max(items.length, loopCount);

		[...Array(len).keys()].forEach((i) => {
			const index = i % items.length;
			const item = items[index];
			const itemClasses = classes._items.item;
			if (!item.controlClasses) {
				item.controlClasses = "control";
			}
			rtn.push(
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={i}>
					{states.hasItemTitle && (
						<RichText
							tagName="h4"
							className={itemClasses.title()}
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
							className={itemClasses.lead()}
							onChange={(lead) => {
								item.lead = lead;
								save();
							}}
							value={item.lead}
						/>
					)}
					<CP.Link.Edit className={itemClasses.link()} attr={attributes} set={setAttributes} keys={linkKeys.link} index={index}>
						{states.hasIcon && <CP.OutputIcon className={itemClasses.link.icon()} item={attributes} />}
						<RichText
							tagName="span"
							className={itemClasses.link.text()}
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
							className={itemClasses.caption()}
							onChange={(caption) => {
								item.caption = caption;
								save();
							}}
							value={item.caption}
						/>
					)}
				</CP.Item>
			);
		});

		useEffect(() => {
			states.hasMultipleItems = len > 1;
			setAttributes({ classes: flagsToClassNames(states) });
		}, [len > 1]);

		const blockProps = useBlockProps({ className: classes() });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={attributes.classes} />
					</PanelBody>
					<CP.SelectClassPanel title="アイテム" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div className="cp-altcontent">
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
							<div className="cp-altcontent">
								<div className="label">
									<Icon icon="welcome-comments" />
								</div>
								<InnerBlocks />
							</div>
						) : (
							<div {...blockProps}>
								{states.hasTitle && (
									<RichText
										tagName="h3"
										className={classes._title()}
										onChange={(title) => {
											setAttributes({ title });
										}}
										value={title}
									/>
								)}
								{states.hasLead && (
									<RichText
										tagName="p"
										className={classes._lead()}
										onChange={(lead) => {
											setAttributes({ lead });
										}}
										value={lead}
									/>
								)}
								<ul className={classes._items()}>{rtn}</ul>
								{states.hasCaption && (
									<RichText
										tagName="small"
										className={classes._caption()}
										onChange={(caption) => {
											setAttributes({ caption });
										}}
										value={caption}
									/>
								)}
							</div>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], title, lead, caption, doLoop, EditMode = false, AltMode = false } = attributes;
		const states = Catpow.util.classNamesToFlags(attributes.classes);
		const classes = Catpow.util.bem(attributes.classes);

		const { linkKeys } = CP.config.contactinfo;

		let rtn = [];
		items.forEach((item, index) => {
			const itemClasses = classes._items.item;
			rtn.push(
				<li className={itemClasses()} key={index}>
					{states.hasItemTitle && <RichText.Content tagName="h4" className={itemClasses.title()} value={item.title} />}
					{states.hasItemLead && <RichText.Content tagName="p" className={itemClasses.lead()} value={item.lead} />}
					<CP.Link className={itemClasses.link()} attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/contactinfo", item)}>
						{states.hasIcon && <CP.OutputIcon className={itemClasses.link.icon()} item={attributes} />}
						<RichText.Content tagName="span" className={itemClasses.link.text()} value={item.link} />
					</CP.Link>
					{states.hasItemCaption && <RichText.Content tagName="small" className={itemClasses.caption()} value={item.caption} />}
				</li>
			);
		});

		return (
			<>
				<div {...useBlockProps.save({ className: classes() })}>
					{states.hasTitle && <RichText.Content tagName="h3" className={classes._title()} value={title} />}
					{states.hasLead && <RichText.Content tagName="p" className={classes._lead()} value={lead} />}
					<ul className={classes._items()}>{rtn}</ul>
					{states.hasLead && <RichText.Content tagName="small" className={classes._caption()} value={caption} />}
				</div>
				{doLoop && (
					<onEmpty>
						<InnerBlocks.Content />
					</onEmpty>
				)}
			</>
		);
	},
});
