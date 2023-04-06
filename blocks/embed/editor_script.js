(() => {
  // ../blocks/embed/editor_script.jsx
  wp.blocks.registerBlockType("catpow/embed", {
    title: "\u{1F43E} Embed",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u57CB\u3081\u8FBC\u307F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    edit({ attributes, setAttributes, className }) {
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { content_path, query } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/embed", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.embed),
          onChange: (content_path2) => {
            setAttributes({ content_path: content_path2 });
          }
        }
      ))));
    },
    example: CP.example,
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
