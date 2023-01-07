(() => {
  // ../ui/PieChart/output.jsx
  Catpow.UI.PieChartOutput = (props) => {
    const { useState } = wp.element;
    var { rows, cols, width = 300, height = 300, padding = 50 } = props;
    const total = rows[0].vals.reduce((v, val) => v + parseInt(val.value), 0);
    const r = (width - padding * 2) / 2, ox = width / 2, oy = height / 2;
    console.log(total);
    const val2pos = (v, coef = 1) => {
      var rad = v / total * Math.PI * 2 - Math.PI / 2;
      return {
        x: Math.cos(rad) * r * coef + ox,
        y: Math.sin(rad) * r * coef + oy
      };
    };
    var i, d, crrVal = 0, crrPos = val2pos(0), pies = [];
    var valPos = [];
    rows[0].vals.map((val, c) => {
      const v = val.value;
      d = "M " + ox + " " + oy + " L " + crrPos.x + " " + crrPos.y;
      valPos[c] = val2pos(crrVal + Math.floor(val.value / 2), 5 / 8);
      crrVal += Math.floor(val.value);
      crrPos = val2pos(crrVal);
      d += " A " + r + " " + r + " 0 " + (v * 2 > total ? "1" : "0") + " 1 " + crrPos.x + " " + crrPos.y;
      d += " L " + ox + " " + oy;
      pies.push(
        /* @__PURE__ */ React.createElement(
          "path",
          {
            className: cols[c].classes.replace("col", "val"),
            "data-value": v,
            d
          }
        )
      );
    });
    return /* @__PURE__ */ React.createElement("div", { className: "PieChart" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 " + width + " " + height }, /* @__PURE__ */ React.createElement("g", { class: "graph" }, /* @__PURE__ */ React.createElement("g", { className: rows[0].classes, "data-label": rows[0].label }, pies)), el(Catpow.ChartText, {
      ...props,
      rowTitle: false,
      rowUnit: false,
      rows: [{
        classes: props.rows[0].classes,
        vals: props.rows[0].vals
      }],
      pos: {
        val: (r2, c) => {
          return valPos[c];
        }
      }
    })));
  };
})();
