registerBlockType('catpow/formbuttons', {
  title: '🐾 FormButtons',
  description: 'フォーム用のボタンです。',
  icon: 'upload',
  category: 'catpow',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items,
        _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes;
    var primaryClass = 'wp-block-catpow-formbuttons';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var classNameArray = className.split(' ');
    var selectiveClasses = [{
      label: 'サイズ',
      filter: 'size',
      values: {
        l: '大',
        m: '中',
        s: '小',
        ss: '極小'
      }
    }, {
      label: 'インライン',
      values: 'i'
    }];
    var itemClasses = ['color', {
      type: 'gridbuttons',
      label: '属性',
      filter: 'rank',
      values: ['default', 'primary', 'secondary', 'negative', 'danger', 'secure']
    }, {
      label: 'アイコン',
      values: 'hasIcon',
      sub: [{
        input: 'icon'
      }]
    }, 'event'];

    var saveItems = function saveItems() {
      setAttributes({
        items: JSON.parse(JSON.stringify(items))
      });
    };

    var rtn = [];
    items.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      var itemStates = CP.wordsToFlags(item.classes);
      rtn.push(wp.element.createElement(CP.Item, {
        tag: "li",
        set: setAttributes,
        attr: attributes,
        items: items,
        index: index,
        isSelected: isSelected
      }, wp.element.createElement("div", {
        class: "button"
      }, itemStates.hasIcon && wp.element.createElement(CP.OutputIcon, {
        item: item
      }), wp.element.createElement("span", {
        onInput: function onInput(e) {
          item.text = e.target.innerText;
        },
        onBlur: saveItems,
        contentEditable: "true"
      }, item.text), wp.element.createElement("span", {
        class: "action",
        onInput: function onInput(e) {
          item.action = e.target.innerText;
        },
        onBlur: saveItems,
        contentEditable: "true"
      }, item.action))));
    });

    if (attributes.EditMode === undefined) {
      attributes.EditMode = false;
    }

    return [wp.element.createElement("ul", {
      className: classes
    }, rtn), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.buttons || {}
    }), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30DC\u30BF\u30F3",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: items,
      index: attributes.currentItemIndex,
      selectiveClasses: itemClasses,
      filters: CP.filters.buttons || {}
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
    })), wp.element.createElement(CP.ItemControlInfoPanel, null)), wp.element.createElement(BlockControls, null, wp.element.createElement(CP.AlignClassToolbar, {
      set: setAttributes,
      attr: attributes
    }))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2,
        _attributes$classes2 = attributes.classes,
        classes = _attributes$classes2 === void 0 ? '' : _attributes$classes2;

    var classArray = _.uniq(classes.split(' '));

    var blockType = wp.data.select('core/blocks').getBlockType('catpow/formbuttons');
    var rtn = [];
    items.map(function (item, index) {
      var itemStates = CP.wordsToFlags(item.classes);
      var eventDispatcherAttributes = {};

      if (blockType.attributes.items.eventDispatcherAttributes) {
        blockType.attributes.items.eventDispatcherAttributes.map(function (attr_name) {
          eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
        });
      }

      rtn.push(wp.element.createElement("li", {
        className: item.classes
      }, wp.element.createElement("div", babelHelpers.extends({
        className: "button",
        "data-action": item.action,
        "data-callback": item.callback,
        "data-target": item.target,
        "ignore-message": item.ignoreMessage
      }, eventDispatcherAttributes), itemStates.hasIcon && wp.element.createElement(CP.OutputIcon, {
        item: item
      }), item.text)));
    });
    return wp.element.createElement("ul", {
      className: classes
    }, rtn);
  },
  deprecated: [{
    attributes: {
      version: {
        type: 'number',
        default: 0
      },
      classes: {
        source: 'attribute',
        selector: 'ul',
        attribute: 'class',
        default: 'wp-block-catpow-formbuttons buttons'
      },
      items: {
        source: 'query',
        selector: 'li.item',
        query: {
          classes: {
            source: 'attribute',
            attribute: 'class'
          },
          event: {
            source: 'attribute',
            attribute: 'data-event'
          },
          button: {
            source: 'text'
          }
        },
        default: [{
          classes: 'item',
          button: '[button 送信 send]'
        }]
      }
    },
    save: function save(_ref3) {
      var attributes = _ref3.attributes,
          className = _ref3.className;
      var _attributes$items3 = attributes.items,
          items = _attributes$items3 === void 0 ? [] : _attributes$items3,
          _attributes$classes3 = attributes.classes,
          classes = _attributes$classes3 === void 0 ? '' : _attributes$classes3;

      var classArray = _.uniq(classes.split(' '));

      var rtn = [];
      items.map(function (item, index) {
        rtn.push(wp.element.createElement("li", {
          className: item.classes,
          "data-event": item.event
        }, item.button));
      });
      return wp.element.createElement("ul", {
        className: classes
      }, rtn);
    },
    migrate: function migrate(attributes) {
      var _attributes$items4 = attributes.items,
          items = _attributes$items4 === void 0 ? [] : _attributes$items4;

      var parseButtonShortCode = function parseButtonShortCode(code) {
        var matches = code.match(/^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/);

        if (matches) {
          var rtn = {
            content: matches[1],
            action: matches[2]
          };

          if (matches[3]) {
            rtn.ignore_message = 1;
          }

          return rtn;
        }

        return {
          content: '送信'
        };
      };

      items.map(function (item) {
        var buttonData = parseButtonShortCode(item.button);
        item.action = buttonData.action;
        item.text = buttonData.content;
        item.ignore_message = buttonData.ignore_message;
      });
      return attributes;
    }
  }]
});
