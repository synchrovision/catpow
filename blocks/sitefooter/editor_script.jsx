const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/sitefooter", {
	title: "🐾 SiteFooter",
	description: __("サイト共通フッタのブロックです。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	attributes: {
		classes: { source: "attribute", selector: ".wp-block-catpow-sitefooter", attribute: "class", default: "wp-block-catpow-sitefooter is-level3" },
		contentsClasses: { source: "attribute", selector: ".wp-block-catpow-sitefooter__contents", attribute: "class", default: "wp-block-catpow-sitefooter__contents" },
		copyrightClasses: { source: "attribute", selector: ".wp-block-catpow-sitefooter__copyright", attribute: "class", default: "wp-block-catpow-sitefooter__copyright" },
		copyright: { source: "text", selector: ".wp-block-catpow-sitefooter__copyright", default: "powered by wordpress" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, context }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { classes = "", contentsClasses, copyrightClasses } = attributes;
		const { Fragment } = wp.element;

		const states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				{ preset: "colorScheme", label: "コンテンツ配色", classKey: "contentsClasses" },
				{ preset: "backgroundColor", label: "コンテンツ背景色", classKey: "contentsClasses" },
				{ preset: "colorScheme", label: "コピーライト配色", classKey: "copyrightClasses" },
				{ preset: "backgroundColor", label: "コピーライト背景色", classKey: "copyrightClasses" },
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
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
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
