(() => {
  // ../blocks/rtf/editor_script.tsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/rtf", {
    icon: "editor-code",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { classes, vars, level } = attributes;
      const { useMemo } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [{ input: "range", key: "level", min: 1, max: 6 }];
        wp.hooks.applyFilters("catpow.blocks.rtf.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(CP.RTF.Edit, { className: classes, level, ...{ setAttributes, attributes }, isSelected, style: vars })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes }) {
      const { classes, vars, level } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.RTF, { className: classes, level, ...{ attributes }, style: vars });
    }
  });
})();
