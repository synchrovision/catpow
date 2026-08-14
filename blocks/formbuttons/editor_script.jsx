const { __ } = wp.i18n;

const blockConfig = {
	linkKeys: {
		link: { href: "action", items: "items" },
	},
};
CP.config.formbuttons = blockConfig;

wp.blocks.registerBlockType("catpow/formbuttons", {
	title: "🐾 FormButtons",
	description: __("フォーム用のボタンです。", "catpow"),
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
			var selectiveClasses = [];
			wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = ["buttonParams"];
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
								return <CP.Button.Edit tag="li" className={item.classes} isItem={true} {...{ setAttributes, attributes }} itemKeys={["items", index]} keys={linkKeys.link} key={index} />;
							})}
						</ul>
					</CP.Bem>
				)}
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel
						title={__("ボタン", "catpow")}
						icon="edit"
						{...{ setAttributes, attributes }}
						itemKeys={["items", attributes.currentItemIndex]}
						selectiveClasses={selectiveItemClasses}
					/>
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

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul {...useBlockProps.save({ className: classes, style: vars })}>
					{items.map((item, index) => (
						<CP.Button
							tag="li"
							className={item.classes}
							isLink={false}
							{...{ attributes }}
							itemKeys={["items", index]}
							keys={blockConfig.linkKeys.link}
							data-action={item.action}
							data-callback={item.callback}
							data-target={item.target}
							ignore-message={item.ignoreMessage}
							{...CP.extractEventDispatcherAttributes("catpow/formbuttons", item)}
							key={index}
						/>
					))}
				</ul>
			</CP.Bem>
		);
	},
});
