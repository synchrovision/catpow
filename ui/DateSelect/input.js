(() => {
  // ../ui/DateSelect/input.jsx
  Catpow.UI.DateSelect = (props) => {
    const { useState, useReducer, useMemo, useCallback, useEffect } = wp.element;
    const [open, setOpen] = useState(false);
    const now = useMemo(() => Catpow.util.getDateObject("now"));
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "init": {
          state2.min = Catpow.util.getDateObject(props.min || "-80 year");
          state2.max = Catpow.util.getDateObject(props.max || "+1 year");
          state2.minTime = state2.min.getTime();
          state2.maxTime = state2.max.getTime();
          state2.minYear = state2.min.getFullYear();
          state2.maxYear = state2.max.getFullYear();
          action.value = props.value;
        }
        case "update": {
          const d = action.value ? Catpow.util.getDateObject(action.value) : new Date(
            action.year || state2.year || now.getFullYear(),
            (action.month || state2.month || now.getMonth() + 1) - 1,
            action.date || state2.date || now.getDate()
          );
          if (isNaN(d.getTime())) {
            state2.value = state2.year = state2.month = state2.date = void 0;
            return { ...state2 };
          }
          const t = d.getTime();
          if (t < state2.minTime) {
            d.setTime(state2.minTime);
          }
          if (t > state2.maxTime) {
            d.setTime(state2.maxTime);
          }
          state2.value = Catpow.util.getDateValue(d);
          state2.year = d.getFullYear();
          state2.month = d.getMonth() + 1;
          state2.date = d.getDate();
          if (d.getFullYear() === state2.minYear) {
            state2.minMonth = state2.min.getMonth() + 1;
            if (d.getMonth() === state2.minMonth - 1) {
              state2.minDate = state2.min.getDate();
            } else {
              state2.minDate = 1;
            }
          } else {
            state2.minMonth = 1;
            state2.minDate = 1;
          }
          if (d.getFullYear() === state2.maxYear) {
            state2.maxMonth = state2.max.getMonth() + 1;
            if (d.getMonth() === state2.maxMonth - 1) {
              state2.maxDate = state2.max.getDate();
            } else {
              state2.maxDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
            }
          } else {
            state2.maxMonth = 12;
            state2.maxDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
          }
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(() => dispatch({ type: "init" }), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "DateSelect" }, /* @__PURE__ */ wp.element.createElement("div", { className: "inputs" }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectNumber, { label: "---", min: state.minYear, max: state.maxYear, exclude: state.excludeYear, value: state.year, onChange: (year) => {
      dispatch({ type: "update", year });
    } }), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u5E74"), /* @__PURE__ */ wp.element.createElement(Catpow.SelectNumber, { label: "---", min: state.minMonth, max: state.maxMonth, exclude: state.excludeMonth, value: state.month, onChange: (month) => {
      dispatch({ type: "update", month });
    } }), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u6708"), /* @__PURE__ */ wp.element.createElement(Catpow.SelectNumber, { label: "---", min: state.minDate, max: state.maxDate, exclude: state.excludeDate, value: state.date, onChange: (date) => {
      dispatch({ type: "update", date });
    } }), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u65E5"), /* @__PURE__ */ wp.element.createElement("span", { className: "btn calendar", onClick: () => setOpen(true) })), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open, onClose: () => setOpen(false), closeButton: true }, /* @__PURE__ */ wp.element.createElement(
      Catpow.Calendar,
      {
        className: "medium",
        year: state.year || now.getFullYear(),
        month: state.month || now.getMonth() + 1,
        showControl: true,
        min: props.min,
        max: props.max,
        values: state.value ? { [state.value]: true } : {},
        onSelect: (value) => {
          setOpen(false);
          dispatch({ type: "update", value });
        }
      }
    )), state.value && /* @__PURE__ */ wp.element.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value: state.value
      }
    ));
  };
})();
