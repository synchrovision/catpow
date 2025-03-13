wp.blocks.registerBlockType("catpow/formbuttons", {
	title: "🐾 FormButtons",
	description: "フォーム用のボタンです。",
	icon: "upload",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { items = [], classes = "" } = attributes;
		const primaryClass = "wp-block-catpow-formbuttons";
		var classArray = _.uniq((className + " " + classes).split(" "));
		var classNameArray = className.split(" ");

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = [
				{
					name: "size",
					label: "サイズ",
					filter: "size",
					values: { l: "大", m: "中", s: "小", ss: "極小" },
				},
				{ name: "inline", label: "インライン", values: "i" },
			];
			wp.hooks.applyFilters(
				"catpow.blocks.formbuttons.selectiveClasses",
				CP.finderProxy(selectiveClasses)
			);
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
					values: [
						"default",
						"primary",
						"secondary",
						"negative",
						"danger",
						"secure",
					],
				},
				{
					name: "icon",
					label: "アイコン",
					values: "hasIcon",
					sub: [{ input: "icon" }],
				},
				"event",
			];
			wp.hooks.applyFilters(
				"catpow.blocks.formbuttons.selectiveItemClasses",
				CP.finderProxy(selectiveItemClasses)
			);
			return selectiveItemClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		let rtn = [];

		items.map((item, index) => {
			if (!item.controlClasses) {
				item.controlClasses = "control";
			}
			const itemStates = CP.wordsToFlags(item.classes);
			rtn.push(
				<CP.Item
					tag="li"
					set={setAttributes}
					attr={attributes}
					items={items}
					index={index}
					isSelected={isSelected}
					key={index}
				>
					<div className="button">
						{itemStates.hasIcon && <CP.OutputIcon item={item} />}
						<span
							onInput={(e) => {
								item.text = e.target.innerText;
							}}
							onBlur={saveItems}
							contentEditable={true}
							suppressContentEditableWarning={true}
						>
							{item.text}
						</span>
						<span
							className="action"
							onInput={(e) => {
								item.action = e.target.innerText;
							}}
							onBlur={saveItems}
							contentEditable={true}
							suppressContentEditableWarning={true}
						>
							{item.action}
						</span>
					</div>
				</CP.Item>
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

		return (
			<>
				<ul className={classes}>{rtn}</ul>
				<InspectorControls>
					<CP.SelectClassPanel
						title="クラス"
						icon="art"
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
					<CP.SelectClassPanel
						title="ボタン"
						icon="edit"
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						selectiveClasses={selectiveItemClasses}
					/>
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl
							label="クラス"
							onChange={(clss) => setAttributes({ classes: clss })}
							value={classArray.join(" ")}
						/>
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
			</>
		);
	},
	save({ attributes, className }) {
		const { items = [], classes = "" } = attributes;
		var classArray = _.uniq(classes.split(" "));
		const blockType = wp.data
			.select("core/blocks")
			.getBlockType("catpow/formbuttons");

		let rtn = [];
		items.map((item, index) => {
			const itemStates = CP.wordsToFlags(item.classes);
			const eventDispatcherAttributes = {};
			if (blockType.attributes.items.eventDispatcherAttributes) {
				blockType.attributes.items.eventDispatcherAttributes.map(
					(attr_name) => {
						eventDispatcherAttributes[
							blockType.attributes.items.query[attr_name].attribute
						] = item[attr_name];
					}
				);
			}
			rtn.push(
				<li className={item.classes} key={index}>
					<div
						className="button"
						data-action={item.action}
						data-callback={item.callback}
						data-target={item.target}
						ignore-message={item.ignoreMessage}
						{...eventDispatcherAttributes}
					>
						{itemStates.hasIcon && <CP.OutputIcon item={item} />}
						{item.text}
					</div>
				</li>
			);
		});
		return <ul className={classes}>{rtn}</ul>;
	},
	deprecated: [
		{
			attributes: {
				version: { type: "number", default: 0 },
				classes: {
					source: "attribute",
					selector: "ul",
					attribute: "class",
					default: "wp-block-catpow-formbuttons buttons",
				},
				items: {
					source: "query",
					selector: "li.item",
					query: {
						classes: { source: "attribute", attribute: "class" },
						event: { source: "attribute", attribute: "data-event" },
						button: { source: "text" },
					},
					default: [{ classes: "item", button: "[button 送信 send]" }],
				},
			},
			save({ attributes, className }) {
				const { items = [], classes = "" } = attributes;
				var classArray = _.uniq(classes.split(" "));

				let rtn = [];
				items.map((item, index) => {
					rtn.push(
						<li className={item.classes} data-event={item.event}>
							{item.button}
						</li>
					);
				});
				return <ul className={classes}>{rtn}</ul>;
			},
			migrate(attributes) {
				const { items = [] } = attributes;
				const parseButtonShortCode = (code) => {
					let matches = code.match(
						/^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/
					);
					if (matches) {
						let rtn = { content: matches[1], action: matches[2] };
						if (matches[3]) {
							rtn.ignore_message = 1;
						}
						return rtn;
					}
					return { content: "送信" };
				};
				items.map((item) => {
					const buttonData = parseButtonShortCode(item.button);
					item.action = buttonData.action;
					item.text = buttonData.content;
					item.ignore_message = buttonData.ignore_message;
				});
				return attributes;
			},
		},
	],
});
