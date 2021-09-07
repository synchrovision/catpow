registerBlockType('catpow/definition', {
  title: '🐾 Definition',
  description: '定義リストのブロックです',
  icon: 'editor-ul',
  category: 'catpow',
  transforms: {
    from: [{
      type: 'block',
      blocks: CP.listedConvertibles,
      transform: function transform(attributes) {
        attributes.classes = 'wp-block-catpow-definition';
        return createBlock('catpow/definition', attributes);
      }
    }]
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items,
        _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode,
        _attributes$AltMode = attributes.AltMode,
        AltMode = _attributes$AltMode === void 0 ? false : _attributes$AltMode;
    var primaryClass = 'wp-block-catpow-definition';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var states = CP.wordsToFlags(classes);
    var selectiveClasses = [{
      label: 'テンプレート',
      values: 'isTemplate',
      sub: [{
        input: 'bool',
        label: 'ループ',
        key: 'doLoop',
        sub: [{
          label: 'content path',
          input: 'text',
          key: 'content_path'
        }, {
          label: 'query',
          input: 'textarea',
          key: 'query'
        }, {
          label: 'プレビューループ数',
          input: 'range',
          key: 'loopCount',
          min: 1,
          max: 16
        }]
      }]
    }];

    var save = function save() {
      setAttributes({
        items: JSON.parse(JSON.stringify(items))
      });
    };

    var rtn = [];
    items.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      rtn.push(wp.element.createElement(CP.Item, {
        tag: "dl",
        set: setAttributes,
        attr: attributes,
        items: items,
        index: index,
        isSelected: isSelected
      }, wp.element.createElement("dt", {
        className: "title"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(title) {
          item.title = title;
          save();
        },
        value: item.title
      })), wp.element.createElement("dd", {
        class: "text"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          item.text = text;
          save();
        },
        value: item.text
      }))));
    });

    if (rtn.length < loopCount) {
      var len = rtn.length;

      while (rtn.length < loopCount) {
        rtn.push(rtn[rtn.length % len]);
      }
    }

    return wp.element.createElement(Fragment, null, wp.element.createElement(CP.SelectModeToolbar, {
      set: setAttributes,
      attr: attributes
    }), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.definition || {}
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
    })), wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? wp.element.createElement("div", {
      className: "alt_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: "edit"
    })), wp.element.createElement(CP.EditItemsTable, {
      set: setAttributes,
      attr: attributes,
      columns: [{
        type: 'text',
        key: 'title',
        cond: states.hasTitle
      }, {
        type: 'text',
        key: 'text',
        cond: states.hasText
      }],
      isTemplate: states.isTemplate
    })) : wp.element.createElement(Fragment, null, AltMode && doLoop ? wp.element.createElement("div", {
      className: "alt_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: "welcome-comments"
    })), wp.element.createElement(InnerBlocks, null)) : wp.element.createElement("div", {
      className: classes
    }, rtn)));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2,
        _attributes$classes2 = attributes.classes,
        classes = _attributes$classes2 === void 0 ? '' : _attributes$classes2,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop;
    var states = CP.wordsToFlags(classes);
    var rtn = [];
    items.map(function (item, index) {
      rtn.push(wp.element.createElement("dl", {
        className: "item"
      }, wp.element.createElement("dt", {
        className: "title"
      }, wp.element.createElement(RichText.Content, {
        value: item.title
      })), wp.element.createElement("dd", {
        className: "text"
      }, wp.element.createElement(RichText.Content, {
        value: item.text
      }))));
    });
    return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
      className: classes
    }, rtn), doLoop && wp.element.createElement("onEmpty", null, wp.element.createElement(InnerBlocks.Content, null)));
  }
});
