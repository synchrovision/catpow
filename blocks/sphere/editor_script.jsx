CP.config.sphere = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" },
	},
};
wp.blocks.registerBlockType("catpow/sphere", {
	title: "🐾 Sphere",
	description: "丸型のアイテムリストブロックです。",
	icon: "image-filter",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-sphere medium has-subtitle has-text";
					return wp.blocks.createBlock("catpow/sphere", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix, EditMode = false } = attributes;
		const primaryClass = "wp-block-catpow-sphere";

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.sphere;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				"level",
				"hasContentWidth",
				"hasMargin",
				"itemSize",
				"color",
				"colorScheme",
				{ name: "image", label: "画像", values: "hasImage" },
				{ name: "icon", label: "アイコン", values: "hasIcon" },
				{ name: "catpion", label: "キャプション", values: "hasCaption" },
				{ name: "text", label: "テキスト", values: "hasText" },
			];
			wp.hooks.applyFilters("catpow.blocks.sphere.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				"color",
				{
					preset: "icon",
					cond: () => states.hasIcon,
				},
			];
			wp.hooks.applyFilters("catpow.blocks.sphere.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, [classes]);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

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
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel
						title="アイテム"
						icon="edit"
						{...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]}
						selectiveClasses={selectiveItemClasses}
						initialOpen={true}
					/>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<ul {...useBlockProps({ className: classes, style: vars })}>
						{items.map((item, index) => {
							const itemStates = CP.classNamesToFlags(item.classes);
							return (
								<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
									{states.hasImage && (
										<div className="_image">
											<CP.SelectResponsiveImage className="_img" attributes={attributes} setAttributes={setAttributes} keys={imageKeys.image} index={index} size="large" />
										</div>
									)}
									<div className="_texts">
										{states.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
										<RichText
											tagName={HeadingTag}
											className="_title"
											onChange={(title) => {
												items[index].title = title;
												save();
											}}
											value={item.title}
											placeholder="Title"
										/>
										{states.hasCaption && (
											<RichText
												tagName="p"
												className="_caption"
												onChange={(caption) => {
													items[index].caption = caption;
													save();
												}}
												value={item.caption}
												placeholder="Caption"
											/>
										)}
										{states.hasText && (
											<RichText
												tagName="p"
												className="_text"
												onChange={(text) => {
													items[index].text = text;
													save();
												}}
												value={item.text}
												placeholder="Text"
											/>
										)}
									</div>
								</CP.Item>
							);
						})}
					</ul>
				</CP.Bem>
			</>
		);
	},
	save({ attributes, className }) {
		const { RichText } = wp.blockEditor;
		const { items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix } = attributes;

		const states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<ul className={classes} style={vars}>
					{items.map((item, index) => {
						return (
							<li className={item.classes} key={index}>
								{states.hasImage && (
									<div className="_image">
										<img src={item.src} alt={item.alt} />
									</div>
								)}
								<div className="_texts">
									{states.hasIcon && <CP.OutputIcon className="_icon" item={item} />}
									<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
									{states.catption && <RichText.Content tagName="p" calssName="_caption" value={item.caption} />}
									{states.hasText && <RichText.Content tagName="p" className="_text" value={item.text} />}
								</div>
							</li>
						);
					})}
				</ul>
			</CP.Bem>
		);
	},
});
