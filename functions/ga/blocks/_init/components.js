(() => {
  // ../functions/ga/blocks/_init/components.jsx
  CP.GaEventInput = (props) => {
    const { onChange } = props;
    const { useState, useReducer, useCallback, useEffect } = wp.element;
    const { Card, CardHeader, CardBody, Flex, FlexItem, FlexBlock, Icon } = wp.components;
    const { parseEventValue, createEventValue } = window.Catpow.ga;
    const eventParams = [
      { type: "text", label: "\u30A4\u30D9\u30F3\u30C8", name: "event", isExtended: false },
      { type: "text", label: "\u30A2\u30AF\u30B7\u30E7\u30F3", name: "action", isExtended: false },
      { type: "text", label: "\u30AB\u30C6\u30B4\u30EA", name: "category", isExtended: false },
      { type: "text", label: "\u30E9\u30D9\u30EB\u540D", name: "label_name", isExtended: true },
      { type: "text", label: "\u30E9\u30D9\u30EB", name: "label", isExtended: false },
      { type: "number", label: "\u5024", name: "value", isExtended: true },
      { type: "text", label: "\u9001\u4FE1\u5148", name: "send_to", isExtended: true }
    ];
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "UPDATE": {
          state2.events[action.index] = { ...state2.events[action.index], ...action.event };
          const value = createEventValue(state2.events);
          onChange(value);
          return { ...state2, value };
        }
        case "CLONE": {
          state2.events.splice(action.index, 0, { ...state2.events[action.index] });
          const value = createEventValue(state2.events);
          onChange(value);
          return { ...state2, value };
        }
        case "REMOVE": {
          state2.events.splice(action.index, 1);
          const value = createEventValue(state2.events);
          onChange(value);
          return { ...state2, value };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {
      value: props.value,
      events: parseEventValue(props.value)
    });
    const EventInputCard = useCallback((props2) => {
      const { event, index } = props2;
      const [useExtended, setUseExtended] = useState(eventParams.some((prm) => prm.isExtended && !!event[prm.name]));
      return /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexBlock, null, "Google Analitics Event"), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(
        Icon,
        {
          icon: "insert",
          onClick: () => {
            dispatch({ type: "CLONE", index });
          }
        }
      ), state.events.length > 1 && /* @__PURE__ */ React.createElement(
        Icon,
        {
          icon: "remove",
          onClick: () => {
            dispatch({ type: "REMOVE", index });
          }
        }
      )))), /* @__PURE__ */ React.createElement(CardBody, null, /* @__PURE__ */ React.createElement("table", null, eventParams.map((param) => {
        if (!useExtended && param.isExtended) {
          return false;
        }
        return /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { width: "80" }, param.label), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
          TextControl,
          {
            value: event[param.name],
            type: param.type,
            onChange: (val) => {
              dispatch({ type: "UPDATE", event: { [param.name]: val }, index });
            }
          }
        )));
      }), /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
        CheckboxControl,
        {
          label: "\u62E1\u5F35\u8A2D\u5B9A",
          onChange: (flag) => {
            setUseExtended(flag);
          },
          checked: useExtended
        }
      ))))));
    }, []);
    return /* @__PURE__ */ React.createElement(BaseControl, null, state.events.length > 0 ? state.events.map((event, index) => /* @__PURE__ */ React.createElement(EventInputCard, { event, index })) : /* @__PURE__ */ React.createElement(EventInputCard, { event: {}, index: 0 }));
  };
})();
