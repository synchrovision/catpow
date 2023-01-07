(() => {
  // blocks/layouttable/editor_script.jsx
  wp.blocks.registerBlockType("catpow/layouttable", {
    title: "\u{1F43E} LayoutTable",
    description: "\u30BB\u30EB\u306E\u7D50\u5408\u3068\u5E45\u306E\u6307\u5B9A\u304C\u3067\u304D\u308B\u30C6\u30FC\u30D6\u30EB\u3067\u3059\u3002",
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
          priority: 15,
          transform: (files) => {
            var attributes = {
              classes: "wp-block-catpow-layouttable spec",
              rows: [{ classes: "", cells: [{ text: ["Title"], classes: "" }] }],
              file: files[0]
            };
            return createBlock("catpow/layouttable", attributes);
          }
        },
        {
          type: "block",
          blocks: CP.tableConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-layouttable spec";
            return createBlock("catpow/layouttable", attributes);
          }
        }
      ]
    },
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-layouttable spec" },
      rows: {
        source: "query",
        selector: "table tr",
        query: {
          classes: { source: "attribute", attribute: "class" },
          cells: {
            source: "query",
            selector: "th,td",
            query: {
              text: { source: "children" },
              classes: { source: "attribute", attribute: "class" },
              rowspan: { source: "attribute", attribute: "rowspan" },
              colspan: { source: "attribute", attribute: "colspan" },
              style: { source: "attribute", attribute: "style" }
            }
          }
        },
        default: [
          { classes: "", cells: [
            { text: ["Title"], classes: "th" },
            { text: ["Title"], classes: "th" },
            { text: ["Title"], classes: "th" }
          ] },
          { classes: "", cells: [
            { text: ["Content"], classes: "" },
            { text: ["Content"], classes: "" },
            { text: ["Content"], classes: "" }
          ] },
          { classes: "", cells: [
            { text: ["Content"], classes: "" },
            { text: ["Content"], classes: "" },
            { text: ["Content"], classes: "" }
          ] }
        ]
      },
      file: { type: "object" },
      blockState: { type: "object", default: { enableBlockFormat: false } }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, Button, TreeSelect, TextareaControl, TextControl, ServerSideRender } = wp.components;
      const { classes = "", rows } = attributes;
      const primaryClass = "wp-block-catpow-layouttable";
      if (attributes.file) {
        var reader = new FileReader();
        reader.addEventListener("loadend", () => {
          var attr = {
            classes: "wp-block-catpow-layouttable spec",
            rows: [],
            file: false
          };
          var csvData = CP.parseCSV(reader.result);
          csvData.map((row, r) => {
            attr.rows.push({ classes: "", cells: row.map((val) => {
              return { text: val, classes: "" };
            }) });
          });
          setAttributes(attr);
        });
        reader.readAsText(attributes.file);
      }
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = [
          { name: "type", label: "\u30BF\u30A4\u30D7", filter: "type", values: ["spec", "sheet", "plan"] },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.layouttable.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      var rtn = [];
      var rowLen = rows.length;
      var colLen = 0;
      rows[0].cells.map((cell) => {
        colLen += parseInt(cell.colspan ? cell.colspan : 1);
      });
      var rowsCopy = rows.map((row, r) => {
        return { classes: row.classes, cells: new Array(colLen) };
      });
      var selectedCells = [];
      rows.map((row, r) => {
        let c = 0;
        row.cells.map((cell) => {
          while (c in rowsCopy[r].cells) {
            c++;
          }
          cell.r = r;
          cell.c = c;
          cell.style = CP.parseStyleString(cell.style);
          var cellCopy = jQuery.extend(true, {}, cell);
          if (cell.rowspan > 1 || cell.colspan > 1) {
            let arias = { mergedTo: cellCopy };
            rowsCopy.slice(r, r + parseInt(cell.rowspan ? cell.rowspan : 1)).map((row2) => {
              row2.cells.fill(arias, c, c + parseInt(cell.colspan ? cell.colspan : 1));
            });
          }
          rowsCopy[r].cells[c] = cellCopy;
          if (cellCopy.isSelected) {
            selectedCells.push(cellCopy);
          }
        });
      });
      const saverows = () => {
        setAttributes({ rows: rowsCopy.map((row) => {
          row.cells = row.cells.filter((cell) => !cell.mergedTo);
          return row;
        }) });
      };
      const addRow = (r) => {
        rowsCopy.splice(r, 0, rowsCopy[r]);
        saverows();
      };
      const deleteRow = (r) => {
        rowsCopy.splice(r, 1);
        saverows();
      };
      const upRow = (r) => {
        if (r < 0 || r >= rowLen - 1) {
          return;
        }
        rowsCopy.splice(r + 1, 0, rowsCopy.splice(r, 1)[0]);
        var r1 = rowsCopy[r].cells;
        var r2 = rowsCopy[r + 1].cells;
        for (var c = 0; c < colLen; c++) {
          if (r1[c].mergedTo && r1[c].mergedTo.rowspan > 1 || r1[c].rowspan > 1 || r2[c].mergedTo && r2[c].mergedTo.rowspan > 1 || r2[c].rowspan > 1) {
            console.log(c);
            r1.splice(c, 0, r2.splice(c, 1)[0]);
            r2.splice(c, 0, r1.splice(c + 1, 1)[0]);
          }
        }
        saverows();
      };
      const downRow = (r) => {
        upRow(r - 1);
      };
      const addColumn = (c) => {
        let done = [];
        rowsCopy.map((row, r) => {
          if (row.cells[c].colspan > 1) {
            done.push(row.cells[c]);
            row.cells[c].colspan++;
            row.cells.splice(c, 0, row.cells[c + 1]);
          } else {
            if (row.cells[c].mergedTo && !done.includes(row.cells[c].mergedTo)) {
              done.push(row.cells[c].mergedTo);
              if (row.cells[c].mergedTo.colspan > 1) {
                row.cells[c].mergedTo.colspan++;
              }
            }
            row.cells.splice(c, 0, row.cells[c]);
          }
        });
        saverows();
      };
      const deleteColumn = (c) => {
        let done = [];
        rowsCopy.map((row, r) => {
          if (row.cells[c].colspan > 1) {
            done.push(row.cells[c]);
            row.cells[c].colspan--;
            row.cells[c + 1] = row.cells[c];
          } else if (row.cells[c].mergedTo && !done.includes(row.cells[c].mergedTo)) {
            done.push(row.cells[c].mergedTo);
            if (row.cells[c].mergedTo.colspan > 1) {
              row.cells[c].mergedTo.colspan--;
            }
          }
        });
        rowsCopy.map((row) => row.cells.splice(c, 1));
        saverows();
      };
      const upColumn = (c) => {
        if (c < 0 || c >= colLen - 1) {
          return;
        }
        rowsCopy.map((row) => {
          if (row.cells[c].mergedTo && row.cells[c].mergedTo.colspan > 1 || row.cells[c].colspan > 1 || row.cells[c + 1].mergedTo && row.cells[c + 1].mergedTo.colspan > 1 || row.cells[c + 1].colspan > 1) {
            return;
          }
          row.cells.splice(c + 1, 0, row.cells.splice(c, 1)[0]);
        });
        saverows();
      };
      const downColumn = (c) => {
        upColumn(c - 1);
      };
      const selectCells = (e, r, c) => {
        if (e.metaKey) {
          rowsCopy[r].cells[c].isSelected = !rowsCopy[r].cells[c].isSelected;
        } else if (e.shiftKey) {
          let org, l = false;
          rowsCopy.map((row, tr) => {
            row.cells.map((cell, tc) => {
              if (cell.isSelected) {
                if (!org || l > Math.abs(tr - r) + Math.abs(tc - c)) {
                  l = Math.abs(tr - r) + Math.abs(tc - c);
                  org = [tr, tc];
                }
              }
            });
          });
          if (org) {
            for (var crrR = Math.min(org[0], r); crrR <= Math.max(org[0], r); crrR++) {
              for (var crrC = Math.min(org[1], c); crrC <= Math.max(org[1], c); crrC++) {
                if (rowsCopy[crrR].cells[crrC].mergedTo)
                  continue;
                rowsCopy[crrR].cells[crrC].isSelected = true;
              }
            }
          } else {
            rowsCopy[r].cells[c].isSelected = true;
          }
        } else {
          unselectAllCells();
          rowsCopy[r].cells[c].isSelected = true;
        }
        saverows();
      };
      const unselectAllCells = () => {
        selectedCells.map((cell) => cell.isSelected = false);
      };
      const getCellAttr = (attr, value) => {
        if (!selectedCells[0] || !selectedCells[0][attr]) {
          return "";
        }
        return selectedCells[0][attr];
      };
      const setCellAttr = (attr, value) => {
        selectedCells.map((cell) => {
          cell[attr] = value;
        });
        saverows();
      };
      const setCellClasses = (values, value) => {
        if (!Array.isArray(values) && _.isObject(values)) {
          values = Object.keys(values);
        }
        selectedCells.map((cell) => {
          let classArray = (cell.classes || "").split(" ");
          classArray = _.difference(classArray, values);
          if (Array.isArray(value)) {
            classArray = classArray.concat(value);
          } else {
            classArray.push(value);
          }
          cell.classes = classArray.join(" ");
        });
        saverows();
      };
      const addCellClasses = (values) => {
        if (!Array.isArray(values)) {
          values = [values];
        }
        selectedCells.map((cell) => {
          let classArray = (cell.classes || "").split(" ");
          classArray = _.difference(classArray, values);
          classArray = classArray.concat(values);
          cell.classes = classArray.join(" ");
        });
        saverows();
      };
      const removeCellClasses = (values) => {
        if (!Array.isArray(values)) {
          values = [values];
        }
        selectedCells.map((cell) => {
          let classArray = (cell.classes || "").split(" ");
          classArray = _.difference(classArray, values);
          cell.classes = classArray.join(" ");
        });
        saverows();
      };
      const getCellClasses = () => {
        if (!selectedCells[0] || !selectedCells[0].classes) {
          return [];
        }
        var rtn2 = (selectedCells[0].classes || "").split(" ");
        for (var i = 1; i < selectedCells.length; i++) {
          if (rtn2.length < 1) {
            return [];
          }
          if (!selectedCells[i].classes) {
            return [];
          }
          rtn2 = _.intersection((rtn2, selectedCells[i].classes || "").split(" "));
        }
        return rtn2;
      };
      const isRectSelection = () => {
        if (selectedCells.length < 2) {
          return false;
        }
        var from = selectedCells[0];
        var to = selectedCells[selectedCells.length - 1];
        var fromC = from.c;
        var toR = to.r;
        var toC = to.c;
        if (to.rowlspan > 1) {
          toR += to.rowspan - 1;
        }
        if (to.colspan > 1) {
          toC += to.colspan - 1;
        }
        return selectedCells.every((cell) => {
          if (cell.c < fromC || cell.c > toC) {
            return false;
          }
          if (cell.rowspan > 1 && cell.r + cell.rowspan - 1 > toR) {
            return false;
          }
          if (cell.colspan > 1 && cell.c + cell.colspan - 1 > toC) {
            return false;
          }
          return true;
        });
      };
      const isMergedCellSelected = () => {
        return selectedCells.some((cell) => cell.rowspan > 1 || cell.colspan > 1);
      };
      const mergeCells = () => {
        var from = selectedCells[0];
        var to = selectedCells[selectedCells.length - 1];
        var text = [];
        selectedCells.map((cell) => {
          text = text.concat(cell.text);
        });
        from.text = text;
        let arias = { mergedTo: from };
        rowsCopy.slice(from.r, to.r + 1).map((row) => {
          row.cells.fill(arias, from.c, to.c + 1);
        });
        from.rowspan = to.r - from.r + 1;
        from.colspan = to.c - from.c + 1;
        rowsCopy[from.r].cells[from.c] = from;
        saverows();
      };
      const breakCells = () => {
        selectedCells.map((cell) => {
          let r = cell.r;
          let c = cell.c;
          if (cell.rowspan > 1 || cell.colspan > 1) {
            var cellCopy = jQuery.extend(true, {}, cell);
            cellCopy.text = [];
            cellCopy.rowspan = cellCopy.colspan = false;
            rowsCopy.slice(r, r + parseInt(cell.rowspan ? cell.rowspan : 1)).map((row) => {
              row.cells.fill(cellCopy, c, c + parseInt(cell.colspan ? cell.colspan : 1));
            });
            cell.rowspan = cell.colspan = false;
          }
          rowsCopy[r].cells[c] = cell;
        });
        saverows();
      };
      var cellClasses = getCellClasses();
      const selectCellClasses = (prm) => {
        var { label, values } = prm;
        var options, value;
        if (prm.filter && CP.filters.layouttable && CP.filters.layouttable[prm.filter]) {
          CP.filters.layouttable[prm.filter](prm);
        }
        if (Array.isArray(values)) {
          options = values.map((cls) => {
            return { label: cls, value: cls };
          });
        } else {
          options = Object.keys(values).map((cls) => {
            return { label: values[cls], value: cls };
          });
          values = Object.keys(values);
        }
        value = _.intersection(cellClasses, values).shift();
        if (!value) {
          value = "default";
        }
        return /* @__PURE__ */ wp.element.createElement(
          SelectControl,
          {
            label,
            onChange: (input) => {
              if (input == "default") {
                removeCellClasses(values);
              } else {
                setCellClasses(values, input);
              }
            },
            value,
            options
          }
        );
      };
      const aligns = ["left", "center", "right"];
      const valigns = ["top", "center", "bottom"];
      return [
        /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
          AlignmentToolbar,
          {
            value: _.intersection(cellClasses, aligns).shift(),
            onChange: (value) => {
              if (value) {
                setCellClasses(aligns, value);
              } else {
                removeCellClasses(aligns);
              }
            }
          }
        )),
        /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, rowsCopy.map((row, r) => {
          return /* @__PURE__ */ wp.element.createElement("tr", null, row.cells.map((cell, c) => {
            if (cell.mergedTo) {
              return false;
            }
            if (cell.style instanceof String) {
              cell.style = JSON.parse(cell.style);
            }
            return el(
              cell.classes && cell.classes.split(" ").includes("th") ? "th" : "td",
              {
                className: cell.classes,
                rowspan: cell.rowspan,
                colspan: cell.colspan,
                style: cell.style,
                onClick: (e) => selectCells(e, r, c)
              },
              /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RichText, { onChange: (text) => {
                cell.text = text;
                saverows();
              }, value: cell.text }), isSelected && c == colLen - parseInt(cell.colspan ? cell.colspan : 1) && /* @__PURE__ */ wp.element.createElement("div", { class: "itemControl rowControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn up", onClick: () => downRow(r) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: () => deleteRow(r) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: () => addRow(r) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn down", onClick: () => upRow(r) })), isSelected && r == rowLen - parseInt(cell.rowspan ? cell.rowspan : 1) && /* @__PURE__ */ wp.element.createElement("div", { class: "itemControl columnControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn left", onClick: () => downColumn(c) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: () => deleteColumn(c) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: () => addColumn(c) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn right", onClick: () => upColumn(c) })), isSelected && cell.isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "selectBox" }))
            );
          }));
        }))),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses
          }
        ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u30BB\u30EB" }, selectCellClasses({ label: "\u30BF\u30A4\u30D7", filter: "role", values: {
          "default": "\u901A\u5E38",
          "th": "\u898B\u51FA\u3057",
          "spacer": "\u7A7A\u767D"
        } }), selectCellClasses({ label: "\u30AB\u30E9\u30FC", filter: "color", values: {
          "default": "\u306A\u3057",
          "pale": "\u8584\u8272",
          "primary": "\u63A8\u5968",
          "deprecated": "\u975E\u63A8\u5968"
        } }), selectCellClasses({ label: "\u6587\u5B57", filter: "size", values: {
          "default": "\u306A\u3057",
          "large": "\u5927",
          "medium": "\u4E2D",
          "small": "\u5C0F"
        } }), /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: "\u5E45",
            value: getCellAttr("style").width || "",
            onChange: (val) => {
              if (val) {
                setCellAttr("style", { width: val });
              } else {
                setCellAttr("style", {});
              }
            }
          }
        ), isRectSelection() && /* @__PURE__ */ wp.element.createElement(Button, { isDefault: true, onClick: () => mergeCells() }, "\u30BB\u30EB\u3092\u7D50\u5408"), selectedCells.some((cell) => cell.rowspan > 1 || cell.colspan > 1) && /* @__PURE__ */ wp.element.createElement(Button, { isDefault: true, onClick: () => breakCells() }, "\u7D50\u5408\u3092\u89E3\u9664")))
      ];
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { classes, rows } = attributes;
      return /* @__PURE__ */ wp.element.createElement("table", { className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row) => {
        return /* @__PURE__ */ wp.element.createElement("tr", null, row.cells.map((cell) => {
          cell.style = CP.parseStyleString(cell.style);
          return el(
            cell.classes && cell.classes.split(" ").includes("th") ? "th" : "td",
            { className: cell.classes, rowspan: cell.rowspan, colspan: cell.colspan, style: cell.style },
            /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: cell.text })
          );
        }));
      })));
    }
  });
})();
