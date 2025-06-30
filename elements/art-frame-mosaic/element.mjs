// modules/src/util/dom.ts
var el = (tag, props, children, namespace) => {
  const el2 = namespace ? document.createElementNS(namespace, tag) : document.createElement(tag);
  const appendChild = (child) => {
    if (child == null) {
      return;
    }
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
  if (props) {
    Object.keys(props).forEach((key) => {
      el2.setAttribute(key, props[key]);
    });
  }
  appendChild(children);
  return el2;
};
var svgEl = (tag, props, children) => el(tag, props, children, "http://www.w3.org/2000/svg");

// modules/src/util/bem.jsx
var applyBem = (el2, { ...ctx }) => {
  if (Array.isArray(el2)) {
    el2.forEach((el3) => {
      applyBem(el3, ctx);
    });
    return el2;
  }
  if (!(el2 instanceof Element)) {
    return el2;
  }
  let { className } = el2;
  if (el2 instanceof SVGElement && className instanceof SVGAnimatedString) {
    className = className.baseVal;
  }
  if (className) {
    el2.setAttribute(
      "class",
      className.split(" ").map((className2) => {
        if (className2.slice(0, 2) === "--") {
          return ctx.element + className2;
        }
        if (className2[0] === "-") {
          return ctx.block = ctx.element = ctx.block + className2;
        }
        if (className2[0] === "_") {
          return ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + className2.slice(1);
        }
        if (className2.slice(-1) === "-") {
          return ctx.block = ctx.element = ctx.prefix + "-" + className2.slice(0, -1);
        }
        if (className2.slice(-1) === "_") {
          return ctx.element = ctx.block + "__" + className2.slice(0, -1);
        }
        return className2;
      }).join(" ")
    );
    if (el2.className === className) {
      const matches = className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
      if (!matches) {
        return el2;
      }
      if (!matches[1].startsWith(ctx.prefix)) {
        ctx.prefix = matches[2];
      }
      ctx.block = matches[1];
      ctx.element = matches[0];
    }
  } else {
    el2.setAttribute("class", ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + el2.tagName.toLowerCase());
  }
  for (let i = 0; i < el2.children.length; i++) {
    applyBem(el2.children[i], ctx);
  }
  return el2;
};

// modules/src/util/calc.jsx
var srand = (w = 88675123) => {
  var x = 123456789, y = 362436069, z = 521288629;
  return function() {
    let t;
    t = x ^ x << 11;
    [x, y, z] = [y, z, w];
    w = w ^ w >>> 19 ^ (t ^ t >>> 8);
    if (arguments.length === 0) {
      return w;
    }
    if (arguments.length === 1) {
      return w % (arguments[0] + 1);
    }
    const [min, max] = arguments;
    return min + Math.abs(w) % (max + 1 - min);
  };
};

// modules/src/scssc/settings.js
var colorRoles = {
  b: {
    name: "background",
    default: { h: 0, s: 0, l: 100, a: 1 },
    extend: true,
    invert: "m"
  },
  s: {
    name: "sheet",
    default: { h: 0, s: 0, l: 95, a: 1 },
    extend: true,
    invert: "a"
  },
  t: {
    name: "text",
    default: { h: 0, s: 0, l: 40, a: 1 },
    extend: true,
    invert: "i"
  },
  h: {
    name: "highlight",
    default: { h: 6, s: 100, l: 33, a: 1 },
    extend: true,
    invert: "e"
  },
  m: {
    name: "main",
    default: { h: 30, s: 33, l: 20, a: 1 },
    extend: true,
    invert: "b"
  },
  a: {
    name: "accent",
    default: { h: 32, s: 100, l: 50, a: 1 },
    extend: true,
    invert: "s"
  },
  i: {
    name: "inside",
    default: { h: 0, s: 0, l: 100, a: 1 },
    extend: true,
    invert: "t"
  },
  e: {
    name: "emphasis",
    default: { h: 12, s: 100, l: 50, a: 1 },
    extend: true,
    invert: "h"
  },
  lt: {
    name: "light",
    default: { h: 0, s: 0, l: 100, a: 0.6 },
    extend: false,
    invert: null
  },
  lst: {
    name: "lust",
    default: { h: 0, s: 0, l: 100, a: 0.9 },
    extend: false,
    invert: null
  },
  sh: {
    name: "shade",
    default: { h: 0, s: 0, l: 0, a: 0.2 },
    extend: false,
    invert: null
  },
  shd: {
    name: "shadow",
    default: { h: 0, s: 0, l: 0, a: 0.3 },
    extend: false,
    invert: null
  }
};

// modules/src/scssc/translateColor.js
var translateColor = (color, tint, alpha) => {
  const availableToneKeys = {};
  for (const key of Object.keys(colorRoles)) {
    availableToneKeys[key] = true;
    if (colorRoles[key].invert) {
      availableToneKeys[key + "x"] = true;
    }
  }
  if (color === "wp") {
    return "var(--wp-admin-theme-color)";
  }
  const matches = color.match(/^([a-z]+)(_|\-\-)?(\-?\d+)?$/);
  if (matches) {
    const key = matches[1];
    const sep = matches[2] || null;
    const staticHue = sep === "--";
    const relativeHue = sep === "_";
    const num = matches[3] || null;
    if (availableToneKeys[key]) {
      const f = (p) => `var(--cp-tones-${key}-${p})`;
      const cf = (p) => `var(--cp-container-tones-${key}-${p})`;
      const rf = (p) => `var(--cp-root-tones-${key}-${p})`;
      const h = num ? staticHue ? num : num === "0" || num === "6" ? f("h") : `calc(${relativeHue ? cf("h") : rf("h")} + var(--cp-tones-hr) * ${num - 6} + var(--cp-tones-hs))` : f("h");
      const s = f("s");
      const l = tint ? `calc(100% - ${f("l")} * ${tint})` : `${f("l")}`;
      const a = alpha ? `calc(${f("a")} * ${alpah}` : f("a");
      return `hsla(${h}, ${s}, ${l}, ${a})`;
    }
  } else {
    const matches2 = color.match(/^([a-z]+)\-([a-z]+)$/);
    if (matches2) {
      const [key1, key2] = matches2.slice(1);
      if (availableToneKeys[key1] && availableToneKeys[key2]) {
        const t1 = (tint || 50) / 100;
        const t2 = 1 - t1;
        const f = (p) => `calc(var(--cp-tones-${key1}-${p}) * ${t1} + var(--cp-tones-${key2}-${p}) * ${t2})`;
        const a = alpha ? `calc(${f("a")} * ${alpha})` : f("a");
        return `hsla(${f("h")}, ${f("s")}, ${f("l")}, ${a})`;
      }
    }
  }
  return color;
};

// _g3w1a9okm:/Users/hatanokazuhiro/Documents/repos.nosync/mandai/mandai_cup/wp-content/plugins/catpow/elements/art-frame-mosaic/element/style.css
var style_default = ".art-frame-mosaic {\n  position: relative;\n}\n.art-frame-mosaic__arts {\n  display: block;\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  bottom: 0rem;\n  left: 0rem;\n  inset: 0rem;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n}\n/*# sourceMappingURL=./style.css.map */";

// ../elements/art-frame-mosaic/element/index.mjs.jsx
var ArtFrameMosaic = class extends HTMLElement {
  static observedAttributes = ["w", "h", "fill", "seed", "direction"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
  render() {
    const params = { w: 20, h: 120, fill: 20, seed: 16, direction: "both" };
    for (const key of Object.keys(params)) {
      if (this.hasAttribute(key)) {
        switch (typeof params[key]) {
          case "object":
            params[key] = JSON.parse(this.getAttribute(key));
            break;
          case "boolean":
            params[key] = !/0|false|no/i.test(this.getAttribute(key));
            break;
          case "number":
            params[key] = parseInt(this.getAttribute(key));
            break;
          default:
            params[key] = this.getAttribute(key);
            break;
        }
      }
    }
    const style = el("style", {}, [style_default]);
    const body = el("div", { class: "_body" }, [el("slot")]);
    const fills1 = svgEl("path", { class: "_fills is-fills-1", fill: translateColor("mx") }, []);
    const fills2 = svgEl("path", { class: "_fills is-fills-2", fill: translateColor("ax") }, []);
    const arts = svgEl("svg", { xmlns: "http://www.w3.org/2000/svg", class: "_arts", style: "position:absolute;inset:0;width:100%" }, [fills1, fills2]);
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const { w, h, fill, seed, direction } = params;
      let d = `M 0 0 l ${width} 0 l 0 ${height} l ${-width} 0 z`;
      let ad1 = ``;
      let ad2 = ``;
      let cols = Math.round(width / w);
      let u = width / cols;
      let rows = Math.floor(h / u);
      const rnd = srand(seed);
      if (direction === "both" || direction === "top") {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = rnd(0, rows * 32);
            if (n < r * 32 + 32) {
              continue;
            }
            const x = c * u;
            const y = r * u;
            if (fill > rnd(0, 100)) {
              if (10 < rnd(0, 100)) {
                ad1 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
              } else {
                ad2 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
              }
            } else {
              d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
            }
          }
        }
      }
      if (direction === "both" || direction === "bottom") {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const n = rnd(0, rows * 32);
            if (n < r * 32 + 32) {
              continue;
            }
            const x = c * u;
            const y = height - (r + 1) * u;
            if (fill > rnd(0, 100)) {
              if (10 < rnd(0, 100)) {
                ad1 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
              } else {
                ad2 += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
              }
            } else {
              d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
            }
          }
        }
      }
      arts.setAttribute("viewBox", `0 0 ${width} ${height}`);
      fills1.setAttribute("d", ad1);
      fills2.setAttribute("d", ad2);
      body.style.setProperty("clip-path", `path(evenodd,"${d}")`);
    });
    resizeObserver.observe(body);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "mosaic-" }, [body, arts]), { prefix: "art-frame" }));
  }
};
customElements.define("art-frame-mosaic", ArtFrameMosaic);
