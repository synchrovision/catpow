(() => {
  // ../blocks/t-banner/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-banner", {
    title: "\u{1F43E} T-Banner",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30D0\u30CA\u30FC\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-banner" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url },
      loopImage: { source: "text", selector: "td", default: "[output image]" },
      width: { source: "attribute", selector: "table", attribute: "width", default: "100%" },
      align: { source: "attribute", selector: "table", attribute: "align", default: "center" },
      marginTop: { type: "number", default: 1 },
      marginBottom: { type: "number", default: 1 }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, width, align, marginTop, marginBottom, src, alt, loopImage } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "align", input: "buttons", label: __("\u914D\u7F6E", "catpow"), key: "align", options: ["left", "center", "right"] },
          { name: "range", input: "range", label: __("\u5E45", "catpow"), key: "width", min: 10, max: 100, step: 5, unit: "%" },
          { name: "marginTop", input: "range", label: "\u4E0A\u4F59\u767D", key: "marginTop", min: 0, max: 10 },
          { name: "marginBottom", input: "range", label: "\u4E0B\u4F59\u767D", key: "marginBottom", min: 0, max: 10 },
          { name: "url", input: "text", label: "URL", key: "url" },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [{ name: "loopImage", label: "\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", input: "text", key: "loopImage" }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-banner.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, states.isTemplate ? /* @__PURE__ */ wp.element.createElement("img", { src: wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + loopImage, width: "100%", height: "auto" }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", set: setAttributes, attr: attributes, keys: { src: "src", alt: "alt" }, size: "large", width: "100%", height: "auto" })))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` } }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, width, align, marginTop, marginBottom, src, alt, url, loopImage } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement("a", { className: "_link", href: url }, states.isTemplate ? loopImage : /* @__PURE__ */ wp.element.createElement("img", { width: "100%", height: "auto", src, alt })))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` } })))));
    }
  });
})();
