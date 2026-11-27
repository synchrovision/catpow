(() => {
  // ../blocks/simpletable/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/simpletable", {
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
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { classes, vars, rows } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            type: "gridbuttons",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            filter: "type",
            values: { isTypeSpec: "Spec", isTypeInfo: "Information", isTypeHistory: "History", isTypeInputs: "Inputs" },
            item: {
              isTypeSpec: [
                {
                  name: "type",
                  type: "buttons",
                  label: __("\u7A2E\u5225", "catpow"),
                  values: {
                    isNormal: __("\u306A\u3057", "catpow"),
                    isImportant: __("\u91CD\u8981", "catpow"),
                    isCaution: __("\u6CE8\u610F", "catpow")
                  }
                }
              ],
              isTypeInputs: [
                {
                  name: "type",
                  label: __("\u7A2E\u5225", "catpow"),
                  type: "buttons",
                  values: {
                    isNormal: __("\u306A\u3057", "catpow"),
                    isRequired: __("\u5FC5\u9808", "catpow"),
                    isRecommended: __("\u63A8\u5968", "catpow"),
                    isOptional: __("\u4EFB\u610F", "catpow"),
                    isReadonly: __("\u56FA\u5B9A", "catpow")
                  }
                },
                "cond"
              ]
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.simpletable.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u884C", "catpow"), icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["rows", attributes.currentItemIndex], triggerClasses: selectiveClasses[0] }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "tr", className: row.classes, ...{ setAttributes, attributes }, itemKeys: ["rows", index], key: index }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "th",
            className: "_th",
            onChange: (text) => {
              row.cells[0].text = text;
              saveItems();
            },
            value: row.cells[0].text
          }
        ), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "td",
            className: "_td",
            onChange: (text) => {
              row.cells[1].text = text;
              saveItems();
            },
            value: row.cells[1].text
          }
        ));
      })))));
    },
    save({ attributes, className }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { classes, vars, rows } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps.save({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        return /* @__PURE__ */ wp.element.createElement("tr", { className: row.classes, "data-refine-cond": row.cond, key: index }, /* @__PURE__ */ wp.element.createElement("th", { className: row.cells[0].classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: row.cells[0].text })), /* @__PURE__ */ wp.element.createElement("td", { className: row.cells[1].classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: row.cells[1].text })));
      }))));
    }
  });
})();
