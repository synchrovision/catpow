registerBlockType('catpow/materials', {
  title: '🐾 Materials',
  description: '材料・成分一覧のブロックです。',
  icon: 'editor-ul',
  category: 'catpow',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items,
        classes = attributes.classes,
        loopParam = attributes.loopParam,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode,
        _attributes$AltMode = attributes.AltMode,
        AltMode = _attributes$AltMode === void 0 ? false : _attributes$AltMode,
        currentItemIndex = attributes.currentItemIndex;
    var primaryClass = 'wp-block-catpow-materials';
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
    var itemSelectiveClasses = ['color', {
      label: 'ラベル',
      values: 'hasLabel'
    }];
    var rtn = [];
    var imageKeys = {
      image: {
        src: "imageSrc",
        alt: "imageAlt",
        code: "imageCode",
        items: "items"
      }
    };

    var save = function save() {
      setAttributes({
        items: JSON.parse(JSON.stringify(items))
      });
    };

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
        isSelected: isSelected && currentItemIndex == index
      }, itemStates.hasLabel && wp.element.createElement("div", {
        className: "label"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(label) {
          item.label = label;
          save();
        },
        value: item.label
      })), wp.element.createElement("ul", {
        className: "items"
      }, item.items.map(function (subItem, subIndex) {
        var subItemStates = CP.wordsToFlags(subItem.classes);
        return wp.element.createElement(CP.Item, {
          tag: "li",
          set: function set() {
            item.currentItemIndex = subIndex;
            save();
          },
          attr: item,
          items: item.items,
          index: subIndex,
          isSelected: isSelected && currentItemIndex == index && item.currentItemIndex == subIndex
        }, wp.element.createElement("div", {
          class: "text"
        }, wp.element.createElement("div", {
          className: "title"
        }, wp.element.createElement(RichText, {
          onChange: function onChange(title) {
            subItem.title = title;
            save();
          },
          value: subItem.title
        })), wp.element.createElement("div", {
          className: "line"
        }), wp.element.createElement("div", {
          className: "amount"
        }, wp.element.createElement(RichText, {
          onChange: function onChange(amount) {
            subItem.amount = amount;
            save();
          },
          value: subItem.amount
        })), subItemStates.hasCaption && wp.element.createElement("div", {
          className: "caption"
        }, wp.element.createElement(RichText, {
          onChange: function onChange(caption) {
            subItem.caption = caption;
            save();
          },
          value: subItem.caption
        }))));
      }))));
    });

    if (attributes.EditMode === undefined) {
      attributes.EditMode = false;
    }

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
      filters: CP.filters.materials || {}
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
    })), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: items,
      index: attributes.currentItemIndex,
      selectiveClasses: itemSelectiveClasses,
      filters: CP.filters.materials || {}
    }), wp.element.createElement(CP.ItemControlInfoPanel, null)), wp.element.createElement(Fragment, null, EditMode ? wp.element.createElement("div", {
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
        key: 'label',
        cond: true
      }, {
        type: 'items',
        key: 'items',
        columns: [{
          type: 'text',
          key: 'title',
          cond: true
        }, {
          type: 'text',
          key: 'amount',
          cond: true
        }, {
          type: 'text',
          key: 'caption',
          cond: true
        }],
        cond: true
      }],
      isTemplate: states.isTemplate
    })) : wp.element.createElement(Fragment, null, AltMode && doLoop ? wp.element.createElement("div", {
      className: "alt_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: "welcome-comments"
    })), wp.element.createElement(InnerBlocks, null)) : wp.element.createElement("ul", {
      className: classes
    }, rtn))));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2,
        _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        loopParam = attributes.loopParam,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop;

    var classArray = _.uniq(classes.split(' '));

    var states = CP.wordsToFlags(classes);
    var rtn = [];
    items.map(function (item, index) {
      var itemStates = CP.wordsToFlags(item.classes);
      rtn.push(wp.element.createElement("li", {
        className: item.classes
      }, itemStates.hasLabel && wp.element.createElement("div", {
        className: "label"
      }, wp.element.createElement(RichText.Content, {
        value: item.label
      })), wp.element.createElement("ul", {
        className: "items"
      }, item.items.map(function (subItem, subIndex) {
        var subItemStates = CP.wordsToFlags(subItem.classes);
        return wp.element.createElement("li", {
          className: subItem.classes
        }, wp.element.createElement("div", {
          class: "text"
        }, wp.element.createElement("div", {
          className: "title"
        }, wp.element.createElement(RichText.Content, {
          value: subItem.title
        })), wp.element.createElement("div", {
          className: "line"
        }), wp.element.createElement("div", {
          className: "amount"
        }, wp.element.createElement(RichText.Content, {
          value: subItem.amount
        })), subItemStates.hasCaption && wp.element.createElement("div", {
          className: "caption"
        }, wp.element.createElement(RichText.Content, {
          value: subItem.caption
        }))));
      }))));
    });
    return wp.element.createElement(Fragment, null, wp.element.createElement("ul", {
      className: classes
    }, rtn), doLoop && wp.element.createElement("onEmpty", null, wp.element.createElement(InnerBlocks.Content, null)));
  }
});
