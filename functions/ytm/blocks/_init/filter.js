(() => {
  // ../functions/ytm/blocks/_init/filter.jsx
  wp.hooks.addFilter(
    "catpow.EventInputs",
    "catpow/editor",
    function(EventInputs, { item, save }) {
      EventInputs.push(
        /* @__PURE__ */ wp.element.createElement(
          CP.EventInputCards,
          {
            title: "Yahoo SS conversion",
            value: item["yssEvent"],
            onChange: (yssEvent) => {
              save({ yssEvent });
            },
            processer: window.Catpow.yss
          }
        )
      );
      return EventInputs;
    }
  );
})();
