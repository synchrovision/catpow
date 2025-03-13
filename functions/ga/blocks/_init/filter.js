(() => {
  // ../functions/ga/blocks/_init/filter.jsx
  wp.hooks.addFilter("catpow.EventInputs", "catpow/editor", function(EventInputs, { item, save }) {
    console.log(CP);
    EventInputs.push(
      /* @__PURE__ */ wp.element.createElement(
        CP.EventInputCards,
        {
          title: "Google Analitics Event",
          value: item["event"],
          onChange: (event) => {
            save({ event });
          },
          processer: window.Catpow.ga
        }
      )
    );
    return EventInputs;
  });
})();
