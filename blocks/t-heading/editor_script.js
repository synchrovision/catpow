(() => {
  // ../blocks/t-heading/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-heading", {
    title: "\u{1F43E} T-Heading",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u898B\u51FA\u3057\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/paragraph"],
          transform: (attributes) => {
            return wp.blocks.createBlock("catpow/t-heading", {
              classes: "wp-block-catpow-t-heading header center medium",
              text: attributes.content
            });
          }
        },
        {
          type: "block",
          blocks: ["catpow/t-paragraph"],
          transform: (attributes) => {
            return wp.blocks.createBlock("catpow/t-heading", {
              classes: "wp-block-catpow-t-heading header center medium",
              title: attributes.text
            });
          }
        }
      ]
    },
    merge(attributes, attributesToMerge) {
      return {
        title: (attributes.title || "") + (attributesToMerge.title || "")
      };
    },
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-heading header medium center" },
      title: { source: "html", selector: "tbody td", default: "Title" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, title } = attributes;
      const primaryClass = "wp-block-catpow-t-heading";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["color", { name: "type", label: "\u30BF\u30A4\u30D7", values: ["header", "headline", "catch"] }, { name: "size", label: "\u30B5\u30A4\u30BA", values: ["large", "medium", "small"] }];
        wp.hooks.applyFilters("catpow.blocks.t-heading.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          identifier: "content",
          onMerge: mergeBlocks,
          multiline: false,
          onSplit: (val) => {
            if (!val) {
              return wp.blocks.createBlock("catpow/t-paragraph", {
                classes: "wp-block-catpow-t-paragraph left medium"
              });
            }
            return wp.blocks.createBlock("catpow/t-heading", {
              ...attributes,
              title: val
            });
          },
          onReplace,
          onRemove: () => onReplace([]),
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      ))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, title } = attributes;
      const primaryClass = "wp-block-catpow-t-heading";
      return /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })))));
    }
  });
})();
