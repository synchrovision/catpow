(() => {
  // blocks/datatable/editor_script.jsx
  wp.blocks.registerBlockType("catpow/datatable", {
    title: "\u{1F43E} DataTable",
    description: "\u4E00\u884C\u307E\u305F\u306F\uFF11\u5217\u306E\u898B\u51FA\u3057\u3092\u6301\u3064\u30C6\u30FC\u30D6\u30EB\u3067\u3059\u3002",
    icon: "editor-table",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "files",
          isMatch: function(files) {
            if (files[1]) {
              return false;
            }
            return files[0].type === "text/csv";
          },
          priority: 10,
          transform: (files) => {
            var attributes = {
              classes: "wp-block-catpow-datatable spec",
              rows: [{ classes: "", cells: [{ text: ["Title"], classes: "th" }] }],
              file: files[0]
            };
            return createBlock("catpow/datatable", attributes);
          }
        },
        {
          type: "block",
          blocks: CP.tableConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-datatable spec";
            return createBlock("catpow/datatable", attributes);
          }
        },
        {
          type: "block",
          blocks: ["core/table"],
          transform: (attributes) => {
            return createBlock("catpow/datatable", {
              classes: "wp-block-catpow-datatable spec",
              rows: attributes.body.map((row) => ({
                cells: row.cells.map((cell) => ({
                  text: wp.blocks.parseWithAttributeSchema(cell.content, { source: "children" })
                }))
              }))
            });
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes: classes2, rows = [], doLoop, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-datatable";
      var classArray = _.uniq((className + " " + classes2).split(" "));
      var classNameArray = className.split(" ");
      var states = CP.wordsToFlags(classes2);
      if (attributes.file) {
        var reader = new FileReader();
        reader.addEventListener("loadend", () => {
          var attr = {
            classes: "wp-block-catpow-datatable spec hasHeaderRow hasHeaderColumn",
            rows: [],
            file: false
          };
          var csvData = CP.parseCSV(reader.result);
          csvData.map((row, r) => {
            attr.rows.push({ classes: "", cells: row.map((val) => {
              return { text: [val], classes: "" };
            }) });
          });
          setAttributes(attr);
        });
        reader.readAsText(attributes.file);
      }
      var statesClasses = [
        { label: "\u30D8\u30C3\u30C0\u884C", values: "hasHeaderRow" },
        { label: "\u30D8\u30C3\u30C0\u5217", values: "hasHeaderColumn" }
      ];
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "type", label: "\u30BF\u30A4\u30D7", filter: "type", values: ["spec", "sheet", "plan"] },
          "color",
          { name: "loop", input: "bool", label: "\u30EB\u30FC\u30D7", key: "doLoop", sub: [
            { name: "contentPath", label: "content path", input: "text", key: "content_path" },
            { name: "query", label: "query", input: "textarea", key: "query" }
          ] }
        ];
        wp.hooks.applyFilters("catpow.blocks.datatable.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
      };
      const addRow = (index) => {
        rows.splice(index, 0, rows[index]);
        saveItems();
      };
      const deleteRow = (index) => {
        rows.splice(index, 1);
        saveItems();
      };
      const upRow = (index) => {
        rows.splice(index + 1, 0, rows.splice(index, 1)[0]);
        saveItems();
      };
      const downRow = (index) => {
        rows.splice(index - 1, 0, rows.splice(index, 1)[0]);
        saveItems();
      };
      const addColumn = (index) => {
        rows.map((row) => row.cells.splice(index, 0, row.cells[index]));
        saveItems();
      };
      const deleteColumn = (index) => {
        rows.map((row) => row.cells.splice(index, 1));
        saveItems();
      };
      const upColumn = (index) => {
        rows.map((row) => {
          row.cells.splice(index + 1, 0, row.cells.splice(index, 1)[0]);
        });
        saveItems();
      };
      const downColumn = (index) => {
        rows.map((row) => {
          row.cells.splice(index - 1, 0, row.cells.splice(index, 1)[0]);
        });
        saveItems();
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes,
          modes: ["AltMode"]
        }
      ), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("table", { className: classes2 }, states.hasHeaderRow && /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, rows[0].cells.map((cell, index) => {
        if (index === 0) {
          if (states.hasHeaderColumn && cell.text.length === 0) {
            cell.classes = "spacer";
          } else if (cell.classes == "spacer") {
            cell.classes = "";
          }
        }
        return /* @__PURE__ */ wp.element.createElement("th", { className: cell.classes, key: index }, /* @__PURE__ */ wp.element.createElement(RichText2, { onChange: (text) => {
          cell.text = text;
          saveItems();
        }, value: cell.text }));
      }))), /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        if (states.hasHeaderRow && index == 0) {
          return false;
        }
        return /* @__PURE__ */ wp.element.createElement("tr", { key: index }, row.cells.map((cell, columnIndex) => {
          var children = [/* @__PURE__ */ wp.element.createElement(RichText2, { onChange: (text) => {
            cell.text = text;
            saveItems();
          }, value: cell.text, key: "text" })];
          if (isSelected && columnIndex == row.cells.length - 1) {
            children.push(
              /* @__PURE__ */ wp.element.createElement("div", { className: "itemControl rowControl", key: "rowControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn up", onClick: () => downRow(index) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: () => deleteRow(index) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: () => addRow(index) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn down", onClick: () => upRow(index) }))
            );
          }
          if (isSelected && index == rows.length - 1) {
            children.push(
              /* @__PURE__ */ wp.element.createElement("div", { className: "itemControl columnControl", key: "columnControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn left", onClick: () => downColumn(columnIndex) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: () => deleteColumn(columnIndex) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: () => addColumn(columnIndex) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn right", onClick: () => upColumn(columnIndex) }))
            );
          }
          return wp.element.createElement(
            states.hasHeaderColumn && columnIndex == 0 ? "th" : "td",
            { className: cell.classes, key: columnIndex },
            children
          );
        }));
      })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u8868\u793A\u8A2D\u5B9A",
          icon: "admin-appearance",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: statesClasses,
          filters: CP.filters.datatable || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.datatable || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      ))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText: RichText2 } = wp.blockEditor;
      const { classes: classes2 = "", rows = [], loopParam, doLoop } = attributes;
      var classArray = classes2.split(" ");
      var states = CP.wordsToFlags(classes2);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("table", { className: classes2 }, states.hasHeaderRow && /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, rows[0].cells.map((cell, index) => {
        return /* @__PURE__ */ wp.element.createElement("th", { className: cell.classes, key: index }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: cell.text }));
      }))), /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => {
        if (states.hasHeaderRow && index == 0) {
          return false;
        }
        return /* @__PURE__ */ wp.element.createElement("tr", { key: index }, row.cells.map((cell, columnIndex) => {
          return wp.element.createElement(
            states.hasHeaderColumn && columnIndex == 0 ? "th" : "td",
            { className: cell.classes, key: columnIndex },
            cell.text
          );
        }));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { classes: classes2 = "", rows = [], loopParam } = attributes;
          var classArray = classes2.split(" ");
          var states = CP.wordsToFlags(classes2);
          return /* @__PURE__ */ wp.element.createElement("table", { className: classes2 }, states.hasHeaderRow && /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, rows[0].cells.map((cell, index) => {
            return /* @__PURE__ */ wp.element.createElement("th", { className: cell.classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }));
          }))), /* @__PURE__ */ wp.element.createElement("tbody", null, states.doLoop && "[loop_template " + (loopParam || "") + "]", rows.map((row, index) => {
            if (states.hasHeaderRow && index == 0) {
              return false;
            }
            return /* @__PURE__ */ wp.element.createElement("tr", null, row.cells.map((cell, columnIndex) => {
              return wp.element.createElement(
                states.hasHeaderColumn && columnIndex == 0 ? "th" : "td",
                { className: cell.classes },
                cell.text
              );
            }));
          }), states.doLoop && "[/loop_template]"));
        },
        migrate(attributes) {
          var states = CP.wordsToFlags(classes);
          attributes.content_path = attributes.loopParam.split(" ")[0];
          attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
          attributes.doLoop = states.doLoop;
          return attributes;
        }
      }
    ]
  });
})();
