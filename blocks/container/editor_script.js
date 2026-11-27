(() => {
  // ../blocks/container/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/container", {
    icon: "editor-code",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return wp.blocks.createBlock("catpow/container", { classes: "wp-block-catpow-container " }, innerBlocks);
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
      const { vars, boxSizeVars, classes = "" } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "scrollX",
            label: __("\u30B9\u30AF\u30ED\u30FC\u30EBX", "catpow"),
            values: "hasScrollX",
            sub: [{ name: "contentWidth", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u5E45", "catpow"), vars: "boxSizeVars", key: "--cp-inner-content-width", input: "range", min: 400, max: 2e3, step: 10 }]
          },
          {
            name: "scrollY",
            label: __("\u30B9\u30AF\u30ED\u30FC\u30EBY", "catpow"),
            values: "hasScrollY",
            sub: [{ name: "containerHeight", label: __("\u30B3\u30F3\u30C6\u30CA\u306E\u9AD8\u3055", "catpow"), vars: "boxSizeVars", key: "--cp-container-height", input: "range", min: 100, max: 1e3, step: 10 }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.container.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({ className: classes, style: { ...vars, ...boxSizeVars } });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-container__body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { vars, boxSizeVars, classes = "" } = attributes;
      const blockProps = useBlockProps.save({ className: classes, style: { ...vars, ...boxSizeVars } });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-container__body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
