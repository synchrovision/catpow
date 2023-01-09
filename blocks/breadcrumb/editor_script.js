(() => {
  // blocks/breadcrumb/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/breadcrumb", {
    title: "\u{1F43E} Breadcrumb",
    description: __("\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8\u3092\u8868\u793A\u3057\u307E\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes, className, clientId }) {
      const { ServerSideRender } = wp.components;
      const { content_path, query, config, EditMode = false } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/breadcrumb", attributes }));
    },
    save({ attributes, className, setAttributes }) {
      return null;
    }
  });
})();
