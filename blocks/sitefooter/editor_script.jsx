const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/sitefooter", {
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, className, setAttributes, context }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { classes = "", contentsClasses, copyrightClasses } = attributes;
		const { Fragment } = wp.element;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ preset: "colorScheme", label: __("コンテンツ配色", "catpow"), classKey: "contentsClasses" },
				{ preset: "backgroundColor", label: __("コンテンツ背景色", "catpow"), classKey: "contentsClasses" },
				{ preset: "colorScheme", label: __("コピーライト配色", "catpow"), classKey: "copyrightClasses" },
				{ preset: "backgroundColor", label: __("コピーライト背景色", "catpow"), classKey: "copyrightClasses" },
			];
			wp.hooks.applyFilters("catpow.blocks.sitefooter.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ id: "SiteFooter", className: classes })}>
						<div className={contentsClasses}>
							<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
						</div>
						<RichText tagName="div" className={copyrightClasses} value={attributes.copyright} onChange={(copyright) => setAttributes({ copyright })} />
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { classes = "", contentsClasses, copyrightClasses } = attributes;

		const states = CP.classNamesToFlags(classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...useBlockProps.save({ id: "SiteFooter", className: classes })}>
					<div className={contentsClasses}>
						<InnerBlocks.Content />
					</div>
					<RichText.Content tagName="div" className={copyrightClasses} value={attributes.copyright} />
				</div>
			</CP.Bem>
		);
	},
});
