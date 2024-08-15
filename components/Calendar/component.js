(() => {
  // ../components/Calendar/component.jsx
  Catpow.Calendar = (props) => {
    const { Fragment } = wp.element;
    const { useState, useCallback, useEffect, useReducer, useMemo } = wp.element;
    const {
      className = "Calendar",
      size = "medium",
      min = null,
      max = null,
      exclude = null,
      onSelect = null,
      onChange = null,
      showYear = true,
      showMonth = true,
      showControl = false
    } = props;
    const { bem, getDateValue, getDateTimeObject } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { type, values } = useMemo(() => {
      const val = props.values ?? props.value ?? props.default;
      if (!val) {
        return { type: "string", values: {} };
      }
      if (Array.isArray(val)) {
        const values2 = {};
        val.forEach((v) => values2[getDateValue(props.value)] = true);
        return { type: "array", values: values2 };
      }
      if (typeof val === "string") {
        return {
          type: "string",
          values: { [getDateValue(props.value)]: true }
        };
      }
      return { type: "object", values: props.values };
    }, [props.value, props.values]);
    const minTime = min ? getDateTimeObject(min).getTime() : Number.MIN_VALUE;
    const maxTime = max ? getDateTimeObject(max).getTime() : Number.MAX_VALUE;
    const thead = useMemo(() => /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, "\u65E5,\u6708,\u706B,\u6C34,\u6728,\u91D1,\u571F".split(",").map((d) => /* @__PURE__ */ wp.element.createElement("td", { key: d }, d)))), [props]);
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const init = useCallback((state2) => {
      const d = getDateTimeObject(Object.keys(values)[0] ?? "now");
      return { year: d.getFullYear(), month: d.getMonth() + 1 };
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "goto":
          return {
            year: action.year,
            month: action.month
          };
        case "reset":
          return {
            year: props.year,
            month: props.month
          };
        case "prevYear":
          return {
            year: state2.year - 1,
            month: state2.month
          };
        case "nextYear":
          return {
            year: state2.year + 1,
            month: state2.month
          };
        case "prev10Year":
          return {
            year: state2.year - 10,
            month: state2.month
          };
        case "next10Year":
          return {
            year: state2.year + 10,
            month: state2.month
          };
        case "prevMonth":
          var d = new Date(
            state2.year,
            state2.month - 2
          );
          return {
            year: d.getFullYear(),
            month: d.getMonth() + 1
          };
        case "nextMonth":
          var d = new Date(
            state2.year,
            state2.month
          );
          return {
            year: d.getFullYear(),
            month: d.getMonth() + 1
          };
      }
    }, []);
    const [state, dispatch] = useReducer(reducer, { year: props.year, month: props.month }, init);
    const weeks = useMemo(() => {
      var r, c, d, dateObject, weeks2 = [], days;
      const msOfDay = 864e5;
      const firstDay = new Date(state.year, state.month - 1, 1);
      const lastDay = new Date(state.year, state.month, 0);
      var d = -firstDay.getDay() + 1;
      for (var r = 0; r < 6; r++) {
        days = [];
        for (c = 1; c <= 7; c++) {
          dateObject = new Date(state.year, state.month - 1, d);
          days.push({
            dateObject,
            value: getDateValue(dateObject),
            inMonth: dateObject.getMonth() == state.month - 1
          });
          d++;
        }
        weeks2.push({ days });
      }
      return weeks2;
    }, [state.year, state.month]);
    const onSelectDayHandle = useCallback((day) => {
      if (onSelect) {
        onSelect(day.value, { day, value });
      }
      if (onChange) {
        let val;
        if (type === "string") {
          for (let key in values) {
            delete values[key];
          }
          values[day.value] = true;
          onChange(day.value);
        } else if (type === "array") {
          if (values[day.value]) {
            delete values[day.value];
          } else {
            values[day.value] = true;
          }
          onChange(Object.keys(values));
        } else {
          console.error("onChange is supported only for string or array type value");
        }
      }
    }, [type, values, onSelect, onChange]);
    useEffect(() => {
      if (!props.year || props.month) {
        return;
      }
      dispatch({
        type: "goto",
        year: props.year,
        month: props.month
      });
    }, [props.year, props.month]);
    console.log({ values, state });
    const Cell = useCallback((props2) => {
      const { classes: classes2, day, values: values2, index } = props2;
      const t = day.dateObject.getTime();
      const value2 = values2[day.value] ? values2[day.value] : null;
      const isValid = t >= minTime && t <= maxTime && !(exclude && exclude(day.dateObject));
      return /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: classes2(
            weekDays[index],
            day.inMonth ? "is-in-month" : "is-out-month",
            value2 && (value2.classes != null && value2.classes || "is-active"),
            { disabled: !isValid }
          ),
          onClick: () => {
            if (isValid) {
              onSelectDayHandle(day);
            }
          }
        },
        /* @__PURE__ */ wp.element.createElement("span", { className: classes2.date() }, day.dateObject.getDate()),
        value2 && value2.content && /* @__PURE__ */ wp.element.createElement("div", { className: classes2.date.content() }, value2.content)
      );
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes("is-size-" + size) }, /* @__PURE__ */ wp.element.createElement("table", { className: classes.table() }, /* @__PURE__ */ wp.element.createElement("caption", { className: classes.table.caption() }, showYear && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.caption.year() }, showControl && /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.year.button("is-prev10"),
        onClick: () => dispatch({ type: "prev10Year" })
      }
    ), /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.year.button("is-prev"),
        onClick: () => dispatch({ type: "prevYear" })
      }
    )), /* @__PURE__ */ wp.element.createElement("span", { className: "current" }, state.year), showControl && /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.year.button("is-next"),
        onClick: () => dispatch({ type: "nextYear" })
      }
    ), /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.year.button("is-next10"),
        onClick: () => dispatch({ type: "next10Year" })
      }
    ))), showMonth && /* @__PURE__ */ wp.element.createElement("div", { className: classes.table.caption.month() }, showControl && /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.month.button("is-prev"),
        onClick: () => dispatch({ type: "prevMonth" })
      }
    ), /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.month.current()
      },
      state.month
    ), showControl && /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes.table.caption.month.button("is-next"),
        onClick: () => dispatch({ type: "nextMonth" })
      }
    ))), thead, /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.table.tbody() }, weeks.map((week, index) => {
      return /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.tbody.week(), key: index }, week.days.map((day, index2) => /* @__PURE__ */ wp.element.createElement(Cell, { classes: classes.table.tbody.week.day, day, index: index2, values, key: index2 })));
    }))));
  };
})();
