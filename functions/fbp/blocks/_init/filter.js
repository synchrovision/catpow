wp.hooks.addFilter('catpow.EventInputs', 'catpow/editor', function (EventInputs, _ref) {
  var item = _ref.item,
      save = _ref.save;
  EventInputs.push(wp.element.createElement(CP.EventInputCards, {
    title: 'FacebookPixel Event',
    value: item['fbpEvent'],
    onChange: function onChange(fbpEvent) {
      save({
        fbpEvent: fbpEvent
      });
    },
    processer: window.Catpow.fbp
  }));
  return EventInputs;
});
