(() => {
  // ../blocks/t-box/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-box", {
    title: "\u{1F43E} T-Box",
    description: __("HTML\u30E1\u30FC\u30EB\u7528\u306E\u30EC\u30A4\u30A2\u30A6\u30C8\u8ABF\u6574\u7528\u30B3\u30F3\u30C6\u30CA\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-t-box", attribute: "class", default: "wp-block-catpow-t-box has-mail-content-width" },
      width: { source: "attribute", selector: "table", attribute: "width", default: "600" },
      paddingTop: { type: "number", default: 1 },
      paddingInline: { type: "number", default: 1 },
      paddingBottom: { type: "number", default: 1 }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, width, paddingTop, paddingInline, paddingBottom } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "body", type: "buttons", label: __("\u80CC\u666F\u8272", "catpow"), values: { hasBgNone: __("\u306A\u3057", "catpow"), hasBgNormal: __("\u901A\u5E38", "catpow"), hasBgStrong: __("\u5F37\u8ABF", "catpow"), hasBgAchromatic: __("\u767D\u9ED2", "catpow") } },
          { name: "range", input: "range", label: __("\u5E45", "catpow"), key: "width", min: 400, max: 800, step: 10 },
          { name: "range", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "paddingTop", min: 0, max: 10 },
          { name: "range", input: "range", label: __("\u6A2A\u4F59\u767D", "catpow"), key: "paddingInline", min: 0, max: 10 },
          { name: "range", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "paddingBottom", min: 0, max: 10 }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-box.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("table", { width, cstyle: { width: `${width}px` }, align: "center" }, /* @__PURE__ */ wp.element.createElement("tbody", null, paddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${paddingTop}rem` }, colspan: paddingInline > 0 ? 3 : null })), /* @__PURE__ */ wp.element.createElement("tr", null, paddingInline > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${paddingInline}rem` }, width: `${paddingInline}rem` }), /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), paddingInline > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${paddingInline}rem` }, width: `${paddingInline}rem` })), paddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${paddingBottom}rem` }, colspan: paddingInline > 0 ? 3 : null })))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes, width, paddingTop, paddingInline, paddingBottom } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("table", { width, style: { width: `${width}px` }, align: "center" }, /* @__PURE__ */ wp.element.createElement("tbody", null, paddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${paddingTop}rem` }, colspan: paddingInline > 0 ? 3 : null })), /* @__PURE__ */ wp.element.createElement("tr", null, paddingInline > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${paddingInline}rem` }, width: `${paddingInline}rem` }), /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), paddingInline > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${paddingInline}rem` }, width: `${paddingInline}rem` })), paddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${paddingBottom}rem` }, colspan: paddingInline > 0 ? 3 : null }))))));
    }
  });
})();
