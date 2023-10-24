(() => {
  // ../blocks/countdown/component.jsx
  Catpow.CountDown = function(props) {
    const { className = "wp-block-catpow-countdown-body" } = props;
    const { useMemo, useEffect, useCallback, useReducer } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const init = useCallback(() => {
      const state2 = { isDone: true, days: "0000", hours: "00", minutes: "00", seconds: "00" };
      let { target = null, value = null } = props;
      if (!value && target) {
        const d0 = /* @__PURE__ */ new Date();
        const d1 = Catpow.util.getDateTimeObject(props.target);
        value = Math.ceil((d1.getTime() - d0.getTime()) / 1e3);
      }
      if (value && value > 0) {
        state2.isDone = false;
        const divs = { seconds: 60, minutes: 60, hours: 24, days: 1e4 };
        for (let key in divs) {
          state2[key] = (value % divs[key]).toString().padStart(key === "days" ? 4 : 2, "0");
          value = Math.floor(value / divs[key]);
          if (value === 0) {
            break;
          }
        }
      }
      return state2;
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "COUNT_DOWN": {
          if (state2.isDone) {
            return state2;
          }
          const newState = { ...state2 };
          const divs = { seconds: "59", minutes: "59", hours: "23", days: "9999" };
          for (let key in divs) {
            let val = parseInt(state2[key]);
            val--;
            if (val < 0) {
              newState[key] = divs[key];
              if (key === "days") {
                return { isDone: true, days: "0000", hours: "00", minutes: "00", seconds: "00" };
              }
            } else {
              newState[key] = val.toString().padStart(divs[key].length, "0");
              break;
            }
          }
          return newState;
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {}, init);
    useEffect(() => {
      const cb = () => {
        dispatch({ type: "COUNT_DOWN" });
      };
      const timer = setInterval(cb, 1e3);
      return () => clearInterval(timer);
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.group("is-days") }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.days[0] === "0" }) }, state.days[0]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.days.slice(0, 2) === "00" }) }, state.days[1]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.days.slice(0, 3) === "000" }) }, state.days[2]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number() }, state.days[3])), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group("is-hours") }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.hours[0] === "0" }) }, state.hours[0]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number() }, state.hours[1])), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group("is-minutes") }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.minutes[0] === "0" }) }, state.minutes[0]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number() }, state.minutes[1])), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group("is-seconds") }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number({ "is-leading-zero": state.seconds[0] === "0" }) }, state.seconds[0]), /* @__PURE__ */ wp.element.createElement("span", { className: classes.group.number() }, state.seconds[1])));
  };
})();
