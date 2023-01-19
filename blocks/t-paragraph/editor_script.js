(() => {
  // blocks/t-paragraph/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-paragraph", {
    title: "\u{1F43E} T-Paragraph",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u6BB5\u843D\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/paragraph"],
          transform: (attributes) => {
            return createBlock("catpow/t-paragraph", {
              classes: "wp-block-catpow-t-paragraph left medium",
              text: attributes.content
            });
          }
        },
        {
          type: "block",
          blocks: ["catpow/t-heading"],
          transform: (attributes) => {
            return createBlock("catpow/t-paragraph", {
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
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-paragraph medium" },
      text: { source: "html", selector: "tbody td", default: "text" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, onReplace, mergeBlocks }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, text } = attributes;
      const primaryClass = "wp-block-catpow-t-paragraph";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", label: "\u30B5\u30A4\u30BA", values: ["large", "medium", "small"] }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-paragraph.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          identifier: "content",
          onMerge: mergeBlocks,
          onSplit: (val) => {
            if (!val) {
              return createBlock("catpow/t-paragraph", {
                classes: "wp-block-catpow-t-paragraph left medium"
              });
            }
            return createBlock("catpow/t-paragraph", {
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
      ))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters["t-paragraph"] || {}
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
      const { RichText } = wp.blockEditor;
      const { classes, text } = attributes;
      const primaryClass = "wp-block-catpow-t-paragraph";
      return /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: text })))));
    }
  });
})();
