(() => {
  // ../functions/fbp/blocks/_init/filter.jsx
  wp.hooks.addFilter("catpow.EventInputs", "catpow/editor", function(EventInputs, { item, save }) {
    EventInputs.push(
      /* @__PURE__ */ wp.element.createElement(
        CP.EventInputCards,
        {
          title: "FacebookPixel Event",
          value: item["fbpEvent"],
          onChange: (fbpEvent) => {
            save({ fbpEvent });
          },
          processer: window.Catpow.fbp
        }
      )
    );
    return EventInputs;
  });
})();
