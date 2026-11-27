(() => {
  // ../blocks/t-heading/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-heading", {
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
    example: CP.example,
    edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
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
          { name: "marginTop", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "marginTop", min: 0, max: 2, step: 0.25 },
          { name: "marginBottom", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "marginBottom", min: 0, max: 2, step: 0.25 }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-heading.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps({ className: classes }), width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(
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
      ))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { setAttributes, attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { classes, marginTop, marginBottom, title } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps.save({ className: classes }), width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title }))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` } })))));
    }
  });
})();
