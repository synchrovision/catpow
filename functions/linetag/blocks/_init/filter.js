(() => {
  // ../functions/linetag/blocks/_init/filter.jsx
  wp.hooks.addFilter(
    "catpow.EventInputs",
    "catpow/editor",
    function(EventInputs, { item, save }) {
      EventInputs.push(
        /* @__PURE__ */ wp.element.createElement(
          CP.EventInputCards,
          {
            title: "LINE Tag Event",
            value: item["linetagEvent"],
            onChange: (linetagEvent) => {
              save({ linetagEvent });
            },
            processer: window.Catpow.linetag
          }
        )
      );
      return EventInputs;
    }
  );
})();
