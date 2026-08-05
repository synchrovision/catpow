const { __ } = wp.i18n;

CP.config.sticky = {
	imageKeys: {
		openButtonImage: { src: "openButtonImageSrc" },
		closeButtonImage: { src: "closeButtonImageSrc" },
	},
	imageSizes: {
		image: "vga",
	},
};
wp.blocks.registerBlockType("catpow/sticky", {
	title: "🐾 Sticky",
	description: __("スクロールに追従するコンテンツを配置します。", "catpow"),
	icon: "menu",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sticky topLeft small label" },

		labelText: { source: "html", selector: ".content>.label", defalt: __("ラベル", "catpow") },

		openButtonImageSrc: { source: "attribute", selector: ".wp-block-catpow-sticky>.stickyButton [src].open", attribute: "src", default: wpinfo.theme_url + "/images/dummy_icon.svg" },
		closeButtonImageSrc: { source: "attribute", selector: ".wp-block-catpow-sticky>.stickyButton [src].close", attribute: "src", default: wpinfo.theme_url + "/images/dummy_icon.svg" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, labelText } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.sticky;

		const selectiveClasses = useMemo(() => {
			const { imageKeys } = CP.config.sticky;
			const selectiveClasses = [
				{ name: "position", label: __("位置", "catpow"), input: "position", disable: ["left", "center", "right"] },
				{ name: "size", label: __("サイズ", "catpow"), filter: "size", values: { full: __("全面", "catpow"), large: __("大", "catpow"), medium: __("中", "catpow"), small: __("小", "catpow") } },
				{
					name: "type",
					label: __("タイプ", "catpow"),
					filter: "type",
					values: { label: __("ラベル", "catpow"), container: __("コンテナ", "catpow"), collapsible: __("折り畳み", "catpow") },
					sub: {
						label: ["color"],
						collapsible: [
							"color",
							{
								name: "button",
								label: __("ボタン", "catpow"),
								values: { pullButton: __("引き出し", "catpow"), menuButton: __("メニュー", "catpow"), labelButton: __("ラベル", "catpow"), imageButton: __("画像", "catpow") },
								sub: {
									imageButton: [
										{ label: "open", input: "image", keys: imageKeys.openButtonImage, size: "thumbnail" },
										{ label: "close", input: "image", keys: imageKeys.closeButtonImage, size: "thumbnail" },
									],
								},
							},
						],
					},
				},
			];
			wp.hooks.applyFilters("catpow.blocks.sticky.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps({ className: classes })}>
					{states.collapsible && (
						<div className="stickyButton">
							<div className="stickyButtonIcon">
								{states.labelButton && (
									<div className="label">
										<RichText
											onChange={(labelText) => {
												setAttributes({ labelText });
											}}
											value={labelText}
										/>
									</div>
								)}
								{states.imageButton && [
									<ResponsiveImage className="open" attributes={attributes} keys={imageKeys.openButtonImage} />,
									<ResponsiveImage className="close" attributes={attributes} keys={imageKeys.closeButtonImage} />,
								]}
							</div>
						</div>
					)}
					<div className="content">
						{states.label && (
							<div className="label">
								<RichText
									onChange={(labelText) => {
										setAttributes({ labelText });
									}}
									value={labelText}
								/>
							</div>
						)}
						{(states.container || states.collapsible) && <InnerBlocks />}
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label={__("クラス", "catpow")} onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes = "", labelText } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { imageKeys } = CP.config.sticky;

		return (
			<div {...useBlockProps.save({ className: classes })}>
				{states.collapsible && (
					<div className="stickyButton">
						<div className="stickyButtonIcon">
							{states.labelButton && (
								<div className="label">
									<RichText.Content value={labelText} />
								</div>
							)}
							{states.imageButton && [
								<ResponsiveImage className="open" attributes={attributes} keys={imageKeys.openButtonImage} />,
								<ResponsiveImage className="close" attributes={attributes} keys={imageKeys.closeButtonImage} />,
							]}
						</div>
					</div>
				)}
				<div className="content">
					{states.label && (
						<div className="label">
							<RichText.Content value={labelText} />
						</div>
					)}
					{(states.container || states.collapsible) && <InnerBlocks.Content />}
				</div>
			</div>
		);
	},
	deplicated: [
		{
			save({ attributes, className, setAttributes }) {
				const { useBlockProps } = wp.blockEditor;
				const { classes = "", labelText } = attributes;

				const states = CP.classNamesToFlags(classes);
				const { imageKeys } = CP.config.sticky;

				return (
					<div {...useBlockProps.save({ className: classes })}>
						{states.collapsible && (
							<div className="stickyMenuButton">
								<div className="stickyMenuButtonIcon">
									{states.labelButton && (
										<div className="label">
											<RichText.Content value={labelText} />
										</div>
									)}
									{states.imageButton && [
										<ResponsiveImage className="open" attributes={attributes} keys={imageKeys.openButtonImage} />,
										<ResponsiveImage className="close" attributes={attributes} keys={imageKeys.closeButtonImage} />,
									]}
								</div>
							</div>
						)}
						<div className="content">
							{states.label && (
								<div className="label">
									<RichText.Content value={labelText} />
								</div>
							)}
							{(states.container || states.collapsible) && <InnerBlocks.Content />}
						</div>
					</div>
				);
			},
		},
	],
});

wp.blocks.registerBlockType("catpow/stickycontent", {
	apiVersion: 3,
	title: "🐾 StickyContent",
	icon: "editor-code",
	category: "catpow",
	parent: ["catpow/sticky"],
	edit({ attributes, className, setAttributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		return [
			<div {...useBlockProps({ className: "sticky_content" })}>
				<InnerBlocks template={[["core/paragraph"]]} templateLock={false} />
			</div>,
		];
	},
	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		return (
			<div {...useBlockProps.save({ className: "sticky_content" })}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
