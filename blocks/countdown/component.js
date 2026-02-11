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

  // ../blocks/countdown/component.jsx
  Catpow.CountDown = function(props) {
    const { className = "wp-block-catpow-countdown__body" } = props;
    const { useEffect: useEffect2, useCallback: useCallback2, useReducer: useReducer2 } = wp.element;
    const init = useCallback2(() => {
      const state2 = { isDone: true, days: "0000", hours: "00", minutes: "00", seconds: "00" };
      let { target = null, value = null } = props;
      if (!value && target) {
        const d0 = /* @__PURE__ */ new Date();
        const d1 = Catpow.util.getDateTimeObject(props.target);
        value = Math.ceil((d1.getTime() - d0.getTime()) / 1e3);
      }
      if (value && value > 0) {
        state2.isDone = false;
        const divs = { seconds: 60, minutes: 60, hours: 24, days: 1e4 };
        for (let key in divs) {
          state2[key] = (value % divs[key]).toString().padStart(key === "days" ? 4 : 2, "0");
          value = Math.floor(value / divs[key]);
          if (value === 0) {
            break;
          }
        }
      }
      return state2;
    }, []);
    const reducer = useCallback2((state2, action) => {
      switch (action.type) {
        case "COUNT_DOWN": {
          if (state2.isDone) {
            return state2;
          }
          const newState = { ...state2 };
          const divs = { seconds: "59", minutes: "59", hours: "23", days: "9999" };
          for (let key in divs) {
            let val = parseInt(state2[key]);
            val--;
            if (val < 0) {
              newState[key] = divs[key];
              if (key === "days") {
                return { isDone: true, days: "0000", hours: "00", minutes: "00", seconds: "00" };
              }
            } else {
              newState[key] = val.toString().padStart(divs[key].length, "0");
              break;
            }
          }
          return newState;
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer2(reducer, {}, init);
    useEffect2(() => {
      const cb = () => {
        dispatch({ type: "COUNT_DOWN" });
      };
      const timer = setInterval(cb, 1e3);
      return () => clearInterval(timer);
    }, []);
    return /* @__PURE__ */ wp.element.createElement(Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("span", { className: "_group  is-days" }, /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.days[0] === "0" }) }, state.days[0]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.days.slice(0, 2) === "00" }) }, state.days[1]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.days.slice(0, 3) === "000" }) }, state.days[2]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number") }, state.days[3])), /* @__PURE__ */ wp.element.createElement("span", { className: "_group is-hours" }, /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.hours[0] === "0" }) }, state.hours[0]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number") }, state.hours[1])), /* @__PURE__ */ wp.element.createElement("span", { className: "_group is-minutes" }, /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.minutes[0] === "0" }) }, state.minutes[0]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number") }, state.minutes[1])), /* @__PURE__ */ wp.element.createElement("span", { className: "_group is-seconds" }, /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number", { "is-leading-zero": state.seconds[0] === "0" }) }, state.seconds[0]), /* @__PURE__ */ wp.element.createElement("span", { className: clsx("_number") }, state.seconds[1]))));
  };
})();
