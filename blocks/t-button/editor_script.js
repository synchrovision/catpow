(() => {
  // ../blocks/t-button/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-button", {
    title: "\u{1F43E} T-Button",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30C6\u30FC\u30D6\u30EB\u30EC\u30A4\u30A2\u30A6\u30C8\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-button is-size-medium has-font-weight-bold" },
      width: { source: "attribute", selector: "table", attribute: "width", default: "300" },
      align: { source: "attribute", selector: "table", attribute: "align", default: "center" },
      marginTop: { type: "number", default: 0.5 },
      marginBottom: { type: "number", default: 0.5 },
      title: { source: "html", selector: "a", default: "Title" },
      url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, width, align, marginTop, marginBottom, title } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "align", input: "buttons", label: __("\u914D\u7F6E", "catpow"), key: "align", options: ["left", "center", "right"] },
          "size",
          "fontWeight",
          { name: "range", input: "range", label: __("\u5E45", "catpow"), key: "width", min: 100, max: 600, step: 10 },
          { name: "marginTop", input: "range", label: "\u4E0A\u4F59\u767D", key: "marginTop", min: 0, max: 2, step: 0.25 },
          { name: "marginBottom", input: "range", label: "\u4E0B\u4F59\u767D", key: "marginBottom", min: 0, max: 2, step: 0.25 },
          { name: "url", input: "text", label: "URL", key: "url" }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-button.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "button_" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      )))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, width, align, marginTop, marginBottom, title, url } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "button_" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link", href: url }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } })))));
    }
  });
})();
