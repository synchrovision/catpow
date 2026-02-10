(() => {
  // ../blocks/breadcrumb/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/breadcrumb", {
    title: "\u{1F43E} Breadcrumb",
    description: __("\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8\u3092\u8868\u793A\u3057\u307E\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    edit({ attributes }) {
      const { serverSideRender: ServerSideRender } = wp;
      const { useBlockProps } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/breadcrumb", attributes }));
    },
    save({}) {
      return null;
    }
  });
})();
