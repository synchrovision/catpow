registerBlockType('catpow/postlink', {
  title: '🐾 PostLink',
  description: '前の投稿・次の投稿へのリンクを表示します。',
  icon: 'editor-code',
  category: 'catpow',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var func = attributes.func,
        param = attributes.param;
    return [wp.element.createElement(ServerSideRender, {
      block: "catpow/postlink",
      attributes: babelHelpers.extends({}, attributes, {
        preview: true
      })
    }), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "Path"
    }))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return 'null';
  }
});
