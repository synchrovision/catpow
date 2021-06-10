registerBlockType('catpow/icons', {
  title: '🐾 Icons',
  description: 'リンク付きのアイコン画像を並べて表示するブロックです。',
  icon: 'image-filter',
  category: 'catpow',
  transforms: {
    from: [{
      type: 'block',
      blocks: CP.listedConvertibles,
      transform: function transform(attributes) {
        attributes.classes = 'wp-block-catpow-icons medium hasSubTitle hasText';
        return createBlock('catpow/icons', attributes);
      }
    }]
  },
  attributes: {
    version: {
      type: 'number',
      default: 0
    },
    classes: {
      source: 'attribute',
      selector: 'ul',
      attribute: 'class',
      default: 'wp-block-catpow-icons'
    },
    items: {
      source: 'query',
      selector: 'li.item',
      query: {
        classes: {
          source: 'attribute',
          attribute: 'class'
        },
        src: {
          source: 'attribute',
          selector: '[src]',
          attribute: 'src'
        },
        alt: {
          source: 'attribute',
          selector: '[src]',
          attribute: 'alt'
        },
        href: {
          source: 'attribute',
          selector: 'a',
          attribute: 'href'
        }
      },
      default: babelHelpers.toConsumableArray(Array(3)).map(function () {
        return {
          classes: 'item',
          src: cp.theme_url + '/images/dummy_icon.svg',
          alt: 'dummy',
          href: cp.home_url
        };
      })
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items,
        classes = attributes.classes,
        countPrefix = attributes.countPrefix,
        countSuffix = attributes.countSuffix;
    var primaryClass = 'wp-block-catpow-icons';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var classNameArray = className.split(' ');
    var selectiveClasses = [{
      label: 'サイズ',
      filter: 'size',
      values: ['small', 'medium', 'large']
    }, {
      label: '塗り',
      values: "filled",
      sub: [{
        label: '形状',
        filter: 'shape',
        values: {
          circle: "丸",
          square: "四角"
        }
      }]
    }];
    var rtn = [];
    items.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      rtn.push(wp.element.createElement(CP.Item, {
        tag: "li",
        set: setAttributes,
        attr: attributes,
        items: items,
        index: index,
        isSelected: attributes.currentItemIndex == index
      }, wp.element.createElement("a", null, wp.element.createElement("img", {
        src: item.src,
        alt: item.alt
      }))));
    });

    if (attributes.EditMode === undefined) {
      attributes.EditMode = false;
    }

    return [wp.element.createElement(BlockControls, null, wp.element.createElement(Toolbar, {
      controls: [{
        icon: 'edit',
        title: 'EditMode',
        isActive: attributes.EditMode,
        onClick: function onClick() {
          return setAttributes({
            EditMode: !attributes.EditMode
          });
        }
      }]
    }), wp.element.createElement(CP.AlignClassToolbar, {
      set: setAttributes,
      attr: attributes
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses
    }), wp.element.createElement(PanelBody, {
      title: "CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: "\u30AF\u30E9\u30B9",
      onChange: function onChange(clss) {
        return setAttributes({
          classes: clss
        });
      },
      value: classArray.join(' ')
    })), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30A2\u30A4\u30C6\u30E0",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: items,
      index: attributes.currentItemIndex,
      selectiveClasses: [{
        input: 'image',
        keys: {
          src: 'src',
          alt: 'alt'
        },
        size: 'thumbnail'
      }, {
        input: 'text',
        key: 'href',
        label: 'リンク'
      }, 'color']
    }), wp.element.createElement(CP.ItemControlInfoPanel, null)), wp.element.createElement("ul", {
      className: attributes.EditMode ? primaryClass + ' edit' : classes
    }, rtn)];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2,
        classes = attributes.classes,
        countPrefix = attributes.countPrefix,
        countSuffix = attributes.countSuffix;
    var rtn = [];
    items.map(function (item, index) {
      rtn.push(wp.element.createElement("li", {
        className: item.classes
      }, wp.element.createElement("a", {
        href: item.href
      }, wp.element.createElement("img", {
        src: item.src,
        alt: item.alt
      }))));
    });
    return wp.element.createElement("ul", {
      className: classes
    }, rtn);
  }
});
