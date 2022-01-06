wp.hooks.addFilter('catpow.EventInputs', 'catpow/editor', function (EventInputs, _ref) {
  var item = _ref.item,
      save = _ref.save;
  EventInputs.push(wp.element.createElement(CP.YssEventInput, {
    value: item['yssEvent'],
    onChange: function onChange(yssEvent) {
      save({
        yssEvent: yssEvent
      });
    }
  }));
  return EventInputs;
});
