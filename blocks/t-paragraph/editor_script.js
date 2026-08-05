(() => {
  // ../blocks/t-paragraph/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-paragraph", {
    title: "\u{1F43E} T-Paragraph",
    description: __("HTML\u30E1\u30FC\u30EB\u7528\u306E\u6BB5\u843D\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/paragraph"],
          transform: (attributes) => {
            return wp.blocks.createBlock("catpow/t-paragraph", {
              classes: "wp-block-catpow-t-paragraph left medium",
              text: attributes.content
            });
          }
        },
        {
          type: "block",
          blocks: ["catpow/t-heading"],
          transform: (attributes) => {
            return wp.blocks.createBlock("catpow/t-paragraph", {
              classes: "wp-block-catpow-t-paragraph left medium",
              text: attributes.title
            });
          }
        }
      ]
    },
    merge(attributes, attributesToMerge) {
      return {
        text: (attributes.text || "") + (attributesToMerge.text || "")
      };
    },
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-paragraph has-font-size-medium" },
      marginTop: { type: "number", default: 0 },
      marginBottom: { type: "number", default: 0.5 },
      text: { source: "html", selector: ".is-text-cell", default: "text" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, marginTop, marginBottom, text } = attributes;
      const primaryClass = "wp-block-catpow-t-paragraph";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "textAlign",
          "fontSize",
          "fontWeight",
          { name: "marginTop", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "marginTop", min: 0, max: 2, step: 0.25 },
          { name: "marginBottom", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "marginBottom", min: 0, max: 2, step: 0.25 }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-paragraph.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps({ width: "100%", className: classes }) }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          identifier: "content",
          onMerge: mergeBlocks,
          onSplit: (val) => {
            if (!val) {
              return wp.blocks.createBlock("catpow/t-paragraph", {
                classes: "wp-block-catpow-t-paragraph left medium"
              });
            }
            return wp.blocks.createBlock("catpow/t-paragraph", {
              ...attributes,
              text: val
            });
          },
          onReplace,
          onRemove: () => onReplace([]),
          onChange: (text2) => {
            setAttributes({ text: text2 });
          },
          value: text
        }
      ))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { setAttributes, attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, marginTop, marginBottom, text } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: text }))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } })))));
    }
  });
})();
