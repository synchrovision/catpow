(() => {
  // ../blocks/siteheader/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/siteheader", {
    title: "\u{1F43E} SiteHeader",
    description: __("\u30B5\u30A4\u30C8\u5171\u901A\u30D8\u30C3\u30C0\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes, className, clientId }) {
      const { content_path, query, config, EditMode = false } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.ServerSideRender, { block: "catpow/siteheader", attributes }));
    },
    save({ attributes, className, setAttributes }) {
      return null;
    }
  });
})();
