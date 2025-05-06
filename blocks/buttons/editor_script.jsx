wp.blocks.registerBlockType("catpow/buttons", {
	title: "🐾 Buttons",
	description: "ボタンのブロックです。",
	icon: (
		<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M19.5,11c0,2.8-2.2,5-5,5h-9c-2.8,0-5-2.2-5-5V9c0-2.8,2.2-5,5-5h9c2.8,0,5,2.2,5,5V11z M5.5,5c-2.2,0-4,1.8-4,4
				c0,2.2,1.8,4,4,4h9c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H5.5z"
			/>
		</svg>
	),
	category: "catpow",
	example: CP.example,
	edit(props) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InnerBlocks, InspectorControls } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { attributes, className, setAttributes, isSelected } = props;
		const { items = [], classes, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const primaryClass = "wp-block-catpow-buttons";
		var classArray = _.uniq((className + " " + classes).split(" "));
		var classNameArray = className.split(" ");

		const states = CP.wordsToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "size",
					type: "buttons",
					label: "サイズ",
					filter: "size",
					values: { l: "大", m: "中", s: "小", ss: "極小" },
				},
				{ name: "inline", label: "インライン", values: "i" },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [
						{
							input: "bool",
							label: "ループ",
							key: "doLoop",
							sub: [
								{ label: "content path", input: "text", key: "content_path" },
								{ label: "query", input: "textarea", key: "query" },
								{
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
			wp.hooks.applyFilters("catpow.blocks.buttons.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				"color",
				{
					name: "rank",
					type: "gridbuttons",
					label: "属性",
					filter: "rank",
					values: ["default", "primary", "secondary", "negative", "danger", "secure"],
				},
				{
					name: "icon",
					label: "アイコン",
					values: "hasIcon",
					sub: [{ input: "icon" }],
				},
				"event",
			];
			wp.hooks.applyFilters("catpow.blocks.buttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		let rtn = [];

		items.map((item, index) => {
			const itemStates = CP.wordsToFlags(item.classes);
			rtn.push(
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
					<div className="button">
						{itemStates.hasIcon && <CP.OutputIcon item={item} />}
						<span
							onInput={(e) => {
								item.text = e.target.innerText;
							}}
							onBlur={(e) => {
								saveItems();
							}}
							contentEditable={true}
							suppressContentEditableWarning={true}
						>
							{item.text}
						</span>
						{isSelected && (
							<span
								className="url"
								onInput={(e) => {
									item.url = e.target.innerText;
								}}
								onBlur={(e) => {
									saveItems();
								}}
								contentEditable={true}
								suppressContentEditableWarning={true}
							>
								{item.url}
							</span>
						)}
					</div>
				</CP.Item>
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}
		if (rtn.length < loopCount) {
			let len = rtn.length;
			while (rtn.length < loopCount) {
				rtn.push(rtn[rtn.length % len]);
			}
		}

		return (
			<>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="ボタン" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(clss) => setAttributes({ classes: clss })} value={classArray.join(" ")} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<>
					{EditMode ? (
						<div className="cp-altcontent">
							<div className="label">
								<Icon icon="edit" />
							</div>
							<CP.EditItemsTable
								set={setAttributes}
								attr={attributes}
								columns={[
									{ type: "text", key: "text", cond: true },
									{ type: "text", key: "url", cond: true },
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
								<ul className={classes}>{rtn}</ul>
							)}
						</>
					)}
				</>
			</>
		);
	},
	save(props) {
		const { InnerBlocks } = wp.blockEditor;
		const { attributes, className } = props;
		const { items = [], classes, loopParam, doLoop } = attributes;
		const states = CP.wordsToFlags(classes);
		const blockType = wp.data.select("core/blocks").getBlockType("catpow/buttons");
		let rtn = [];
		items.map((item, index) => {
			const itemStates = CP.wordsToFlags(item.classes);
			const eventDispatcherAttributes = {};
			if (blockType.attributes.items.eventDispatcherAttributes) {
				blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
					eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
				});
			}
			const shouldOpenWithOtherWindow = /^\w+:\/\//.test(item.url);
			rtn.push(
				<li className={item.classes} key={index}>
					<a href={item.url} className="button" target={shouldOpenWithOtherWindow ? "_blank" : null} rel={shouldOpenWithOtherWindow ? "noopener" : null} {...eventDispatcherAttributes}>
						{itemStates.hasIcon && <CP.OutputIcon item={item} />}
						{item.text}
					</a>
				</li>
			);
		});
		return (
			<>
				<ul className={classes}>{rtn}</ul>
				{doLoop && (
					<onEmpty>
						<InnerBlocks.Content />
					</onEmpty>
				)}
			</>
		);
	},
	deprecated: [
		{
			save({ attributes, className }) {
				const { items = [], classes, loopParam } = attributes;
				const states = CP.wordsToFlags(classes);

				let rtn = [];
				items.map((item, index) => {
					const itemStates = CP.wordsToFlags(item.classes);
					rtn.push(
						<li className={item.classes}>
							<a href={item.url} className="button" data-event={item.event}>
								{itemStates.hasIcon && (
									<span className="icon">
										<img src={item.iconSrc} alt={item.iconAlt} />
									</span>
								)}
								{item.text}
							</a>
						</li>
					);
				});
				return (
					<ul className={classes}>
						{states.doLoop && "[loop_template " + loopParam + "]"}
						{rtn}
						{states.doLoop && "[/loop_template]"}
					</ul>
				);
			},
			migrate(attributes) {
				var states = CP.wordsToFlags(classes);
				attributes.content_path = attributes.loopParam.split(" ")[0];
				attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
				attributes.doLoop = states.doLoop;
				return attributes;
			},
		},
	],
});
