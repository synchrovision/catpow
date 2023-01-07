(() => {
  // ../blocks/userinfo/editor_script.jsx
  wp.blocks.registerBlockType("catpow/userinfo", {
    title: "\u{1F43E} UserInfo",
    description: "\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30E6\u30FC\u30B6\u30FC\u306E\u60C5\u5831\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u3044\u306A\u3044\u5834\u5408\u306F\u30ED\u30B0\u30A4\u30F3\u30D5\u30A9\u30FC\u30E0\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002",
    icon: "admin-users",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      return [
        /* @__PURE__ */ wp.element.createElement("div", { class: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, "UserInfo"), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [
          ["core/paragraph", { content: "[output last_name] [output first_name]" }]
        ] }))
      ];
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
})();
