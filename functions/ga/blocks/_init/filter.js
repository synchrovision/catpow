wp.hooks.addFilter('catpow.EventInputs', 'catpow/editor', function (EventInputs, _ref) {
  var item = _ref.item,
      save = _ref.save;
  EventInputs.push(wp.element.createElement(CP.GaEventInput, {
    value: item['event'],
    onChange: function onChange(event) {
      save({
        event: event
      });
    }
  }));
  return EventInputs;
});
