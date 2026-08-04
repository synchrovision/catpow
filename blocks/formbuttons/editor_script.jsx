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
		const { isTemplate, items = [], classes = "", vars, EditMode = false } = attributes;
		const { linkKeys } = blockConfig;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = [
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

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{ type: "text", key: "copy", cond: states.hasMicroCopy },
								{ type: "text", key: "text", cond: true },
								{ type: "text", key: "caption", cond: states.hasCaption },
								{ type: "text", key: "action", cond: true },
							]}
							isTemplate={isTemplate}
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
									<CP.Item className={item.classes} tag="li" {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
										{states.hasMicroCopy && (
											<span
												className="_copy cp-button__copy"
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
										<CP.Link.Edit className="-button cp-button__link" attributes={attributes} setAttributes={setAttributes} keys={linkKeys.link} itemKeys={["items", index]}>
											{itemStates.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
											<span
												className="_text cp-button__link-text"
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
												className="_caption cp-button__caption"
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
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="ボタン" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<BlockControls>
					<CP.AlignClassToolbar setAttributes={setAttributes} attributes={attributes} />
				</BlockControls>
			</>
		);
	},
	save({ attributes }) {
		const { useBlockProps } = wp.blockEditor;
		const { items = [], classes = "", vars } = attributes;
		const blockType = wp.data.select("core/blocks").getBlockType("catpow/formbuttons");

		const states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul {...useBlockProps.save({ className: classes, style: vars })}>
					{items.map((item, index) => {
						const itemStates = CP.classNamesToFlags(item.classes);
						return (
							<li className={item.classes} key={index}>
								{states.hasMicroCopy && <span className="_copy cp-button__copy">{item.copy}</span>}
								<div
									className="-button cp-button__link"
									role="button"
									data-action={item.action}
									data-callback={item.callback}
									data-target={item.target}
									ignore-message={item.ignoreMessage}
									{...CP.extractEventDispatcherAttributes("catpow/formbuttons", item)}
								>
									{itemStates.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={item} />}
									<span className="_text cp-button__link-text">{item.text}</span>
								</div>
								{states.hasCaption && <span className="_caption cp-button__caption">{item.caption}</span>}
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
