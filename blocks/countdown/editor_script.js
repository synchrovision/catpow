(() => {
  // ../blocks/countdown/editor_script.jsx
  wp.blocks.registerBlockType("catpow/countdown", {
    title: "\u{1F43E} CountDown",
    icon: "clock",
    category: "catpow-embed",
    example: CP.example,
    supports: {
      customClassName: false
    },
    edit({ attributes, setAttributes, className }) {
      const { useCallback, useMemo } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { target } = attributes;
      const classes = useMemo(() => Catpow.util.bem(attributes.classes), [attributes.classes]);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "target", label: "\u76EE\u6A19\u65E5\u6642", key: "target", input: "text", placeholder: "2099-12-31 23:59:59" },
          { name: "size", label: "\u30B5\u30A4\u30BA", type: "buttons", values: { "is-size-small": "\u5C0F", "is-size-medium": "\u4E2D", "is-size-large": "\u5927" } }
        ];
        wp.hooks.applyFilters("catpow.blocks.countdown.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      console.log(attributes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.CountDown, { className: classes.body(), target })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, selectiveClasses && /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8A2D\u5B9A", icon: "edit", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true })));
    },
    save({ attributes, className, setAttributes }) {
      const { classes = "", target } = attributes;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes, "data-target": target });
    }
  });
})();
