(() => {
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

  // ../blocks/jsonld/editor_script.jsx
  var { __ } = wp.i18n;
  var { useState, useCallback, useMemo, useEffect, useContext, useRef } = wp.element;
  CP.JsonLdBlockContext = wp.element.createContext({});
  var getMainType = (conf) => conf.extends && (Array.isArray(conf.extends) ? conf.extends[0] : conf.extends) || conf.name;
  var consoleError = (message) => console.error("JsonLD Block : " + message);
  var convertDefaultValue = (value, conf) => {
    switch (conf.input) {
      case "datetime": {
        return Catpow.util.getDateTimeValue(Catpow.util.getRelativeDateTimeObject(value));
      }
      default: {
        return value;
      }
    }
  };
  var extractDefaultData = (conf, type = null) => {
    if (conf.type === "object") {
      const itemConf = conf.isDynamicType ? conf.confs[type || Object.keys(conf.confs)[0]] : conf;
      if (!itemConf.items) {
        return conf.multiple ? [{}] : {};
      }
      const data = itemConf.hasOwnProperty("default") ? itemConf.default : itemConf.items.reduce((p, c) => {
        p[c.name] = extractDefaultData(c);
        return p;
      }, {});
      if (type) {
        data["@type"] = type;
      } else if (itemConf["@type"]) {
        data["@type"] = itemConf["@type"];
      }
      const cloneData = JSON.parse(JSON.stringify(data));
      return conf.multiple ? [data] : data;
    }
    if (conf.hasOwnProperty("default")) {
      const value = convertDefaultValue(conf.default, conf);
      return conf.multiple ? [value] : value;
    }
    return conf.multiple ? [""] : "";
  };
  var fillUndefinedData = (data, conf) => {
    const itemConf = conf.isDynamicType ? conf.confs[(conf.multiple ? data[0]["@type"] : data["@type"]) || Object.keys(conf.confs)[0]] : conf;
    itemConf.items.forEach((item) => {
      if (item.type === "object") {
        if (item.multiple) {
          if (!data.hasOwnProperty(item.name) || !Array.isArray(data[item.name])) {
            data[item.name] = [{}];
          }
          data[item.name].forEach((dataItem) => fillUndefinedData(dataItem, item));
        } else {
          if (!data.hasOwnProperty(item.name)) {
            data[item.name] = {};
          }
          fillUndefinedData(data[item.name], item);
        }
      } else {
        if (!data.hasOwnProperty(item.name)) {
          data[item.name] = item.multiple ? [""] : "";
        }
      }
    });
    return data;
  };
  var filterEmptyData = (data, conf) => {
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = data[key].filter((item, index) => {
          if (typeof item === "object") {
            data[key][index] = filterEmptyData(data[key][index]);
            return Object.keys(data[key][index]).length > (data[key][index].hasOwnProperty("@type") ? 1 : 0);
          }
          return item !== "";
        });
        if (data[key].length === 0) {
          delete data[key];
        }
      } else if (typeof data[key] === "object") {
        data[key] = filterEmptyData(data[key]);
        if (Object.keys(data[key]).length === (data[key].hasOwnProperty("@type") ? 1 : 0)) {
          delete data[key];
        }
      } else if (data[key] === "") {
        delete data[key];
      }
    });
    return data;
  };
  var fillConf = (conf, { formals }) => {
    if (!conf.type) {
      if (!conf.input) {
        conf.input = conf.items || conf["@type"] ? "object" : conf.options ? "select" : "text";
      }
      switch (conf.input) {
        case "object":
          conf.type = "object";
          break;
        case "range":
          conf.type = "number";
          break;
        default:
          conf.type = "string";
      }
    }
    if (!conf.input) {
      if (conf.options) {
        conf.input = "select";
      } else if (conf.items) {
        conf.input = "object";
      } else {
        conf.inuput = "text";
      }
    }
    if (conf.input === "checkbox") {
      conf.bulkInput = true;
    }
    if (conf.items) {
      conf.items.forEach((item) => fillConf(item, { formals }));
    }
    if (conf["@type"]) {
      if (Array.isArray(conf["@type"])) {
        const name = conf.name;
        conf.isDynamicType = true;
        conf.confs = conf["@type"].reduce((p, c) => Object.assign(p, { [c]: fillConf({ ...formals[c], name }, { formals }) }), {});
      } else {
        if (formals[conf["@type"]]) {
          Object.keys(formals[conf["@type"]]).forEach((key) => {
            if (!conf.hasOwnProperty(key)) {
              conf[key] = formals[conf["@type"]][key];
            }
          });
        } else {
          consoleError(`@type ${conf["@type"]} not found in formal schema`);
        }
      }
    }
    checkConf(conf);
    return conf;
  };
  var checkConf = (conf) => {
    const errors = [];
    if (!conf.name) {
      errors.push("require name property");
    }
    if (!conf.type) {
      errors.push("require type property");
    }
    if (conf.type === "object") {
      if (conf.isDynamicType) {
        if (!conf.confs) {
          errors.push("require confs property for dinaymic type item");
        }
      } else {
        if (!conf.items) {
          errors.push("require items property for input type object");
        }
      }
    }
    if (["select", "checkbox", "radio"].includes(conf.input) && !conf.options) {
      errors.push("require options property for input type ".conf.input);
    }
    if (errors.length) {
      errors.forEach(consoleError);
      console.error(conf);
    }
  };
  var fillType = (type, { types }) => {
    const parentType = types[Array.isArray(type.extends) ? type.extends[type.extends.length - 1] : type.extends];
    if (parentType == null) {
      consoleError(`@type ${parentType} not found in type schema`);
      return;
    }
    const { items, ...otherProps } = parentType;
    Object.keys(otherProps).forEach((prop) => {
      if (!type.hasOwnProperty(prop)) {
        type[prop] = otherProps[prop];
      }
    });
    if (type.items != null) {
      type.items.push(...items);
    } else {
      type.items = items;
    }
  };
  wp.blocks.registerBlockType("catpow/jsonld", {
    title: "\u{1F43E} JsonLD",
    description: "\u5404\u7A2E\u306E\u69CB\u9020\u5316\u30C7\u30FC\u30BF\u3092\u8A18\u8FF0\u3002",
    icon: "analytics",
    category: "catpow",
    edit({ attributes, className, setAttributes }) {
      const { types, formals, data = {}, EditMode } = attributes;
      const save = useCallback(() => {
        setAttributes({ data: { ...data } });
      }, [data, setAttributes]);
      const SelectType = useCallback(
        (props) => {
          const { className: className2, types: types2, formals: formals2, data: data2, setAttributes: setAttributes2 } = props;
          const cache = useRef({});
          const currentType = types2[data2["@type"]];
          const [mainType, setMainType] = useState(getMainType(currentType));
          const updateType = useCallback(
            (type) => {
              cache.current[data2["@type"]] = JSON.parse(JSON.stringify(data2));
              if (cache.current[type]) {
                setAttributes2({ data: cache.current[type] });
              } else {
                const data3 = extractDefaultData(types2[type], type);
                fillUndefinedData(data3, types2[type]);
                setAttributes2({ data: data3 });
              }
            },
            [data2, cache, setAttributes2, fillUndefinedData, extractDefaultData]
          );
          return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: className2 }, /* @__PURE__ */ wp.element.createElement("select", { className: "_select is-select-maintype", value: mainType, onChange: (e) => setMainType(e.target.value) }, Object.keys(types2).filter((type) => types2[type].extends == null).map((type) => /* @__PURE__ */ wp.element.createElement("option", { value: type, key: type }, types2[type].label || types2[type].name))), /* @__PURE__ */ wp.element.createElement("span", { className: "_arrow" }), /* @__PURE__ */ wp.element.createElement("select", { className: "_select is-select-subtype", value: data2["@type"], onChange: (e) => updateType(e.target.value) }, /* @__PURE__ */ wp.element.createElement("option", { value: "" }, "\u2500"), Object.keys(types2).filter((type) => getMainType(types2[type]) === mainType).map((type) => /* @__PURE__ */ wp.element.createElement("option", { value: type, key: type }, types2[type].label || types2[type].name)))));
        },
        [convertDefaultValue, extractDefaultData]
      );
      const typeLabel = useMemo(() => types && data["@type"] && (types[data["@type"]]?.label || data["@type"]), [types, data["@type"]]);
      useEffect(() => {
        wp.apiFetch({ path: "/cp/v1/blocks/config/jsonld/types" }).then((res) => {
          const { types: types2, formals: formals2 } = res;
          Object.keys(formals2).forEach((key) => {
            formals2[key].items.forEach((item) => fillConf(item, res));
          });
          Object.keys(types2).forEach((key) => {
            types2[key].type = "object";
            if (Array.isArray(types2[key].items)) {
              types2[key].items.forEach((item) => fillConf(item, res));
            }
          });
          Object.values(types2).filter((type) => type.extends != null).sort((a, b) => (Array.isArray(a.extends) ? a.extends.length : 0) - (Array.isArray(b.extends) ? b.extends.length : 0)).forEach((type) => fillType(type, res));
          const data2 = JSON.parse(attributes.json);
          if (data2["@type"] != null && types2[data2["@type"]] != null) {
            setAttributes({ data: fillUndefinedData(data2, types2[data2["@type"]]), types: types2, formals: formals2 });
          }
        });
      }, []);
      useEffect(() => {
        const timer = setTimeout(() => {
          if (data) {
            const filteredCloneData = filterEmptyData(JSON.parse(JSON.stringify(data)));
            setAttributes({ json: JSON.stringify(filteredCloneData) });
            console.log("JsonLD Block : update json");
          }
        }, 1e3);
        return () => clearTimeout(timer);
      }, [data]);
      if (!types || !data) {
        return false;
      }
      return /* @__PURE__ */ wp.element.createElement(CP.JsonLdBlockContext.Provider, { value: { types, save } }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-jsonld" }, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { attr: attributes, set: setAttributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "-editor" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_type" }, /* @__PURE__ */ wp.element.createElement(SelectType, { className: "_selecttype", types, formals, data, setAttributes }), types[data["@type"]] && /* @__PURE__ */ wp.element.createElement("a", { className: "_help", href: types[data["@type"]].url, target: "_blank", rel: "noopener noreferer" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_items" }, types[data["@type"]].items.map((conf) => /* @__PURE__ */ wp.element.createElement(InputItem, { className: "_item", conf, data, name: conf.name, level: 0, key: conf.name })))) : /* @__PURE__ */ wp.element.createElement("div", { className: "_label" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_icon" }, /* @__PURE__ */ wp.element.createElement(CP.ConfigIcon, { icon: "json" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, "JSON-LD : ", typeLabel)))));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("script", { type: "application/ld+json" }, attributes.json);
    }
  });
  var Input = (props) => {
    const { SelectBox, RadioButtons, CheckBoxes, Toggle, SelectMedia, InputDateTime } = Catpow;
    const { className, data, name, index, conf, level } = props;
    let value = index !== void 0 ? data[name][index] : data[name];
    const { save } = useContext(CP.JsonLdBlockContext);
    const updateValue = useCallback(
      (value2) => {
        if (index !== void 0) {
          if (!Array.isArray(data[name])) {
            data[name] = [];
          }
          data[name][index] = value2;
        } else if (value2 == null) {
          delete data[name];
        } else {
          data[name] = value2;
        }
        save();
      },
      [data, name, index, save]
    );
    switch (conf.input) {
      case "object":
        if (typeof data[name] !== "object") {
          data[name] = {};
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: className + "-object" }, /* @__PURE__ */ wp.element.createElement("div", { className: "subitems_" }, conf.items && conf.items.map((item) => {
          return /* @__PURE__ */ wp.element.createElement(InputItem, { className: "_item", data: index !== void 0 ? data[name][index] : data[name], name: item.name, conf: item, level: level + 1, key: item.name });
        }))));
      case "url":
      case "email":
      case "tel":
      case "text":
      case "date":
        return /* @__PURE__ */ wp.element.createElement(
          "input",
          {
            className: className + "-" + conf.input,
            type: conf.input,
            value,
            onChange: (e) => {
              updateValue(e.target.value);
            }
          }
        );
      case "textarea":
        return /* @__PURE__ */ wp.element.createElement(
          "textarea",
          {
            className: className + "-textarea",
            onChange: (e) => {
              updateValue(e.target.value);
            },
            value
          }
        );
      case "number":
      case "range": {
        return /* @__PURE__ */ wp.element.createElement(
          "input",
          {
            className: className + "-number",
            type: "number",
            min: conf.min || 0,
            max: conf.max || 100,
            value,
            onChange: (e) => {
              updateValue(e.target.value);
            }
          }
        );
      }
      case "select":
        return /* @__PURE__ */ wp.element.createElement(SelectBox, { options: conf.options, value, onChange: updateValue });
      case "radio":
        return /* @__PURE__ */ wp.element.createElement(RadioButtons, { options: conf.options, value, onChange: updateValue });
      case "checkbox":
        return /* @__PURE__ */ wp.element.createElement(CheckBoxes, { options: conf.options, value, onChange: updateValue });
      case "toggle":
        return /* @__PURE__ */ wp.element.createElement(Toggle, { options: conf.options, value, onChange: updateValue });
      case "image":
        return /* @__PURE__ */ wp.element.createElement(SelectMedia, { src: value, onChange: (media) => updateValue(media.url) });
      case "datetime":
        return /* @__PURE__ */ wp.element.createElement(InputDateTime, { value, onChange: updateValue, format: conf.format, placeholder: conf.placeholder });
      default:
        console.error("undefined input type " + conf.input);
        return /* @__PURE__ */ wp.element.createElement("div", null, conf.input);
    }
  };
  var InputItem = (props) => {
    const { className, data, name, conf, level } = props;
    let value = data[name];
    const { save } = useContext(CP.JsonLdBlockContext);
    const cache = useRef({});
    const itemConf = useMemo(() => {
      if (conf && conf.isDynamicType) {
        if (!value["@type"] || !conf.confs[value["@type"]]) {
          value["@type"] = Object.keys(conf.confs)[0];
        }
        return conf.confs[value["@type"]];
      }
      return conf;
    }, [conf.isDynamicType && value && value["@type"]]);
    const onChangeType = useCallback(
      (e) => {
        const type = e.target.value;
        if (Array.isArray(data[name])) {
          const prevType = data[name][0]["@type"];
          cache.current[prevType] = JSON.parse(JSON.stringify(data[name]));
          data[name] = cache.current[type] || [extractDefaultData(conf, type)];
          data[name].forEach((item) => item["@type"] = type);
        } else {
          const prevType = data[name]["@type"];
          cache.current[prevType] = JSON.parse(JSON.stringify(data[name]));
          data[name] = cache.current[type] || extractDefaultData(conf, type);
          data[name]["@type"] = type;
        }
        save();
      },
      [save, data]
    );
    const cloneItem = useCallback(
      (index) => {
        if (!Array.isArray(data[name])) {
          return;
        }
        data[name].splice(index, 0, JSON.parse(JSON.stringify(data[name][index])));
        save();
      },
      [data, name, save]
    );
    const removeItem = useCallback(
      (index) => {
        if (!Array.isArray(data[name])) {
          return;
        }
        data[name].splice(index, 1);
        save();
      },
      [data, name, save]
    );
    return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default(className, "is-level-" + level) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_label" }, conf.label || conf.name, conf.url && /* @__PURE__ */ wp.element.createElement("a", { className: "_label", href: conf.url, target: "_blank", rel: "noopener noreferer" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_inputs" }, conf.isDynamicType && /* @__PURE__ */ wp.element.createElement("select", { className: "_selecttype", value: value["@type"], onChange: onChangeType }, conf["@type"].map((type) => /* @__PURE__ */ wp.element.createElement("option", { value: type, key: type }, conf.confs[type].label || type))), itemConf.multiple ? /* @__PURE__ */ wp.element.createElement("div", { className: "_group" }, data[name].map((item, index) => /* @__PURE__ */ wp.element.createElement("div", { className: "_item", key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(Input, { className: "input_", data, name, index, conf: itemConf, level })), /* @__PURE__ */ wp.element.createElement("div", { className: "_control" }, data[name].length > 1 && /* @__PURE__ */ wp.element.createElement("div", { className: "_decrease", onClick: () => removeItem(index) }), /* @__PURE__ */ wp.element.createElement("div", { className: "_increase", onClick: () => cloneItem(index) }))))) : /* @__PURE__ */ wp.element.createElement(Input, { className: "input_", data, name, conf: itemConf, level }))));
  };
})();
