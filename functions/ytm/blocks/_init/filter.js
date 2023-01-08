(() => {
  // ../functions/ytm/blocks/_init/filter.jsx
  wp.hooks.addFilter(
    "catpow.EventInputs",
    "catpow/editor",
    function(EventInputs, { item, save }) {
      EventInputs.push(
        /* @__PURE__ */ React.createElement(
          CP.YssEventInput,
          {
            value: item["yssEvent"],
            onChange: (yssEvent) => {
              save({ yssEvent });
            }
          }
        )
      );
      return EventInputs;
    }
  );
})();
