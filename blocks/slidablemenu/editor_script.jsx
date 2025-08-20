CP.config.slidablemenu = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
};
wp.blocks.registerBlockType("catpow/slidablemenu", {
	title: "🐾 Slidable Menu",
	description: "スクロール可能なメニュー。",
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
		const { BlockControls, InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
		const { items = [], classes, columnsCount, loopCount, doLoop, AltMode = false } = attributes;
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
					label: "サイズ",
					values: ["small", "medium", "large"],
				},
				{
					name: "columnsCount",
					input: "range",
					label: "カラム数",
					key: "columnsCount",
					min: 2,
					max: 10,
				},
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
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={i}>
					<div className="contents">
						<div className="image">
							<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} size="vga" isTemplate={states.isTemplate} />
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
				</CP.Item>
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
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
								{ type: "text", key: "text" },
								{ type: "text", key: "linkUrl" },
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
							<div className={classes} style={{ "--columns": columnsCount }}>
								<ul className="items">{rtn}</ul>
							</div>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { items = [], classes = "", columnsCount, doLoop } = attributes;
		var classArray = _.uniq(classes.split(" "));

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.slidablemenu;

		let rtn = [];
		items.map((item, index) => {
			rtn.push(
				<li className={item.classes} key={index}>
					<div className="contents">
						<div className="image">
							<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} size="vga" isTemplate={states.isTemplate} />
						</div>
						<div className="texts">
							<RichText.Content tagName="h4" className="title" value={item.title} />
							<RichText.Content tagName="div" className="text" value={item.text} />
						</div>
						<a className="link" href={item.linkUrl}>
							{" "}
						</a>
					</div>
				</li>
			);
		});

		return (
			<>
				<div className={classes} style={"--columns:" + columnsCount}>
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
