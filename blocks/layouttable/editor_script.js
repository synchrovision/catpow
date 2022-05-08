/**
* @todo BlockVerticalAlignmentToolbarが実装されたら対応
*/
registerBlockType('catpow/layouttable', {
  title: '🐾 LayoutTable',
  description: 'セルの結合と幅の指定ができるテーブルです。',
  icon: 'editor-table',
  category: 'catpow',
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        if (files[1]) {
          return false;
        }

        return files[0].type === 'text/csv';
      },
      priority: 15,
      transform: function transform(files) {
        var attributes = {
          classes: 'wp-block-catpow-layouttable spec',
          rows: [{
            classes: '',
            cells: [{
              text: ['Title'],
              classes: ''
            }]
          }],
          file: files[0]
        };
        return createBlock('catpow/layouttable', attributes);
      }
    }, {
      type: 'block',
      blocks: CP.tableConvertibles,
      transform: function transform(attributes) {
        attributes.classes = "wp-block-catpow-layouttable spec";
        return createBlock('catpow/layouttable', attributes);
      }
    }]
  },
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'table',
      attribute: 'class',
      default: 'wp-block-catpow-layouttable spec'
    },
    rows: {
      source: 'query',
      selector: 'table tr',
      query: {
        classes: {
          source: 'attribute',
          attribute: 'class'
        },
        cells: {
          source: 'query',
          selector: 'th,td',
          query: {
            text: {
              source: 'children'
            },
            classes: {
              source: 'attribute',
              attribute: 'class'
            },
            rowspan: {
              source: 'attribute',
              attribute: 'rowspan'
            },
            colspan: {
              source: 'attribute',
              attribute: 'colspan'
            },
            style: {
              source: 'attribute',
              attribute: 'style'
            }
          }
        }
      },
      default: [{
        classes: '',
        cells: [{
          text: ['Title'],
          classes: 'th'
        }, {
          text: ['Title'],
          classes: 'th'
        }, {
          text: ['Title'],
          classes: 'th'
        }]
      }, {
        classes: '',
        cells: [{
          text: ['Content'],
          classes: ''
        }, {
          text: ['Content'],
          classes: ''
        }, {
          text: ['Content'],
          classes: ''
        }]
      }, {
        classes: '',
        cells: [{
          text: ['Content'],
          classes: ''
        }, {
          text: ['Content'],
          classes: ''
        }, {
          text: ['Content'],
          classes: ''
        }]
      }]
    },
    file: {
      type: 'object'
    },
    blockState: {
      type: 'object',
      default: {
        enableBlockFormat: false
      }
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _wp$element = wp.element,
        useState = _wp$element.useState,
        useMemo = _wp$element.useMemo;
    var _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        rows = attributes.rows;
    var primaryClass = 'wp-block-catpow-layouttable';

    if (attributes.file) {
      var reader = new FileReader();
      reader.addEventListener('loadend', function () {
        var attr = {
          classes: 'wp-block-catpow-layouttable spec',
          rows: [],
          file: false
        };
        var csvData = CP.parseCSV(reader.result);
        csvData.map(function (row, r) {
          attr.rows.push({
            classes: '',
            cells: row.map(function (val) {
              return {
                text: val,
                classes: ''
              };
            })
          });
        });
        setAttributes(attr);
      });
      reader.readAsText(attributes.file);
    }

    var selectiveClasses = useMemo(function () {
      var selectiveClasses = [{
        name: 'type',
        label: 'タイプ',
        filter: 'type',
        values: ['spec', 'sheet', 'plan']
      }, 'color'];
      wp.hooks.applyFilters('catpow.blocks.layouttable.selectiveClasses', CP.finderProxy(selectiveClasses));
      return selectiveClasses;
    }, []);
    var rtn = [];
    var rowLen = rows.length;
    var colLen = 0;
    rows[0].cells.map(function (cell) {
      colLen += parseInt(cell.colspan ? cell.colspan : 1);
    });
    var rowsCopy = rows.map(function (row, r) {
      return {
        classes: row.classes,
        cells: new Array(colLen)
      };
    });
    var selectedCells = [];
    rows.map(function (row, r) {
      var c = 0;
      row.cells.map(function (cell) {
        while (c in rowsCopy[r].cells) {
          c++;
        }

        cell.r = r;
        cell.c = c;
        cell.style = CP.parseStyleString(cell.style);
        var cellCopy = jQuery.extend(true, {}, cell);

        if (cell.rowspan > 1 || cell.colspan > 1) {
          var arias = {
            mergedTo: cellCopy
          };
          rowsCopy.slice(r, r + parseInt(cell.rowspan ? cell.rowspan : 1)).map(function (row) {
            row.cells.fill(arias, c, c + parseInt(cell.colspan ? cell.colspan : 1));
          });
        }

        rowsCopy[r].cells[c] = cellCopy;

        if (cellCopy.isSelected) {
          selectedCells.push(cellCopy);
        }
      });
    });

    var saverows = function saverows() {
      setAttributes({
        rows: rowsCopy.map(function (row) {
          row.cells = row.cells.filter(function (cell) {
            return !cell.mergedTo;
          });
          return row;
        })
      });
    };

    var addRow = function addRow(r) {
      rowsCopy.splice(r, 0, rowsCopy[r]);
      saverows();
    };

    var deleteRow = function deleteRow(r) {
      rowsCopy.splice(r, 1);
      saverows();
    };

    var upRow = function upRow(r) {
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

    var downRow = function downRow(r) {
      upRow(r - 1);
    };

    var addColumn = function addColumn(c) {
      var done = [];
      rowsCopy.map(function (row, r) {
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

    var deleteColumn = function deleteColumn(c) {
      var done = [];
      rowsCopy.map(function (row, r) {
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
      rowsCopy.map(function (row) {
        return row.cells.splice(c, 1);
      });
      saverows();
    };

    var upColumn = function upColumn(c) {
      if (c < 0 || c >= colLen - 1) {
        return;
      }

      rowsCopy.map(function (row) {
        if (row.cells[c].mergedTo && row.cells[c].mergedTo.colspan > 1 || row.cells[c].colspan > 1 || row.cells[c + 1].mergedTo && row.cells[c + 1].mergedTo.colspan > 1 || row.cells[c + 1].colspan > 1) {
          return;
        }

        row.cells.splice(c + 1, 0, row.cells.splice(c, 1)[0]);
      });
      saverows();
    };

    var downColumn = function downColumn(c) {
      upColumn(c - 1);
    };

    var selectCells = function selectCells(e, r, c) {
      if (e.metaKey) {
        rowsCopy[r].cells[c].isSelected = !rowsCopy[r].cells[c].isSelected;
      } else if (e.shiftKey) {
        var org,
            l = false;
        rowsCopy.map(function (row, tr) {
          row.cells.map(function (cell, tc) {
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
              if (rowsCopy[crrR].cells[crrC].mergedTo) continue;
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

    var unselectAllCells = function unselectAllCells() {
      selectedCells.map(function (cell) {
        return cell.isSelected = false;
      });
    };

    var getCellAttr = function getCellAttr(attr, value) {
      if (!selectedCells[0] || !selectedCells[0][attr]) {
        return '';
      }

      return selectedCells[0][attr];
    };

    var setCellAttr = function setCellAttr(attr, value) {
      selectedCells.map(function (cell) {
        cell[attr] = value;
      });
      saverows();
    };

    var setCellClasses = function setCellClasses(values, value) {
      if (!Array.isArray(values) && _.isObject(values)) {
        values = Object.keys(values);
      }

      selectedCells.map(function (cell) {
        var classArray = (cell.classes || '').split(' ');
        classArray = _.difference(classArray, values);

        if (Array.isArray(value)) {
          classArray = classArray.concat(value);
        } else {
          classArray.push(value);
        }

        cell.classes = classArray.join(' ');
      });
      saverows();
    };

    var addCellClasses = function addCellClasses(values) {
      if (!Array.isArray(values)) {
        values = [values];
      }

      selectedCells.map(function (cell) {
        var classArray = (cell.classes || '').split(' ');
        classArray = _.difference(classArray, values);
        classArray = classArray.concat(values);
        cell.classes = classArray.join(' ');
      });
      saverows();
    };

    var removeCellClasses = function removeCellClasses(values) {
      if (!Array.isArray(values)) {
        values = [values];
      }

      selectedCells.map(function (cell) {
        var classArray = (cell.classes || '').split(' ');
        classArray = _.difference(classArray, values);
        cell.classes = classArray.join(' ');
      });
      saverows();
    };

    var getCellClasses = function getCellClasses() {
      if (!selectedCells[0] || !selectedCells[0].classes) {
        return [];
      }

      var rtn = (selectedCells[0].classes || '').split(' ');

      for (var i = 1; i < selectedCells.length; i++) {
        if (rtn.length < 1) {
          return [];
        }

        if (!selectedCells[i].classes) {
          return [];
        }

        rtn = _.intersection((rtn, selectedCells[i].classes || '').split(' '));
      }

      return rtn;
    };

    var isRectSelection = function isRectSelection() {
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

      return selectedCells.every(function (cell) {
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

    var isMergedCellSelected = function isMergedCellSelected() {
      return selectedCells.some(function (cell) {
        return cell.rowspan > 1 || cell.colspan > 1;
      });
    };

    var mergeCells = function mergeCells() {
      var from = selectedCells[0];
      var to = selectedCells[selectedCells.length - 1];
      var text = [];
      selectedCells.map(function (cell) {
        text = text.concat(cell.text);
      });
      from.text = text;
      var arias = {
        mergedTo: from
      };
      rowsCopy.slice(from.r, to.r + 1).map(function (row) {
        row.cells.fill(arias, from.c, to.c + 1);
      });
      from.rowspan = to.r - from.r + 1;
      from.colspan = to.c - from.c + 1;
      rowsCopy[from.r].cells[from.c] = from;
      saverows();
    };

    var breakCells = function breakCells() {
      selectedCells.map(function (cell) {
        var r = cell.r;
        var c = cell.c;

        if (cell.rowspan > 1 || cell.colspan > 1) {
          var cellCopy = jQuery.extend(true, {}, cell);
          cellCopy.text = [];
          cellCopy.rowspan = cellCopy.colspan = false;
          rowsCopy.slice(r, r + parseInt(cell.rowspan ? cell.rowspan : 1)).map(function (row) {
            row.cells.fill(cellCopy, c, c + parseInt(cell.colspan ? cell.colspan : 1));
          });
          cell.rowspan = cell.colspan = false;
        }

        rowsCopy[r].cells[c] = cell;
      });
      saverows();
    };

    var cellClasses = getCellClasses();

    var selectCellClasses = function selectCellClasses(prm) {
      var label = prm.label,
          values = prm.values;
      var options, value;

      if (prm.filter && CP.filters.layouttable && CP.filters.layouttable[prm.filter]) {
        CP.filters.layouttable[prm.filter](prm);
      }

      if (Array.isArray(values)) {
        options = values.map(function (cls) {
          return {
            label: cls,
            value: cls
          };
        });
      } else {
        options = Object.keys(values).map(function (cls) {
          return {
            label: values[cls],
            value: cls
          };
        });
        values = Object.keys(values);
      }

      value = _.intersection(cellClasses, values).shift();

      if (!value) {
        value = 'default';
      }

      return wp.element.createElement(SelectControl, {
        label: label,
        onChange: function onChange(input) {
          if (input == 'default') {
            removeCellClasses(values);
          } else {
            setCellClasses(values, input);
          }
        },
        value: value,
        options: options
      });
    };

    var aligns = ['left', 'center', 'right'];
    var valigns = ['top', 'center', 'bottom'];
    return [wp.element.createElement(BlockControls, null, wp.element.createElement(AlignmentToolbar, {
      value: _.intersection(cellClasses, aligns).shift(),
      onChange: function onChange(value) {
        if (value) {
          setCellClasses(aligns, value);
        } else {
          removeCellClasses(aligns);
        }
      }
    })), wp.element.createElement("table", {
      className: classes
    }, wp.element.createElement("tbody", null, rowsCopy.map(function (row, r) {
      return wp.element.createElement("tr", null, row.cells.map(function (cell, c) {
        if (cell.mergedTo) {
          return false;
        }

        if (cell.style instanceof String) {
          cell.style = JSON.parse(cell.style);
        }

        return el(cell.classes && cell.classes.split(' ').includes('th') ? 'th' : 'td', {
          className: cell.classes,
          rowspan: cell.rowspan,
          colspan: cell.colspan,
          style: cell.style,
          onClick: function onClick(e) {
            return selectCells(e, r, c);
          }
        }, wp.element.createElement(Fragment, null, wp.element.createElement(RichText, {
          onChange: function onChange(text) {
            cell.text = text;
            saverows();
          },
          value: cell.text
        }), isSelected && c == colLen - parseInt(cell.colspan ? cell.colspan : 1) && wp.element.createElement("div", {
          class: "itemControl rowControl"
        }, wp.element.createElement("div", {
          className: "btn up",
          onClick: function onClick() {
            return downRow(r);
          }
        }), wp.element.createElement("div", {
          className: "btn delete",
          onClick: function onClick() {
            return deleteRow(r);
          }
        }), wp.element.createElement("div", {
          className: "btn clone",
          onClick: function onClick() {
            return addRow(r);
          }
        }), wp.element.createElement("div", {
          className: "btn down",
          onClick: function onClick() {
            return upRow(r);
          }
        })), isSelected && r == rowLen - parseInt(cell.rowspan ? cell.rowspan : 1) && wp.element.createElement("div", {
          class: "itemControl columnControl"
        }, wp.element.createElement("div", {
          className: "btn left",
          onClick: function onClick() {
            return downColumn(c);
          }
        }), wp.element.createElement("div", {
          className: "btn delete",
          onClick: function onClick() {
            return deleteColumn(c);
          }
        }), wp.element.createElement("div", {
          className: "btn clone",
          onClick: function onClick() {
            return addColumn(c);
          }
        }), wp.element.createElement("div", {
          className: "btn right",
          onClick: function onClick() {
            return upColumn(c);
          }
        })), isSelected && cell.isSelected && wp.element.createElement("div", {
          className: "selectBox"
        })));
      }));
    }))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses
    }), wp.element.createElement(PanelBody, {
      title: "\u30BB\u30EB"
    }, selectCellClasses({
      label: 'タイプ',
      filter: 'role',
      values: {
        'default': '通常',
        'th': "見出し",
        'spacer': "空白"
      }
    }), selectCellClasses({
      label: 'カラー',
      filter: 'color',
      values: {
        'default': 'なし',
        'pale': '薄色',
        'primary': "推奨",
        'deprecated': "非推奨"
      }
    }), selectCellClasses({
      label: '文字',
      filter: 'size',
      values: {
        'default': 'なし',
        'large': "大",
        'medium': "中",
        'small': "小"
      }
    }), wp.element.createElement(TextControl, {
      label: "\u5E45",
      value: getCellAttr('style').width || '',
      onChange: function onChange(val) {
        if (val) {
          setCellAttr('style', {
            width: val
          });
        } else {
          setCellAttr('style', {});
        }
      }
    }), isRectSelection() && wp.element.createElement(Button, {
      isDefault: true,
      onClick: function onClick() {
        return mergeCells();
      }
    }, "\u30BB\u30EB\u3092\u7D50\u5408"), selectedCells.some(function (cell) {
      return cell.rowspan > 1 || cell.colspan > 1;
    }) && wp.element.createElement(Button, {
      isDefault: true,
      onClick: function onClick() {
        return breakCells();
      }
    }, "\u7D50\u5408\u3092\u89E3\u9664")))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var classes = attributes.classes,
        rows = attributes.rows;
    return wp.element.createElement("table", {
      className: classes
    }, wp.element.createElement("tbody", null, rows.map(function (row) {
      return wp.element.createElement("tr", null, row.cells.map(function (cell) {
        cell.style = CP.parseStyleString(cell.style);
        return el(cell.classes && cell.classes.split(' ').includes('th') ? 'th' : 'td', {
          className: cell.classes,
          rowspan: cell.rowspan,
          colspan: cell.colspan,
          style: cell.style
        }, wp.element.createElement(RichText.Content, {
          value: cell.text
        }));
      }));
    })));
  }
});
