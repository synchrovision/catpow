(() => {
  // ../components/JsonEditor/component/inputComponents/None.jsx
  var None = (props) => {
    return false;
  };

  // ../components/JsonEditor/component/inputComponents/ReadOnly.jsx
  var { __, sprintf } = wp.i18n;
  var ReadOnly = (props) => {
    const { className = "cp-jsoneditor-input-readonly", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, agent.getValue() || "");
  };

  // ../components/JsonEditor/component/inputComponents/Toggle.jsx
  var { __: __2, sprintf: sprintf2 } = wp.i18n;
  var Toggle = (props) => {
    const { className = "cp-jsoneditor-input-toggle", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.Toggle, { value: agent.getValue(), onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Select.jsx
  var { __: __3, sprintf: sprintf3 } = wp.i18n;
  var Select = (props) => {
    const { className = "cp-jsoneditor-input-select", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectBox, { value: agent.getValue(), options: agent.getMergedSchemaForInput().enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Checkbox.jsx
  var { __: __4, sprintf: sprintf4 } = wp.i18n;
  var Checkbox = (props) => {
    const { className = "cp-jsoneditor-input-checkbox", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(
      Catpow.CheckBoxes,
      {
        value: agent.getValue(),
        options: agent.getMergedSchemaForInput().items.enum,
        onChange: onUpdate
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/Radio.jsx
  var { __: __5, sprintf: sprintf5 } = wp.i18n;
  var Radio = (props) => {
    const { className = "cp-jsoneditor-input-radio", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.RadioButtons, { value: agent.getValue(), options: schema.enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/SearchSelect.jsx
  var { __: __6, sprintf: sprintf6 } = wp.i18n;
  var SearchSelect = (props) => {
    const { className = "cp-jsoneditor-input-searchselect", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const options = useMemo(() => {
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      Catpow.SearchSelect,
      {
        options,
        multiple: agent.getMergedSchemaForInput().type === "array",
        onChange: onUpdate
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/StepSelect.jsx
  var { __: __7, sprintf: sprintf7 } = wp.i18n;
  var StepSelect = (props) => {
    const { className = "cp-jsoneditor-input-stepselect", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const options = useMemo(() => {
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      Catpow.StepSelect,
      {
        options,
        multiple: agent.getMergedSchemaForInput().type === "array",
        onChange: onUpdate
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/Text.jsx
  var { __: __8, sprintf: sprintf8 } = wp.i18n;
  var Text = (props) => {
    const { className = "cp-jsoneditor-input-text", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const autoComplete = useMemo(() => {
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
    const inputType = useMemo(() => {
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
    const size = useMemo(() => {
      const schema = agent.getMergedSchemaForInput();
      if (schema.hasOwnProperty("maxLength")) {
        return schema.maxLength;
      }
      return null;
    }, [agent.getMergedSchemaForInput()]);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: inputType,
        value: agent.getValue() || "",
        size,
        className: classes.input(),
        onChange: onChangeHandle,
        onBlur: onUpdateHandle,
        autoComplete
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/Textarea.jsx
  var { __: __9, sprintf: sprintf9 } = wp.i18n;
  var Textarea = (props) => {
    const { className = "cp-jsoneditor-input-textarea", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onChange]);
    const { cols, rows } = useMemo(() => {
      const schema = agent.getMergedSchemaForInput();
      const { cols: cols2, rows: rows2 } = schema;
      return { cols: cols2, rows: rows2 };
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      "textarea",
      {
        className: classes.textarea(),
        onChange: onChangeHandle,
        onBlur: onUpdateHandle,
        value: agent.getValue() || "",
        cols,
        rows
      }
    ));
  };

  // modules/src/util/bem.jsx
  var bem = (className) => {
    const children = {};
    const firstClass = className.split(" ")[0];
    return new Proxy(function() {
      if (arguments.length > 0) {
        const classes = [];
        let i;
        for (i = 0; i < arguments.length; i++) {
          if (!arguments[i]) {
            continue;
          }
          if (typeof arguments[i] === "string") {
            classes.push(arguments[i]);
            continue;
          }
          classes.push.apply(
            classes,
            Array.isArray(arguments[i]) ? arguments[i] : Object.keys(arguments[i]).filter((c) => arguments[i][c])
          );
        }
        if (classes.length > 0) {
          return (className + " " + classes.join(" ")).replace(" --", " " + firstClass + "--");
        }
      }
      return className;
    }, {
      get: (target, prop) => {
        if (void 0 === children[prop]) {
          children[prop] = bem(firstClass + (prop[0] === "_" ? "_" : "-") + prop);
        }
        return children[prop];
      }
    });
  };

  // ../components/JsonEditor/component/inputComponents/DateTime.jsx
  var { __: __10, sprintf: sprintf10 } = wp.i18n;
  var DateTime = (props) => {
    const { className = "cp-jsoneditor-input-datetime", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "datetime-local", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Date.jsx
  var { __: __11, sprintf: sprintf11 } = wp.i18n;
  var Date2 = (props) => {
    const { className = "cp-jsoneditor-input-date", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "date", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Time.jsx
  var { __: __12, sprintf: sprintf12 } = wp.i18n;
  var Time = (props) => {
    const { className = "cp-jsoneditor-input-time", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "time", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/Duration.jsx
  var { __: __13, sprintf: sprintf13 } = wp.i18n;
  var Duration = (props) => {
    const { className = "cp-jsoneditor-input-duration", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.InputDuration, { value: agent.getValue() || "", onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Range.jsx
  var { __: __14, sprintf: sprintf14 } = wp.i18n;
  var Range = (props) => {
    const { className = "cp-jsoneditor-input-range", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const { minimum: min, maximum: max, multipleOf: step } = agent.getMergedSchemaForInput();
    const onChangeHandle = useCallback((e) => {
      onChange(parseFloat(e.currentTarget.value));
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(parseFloat(e.currentTarget.value));
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        className: classes.range(),
        type: "range",
        value: agent.getValue(),
        min,
        max,
        step,
        onChange: onChangeHandle,
        onBlur: onUpdateHandle
      }
    ), /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        className: classes.input(),
        type: "number",
        value: agent.getValue(),
        min,
        max,
        step,
        onChange: onChangeHandle,
        onBlur: onUpdateHandle
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/Number.jsx
  var { __: __15, sprintf: sprintf15 } = wp.i18n;
  var Number2 = (props) => {
    const { className = "cp-jsoneditor-input-number", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const { minimum: min, maximum: max, multipleOf: step } = agent.getMergedSchemaForInput();
    const onChangeHandle = useCallback((e) => {
      onChange(parseFloat(e.currentTarget.value));
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(parseFloat(e.currentTarget.value));
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "number",
        value: agent.getValue(),
        min,
        max,
        step,
        onChange: onChangeHandle,
        onBlur: onUpdateHandle
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/ArrayInput.jsx
  var ArrayInput = (props) => {
    const { className = "cp-jsoneditor-input-arrayinput", compact = false, agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || (compact ? "table" : "block");
    const size = schema.size || props.size || "medium";
    const { minContains: min, maxContains: max, items, prefixItems } = schema;
    const onAddItem = useCallback((index, value) => {
      agent.addItem(index, value);
    }, [agent]);
    const onCopyItem = useCallback((from, to) => {
      agent.copyItem(from, to);
    }, [agent]);
    const onMoveItem = useCallback((from, to) => {
      agent.moveItem(from, to);
    }, [agent]);
    const onRemoveItem = useCallback((index) => {
      agent.removeItem(index);
    }, [agent]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    useEffect(() => {
      const cb = (e) => {
        setLastUpdated(Date.now());
      };
      agent.on("modifyItems", cb);
      return () => agent.off("modifyItems", cb);
    }, []);
    const getItemId = useMemo(() => {
      const map = /* @__PURE__ */ new WeakMap();
      let maxId = 0;
      return (item) => {
        if (!map.has(item)) {
          map.set(item, maxId++);
        }
        return map.get(item);
      };
    }, []);
    const InputComponent = useMemo(() => {
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
          return /* @__PURE__ */ wp.element.createElement(
            Catpow.TableInput,
            {
              size,
              labels: sortedColsKeys.map((key) => cols[key].title || key),
              onAddItem,
              onCopyItem,
              onMoveItem,
              onRemoveItem
            },
            props2.agent.items.map((item) => sortedColsKeys.map((col) => {
              if (item.getMergedSchemaForInput().properties[col] == null) {
                return false;
              }
              return /* @__PURE__ */ wp.element.createElement(Input, { agent: item.properties[col], layout: "inline", size: "small", compact: true, key: getItemId(item) });
            }))
          );
        };
      }
      return (props2) => {
        const { agent: agent2 } = props2;
        return /* @__PURE__ */ wp.element.createElement(
          Catpow.ArrayInput,
          {
            size,
            onAddItem,
            onCopyItem,
            onMoveItem,
            onRemoveItem
          },
          props2.agent.items.map((item) => /* @__PURE__ */ wp.element.createElement(Input, { agent: item, layout: "inline", size: "small", compact: true, key: getItemId(item) }))
        );
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
    const { useState, useMemo, useCallback, useEffect, useContext } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || (compact ? "table" : "block");
    const size = schema.size || props.size || "medium";
    const { getAdditionalInputComponent } = useContext(DataContext);
    const { description } = schema;
    const InputComponent = useMemo(() => {
      return getAdditionalInputComponent && getAdditionalInputComponent(schema, { layout, size, compact }) || getInputComponentForSchema(schema, { layout, size, compact });
    }, [schema, layout, size]);
    const [showMessage, setShowMessage] = useState(false);
    const onChange = useCallback((value) => {
      agent.setValue(value);
      setShowMessage(false);
    }, [agent, setShowMessage]);
    const onUpdate = useCallback((value) => {
      agent.setValue(value);
      agent.update();
      window.requestAnimationFrame(() => {
        setShowMessage(true);
      });
    }, [agent, setShowMessage]);
    const [lastChanged, setLastChanged] = useState(Date.now());
    useEffect(() => {
      const cb = (e) => {
        setLastChanged(Date.now());
      };
      agent.on("change", cb);
      return () => agent.off("change", cb);
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-invalid": !agent.isValid, "is-compact": compact }, `is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`), "data-json-key": agent.key }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, agent.getMessage() && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.message(showMessage ? "is-show" : "is-hidden") }, agent.getMessage()), /* @__PURE__ */ wp.element.createElement(
      InputComponent,
      {
        agent,
        size,
        compact,
        level,
        onChange,
        onUpdate,
        lastChanged
      }
    ), description && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.description() }, description)));
  };

  // ../components/JsonEditor/component/inputComponents/ObjectInput.jsx
  var ObjectInput = (props) => {
    const { className = "cp-jsoneditor-input-objectinput", compact = false, popoverSize = "large", level = 0, agent, lastChanged } = props;
    const { useState, useMemo, useCallback, useEffect, useContext } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const layout = schema.layout || props.layout || "block";
    const size = schema.size || props.size || "medium";
    const InputComponent = useMemo(() => {
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
                return /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item(), key: name }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item.title() }, schema3.title || schema3.key), /* @__PURE__ */ wp.element.createElement("div", { className: classes.block.item.body() }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
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
          const [open, setOpen] = useState(false);
          const onClose = useCallback(() => setOpen(false), [setOpen]);
          const getLabel = useMemo(() => {
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

  // ../components/JsonEditor/component/JsonEditor.jsx
  var DataContext = wp.element.createContext({});
  var JsonEditor = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const {
      className = "cp-jsoneditor-editor",
      title = "JsonEditor",
      schema,
      debug = false,
      onChange,
      autoSave = false,
      children: getAdditionalInputComponent
    } = props;
    const classes = bem(className);
    const [hasChange, setHasChange] = useState(false);
    const json = useMemo(() => {
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
    const save = useCallback(() => {
      onChange(typeof props.json === "object" ? json : JSON.stringify(json));
      setHasChange(false);
    }, [json, setHasChange, onChange]);
    useEffect(() => {
      if (hasChange && autoSave) {
        const timer = setTimeout(save, 1e3);
        return () => clearTimeout(timer);
      }
    }, [hasChange]);
    const data = useMemo(() => {
      return { getAdditionalInputComponent };
    }, [getAdditionalInputComponent]);
    const rootAgent = useMemo(() => {
      const rootAgent2 = Catpow.schema(schema, { debug }).createAgent(json);
      rootAgent2.on("change", (e) => {
        setHasChange(true);
      });
      return rootAgent2;
    }, []);
    return /* @__PURE__ */ wp.element.createElement(DataContext.Provider, { value: data }, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.header() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.header.title() }, title), /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.header.controls() }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes._body.header.controls.save({ "is-active": hasChange }),
        onClick: () => save()
      },
      "Save"
    ))), /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.contents() }, /* @__PURE__ */ wp.element.createElement(ObjectInput, { agent: rootAgent })))));
  };
  JsonEditor.Input = Input;

  // ../components/JsonEditor/component/index.jsx
  window.Catpow.JsonEditor = JsonEditor;
  JsonEditor.DataContext = DataContext;
})();
