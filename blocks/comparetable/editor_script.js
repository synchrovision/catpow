(() => {
  // ../blocks/comparetable/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.comparetable = {
    imageKeys: {
      image: {
        src: "src",
        alt: "alt",
        code: "imageCode",
        items: ["rows", "cells"]
      }
    }
  };
  wp.blocks.registerBlockType("catpow/comparetable", {
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
          priority: 20,
          transform: (files) => {
            var attributes = {
              classes: "wp-block-catpow-comparetable is-style-spec has-tags has-header-column do-transposition",
              rows: [{ classes: "", cells: [{ text: ["Title"], classes: "th" }] }],
              file: files[0]
            };
            return wp.blocks.createBlock("catpow/comparetable", attributes);
          }
        },
        {
          type: "block",
          blocks: CP.tableConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-comparetable is-style-spec has-tags has-header-column do-transposition";
            return wp.blocks.createBlock("catpow/comparetable", attributes);
          }
        },
        {
          type: "block",
          blocks: ["core/table"],
          transform: (attributes) => {
            return wp.blocks.createBlock("catpow/comparetable", {
              classes: "wp-block-catpow-comparetable is-style-spec has-tags has-header-column do-transposition",
              rows: attributes.body.map((row) => ({
                cells: row.cells.map((cell) => ({
                  text: wp.blocks.parseWithAttributeSchema(cell.content, {
                    source: "html"
                  })
                }))
              }))
            });
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, useCallback } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { rows = [], cols = [], doLoop, AltMode = false, r = 0, c = 0, vars, headerColClasses, firstCellClasses } = attributes;
      const { imageKeys } = CP.config.comparetable;
      const classes = Catpow.util.bem("wp-block-catpow-comparetable");
      var states = CP.classNamesToFlags(attributes.classes);
      if (attributes.file) {
        var reader = new FileReader();
        reader.addEventListener("loadend", () => {
          var attr = {
            classes: "spec has-tags",
            rows: [],
            file: false
          };
          var csvData = CP.parseCSV(reader.result);
          csvData.map((row, r2) => {
            attr.rows.push({
              classes: "",
              cells: row.map((val) => {
                return { text: [val], classes: "" };
              })
            });
          });
          setAttributes(attr);
        });
        reader.readAsText(attributes.file);
      }
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: {
              "is-style-spec": "spec",
              "is-style-sheet": "sheet",
              "is-style-plan": "plan"
            }
          },
          { name: "transposiiton", label: "\u8EE2\u7F6E", values: "do-transposition" },
          { name: "tags", label: "\u30BF\u30B0", values: "has-tags" },
          {
            name: "headerColumn",
            label: __("\u898B\u51FA\u3057\u5217", "catpow"),
            values: "has-header-column",
            sub: [
              {
                name: "width",
                label: __("\u5E45", "catpow"),
                vars: "vars",
                key: "--cp-header-column-width",
                input: "range",
                min: 20,
                max: 400,
                step: 5
              }
            ]
          },
          {
            name: "columnWidth",
            label: __("\u5217\u5E45\u56FA\u5B9A", "catpow"),
            values: "has-fixed-column-width",
            sub: [
              {
                name: "width",
                label: __("\u5E45", "catpow"),
                vars: "vars",
                key: "--cp-column-width",
                input: "range",
                min: 20,
                max: 400,
                step: 5
              }
            ]
          },
          {
            name: "tableWidth",
            label: __("\u8868\u5E45", "catpow"),
            vars: "vars",
            key: "--cp-table-width",
            input: "range",
            min: 200,
            max: 3200,
            step: 10,
            cond: (states2) => !states2["has-fixed-column-width"]
          },
          "color",
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveRowClasses = useMemo(() => {
        const selectiveRowClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: {
              "is-standard": "\u901A\u5E38",
              "is-premium": "\u9AD8\u54C1\u8CEA",
              "is-recommended": "\u63A8\u5968",
              "is-deprecated": "\u975E\u63A8\u5968"
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveRowClasses", CP.finderProxy(selectiveRowClasses2));
        return selectiveRowClasses2;
      }, []);
      const selectiveHeaderRowClasses = useMemo(() => {
        const selectiveHeaderRowClasses2 = ["fontSize", "textAlign", "verticalAlign"];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveHeaderRowClasses", CP.finderProxy(selectiveHeaderRowClasses2));
        return selectiveHeaderRowClasses2;
      }, []);
      const selectiveColClasses = useMemo(() => {
        const selectiveColClasses2 = [{ name: "isImage", label: __("\u753B\u50CF", "catpow"), values: "is-image" }, "fontSize", "textAlign", "verticalAlign"];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveColClasses", CP.finderProxy(selectiveColClasses2));
        return selectiveColClasses2;
      }, []);
      const selectiveHeaderColClasses = useMemo(() => {
        const selectiveHeaderColClasses2 = ["fontSize", "textAlign", "verticalAlign"];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveHeaderColClasses", CP.finderProxy(selectiveHeaderColClasses2));
        return selectiveHeaderColClasses2;
      }, []);
      const selectiveCellClasses = useMemo(() => {
        const selectiveCellClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: {
              "is-equal": "\u7B49",
              "is-positive": "\u6B63",
              "is-negative": "\u8CA0"
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveCellClasses", CP.finderProxy(selectiveCellClasses2));
        return selectiveCellClasses2;
      }, []);
      const selectiveHeaderColCellClasses = useMemo(() => {
        const selectiveHeaderColCellClasses2 = [
          {
            name: "label",
            type: "buttons",
            label: "\u30E9\u30D9\u30EB",
            values: "has-label"
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveHeaderColCellClasses", CP.finderProxy(selectiveHeaderColCellClasses2));
        return selectiveHeaderColCellClasses2;
      }, []);
      const selectiveFirstCellClasses = useMemo(() => {
        const selectiveFirstCellClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: {
              "is-spacer": "\u7A7A\u767D",
              "is-label": "\u30E9\u30D9\u30EB",
              "is-title": "\u30BF\u30A4\u30C8\u30EB"
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.comparetable.selectiveFirstCellClasses", CP.finderProxy(selectiveFirstCellClasses2));
        return selectiveFirstCellClasses2;
      }, []);
      const getCssVarsForCell = useCallback((r2, c2) => {
        return { "--cp-row-index": `${r2 + 1}`, "--cp-column-index": `${c2 + 1}` };
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
        rows.splice(index - 1, 0, rows.splice(index, 1)[0]);
        saveItems();
      };
      const downRow = (index) => {
        rows.splice(index + 1, 0, rows.splice(index, 1)[0]);
        saveItems();
      };
      const addColumn = (index) => {
        cols.splice(index, 0, cols[index]);
        rows.map((row) => row.cells.splice(index, 0, row.cells[index]));
        saveItems();
      };
      const deleteColumn = (index) => {
        cols.splice(index, 1);
        rows.map((row) => row.cells.splice(index, 1));
        saveItems();
      };
      const upColumn = (index) => {
        cols.splice(index + 1, 0, cols.splice(index, 1)[0]);
        rows.map((row) => {
          row.cells.splice(index + 1, 0, row.cells.splice(index, 1)[0]);
        });
        saveItems();
      };
      const downColumn = (index) => {
        cols.splice(index - 1, 0, cols.splice(index, 1)[0]);
        rows.map((row) => {
          row.cells.splice(index - 1, 0, row.cells.splice(index, 1)[0]);
        });
        saveItems();
      };
      const blockProps = useBlockProps({
        className: classes(attributes.classes),
        style: vars
      });
      const hasHeaderRow = !states.doTransposition || states.hasHeaderColumn;
      const hasHeaderColumn = states.doTransposition || states.hasHeaderColumn;
      const tagCells = states.doTransposition ? rows.map((row) => row.cells[0]) : rows[0].cells;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes, modes: ["AltMode"] }), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasTags && /* @__PURE__ */ wp.element.createElement("ul", { className: classes.tags() }, tagCells.map((cell, tagIndex) => {
        if (states.hasHeaderColumn && tagIndex === 0) {
          return false;
        }
        return /* @__PURE__ */ wp.element.createElement("li", { className: classes.tags.tag(cell.classes), "data-wp-on--click": "actions.onClickTag", "data-wp-class--is-active": "callbacks.isTagActive", "data-index": tagIndex, key: tagIndex }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }));
      })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.box() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.box._body() }, /* @__PURE__ */ wp.element.createElement(
        "table",
        {
          className: classes.table(),
          style: {
            "--cp-row-count": `${rows.length}`,
            "--cp-column-count": `${rows[0].cells.length}`
          }
        },
        /* @__PURE__ */ wp.element.createElement("colgroup", { className: classes.table.colgroup() }, cols.map((col, index) => /* @__PURE__ */ wp.element.createElement("col", { className: classes.table.colgroup.col(col.classes), "data-col-class": col.classes, key: index }))),
        hasHeaderRow && /* @__PURE__ */ wp.element.createElement("thead", { className: classes.table.thead() }, /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.thead.tr(rows[0].classes), "data-row-class": rows[0].classes }, rows[0].cells.map((cell, columnIndex) => {
          const lineClass = ["is-even-line", "is-odd-line"][(states.doTransposition ? columnIndex : 0) % 2];
          if (states.hasHeaderColumn && columnIndex == 0) {
            const cellStates2 = CP.classNamesToFlags(firstCellClasses);
            return /* @__PURE__ */ wp.element.createElement(
              "td",
              {
                className: classes.table.thead.tr.td(rows[0].classes, headerColClasses, firstCellClasses),
                "data-cell-class": cell.classes,
                onClick: () => setAttributes({ r: 0, c: columnIndex }),
                style: getCssVarsForCell(0, columnIndex),
                key: columnIndex
              },
              !cellStates2.isSpacer && /* @__PURE__ */ wp.element.createElement("div", { "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (text2) => {
                    cell.text = text2;
                    saveItems();
                  },
                  value: cell.text
                }
              ))
            );
          }
          const cellStates = CP.classNamesToFlags(cell.classes);
          return /* @__PURE__ */ wp.element.createElement(
            "th",
            {
              className: classes.table.thead.tr.th(rows[0].classes, cell.classes, lineClass),
              "data-cell-class": cell.classes,
              onClick: () => setAttributes({ r: 0, c: columnIndex }),
              style: getCssVarsForCell(0, columnIndex),
              key: columnIndex
            },
            cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (label) => {
                  cell.label = label;
                  saveItems();
                },
                value: cell.label
              }
            )),
            /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text2) => {
                  cell.text = text2;
                  saveItems();
                },
                value: cell.text
              }
            ))
          );
        }))),
        /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.table.tbody() }, rows.map((row, rowIndex) => {
          if (hasHeaderRow && rowIndex === 0) {
            return false;
          }
          return /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.tbody.tr(row.classes), "data-row-class": row.classes, key: rowIndex }, row.cells.map((cell, columnIndex) => {
            const colStates = CP.classNamesToFlags(cols[columnIndex]?.classes);
            const cellStates = CP.classNamesToFlags(cell.classes);
            const lineClass = ["is-even-line", "is-odd-line"][(states.doTransposition ? columnIndex : rowIndex) % 2];
            var controles = [];
            if (isSelected && columnIndex == row.cells.length - 1) {
              controles.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.ItemControl,
                  {
                    className: "is-control-row",
                    controls: {
                      up: () => upRow(rowIndex),
                      delete: () => deleteRow(rowIndex),
                      clone: () => addRow(rowIndex),
                      down: () => downRow(rowIndex)
                    }
                  }
                )
              );
            }
            if (isSelected && rowIndex == rows.length - 1) {
              controles.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.ItemControl,
                  {
                    className: "is-control-column",
                    controls: {
                      left: () => downColumn(columnIndex),
                      delete: () => deleteColumn(columnIndex),
                      clone: () => addColumn(columnIndex),
                      right: () => upColumn(columnIndex)
                    }
                  }
                )
              );
            }
            if (hasHeaderColumn && columnIndex == 0) {
              return /* @__PURE__ */ wp.element.createElement(
                "th",
                {
                  className: classes.table.tbody.tr.th(row.classes, headerColClasses, cell.classes, lineClass),
                  "data-cell-class": cell.classes,
                  onClick: () => setAttributes({
                    r: rowIndex,
                    c: columnIndex
                  }),
                  style: getCssVarsForCell(rowIndex, columnIndex),
                  key: columnIndex
                },
                cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.th.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(
                  RichText,
                  {
                    onChange: (label) => {
                      cell.label = label;
                      saveItems();
                    },
                    value: cell.label
                  }
                )),
                /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.th.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(
                  RichText,
                  {
                    onChange: (text2) => {
                      cell.text = text2;
                      saveItems();
                    },
                    value: cell.text
                  }
                )),
                controles
              );
            }
            return /* @__PURE__ */ wp.element.createElement(
              "td",
              {
                className: classes.table.tbody.tr.td(row.classes, cols[columnIndex]?.classes, cell.classes, lineClass),
                "data-cell-class": cell.classes,
                onClick: () => setAttributes({
                  r: rowIndex,
                  c: columnIndex
                }),
                style: getCssVarsForCell(rowIndex, columnIndex),
                key: columnIndex
              },
              cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (label) => {
                    cell.label = text;
                    saveItems();
                  },
                  value: cell.label
                }
              )),
              colStates.isImage ? /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.image(), "data-role": "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.SelectResponsiveImage,
                {
                  className: classes.table.tbody.tr.td.image._img(),
                  attr: attributes,
                  set: setAttributes,
                  keys: imageKeys.image,
                  index: [rowIndex, columnIndex],
                  size: "large",
                  isTemplate: states.isTemplate
                }
              )) : /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (text2) => {
                    cell.text = text2;
                    saveItems();
                  },
                  value: cell.text
                }
              )),
              controles
            );
          }));
        }))
      ))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), r === 0 ? /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u884C", icon: "art", set: setAttributes, attr: attributes, selectiveClasses: selectiveHeaderRowClasses, items: rows, itemsKey: "rows", index: r }) : /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u884C", icon: "art", set: setAttributes, attr: attributes, selectiveClasses: selectiveRowClasses, items: rows, itemsKey: "rows", index: r }), states.hasHeaderColumn && c === 0 ? /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u5217", icon: "art", set: setAttributes, attr: attributes, selectiveClasses: selectiveHeaderColClasses, classKey: "headerColClasses" }) : /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u5217", icon: "art", set: setAttributes, attr: attributes, selectiveClasses: selectiveColClasses, items: cols, itemsKey: "cols", index: c }), states.hasHeaderColumn && r === 0 && c === 0 ? /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30BB\u30EB", icon: "art", set: setAttributes, attr: attributes, selectiveClasses: selectiveFirstCellClasses, classKey: "firstCellClasses" }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30BB\u30EB",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: c === 0 ? selectiveHeaderColCellClasses : selectiveCellClasses,
          items: rows,
          itemsKey: "rows",
          index: r,
          subItemsKey: "cells",
          subIndex: c
        }
      )));
    },
    save({ attributes, className }) {
      const { useState, useMemo, useCallback } = wp.element;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { rows = [], cols = [], loopParam, doLoop, vars, headerColClasses, firstCellClasses } = attributes;
      const { imageKeys } = CP.config.comparetable;
      const classes = Catpow.util.bem("wp-block-catpow-comparetable");
      const getCssVarsForCell = (r, c) => {
        return { "--cp-row-index": `${r + 1}`, "--cp-column-index": `${c + 1}` };
      };
      var states = CP.classNamesToFlags(attributes.classes);
      const blockProps = useBlockProps.save({
        className: classes(attributes.classes),
        "data-wp-interactive": "comparetable",
        "data-wp-context": JSON.stringify({
          current: 0,
          isActive: true,
          showTags: false,
          hasHeaderColumn: states.hasHeaderColumn
        }),
        "data-wp-init": "callbacks.initBlock",
        "data-wp-class--is-showing-tags": "context.showTags",
        "data-header-col-class": headerColClasses,
        style: vars
      });
      const hasHeaderRow = !states.doTransposition || states.hasHeaderColumn;
      const hasHeaderColumn = states.doTransposition || states.hasHeaderColumn;
      const tagCells = states.doTransposition ? rows.map((row) => row.cells[0]) : rows[0].cells;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasTags && /* @__PURE__ */ wp.element.createElement("ul", { className: classes.tags() }, tagCells.map((cell, tagIndex) => {
        if (states.hasHeaderColumn && tagIndex === 0) {
          return false;
        }
        return /* @__PURE__ */ wp.element.createElement("li", { className: classes.tags.tag(cell.classes), "data-wp-on--click": "actions.onClickTag", "data-wp-class--is-active": "callbacks.isTagActive", "data-index": tagIndex, key: tagIndex }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }));
      })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.box() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.box._body() }, /* @__PURE__ */ wp.element.createElement(
        "table",
        {
          className: classes.table(),
          style: {
            "--cp-row-count": `${rows.length}`,
            "--cp-column-count": `${rows[0].cells.length}`
          }
        },
        /* @__PURE__ */ wp.element.createElement("colgroup", { className: classes.table.colgroup() }, cols.map((col, index) => /* @__PURE__ */ wp.element.createElement("col", { className: classes.table.colgroup.col(col.classes), "data-col-class": col.classes, key: index }))),
        hasHeaderRow && /* @__PURE__ */ wp.element.createElement("thead", { className: classes.table.thead() }, /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.thead.tr(rows[0].classes), "data-row-class": rows[0].classes }, rows[0].cells.map((cell, columnIndex) => {
          const lineClass = ["is-even-line", "is-odd-line"][states.doTransposition ? columnIndex % 2 : 0];
          if (states.hasHeaderColumn && columnIndex == 0) {
            const cellStates2 = CP.classNamesToFlags(firstCellClasses);
            return /* @__PURE__ */ wp.element.createElement(
              "td",
              {
                className: classes.table.thead.tr.td(rows[0].classes, headerColClasses, firstCellClasses),
                "data-cell-class": cell.classes,
                style: getCssVarsForCell(0, columnIndex),
                key: columnIndex
              },
              !cellStates2.isSpacer && /* @__PURE__ */ wp.element.createElement("div", { "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }))
            );
          }
          const cellStates = CP.classNamesToFlags(cell.classes);
          return /* @__PURE__ */ wp.element.createElement(
            "th",
            {
              className: classes.table.thead.tr.th(rows[0].classes, cell.classes, lineClass),
              "data-cell-class": cell.classes,
              "data-index": columnIndex,
              style: getCssVarsForCell(0, columnIndex),
              key: columnIndex
            },
            cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.label })),
            /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }))
          );
        }))),
        /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.table.tbody() }, rows.map((row, rowIndex) => {
          if (hasHeaderRow && rowIndex === 0) {
            return false;
          }
          return /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.tbody.tr(), "data-row-class": row.classes, key: rowIndex }, row.cells.map((cell, columnIndex) => {
            const colStates = CP.classNamesToFlags(cols[columnIndex]?.classes);
            const cellStates = CP.classNamesToFlags(cell.classes);
            const lineClass = ["is-even-line", "is-odd-line"][(states.doTransposition ? columnIndex : rowIndex) % 2];
            if (hasHeaderColumn && columnIndex == 0) {
              return /* @__PURE__ */ wp.element.createElement(
                "th",
                {
                  className: classes.table.tbody.tr.th(row.classes, headerColClasses, cell.classes, lineClass),
                  "data-cell-class": cell.classes,
                  style: getCssVarsForCell(rowIndex, columnIndex),
                  key: columnIndex
                },
                cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.label })),
                /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.thead.tr.th.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }))
              );
            }
            return /* @__PURE__ */ wp.element.createElement(
              "td",
              {
                className: classes.table.tbody.tr.td(row.classes, cols[columnIndex]?.classes, cell.classes, lineClass),
                "data-cell-class": cell.classes,
                style: getCssVarsForCell(rowIndex, columnIndex),
                key: columnIndex
              },
              cellStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.label(), "data-role": "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.label })),
              colStates.isImage ? /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.image(), "data-role": "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  className: classes.table.tbody.tr.td.image._img(),
                  attr: attributes,
                  keys: imageKeys.image,
                  index: [rowIndex, columnIndex],
                  isTemplate: states.isTemplate
                }
              )) : /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.tbody.tr.td.contents(), "data-role": "contents" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text }))
            );
          }));
        }))
      )))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
