(() => {
  // blocks/unit/editor_script.jsx
  CP.config.unit = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { sources: "sources", src: "src", alt: "alt", code: "code" }
    }
  };
  wp.blocks.registerBlockType("catpow/unit", {
    title: "\u{1F43E} Unit",
    description: "\u753B\u50CF\u3068\u30C6\u30AD\u30B9\u30C8\u3092\u4E26\u3079\u3066\u30EC\u30A4\u30A2\u30A6\u30C8\u3059\u308B\u305F\u3081\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "align-pull-left",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return wp.blocks.createBlock("catpow/unit", { classes: "wp-block-catpow-unit" }, innerBlocks);
          }
        }
      ]
    },
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-unit", attribute: "class", default: "wp-block-catpow-unit" },
      sources: CP.getPictureSoucesAttributesForDevices(CP.config.unit.devices),
      mime: { source: "attribute", selector: "[src]", attribute: "data-mime" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      code: { source: "text" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.unit;
      var selectiveClasses = [
        "color",
        {
          label: "\u30BF\u30A4\u30D7",
          filter: "type",
          values: ["default", "snap", "panel"],
          sub: {
            frame: [
              { label: "\u8272", values: "hasColor", sub: ["color"] }
            ],
            columns: [
              { label: "\u5E45", values: { narrow: "\u72ED\u3044", regular: "\u666E\u901A", wide: "\u5E83\u3044" } }
            ]
          }
        },
        { input: "picture", label: "\u753B\u50CF", keys: imageKeys.image, devices, isTemplate: states.isTemplate },
        {
          label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          values: "isTemplate",
          sub: [
            {
              input: "text",
              label: "\u753B\u50CF\u30B3\u30FC\u30C9",
              key: "code",
              cond: true
            }
          ]
        }
      ];
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("figure", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
        ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.image
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.unit || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { classes = "" } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.unit;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("figure", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
        ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.image
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
