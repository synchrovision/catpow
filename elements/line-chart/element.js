(() => {
  // modules/util/string.jsx
  var flagsToClassNames = (flags) => flags && Object.keys(flags).filter((f) => flags[f]).map(camelToKebab).join(" ");
  var camelToKebab = (str) => str.replace(/(\w)([A-Z])/g, "$1-$2").toLowerCase();

  // modules/util/dom.jsx
  var el = (tag, props, children, namespace) => {
    const el2 = namespace ? document.createElementNS(namespace, tag) : document.createElement(tag);
    ;
    const appendChild = (child) => {
      if (child instanceof Node) {
        el2.appendChild(child);
      } else if (typeof child === "string") {
        el2.appendChild(document.createTextNode(child));
      } else if (Array.isArray(child)) {
        child.forEach(appendChild);
      } else {
        console.error("can not append child : ", child);
      }
    };
    Object.keys(props).forEach((key) => {
      el2.setAttribute(key, props[key]);
    });
    appendChild(children);
    return el2;
  };
  var svgEl = (tag, props, children) => el(tag, props, children, "http://www.w3.org/2000/svg");

  // modules/util/bem.jsx
  var bem = (className) => {
    const children = {};
    return new Proxy(function() {
      if (arguments.length > 0) {
        const classes = [];
        let i;
        for (i = 0; i < arguments.length; i++) {
          if (!arguments[i]) {
            continue;
          }
          if (typeof arguments[i] === "string") {
            classes.push(arguments[i]);
            continue;
          }
          classes.push.apply(
            classes,
            Array.isArray(arguments[i]) ? arguments[i] : Object.keys(arguments[i]).filter((c) => arguments[i][c])
          );
        }
        if (classes.length > 0) {
          return className + " " + classes.join(" ");
        }
      }
      return className;
    }, {
      get: (target, prop) => {
        if (void 0 === children[prop]) {
          children[prop] = bem(className.split(" ")[0] + (prop[0] === "_" ? "_" : "-") + prop);
        }
        return children[prop];
      }
    });
  };

  // modules/util/calc.jsx
  var pfloor = (n, p) => parseFloat(Math.floor(parseFloat(n + "e" + p)) + "e-" + p);
  var pceil = (n, p) => parseFloat(Math.ceil(parseFloat(n + "e" + p)) + "e-" + p);
  var hfloor = (n, p) => parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/, (m2) => pfloor(m2, p - 1)));
  var hceil = (n, p) => parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/, (m2) => pceil(m2, p - 1)));
  var hunit = (n, p) => parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/, "1.0").replace(/\-?\d+$/, (m2) => 1 + parseFloat(m2) - p));

  // _xjx0k54dh:/Users/hatanokazuhiro/Documents/htdocs/catpow/wp-content/plugins/catpow/elements/line-chart/element/style.css
  var style_default = ".line-chart {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.line-chart-grid {\n  position: relative;\n  z-index: 1;\n}\n.line-chart-grid-line {\n  stroke-width: 0.0625rem;\n  stroke: hsla(var(--cp-tones-t-h),var(--cp-tones-t-s),calc(100% - var(--cp-tones-t-t) * 100),0.25);\n}\n.line-chart-values {\n  position: relative;\n  z-index: 2;\n}\n.line-chart-values-circle {\n  fill: hsla(var(--cp-tones-b-h),var(--cp-tones-b-s),var(--cp-tones-b-l),1);\n  stroke: hsla(var(--cp-tones-m-h),var(--cp-tones-m-s),var(--cp-tones-m-l),1);\n  stroke-width: 0.125rem;\n}\n.line-chart-values-line {\n  stroke-width: 0.125rem;\n  stroke: hsla(var(--cp-tones-m-h),var(--cp-tones-m-s),calc(100% - var(--cp-tones-m-t) * 100),0.5);\n}\n.line-chart-labels.is-column .line-chart-labels-label {\n  text-anchor: middle;\n  dominant-baseline: hanging;\n  font-size: 0.75rem;\n  font-family: var(--cp-fonts-t);\n}\n.line-chart-labels.is-row .line-chart-labels-label {\n  text-anchor: end;\n  dominant-baseline: middle;\n  font-size: 0.75rem;\n  font-family: var(--cp-fonts-t);\n}\n/*# sourceMappingURL=./style.css.map */";

  // ../elements/line-chart/element/index.jsx
  var LineChart = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      const classes = bem("line-chart");
      const values = JSON.parse(this.getAttribute("values"));
      const flags = { hasLabels: this.hasAttribute("labels") };
      const min = this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : hfloor(Math.min(0, Math.min.apply(null, values.map((row) => Math.min.apply(null, row)))), 1);
      const max = this.hasAttribute("max") ? parseFloat(this.getAttribute("max")) : hceil(Math.max(0, Math.max.apply(null, values.map((row) => Math.max.apply(null, row)))), 1);
      const len = max - min;
      const step = this.hasAttribute("step") ? this.getAttribute("step") : hunit(len, 2);
      const rowLabels = [];
      const colLabels = flags.hasLabels ? JSON.parse(this.getAttribute("labels")) : null;
      const maxValueLength = flags.hasLabels ? Math.max(min.toString().length, max.toString().length) : 0;
      const maxLabelLength = flags.hasLabels ? Math.max.apply(null, colLabels.map((label) => label.length)) : 2;
      const pdl = maxValueLength * 12 + 20;
      const pdr = maxLabelLength * 6 + 10;
      const pdt = 10;
      const pdb = flags.hasLabels ? 20 : 0;
      const height = this.getAttribute("height") || 480;
      const width = this.getAttribute("width") || Math.max(height, maxLabelLength * values[0].length * 12 + pdl);
      const graphWidth = width - pdl - pdr;
      const graphHeight = height - pdt - pdb;
      const rowLength = values.length;
      const rowUnit = graphHeight / len;
      const rowHeight = step * rowUnit;
      const colLength = values[0].length;
      const colWidth = graphWidth / (colLength - 1);
      const labelFontSize = colLabels && Math.min(20, colWidth / maxLabelLength);
      const grid = { x: [], y: [] };
      const gridLines = [];
      let v, y, x;
      for (v = max; v >= min; v -= step) {
        rowLabels.push(v.toString());
        grid.y.push(pdt + rowUnit * (max - v));
      }
      for (x = pdl; x <= width - pdr; x += colWidth) {
        grid.x.push(x);
      }
      shadow.appendChild(el("style", {}, [style_default]));
      shadow.appendChild(svgEl("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: `0 0 ${width} ${height}`, class: classes(flagsToClassNames(flags)) }, [
        values.map((row) => {
          const points = row.map((val, c) => pdl + colWidth * c + " " + (pdt + rowUnit * (max - val))).join(",");
          return svgEl("g", { class: classes.values() }, [
            svgEl("polyline", { points, fill: "none", class: classes.values.line() }),
            row.map((val, c) => svgEl("circle", { cx: pdl + colWidth * c, cy: pdt + rowUnit * (max - val), r: 4, class: classes.values.circle() }))
          ]);
        }),
        svgEl("g", { class: classes.grid() }, [
          grid.x.map((x2) => svgEl("line", { x1: x2, x2, y1: pdt, y2: height - pdb, class: classes.grid.line("is-x") })),
          grid.y.map((y2) => svgEl("line", { x1: pdl, x2: width - pdr, y1: y2, y2, class: classes.grid.line("is-y") }))
        ]),
        colLabels && svgEl("g", { class: classes.labels("is-column") }, colLabels.map((label, c) => svgEl("text", { class: classes.labels.label(), x: pdl + colWidth * c, y: height - pdb + 10 }, label))),
        rowLabels && svgEl("g", { class: classes.labels("is-row") }, rowLabels.map((label, r) => svgEl("text", { class: classes.labels.label(), x: pdl - 10, y: pdt + rowHeight * r }, label)))
      ]));
    }
  };
  customElements.define("line-chart", LineChart);
})();
