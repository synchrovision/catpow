(() => {
  // ../ui/BarChart/output.jsx
  Catpow.UI.BarChartOutput = (props) => {
    var colsSvg = [], rowsSvg = [], textsSvg = [];
    var { rows, cols, width = 300, height = 300, padding = 50, total } = props;
    if (!total) {
      var n;
      total = 0;
      rows.map((row) => {
        n = 0;
        row.vals.map((val) => {
          n += parseFloat(val.value);
        });
        total = Math.max(n, total);
      });
    }
    var graphHeight = height - padding * 2, graphWidth = width - padding * 2, graphOrg = { x: padding, y: height - padding };
    var rowStep = graphWidth / rows.length, barWidth = rowStep / 4 * 3, barMargin = rowStep / 8, coef = graphHeight / total;
    var pos, h;
    colsSvg = cols.map((col, r) => {
      return /* @__PURE__ */ wp.element.createElement("g", { className: col.classes, "data-label": col.label });
    });
    var valPos = [];
    rowsSvg = rows.map((row, r) => {
      var pos2 = { x: r * rowStep + graphOrg.x + barMargin, y: graphOrg.y };
      valPos[r] = [];
      return /* @__PURE__ */ wp.element.createElement("g", { className: row.classes, "data-label": row.label }, row.vals.map((val, c) => {
        h = val.value * coef;
        pos2.y -= h;
        valPos[r][c] = {
          x: r * rowStep + rowStep / 2 + padding,
          y: pos2.y + h / 2
        };
        return /* @__PURE__ */ wp.element.createElement(
          "rect",
          {
            className: cols[c].classes.replace("col", "val"),
            "data-value": val.value,
            x: pos2.x,
            y: pos2.y,
            width: barWidth,
            height: h
          }
        );
      }));
    });
    props.pos = {
      val: (r, c) => {
        return valPos[r][c];
      }
    };
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cpui-barchart" }, /* @__PURE__ */ wp.element.createElement("svg", { viewBox: "0 0 " + width + " " + height }, /* @__PURE__ */ wp.element.createElement("g", { className: "graph" }, /* @__PURE__ */ wp.element.createElement("g", { className: "cols" }, colsSvg), /* @__PURE__ */ wp.element.createElement("g", { className: "rows" }, rowsSvg)), el(Catpow.ChartText, props)));
  };
})();
