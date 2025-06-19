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

// modules/src/util/bem.jsx
var applyBem = (el2, { ...ctx }) => {
  if (Array.isArray(el2)) {
    el2.forEach((el3) => {
      applyBem(el3, ctx);
    });
    return el2;
  }
  if (!(el2 instanceof HTMLElement)) {
    return el2;
  }
  let { className } = el2;
  if (className) {
    el2.className = className.split(" ").map((className2) => {
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
    }).join(" ");
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
    el2.className = ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + el2.tagName.toLowerCase();
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

// _rnhkol7dq:/Users/hatanokazuhiro/Documents/repos.nosync/mandai/mandai_cup/wp-content/plugins/catpow/elements/art-frame-mosaic/element/style.css
var style_default = "";

// ../elements/art-frame-mosaic/element/index.mjs.jsx
var ArtFrameMosaic = class extends HTMLElement {
  static observedAttributes = ["w", "h", "seed", "direction"];
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
    const params = { w: 20, h: 40, seed: 16, direction: "both" };
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
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const { w, h, seed, direction } = params;
      let d = `M 0 0 l ${width} 0 l 0 ${height} l ${-width} 0 z`;
      let cols = Math.round(width / w);
      let u = width / cols;
      let rows = Math.floor(h / u);
      const rnd = srand(seed);
      if (direction === "both" || direction === "top") {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (rnd(0, rows * 32) < r * 32 + 32) {
              continue;
            }
            const x = c * u;
            const y = r * u;
            d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
          }
        }
      }
      if (direction === "both" || direction === "bottom") {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (rnd(0, rows * 32) < r * 32 + 32) {
              continue;
            }
            const x = c * u;
            const y = height - (r + 1) * u;
            d += ` M ${x} ${y} l ${u} 0 l 0 ${u} l ${-u} 0 z`;
          }
        }
      }
      body.style.setProperty("clip-path", `path(evenodd,"${d}")`);
    });
    resizeObserver.observe(body);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "mosaic-" }, [body]), { prefix: "art-frame" }));
  }
};
customElements.define("art-frame-mosaic", ArtFrameMosaic);
