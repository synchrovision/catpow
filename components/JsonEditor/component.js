(() => {
  // ../components/JsonEditor/component/inputComponents/None.jsx
  var None = (props) => {
    return false;
  };

  // ../components/JsonEditor/component/inputComponents/Toggle.jsx
  var { __, sprintf } = wp.i18n;
  var Toggle = (props) => {
    const { className = "JsonEditor-Input-Toggle", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.Toggle, { value: agent.getValue(), onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Select.jsx
  var { __: __2, sprintf: sprintf2 } = wp.i18n;
  var Select = (props) => {
    const { className = "JsonEditor-Input-Select", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectBox, { value: agent.getValue(), options: agent.getMergedSchemaForInput().enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Checkbox.jsx
  var { __: __3, sprintf: sprintf3 } = wp.i18n;
  var Checkbox = (props) => {
    const { className = "JsonEditor-Input-Checkbox", agent, onChange, onUpdate } = props;
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
  var { __: __4, sprintf: sprintf4 } = wp.i18n;
  var Radio = (props) => {
    const { className = "JsonEditor-Input-Radio", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.RadioButtons, { value: agent.getValue(), options: schema.enum, onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/SearchSelect.jsx
  var { __: __5, sprintf: sprintf5 } = wp.i18n;
  var SearchSelect = (props) => {
    const { className = "JsonEditor-Input-SearchSelect", agent, onChange, onUpdate } = props;
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

  // ../components/JsonEditor/component/inputComponents/Text.jsx
  var { __: __6, sprintf: sprintf6 } = wp.i18n;
  var Text = (props) => {
    const { className = "JsonEditor-Input-Text", agent, onChange, onUpdate } = props;
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
        className: classes.input(),
        onChange: onChangeHandle,
        onBlur: onUpdateHandle,
        autoComplete
      }
    ));
  };

  // ../components/JsonEditor/component/inputComponents/Textarea.jsx
  var { __: __7, sprintf: sprintf7 } = wp.i18n;
  var Textarea = (props) => {
    const { className = "JsonEditor-Input-Textarea", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((e) => {
      onChange(e.currentTarget.value);
    }, [onChange]);
    const onUpdateHandle = useCallback((e) => {
      onUpdate(e.currentTarget.value);
    }, [onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      "textarea",
      {
        className: classes.textarea(),
        onChange: onChangeHandle,
        onBlur: onUpdateHandle,
        value: agent.getValue() || ""
      }
    ));
  };

  // modules/util/bem.jsx
  var bem = (className) => {
    const children = {};
    return new Proxy(function() {
      if (arguments.length > 0) {
        const classes = [];
        let i;
        for (i = 0; i < arguments.length; i++) {
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
          return className + " " + classes.join(" ");
        }
      }
      return className;
    }, {
      get: (target, prop) => {
        if (void 0 === children[prop]) {
          children[prop] = bem(className.split(" ")[0] + (prop[0] === "_" ? "_" : "-") + prop);
        }
        return children[prop];
      }
    });
  };

  // ../components/JsonEditor/component/inputComponents/DateTime.jsx
  var { __: __8, sprintf: sprintf8 } = wp.i18n;
  var DateTime = (props) => {
    const { className = "JsonEditor-Input-DateTime", agent, onChange, onUpdate } = props;
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
  var { __: __9, sprintf: sprintf9 } = wp.i18n;
  var Date2 = (props) => {
    const { className = "JsonEditor-Input-Date", agent, onChange, onUpdate } = props;
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
  var { __: __10, sprintf: sprintf10 } = wp.i18n;
  var Time = (props) => {
    const { className = "JsonEditor-Input-Time", agent, onChange, onUpdate } = props;
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
  var { __: __11, sprintf: sprintf11 } = wp.i18n;
  var Duration = (props) => {
    const { className = "JsonEditor-Input-Duration", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.InputDuration, { value: agent.getValue() || "", onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/Range.jsx
  var { __: __12, sprintf: sprintf12 } = wp.i18n;
  var Range = (props) => {
    const { className = "JsonEditor-Input-Range", agent, onChange, onUpdate } = props;
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
  var { __: __13, sprintf: sprintf13 } = wp.i18n;
  var Number2 = (props) => {
    const { className = "JsonEditor-Input-Number", agent, onChange, onUpdate } = props;
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
    const { className = "JsonEditor-Input-ArrayInput", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const { minContains: min, maxContains: max, items, prefixItems } = agent.getMergedSchemaForInput();
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      Catpow.ArrayInput,
      {
        onAddItem,
        onCopyItem,
        onMoveItem,
        onRemoveItem
      },
      agent.items.map((item) => /* @__PURE__ */ wp.element.createElement(Input, { agent: item, key: getItemId(item) }))
    ));
  };

  // ../components/JsonEditor/component/inputComponents/SelectIcon.jsx
  var { __: __14, sprintf: sprintf14 } = wp.i18n;
  var SelectIcon = (props) => {
    const { className = "JsonEditor-Input-SelectIcon", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectPreparedImage, { name: "icon", value: agent.getValue(), onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/SelectImage.jsx
  var { __: __15, sprintf: sprintf15 } = wp.i18n;
  var SelectImage = (props) => {
    const { className = "JsonEditor-Input-SelectImage", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const onChangeHandle = useCallback((value) => {
      onUpdate(value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMedia, { src: agent.getValue() && agent.getValue().url, onChange: onChangeHandle }));
  };

  // ../components/JsonEditor/component/inputComponents/SelectMenuItem.jsx
  var { __: __16, sprintf: sprintf16 } = wp.i18n;
  var SelectMenuItem = (props) => {
    const { className = "JsonEditor-Input-SelectMenuItem", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMenuItem, { onChange: onUpdate }));
  };

  // ../components/JsonEditor/component/inputComponents/SelectMenuItems.jsx
  var { __: __17, sprintf: sprintf17 } = wp.i18n;
  var SelectMenuItems = (props) => {
    const { className = "JsonEditor-Input-SelectMenuItems", agent, onChange } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() });
  };

  // ../components/JsonEditor/component/functions.jsx
  var getInputComponentForSchema = (schema) => {
    if (schema.hasOwnProperty("@type")) {
      switch (schema["@type"]) {
        case "Icon":
          return SelectIcon;
        case "Image":
          return SelectImage;
        case "MenuItem":
          return SelectMenuItem;
        case "MenuItems":
          return SelectMenuItems;
      }
    }
    if (schema.type === "null") {
      return None;
    }
    if (schema.enum) {
      if (schema.enum.length < 8) {
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
      if (schema.hasOwnProperty("pattern") || schema.hasOwnProperty("maxLength") && schema.maxLength < 32) {
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
  var { __: __18, sprintf: sprintf18 } = wp.i18n;
  var Input = (props) => {
    const { className = "JsonEditor-Input", agent } = props;
    const { useState, useMemo, useCallback, useEffect, useContext } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const schema = agent.getMergedSchemaForInput();
    const { getAdditionalInputComponent } = useContext(DataContext);
    const { title, description } = schema;
    const InputComponent = useMemo(() => {
      return getAdditionalInputComponent && getAdditionalInputComponent(schema) || getInputComponentForSchema(schema);
    }, [schema]);
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-invalid": !agent.isValid }), "data-json-key": agent.key }, title && /* @__PURE__ */ wp.element.createElement("div", { className: classes._title() }, title), /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, agent.getMessage() && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.message(showMessage ? "is-show" : "is-hidden") }, agent.getMessage()), /* @__PURE__ */ wp.element.createElement(InputComponent, { agent, onChange, onUpdate, lastChanged }), description && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.description() }, description)));
  };

  // ../components/JsonEditor/component/inputComponents/ObjectInput.jsx
  var ObjectInput = (props) => {
    const { className = "JsonEditor-Input-ObjectInput", agent, lastChanged } = props;
    const { useState, useMemo, useCallback, useEffect, useContext } = wp.element;
    const { bem: bem2 } = Catpow.util;
    const classes = useMemo(() => bem2(className), []);
    const activeProperties = agent.getMergedSchemaForInput().properties;
    if (activeProperties == null) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes.message() });
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, Object.keys(activeProperties).map((name) => agent.properties[name] && /* @__PURE__ */ wp.element.createElement(Input, { agent: agent.properties[name], key: name })));
  };

  // ../components/JsonEditor/component/JsonEditor.jsx
  var DataContext = wp.element.createContext({});
  var JsonEditor = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const {
      className = "JsonEditor-Editor",
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
      return JSON.parse(props.json);
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

  // ../components/JsonEditor/component/index.jsx
  window.Catpow.JsonEditor = JsonEditor;
  window.Catpow.JsonEditor.DataContext = DataContext;
})();
