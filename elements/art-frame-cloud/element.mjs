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

// _b45uau48z:/Users/hatanokazuhiro/Documents/repos.nosync/mandai/mandai_cup/wp-content/plugins/catpow/elements/art-frame-cloud/element/style.css
var style_default = ".art-frame-cloud__body {\n  background-color: hsla(var(--cp-tones-sx-h),var(--cp-tones-sx-s),var(--cp-tones-sx-l),var(--cp-tones-sx-a,1));\n}\n/*# sourceMappingURL=./style.css.map */";

// ../elements/art-frame-cloud/element/index.mjs.jsx
var ArtFrameCloud = class extends HTMLElement {
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
      const { w, b, h, f, seed, direction } = params;
      let d = "";
      const rnd = srand(seed);
      const cr = h / 2 + width * width / h / 8;
      const cRad = Math.asin(width / (2 * cr)) * 2;
      const urc = 1 - b / 200;
      const ur = w * urc;
      const uRad = cRad / Math.ceil(cRad / (Math.asin(w / 2 / cr) * 2));
      const maxURad = uRad + uRad * f / 200;
      const maxR = cr * Math.sin(maxURad / 2) * 2;
      const maxUr = maxR * urc;
      const uah = maxUr - Math.sqrt(maxUr * maxUr - maxR / 2 * (maxR / 2));
      if (direction === "both" || direction === "top") {
        d += ` M 0 ${h + uah}`;
        let pRad = -cRad / 2;
        for (let rad = uRad - cRad / 2; rad < cRad / 2; rad += uRad) {
          const tRad = rad - uRad * f / 200 + uRad * rnd(0, f) / 100;
          const tr = cr * Math.sin(tRad - pRad);
          pRad = tRad;
          const ur3 = tr * (urc + rnd(0, f) / 200);
          const x = cr * Math.sin(tRad) + width / 2;
          const y = cr - cr * Math.cos(tRad) + uah;
          d += ` A ${ur3} ${ur3} 0 0 1 ${x} ${y}`;
        }
        const ur2 = w * urc;
        d += ` A ${ur2} ${ur2} 0 0 1 ${width} ${h + uah}`;
      } else {
        d += ` M 0 0 L ${width} 0`;
      }
      if (direction === "both" || direction === "bottom") {
        d += ` L ${width} ${height - h - uah}`;
        let pRad = -cRad / 2;
        for (let rad = uRad - cRad / 2; rad < cRad / 2; rad += uRad) {
          const tRad = rad - uRad * f / 200 + uRad * rnd(0, f) / 100;
          const tr = cr * Math.sin(tRad - pRad);
          pRad = tRad;
          const ur2 = tr * (urc + rnd(0, f) / 200);
          const x = width / 2 - cr * Math.sin(tRad);
          const y = height - (cr - cr * Math.cos(tRad) + uah);
          d += ` A ${ur2} ${ur2} 0 0 1 ${x} ${y}`;
        }
        d += ` A ${ur} ${ur} 0 0 1 0 ${height - h - uah} Z`;
      } else {
        d += ` L ${width} ${height} L 0 ${height} Z`;
      }
      body.style.setProperty("clip-path", `path("${d}")`);
    });
    resizeObserver.observe(body);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "cloud-" }, [body]), { prefix: "art-frame" }));
  }
};
customElements.define("art-frame-cloud", ArtFrameCloud);
