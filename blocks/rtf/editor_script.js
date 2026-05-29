(() => {
  // ../blocks/rtf/editor_script.tsx
  wp.blocks.registerBlockType("catpow/rtf", {
    title: "\u{1F43E} RTF",
    description: "MarkDown\u306B\u4F3C\u305F\u8A18\u6CD5\u3067HTML\u3092\u66F8\u3051\u308B\u30D6\u30ED\u30C3\u30AF",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { type: "string", default: "" },
      level: { type: "number", default: 3 },
      vars: { type: "object", default: [] },
      text: { type: "string", default: "\u25A0 \u898B\u51FA\u3057\n\n\u30C6\u30AD\u30B9\u30C8[\u30EA\u30F3\u30AF](example.com)**\u5F37\u8ABF**" }
    },
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { classes, vars, level } = attributes;
      const { useMemo } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [{ input: "range", key: "level", min: 1, max: 6 }, "hasMargin", "hasContentWidth"];
        wp.hooks.applyFilters("catpow.blocks.rtf.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(CP.RTF.Edit, { className: "wp-block-catpow-rtf" + classes, level, set: setAttributes, attr: attributes, isSelected, style: vars })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes }) {
      const { classes, vars, level } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.RTF, { className: classes, level, attr: attributes, style: vars });
    }
  });
})();
