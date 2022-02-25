wp.hooks.addFilter('catpow.EventInputs', 'catpow/editor', function (EventInputs, _ref) {
  var item = _ref.item,
      save = _ref.save;
  EventInputs.push(wp.element.createElement(CP.EventInputCards, {
    title: 'Google Analitics Event',
    value: item['event'],
    onChange: function onChange(event) {
      save({
        event: event
      });
    },
    processer: window.Catpow.ga
  }));
  return EventInputs;
});
