registerBlockType('catpow/zeus', {
  title: '🐾 Zeus',
  icon: 'cart',
  category: 'catpow',
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var items = attributes.items,
        classes = attributes.classes;
    var primaryClass = 'wp-block-catpow-zeus';
    return [wp.element.createElement("div", {
      id: "ZeusButtonContainer"
    }, wp.element.createElement("div", {
      id: "ZeusButton",
      className: "wp-block-catpow-zeus"
    }, wp.element.createElement(RichText, {
      onChange: function onChange(text) {
        setAttributes({
          text: text
        });
      },
      value: attributes.text
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    return wp.element.createElement("div", {
      id: "ZeusButtonContainer"
    }, wp.element.createElement("div", {
      id: "ZeusButton",
      className: "wp-block-catpow-zeus"
    }, wp.element.createElement(RichText.Content, {
      value: attributes.text
    })));
  }
});
