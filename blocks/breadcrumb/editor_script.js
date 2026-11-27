(() => {
  // ../blocks/breadcrumb/editor_script.jsx
  wp.blocks.registerBlockType("catpow/breadcrumb", {
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
