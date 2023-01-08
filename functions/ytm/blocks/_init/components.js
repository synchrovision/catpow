(() => {
  // ../functions/ytm/blocks/_init/components.jsx
  CP.YssEventInput = (props) => {
    const { onChange } = props;
    const { useState, useReducer, useCallback, useEffect } = wp.element;
    const { Card, CardHeader, CardBody, Flex, FlexItem, FlexBlock, Icon } = wp.components;
    const { parseEventValue, createEventValue } = window.Catpow.yss;
    const eventParams = [
      { type: "text", label: "\u30A4\u30D9\u30F3\u30C8", name: "event" },
      { type: "text", label: "\u30E9\u30D9\u30EB", name: "label" },
      { type: "number", label: "\u5024", name: "value" }
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
      return /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(CardHeader, null, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(FlexBlock, null, "Yahoo SS conversion"), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(
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
      }))));
    }, []);
    return /* @__PURE__ */ React.createElement(BaseControl, null, state.events.length > 0 ? state.events.map((event, index) => /* @__PURE__ */ React.createElement(EventInputCard, { event, index })) : /* @__PURE__ */ React.createElement(EventInputCard, { event: {}, index: 0 }));
  };
})();
