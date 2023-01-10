(() => {
  // blocks/t-media-text/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-media-text", {
    title: "\u{1F43E} T-media-text",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u753B\u50CF\u30FB\u30C6\u30AD\u30B9\u30C8\u306E\u30BB\u30C3\u30C8\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-media-text" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      imageCode: { source: "text", selector: "td.imageCell", default: wpinfo.theme_url + "/images/dummy.jpg" },
      width: { source: "attribute", selector: "td.imageCell", attribute: "width", default: "200" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, src, alt, imageCode, width } = attributes;
      const primaryClass = "wp-block-catpow-t-media-text";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              { name: "imageCode", label: "\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", input: "text", key: "imageCode" }
            ]
          },
          { name: "range", input: "range", label: "\u753B\u50CF\u306E\u5E45", key: "width", min: 50, max: 400, step: 10 }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-media-text.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "imageCell", width }, /* @__PURE__ */ wp.element.createElement(
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
      )), /* @__PURE__ */ wp.element.createElement("td", { className: "spacerCell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "textCell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.VerticalAlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters["t-media-text"] || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { classes, src, alt, imageCode, width } = attributes;
      const primaryClass = "wp-block-catpow-t-media-text";
      var states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "imageCell", width }, /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: { src: "src", alt: "alt", code: "imageCode" },
          size: "large",
          width: "100%",
          height: "auto",
          isTemplate: states.isTemplate
        }
      )), /* @__PURE__ */ wp.element.createElement("td", { className: "spacerCell" }), /* @__PURE__ */ wp.element.createElement("td", { className: "textCell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)))));
    }
  });
})();
