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

// _otn7iy6y8:/Users/hatanokazuhiro/repos/feliz.jpn.com/wp-content/plugins/catpow/elements/art-frame-wave/element/style.css
var style_default = ".art-frame-wave__body {\n  background-color: hsla(var(--cp-tones-sx-h),var(--cp-tones-sx-s),var(--cp-tones-sx-l),var(--cp-tones-sx-a,1));\n}\n/*# sourceMappingURL=./style.css.map */";

// ../elements/art-frame-wave/element/index.mjs.jsx
var ArtFrameWave = class extends HTMLElement {
  static observedAttributes = ["dx", "dy", "r", "direction"];
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
    const params = { dx: 50, dy: 50, r: 50, direction: "both" };
    for (const key of Object.keys(params)) {
      if (this.hasAttribute(key)) {
        if (key === "direction") {
          params[key] = this.getAttribute(key);
        } else if (key === "dx" || key === "dy" || key === "r") {
          params[key] = parseInt(this.getAttribute(key));
        }
      }
    }
    const style = el("style", {}, [style_default]);
    const body = el("div", { class: "_body" }, [el("slot")]);
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      const { dx, dy, direction } = params;
      const r = params.r * dx / 100;
      const ut = ` c ${r / 2} 0, ${dx - r / 2} ${dy}, ${dx} ${dy}, ${r / 2} 0, ${dx - r / 2} ${-dy}, ${dx} ${-dy}`;
      const ub = ` c ${-r / 2} 0, ${-dx + r / 2} ${-dy}, ${-dx} ${-dy}, ${-r / 2} 0, ${-dx + r / 2} ${dy}, ${-dx} ${dy}`;
      const n = Math.ceil(width / dx / 2);
      const w = n * dx * 2;
      let d = "M 0 0";
      if (direction === "both" || direction === "top") {
        d += ut.repeat(n);
      } else {
        d += ` l ${w} 0`;
      }
      d += ` l 0 ${height}`;
      if (direction === "both" || direction === "bottom") {
        d += ub.repeat(n);
      } else {
        d += ` l ${-w} 0`;
      }
      d += " z";
      body.style.setProperty("clip-path", `path("${d}")`);
    });
    resizeObserver.observe(body);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "wave-" }, [body]), { prefix: "art-frame" }));
  }
};
customElements.define("art-frame-wave", ArtFrameWave);
