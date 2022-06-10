registerBlockType('catpow/breadcrumb', {
  title: '🐾 Breadcrumb',
  description: __('パンくずリストを表示します。', 'catpow'),
  icon: 'welcome-widgets-menus',
  category: 'catpow-parts',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className,
        clientId = _ref.clientId;
    var content_path = attributes.content_path,
        query = attributes.query,
        config = attributes.config,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode;
    return wp.element.createElement(Fragment, null, wp.element.createElement(ServerSideRender, {
      block: "catpow/breadcrumb",
      attributes: attributes
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return null;
  }
});
