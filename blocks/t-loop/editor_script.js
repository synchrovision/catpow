registerBlockType('catpow/t-loop', {
  title: '🐾 T-loop',
  description: 'クエリの投稿の情報を表示するためのコンテナです。',
  icon: 'editor-code',
  category: 'catpow-functional',
  parent: ['catpow/t-body', 'catpow/t-box', 'catpow/t-loop'],
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var content_path = attributes.content_path,
        query = attributes.query,
        _attributes$AltMode = attributes.AltMode,
        AltMode = _attributes$AltMode === void 0 ? false : _attributes$AltMode;
    return wp.element.createElement(Fragment, null, wp.element.createElement(BlockControls, null, wp.element.createElement(Toolbar, {
      controls: [{
        icon: 'welcome-comments',
        title: 'AltMode',
        isActive: AltMode,
        onClick: function onClick() {
          return setAttributes({
            AltMode: !AltMode
          });
        }
      }]
    })), wp.element.createElement("div", {
      className: "wp-block-catpow-t-loop " + (AltMode ? "alt_content altMode" : "embedded_content")
    }, wp.element.createElement("div", {
      class: "label"
    }, AltMode ? wp.element.createElement(Icon, {
      icon: "welcome-comments"
    }) : content_path), wp.element.createElement(InnerBlocks, {
      template: [['catpow/t-loopcontent'], ['catpow/t-loopcontent', {
        name: 'on_empty'
      }]],
      templateLock: "all"
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "Query"
    }, wp.element.createElement(TextControl, {
      label: "content path",
      value: content_path,
      onChange: function onChange(content_path) {
        setAttributes({
          content_path: content_path
        });
      }
    }), wp.element.createElement(TextareaControl, {
      label: "query",
      value: query,
      onChange: function onChange(query) {
        setAttributes({
          query: query
        });
      }
    }))));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return wp.element.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('catpow/t-loopcontent', {
  title: '🐾 t-loopContent',
  icon: 'editor-code',
  category: 'catpow',
  parent: ['catpow/t-loop'],
  attributes: {
    name: {
      type: 'attribute',
      label: '名前',
      selector: 't-loopContent',
      attribute: 'name',
      default: 'content'
    }
  },
  edit: function edit(_ref3) {
    var attributes = _ref3.attributes,
        className = _ref3.className,
        setAttributes = _ref3.setAttributes,
        clientId = _ref3.clientId;
    var name = attributes.name;
    var template = name == 'on_empty' ? [['catpow/t-paragraph', {
      align: 'center',
      content: 'Not Found'
    }]] : [['catpow/t-paragraph']];
    return wp.element.createElement("div", {
      className: 'wp-block-catpow-t-loopContent'
    }, wp.element.createElement(InnerBlocks, {
      template: template,
      templateLock: false
    }));
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className,
        setAttributes = _ref4.setAttributes;
    var name = attributes.name;
    return wp.element.createElement(Fragment, null, wp.element.createElement("t-loopContent", {
      name: name
    }, wp.element.createElement(InnerBlocks.Content, null)));
  }
});
