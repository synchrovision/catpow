// node_modules-included/catpow/src/util/bem/applyBem.js
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

// node_modules-included/catpow/src/util/calc/srand.js
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

// node_modules-included/catpow/src/util/dom.ts
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

// _hyz2ie1fi:/Users/hatanokazuhiro/repos/feliz.jpn.com/wp-content/plugins/catpow/elements/art-frame-bomb/element/style.css
var style_default = ".art-frame-bomb__body {\n  background-color: hsla(var(--cp-tones-sx-h),var(--cp-tones-sx-s),var(--cp-tones-sx-l),var(--cp-tones-sx-a,1));\n}\n/*# sourceMappingURL=./style.css.map */";

// ../elements/art-frame-bomb/element/index.mjs.jsx
var ArtFrameBomb = class extends HTMLElement {
  static observedAttributes = ["w", "b", "h", "f", "seed", "direction"];
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
    const params = { w: 30, b: 30, h: 60, f: 50, seed: 16, direction: "both" };
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
      let { w, b, h, f, seed, direction } = params;
      b *= 4;
      let d = "";
      const rnd = srand(seed);
      const r = h / 2 + width * width / h / 8;
      const rad = Math.asin(width / (2 * r)) * 2;
      const n = Math.ceil(rad / (Math.asin(w / 8 / r) * 2));
      const uRad = rad / n;
      const sh = h + b;
      const ox = width / 2;
      const bf = b * f / 200;
      const bs = b - bf;
      if (direction === "both" || direction === "top") {
        d += ` M 0 ${sh}`;
        const oy = r + b;
        let prevF = 0;
        let prevR = r - b;
        let prevRad = -rad / 2;
        for (let i = 0; i <= n; i++) {
          const crrF = i < n ? rnd(0, f) / 200 : 0;
          const crrR = r + b * crrF;
          const crrTopR = f > 0 ? r + bs + b * (prevF + crrF) / 2 : r + b;
          const crrRad = uRad * i - rad / 2;
          const crrTopRad = crrRad - uRad * (0.5 + (f > 0 ? (prevF - crrF) * 50 / f : 0));
          const x1 = ox + crrTopR * Math.sin(crrTopRad);
          const y1 = oy - crrTopR * Math.cos(crrTopRad);
          const x2 = ox + crrR * Math.sin(crrRad);
          const y2 = oy - crrR * Math.cos(crrRad);
          d += ` L ${x1} ${y1} ${x2} ${y2}`;
          prevF = crrF;
          prevR = crrR;
          prevRad = crrRad;
        }
      } else {
        d += ` M 0 0 L ${width} 0`;
      }
      if (direction === "both" || direction === "bottom") {
        d += ` L ${width} ${height - sh}`;
        const oy = height - r - b;
        let prevF = 0;
        let prevR = r - b;
        let prevRad = -rad / 2;
        for (let i = 0; i <= n; i++) {
          const crrF = i < n ? rnd(0, f) / 200 : 0;
          const crrR = r + b * crrF;
          const crrTopR = f > 0 ? r + bs + b * (prevF + crrF) / 2 : r + b;
          const crrRad = uRad * i - rad / 2;
          const crrTopRad = crrRad - uRad * (0.5 + (f > 0 ? (prevF - crrF) * 50 / f : 0));
          const x1 = ox - crrTopR * Math.sin(crrTopRad);
          const y1 = oy + crrTopR * Math.cos(crrTopRad);
          const x2 = ox - crrR * Math.sin(crrRad);
          const y2 = oy + crrR * Math.cos(crrRad);
          d += ` L ${x1} ${y1} ${x2} ${y2}`;
          prevF = crrF;
          prevR = crrR;
          prevRad = crrRad;
        }
      } else {
        d += ` L ${width} ${height} L 0 ${height} Z`;
      }
      body.style.setProperty("clip-path", `path("${d}")`);
    });
    resizeObserver.observe(body);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "bomb-" }, [body]), { prefix: "art-frame" }));
  }
};
customElements.define("art-frame-bomb", ArtFrameBomb);
