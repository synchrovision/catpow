(() => {
  // ../blocks/unit/editor_script.jsx
  CP.config.unit = {
    devices: ["tb", "sp"],
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
      vars: { type: "object", default: {} },
      classes: { source: "attribute", selector: ".wp-block-catpow-unit", attribute: "class", default: "wp-block-catpow-unit" },
      sources: CP.getPictureSoucesAttributesForDevices(CP.config.unit.devices),
      mime: { source: "attribute", selector: "[src]", attribute: "data-mime" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      code: { source: "text" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, vars } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.unit;
      var selectiveClasses = [
        {
          label: "\u30BF\u30A4\u30D7",
          type: "buttons",
          values: ["snap", "panel"]
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
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("figure", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.image })), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30B9\u30BF\u30A4\u30EB", icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes = "", vars } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.unit;
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("figure", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.image })), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
