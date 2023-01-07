(() => {
  // blocks/cond/editor_script.jsx
  wp.blocks.registerBlockType("catpow/cond", {
    title: "\u{1F43E} Cond",
    description: "\u65E5\u6642\u3084\u30ED\u30B0\u30A4\u30F3\u30E6\u30FC\u30B6\u30FC\u306B\u3088\u3063\u3066\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u8868\u793A\u304C\u5207\u308A\u66FF\u308F\u308B\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-functional",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return createBlock("catpow/cond", {}, innerBlocks);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      return [
        /* @__PURE__ */ wp.element.createElement("div", { className: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, "\u8868\u793A\u6761\u4EF6\uFF1A", attributes.schedule, attributes.is_user_logged_in != 0 && "\u30ED\u30B0\u30A4\u30F3" + (attributes.is_user_logged_in == 1 ? "\u3057\u3066\u3044\u308B" : "\u3057\u3066\u3044\u306A\u3044"), attributes.input_value, attributes.content_value), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u8868\u793A\u6761\u4EF6", icon: "admin-generic" }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB",
            onChange: (schedule) => setAttributes({ schedule }),
            value: attributes.schedule
          }
        ), /* @__PURE__ */ wp.element.createElement(
          SelectControl,
          {
            label: "\u30ED\u30B0\u30A4\u30F3",
            onChange: (is_user_logged_in) => {
              setAttributes({ is_user_logged_in });
            },
            value: attributes.is_user_logged_in,
            options: [
              { label: "\u3057\u3066\u3044\u306A\u3044", value: "-1" },
              { label: "\u3069\u3061\u3089\u3067\u3082", value: "0" },
              { label: "\u3057\u3066\u3044\u308B", value: "1" }
            ]
          }
        ), attributes.is_user_logged_in == "1" && /* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u6A29\u9650",
            onChange: (current_user_can) => setAttributes({ current_user_can }),
            value: attributes.current_user_can
          }
        ), /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831",
            onChange: (user_value) => setAttributes({ user_value }),
            value: attributes.user_value
          }
        )), /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30D5\u30A9\u30FC\u30E0\u5165\u529B\u5024",
            onChange: (input_value) => setAttributes({ input_value }),
            value: attributes.input_value
          }
        ), /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u60C5\u5831",
            onChange: (content_value) => setAttributes({ content_value }),
            value: attributes.content_value
          }
        )))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
})();
