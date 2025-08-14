(() => {
  // ../blocks/t-media-text/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-media-text", {
    title: "\u{1F43E} T-media-text",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u753B\u50CF\u30FB\u30C6\u30AD\u30B9\u30C8\u306E\u30BB\u30C3\u30C8\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-media-text has-vertical-align-top has-image-left" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      imageCode: { source: "text", selector: "td.is-image-cell", default: wpinfo.theme_url + "/images/dummy.jpg" },
      width: { source: "attribute", selector: "td.is-image-cell", attribute: "width", default: "200" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, src, alt, imageCode, width } = attributes;
      const primaryClass = "wp-block-catpow-t-media-text";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "imagePosition",
          "verticalAlign",
          { name: "range", input: "range", label: "\u753B\u50CF\u306E\u5E45", key: "width", min: 50, max: 400, step: 10 },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [{ name: "imageCode", label: "\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", input: "text", key: "imageCode" }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-media-text.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, states.hasImageLeft ? /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: { src: "src", alt: "alt", code: "imageCode" },
          size: "large",
          width: "100%",
          height: "auto",
          isTemplate: states.isTemplate
        }
      )), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))) : /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: { src: "src", alt: "alt", code: "imageCode" },
          size: "large",
          width: "100%",
          height: "auto",
          isTemplate: states.isTemplate
        }
      )))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.ImagePositionClassToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(CP.VerticalAlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { classes, src, alt, imageCode, width } = attributes;
      const primaryClass = "wp-block-catpow-t-media-text";
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, states.hasImageLeft ? /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: { src: "src", alt: "alt", code: "imageCode" }, size: "large", width: "100%", height: "auto", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))) : /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: { src: "src", alt: "alt", code: "imageCode" }, size: "large", width: "100%", height: "auto", isTemplate: states.isTemplate }))))));
    }
  });
})();
