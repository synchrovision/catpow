const { __ } = wp.i18n;
CP.config.pageheader = {
	devices: ["sp", "tb"],
	imageKeys: {
		backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" },
	},
};
wp.blocks.registerBlockType("catpow/pageheader", {
	title: "🐾 PageHeader",
	description: __("ページの最初に表示するヘッダのブロックです。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, setAttributes, className, clientId }) {
		const { vars, title, backgroundImageCode } = attributes;
		const { useMemo } = wp.element;
		const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { serverSideRender: ServerSideRender } = wp;
		const { content_path, query, config, EditMode = false } = attributes;
		const { devices, imageKeys } = CP.config.pageheader;
		const { bem } = Catpow.util;
		const states = CP.wordsToFlags(attributes.classes);
		const classes = useMemo(() => bem(attributes.classes), []);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"color",
				"size",
				{
					name: "backgroundImage",
					label: __("背景画像", "catpow"),
					values: "hasBackgroundImage",
					sub: [
						{ input: "picture", keys: imageKeys.backgroundImage, devices },
						{ name: "blendmode", label: __("モード", "catpow"), vars: "vars", key: "--cp-image-blendmode", input: "blendmode" },
						{ name: "opacity", label: __("不透明度", "catpow"), vars: "vars", key: "--cp-image-opacity", input: "range", min: 0, max: 1, step: 0.1 },
					],
				},
				{ name: "breadcrumb", label: __("パンくずリスト", "catpow"), values: "hasBreadCrumnb" },
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
				<div className={attributes.classes} style={vars}>
					<div className={classes.body()}>
						<RichText
							tagName="h1"
							className={classes.body.title()}
							onChange={(title) => {
								setAttributes({ title });
							}}
							value={attributes.title}
						/>
						{states.hasBreadCrumnb && <CP.ServerSideRenderPart.Preview name="breadcrumb" className={classes.body.breadcrumb()} container_class={classes.body.breadcrumb.body()} />}
					</div>
					<div className={classes.background()}>
						{states.hasBackgroundImage && (
							<>
								{states.isTemplate && backgroundImageCode ? (
									<CP.DummyImage text={backgroundImageCode} />
								) : (
									<CP.SelectResponsiveImage attr={attributes} set={setAttributes} keys={imageKeys.backgroundImage} devices={devices} />
								)}
							</>
						)}
					</div>
				</div>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { vars, title, backgroundImageCode } = attributes;
		const { devices, imageKeys } = CP.config.pageheader;
		const { RichText } = wp.blockEditor;
		const { bem } = Catpow.util;
		const states = CP.wordsToFlags(attributes.classes);
		const classes = bem(attributes.classes);

		return (
			<div className={classes()} style={vars}>
				<div className={classes.body()}>
					<RichText.Content tagName="h1" className={classes.body.title()} value={attributes.title} />
					{states.hasBreadCrumnb && <CP.ServerSideRenderPart name="breadcrumb" className={classes.body.breadcrumb()} container_class={classes.body.breadcrumb.body()} />}
				</div>
				<div className={classes.background()}>
					{states.hasBackgroundImage && (
						<>{states.isTemplate && backgroundImageCode ? backgroundImageCode : <CP.ResponsiveImage attr={attributes} keys={imageKeys.backgroundImage} devices={devices} />}</>
					)}
				</div>
			</div>
		);
	},
});
