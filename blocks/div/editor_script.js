(() => {
  // ../blocks/div/editor_script.jsx
  CP.config.div = {
    devices: ["sp", "tb"],
    imageKeys: {
      iconImage: { src: "iconImageSrc", alt: "iconImageAlt" },
      backgroundImage: { src: "backgroundImageSrc", sources: "backgroundImageSources" }
    }
  };
  wp.blocks.registerBlockType("catpow/div", {
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return wp.blocks.createBlock("catpow/div", { classes: "wp-block-catpow-div frame thinBorder" }, innerBlocks);
          }
        }
      ]
    },
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { attributes, className, setAttributes, context } = props;
      const { classes, vars, clipVars, color, frameImageCss, borderImageCss } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.div;
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2 } = CP.config.div;
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            type: "buttons",
            values: { isTypeBlock: "block", isTypeFrame: "frame", isTypeColumns: "columns" },
            sub: {
              isTypeBlock: ["contentWidth", { preset: "clipPath", vars: "clipVars" }],
              isTypeFrame: [
                "contentWidth",
                { label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon", sub: [{ input: "icon", label: "\u30A2\u30A4\u30B3\u30F3", color }] },
                "hasBorder",
                "hasBorderRadius",
                "hasBoxShadow",
                "hasTextShadow"
              ],
              isTypeColumns: ["contentWidth", { preset: "clipPath", vars: "clipVars" }, { type: "buttons", label: "\u5E45", values: { narrow: "\u72ED\u3044", regular: "\u666E\u901A", wide: "\u5E83\u3044" } }]
            },
            bind: {
              isTypeFrame: ["hasContentWidth"]
            }
          },
          "color",
          "colorScheme",
          "backgroundColor",
          "backgroundPattern",
          {
            name: "borderImage",
            type: "buttons",
            label: "\u30DC\u30FC\u30C0\u30FC\u753B\u50CF",
            values: { noBorder: "\u306A\u3057", hasFrameImage: "\u30D5\u30EC\u30FC\u30E0", hasBorderImage: "\u30DC\u30FC\u30C0\u30FC" },
            sub: {
              hasFrameImage: [{ input: "frame", css: "frameImageCss", sel: ({ attr }) => "#" + attr.anchor, color }],
              hasBorderImage: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => "#" + attr.anchor, color }]
            }
          },
          "hasPadding",
          "hasMargin"
        ];
        wp.hooks.applyFilters("catpow.blocks.div.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({ className: classes, style: states.hasClipPath ? { ...vars, ...clipVars } : vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss)), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes = "", vars, clipVars, frameImageCss, borderImageCss } = attributes;
      const states = CP.classNamesToFlags(classes);
      const blockProps = useBlockProps.save({ className: classes, style: states.hasClipPath ? { ...vars, ...clipVars } : vars });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss));
    }
  });
})();
