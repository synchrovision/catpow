(() => {
  // ../components/StepSelect/component.jsx
  Catpow.StepSelect = (props) => {
    const { defaultLabel = "\u2500", onChange, multiple = true, placeholder = "Search" } = props;
    const { useState, useReducer, useCallback, useMemo, useRef, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem("StepSelect");
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const cache = useRef({});
    const { rootItem, valueItemMap } = useMemo(() => {
      const rootItem2 = {};
      const valueItemMap2 = {};
      const cb = (options, parent) => {
        const items = [];
        if (Array.isArray(options)) {
          options.forEach((value) => {
            const item = { label: value, value, parent };
            valueItemMap2[value] = item;
            items.push(item);
          });
        } else {
          Object.keys(options).forEach((label) => {
            const item = { label, parent };
            if (typeof options[label] === "object") {
              item.options = cb(options[label], item);
            } else {
              item.value = options[label];
              valueItemMap2[options[label]] = item;
            }
            items.push(item);
          });
        }
        return items;
      };
      rootItem2.options = cb(props.options, rootItem2);
      return { rootItem: rootItem2, valueItemMap: valueItemMap2 };
    }, [props.options]);
    const init = useCallback((state2) => {
      state2.selectedItems = props.value ? props.value.map((value) => valueItemMap[value]) : [];
      state2.activeItems = [rootItem];
      return state2;
    }, []);
    const toggleItemReducer = useCallback((state2, itemToToggle) => {
      const { selectedItems, activeItems } = state2;
      const newState = { ...state2 };
      if (activeItems.includes(itemToToggle)) {
        newState.activeItems = activeItems.slice(0, activeItems.indexOf(itemToToggle));
      } else {
        newState.activeItems = [];
        let currentItem = itemToToggle;
        while (currentItem) {
          if (currentItem.options != null) {
            newState.activeItems.unshift(currentItem);
          }
          currentItem = currentItem.parent;
        }
      }
      if (activeItems.some((activeItem) => activeItem.options && activeItem.options.includes(itemToToggle))) {
        if (itemToToggle.hasOwnProperty("value")) {
          if (multiple) {
            if (selectedItems.includes(itemToToggle)) {
              newState.selectedItems = selectedItems.filter((item) => item !== itemToToggle);
            } else {
              newState.selectedItems = [...selectedItems, itemToToggle];
            }
          } else {
            newState.selectedItems = selectedItems.includes(itemToToggle) ? [] : [itemToToggle];
          }
        }
      }
      return newState;
    }, []);
    const [state, toggleItem] = useReducer(toggleItemReducer, {}, init);
    useEffect(() => {
      if (multiple) {
        onChange(state.selectedItems.map((item) => item.value));
      } else {
        onChange(state.selectedItems.length ? state.selectedItems[0].value : null);
      }
    }, [state.selectedItems]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.selected(), onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.selected.items() }, state.selectedItems && state.selectedItems.length ? state.selectedItems.map((item) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item(), onClick: () => toggleItem(item), key: item.value }, item.label, /* @__PURE__ */ wp.element.createElement("span", { className: classes.selected.items.item.button() }))) : /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item() }, defaultLabel))), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open, onClose: () => open && setOpen(false) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.selected(), onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.selected.items() }, state.selectedItems && state.selectedItems.length ? state.selectedItems.map((item) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.selected.items.item(), onClick: () => toggleItem(item), key: item.value }, item.label, /* @__PURE__ */ wp.element.createElement("span", { className: classes.selected.items.item.button() }))) : false)), /* @__PURE__ */ wp.element.createElement("div", { className: classes.selections() }, state.activeItems.map((activeItem, index) => /* @__PURE__ */ wp.element.createElement("div", { className: classes.selections.options(), key: index }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.selections.options.items() }, activeItem.options.map((item, index2) => /* @__PURE__ */ wp.element.createElement(
      "li",
      {
        className: classes.selections.options.items.item({
          "is-selected": state.selectedItems.includes(item),
          "is-active": state.activeItems.includes(item)
        }),
        onClick: () => toggleItem(item),
        key: item.label
      },
      item.label
    ))), /* @__PURE__ */ wp.element.createElement("div", { className: classes.selections.options.arrow(index < state.activeItems.length - 1 ? "is-shown" : "is-hidden") }))))));
  };
})();
