(() => {
  // ../blocks/div/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.div = {
    devices: ["tb", "sp"],
    imageKeys: {
      iconImage: { src: "iconImageSrc", alt: "iconImageAlt" }
    }
  };
  wp.blocks.registerBlockType("catpow/div", {
    description: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u67A0\u3067\u56F2\u3093\u3060\u308A\u30EC\u30A4\u30A2\u30A6\u30C8\u8ABF\u6574\u3092\u3059\u308B\u305F\u3081\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002", "catpow"),
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
      const { classes, vars, color, frameImageCss, borderImageCss } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.div;
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2 } = CP.config.div;
        const selectiveClasses2 = [
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            filter: "type",
            type: "buttons",
            values: { isTypeBlock: "block", isTypeFrame: "frame", isTypeColumns: "columns" },
            sub: {
              isTypeFrame: ["hasIcon"],
              isTypeColumns: [{ preset: "itemSize", label: __("\u30AB\u30E9\u30E0\u5E45", "catpow") }]
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.div.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({ className: classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes = "", vars, frameImageCss, borderImageCss } = attributes;
      const states = CP.classNamesToFlags(classes);
      const blockProps = useBlockProps.save({ className: classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null));
    }
  });
})();
