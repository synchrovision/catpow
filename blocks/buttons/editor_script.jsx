const blockConfig = {
	linkKeys: {
		link: { href: "url", items: "items" },
	},
};
CP.config.buttons = blockConfig;

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
		const { useMemo } = wp.element;
		const { BlockControls, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { attributes, setAttributes, isSelected } = props;
		const { items = [], classes, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const { linkKeys } = blockConfig;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"contentWidth",
				"itemSize",
				{ name: "microcopy", label: "マイクロコピー", values: "hasMicroCopy" },
				{ name: "caption", label: "キャプション", values: "hasCaption" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.buttons.selectiveClasses", CP.finderProxy(selectiveClasses));
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
			wp.hooks.applyFilters("catpow.blocks.buttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const saveItems = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({
			className: classes,
			style: vars,
		});

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
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<>
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
								<CP.Bem prefix="wp-block-catpow">
									<ul {...blockProps}>
										{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
											const index = i % items.length;
											const item = items[index];
											const itemStates = CP.classNamesToFlags(item.classes);
											return (
												<CP.Item tag="li" className={item.classes} set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
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
															onBlur={(e) => {
																saveItems();
															}}
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
						</>
					)}
				</>
			</>
		);
	},
	save(props) {
		const { InnerBlocks } = wp.blockEditor;
		const { attributes } = props;
		const { items = [], classes, vars, doLoop } = attributes;
		const states = CP.classNamesToFlags(classes);
		const blockType = wp.data.select("core/blocks").getBlockType("catpow/buttons");
		let rtn = [];
		items.map((item, index) => {
			const itemStates = CP.classNamesToFlags(item.classes);
			const eventDispatcherAttributes = {};
			if (blockType.attributes.items.eventDispatcherAttributes) {
				blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
					eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
				});
			}
			const shouldOpenWithOtherWindow = /^\w+:\/\//.test(item.url);
			rtn.push(
				<li className={item.classes} key={index}>
					{states.hasMicroCopy && <span className="_copy">{item.copy}</span>}
					<a href={item.url} className="-button" target={shouldOpenWithOtherWindow ? "_blank" : null} rel={shouldOpenWithOtherWindow ? "noopener" : null} {...eventDispatcherAttributes}>
						{itemStates.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
						<span className="_text">{item.text}</span>
					</a>
					{states.hasCaption && <span className="_caption">{item.caption}</span>}
				</li>,
			);
		});
		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul className={classes} style={vars}>
						{rtn}
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
	deprecated: [
		{
			save({ attributes, className }) {
				const { items = [], classes, loopParam } = attributes;
				const states = CP.classNamesToFlags(classes);

				let rtn = [];
				items.map((item, index) => {
					const itemStates = CP.classNamesToFlags(item.classes);
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
						</li>,
					);
				});
				return (
					<ul className={classes}>
						{states?.doLoop && "[loop_template " + loopParam + "]"}
						{rtn}
						{states?.doLoop && "[/loop_template]"}
					</ul>
				);
			},
			migrate(attributes) {
				var states = CP.classNamesToFlags(classes);
				attributes.content_path = attributes.loopParam.split(" ")[0];
				attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
				attributes.doLoop = states?.doLoop;
				return attributes;
			},
		},
	],
});
