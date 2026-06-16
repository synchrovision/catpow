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

// _dhxtapf3i:/Users/hatanokazuhiro/repos/e-production.co.jp/wp-content/plugins/catpow/elements/slide-show-basic/element/style.css
var style_default = ".slide-show-basic__body-picture {\n  display: block;\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  bottom: 0rem;\n  left: 0rem;\n  inset: 0rem;\n  width: 100%;\n  height: 100%;\n  object-position: center;\n  object-fit: cover;\n}\n.slide-show-basic__body-picture-img {\n  display: block;\n  position: absolute;\n  top: 0rem;\n  right: 0rem;\n  bottom: 0rem;\n  left: 0rem;\n  inset: 0rem;\n  width: 100%;\n  height: 100%;\n  object-position: center;\n  object-fit: cover;\n}\n/*# sourceMappingURL=./style.css.map */";

// ../elements/slide-show-basic/element/index.mjs.jsx
var SlideShowBasic = class extends HTMLElement {
  static observedAttributes = ["duration", "interval", "zoom", "slide"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.pictures = [...this.querySelectorAll("picture")];
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.pictures) {
      this.render();
    }
  }
  render() {
    const params = { duration: 20, interval: 20, zoom: 0, slide: false };
    for (const key of Object.keys(params)) {
      if (this.hasAttribute(key)) {
        if (key === "slide") {
          params[key] = !["no", "false", "0", "-1"].includes(this.getAttribute(key));
        } else {
          params[key] = parseInt(this.getAttribute(key));
        }
      }
    }
    const { duration, interval, zoom, slide } = params;
    const pictures = this.pictures;
    const delay = duration * 0.5 + duration * 0.5 * interval * 0.01;
    const fadeDuration = duration * 0.5 - duration * 0.5 * interval * 0.01;
    const totalDuration = (pictures.length - 1) * delay + duration;
    const options = {
      duration: totalDuration,
      iterations: Infinity
    };
    const keyframes = [
      { opacity: 0, transform: `scale(${1 - Math.min(0, zoom) / 100})`, zIndex: 1e3 },
      { opacity: 1, offset: fadeDuration / totalDuration },
      { transform: `scale(${1 + Math.max(0, zoom) / 100})`, offset: duration / totalDuration },
      { zIndex: 1 }
    ];
    console.log(keyframes);
    pictures.forEach((picture, index) => {
      console.log({ ...options, delay: delay * index });
      picture.setAttribute("class", "_picture");
      [...picture.children].forEach((child) => child.removeAttribute("class"));
      picture.animate(keyframes, { ...options, delay: delay * index });
    });
    const style = el("style", {}, [style_default]);
    const body = el("div", { class: "_body" }, pictures);
    this.shadowRoot.replaceChildren(style, applyBem(el("div", { class: "basic-" }, [body]), { prefix: "slide-show" }));
  }
};
customElements.define("slide-show-basic", SlideShowBasic);
