const blockConfig = {
	linkKeys: {
		link: { href: "action", items: "items" },
	},
};
CP.config.formbuttons = blockConfig;

wp.blocks.registerBlockType("catpow/formbuttons", {
	title: "🐾 FormButtons",
	description: "フォーム用のボタンです。",
	icon: "upload",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], classes = "", EditMode = false } = attributes;
		const { linkKeys } = blockConfig;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = [
				"level",
				"contentWidth",
				"itemSize",
				{ name: "microcopy", label: "マイクロコピー", values: "hasMicroCopy" },
				{ name: "caption", label: "キャプション", values: "hasCaption" },
			];
			wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				"color",
				"rank",
				{
					name: "icon",
					label: "アイコン",
					values: "hasIcon",
					sub: [{ input: "icon" }],
				},
				"event",
			];
			wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({
			className: classes,
		});

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				{EditMode ? (
					<div {...blockProps} className="cp-altcontent">
						<div className="label">
							<Icon icon="edit" />
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "text", key: "copy", cond: states.hasMicroCopy },
								{ type: "text", key: "text", cond: true },
								{ type: "text", key: "caption", cond: states.hasCaption },
								{ type: "text", key: "action", cond: true },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<CP.Bem prefix="wp-block-catpow">
						<ul {...blockProps}>
							{items.map((item, index) => {
								if (!item.controlClasses) {
									item.controlClasses = "control";
								}
								const itemStates = CP.classNamesToFlags(item.classes);
								return (
									<CP.Item className={item.classes} tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
										{states.hasMicroCopy && (
											<span
												className="_copy"
												onInput={(e) => {
													item.copy = e.target.innerText;
												}}
												onBlur={(e) => {
													saveItems();
												}}
												contentEditable={true}
												suppressContentEditableWarning={true}
											>
												{item.copy}
											</span>
										)}
										<CP.Link.Edit className="-button" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index}>
											{itemStates.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
											<span
												className="_text"
												onInput={(e) => {
													item.text = e.target.innerText;
												}}
												onBlur={saveItems}
												contentEditable={true}
												suppressContentEditableWarning={true}
											>
												{item.text}
											</span>
										</CP.Link.Edit>
										{states.hasCaption && (
											<span
												className="_caption"
												onInput={(e) => {
													item.caption = e.target.innerText;
												}}
												onBlur={(e) => {
													saveItems();
												}}
												contentEditable={true}
												suppressContentEditableWarning={true}
											>
												{item.caption}
											</span>
										)}
									</CP.Item>
								);
							})}
						</ul>
					</CP.Bem>
				)}
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="ボタン" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
			</>
		);
	},
	save({ attributes }) {
		const { items = [], classes = "" } = attributes;
		const blockType = wp.data.select("core/blocks").getBlockType("catpow/formbuttons");

		const states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul className={classes}>
					{items.map((item, index) => {
						const itemStates = CP.classNamesToFlags(item.classes);
						const eventDispatcherAttributes = {};
						if (blockType.attributes.items.eventDispatcherAttributes) {
							blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
								eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
							});
						}
						return (
							<li className={item.classes} key={index}>
								{states.hasMicroCopy && <span className="_copy">{item.copy}</span>}
								<div
									className="-button"
									role="button"
									data-action={item.action}
									data-callback={item.callback}
									data-target={item.target}
									ignore-message={item.ignoreMessage}
									{...eventDispatcherAttributes}
								>
									{itemStates.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
									<span className="_text">{item.text}</span>
								</div>
								{states.hasCaption && <span className="_caption">{item.caption}</span>}
							</li>
						);
					})}
				</ul>
			</CP.Bem>
		);
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
						</li>,
					);
				});
				return <ul className={classes}>{rtn}</ul>;
			},
			migrate(attributes) {
				const { items = [] } = attributes;
				const parseButtonShortCode = (code) => {
					let matches = code.match(/^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/);
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
