(() => {
  // ../functions/zeus/blocks/zeus/editor_script.jsx
  wp.blocks.registerBlockType("catpow/zeus", {
    title: "\u{1F43E} Zeus",
    icon: "cart",
    category: "catpow",
    edit({ attributes, className, setAttributes, isSelected }) {
      const { items, classes } = attributes;
      const primaryClass = "wp-block-catpow-zeus";
      return [
        /* @__PURE__ */ wp.element.createElement("div", { id: "ZeusButtonContainer" }, /* @__PURE__ */ wp.element.createElement("div", { id: "ZeusButton", className: "wp-block-catpow-zeus" }, /* @__PURE__ */ wp.element.createElement(RichText, { onChange: (text) => {
          setAttributes({ text });
        }, value: attributes.text })))
      ];
    },
    save({ attributes, className }) {
      return /* @__PURE__ */ wp.element.createElement("div", { id: "ZeusButtonContainer" }, /* @__PURE__ */ wp.element.createElement("div", { id: "ZeusButton", className: "wp-block-catpow-zeus" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: attributes.text })));
    }
  });
})();
