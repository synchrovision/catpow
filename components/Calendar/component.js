(() => {
  // components/Calendar/component.jsx
  Catpow.Calendar = (props) => {
    const { Fragment } = wp.element;
    const { useState, useCallback, useEffect, useReducer, useMemo } = wp.element;
    const { className = "medium", min = null, max = null, values, onSelect, showYear = true, showMonth = true, showControl = false } = props;
    const minTime = min ? Catpow.util.getDateObject(min).getTime() : Number.MIN_VALUE;
    const maxTime = max ? Catpow.util.getDateObject(max).getTime() : Number.MAX_VALUE;
    const thead = useMemo(() => /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, "\u65E5,\u6708,\u706B,\u6C34,\u6728,\u91D1,\u571F".split(",").map((d) => /* @__PURE__ */ wp.element.createElement("td", null, d)))), [props]);
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const [state, dispatch] = useReducer((state2, action) => {
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
    }, {
      year: props.year,
      month: props.month
    });
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
            value: Catpow.util.getDateValue(dateObject),
            inMonth: dateObject.getMonth() == state.month - 1
          });
          d++;
        }
        weeks2.push({ days });
      }
      return weeks2;
    }, [state.year, state.month]);
    useEffect(() => {
      dispatch({
        type: "goto",
        year: props.year,
        month: props.month
      });
    }, [props.year, props.month]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "Calendar " + className }, /* @__PURE__ */ wp.element.createElement("table", null, /* @__PURE__ */ wp.element.createElement("caption", null, showYear && /* @__PURE__ */ wp.element.createElement("div", { className: "year" }, showControl && /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("span", { className: "btn prev10", onClick: () => dispatch({ type: "prev10Year" }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "btn prev", onClick: () => dispatch({ type: "prevYear" }) })), /* @__PURE__ */ wp.element.createElement("span", { className: "current" }, state.year), showControl && /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("span", { className: "btn next", onClick: () => dispatch({ type: "nextYear" }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "btn next10", onClick: () => dispatch({ type: "next10Year" }) }))), showMonth && /* @__PURE__ */ wp.element.createElement("div", { className: "month" }, showControl && /* @__PURE__ */ wp.element.createElement("span", { className: "btn prev", onClick: () => dispatch({ type: "prevMonth" }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "current" }, state.month), showControl && /* @__PURE__ */ wp.element.createElement("span", { className: "btn next", onClick: () => dispatch({ type: "nextMonth" }) }))), thead, /* @__PURE__ */ wp.element.createElement("tbody", null, weeks.map((week) => {
      return /* @__PURE__ */ wp.element.createElement("tr", { className: "week" }, week.days.map((day, i) => {
        const t = day.dateObject.getTime();
        const value = values[day.value] ? values[day.value] : null;
        const inRange = t >= minTime && t <= maxTime;
        let classes = "day";
        classes += " " + weekDays[i];
        classes += day.inMonth ? " inMonth" : " outMonth";
        classes += inRange ? "" : " disabled";
        if (value) {
          if (typeof value == "object") {
            if ("classes" in value) {
              classes += value.classes;
            }
          } else {
            if (value) {
              classes += " active";
            }
          }
        }
        return /* @__PURE__ */ wp.element.createElement(
          "td",
          {
            className: classes,
            onClick: () => {
              if (inRange) {
                onSelect(day.value, { day, value });
              }
            }
          },
          /* @__PURE__ */ wp.element.createElement("span", { className: "date" }, day.dateObject.getDate()),
          value && value.content && /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, value.content)
        );
      }));
    }))));
  };
})();
