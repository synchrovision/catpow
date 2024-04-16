(() => {
  // ../components/SearchSelect/component.jsx
  Catpow.SearchSelect = (props) => {
    const { defaultLabel, onChange, col = 5, multiple = true, placeholder = "Search" } = props;
    const { useState, useReducer, useCallback, useMemo, useRef, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem("SearchSelect");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const cache = useRef({});
    const { labelValueMap, valueLabelMap } = useMemo(() => {
      const labelValueMap2 = {};
      const valueLabelMap2 = {};
      const cb = (options) => {
        if (Array.isArray(options)) {
          options.forEach((val) => {
            if (typeof val === "object") {
              cb(val);
            } else {
              labelValueMap2[val] = val;
              valueLabelMap2[val] = val;
            }
          });
        } else {
          Object.keys(options).forEach((key) => {
            if (typeof options[key] === "object") {
              cb(options[key]);
            } else {
              labelValueMap2[key] = options[key];
              valueLabelMap2[options[key]] = key;
            }
          });
        }
      };
      cb(props.options);
      return { labelValueMap: labelValueMap2, valueLabelMap: valueLabelMap2 };
    }, [props.options]);
    const toggleLabelReducer = useCallback((selectedLabels2, labelToToggle) => {
      if (!selectedLabels2) {
        return [labelToToggle];
      }
      if (multiple) {
        if (selectedLabels2.includes(labelToToggle)) {
          return selectedLabels2.filter((val) => val !== labelToToggle);
        }
        return [...selectedLabels2, labelToToggle];
      } else {
        if (selectedLabels2.includes(labelToToggle)) {
          return [];
        }
        return [labelToToggle];
      }
    }, []);
    const [selectedLabels, toggleLabel] = useReducer(
      toggleLabelReducer,
      useMemo(() => props.value ? props.value.map((value) => valueLabelMap[value]) : [], [])
    );
    useEffect(() => {
      if (multiple) {
        onChange(selectedLabels.map((label) => labelValueMap[label]));
      } else {
        onChange(selectedLabels.length ? labelValueMap[selectedLabels[0]] : null);
      }
    }, [selectedLabels]);
    const getLabelsForSearch = useCallback((search2) => {
      if (cache.current[search2]) {
        return cache.current[search2];
      }
      const labels = search2.length > 2 ? getLabelsForSearch(search2.slice(0, -1)) : Object.keys(labelValueMap);
      return cache.current[search2] = search2 ? labels.filter((label) => label.indexOf(search2) >= 0) : labels;
    }, [cache, labelValueMap]);
    const currentLabels = useMemo(() => getLabelsForSearch(search), [getLabelsForSearch, search]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.selected(), onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.selected.items() }, selectedLabels && selectedLabels.length ? selectedLabels.map((label) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item(), key: label }, label)) : /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item() }, defaultLabel))), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open, onClose: () => open && setOpen(false) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.search() }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "text",
        className: classes.search.input(),
        value: search,
        placeholder,
        onChange: (e) => setSearch(e.currentTarget.value)
      }
    )), /* @__PURE__ */ wp.element.createElement("div", { className: classes.selected() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.selected.items() }, selectedLabels && selectedLabels.length > 0 && selectedLabels.map((label) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item(), key: label }, label, /* @__PURE__ */ wp.element.createElement("span", { className: classes.selected.items.item.button(), onClick: () => toggleLabel(label) }))))), /* @__PURE__ */ wp.element.createElement("div", { className: classes.selections() }, /* @__PURE__ */ wp.element.createElement(
      Catpow.SelectTable,
      {
        selections: currentLabels,
        value: selectedLabels,
        multiple,
        col,
        onChange: toggleLabel
      }
    ))));
  };
})();
