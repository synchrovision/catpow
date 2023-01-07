(() => {
  // blocks/t-box/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-box", {
    title: "\u{1F43E} T-Box",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30EC\u30A4\u30A2\u30A6\u30C8\u8ABF\u6574\u7528\u30B3\u30F3\u30C6\u30CA\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-box large" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes } = attributes;
      const primaryClass = "wp-block-catpow-t-box";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", label: "\u30B5\u30A4\u30BA", values: ["large", "medium", "small"] }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-box.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return [
        /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses,
            filters: CP.filters["t-box"] || {}
          }
        ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30AF\u30E9\u30B9",
            onChange: (classes2) => setAttributes({ classes: classes2 }),
            value: classes
          }
        )))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { classes } = attributes;
      const primaryClass = "wp-block-catpow-t-box";
      var states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)))));
    }
  });
})();
