(() => {
  // ../ui/PostSchedule/input.jsx
  Catpow.UI.PostSchedule = (props) => {
    const { Fragment, useCallback, useMemo, useState, useReducer } = wp.element;
    const { RadioButtons, CheckBoxes, CheckBox, SelectNumber } = Catpow;
    const { statuses = ["publish", "private", "draft", "trash"] } = props;
    const { __ } = wp.i18n;
    const [usePostSchedule, setUsePostSchedule] = useState(!!props.value);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "SAVE": {
          if (!state2.value.status) {
            state2.value.status = "trash";
          }
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {
      value: props.value || { status: "trash", time: Math.floor(Date.now() / (24 * 3600 * 1e3) + 3) * 24 * 3600 }
    });
    const save = useCallback((key, value, result) => {
      dispatch({ type: "SAVE" });
    }, [dispatch]);
    return /* @__PURE__ */ React.createElement("div", { className: "PostSchedule" }, /* @__PURE__ */ React.createElement("div", { className: "PostSchedule__contents" }, /* @__PURE__ */ React.createElement(Catpow.CheckBox, { selected: usePostSchedule, onChange: () => setUsePostSchedule(!usePostSchedule) }), usePostSchedule && /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Catpow.InputDateTime, { value: state.value.time * 1e3, onChange: (time) => {
      state.value.time = Math.floor(time / 1e3);
      save();
    } }), /* @__PURE__ */ React.createElement(Catpow.SelectBox, { options: statuses, value: state.value.status || "trash", onChange: (status) => {
      state.value.status = status;
      save();
    } }), state.value && /* @__PURE__ */ React.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value: state.value
      }
    ))));
  };
})();
