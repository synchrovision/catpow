const { __ } = wp.i18n;
CP.config.pageheader = {
	devices: ["sp", "tb"],
};
wp.blocks.registerBlockType("catpow/pageheader", {
	title: "🐾 PageHeader",
	description: __("ページの最初に表示するヘッダのブロックです。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { vars } = attributes;
		const { useMemo } = wp.element;
		const { InspectorControls, RichText } = wp.blockEditor;
		const states = CP.classNamesToFlags(attributes.classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"size",
				{ name: "breadcrumb", label: __("パンくずリスト", "catpow"), values: "hasBreadcrumb" },
				"color",
				"colorScheme",
				"backgroundColor",
				"backgroundImage",
				"backgroundPattern",
				{
					name: "template",
					label: __("テンプレート", "catpow"),
					values: "isTemplate",
					sub: [
						{
							input: "text",
							label: __("背景画像コード", "catpow"),
							key: "backgroundImageCode",
							cond: "hasBackgroundImage",
						},
					],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.pageheader.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<CP.Bem prefix="wp-block-catpow">
					<div className={attributes.classes} style={vars}>
						<div className="_body">
							<RichText
								tagName="h1"
								className="_title"
								onChange={(title) => {
									setAttributes({ title });
								}}
								value={attributes.title}
							/>
							{states.hasBreadcrumb && <CP.ServerSideRenderPart.Preview name="breadcrumb" className="_breadcrumb" container_class="wp-block-catpow-pageheader__body-breadcrumb-body" />}
						</div>
					</div>
				</CP.Bem>
			</>
		);
	},

	save({ attributes }) {
		const { vars } = attributes;
		const { RichText } = wp.blockEditor;
		const states = CP.classNamesToFlags(attributes.classes);

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div className={attributes.classes} style={vars}>
					<div className="_body">
						<RichText.Content tagName="h1" className="_title" value={attributes.title} />
						{states.hasBreadcrumb && <CP.ServerSideRenderPart name="breadcrumb" className="_breadcrumb" container_class="wp-block-catpow-pageheader__body-breadcrumb-body" />}
					</div>
				</div>
			</CP.Bem>
		);
	},
});
