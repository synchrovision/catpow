(() => {
  // ../ui/CalendarSelect/input.jsx
  Catpow.UI.CalendarSelect = (props) => {
    const { useState, useCallback, useMemo } = wp.element;
    const [value, setValue] = useState(props.value);
    const d = Catpow.util.getDateObject(value, new Date());
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth() + 1);
    return /* @__PURE__ */ React.createElement("div", { className: "CalendarSelect" }, /* @__PURE__ */ React.createElement(
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
    ), value && /* @__PURE__ */ React.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value
      }
    ));
  };
})();
