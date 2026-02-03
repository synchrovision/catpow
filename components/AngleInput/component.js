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

  // node_modules-included/catpow/src/util/array/phasedRange.js
  var phasedRange = function* (steps2) {
    let i = 0;
    for (let t of Object.keys(steps2).sort((a, b) => a - b)) {
      let step = parseFloat(steps2[t]);
      let end = parseFloat(t);
      if (step > 0) {
        for (; i < end; i += step) {
          yield i;
        }
      }
      i = end;
    }
    yield i;
  };

  // node_modules-included/catpow/src/util/array/range.js
  var range = function* (start, end, step = 1) {
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  };

  // node_modules-included/catpow/src/util/array/rangeValueConverter.ts
  var RANGE_CONVERTER = Symbol.for("RangeValueConverterApp");
  var rangeValueConverter = function(rawValues, snap = false) {
    if (isRangeValueConverterApp(rawValues)) {
      return rawValues;
    }
    let values;
    if (!Array.isArray(rawValues)) {
      values = [...(typeof rawValues === "number" ? range : phasedRange)(rawValues)];
    } else {
      values = rawValues;
    }
    const len = values.length;
    const lastIndex = len - 1;
    return {
      [RANGE_CONVERTER]: true,
      length: values.length,
      getValue(pos) {
        if (pos < 0) {
          return values[0];
        }
        if (pos >= 1) {
          return values[lastIndex];
        }
        if (snap) {
          return values[Math.round(pos * lastIndex)];
        }
        const p = pos * lastIndex;
        const l = Math.floor(p);
        return values[l] + (values[l + 1] - values[l]) * (p - l);
      },
      getProgress(value) {
        return this.getPosition(value) / lastIndex;
      },
      getPosition(value) {
        let l = 0, r2 = lastIndex, m;
        if (values[0] > value) {
          return 0;
        }
        if (values[r2] < value) {
          return r2;
        }
        while (l <= r2) {
          m = l + (r2 - l >> 1);
          if (values[m] === value) {
            return m;
          }
          if (values[m] > value) {
            r2 = m - 1;
          } else {
            l = m + 1;
          }
        }
        const p = r2 + (value - values[r2]) / (values[l] - values[r2]);
        return snap ? Math.round(p) : p;
      }
    };
  };
  var isRangeValueConverterApp = (maybeApp) => Boolean(maybeApp?.[RANGE_CONVERTER]);

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

  // node_modules-included/catpow/src/component/Input/AngleInput.jsx
  init_react();

  // node_modules/react-use/esm/useMountedState.js
  init_react();
  function useMountedState() {
    var mountedRef = useRef(false);
    var get = useCallback(function() {
      return mountedRef.current;
    }, []);
    useEffect(function() {
      mountedRef.current = true;
      return function() {
        mountedRef.current = false;
      };
    }, []);
    return get;
  }

  // node_modules/react-use/esm/useSetState.js
  init_react();
  var useSetState = function(initialState) {
    if (initialState === void 0) {
      initialState = {};
    }
    var _a = useState(initialState), state = _a[0], set = _a[1];
    var setState = useCallback(function(patch) {
      set(function(prevState) {
        return Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch);
      });
    }, []);
    return [state, setState];
  };
  var useSetState_default = useSetState;

  // node_modules/react-use/esm/misc/util.js
  var noop = function() {
  };
  function on(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (obj && obj.addEventListener) {
      obj.addEventListener.apply(obj, args);
    }
  }
  function off(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (obj && obj.removeEventListener) {
      obj.removeEventListener.apply(obj, args);
    }
  }
  var isBrowser = typeof window !== "undefined";

  // node_modules/react-use/esm/useSlider.js
  init_react();
  var useSlider = function(ref, options) {
    if (options === void 0) {
      options = {};
    }
    var isMounted = useMountedState();
    var isSliding = useRef(false);
    var valueRef = useRef(0);
    var frame = useRef(0);
    var _a = useSetState_default({
      isSliding: false,
      value: 0
    }), state = _a[0], setState = _a[1];
    valueRef.current = state.value;
    useEffect(function() {
      if (isBrowser) {
        var styles = options.styles === void 0 ? true : options.styles;
        var reverse_1 = options.reverse === void 0 ? false : options.reverse;
        if (ref.current && styles) {
          ref.current.style.userSelect = "none";
        }
        var startScrubbing_1 = function() {
          if (!isSliding.current && isMounted()) {
            (options.onScrubStart || noop)();
            isSliding.current = true;
            setState({ isSliding: true });
            bindEvents_1();
          }
        };
        var stopScrubbing_1 = function() {
          if (isSliding.current && isMounted()) {
            (options.onScrubStop || noop)(valueRef.current);
            isSliding.current = false;
            setState({ isSliding: false });
            unbindEvents_1();
          }
        };
        var onMouseDown_1 = function(event) {
          startScrubbing_1();
          onMouseMove_1(event);
        };
        var onMouseMove_1 = options.vertical ? function(event) {
          return onScrub_1(event.clientY);
        } : function(event) {
          return onScrub_1(event.clientX);
        };
        var onTouchStart_1 = function(event) {
          startScrubbing_1();
          onTouchMove_1(event);
        };
        var onTouchMove_1 = options.vertical ? function(event) {
          return onScrub_1(event.changedTouches[0].clientY);
        } : function(event) {
          return onScrub_1(event.changedTouches[0].clientX);
        };
        var bindEvents_1 = function() {
          on(document, "mousemove", onMouseMove_1);
          on(document, "mouseup", stopScrubbing_1);
          on(document, "touchmove", onTouchMove_1);
          on(document, "touchend", stopScrubbing_1);
        };
        var unbindEvents_1 = function() {
          off(document, "mousemove", onMouseMove_1);
          off(document, "mouseup", stopScrubbing_1);
          off(document, "touchmove", onTouchMove_1);
          off(document, "touchend", stopScrubbing_1);
        };
        var onScrub_1 = function(clientXY) {
          cancelAnimationFrame(frame.current);
          frame.current = requestAnimationFrame(function() {
            if (isMounted() && ref.current) {
              var rect = ref.current.getBoundingClientRect();
              var pos = options.vertical ? rect.top : rect.left;
              var length_1 = options.vertical ? rect.height : rect.width;
              if (!length_1) {
                return;
              }
              var value = (clientXY - pos) / length_1;
              if (value > 1) {
                value = 1;
              } else if (value < 0) {
                value = 0;
              }
              if (reverse_1) {
                value = 1 - value;
              }
              setState({
                value
              });
              (options.onScrub || noop)(value);
            }
          });
        };
        on(ref.current, "mousedown", onMouseDown_1);
        on(ref.current, "touchstart", onTouchStart_1);
        return function() {
          off(ref.current, "mousedown", onMouseDown_1);
          off(ref.current, "touchstart", onTouchStart_1);
        };
      } else {
        return void 0;
      }
    }, [ref, options.vertical]);
    return state;
  };
  var useSlider_default = useSlider;

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

  // node_modules-included/catpow/src/component/Input/AngleInput.jsx
  var AngleInput = (props) => {
    const { className = "cp-angleinput", step = 5, snap = false, showInputs = false, values = { value: props.value }, order = [], onChange, children, ...otherProps } = props;
    const ref = useRef(null);
    const { isSliding, value } = useSlider_default(ref);
    const [isStart, setIsStart] = useState(false);
    const [targetName, setTargetName] = useState(false);
    const cnv = useMemo(() => rangeValueConverter(steps, snap), [steps]);
    const { gt, lt } = useMemo(() => {
      const orderMap = { gt: {}, lt: {} };
      for (let i = 1; i < order.length; i++) {
        orderMap.lt[order[i - 1]] = order[i];
        orderMap.gt[order[i]] = order[i - 1];
      }
      return orderMap;
    }, [order]);
    const onChageCallback = useCallback(
      (key, val) => {
        if (gt[key] != null) {
          val = Math.max(val, values[gt[key]]);
        }
        if (lt[key] != null) {
          val = Math.min(val, values[lt[key]]);
        }
        onChange({ ...values, [key]: val });
      },
      [values, gt, lt, onChange]
    );
    useEffect(() => {
      if (!isSliding) {
        setTargetName(false);
      }
      setIsStart(isSliding);
    }, [isSliding]);
    useThrottle(
      () => {
        if (isStart) {
          setTargetName(
            Object.keys(values).reduce((p, c) => {
              if (p === null || Math.abs(cnv.getProgress(values[c]) - value) < Math.abs(cnv.getProgress(values[p]) - value)) {
                return c;
              }
              return p;
            }, null)
          );
          setIsStart(false);
        }
        if (targetName && onChange) {
          onChageCallback(targetName, cnv.getValue(value));
        }
      },
      50,
      [value]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className, style: Object.keys(values).reduce((p, c) => ({ ...p, ["--pos-" + c]: cnv.getProgress(values[c]) }), {}) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_bar" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body", ref }, Object.keys(values).map((name) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_control", `is-control-${name}`), style: { "--pos": cnv.getProgress(values[name]) } }, /* @__PURE__ */ wp.element.createElement("div", { className: "_value" }, values[name]));
    }))), showInputs && /* @__PURE__ */ wp.element.createElement("div", { className: "_inputs" }, Object.keys(values).map((name) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_item", `is-input-${name}`) }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value: values[name], className: "_input", onChange: (e) => onChageCallback(name, e.target.value) }));
    }))));
  };

  // ../components/AngleInput/component.jsx
  Catpow.AngleInput = AngleInput;
})();
