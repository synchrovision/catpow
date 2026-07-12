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

  // node_modules-included/catpow/src/util/array/chunk.js
  var chunk = function* (array, size) {
    if (size <= 0) return;
    for (let i = 0; i < array.length; i += size) {
      yield array.slice(i, i + size);
    }
  };

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

  // node_modules-included/catpow/src/component/Bem.tsx
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
    if (component.type == react_default.Fragment || component.type == "template") {
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

  // ../components/SelectPreparedImage/component.jsx
  Catpow.SelectPreparedImage = (props) => {
    const { className = "cp-selectpreparedimage", name, value, color, onSelect, onChange, ...otherProps } = props;
    const { useState: useState2, useEffect: useEffect2, useReducer: useReducer2, useMemo: useMemo2 } = wp.element;
    const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;
    const [open, setOpen] = useState2(false);
    const [state, dispatch] = useReducer2(
      (state2, action) => {
        const newState = { ...state2 };
        switch (action.type) {
          case "nextPage":
            newState.page--;
            break;
          case "prevPage":
            newState.page++;
            break;
          case "gotoPage":
            newState.page = action.page;
            break;
          case "update":
            if (action.keyword !== void 0) {
              newState.keyword = action.keyword;
            }
            if (action.images) {
              newState.images = action.images;
              const bareURL = removeURLparam(value, "c");
              newState.image = action.images.find((image) => image.url === bareURL);
            }
            if (action.keyword !== void 0 || action.images) {
              if (newState.keyword === "") {
                newState.activeImages = newState.images;
              } else {
                newState.activeImages = newState.images.filter((image) => image.filename.includes(newState.keyword) || image.alt.includes(newState.keyword));
              }
            }
            if (action.image) {
              newState.image = action.image;
            }
            break;
        }
        return newState;
      },
      { page: 0, images: null, image: null, keyword: "", activeImages: [] }
    );
    const cache = useMemo2(() => {
      if (Catpow.SelectPreparedImage.cache == null) {
        Catpow.SelectPreparedImage.cache = {};
      }
      return Catpow.SelectPreparedImage.cache;
    }, []);
    useEffect2(() => {
      if (state.images === null) {
        if (cache[name]) {
          dispatch({ type: "update", images: cache[name] });
        } else {
          wp.apiFetch({ path: "cp/v1/images/" + name }).then((images) => {
            cache[name] = images;
            dispatch({ type: "update", images });
          });
        }
      }
    }, [state.images]);
    useEffect2(() => {
      if (state.image != null) {
        const newUrl = new URL(state.image.url);
        newUrl.searchParams.set("theme", wpinfo?.theme);
        newUrl.searchParams.set("c", color);
        if (newUrl.toString() !== value) {
          if (onSelect) {
            onSelect({ ...state.image, url: newUrl.toString() });
          }
          if (onChange) {
            onChange(newUrl.toString());
          }
        }
      }
    }, [state.image]);
    if (state.images === null) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx(className, "is-" + name, open ? "is-open" : "is-close"), ...otherProps }, /* @__PURE__ */ wp.element.createElement("img", { className: "_img", src: value, alt: "", width: "40", height: "40", onClick: () => setOpen(true) }), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open, onClose: () => setOpen(false) }, /* @__PURE__ */ wp.element.createElement("div", { className: className + "__popover" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_current" }, /* @__PURE__ */ wp.element.createElement("img", { className: "_img", src: value, alt: "" }), /* @__PURE__ */ wp.element.createElement("div", { className: "_filename" }, value?.split("/").pop())), /* @__PURE__ */ wp.element.createElement("div", { className: "_search" }, /* @__PURE__ */ wp.element.createElement("input", { type: "text", placeholder: "Search images...", value: state.keyword, onChange: (e) => dispatch({ type: "update", keyword: e.target.value }) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_pages" }, [...chunk(state.activeImages, 100)].map((pageImages, index) => /* @__PURE__ */ wp.element.createElement("div", { className: clsx("_page", { "is-active": state.page === index }), key: index }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items_" }, pageImages.map((image) => {
      return /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_item", { "is-active": value == image.url }), key: image.url }, /* @__PURE__ */ wp.element.createElement("img", { className: "_img", src: image.url, alt: image.alt, onClick: () => dispatch({ type: "update", image }) }));
    }))))), /* @__PURE__ */ wp.element.createElement("div", { className: "_pagenation" }, [...chunk(state.activeImages, 100)].map((_, index) => /* @__PURE__ */ wp.element.createElement("button", { key: index, className: clsx("_btn", { "is-active": state.page === index }), onClick: () => dispatch({ type: "gotoPage", page: index }) }, index + 1)))))));
  };
})();
