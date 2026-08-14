const { __ } = wp.i18n;

const blockConfig = {
	linkKeys: {
		link: { href: "href", items: "items" },
	},
};
CP.config.buttons = blockConfig;

wp.blocks.registerBlockType("catpow/buttons", {
	title: "🐾 Buttons",
	description: __("ボタンのブロックです。", "catpow"),
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
		const { isTemplate, items = [], classes, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
		const { linkKeys } = blockConfig;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["isTemplate"];
			wp.hooks.applyFilters("catpow.blocks.buttons.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = ["buttonParams"];
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
					<CP.AlignClassToolbar setAttributes={setAttributes} attributes={attributes} />
				</BlockControls>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel
						title={__("ボタン", "catpow")}
						icon="edit"
						{...{ setAttributes, attributes }}
						itemKeys={["items", attributes.currentItemIndex]}
						selectiveClasses={selectiveItemClasses}
					/>
				</InspectorControls>
				<>
					{EditMode ? (
						<div {...blockProps} className="cp-altcontent">
							<div className="label">
								<Icon icon="edit" />
							</div>
							<CP.EditItemsTable
								setAttributes={setAttributes}
								attributes={attributes}
								columns={[
									{ type: "text", key: "copy", cond: states.hasMicroCopy },
									{ type: "text", key: "text", cond: true },
									{ type: "text", key: "caption", cond: states.hasCaption },
									{ type: "text", key: "url", cond: true },
								]}
								isTemplate={isTemplate}
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
											return <CP.Button.Edit tag="li" className={item.classes} isItem={true} {...{ setAttributes, attributes, states }} itemKeys={["items", index]} keys={linkKeys.link} key={index} />;
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

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<ul className={classes} style={vars}>
						{items.map((item, index) => (
							<CP.Button
								tag="li"
								className={item.classes}
								{...{ attributes, states }}
								itemKeys={["items", index]}
								keys={blockConfig.linkKeys.link}
								{...CP.extractEventDispatcherAttributes("catpow/buttons", item)}
								key={index}
							/>
						))}
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
});
