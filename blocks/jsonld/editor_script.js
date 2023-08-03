(() => {
  // ../blocks/jsonld/editor_script.jsx
  var { __ } = wp.i18n;
  CP.JsonLdBlockContext = wp.element.createContext({});
  wp.blocks.registerBlockType("catpow/jsonld", {
    title: "\u{1F43E} JsonLD",
    description: "\u5404\u7A2E\u306E\u69CB\u9020\u5316\u30C7\u30FC\u30BF\u3092\u8A18\u8FF0\u3002",
    icon: "analytics",
    category: "catpow",
    edit({ attributes, className, setAttributes }) {
      const { useState, useCallback, useMemo, useEffect, useContext, useRef } = wp.element;
      const { Icon } = wp.components;
      const { InspectorControls } = wp.blockEditor;
      const { types, formals, data = {}, EditMode } = attributes;
      const { SelectBox, RadioButtons, CheckBoxes, Toggle, InputDateTime } = Catpow;
      const classes = useMemo(() => Catpow.util.bem("wp-block-catpow-jsonld"), []);
      const save = useCallback(() => {
        setAttributes({ data: { ...data } });
      }, [data, setAttributes]);
      const consoleError = useCallback((message) => console.error("JsonLD Block : " + message), []);
      const convertDefaultValue = useCallback((value, conf) => {
        switch (conf.input) {
          case "datetime": {
            return Catpow.util.getDateTimeValue(
              Catpow.util.getRelativeDateTimeObject(value)
            );
          }
          default: {
            return value;
          }
        }
      }, []);
      const extractDefaultData = useCallback((conf, type = null) => {
        if (conf.type === "object") {
          const itemConf = conf.isDynamicType ? conf.confs[type || Object.keys(conf.confs)[0]] : conf;
          if (!itemConf.items) {
            return conf.multiple ? [{}] : {};
          }
          const data2 = itemConf.hasOwnProperty("default") ? itemConf.default : itemConf.items.reduce((p, c) => {
            p[c.name] = extractDefaultData(c);
            return p;
          }, {});
          if (type) {
            data2["@type"] = type;
          } else if (itemConf["@type"]) {
            data2["@type"] = itemConf["@type"];
          }
          const cloneData = JSON.parse(JSON.stringify(data2));
          console.log({ phase: "extractDefaultData", conf, data: data2, cloneData });
          return conf.multiple ? [data2] : data2;
        }
        if (conf.hasOwnProperty("default")) {
          const value = convertDefaultValue(conf.default, conf);
          return conf.multiple ? [value] : value;
        }
        return conf.multiple ? [""] : "";
      }, []);
      const fillUndefinedData = useCallback((data2, conf) => {
        const itemConf = conf.isDynamicType ? conf.confs[(conf.multiple ? data2[0]["@type"] : data2["@type"]) || Object.keys(conf.confs)[0]] : conf;
        itemConf.items.forEach((item) => {
          if (item.type === "object") {
            if (item.multiple) {
              if (!data2.hasOwnProperty(item.name) || !Array.isArray(data2[item.name])) {
                data2[item.name] = [{}];
              }
              data2[item.name].forEach((dataItem) => fillUndefinedData(dataItem, item));
            } else {
              if (!data2.hasOwnProperty(item.name)) {
                data2[item.name] = {};
              }
              fillUndefinedData(data2[item.name], item);
            }
          } else {
            if (!data2.hasOwnProperty(item.name)) {
              data2[item.name] = item.multiple ? [""] : "";
            }
          }
        });
        return data2;
      }, []);
      const filterEmptyData = useCallback((data2, conf) => {
        return data2;
        Object.keys(data2).forEach((key) => {
          if (Array.isArray(data2[key])) {
            data2[key] = data2[key].filter((item, index) => {
              if (typeof item === "object") {
                data2[key][index] = filterEmptyData(data2[key][index]);
                return Object.keys(data2[key][index]).length > (data2[key][index].hasOwnProperty("@type") ? 1 : 0);
              }
              return item !== "";
            });
            if (data2[key].length === 0) {
              delete data2[key];
            }
          } else if (typeof data2[key] === "object") {
            data2[key] = filterEmptyData(data2[key]);
            if (Object.keys(data2[key]).length === (data2[key].hasOwnProperty("@type") ? 1 : 0)) {
              delete data2[key];
            }
          } else if (data2[key] === "") {
            delete data2[key];
          }
        });
        return data2;
      }, []);
      const SelectType = useCallback((props) => {
        const { classes: classes2, types: types2, formals: formals2, data: data2, setAttributes: setAttributes2 } = props;
        const cache = useRef({});
        const updateType = useCallback((type) => {
          cache.current[data2["@type"]] = JSON.parse(JSON.stringify(data2));
          if (cache.current[type]) {
            setAttributes2({ data: cache.current[type] });
          } else {
            const data3 = extractDefaultData(types2[type], type);
            fillUndefinedData(data3, types2[type]);
            setAttributes2({ data: data3 });
          }
        }, [data2, cache, setAttributes2, fillUndefinedData, extractDefaultData]);
        return /* @__PURE__ */ wp.element.createElement("select", { className: classes2(), value: data2["@type"], onChange: (e) => updateType(e.target.value) }, Object.keys(types2).map((type) => /* @__PURE__ */ wp.element.createElement("option", { value: type, key: type }, types2[type].label || types2[type].name)));
      }, [convertDefaultValue, extractDefaultData]);
      const Input = useCallback((props) => {
        const { classes: classes2, itemClasses, data: data2, name, index, conf, level } = props;
        let value = index !== void 0 ? data2[name][index] : data2[name];
        const { save: save2 } = useContext(CP.JsonLdBlockContext);
        const updateValue = useCallback((value2) => {
          if (index !== void 0) {
            if (!Array.isArray(data2[name])) {
              data2[name] = [];
            }
            data2[name][index] = value2;
          } else {
            data2[name] = value2;
          }
          save2();
        }, [data2, name, index, save2]);
        switch (conf.input) {
          case "object":
            if (typeof data2[name] !== "object") {
              data2[name] = {};
            }
            return /* @__PURE__ */ wp.element.createElement("div", { className: classes2.object() }, conf.items && conf.items.map((item) => {
              return /* @__PURE__ */ wp.element.createElement(
                InputItem,
                {
                  classes: itemClasses,
                  data: index !== void 0 ? data2[name][index] : data2[name],
                  name: item.name,
                  conf: item,
                  level: level + 1,
                  key: item.name
                }
              );
            }));
          case "text":
            return /* @__PURE__ */ wp.element.createElement("input", { className: classes2.text(), type: "text", value, onChange: (e) => {
              updateValue(e.target.value);
            } });
          case "textarea":
            return /* @__PURE__ */ wp.element.createElement("textarea", { className: classes2.textarea(), onChange: (e) => {
              updateValue(e.target.value);
            } }, value);
          case "number":
          case "range": {
            return /* @__PURE__ */ wp.element.createElement(
              "input",
              {
                className: classes2.number(),
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
          case "datetime":
            return /* @__PURE__ */ wp.element.createElement(InputDateTime, { value, onChange: updateValue });
          default:
            console.error("undefined input type " + conf.input);
            return /* @__PURE__ */ wp.element.createElement("div", null, conf.input);
        }
      }, []);
      const InputItem = useCallback((props) => {
        const { classes: classes2, data: data2, name, conf, level } = props;
        let value = data2[name];
        const { save: save2 } = useContext(CP.JsonLdBlockContext);
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
        const onChangeType = useCallback((e) => {
          const type = e.target.value;
          if (Array.isArray(data2[name])) {
            const prevType = data2[name][0]["@type"];
            cache.current[prevType] = JSON.parse(JSON.stringify(data2[name]));
            data2[name] = cache.current[type] || [extractDefaultData(conf, type)];
            data2[name].forEach((item) => item["@type"] = type);
          } else {
            const prevType = data2[name]["@type"];
            cache.current[prevType] = JSON.parse(JSON.stringify(data2[name]));
            data2[name] = cache.current[type] || extractDefaultData(conf, type);
            data2[name]["@type"] = type;
          }
          save2();
        }, [save2, data2]);
        const cloneItem = useCallback((index) => {
          if (!Array.isArray(data2[name])) {
            return;
          }
          data2[name].splice(index, 0, JSON.parse(JSON.stringify(data2[name][index])));
          save2();
        }, [data2, name, save2]);
        const removeItem = useCallback((index) => {
          if (!Array.isArray(data2[name])) {
            return;
          }
          data2[name].splice(index, 1);
          save2();
        }, [data2, name, save2]);
        return /* @__PURE__ */ wp.element.createElement("div", { className: classes2("is-level-" + level) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.label() }, conf.label || conf.name, conf.url && /* @__PURE__ */ wp.element.createElement("a", { className: classes2.label.help(), href: conf.url, target: "_blank", rel: "noopener noreferer" })), /* @__PURE__ */ wp.element.createElement("div", { className: classes2.inputs() }, conf.isDynamicType && /* @__PURE__ */ wp.element.createElement("select", { className: classes2.selecttype(), value: value["@type"], onChange: onChangeType }, conf["@type"].map((type) => /* @__PURE__ */ wp.element.createElement("option", { value: type, key: type }, conf.confs[type].label || type))), itemConf.multiple ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.inputs.group() }, data2[name].map((item, index) => /* @__PURE__ */ wp.element.createElement("div", { className: classes2.inputs.group.item(), key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.inputs.group.item.body() }, /* @__PURE__ */ wp.element.createElement(
          Input,
          {
            classes: classes2.inputs.input,
            itemClasses: classes2,
            data: data2,
            name,
            index,
            conf: itemConf,
            level
          }
        )), /* @__PURE__ */ wp.element.createElement("div", { className: classes2.inputs.group.item.control() }, data2[name].length > 1 && /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: classes2.inputs.group.item.control.decrease(),
            onClick: () => removeItem(index)
          }
        ), /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: classes2.inputs.group.item.control.increase(),
            onClick: () => cloneItem(index)
          }
        ))))) : /* @__PURE__ */ wp.element.createElement(
          Input,
          {
            classes: classes2.inputs.input,
            itemClasses: classes2,
            data: data2,
            name,
            conf: itemConf,
            level
          }
        )));
      }, [Input]);
      const typeLabel = useMemo(() => types && data["@type"] && (types[data["@type"]]?.label || data["@type"]), [types, data["@type"]]);
      useEffect(() => {
        wp.apiFetch({ path: "/cp/v1/blocks/config/jsonld/types" }).then((res) => {
          const fillConf = (conf) => {
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
              conf.items.forEach(fillConf);
            }
            if (conf["@type"]) {
              if (Array.isArray(conf["@type"])) {
                const name = conf.name;
                conf.isDynamicType = true;
                conf.confs = conf["@type"].reduce((p, c) => Object.assign(p, { [c]: fillConf({ ...formals2[c], name }) }), {});
              } else {
                if (formals2[conf["@type"]]) {
                  Object.keys(formals2[conf["@type"]]).forEach((key) => {
                    if (!conf.hasOwnProperty(key)) {
                      conf[key] = formals2[conf["@type"]][key];
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
          const checkConf = (conf) => {
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
          const { types: types2, formals: formals2 } = res;
          Object.keys(formals2).forEach((key) => formals2[key].items.forEach(fillConf));
          Object.keys(types2).forEach((key) => {
            types2[key].type = "object";
            types2[key].items.forEach(fillConf);
          });
          const data2 = JSON.parse(attributes.json);
          setAttributes({ data: fillUndefinedData(data2, types2[data2["@type"]]), types: types2, formals: formals2 });
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
      return /* @__PURE__ */ wp.element.createElement(CP.JsonLdBlockContext.Provider, { value: { types, save } }, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { attr: attributes, set: setAttributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: classes.editor() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.editor.type() }, /* @__PURE__ */ wp.element.createElement(
        SelectType,
        {
          classes: classes.editor.type.select,
          types,
          formals,
          data,
          setAttributes
        }
      ), types[data["@type"]] && /* @__PURE__ */ wp.element.createElement("a", { className: classes.editor.type.help(), href: types[data["@type"]].url, target: "_blank", rel: "noopener noreferer" })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.editor.items() }, types[data["@type"]].items.map((conf) => /* @__PURE__ */ wp.element.createElement(
        InputItem,
        {
          classes: classes.editor.items.item,
          conf,
          data,
          name: conf.name,
          level: 0,
          key: conf.name
        }
      )))) : /* @__PURE__ */ wp.element.createElement("div", { className: classes.label() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.label.icon() }, /* @__PURE__ */ wp.element.createElement(CP.ConfigIcon, { icon: "json" })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.label.text() }, "JSON-LD : ", typeLabel))));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("script", { type: "application/ld+json" }, attributes.json);
    }
  });
})();
