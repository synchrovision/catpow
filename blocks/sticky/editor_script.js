CP.config.sticky = {
  imageKeys: {
    openButtonImage: {
      src: "openButtonImageSrc"
    },
    closeButtonImage: {
      src: "closeButtonImageSrc"
    }
  },
  imageSizes: {
    image: 'vga'
  }
};
registerBlockType('catpow/sticky', {
  title: '🐾 Sticky',
  description: 'スクロールに追従するコンテンツを配置します。',
  icon: 'menu',
  category: 'catpow',
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'div',
      attribute: 'class',
      default: 'wp-block-catpow-sticky topLeft small label'
    },
    labelText: {
      source: 'children',
      selector: '.label',
      defalt: ['ラベル']
    },
    openButtonImageSrc: {
      source: 'attribute',
      selector: '.wp-block-catpow-sticky>.stickyButton [src].open',
      attribute: 'src',
      default: cp.theme_url + '/images/dummy_icon.svg'
    },
    closeButtonImageSrc: {
      source: 'attribute',
      selector: '.wp-block-catpow-sticky>.stickyButton [src].close',
      attribute: 'src',
      default: cp.theme_url + '/images/dummy_icon.svg'
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    var classes = attributes.classes,
        labelText = attributes.labelText;
    var states = CP.wordsToFlags(classes);
    var imageKeys = CP.config.sticky.imageKeys;
    var selectiveClasses = [{
      label: '位置',
      input: 'position',
      disable: ['left', 'center', 'right']
    }, {
      label: 'サイズ',
      filter: 'size',
      values: {
        full: '全面',
        large: '大',
        medium: '中',
        small: '小'
      }
    }, {
      label: 'タイプ',
      filter: 'type',
      values: {
        label: 'ラベル',
        container: 'コンテナ',
        collapsible: '折り畳み'
      },
      sub: {
        label: ['color'],
        collapsible: ['color', {
          label: 'ボタン',
          values: {
            pullButton: '引き出し',
            menuButton: 'メニュー',
            labelButton: 'ラベル',
            imageButton: '画像'
          },
          sub: {
            imageButton: [{
              label: 'open',
              input: 'image',
              keys: imageKeys.openButtonImage,
              size: 'thumbnail'
            }, {
              label: 'close',
              input: 'image',
              keys: imageKeys.closeButtonImage,
              size: 'thumbnail'
            }]
          }
        }]
      }
    }];
    return [wp.element.createElement("div", {
      className: classes
    }, states.collapsible && wp.element.createElement("div", {
      class: "stickyButton"
    }, wp.element.createElement("div", {
      class: "stickyButtonIcon"
    }, states.labelButton && wp.element.createElement("div", {
      className: "label"
    }, wp.element.createElement(RichText, {
      onChange: function onChange(labelText) {
        setAttributes({
          labelText: labelText
        });
      },
      value: labelText
    })), states.imageButton && [wp.element.createElement(ResponsiveImage, {
      className: "open",
      attr: attributes,
      keys: imageKeys.openButtonImage
    }), wp.element.createElement(ResponsiveImage, {
      className: "close",
      attr: attributes,
      keys: imageKeys.closeButtonImage
    })])), wp.element.createElement("div", {
      class: "content"
    }, states.label && wp.element.createElement("div", {
      className: "label"
    }, wp.element.createElement(RichText, {
      onChange: function onChange(labelText) {
        setAttributes({
          labelText: labelText
        });
      },
      value: labelText
    })), (states.container || states.collapsible) && wp.element.createElement(InnerBlocks, null))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.listed || {}
    }), wp.element.createElement(PanelBody, {
      title: "CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: "\u30AF\u30E9\u30B9",
      onChange: function onChange(classes) {
        return setAttributes({
          classes: classes
        });
      },
      value: classes
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        labelText = attributes.labelText;
    var states = CP.wordsToFlags(classes);
    var imageKeys = CP.config.sticky.imageKeys;
    return wp.element.createElement("div", {
      className: classes
    }, states.collapsible && wp.element.createElement("div", {
      class: "stickyButton"
    }, wp.element.createElement("div", {
      class: "stickyButtonIcon"
    }, states.labelButton && wp.element.createElement("div", {
      className: "label"
    }, wp.element.createElement(RichText.Content, {
      value: labelText
    })), states.imageButton && [wp.element.createElement(ResponsiveImage, {
      className: "open",
      attr: attributes,
      keys: imageKeys.openButtonImage
    }), wp.element.createElement(ResponsiveImage, {
      className: "close",
      attr: attributes,
      keys: imageKeys.closeButtonImage
    })])), wp.element.createElement("div", {
      class: "content"
    }, states.label && wp.element.createElement("div", {
      className: "label"
    }, wp.element.createElement(RichText.Content, {
      value: labelText
    })), (states.container || states.collapsible) && wp.element.createElement(InnerBlocks.Content, null)));
  },
  deplicated: [{
    save: function save(_ref3) {
      var attributes = _ref3.attributes,
          className = _ref3.className,
          setAttributes = _ref3.setAttributes;
      var _attributes$classes2 = attributes.classes,
          classes = _attributes$classes2 === void 0 ? '' : _attributes$classes2,
          labelText = attributes.labelText;
      var states = CP.wordsToFlags(classes);
      var imageKeys = CP.config.sticky.imageKeys;
      return wp.element.createElement("div", {
        className: classes
      }, states.collapsible && wp.element.createElement("div", {
        class: "stickyMenuButton"
      }, wp.element.createElement("div", {
        class: "stickyMenuButtonIcon"
      }, states.labelButton && wp.element.createElement("div", {
        className: "label"
      }, wp.element.createElement(RichText.Content, {
        value: labelText
      })), states.imageButton && [wp.element.createElement(ResponsiveImage, {
        className: "open",
        attr: attributes,
        keys: imageKeys.openButtonImage
      }), wp.element.createElement(ResponsiveImage, {
        className: "close",
        attr: attributes,
        keys: imageKeys.closeButtonImage
      })])), wp.element.createElement("div", {
        class: "content"
      }, states.label && wp.element.createElement("div", {
        className: "label"
      }, wp.element.createElement(RichText.Content, {
        value: labelText
      })), (states.container || states.collapsible) && wp.element.createElement(InnerBlocks.Content, null)));
    }
  }]
});
registerBlockType('catpow/stickycontent', {
  title: '🐾 StickyContent',
  icon: 'editor-code',
  category: 'catpow',
  parent: ['catpow/sticky'],
  edit: function edit(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className,
        setAttributes = _ref4.setAttributes;
    return [wp.element.createElement("div", {
      className: 'sticky_content'
    }, wp.element.createElement(InnerBlocks, {
      template: [['core/paragraph']],
      templateLock: false
    }))];
  },
  save: function save(_ref5) {
    var attributes = _ref5.attributes,
        className = _ref5.className,
        setAttributes = _ref5.setAttributes;
    return wp.element.createElement("div", {
      className: 'sticky_content'
    }, wp.element.createElement(InnerBlocks.Content, null));
  }
});
