function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

registerBlockType('catpow/chart', {
  title: '🐾 Chart',
  description: 'グラフを表示します。',
  icon: 'chart-bar',
  category: 'catpow',
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'div',
      attribute: 'class',
      default: 'wp-block-catpow-chart BarChart'
    },
    graph: {
      source: 'query',
      selector: 'svg',
      query: {
        title: {
          source: 'text',
          selector: 'g.ChartText text.title'
        },
        unit: {
          source: 'text',
          selector: 'g.ChartText text.unit'
        },
        rowTitle: {
          source: 'text',
          selector: 'g.ChartText text.rowTitle'
        },
        rowUnit: {
          source: 'text',
          selector: 'g.ChartText text.rowUnit'
        },
        total: {
          source: 'attribute',
          selector: 'data-total'
        },
        rows: {
          source: 'query',
          selector: 'g.graph g.row',
          query: {
            classes: {
              source: 'attribute',
              attribute: 'class'
            },
            label: {
              source: 'attribute',
              attribute: 'data-label'
            },
            vals: {
              source: 'query',
              selector: '.val',
              query: {
                value: {
                  source: 'attribute',
                  attribute: 'data-value'
                }
              }
            }
          }
        },
        cols: {
          source: 'query',
          selector: 'g.graph g.col',
          query: {
            classes: {
              source: 'attribute',
              attribute: 'class'
            },
            label: {
              source: 'attribute',
              attribute: 'data-label'
            }
          }
        }
      },
      default: [{
        title: 'ステータス',
        unit: 'pt',
        rowTitle: '日数',
        rowUnit: '日',
        rows: [{
          classes: 'row weak',
          label: '1',
          vals: [{
            value: 30
          }, {
            value: 40
          }, {
            value: 40
          }, {
            value: 40
          }, {
            value: 40
          }]
        }, {
          classes: 'row normal',
          label: '2',
          vals: [{
            value: 40
          }, {
            value: 60
          }, {
            value: 30
          }, {
            value: 20
          }, {
            value: 50
          }]
        }, {
          classes: 'row strong',
          label: '3',
          vals: [{
            value: 50
          }, {
            value: 80
          }, {
            value: 20
          }, {
            value: 30
          }, {
            value: 60
          }]
        }],
        cols: [{
          classes: 'col color1',
          label: 'VIT'
        }, {
          classes: 'col color2',
          label: 'STR'
        }, {
          classes: 'col color3',
          label: 'AGR'
        }, {
          classes: 'col color4',
          label: 'INT'
        }, {
          classes: 'col color5',
          label: 'MND'
        }]
      }]
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var classes = attributes.classes,
        graph = attributes.graph,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode;
    var primaryClass = 'wp-block-catpow-chart';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var classNameArray = className.split(' ');
    var selectiveClasses = [{
      label: 'タイプ',
      filter: 'type',
      values: {
        BarChart: '棒グラフ',
        PieChart: '円グラフ',
        LineChart: '折れ線グラフ',
        RadarChart: 'レーダーチャート'
      }
    }, {
      label: '値を表示',
      values: 'hasValue',
      sub: [{
        label: '単位を表示',
        values: 'hasUnit'
      }]
    }, {
      label: '枠線を表示',
      values: 'hasFrame'
    }, {
      label: '罫線を表示',
      values: 'hasGrid'
    }];
    var type = CP.getSelectiveClass({
      attr: attributes
    }, selectiveClasses[0].values);
    var states = CP.wordsToFlags(classes);

    var save = function save() {
      setAttributes({
        graph: JSON.parse(JSON.stringify(graph))
      });
    };

    var DataTable = function DataTable() {
      return wp.element.createElement("div", {
        className: "dataTable"
      }, wp.element.createElement("table", {
        className: "editItemsTable"
      }, wp.element.createElement("thead", null, wp.element.createElement("tr", null, wp.element.createElement("th", {
        align: "center",
        onBlur: function onBlur(e) {
          graph[0].title = e.currentTarget.innerHTML;
          save();
        },
        contentEditable: true,
        colSpan: graph[0].cols.length + 1
      }, graph[0].title)), wp.element.createElement("tr", null, wp.element.createElement("th", null), graph[0].cols.map(function (col, c) {
        return wp.element.createElement("th", {
          align: "center",
          onBlur: function onBlur(e) {
            col.label = e.currentTarget.innerHTML;
            save();
          },
          contentEditable: true
        }, col.label);
      }))), wp.element.createElement("tbody", null, graph[0].rows.map(function (row, r) {
        return wp.element.createElement("tr", null, wp.element.createElement("th", {
          align: "center",
          onBlur: function onBlur(e) {
            row.label = e.currentTarget.innerHTML;
            save();
          },
          contentEditable: true
        }, row.label), row.vals.map(function (val, c) {
          return wp.element.createElement("td", {
            align: "center",
            onBlur: function onBlur(e) {
              val.value = e.currentTarget.innerHTML;
              save();
            },
            contentEditable: true
          }, val.value);
        }));
      }))));
    };

    return wp.element.createElement(Fragment, null, wp.element.createElement(BlockControls, null, wp.element.createElement(Toolbar, {
      controls: [{
        icon: 'edit',
        title: 'EditMode',
        isActive: EditMode,
        onClick: function onClick() {
          return setAttributes({
            EditMode: !EditMode
          });
        }
      }]
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.chart || {}
    }), wp.element.createElement(PanelBody, {
      title: "CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: "\u30AF\u30E9\u30B9",
      onChange: function onChange(clss) {
        return setAttributes({
          classes: clss
        });
      },
      value: classArray.join(' ')
    }))), EditMode ? DataTable() : wp.element.createElement("div", {
      className: classes
    }, el(Catpow[type + 'Output'], _objectSpread(_objectSpread({}, states), graph[0]))));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var classes = attributes.classes,
        graph = attributes.graph;

    var classArray = _.uniq((attributes.classes || '').split(' '));

    var selectiveClasses = [{
      label: 'タイプ',
      values: {
        BarChart: '棒グラフ',
        PieChat: '円グラフ',
        LineChart: '折れ線グラフ',
        RadarChart: 'レーダーチャート'
      }
    }];
    var type = CP.getSelectiveClass({
      attr: attributes
    }, selectiveClasses[0].values);
    var states = CP.wordsToFlags(classes);
    return wp.element.createElement("div", {
      className: classes
    }, el(Catpow[type + 'Output'], _objectSpread(_objectSpread({}, states), graph[0])));
  }
});
