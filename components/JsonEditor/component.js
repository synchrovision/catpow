(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };

  // react-global:react
  var react_default, useState, useEffect, useLayoutEffect, useRef, forwardRef, useMemo2, useCallback, createContext, useContext, useReducer, createElement, cloneElement, isValidElement, Fragment;
  var init_react = __esm({
    "react-global:react"() {
      react_default = window.wp.element;
      useState = wp.element.useState;
      useEffect = wp.element.useEffect;
      useLayoutEffect = wp.element.useLayoutEffect;
      useRef = wp.element.useRef;
      forwardRef = wp.element.forwardRef;
      useMemo2 = wp.element.useMemo;
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

  // ../components/JsonEditor/component/inputComponents/None.jsx
  var None = (props) => {
    return false;
  };

  // ../components/JsonEditor/component/inputComponents/ReadOnly.jsx
  var { __, sprintf } = wp.i18n;
  var ReadOnly = (props) => {
    const { className = "cp-jsoneditor-input-readonly", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, agent.getValue() || "");
  };

  // ../components/JsonEditor/component/inputComponents/Toggle.jsx
  var { __: __2, sprintf: sprintf2 } = wp.i18n;
  var Toggle = (props) => {
    const { className = "cp-jsoneditor-input-toggle", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.Toggle, { value: agent.getValue(), onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Select.jsx
  var { __: __3, sprintf: sprintf3 } = wp.i18n;
  var Select = (props) => {
    const { className = "cp-jsoneditor-input-select", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectBox, { value: agent.getValue(), options: agent.getMergedSchemaForInput().enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Checkbox.jsx
  var { __: __4, sprintf: sprintf4 } = wp.i18n;
  var Checkbox = (props) => {
    const { className = "cp-jsoneditor-input-checkbox", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Catpow.CheckBoxes, { value: agent.getValue(), options: agent.getMergedSchemaForInput().items.enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Radio.jsx
  var { __: __5, sprintf: sprintf5 } = wp.i18n;
  var Radio = (props) => {
    const { className = "cp-jsoneditor-input-radio", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.RadioButtons, { value: agent.getValue(), options: schema.enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/SearchSelect.jsx
  var { __: __6, sprintf: sprintf6 } = wp.i18n;
  var SearchSelect = (props) => {
    const { className = "cp-jsoneditor-input-searchselect", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const options = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.items != null) {
        if (schema.items.options != null) {
          return schema.items.options;
        }
        if (schema.items.enum != null) {
          return schema.items.enum;
        }
        return [];
      }
      if (schema.options != null) {
        return schema.options;
      }
      if (schema.enum != null) {
        return schema.enum;
      }
      return [];
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SearchSelect, { options, multiple: agent.getMergedSchemaForInput().type === "array", onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/StepSelect.jsx
  var { __: __7, sprintf: sprintf7 } = wp.i18n;
  var StepSelect = (props) => {
    const { className = "cp-jsoneditor-input-stepselect", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const options = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.items != null) {
        if (schema.items.options != null) {
          return schema.items.options;
        }
        if (schema.items.enum != null) {
          return schema.items.enum;
        }
        return [];
      }
      if (schema.options != null) {
        return schema.options;
      }
      if (schema.enum != null) {
        return schema.enum;
      }
      return [];
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.StepSelect, { options, multiple: agent.getMergedSchemaForInput().type === "array", onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Text.jsx
  var { __: __8, sprintf: sprintf8 } = wp.i18n;
  var Text = (props) => {
    const { className = "cp-jsoneditor-input-text", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const autoComplete = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.hasOwnProperty("autoComplete")) {
        return schema.autoComplete;
      }
      if (schema.hasOwnProperty("format")) {
        switch (schema.format) {
          case "email":
          case "idn-email":
            return "email";
          case "uri":
          case "uri-reference":
            return "url";
        }
      }
      return null;
    }, [agent.getMergedSchemaForInput()]);
    const inputType = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.hasOwnProperty("format")) {
        switch (schema.format) {
          case "datetime":
            return "datetime-local";
          case "uri":
            return "url";
          case "date":
          case "time":
          case "email":
            return schema.format;
          default:
            return "text";
        }
      }
      return "text";
    }, [agent.getMergedSchemaForInput()]);
    const size = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.hasOwnProperty("maxLength")) {
        return schema.maxLength;
      }
      return null;
    }, [agent.getMergedSchemaForInput()]);
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onChange]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: inputType, value: agent.getValue() || "", size, className: classes.input(), onChange: onChangeHandle, onBlur: onUpdateHandle, autoComplete }));
  };

  // ../components/JsonEditor/component/inputComponents/Textarea.jsx
  var { __: __9, sprintf: sprintf9 } = wp.i18n;
  var Textarea = (props) => {
    const { className = "cp-jsoneditor-input-textarea", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onChange]
    );
    const { cols, rows } = useMemo4(() => {
      const schema = agent.getMergedSchemaForInput();
      const { cols: cols2, rows: rows2 } = schema;
      return { cols: cols2, rows: rows2 };
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("textarea", { className: classes.textarea(), onChange: onChangeHandle, onBlur: onUpdateHandle, value: agent.getValue() || "", cols, rows }));
  };

  // ../components/JsonEditor/component/inputComponents/DateTime.jsx
  var { __: __10, sprintf: sprintf10 } = wp.i18n;
  var DateTime = (props) => {
    const { className = "cp-jsoneditor-input-datetime", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "datetime-local", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Date.jsx
  var { __: __11, sprintf: sprintf11 } = wp.i18n;
  var Date2 = (props) => {
    const { className = "cp-jsoneditor-input-date", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "date", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Time.jsx
  var { __: __12, sprintf: sprintf12 } = wp.i18n;
  var Time = (props) => {
    const { className = "cp-jsoneditor-input-time", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "time", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Duration.jsx
  var { __: __13, sprintf: sprintf13 } = wp.i18n;
  var Duration = (props) => {
    const { className = "cp-jsoneditor-input-duration", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.InputDuration, { value: agent.getValue() || "", onChange: onUpdate }));
  };

  // modules/src/component/Animation/Animation.jsx
  init_react();

  // modules/src/component/Animation/MosaicWave.jsx
  init_react();

  // modules/src/component/Input/PositionInput.jsx
  init_react();

  // modules/src/component/Bem.jsx
  init_react();
  var applyBem2 = (component, { ...ctx }) => {
    if (Array.isArray(component)) {
      component.forEach((child) => {
        applyBem2(child, ctx);
      });
      return;
    }
    if (component?.props == null) {
      return;
    }
    if (component.type == react_default.Fragment) {
      applyBem2(component.props.children, ctx);
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
        const matches = className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
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
        applyBem2(child, ctx);
      });
    } else {
      applyBem2(children, ctx);
    }
  };
  var Bem = ({ prefix = "cp", block, element, children }) => {
    const ctx = { prefix, block, element };
    applyBem2(children, ctx);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // modules/src/hooks/useThrottle.jsx
  init_react();
  var { useEffect: useEffect2, useRef: useRef2 } = react_default;

  // modules/src/component/Input/SizingInput.jsx
  init_react();
  var SizingContext = createContext();

  // modules/src/component/Nav/Nav.jsx
  init_react();

  // modules/src/component/Nav/Menu.jsx
  init_react();

  // modules/src/component/Nav/MenuItem.jsx
  init_react();

  // modules/src/component/Nav/MainMenu.jsx
  init_react();

  // modules/src/component/Nav/SubMenu.jsx
  init_react();

  // modules/src/component/Nav/SubMenuContents.jsx
  init_react();

  // modules/src/component/SVG/ComputeLine.jsx
  init_react();

  // modules/src/component/SVG/Honycomb.jsx
  init_react();

  // modules/src/component/SVG/Flux.jsx
  init_react();

  // modules/src/component/SVG/Star.jsx
  init_react();

  // modules/src/component/SVG/SVG.jsx
  init_react();

  // modules/src/component/Cloak.jsx
  init_react();

  // modules/src/component/ElasticBox.jsx
  init_react();

  // modules/src/component/Parallax.jsx
  init_react();

  // modules/src/component/Portal.jsx
  init_react();

  // react-global:react-dom
  var react_dom_default = window.wp.element;
  var createPortal = wp.element.createPortal;
  var flushSync = wp.element.flushSync;

  // modules/src/component/PortalWindow.jsx
  init_react();

  // modules/src/component/RawNode.jsx
  init_react();

  // modules/src/component/ScrollSpy.jsx
  init_react();

  // modules/src/component/Slider.jsx
  init_react();

  // modules/src/component/TabPanel.jsx
  init_react();

  // modules/src/component/TextBuild.jsx
  init_react();

  // modules/src/component/Transition.jsx
  init_react();

  // modules/src/hooks/useAgent.jsx
  init_react();
  var { useMemo: useMemo3, useState: useState2, useCallback: useCallback2, useRef: useRef3, useEffect: useEffect3, createContext: createContext2, useContext: useContext2, lazy } = react_default;
  var AgentContext = createContext2();

  // modules/src/hooks/useBem.jsx
  init_react();

  // modules/src/hooks/useCache.jsx
  init_react();

  // modules/src/hooks/useQuery.jsx
  init_react();

  // modules/src/hooks/useTransition.jsx
  init_react();

  // modules/src/hooks/useLazyProvider.jsx
  init_react();

  // modules/src/hooks/useLazyComponent.jsx
  init_react();

  // modules/src/hooks/useDebounce.jsx
  init_react();
  var { useEffect: useEffect4 } = react_default;

  // modules/src/hooks/useChangeEffect.jsx
  init_react();

  // modules/src/component/Loop.jsx
  init_react();

  // ../components/JsonEditor/component/inputComponents/Range.jsx
  var { __: __14, sprintf: sprintf14 } = wp.i18n;
  var Range = (props) => {
    const { className = "cp-jsoneditor-input-range", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { minimum: min, maximum: max, multipleOf: step2 } = agent.getMergedSchemaForInput();
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(parseFloat(e.currentTarget.value));
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { className: "_range", type: "range", value: agent.getValue(), min, max, step: step2, onChange: onUpdateHandle }), /* @__PURE__ */ wp.element.createElement("input", { className: "_input", type: "number", value: agent.getValue(), min, max, step: step2, onChange: onUpdateHandle })));
  };

  // ../components/JsonEditor/component/inputComponents/Number.jsx
  var { __: __15, sprintf: sprintf15 } = wp.i18n;
  var Number2 = (props) => {
    const { className = "cp-jsoneditor-input-number", agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const { minimum: min, maximum: max, multipleOf: step2 } = agent.getMergedSchemaForInput();
    const onChangeHandle = useCallback3(
      (e) => {
        onChange(parseFloat(e.currentTarget.value));
      },
      [onChange]
    );
    const onUpdateHandle = useCallback3(
      (e) => {
        onUpdate(parseFloat(e.currentTarget.value));
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value: agent.getValue(), min, max, step: step2, onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/ArrayInput.jsx
  var ArrayInput = (props) => {
    const { className = "cp-jsoneditor-input-arrayinput", compact = false, agent, onChange, onUpdate } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || (compact ? "table" : "block");
    const size = schema.size || props.size || "medium";
    const { minContains: min, maxContains: max, items, prefixItems } = schema;
    const onAddItem = useCallback3(
      (index, value) => {
        agent.addItem(index, value);
      },
      [agent]
    );
    const onCopyItem = useCallback3(
      (from, to) => {
        agent.copyItem(from, to);
      },
      [agent]
    );
    const onMoveItem = useCallback3(
      (from, to) => {
        agent.moveItem(from, to);
      },
      [agent]
    );
    const onRemoveItem = useCallback3(
      (index) => {
        agent.removeItem(index);
      },
      [agent]
    );
    const [lastUpdated, setLastUpdated] = useState3(Date.now());
    useEffect5(() => {
      const cb = (e) => {
        setLastUpdated(Date.now());
      };
      agent.on("modifyItems", cb);
      return () => agent.off("modifyItems", cb);
    }, []);
    const getItemId = useMemo4(() => {
      const map = /* @__PURE__ */ new WeakMap();
      let maxId = 0;
      return (item) => {
        if (!map.has(item)) {
          map.set(item, maxId++);
        }
        return map.get(item);
      };
    }, []);
    const InputComponent = useMemo4(() => {
      if (layout === "table") {
        return (props2) => {
          const { agent: agent2 } = props2;
          const cols = {};
          for (const item of agent2.items) {
            const itemSchema = item.getMergedSchemaForInput();
            if (itemSchema.properties == null) {
              continue;
            }
            for (const col in itemSchema.properties) {
              if (cols[col] == null) {
                cols[col] = {};
              }
              Object.assign(cols[col], itemSchema.properties[col]);
            }
          }
          const sortedColsKeys = Object.keys(cols).filter((key) => !cols[key].hidden).sort((key1, key2) => (cols[key1].order || 10) - (cols[key2].order || 10));
          return /* @__PURE__ */ wp.element.createElement(Catpow.TableInput, { size, labels: sortedColsKeys.map((key) => cols[key].title || key), onAddItem, onCopyItem, onMoveItem, onRemoveItem }, props2.agent.items.map(
            (item) => sortedColsKeys.map((col) => {
              if (item.getMergedSchemaForInput().properties[col] == null) {
                return false;
              }
              return /* @__PURE__ */ wp.element.createElement(Input, { agent: item.properties[col], layout: "inline", size: "small", compact: true, key: getItemId(item) });
            })
          ));
        };
      }
      return (props2) => {
        const { agent: agent2 } = props2;
        return /* @__PURE__ */ wp.element.createElement(Catpow.ArrayInput, { size, onAddItem, onCopyItem, onMoveItem, onRemoveItem }, props2.agent.items.map((item) => /* @__PURE__ */ wp.element.createElement(Input, { agent: item, layout: "inline", size: "small", compact: true, key: getItemId(item) })));
      };
    }, [layout, size, onAddItem, onCopyItem, onMoveItem, onRemoveItem]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(`is-layout-${layout}`, `is-size-${size}`) }, /* @__PURE__ */ wp.element.createElement(InputComponent, { agent }));
  };

  // ../components/JsonEditor/component/functions.jsx
  var getInputComponentForSchema = (schema, params) => {
    if (schema.hasOwnProperty("@editor")) {
      if (JsonEditor[schema["@editor"]]) {
        return JsonEditor[schema["@editor"]];
      }
    }
    if (schema.hasOwnProperty("options")) {
      if (Array.isArray(schema.options) || Object.keys(schema.options).every((key) => typeof schema.options[key] !== "object")) {
        const length = Array.isArray(schema.options) ? schema.options.length : Object.keys(schema.options).lenght;
        if (length < 8 && !params.compact) {
          return Radio;
        }
        if (length < 64) {
          return Select;
        }
        return SearchSelect;
      }
      return StepSelect;
    }
    if (schema.type === "null") {
      return None;
    }
    if (schema.const) {
      return ReadOnly;
    }
    if (schema.enum) {
      if (schema.enum.length < 8 && !params.compact) {
        return Radio;
      }
      if (schema.enum.length < 64) {
        return Select;
      }
      return SearchSelect;
    }
    if (schema.type === "boolean") {
      return Toggle;
    }
    if (schema.type === "string") {
      if (schema.format) {
        switch (schema.format) {
          case "date-time":
            return DateTime;
          case "date":
            return Date2;
          case "time":
            return Time;
          case "duration":
            return Duration;
          default:
            return Text;
        }
      }
      if (schema.hasOwnProperty("pattern") || schema.hasOwnProperty("maxLength") && schema.maxLength < 40) {
        return Text;
      }
      return Textarea;
    }
    if (schema.type === "integer" || schema.type === "number") {
      if (schema.hasOwnProperty("minimum") && schema.hasOwnProperty("maximum")) {
        return Range;
      }
      return Number2;
    }
    if (schema.type === "array") {
      if (schema.items.enum) {
        if (schema.items.enum.length < 16) {
          return Checkbox;
        }
        return SearchSelect;
      }
      return ArrayInput;
    }
    if (schema.type === "object") {
      return ObjectInput;
    }
    return Text;
  };

  // ../components/JsonEditor/component/inputComponents/Input.jsx
  var { __: __16, sprintf: sprintf16 } = wp.i18n;
  var Input = (props) => {
    const { className = "cp-jsoneditor-input", compact = false, level = 0, agent } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5, useContext: useContext3 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || (compact ? "table" : "block");
    const size = schema.size || props.size || "medium";
    const { getAdditionalInputComponent } = useContext3(DataContext);
    const { description } = schema;
    const InputComponent = useMemo4(() => {
      return getAdditionalInputComponent && getAdditionalInputComponent(schema, { layout, size, compact }) || getInputComponentForSchema(schema, { layout, size, compact });
    }, [schema, layout, size]);
    const [showMessage, setShowMessage] = useState3(false);
    const onChange = useCallback3(
      (value) => {
        agent.setValue(value);
        setShowMessage(false);
      },
      [agent, setShowMessage]
    );
    const onUpdate = useCallback3(
      (value) => {
        agent.setValue(value);
        agent.update();
        window.requestAnimationFrame(() => {
          setShowMessage(true);
        });
      },
      [agent, setShowMessage]
    );
    const [lastChanged, setLastChanged] = useState3(Date.now());
    useEffect5(() => {
      const cb = (e) => {
        setLastChanged(Date.now());
      };
      agent.on("change", cb);
      return () => agent.off("change", cb);
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-invalid": !agent.isValid, "is-compact": compact }, `is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`), "data-json-key": agent.key }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, agent.getMessage() && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.message(showMessage ? "is-show" : "is-hidden") }, agent.getMessage()), /* @__PURE__ */ wp.element.createElement(InputComponent, { agent, size, compact, level, onChange, onUpdate, lastChanged }), description && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.description() }, description)));
  };

  // ../components/JsonEditor/component/inputComponents/ObjectInput.jsx
  var ObjectInput = (props) => {
    const { className = "cp-jsoneditor-input-objectinput", compact = false, popoverSize = "large", level = 0, agent, lastChanged } = props;
    const { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useEffect: useEffect5, useContext: useContext3 } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo4(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || "block";
    const size = schema.size || props.size || "medium";
    const InputComponent = useMemo4(() => {
      const InputBodyComponent = (() => {
        const stateClassNames = `is-layout-${layout} is-size-${size} is-level-${level}`;
        switch (layout) {
          case "block": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema2 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement("div", { className: classes.block(stateClassNames) }, Object.keys(schema2.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema3 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item(), key: name }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item.title() }, schema3.title || schema3.key || name), /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item.body() }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              }));
            };
          }
          case "table": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema2 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement("table", { className: classes.table(stateClassNames) }, /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.table.tbody() }, Object.keys(schema2.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema3 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.tbody.tr(), key: name }, /* @__PURE__ */ wp.element.createElement("th", { className: classes.table.tbody.tr.th() }, schema3.title || schema3.key), /* @__PURE__ */ wp.element.createElement("td", { className: classes.table.tbody.tr.td() }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              })));
            };
          }
          case "inline": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema2 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement("div", { className: classes.row(stateClassNames) }, Object.keys(schema2.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema3 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("div", { className: classes.row.item(), key: name }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.row.item.title() }, schema3.title || schema3.key), /* @__PURE__ */ wp.element.createElement("div", { className: classes.row.item.body() }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              }));
            };
          }
        }
      })();
      if (compact) {
        return (props2) => {
          const { agent: agent2 } = props2;
          const schema2 = agent2.getMergedSchemaForInput();
          const [open, setOpen] = useState3(false);
          const onClose = useCallback3(() => setOpen(false), [setOpen]);
          const getLabel = useMemo4(() => {
            if (!schema2.label) {
              return () => schema2.title || schema2.key;
            }
            if (schema2.label.includes("{")) {
              return (agent3) => schema2.label.replaceAll(/{(.+?)}/g, (match, p1) => {
                const names = p1.split("|");
                for (let name of names) {
                  if (/^("|').+\1$/.test(name)) {
                    return name.slice(1, -1);
                  }
                  if (agent3.properties[name]) {
                    let value = agent3.properties[name].getValue();
                    if (value) {
                      return value;
                    }
                  }
                }
                return "";
              });
            }
            return () => schema2.label;
          }, [schema2.label]);
          const label = getLabel(agent2);
          return /* @__PURE__ */ wp.element.createElement("div", { className: classes(`is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`, open ? "is-open" : "is-close") }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.label(), onClick: () => setOpen(!open) }, label), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open, size: popoverSize, onClose, closeButton: true, closeOnClickAway: false }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.body() }, /* @__PURE__ */ wp.element.createElement(InputBodyComponent, { agent: agent2 }))));
        };
      }
      return InputBodyComponent;
    }, [classes, layout, size, compact, popoverSize, level]);
    if (schema.properties == null) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes.message() });
    }
    return /* @__PURE__ */ wp.element.createElement(InputComponent, { agent });
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
  var clsx_default = clsx;

  // ../components/JsonEditor/component/JsonEditor.jsx
  var DataContext = wp.element.createContext({});
  var JsonEditor = (props) => {
    const { useState: useState3, useCallback: useCallback3, useMemo: useMemo4, useEffect: useEffect5, useRef: useRef4, useReducer: useReducer2 } = wp.element;
    const { className = "cp-jsoneditor-editor", title = "JsonEditor", schema, debug = false, onChange, autoSave = false, showHeader = true, children: getAdditionalInputComponent } = props;
    const [hasChange, setHasChange] = useState3(false);
    const json = useMemo4(() => {
      if (typeof props.json === "object") {
        return props.json;
      }
      if (props.json == null) {
        return {};
      }
      const json2 = JSON.parse(props.json);
      if (json2 == null) {
        return {};
      }
      return json2;
    }, []);
    const rootAgent = useMemo4(() => {
      const rootAgent2 = Catpow.schema(schema, { debug }).createAgent(json);
      let timer, isHold = false;
      rootAgent2.on("change", (e) => {
        setHasChange(true);
      });
      rootAgent2.on("update", (e) => {
        if (autoSave) {
          if (!isHold) {
            save();
            isHold = true;
            setTimeout(
              () => {
                isHold = false;
              },
              autoSave === true ? 1e3 : autoSave
            );
          } else {
            clearTimeout(timer);
            timer = setTimeout(save, autoSave === true ? 1e3 : autoSave);
          }
        }
      });
      return rootAgent2;
    }, [schema]);
    const save = useCallback3(() => {
      onChange(typeof props.json === "object" ? rootAgent.value : JSON.stringify(rootAgent.value));
      setHasChange(false);
    }, [rootAgent, setHasChange, onChange]);
    const data = useMemo4(() => {
      return { getAdditionalInputComponent };
    }, [getAdditionalInputComponent]);
    return /* @__PURE__ */ wp.element.createElement(DataContext.Provider, { value: data }, /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, showHeader && /* @__PURE__ */ wp.element.createElement("div", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_title" }, title), /* @__PURE__ */ wp.element.createElement("div", { className: "_controls" }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_save", { "is-active": hasChange }), onClick: () => save() }, "Save"))), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(ObjectInput, { agent: rootAgent }))))));
  };
  JsonEditor.Input = Input;

  // ../components/JsonEditor/component/index.jsx
  window.Catpow.JsonEditor = JsonEditor;
  JsonEditor.DataContext = DataContext;
})();
