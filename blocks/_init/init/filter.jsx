const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

const blockStyleSelectiveClasses = {
	"core/heading": ["hasHeadingType"],
	"core/paragraph": ["hasTextType"],
	"core/list": [
		"hasTextType",
		{
			type: "gridbuttons",
			values: {
				isStyleAnnotation: __("注釈", "catpow"),
				isStyleCircle: __("丸", "catpow"),
				isStyleCaret: __("矢印", "catpow"),
				isStyleSquare: __("四角", "catpow"),
				isStyleStar: __("星", "catpow"),
				isStyleCheck: __("チェック", "catpow"),
				isStyleAlert: __("警告", "catpow"),
				isStyleCaution: __("注意", "catpow"),
			},
		},
	],
	"core/columns": [{ type: "gridbuttons", values: { regular: __("標準", "catpow"), panel: __("パネル", "catpow") } }],
	"core/image": [{ type: "gridbuttons", values: { isStylesnap: __("スナップ", "catpow"), isStylecircle: __("丸", "catpow"), isStylecover: __("カバー", "catpow") } }],
	"core/video": [
		{
			type: "gridbuttons",
			values: {
				isSizeThumbnail: __("サムネイル", "catpow"),
				isSizeMedium: __("中", "catpow"),
				isSizeLarge: __("大", "catpow"),
				isSizeCover: __("カバー", "catpow"),
			},
		},
	],
	"core/media-text": [{ type: "gridbuttons", values: { isStyleCard: __("カード", "catpow"), isStyleFrame: __("フレーム", "catpow") } }],
	"core/code": [{ type: "gridbuttons", values: { js: "js", css: "css", scss: "scss", php: "php", html: "html" } }],
};

wp.hooks.addFilter("blocks.registerBlockType", "catpow/editor", function (settings, name) {
	if (name.slice(0, 5) === "core/") {
		settings.attributes.vars = { type: "object" };
		switch (name) {
			case "core/heading":
				settings.attributes.className.default = "is-style-headline";
				break;
			case "core/paragraph":
				settings.attributes.fontSize.default = "regular";
				break;
			case "core/list":
				settings.attributes.className.default = "is-style-check";
				break;
			case "core/columns":
				settings.attributes.className.default = "is-style-panel";
				break;
		}
	}
	return settings;
});
const coreBlocksToAddPanel = new Set();
const blockPanelSupports = {};
wp.hooks.addFilter("blocks.registerBlockType", "catpow/editor", (settings, name, deprecatedSettings) => {
	if (deprecatedSettings) return settings;
	if (settings.supports) {
		const panelSupports = {
			style: !!blockStyleSelectiveClasses[name],
			level: settings.supports.level,
			headingLevel: settings.supports.headingLevel,
			itemSize: settings.supports.itemSize,
			bodySize: settings.supports.bodySize,
			color: !!settings.supports.color,
			spacing: !!settings.supports.spacing,
			typography: settings.supports.typography,
			background: !!settings.supports.background,
		};
		if (Object.values(panelSupports).some((v) => v)) {
			if (name.slice(0, 5) === "core/") coreBlocksToAddPanel.add(name);
			blockPanelSupports[name] = panelSupports;
			settings = {
				...settings,
				supports: {
					...settings.supports,
					level: false,
					headingLevel: false,
					itemSize: false,
					bodySize: false,
					color: false,
					spacing: false,
					typography: false,
					background: false,
					shadow: false,
				},
			};
		}
	}
	return settings;
});
wp.hooks.addFilter("editor.BlockEdit", "catpow/editor", (BlockEdit) => (props) => {
	if (blockPanelSupports[props.name]) {
		const panelSupports = blockPanelSupports[props.name];
		const classKey = props.name.slice(0, 5) === "core/" ? "className" : "classes";
		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					{panelSupports.style && <CP.SelectClassPanel title={__("スタイル")} icon="pets" classKey={classKey} {...props} selectiveClasses={blockStyleSelectiveClasses[props.name]} />}
					<CP.SelectClassPanel title={__("レベル")} icon="pets" classKey={classKey} {...props} selectiveClasses={["level", panelSupports.headingLevel && "headingTag"]} />
					{panelSupports.typography && (
						<CP.SelectClassPanel title={__("テキスト")} icon="pets" classKey={classKey} {...props} selectiveClasses={["hasFontWeight", "hasFontFamily", "hasTextShadow", "textAlign"]} />
					)}
					{panelSupports.color && <CP.SelectClassPanel title={__("色")} icon="pets" classKey={classKey} {...props} selectiveClasses={["color", "colorScheme"]} />}
					{panelSupports.spacing &&
						(panelSupports.background ? (
							<>
								<CP.SelectClassPanel
									title={__("サイズ・間隔・余白")}
									icon="pets"
									classKey={classKey}
									{...props}
									selectiveClasses={["hasContentWidth", "hasMargin", "hasPadding", panelSupports.itemSize && "itemSize"]}
								/>
								<CP.SelectClassPanel title={__("背景")} icon="pets" classKey={classKey} {...props} selectiveClasses={["backgroundColor", "backgroundPattern"]} />
								<CP.SelectClassPanel title={__("影")} icon="pets" classKey={classKey} {...props} selectiveClasses={["boxShadow"]} />
								<CP.SelectClassPanel title={__("ボーダー")} icon="pets" classKey={classKey} {...props} selectiveClasses={["hasBorder", "borderColor", "hasBorderRadius", "hasBorderImage"]} />
							</>
						) : (
							<>
								<CP.SelectClassPanel title={__("サイズ・間隔")} icon="pets" classKey={classKey} {...props} selectiveClasses={["hasContentWidth", "hasMargin", panelSupports.itemSize && "itemSize"]} />
							</>
						))}
					{panelSupports.bodySize && <CP.SelectClassPanel title={__("内容サイズ・余白")} icon="pets" classKey="bodyClasses" {...props} selectiveClasses={["hasContentWidth", "hasPadding"]} />}
				</InspectorControls>
			</>
		);
	}
	return <BlockEdit {...props} />;
});
wp.hooks.addFilter(
	"editor.BlockListBlock",
	"catpow/editor",
	wp.compose.createHigherOrderComponent((BlockListBlock) => (props) => {
		if (coreBlocksToAddPanel.has(props.name)) {
			return (
				<BlockListBlock
					{...props}
					wrapperProps={{
						...props.wrapperProps,
						style: {
							...props.wrapperProps?.style,
							...props.attributes.vars,
						},
					}}
				/>
			);
		}
		return <BlockListBlock {...props} />;
	}),
);

wp.hooks.addFilter("blocks.getSaveContent.extraProps", "catpow/editor", (props, blockType, attributes) => {
	if (coreBlocksToAddPanel.has(blockType.name)) {
		Object.assign((props.style ||= {}), attributes.vars);
	}
	return props;
});

// core/columnsでregisterBlockStyleがエラーを起こすバグの回避
wp.hooks.addFilter(
	"editor.BlockEdit",
	"catpow/editor",
	wp.compose.createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var content = wp.element.createElement(BlockEdit, props);

			if ((props.name === "core/columns" || props.name === "core/media-text") && typeof props.insertBlocksAfter === "undefined") {
				return (
					<>
						<div></div>
					</>
				);
			}

			return <>{content}</>;
		};
	}, "allowColumnStyle"),
);
