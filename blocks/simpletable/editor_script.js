(() => {
  // ../blocks/simpletable/editor_script.jsx
  wp.blocks.registerBlockType("catpow/simpletable", {
    title: "\u{1F43E} SimpleTable",
    description: "\u898B\u51FA\u3057\u3068\u672C\u6587\u306E\uFF12\u5217\u3067\u69CB\u6210\u3055\u308C\u308B\u30B7\u30F3\u30D7\u30EB\u306A\u30C6\u30FC\u30D6\u30EB\u3067\u3059\u3002",
    icon: "editor-table",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.tableConvertibles,
          isMatch: function(attributes) {
            return attributes.rows[0].cells.length === 2;
          },
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-simpletable spec";
            return wp.blocks.createBlock("catpow/simpletable", attributes);
          }
        }
      ]
    },
    attributes: {
      classes: {
        source: "attribute",
        selector: "table",
        attribute: "class",
        default: "wp-block-catpow-simpletable color0 spec"
      },
      rows: {
        source: "query",
        selector: "table tr",
        query: {
          classes: { source: "attribute", attribute: "class" },
          cond: { source: "attribute", attribute: "data-refine-cond" },
          cells: {
            source: "query",
            selector: "th,td",
            query: {
              text: { source: "html" },
              classes: { source: "attribute", attribute: "class" },
              style: { source: "attribute", attribute: "style" }
            }
          }
        },
        default: [
          {
            classes: "",
            cells: [
              { text: ["Title"], classes: "" },
              { text: ["Content"], classes: "" }
            ]
          },
          {
            classes: "",
            cells: [
              { text: ["Title"], classes: "" },
              { text: ["Content"], classes: "" }
            ]
          },
          {
            classes: "",
            cells: [
              { text: ["Title"], classes: "" },
              { text: ["Content"], classes: "" }
            ]
          }
        ]
      },
      blockState: { type: "object", default: { enableBlockFormat: true } }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { classes, rows } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            values: ["spec", "info", "history", "inputs"],
            item: {
              spec: [
                {
                  name: "type",
                  label: "\u7A2E\u5225",
                  values: {
                    normal: "\u306A\u3057",
                    important: "\u91CD\u8981",
                    caution: "\u6CE8\u610F"
                  }
                }
              ],
              inputs: [
                {
                  name: "type",
                  label: "\u7A2E\u5225",
                  type: "buttons",
                  values: {
                    normal: "\u306A\u3057",
                    required: "\u5FC5\u9808",
                    recommended: "\u63A8\u5968",
                    optional: "\u4EFB\u610F",
                    readonly: "\u56FA\u5B9A"
                  }
                },
                "cond"
              ]
            }
          },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.simpletable.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u884C", icon: "edit", set: setAttributes, attr: attributes, items: rows, index: attributes.currentItemIndex, triggerClasses: selectiveClasses[0] }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "tr", set: setAttributes, attr: attributes, items: rows, itemskey: "rows", index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement("th", null, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            onChange: (text) => {
              row.cells[0].text = text;
              saveItems();
            },
            value: row.cells[0].text
          }
        )), /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            onChange: (text) => {
              row.cells[1].text = text;
              saveItems();
            },
            value: row.cells[1].text
          }
        )));
      }))));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { classes, rows } = attributes;
      return /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        return /* @__PURE__ */ wp.element.createElement("tr", { className: row.classes, "data-refine-cond": row.cond, key: index }, /* @__PURE__ */ wp.element.createElement("th", { className: row.cells[0].classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: row.cells[0].text })), /* @__PURE__ */ wp.element.createElement("td", { className: row.cells[1].classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: row.cells[1].text })));
      })));
    }
  });
})();
