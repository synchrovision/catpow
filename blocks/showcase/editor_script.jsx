const blockConfig = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};
CP.config.showcase = blockConfig;

wp.blocks.registerBlockType("catpow/showcase", {
	title: "🐾 showcase",
	description: "画像とテキストを並べて表示します。",
	icon: "columns",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-showcase hasCounter";
					return wp.blocks.createBlock("catpow/showcase", attributes);
				},
			},
			{
				type: "block",
				blocks: ["catpow/datatable"],
				isMatch: ({ rows }) => {
					const block = wp.data.select("core/blocks").getBlockType("catpow/showcase");
					return CP.isRowsConvertibleToItems(rows, block.attributes.items);
				},
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-showcase hasCounter";
					const block = wp.data.select("core/blocks").getBlockType("catpow/showcase");
					attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
					return wp.blocks.createBlock("catpow/showcase", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { items = [], classes, TitleTag, countPrefix, countSuffix, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-showcase";
		var classArray = _.uniq((className + " " + classes).split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.showcase;

		const selectiveClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveClasses = [
				"color",
				"colorScheme",
				{
					name: "counter",
					label: "番号",
					values: "hasCounter",
					sub: [
						{
							name: "countPrefix",
							input: "text",
							label: "番号前置テキスト",
							key: "countPrefix",
						},
						{
							name: "countSuffix",
							input: "text",
							label: "番号後置テキスト",
							key: "countSuffix",
						},
					],
				},
				{
					name: "titleCaption",
					label: "タイトルキャプション",
					values: "hasTitleCaption",
				},
				{
					name: "size",
					type: "buttons",
					label: "サイズ",
					values: ["small", "medium", "large"],
				},
				{ name: "link", label: "リンク", values: "hasLink" },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [
						{
							name: "loop",
							input: "bool",
							label: "ループ",
							key: "doLoop",
							sub: [
								{
									name: "contentPath",
									label: "content path",
									input: "text",
									key: "content_path",
								},
								{
									name: "query",
									label: "query",
									input: "textarea",
									key: "query",
								},
								{
									name: "loopCount",
									label: "プレビューループ数",
									input: "range",
									key: "loopCount",
									min: 1,
									max: 16,
								},
							],
						},
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.showcase;
			const selectiveItemClasses = ["color", { name: "image", input: "image", label: "画像", keys: imageKeys.image }, "event"];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const selectiveItemTemplateClasses = useMemo(() => {
			const selectiveItemTemplateClasses = [
				{
					name: "imageCode",
					input: "text",
					label: "画像コード",
					key: "imageCode",
				},
			];
			wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		}, []);

		let rtn = [];
		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};
		[...Array(Math.max(items.length, loopCount)).keys()].forEach((i) => {
			const index = i % items.length;
			const item = items[index];
			if (!item.controlClasses) {
				item.controlClasses = "control";
			}
			rtn.push(
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
					<div className="image">
						<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="full" isTemplate={states.isTemplate} />
					</div>
					<div className="texts">
						{states.hasCounter && (
							<div className="counter">
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index + 1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						)}
						<RichText
							tagName={TitleTag}
							className="title"
							onChange={(text) => {
								items[index].title = text;
								save();
							}}
							value={item.title}
						/>
						{states.hasTitleCaption && (
							<RichText
								tagName="p"
								className="titleCaption"
								onChange={(text) => {
									items[index].titleCaption = text;
									save();
								}}
								value={item.titleCaption}
							/>
						)}
						<div
							className="text"
							onFocus={() => {
								attributes.blockState.enableBlockFormat = true;
							}}
						>
							<RichText
								onChange={(text) => {
									items[index].text = text;
									save();
								}}
								value={item.text}
							/>
						</div>
						{states.hasLink && (
							<CP.Link.Edit className="link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index} isSelected={isSelected}>
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
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

		const blockProps = useBlockProps({ className: classes });

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
					{states.isTemplate ? (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					) : (
						<CP.SelectClassPanel title="アイテム" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{attributes.EditMode ? (
					<div className="cp-altcontent">
						<div className="label">
							<Icon icon="edit" />
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "image", label: "image", keys: imageKeys.image },
								{ type: "text", key: "imageCode", cond: states.isTemplate },
								{ type: "text", key: "title" },
								{
									type: "text",
									key: "titleCaption",
									cond: states.hasTitleCaption,
								},
								{ type: "text", key: "text" },
								{ type: "text", key: "linkText", cond: states.hasLink },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
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
							<ul {...blockProps}>{rtn}</ul>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", TitleTag, countPrefix, countSuffix, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys, linkKeys } = CP.config.showcase;

		let rtn = [];
		items.forEach((item, index) => {
			rtn.push(
				<li className={item.classes} key={index}>
					<div className="image">
						<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
					</div>
					<div className="texts">
						{states.hasCounter && (
							<div className="counter">
								{countPrefix && <span className="prefix">{countPrefix}</span>}
								<span className="number">{index + 1}</span>
								{countSuffix && <span className="suffix">{countSuffix}</span>}
							</div>
						)}
						<RichText.Content tagName={TitleTag} className="title" value={item.title} />
						{states.hasTitleCaption && <RichText.Content tagName="p" className="titleCaption" value={item.titleCaption} />}
						<div className="text">
							<RichText.Content value={item.text} />
						</div>
						{states.hasLink && (
							<CP.Link className="link" attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/banners", item)}>
								<RichText.Content value={item.linkText} />
							</CP.Link>
						)}
					</div>
				</li>
			);
		});
		return (
			<>
				<ul {...useBlockProps.save({ className: classes })}>{rtn}</ul>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
});
