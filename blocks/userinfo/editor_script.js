(() => {
  // ../blocks/userinfo/editor_script.jsx
  wp.blocks.registerBlockType("catpow/userinfo", {
    icon: "admin-users",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: "cp-embeddedcontent" }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, "UserInfo"), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: "[output last_name] [output first_name]" }]] }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
})();
