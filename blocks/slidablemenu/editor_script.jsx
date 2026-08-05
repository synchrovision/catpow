const { __ } = wp.i18n;

CP.config.slidablemenu = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
};
wp.blocks.registerBlockType("catpow/slidablemenu", {
	title: "🐾 Slidable Menu",
	description: __("スクロール可能なメニュー。", "catpow"),
	icon: "list-view",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-slidablemenu medium";
					return wp.blocks.createBlock("catpow/slidablemenu", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { isTemplate, items = [], classes, columnsCount, loopCount, doLoop, AltMode = false } = attributes;
		const primaryClassName = "wp-block-catpow-slidablemenu";
		var classArray = _.uniq((className + " " + classes).split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.slidablemenu;

		const selectiveClasses = useMemo(() => {
			const { imageKeys } = CP.config.slidablemenu;
			const selectiveClasses = [
				{
					name: "size",
					type: "buttons",
					label: __("サイズ", "catpow"),
					values: ["small", "medium", "large"],
				},
				{
					name: "columnsCount",
					input: "range",
					label: __("カラム数", "catpow"),
					key: "columnsCount",
					min: 2,
					max: 10,
				},
				{
					name: "template",
					label: __("テンプレート", "catpow"),
					input: "bool",
					key: "isTemplate",
					sub: [
						{
							name: "loop",
							input: "bool",
							label: __("ループ", "catpow"),
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
									label: __("プレビューループ数", "catpow"),
									input: "range",
									key: "loopCount",
									min: 1,
									max: 64,
								},
							],
						},
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.slidablemenu.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
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
				<CP.Item tag="li" {...{ setAttributes, attributes }} itemKeys={["items", index]} key={i}>
					<div className="contents">
						<div className="image">
							<CP.SelectResponsiveImage attributes={attributes} setAttributes={setAttributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" isTemplate={isTemplate} />
						</div>
						<div className="texts">
							<RichText
								tagName="h4"
								className="title"
								onChange={(title) => {
									items[index].title = title;
									save();
								}}
								value={item.title}
								placeholder="Title"
								onFocus={() => {
									attributes.blockState.enableBlockFormat = false;
								}}
							/>
							<RichText
								tagName="div"
								className="text"
								onChange={(text) => {
									items[index].text = text;
									save();
								}}
								value={item.text}
								placeholder="Text"
								onFocus={() => {
									attributes.blockState.enableBlockFormat = false;
								}}
							/>
						</div>
					</div>
					{isSelected && (
						<div className="link">
							<p
								contentEditable={true}
								suppressContentEditableWarning={true}
								onBlur={(e) => {
									item.linkUrl = e.currentTarget.innerHTML;
									save();
								}}
							>
								{item.linkUrl}
							</p>
						</div>
					)}
				</CP.Item>,
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}
		const blockProps = useBlockProps({
			className: attributes.EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes,
			style: attributes.EditMode || (AltMode && doLoop) ? undefined : { "--columns": columnsCount },
		});

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{attributes.EditMode ? (
					<div {...blockProps}>
						<div className="label">
							<Icon icon="edit" />
						</div>
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{ type: "image", label: "image", keys: imageKeys.image },
								{ type: "text", key: "imageCode", cond: isTemplate },
								{ type: "text", key: "title" },
								{ type: "text", key: "text" },
								{ type: "text", key: "linkUrl" },
							]}
							isTemplate={isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<div className="label">
									<Icon icon="welcome-comments" />
								</div>
								<InnerBlocks />
							</div>
						) : (
							<div {...blockProps}>
								<ul className="items">{rtn}</ul>
							</div>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { isTemplate, items = [], classes = "", columnsCount, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.slidablemenu;

		let rtn = [];
		items.map((item, index) => {
			rtn.push(
				<li className={item.classes} key={index}>
					<div className="contents">
						<div className="image">
							<CP.ResponsiveImage attributes={attributes} keys={imageKeys.image} itemKeys={["items", index]} size="vga" isTemplate={isTemplate} />
						</div>
						<div className="texts">
							<RichText.Content tagName="h4" className="title" value={item.title} />
							<RichText.Content tagName="div" className="text" value={item.text} />
						</div>
						<a className="link" href={item.linkUrl}>
							{" "}
						</a>
					</div>
				</li>,
			);
		});

		return (
			<>
				<div {...useBlockProps.save({ className: classes, style: { "--columns": columnsCount } })}>
					<ul className="items">{rtn}</ul>
				</div>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
});
