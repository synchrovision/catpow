CP.config.picture = {
  devices: ['sp', 'tb'],
  imageKeys: {
    image: {
      sources: 'sources',
      src: "src",
      alt: "alt",
      code: "code"
    }
  }
};
registerBlockType('catpow/picture', {
  title: '🐾 Picture',
  description: '画面サイズに応じて切り替わる画像。',
  icon: 'id-alt',
  category: 'catpow',
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'div',
      attribute: 'class',
      default: 'wp-block-catpow-picture'
    },
    sources: CP.getPictureSoucesAttributesForDevices(CP.config.picture.devices),
    mime: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'data-mime'
    },
    src: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'src',
      default: cp.theme_url + '/images/dummy.jpg'
    },
    alt: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'alt'
    },
    code: {
      source: 'text'
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var classes = attributes.classes,
        sources = attributes.sources,
        src = attributes.src,
        srcset = attributes.srcset,
        alt = attributes.alt,
        code = attributes.code,
        device = attributes.device;
    var states = CP.wordsToFlags(classes);
    var _CP$config$picture = CP.config.picture,
        devices = _CP$config$picture.devices,
        imageKeys = _CP$config$picture.imageKeys;
    var selectiveClasses = [{
      input: 'picture',
      label: '画像',
      keys: imageKeys.image,
      devices: devices,
      isTemplate: states.isTemplate
    }, {
      label: 'テンプレート',
      values: 'isTemplate',
      sub: [{
        input: 'text',
        label: '画像コード',
        key: 'code',
        cond: true
      }]
    }];
    return wp.element.createElement(Fragment, null, wp.element.createElement(CP.SelectDeviceToolbar, {
      attr: attributes,
      set: setAttributes,
      devices: devices
    }), wp.element.createElement("div", {
      className: classes + (device ? ' alt_content ' + device : '')
    }, device && wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: CP.devices[device].icon
    })), wp.element.createElement(CP.SelectResponsiveImage, {
      attr: attributes,
      set: setAttributes,
      keys: imageKeys.image,
      device: device,
      devices: devices,
      isTemplate: states.isTemplate
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.picture || {}
    })));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var classes = attributes.classes,
        srouces = attributes.srouces,
        src = attributes.src,
        srcset = attributes.srcset,
        alt = attributes.alt,
        code = attributes.code;
    var states = CP.wordsToFlags(classes);
    var _CP$config$picture2 = CP.config.picture,
        devices = _CP$config$picture2.devices,
        imageKeys = _CP$config$picture2.imageKeys;
    return wp.element.createElement("div", {
      className: classes
    }, wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.image,
      devices: devices,
      isTemplate: states.isTemplate
    }));
  }
});
