Catpow.UI.BarChartOutput = function (props) {
  var colsSvg = [],
      rowsSvg = [],
      textsSvg = [];
  var rows = props.rows,
      cols = props.cols,
      _props$width = props.width,
      width = _props$width === void 0 ? 300 : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? 300 : _props$height,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? 50 : _props$padding,
      total = props.total;

  if (!total) {
    var n;
    total = 0;
    rows.map(function (row) {
      n = 0;
      row.vals.map(function (val) {
        n += parseFloat(val.value);
      });
      total = Math.max(n, total);
    });
  }

  var graphHeight = height - padding * 2,
      graphWidth = width - padding * 2,
      graphOrg = {
    x: padding,
    y: height - padding
  };
  var rowStep = graphWidth / rows.length,
      barWidth = rowStep / 4 * 3,
      barMargin = rowStep / 8,
      coef = graphHeight / total;
  var pos, h;
  colsSvg = cols.map(function (col, r) {
    return wp.element.createElement("g", {
      className: col.classes,
      "data-label": col.label
    });
  });
  var valPos = [];
  rowsSvg = rows.map(function (row, r) {
    var pos = {
      x: r * rowStep + graphOrg.x + barMargin,
      y: graphOrg.y
    };
    valPos[r] = [];
    return wp.element.createElement("g", {
      className: row.classes,
      "data-label": row.label
    }, row.vals.map(function (val, c) {
      h = val.value * coef;
      pos.y -= h;
      valPos[r][c] = {
        x: r * rowStep + rowStep / 2 + padding,
        y: pos.y + h / 2
      };
      return wp.element.createElement("rect", {
        className: cols[c].classes.replace('col', 'val'),
        "data-value": val.value,
        x: pos.x,
        y: pos.y,
        width: barWidth,
        height: h
      });
    }));
  });
  props.pos = {
    val: function val(r, c) {
      return valPos[r][c];
    }
  };
  return wp.element.createElement("div", {
    className: 'BarChart'
  }, wp.element.createElement("svg", {
    viewBox: "0 0 " + width + " " + height
  }, wp.element.createElement("g", {
    class: "graph"
  }, wp.element.createElement("g", {
    class: "cols"
  }, colsSvg), wp.element.createElement("g", {
    class: "rows"
  }, rowsSvg)), el(Catpow.ChartText, props)));
};
