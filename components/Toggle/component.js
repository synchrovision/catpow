(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };

  // react-global:react
  var react_default, useState, useEffect, useLayoutEffect, useRef, forwardRef, useMemo, useCallback, createContext, useContext, useReducer, createElement, cloneElement, isValidElement, Fragment;
  var init_react = __esm({
    "react-global:react"() {
      react_default = window.wp.element;
      useState = wp.element.useState;
      useEffect = wp.element.useEffect;
      useLayoutEffect = wp.element.useLayoutEffect;
      useRef = wp.element.useRef;
      forwardRef = wp.element.forwardRef;
      useMemo = wp.element.useMemo;
      useCallback = wp.element.useCallback;
      createContext = wp.element.createContext;
      useContext = wp.element.useContext;
      useReducer = wp.element.useReducer;
      createElement = wp.element.createElement;
      cloneElement = wp.element.cloneElement;
      isValidElement = wp.element.isValidElement;
      Fragment = wp.element.Fragment;
    }
  });

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  var clsx_default = clsx;

  // node_modules-included/catpow/src/component/Bem.jsx
  init_react();
  var applyBem = (component, { ...ctx }) => {
    if (Array.isArray(component)) {
      component.forEach((child) => {
        applyBem(child, ctx);
      });
      return;
    }
    if (component?.props == null) {
      return;
    }
    if (component.type == react_default.Fragment) {
      applyBem(component.props.children, ctx);
      return;
    }
    const {
      props: { className, children }
    } = component;
    if (className) {
      component.props.className = className.split(" ").map((className2) => {
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
      if (component.props.className === className) {
        const matches = ctx.prefix && className.match(new RegExp(`\\b((${ctx.prefix.replaceAll("-", "\\-")})\\-[a-z]+(\\-[a-z]+)*)(__[a-z]+(\\-[a-z]+)*)?\\b`)) || className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
        if (!matches) {
          return;
        }
        if (!matches[1].startsWith(ctx.prefix)) {
          ctx.prefix = matches[2];
        }
        ctx.block = matches[1];
        ctx.element = matches[0];
      }
    } else if (typeof component.type === "string") {
      component.props.className = ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + component.type;
    } else {
      return;
    }
    if (children == null) {
      return;
    }
    if (Array.isArray(children)) {
      children.forEach((child) => {
        applyBem(child, ctx);
      });
    } else {
      applyBem(children, ctx);
    }
  };
  var Bem = ({ prefix = "cp", block, element, children }) => {
    if (element == null && block != null) {
      element = block;
    }
    if (block == null && element != null) {
      block = element.split("__")[0];
    }
    const ctx = { prefix, block, element };
    applyBem(children, ctx);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // node_modules-included/catpow/src/component/Input/Toggle.jsx
  init_react();
  var Toggle = (props) => {
    const { className = "cp-toggle", onChange, threashold = 40 } = props;
    const [value, setValue] = useState(props.value);
    const [handler, setHandler] = useState(false);
    useEffect(() => {
      if (!handler) {
        return;
      }
      const org = { x: 0 };
      const handleTouchStart = (e) => {
        org.x = e.targetTouches[0].clientX;
      };
      const handleTouchMove = (e) => {
        setValue(e.targetTouches[0].clientX - org.x > threashold);
      };
      return () => {
        handler.removeEventListener("touchstart", handleTouchStart);
        handler.removeEventListener("touchmove", handleTouchMove);
        handler.removeEventListener("mousedown", handleTouchStart);
        handler.removeEventListener("mousemove", handleTouchMove);
      };
    }, [handler, setValue, threashold]);
    useEffect(() => {
      if (props.value !== value) {
        onChange(value);
      }
    }, [props.value, value, onChange]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: clsx_default(className, { "is-selected": value }),
        onClick: () => {
          setValue(!value);
        },
        ref: setHandler
      },
      /* @__PURE__ */ wp.element.createElement("span", { className: "_handler" })
    ));
  };

  // ../components/Toggle/component.jsx
  Catpow.Toggle = Toggle;
})();
