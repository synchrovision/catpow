(() => {
  // ../blocks/postlink/editor_script.jsx
  wp.blocks.registerBlockType("catpow/postlink", {
    title: "\u{1F43E} PostLink",
    description: "\u524D\u306E\u6295\u7A3F\u30FB\u6B21\u306E\u6295\u7A3F\u3078\u306E\u30EA\u30F3\u30AF\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { func, param } = attributes;
      return [
        /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/postlink", attributes: Object.assign({}, attributes, { preview: true }) }),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }))
      ];
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
