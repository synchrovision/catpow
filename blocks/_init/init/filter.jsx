wp.blocks.registerBlockStyle("core/heading", { name: "header", label: "header" });
wp.blocks.registerBlockStyle("core/heading", { name: "headline", label: "headline" });
wp.blocks.registerBlockStyle("core/heading", { name: "catch", label: "catch" });

wp.blocks.registerBlockStyle("core/paragraph", { name: "message", label: "message" });
wp.blocks.registerBlockStyle("core/paragraph", { name: "caption", label: "caption" });

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

wp.blocks.registerBlockStyle("core/media-text", { name: "snap", label: "snap" });
wp.blocks.registerBlockStyle("core/media-text", { name: "panel", label: "panel" });

wp.blocks.registerBlockStyle("core/code", { name: "js", label: "js" });
wp.blocks.registerBlockStyle("core/code", { name: "css", label: "css" });
wp.blocks.registerBlockStyle("core/code", { name: "scss", label: "scss" });
wp.blocks.registerBlockStyle("core/code", { name: "php", label: "php" });
wp.blocks.registerBlockStyle("core/code", { name: "html", label: "html" });

wp.hooks.addFilter("blocks.registerBlockType", "catpow/editor", function (settings, name) {
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
	return settings;
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
	}, "allowColumnStyle")
);
