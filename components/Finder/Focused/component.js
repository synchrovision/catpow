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

  // node_modules-included/catpow/src/util/string/case.js
  var camelToKebab = (str) => str.replace(/(?=\w)([A-Z])/g, "-$1").toLowerCase();

  // node_modules-included/catpow/src/util/string/flagsToClassNames.js
  var flagsToClassNames = (flags) => flags && Object.keys(flags).filter((f) => flags[f]).map(camelToKebab).join(" ");

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

  // ../components/Finder/Focused/component.jsx
  Catpow.Finder.Focused = (props) => {
    const { useState: useState2, useCallback: useCallback2, useContext: useContext2 } = wp.element;
    const { __, sprintf } = wp.i18n;
    const { state, dispatch, info } = useContext2(Catpow.FinderContext);
    const { roleGroups } = info;
    const { cols } = state.index;
    const hasRoleGroup = useCallback2(
      (group) => {
        return !roleGroups[group].every((role) => !state.colsByRole[role] || !state.colsByRole[role].length);
      },
      [state.colsByRole, roleGroups]
    );
    const ucfirst = useCallback2((str) => str.charAt(0).toUpperCase() + str.slice(1), []);
    const flags = { cpFinderFocused: true };
    Object.keys(roleGroups).map((group) => {
      flags["has" + ucfirst(group)] = hasRoleGroup(group);
    });
    return /* @__PURE__ */ wp.element.createElement(Bem, { prefix: "cp-finder" }, /* @__PURE__ */ wp.element.createElement("div", { className: flagsToClassNames(flags) }, /* @__PURE__ */ wp.element.createElement("table", { className: "_items" }, Object.keys(roleGroups).map((group) => {
      if (!hasRoleGroup(group)) {
        return false;
      }
      return roleGroups[group].map((role) => {
        if (!state.colsByRole[role] || !state.colsByRole[role].length) {
          return false;
        }
        return state.colsByRole[role].map((col) => /* @__PURE__ */ wp.element.createElement("tr", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("th", { className: "_label" }, col.label), /* @__PURE__ */ wp.element.createElement("td", { className: "_value" }, /* @__PURE__ */ wp.element.createElement(Catpow.Output, { conf: col, ...state.focused[col.name] }))));
      });
    }))));
  };
})();
