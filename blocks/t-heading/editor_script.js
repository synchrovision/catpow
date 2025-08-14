(() => {
  // ../blocks/t-heading/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-heading", {
    title: "\u{1F43E} T-Heading",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u898B\u51FA\u3057\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
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
      classes: {
        source: "attribute",
        selector: "table",
        attribute: "class",
        default: "wp-block-catpow-t-heading has-text-align-left has-font-weight-medium has-font-size-middle has-heading-type-headline"
      },
      marginTop: { type: "number", default: 1 },
      marginBottom: { type: "number", default: 0.5 },
      title: { source: "html", selector: ".is-text-cell", default: "Title" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, marginTop, marginBottom, title } = attributes;
      const primaryClass = "wp-block-catpow-t-heading";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingType",
          "textAlign",
          "fontSize",
          "fontWeight",
          { name: "marginTop", input: "range", label: "\u4E0A\u4F59\u767D", key: "marginTop", min: 0, max: 2, step: 0.25 },
          { name: "marginBottom", input: "range", label: "\u4E0B\u4F59\u767D", key: "marginBottom", min: 0, max: 2, step: 0.25 }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-heading.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          identifier: "content",
          onMerge: mergeBlocks,
          multiline: false,
          onSplit: (val) => {
            if (!val) {
              return wp.blocks.createBlock("catpow/t-paragraph", {
                classes: "wp-block-catpow-t-paragraph has-text-align-left has-font-size-medium"
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
      ))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, marginTop, marginBottom, title } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title }))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } })))));
    }
  });
})();
