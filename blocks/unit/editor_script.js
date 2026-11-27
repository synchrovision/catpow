(() => {
  // ../blocks/unit/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.unit = {
    devices: ["tb", "sp"],
    imageKeys: {
      image: { sources: "sources", src: "src", alt: "alt", code: "code" }
    }
  };
  wp.blocks.registerBlockType("catpow/unit", {
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
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, vars } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.unit;
      var selectiveClasses = [
        {
          label: __("\u30BF\u30A4\u30D7", "catpow"),
          type: "buttons",
          values: ["snap", "panel"]
        },
        { input: "picture", label: __("\u753B\u50CF", "catpow"), keys: imageKeys.image, devices, isTemplate },
        {
          label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
          values: "isTemplate",
          sub: [
            {
              input: "text",
              label: __("\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
              key: "code",
              cond: true
            }
          ]
        }
      ];
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("figure", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.image })), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
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
