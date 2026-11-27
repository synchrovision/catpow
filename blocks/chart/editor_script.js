(() => {
  // ../blocks/chart/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/chart", {
    icon: "chart-bar",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, createElement: el } = wp.element;
      const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { classes, graph, EditMode = false } = attributes;
      const primaryClass = "wp-block-catpow-chart";
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            filter: "type",
            values: {
              BarChart: __("\u68D2\u30B0\u30E9\u30D5", "catpow"),
              PieChart: __("\u5186\u30B0\u30E9\u30D5", "catpow"),
              LineChart: __("\u6298\u308C\u7DDA\u30B0\u30E9\u30D5", "catpow"),
              RadarChart: __("\u30EC\u30FC\u30C0\u30FC\u30C1\u30E3\u30FC\u30C8", "catpow")
            }
          },
          { name: "value", label: __("\u5024\u3092\u8868\u793A", "catpow"), values: "hasValue", sub: [{ label: __("\u5358\u4F4D\u3092\u8868\u793A", "catpow"), values: "hasUnit" }] },
          { name: "frame", label: __("\u67A0\u7DDA\u3092\u8868\u793A", "catpow"), values: "hasFrame" },
          { name: "grid", label: __("\u7F6B\u7DDA\u3092\u8868\u793A", "catpow"), values: "hasGrid" }
        ];
        wp.hooks.applyFilters("catpow.blocks.chart.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);
      const states = CP.classNamesToFlags(classes);
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
            suppressContentEditableWarning: true,
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
              contentEditable: true,
              suppressContentEditableWarning: true
            },
            col.label
          );
        }))), /* @__PURE__ */ wp.element.createElement("tbody", null, graph[0].rows.map((row, r) => {
          return /* @__PURE__ */ wp.element.createElement("tr", { key: r }, /* @__PURE__ */ wp.element.createElement(
            "th",
            {
              align: "center",
              onBlur: (e) => {
                row.label = e.currentTarget.innerHTML;
                save();
              },
              contentEditable: true,
              suppressContentEditableWarning: true
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
                contentEditable: true,
                suppressContentEditableWarning: true,
                key: c
              },
              val.value
            );
          }));
        }))));
      };
      const blockProps = useBlockProps({ className: classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))), EditMode ? DataTable() : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, Catpow[type + "Output"] ? el(Catpow[type + "Output"], { ...states, ...graph[0] }) : /* @__PURE__ */ wp.element.createElement("div", { className: "alert" }, "Invalid Chart Type")));
    },
    save({ attributes }) {
      const { createElement: el } = wp.element;
      const { useBlockProps } = wp.blockEditor;
      const { classes, graph } = attributes;
      var selectiveClasses = [
        {
          label: __("\u30BF\u30A4\u30D7", "catpow"),
          values: {
            BarChart: __("\u68D2\u30B0\u30E9\u30D5", "catpow"),
            PieChat: __("\u5186\u30B0\u30E9\u30D5", "catpow"),
            LineChart: __("\u6298\u308C\u7DDA\u30B0\u30E9\u30D5", "catpow"),
            RadarChart: __("\u30EC\u30FC\u30C0\u30FC\u30C1\u30E3\u30FC\u30C8", "catpow")
          }
        }
      ];
      let type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, el(Catpow[type + "Output"], { ...states, ...graph[0] }));
    }
  });
})();
