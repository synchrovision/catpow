(() => {
  // ../blocks/loopblock/editor_script.jsx
  wp.blocks.registerBlockType("catpow/loopblock", {
    title: "\u{1F43E} Loopblock",
    description: "\u30AF\u30A8\u30EA\u306E\u6295\u7A3F\u306E\u60C5\u5831\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InnerBlocks, BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
      const { content_path, query, AltMode = false } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: "welcome-comments",
              title: "AltMode",
              isActive: AltMode,
              onClick: () => setAttributes({ AltMode: !AltMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "loopBlock " + (AltMode ? "cp-altcontent altMode" : "cp-embeddedcontent") }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, AltMode ? /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" }) : content_path), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/loopblockcontent"], ["catpow/loopblockcontent", { name: "on_empty" }]], templateLock: "all" })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Query" }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "content path",
          value: content_path,
          onChange: (content_path2) => {
            setAttributes({ content_path: content_path2 });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "query",
          value: query,
          onChange: (query2) => {
            setAttributes({ query: query2 });
          }
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
  wp.blocks.registerBlockType("catpow/loopblockcontent", {
    title: "\u{1F43E} LoopBlockContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/loopblock"],
    attributes: {
      name: {
        type: "attribute",
        label: "\u540D\u524D",
        selector: "loopBlockContent",
        attribute: "name",
        default: "content"
      }
    },
    edit({ attributes, className, setAttributes, clientId }) {
      const { InnerBlocks } = wp.blockEditor;
      const { name } = attributes;
      const template = name == "on_empty" ? [["core/paragraph", { align: "center", content: "Not Found" }]] : [["catpow/section"]];
      return /* @__PURE__ */ wp.element.createElement("div", { className: "loopBlockContent" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { name } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("loopBlockContent", { name }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
