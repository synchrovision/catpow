(() => {
  // blocks/chart/editor_script.jsx
  wp.blocks.registerBlockType("catpow/chart", {
    title: "\u{1F43E} Chart",
    description: "\u30B0\u30E9\u30D5\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "chart-bar",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-chart BarChart" },
      graph: {
        source: "query",
        selector: "svg",
        query: {
          title: { source: "text", selector: "g.ChartText text.title" },
          unit: { source: "text", selector: "g.ChartText text.unit" },
          rowTitle: { source: "text", selector: "g.ChartText text.rowTitle" },
          rowUnit: { source: "text", selector: "g.ChartText text.rowUnit" },
          total: { source: "attribute", selector: "data-total" },
          rows: {
            source: "query",
            selector: "g.graph g.row",
            query: {
              classes: { source: "attribute", attribute: "class" },
              label: { source: "attribute", attribute: "data-label" },
              vals: {
                source: "query",
                selector: ".val",
                query: {
                  value: { source: "attribute", attribute: "data-value" }
                }
              }
            }
          },
          cols: {
            source: "query",
            selector: "g.graph g.col",
            query: {
              classes: { source: "attribute", attribute: "class" },
              label: { source: "attribute", attribute: "data-label" }
            }
          }
        },
        default: [{
          title: "\u30B9\u30C6\u30FC\u30BF\u30B9",
          unit: "pt",
          rowTitle: "\u65E5\u6570",
          rowUnit: "\u65E5",
          rows: [
            { classes: "row weak", label: "1", vals: [{ value: 30 }, { value: 40 }, { value: 40 }, { value: 40 }, { value: 40 }] },
            { classes: "row normal", label: "2", vals: [{ value: 40 }, { value: 60 }, { value: 30 }, { value: 20 }, { value: 50 }] },
            { classes: "row strong", label: "3", vals: [{ value: 50 }, { value: 80 }, { value: 20 }, { value: 30 }, { value: 60 }] }
          ],
          cols: [
            { classes: "col color1", label: "VIT" },
            { classes: "col color2", label: "STR" },
            { classes: "col color3", label: "AGR" },
            { classes: "col color4", label: "INT" },
            { classes: "col color5", label: "MND" }
          ]
        }]
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, graph, EditMode = false } = attributes;
      const primaryClass = "wp-block-catpow-chart";
      var classArray = _.uniq((className + " " + classes).split(" "));
      var classNameArray = className.split(" ");
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            values: {
              BarChart: "\u68D2\u30B0\u30E9\u30D5",
              PieChart: "\u5186\u30B0\u30E9\u30D5",
              LineChart: "\u6298\u308C\u7DDA\u30B0\u30E9\u30D5",
              RadarChart: "\u30EC\u30FC\u30C0\u30FC\u30C1\u30E3\u30FC\u30C8"
            }
          },
          { name: "value", label: "\u5024\u3092\u8868\u793A", values: "hasValue", sub: [
            { label: "\u5358\u4F4D\u3092\u8868\u793A", values: "hasUnit" }
          ] },
          { name: "frame", label: "\u67A0\u7DDA\u3092\u8868\u793A", values: "hasFrame" },
          { name: "grid", label: "\u7F6B\u7DDA\u3092\u8868\u793A", values: "hasGrid" }
        ];
        wp.hooks.applyFilters("catpow.blocks.chart.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);
      const states = CP.wordsToFlags(classes);
      const save = () => {
        setAttributes({ graph: JSON.parse(JSON.stringify(graph)) });
      };
      const DataTable = () => {
        return /* @__PURE__ */ wp.element.createElement("div", { className: "dataTable" }, /* @__PURE__ */ wp.element.createElement("table", { className: "editItemsTable" }, /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement(
          "th",
          {
            align: "center",
            onBlur: (e) => {
              graph[0].title = e.currentTarget.innerHTML;
              save();
            },
            contentEditable: true,
            colSpan: graph[0].cols.length + 1
          },
          graph[0].title
        )), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null), graph[0].cols.map((col, c) => {
          return /* @__PURE__ */ wp.element.createElement(
            "th",
            {
              align: "center",
              onBlur: (e) => {
                col.label = e.currentTarget.innerHTML;
                save();
              },
              contentEditable: true
            },
            col.label
          );
        }))), /* @__PURE__ */ wp.element.createElement("tbody", null, graph[0].rows.map((row, r) => {
          return /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement(
            "th",
            {
              align: "center",
              onBlur: (e) => {
                row.label = e.currentTarget.innerHTML;
                save();
              },
              contentEditable: true
            },
            row.label
          ), row.vals.map((val, c) => {
            return /* @__PURE__ */ wp.element.createElement(
              "td",
              {
                align: "center",
                onBlur: (e) => {
                  val.value = e.currentTarget.innerHTML;
                  save();
                },
                contentEditable: true
              },
              val.value
            );
          }));
        }))));
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        Toolbar,
        {
          controls: [
            {
              icon: "edit",
              title: "EditMode",
              isActive: EditMode,
              onClick: () => setAttributes({ EditMode: !EditMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.chart || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      ))), EditMode ? DataTable() : /* @__PURE__ */ wp.element.createElement("div", { className: classes }, Catpow[type + "Output"] ? el(Catpow[type + "Output"], { ...states, ...graph[0] }) : /* @__PURE__ */ wp.element.createElement("div", { className: "alert" }, "Invalid Chart Type")));
    },
    save({ attributes, className }) {
      const { classes, graph } = attributes;
      var classArray = _.uniq((attributes.classes || "").split(" "));
      var selectiveClasses = [
        {
          label: "\u30BF\u30A4\u30D7",
          values: {
            BarChart: "\u68D2\u30B0\u30E9\u30D5",
            PieChat: "\u5186\u30B0\u30E9\u30D5",
            LineChart: "\u6298\u308C\u7DDA\u30B0\u30E9\u30D5",
            RadarChart: "\u30EC\u30FC\u30C0\u30FC\u30C1\u30E3\u30FC\u30C8"
          }
        }
      ];
      let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);
      const states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, el(Catpow[type + "Output"], { ...states, ...graph[0] }));
    }
  });
})();
