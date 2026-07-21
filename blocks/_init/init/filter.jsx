const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { PanelBody } = wp.components;

wp.blocks.registerBlockStyle("core/heading", { name: "header", label: "header" });
wp.blocks.registerBlockStyle("core/heading", { name: "headline", label: "headline" });
wp.blocks.registerBlockStyle("core/heading", { name: "catch", label: "catch" });

wp.blocks.registerBlockStyle("core/paragraph", { name: "heading", label: "Heading" });
wp.blocks.registerBlockStyle("core/paragraph", { name: "lead", label: "Lead" });
wp.blocks.registerBlockStyle("core/paragraph", { name: "paragraph", label: "Paragraph" });
wp.blocks.registerBlockStyle("core/paragraph", { name: "caption", label: "Caption" });

wp.blocks.registerBlockStyle("core/list", { name: "annotation", label: "annotation" });
wp.blocks.registerBlockStyle("core/list", { name: "circle", label: "circle" });
wp.blocks.registerBlockStyle("core/list", { name: "caret", label: "caret" });
wp.blocks.registerBlockStyle("core/list", { name: "square", label: "square" });
wp.blocks.registerBlockStyle("core/list", { name: "star", label: "star" });
wp.blocks.registerBlockStyle("core/list", { name: "check", label: "check" });
wp.blocks.registerBlockStyle("core/list", { name: "alert", label: "alert" });
wp.blocks.registerBlockStyle("core/list", { name: "caution", label: "caution" });

wp.blocks.registerBlockStyle("core/columns", { name: "regular", label: "regular" });
wp.blocks.registerBlockStyle("core/columns", { name: "panel", label: "panel" });

wp.blocks.registerBlockStyle("core/image", { name: "snap", label: "snap" });
wp.blocks.registerBlockStyle("core/image", { name: "circle", label: "circle" });
wp.blocks.registerBlockStyle("core/image", { name: "cover", label: "cover" });

wp.blocks.registerBlockStyle("core/video", { name: "thumbnail", label: "thumbnail" });
wp.blocks.registerBlockStyle("core/video", { name: "medium", label: "medium" });
wp.blocks.registerBlockStyle("core/video", { name: "large", label: "large" });
wp.blocks.registerBlockStyle("core/video", { name: "cover", label: "cover" });

wp.blocks.registerBlockStyle("core/media-text", { name: "card", label: "Card" });
wp.blocks.registerBlockStyle("core/media-text", { name: "frame", label: "Frame" });

wp.blocks.registerBlockStyle("core/code", { name: "js", label: "js" });
wp.blocks.registerBlockStyle("core/code", { name: "css", label: "css" });
wp.blocks.registerBlockStyle("core/code", { name: "scss", label: "scss" });
wp.blocks.registerBlockStyle("core/code", { name: "php", label: "php" });
wp.blocks.registerBlockStyle("core/code", { name: "html", label: "html" });

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
const coreBlocksToAddPanel = new Set([
	"core/heading",
	"core/paragraph",
	"core/list",
	"core/quote",
	"core/pullquote",
	"core/code",
	"core/preformatted",
	"core/verse",
	"core/details",
	"core/image",
	"core/gallery",
	"core/audio",
	"core/video",
	"core/file",
	"core/cover",
	"core/media-text",
	"core/table",
	"core/separator",
	"core/buttons",
	"core/button",
	"core/group",
	"core/columns",
	"core/column",
]);
wp.hooks.addFilter("editor.BlockEdit", "catpow/editor", (BlockEdit) => (props) => {
	if (coreBlocksToAddPanel.has(props.name)) {
		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel
						title={__("サイズ・間隔・余白")}
						icon="pets"
						{...props}
						selectiveClasses={[
							{ preset: "level", classKey: "className" },
							{ preset: "hasContentWidth", classKey: "className" },
							{ preset: "hasMargin", classKey: "className" },
							{ preset: "hasPadding", classKey: "className" },
						]}
					/>
					<CP.SelectClassPanel
						title={__("色・ボーダー・背景")}
						icon="pets"
						{...props}
						selectiveClasses={[
							{ input: "color", classKey: "className" },
							{ preset: "colorScheme", classKey: "className" },
							{ preset: "hasBorderImage", classKey: "className" },
							{ preset: "backgroundPattern", classKey: "className" },
						]}
					/>
				</InspectorControls>
				<BlockEdit {...props} />
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
