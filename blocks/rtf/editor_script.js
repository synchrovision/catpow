(() => {
  // ../blocks/rtf/editor_script.tsx
  wp.blocks.registerBlockType("catpow/rtf", {
    title: "\u{1F43E} RTF",
    description: "MarkDown\u306B\u4F3C\u305F\u8A18\u6CD5\u3067HTML\u3092\u66F8\u3051\u308B\u30D6\u30ED\u30C3\u30AF",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { type: "string", default: "" },
      vars: { type: "object", default: [] },
      text: { type: "string", default: "" }
    },
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { classes, vars } = attributes;
      const { useMemo } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["hasMargin", "hasContentWidth"];
        wp.hooks.applyFilters("catpow.blocks.rtf.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.RTF.Edit, { className: "wp-block-catpow-rtf" + classes, set: setAttributes, attr: attributes, isSelected, style: vars }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes }) {
      const { classes, vars } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.RTF, { className: classes, attr: attributes, style: vars });
    }
  });
})();
