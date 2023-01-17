(() => {
  // blocks/div/editor_script.jsx
  CP.config.div = {
    devices: ["sp", "tb"],
    imageKeys: {
      iconImage: { src: "iconImageSrc", alt: "iconImageAlt" },
      backgroundImage: { src: "backgroundImageSrc", sources: "backgroundImageSources" }
    }
  };
  wp.blocks.registerBlockType("catpow/div", {
    title: "\u{1F43E} Div",
    description: "\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u67A0\u3067\u56F2\u3093\u3060\u308A\u30EC\u30A4\u30A2\u30A6\u30C8\u8ABF\u6574\u3092\u3059\u308B\u305F\u3081\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return createBlock("catpow/div", { classes: "wp-block-catpow-div frame thinBorder" }, innerBlocks);
          }
        }
      ]
    },
    attributes: {
      color: { default: "0" },
      id: { source: "attribute", selector: ".wp-block-catpow-div", attribute: "id" },
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-div frame thinBorder" },
      iconImageSrc: { source: "attribute", selector: ".wp-block-catpow-div>.icon [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy_icon.svg" },
      iconImageAlt: { source: "attribute", selector: ".wp-block-catpow-div>.icon [src]", attribute: "alt" },
      backgroundImageSrc: { source: "attribute", selector: ".wp-block-catpow-div>.background [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy_bg.jpg" },
      backgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.div.devices, ".wp-block-catpow-div>.background picture", "dummy_bg.jpg"),
      patternImageCss: { source: "text", selector: "style.patternImageCss" },
      frameImageCss: { source: "text", selector: "style.frameImageCss" },
      borderImageCss: { source: "text", selector: "style.borderImageCss" }
    },
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { attributes, className, setAttributes, context } = props;
      const { id, classes, color, patternImageCss, frameImageCss, borderImageCss } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.div;
      CP.inheritColor(props, ["iconImageSrc", "patternImageCss", "frameImageCss", "borderImageCss"]);
      CP.manageStyleData(props, ["patternImageCss", "frameImageCss", "borderImageCss"]);
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2 } = CP.config.div;
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            type: "buttons",
            values: ["block", "frame", "columns"],
            sub: {
              frame: [
                { label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon", sub: [
                  { input: "icon", label: "\u30A2\u30A4\u30B3\u30F3", keys: imageKeys2.iconImage, color }
                ] },
                { type: "buttons", label: "\u7DDA", values: { noBorder: "\u306A\u3057", thinBorder: "\u7D30", boldBorder: "\u592A" } },
                { label: "\u89D2\u4E38", values: "round" },
                { label: "\u5F71", values: "shadow", sub: [{ label: "\u5185\u5074", values: "inset" }] }
              ],
              columns: [
                { label: "\u5E45", values: { narrow: "\u72ED\u3044", regular: "\u666E\u901A", wide: "\u5E83\u3044" } }
              ]
            }
          },
          "color",
          { name: "background", type: "buttons", label: "\u80CC\u666F", values: { noBackground: "\u306A\u3057", hasBackgroundColor: "\u8272", hasBackgroundImage: "\u753B\u50CF", hasPatternImage: "\u30D1\u30BF\u30FC\u30F3" }, sub: {
            hasBackgroundColor: [
              { label: "\u30D1\u30BF\u30FC\u30F3", values: "hasPattern", sub: ["pattern"] }
            ],
            hasBackgroundImage: [
              { input: "picture", label: "\u80CC\u666F\u753B\u50CF", keys: imageKeys2.backgroundImage, devices: devices2 }
            ],
            hasPatternImage: [
              { input: "pattern", css: "patternImageCss", sel: ({ attr }) => "#" + attr.id, color }
            ]
          } },
          { name: "borderImage", type: "buttons", label: "\u30DC\u30FC\u30C0\u30FC\u753B\u50CF", values: { noBorder: "\u306A\u3057", hasFrameImage: "\u30D5\u30EC\u30FC\u30E0", hasBorderImage: "\u30DC\u30FC\u30C0\u30FC" }, sub: {
            hasFrameImage: [
              { input: "frame", css: "frameImageCss", sel: ({ attr }) => "#" + attr.id, color }
            ],
            hasBorderImage: [
              { input: "border", css: "borderImageCss", sel: ({ attr }) => "#" + attr.id, color }
            ]
          } },
          { name: "pad", type: "buttons", label: "\u4F59\u767D", "values": { noPad: "\u306A\u3057", thinPad: "\u6975\u7D30", lightPad: "\u7D30", mediumPad: "\u4E2D", boldPad: "\u592A", heavyPad: "\u6975\u592A" } }
        ];
        wp.hooks.applyFilters("catpow.blocks.div.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { id, className: classes }, states.hasIcon && /* @__PURE__ */ wp.element.createElement("div", { className: "icon" }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.iconImage,
          size: "middle"
        }
      )), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.backgroundImage,
          devices
        }
      )), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "patternImageCss" }, patternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss)), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.div || {}
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
      const { id, classes = "", color, patternImageCss, frameImageCss, borderImageCss } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.div;
      return /* @__PURE__ */ wp.element.createElement("div", { id, className: classes }, states.hasIcon && /* @__PURE__ */ wp.element.createElement("div", { className: "icon" }, /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.iconImage
        }
      )), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.backgroundImage,
          devices
        }
      )), /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "patternImageCss" }, patternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss));
    }
  });
})();
