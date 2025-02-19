(() => {
  // ../ui/CalendarSelect/input.jsx
  Catpow.UI.CalendarSelect = (props) => {
    const { useState, useCallback, useMemo } = wp.element;
    const [value, setValue] = useState(props.value);
    const d = Catpow.util.getDateObject(value, /* @__PURE__ */ new Date());
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth() + 1);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cpui-calendarselect" }, /* @__PURE__ */ wp.element.createElement(
      Catpow.Calendar,
      {
        className: "medium",
        year,
        month,
        min: props.min,
        max: props.max,
        values: value ? { [value]: true } : {},
        onSelect: setValue
      }
    ), value && /* @__PURE__ */ wp.element.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value
      }
    ));
  };
})();
