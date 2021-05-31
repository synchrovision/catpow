registerBlockType('catpow/cond', {
  title: '🐾 Cond',
  description: '日時やログインユーザーによってコンテンツの表示が切り替わるコンテナです。',
  icon: 'editor-code',
  category: 'catpow-functional',
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/group'],
      transform: function transform(attributes, innerBlocks) {
        return createBlock('catpow/cond', {}, innerBlocks);
      }
    }]
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    return [wp.element.createElement("div", {
      className: "embedded_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, "\u8868\u793A\u6761\u4EF6\uFF1A", attributes.schedule, attributes.is_user_logged_in != 0 && 'ログイン' + (attributes.is_user_logged_in == 1 ? 'している' : 'していない'), attributes.input_value, attributes.content_value), wp.element.createElement(InnerBlocks, null)), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "\u8868\u793A\u6761\u4EF6",
      icon: "admin-generic"
    }, wp.element.createElement(TextareaControl, {
      label: "\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB",
      onChange: function onChange(schedule) {
        return setAttributes({
          schedule: schedule
        });
      },
      value: attributes.schedule
    }), wp.element.createElement(SelectControl, {
      label: "\u30ED\u30B0\u30A4\u30F3",
      onChange: function onChange(is_user_logged_in) {
        setAttributes({
          is_user_logged_in: is_user_logged_in
        });
      },
      value: attributes.is_user_logged_in,
      options: [{
        label: 'していない',
        value: '-1'
      }, {
        label: 'どちらでも',
        value: '0'
      }, {
        label: 'している',
        value: '1'
      }]
    }), attributes.is_user_logged_in == '1' && wp.element.createElement("div", {
      className: "sub"
    }, wp.element.createElement(TextareaControl, {
      label: "\u6A29\u9650",
      onChange: function onChange(current_user_can) {
        return setAttributes({
          current_user_can: current_user_can
        });
      },
      value: attributes.current_user_can
    }), wp.element.createElement(TextareaControl, {
      label: "\u30E6\u30FC\u30B6\u30FC\u60C5\u5831",
      onChange: function onChange(user_value) {
        return setAttributes({
          user_value: user_value
        });
      },
      value: attributes.user_value
    })), wp.element.createElement(TextareaControl, {
      label: "\u30D5\u30A9\u30FC\u30E0\u5165\u529B\u5024",
      onChange: function onChange(input_value) {
        return setAttributes({
          input_value: input_value
        });
      },
      value: attributes.input_value
    }), wp.element.createElement(TextareaControl, {
      label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u60C5\u5831",
      onChange: function onChange(content_value) {
        return setAttributes({
          content_value: content_value
        });
      },
      value: attributes.content_value
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return wp.element.createElement(InnerBlocks.Content, null);
  }
});
