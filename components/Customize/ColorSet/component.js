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

  // node_modules-included/catpow/src/util/color/hexToRgb.js
  var hexToRgb = (hex) => {
    const [r, g, b, a = 255] = (hex.match(/^#?(\w)(\w)(\w)(\w)?$/) || hex.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/)).slice(1).map((c) => {
      const val = parseInt(c, 16);
      return isNaN(val) ? 255 : val;
    });
    return { r, g, b, a };
  };

  // node_modules-included/catpow/src/util/color/hexToOklch.js
  var linear = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  var hexToOklch = (hex) => {
    let { r, g, b, a = 255 } = hexToRgb(hex);
    r = linear(r);
    g = linear(g);
    b = linear(b);
    a /= 255;
    let l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    let m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    let s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    l_ = Math.cbrt(l_);
    m_ = Math.cbrt(m_);
    s_ = Math.cbrt(s_);
    let l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    let a_ = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    let b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    let c = Math.sqrt(a_ * a_ + b_ * b_);
    let h = Math.atan2(b_, a_) * (180 / Math.PI);
    if (h < 0) {
      h += 360;
    }
    return { l, c, h, a };
  };

  // node_modules-included/catpow/src/util/color/hslToHex.js
  var hslToHex = (hsl) => {
    var l = Math.min(100, hsl.l) / 100;
    var a = Math.min(100, hsl.s) * Math.min(l, 1 - l) / 100;
    var f = function(n) {
      var k = (n + hsl.h / 30) % 12;
      var c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * c).toString(16).padStart(2, "0");
    };
    return "#" + f(0) + f(8) + f(4);
  };

  // node_modules-included/catpow/src/hooks/useThrottle.jsx
  init_react();
  var { useEffect: useEffect2, useRef: useRef2 } = react_default;
  var useThrottle = (callback, interval, deps) => {
    const ref = useRef2(false);
    useEffect2(() => {
      if (ref.current) {
        const timer = setTimeout(callback, interval);
        return () => clearTimeout(timer);
      }
      ref.current = true;
      callback();
      setTimeout(() => {
        ref.current = false;
      }, interval);
    }, deps);
  };

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

  // ../components/Customize/ColorSet/component.jsx
  var { useState: useState2, useCallback: useCallback2, useMemo: useMemo2, useEffect: useEffect3, useReducer: useReducer2 } = wp.element;
  Catpow.Customize.ColorSet = (props) => {
    const { value, onChange, param } = props;
    const { roles } = param;
    const [inputMode, setInputMode] = useState2("pane");
    const [activeRole, setActiveRole] = useState2(null);
    const [state, dispatch] = useReducer2(colorReducer, { value, roles }, initColors);
    useThrottle(
      () => {
        onChange(state.colors);
      },
      100,
      [state.colors]
    );
    switch (inputMode) {
      case "pane": {
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset" }, /* @__PURE__ */ wp.element.createElement(ModeSelect, { value: inputMode, onChange: setInputMode }), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette" }, Object.keys(roles).map((role) => /* @__PURE__ */ wp.element.createElement(
          Palette,
          {
            role: roles[role],
            value: state?.colors?.[role],
            open: role === activeRole,
            onClick: () => setActiveRole(role === activeRole ? null : role),
            onChange: (value2) => dispatch({ role, value: value2 }),
            key: role
          }
        ))), /* @__PURE__ */ wp.element.createElement(HueRange, { value: state.colors, onChange: (value2) => dispatch(value2) }), /* @__PURE__ */ wp.element.createElement(Preview, { value: state.colors }));
      }
      case "bulk": {
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset" }, /* @__PURE__ */ wp.element.createElement(ModeSelect, { value: inputMode, onChange: setInputMode }), /* @__PURE__ */ wp.element.createElement(BulkInput, { value: state.colors, roles, onChange: (colors) => dispatch({ colors }) }), /* @__PURE__ */ wp.element.createElement(Preview, { value: state.colors }));
      }
    }
  };
  var colorReducer = (state, action) => {
    if (action.colors) {
      const newColors2 = { ...state.colors, ...action.colors };
      Object.keys(action.colors).map((role2) => {
        if (state.roles[role2]) {
          newColors2.tones[state.roles[role2].shorthand] = getTones(action.colors[role2]);
        }
      });
      return { ...state, colors: newColors2 };
    }
    if (action.hueRange) {
      return { ...state, colors: { ...state.colors, hueRange: parseInt(action.hueRange) } };
    }
    if (action.hueShift !== void 0) {
      return { ...state, colors: { ...state.colors, hueShift: parseInt(action.hueShift) } };
    }
    const { role, value } = action;
    const key = state.roles[role].shorthand;
    state.colors.tones[key] = getTones(value);
    const newColors = { ...state.colors, [role]: value };
    return { ...state, colors: newColors };
  };
  var initColors = ({ value: colors, roles }) => {
    if (!colors) {
      colors = {};
    }
    if (!colors.tones) {
      colors.tones = {};
    }
    if (!colors.hueRange) {
      colors.hueRange = 30;
    }
    if (!colors.hueShift) {
      colors.hueShift = 0;
    }
    Object.keys(roles).map((role) => {
      const key = roles[role].shorthand;
      if (!colors[role]) {
        colors[role] = roles[role].default;
      }
      if (!colors.tones[key]) {
        colors.tones[key] = getTones(colors[role]);
      }
    });
    return { colors, roles };
  };
  var getTones = (color) => {
    if (color.slice(0, 5) === "oklch") {
      const [l, c, h, a = 1] = color.match(/^oklch\(([\d\.]+) ([\d\.]+) ([\d\.]+)(?: \/ ([\d\.]+))?\)$/).slice(1).map(parseFloat);
      return { l, c, h, a };
    }
    if (color.slice(0, 3) === "hsl") {
      const [h, s, l, a = 1] = color.match(/^hsla?\((\d+),(\d+)%,(\d+)%(?:,([\d\.]+))?\)$/).slice(1).map((v, i) => i < 3 ? parseInt(v) : parseFloat(v));
      color = hslToHex({ h, s, l, a });
    }
    if (/^#(\w{6}|\w{8})$/.test(color)) {
      const lch = hexToOklch(color);
      return {
        ...lch,
        t: 1 - lch.l / 100
      };
    }
  };
  var isDarkColor = (color) => {
    if (!color) {
      return true;
    }
    return getTones(color)?.l < 0.6;
  };
  var ModeSelect = (props) => {
    const { Icon } = wp.components;
    const { value, onChange } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-modeselect" }, /* @__PURE__ */ wp.element.createElement(Icon, { className: "colorset-modeselect__item" + (value === "pane" ? " active" : ""), icon: "admin-settings", onClick: () => onChange("pane") }), /* @__PURE__ */ wp.element.createElement(Icon, { className: "colorset-modeselect__item" + (value === "bulk" ? " active" : ""), icon: "media-text", onClick: () => onChange("bulk") }));
  };
  var Palette = (props) => {
    const { role, value, open, onClick, onChange } = props;
    const { ColorPicker } = wp.components;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette__item is-" + (open ? "open" : "close") }, /* @__PURE__ */ wp.element.createElement("div", { className: "chip " + (isDarkColor(value) ? "is-dark" : "is-light"), onClick, style: { backgroundColor: value } }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, role.label)), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette__box" }, /* @__PURE__ */ wp.element.createElement(ColorPicker, { color: value, onChange, enableAlpha: true, defaultValue: "#000" }))));
  };
  var HueRange = (props) => {
    const { value, onChange } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange__input" }, /* @__PURE__ */ wp.element.createElement("label", null, "Range"), /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "range",
        value: value.hueRange,
        onChange: (e) => {
          onChange({ hueRange: parseInt(e.currentTarget.value) });
        },
        min: 1,
        max: 30
      }
    )), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange__input" }, /* @__PURE__ */ wp.element.createElement("label", null, "Shift"), /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "range",
        value: value.hueShift,
        onChange: (e) => {
          onChange({ hueShift: parseInt(e.currentTarget.value) });
        },
        min: -180,
        max: 180
      }
    )));
  };
  var BulkInput = (props) => {
    const { Icon } = wp.components;
    const { value, roles, onChange } = props;
    const [tmp, setTmp] = useState2();
    const keyRoleMap = useMemo2(() => {
      const map = { hr: "hueRange", hs: "hueShift" };
      Object.keys(roles).map((role) => {
        map[roles[role].shorthand] = role;
      });
      return map;
    }, [roles]);
    const checkValue = useCallback2((tmp2) => {
      const lines = tmp2.split("\n");
      if (lines.some((line) => {
        if (!line) {
          return true;
        }
        const [key, val] = line.split(" : ");
        const role = keyRoleMap[key];
        if (key === "hr" || key === "hs") {
          return !/^-?\d+$/.test(val);
        }
        if (roles[role].alphaEnabled) {
          return !/^hsla?\(\d+,\d+%,\d+%(,[\d\.]+)?\)$/.test(val);
        }
        return !/^#\w{6}$/.test(val);
      })) {
        return false;
      }
      return true;
    }, []);
    const commitValue = useCallback2(
      (tmp2) => {
        const lines = tmp2.split("\n"), colors = {};
        lines.map((line) => {
          const [key, val] = line.split(" : ");
          const role = keyRoleMap[key];
          if (key === "hr" || key === "hs") {
            colors[role] = parseInt(val);
          } else {
            colors[role] = val;
            value.tones[key] = getTones(val);
          }
        });
        onChange(colors);
      },
      [onChange]
    );
    useEffect3(() => {
      setTmp(
        Object.keys(roles).map((role) => roles[role].shorthand + " : " + value[role]).join("\n") + "\nhr : " + value.hueRange + "\nhs : " + value.hueShift
      );
    }, [value]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-bulkinput" }, /* @__PURE__ */ wp.element.createElement(
      "textarea",
      {
        className: "cp-colorset-bulkinput__textarea",
        value: tmp,
        rows: Object.keys(roles).length + 2,
        onChange: (e) => {
          const tmp2 = e.currentTarget.value;
          setTmp(tmp2);
          if (checkValue(tmp2)) {
            commitValue(tmp2);
          }
        }
      }
    ), /* @__PURE__ */ wp.element.createElement(Icon, { className: "cp-colorset-bulkinput__clipboard", icon: "clipboard", onClick: () => navigator.clipboard.writeText(tmp) }));
  };
  var getOklchString = ({ l, c, h, a = 1 }, hr, hs, i) => {
    return `oklch(${l} ${c} ${h + hr * i + hs}${a ? ` / ${a}` : ""})`;
  };
  var Preview = (props) => {
    const { value } = props;
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-preview" }, [
      ["b", "t", "l"],
      ["s", "h", "l"],
      ["m", "i", "r"],
      ["a", "e", "r"]
    ].map(([k1, k2, k3]) => {
      const { hueRange: hr, hueShift: hs } = value;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "_row" }, [...Array(12).keys()].map((i) => /* @__PURE__ */ wp.element.createElement("div", { className: "_item", style: { backgroundColor: getOklchString(value.tones[k1], hr, hs, i) }, key: i }, /* @__PURE__ */ wp.element.createElement("div", { className: "_icon", style: { color: getOklchString(value.tones[k2], hr, hs, i), borderColor: getOklchString(value.tones[k3], hr, hs, i) } }, i + 1))));
    })));
  };
})();
