(() => {
  // ../ui/GoogleMap/input.jsx
  Catpow.UI.GoogleMap = (props) => {
    const { useState, useReducer, useMemo, useCallback } = wp.element;
    const { __ } = wp.i18n;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem("cpui-googlemap"), []);
    const init = useCallback((state2) => {
      if (props.value && typeof props.value === "string" && props.value.startsWith("https://www.google.com/maps")) {
        state2.value = props.value;
      } else {
        state2.value = "https://www.google.com/maps?output=embed&z=16&t=m&hl=ja&q=Osaka City";
      }
      const url = new URL(state2.value);
      state2.useQuery = url.searchParams.has("q");
      if (state2.useQuery) {
        state2.queryUrl = url;
        state2.embedUrl = new URL("https://www.google.com/maps?output=embed&z=16&t=m&hl=ja&q=Osaka City");
      } else {
        state2.queryUrl = new URL("https://www.google.com/maps?output=embed");
        state2.embedUrl = url;
      }
      return state2;
    }, []);
    const reducer = useCallback((state2, action) => {
      const newState = { ...state2 };
      if (action.value) {
        newState.embedUrl = new URL(action.value);
        newState.value = action.value;
        if (newState.embedUrl.searchParams.has("q")) {
          newState.queryUrl = new URL(action.value);
        }
      }
      if (action.hasOwnProperty("useQuery")) {
        newState.useQuery = action.useQuery;
      }
      if (newState.useQuery) {
        for (const key of ["q", "t", "z", "hl", "ll"]) {
          if (action.hasOwnProperty(key)) {
            newState.queryUrl.searchParams.set(key, action[key]);
          }
        }
        newState.value = newState.queryUrl.toString();
      }
      return newState;
    }, []);
    const [state, update] = useReducer(reducer, {}, init);
    const onChangeValue = useCallback((e) => {
      let value = e.currentTarget.value;
      const matches = value.match(/src="(.+?)"/);
      if (matches) {
        value = matches[1];
      }
      update({ value });
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.preview() }, /* @__PURE__ */ wp.element.createElement("iframe", { className: classes.preview.map(), src: state.value, width: "320", height: "320" })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.inputs() }, /* @__PURE__ */ wp.element.createElement(
      Catpow.TabPanel,
      {
        value: state.useQuery,
        options: { "\u691C\u7D22": true, "\u57CB\u3081\u8FBC\u307FURL": false },
        onChange: (useQuery) => update({ useQuery }),
        size: "medium"
      },
      state.useQuery ? /* @__PURE__ */ wp.element.createElement("dl", { className: classes.inputs._dl() }, /* @__PURE__ */ wp.element.createElement("dt", { className: classes.inputs._dl.dt() }, __("\u691C\u7D22\u30EF\u30FC\u30C9")), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.inputs._dl.dd() }, /* @__PURE__ */ wp.element.createElement(
        "textarea",
        {
          className: classes.inputs.textarea(),
          type: "text",
          value: state.queryUrl.searchParams.get("q"),
          onChange: (e) => update({ q: e.currentTarget.value }),
          rows: "3"
        }
      )), /* @__PURE__ */ wp.element.createElement("dt", { className: classes.inputs._dl.dt() }, __("\u8868\u793A\u5F62\u5F0F")), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.inputs._dl.dd() }, /* @__PURE__ */ wp.element.createElement(
        Catpow.RadioButtons,
        {
          value: state.queryUrl.searchParams.get("t"),
          options: { "\u5730\u56F3": "m", "\u822A\u7A7A\u5199\u771F": "k", "\u5730\u56F3 + \u822A\u7A7A\u5199\u771F": "h", "\u5730\u5F62\u56F3": "p", "Google Earth": "e" },
          onChange: (t) => update({ t }),
          size: "small"
        }
      )), /* @__PURE__ */ wp.element.createElement("dt", { className: classes.inputs._dl.dt() }, __("\u7E2E\u5C3A")), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.inputs._dl.dd() }, /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          className: classes.inputs.range(),
          type: "range",
          min: "0",
          max: "23",
          value: state.queryUrl.searchParams.get("z"),
          onChange: (e) => update({ z: e.currentTarget.value })
        }
      ), /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          className: classes.inputs.number(),
          type: "number",
          min: "0",
          max: "23",
          value: state.queryUrl.searchParams.get("z"),
          onChange: (e) => update({ z: e.currentTarget.value })
        }
      )), /* @__PURE__ */ wp.element.createElement("dt", { className: classes.inputs._dl.dt() }, __("\u8A00\u8A9E")), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.inputs._dl.dd() }, /* @__PURE__ */ wp.element.createElement(
        Catpow.RadioButtons,
        {
          value: state.queryUrl.searchParams.get("hl"),
          options: ["ja", "us", "zh-CN", "zh-TW"],
          onChange: (hl) => update({ hl }),
          size: "small"
        }
      ))) : /* @__PURE__ */ wp.element.createElement("dl", { className: classes.inputs._dl() }, /* @__PURE__ */ wp.element.createElement("dt", { className: classes.inputs._dl.dt() }, __("\u57CB\u3081\u8FBC\u307FURL")), /* @__PURE__ */ wp.element.createElement("dd", { className: classes.inputs._dl.dd() }, /* @__PURE__ */ wp.element.createElement(
        "textarea",
        {
          className: classes.inputs.textarea(),
          onChange: onChangeValue,
          value: state.value,
          rows: "8"
        }
      )))
    )), state.value && /* @__PURE__ */ wp.element.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value: state.value
      }
    ));
  };
})();
