registerBlockType('catpow/pricecard', {
  title: '🐾 PriceCard',
  description: 'サービス・商品情報の一覧ブロックです。',
  icon: 'index-card',
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
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        priceUnit = attributes.priceUnit,
        priceCaption = attributes.priceCaption,
        linkText = attributes.linkText,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode,
        _attributes$AltMode = attributes.AltMode,
        AltMode = _attributes$AltMode === void 0 ? false : _attributes$AltMode;
    var primaryClass = 'wp-block-catpow-pricecard';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var classNameArray = className.split(' ');
    var states = CP.wordsToFlags(classes);
    var selectiveClasses = [{
      input: 'text',
      label: '価格単位',
      key: 'priceUnit'
    }, {
      type: 'radio',
      label: '単位の位置',
      values: {
        "unitBefore": "前",
        "unitAfter": "後"
      }
    }, {
      label: 'タイトル',
      values: 'hasTitle'
    }, {
      label: 'キャプション',
      values: 'hasTitleCaption'
    }, {
      label: 'リンク',
      values: 'hasLink',
      sub: [{
        input: 'text',
        label: 'リンク文字列',
        key: 'linkText'
      }]
    }, {
      label: '画像',
      values: 'hasImage'
    }, {
      label: 'サブタイトル',
      values: 'hasSubTitle'
    }, {
      label: 'テキスト',
      values: 'hasText'
    }, {
      label: 'スペック',
      values: 'hasSpec'
    }, {
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
      label: 'タイプ',
      values: {
        'normal': "通常",
        'recommended': "おすすめ",
        'deprecated': "非推奨",
        'cheap': "安価",
        'expensive': "高級"
      }
    }, {
      label: '値引き',
      values: 'discount'
    }, {
      label: '画像コード',
      input: 'text',
      key: 'imageCode',
      cond: states.isTemplate
    }];
    var rtn = [];
    var imageKeys = {
      image: {
        src: "src",
        alt: "alt",
        code: 'imageCode',
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

      rtn.push(wp.element.createElement(CP.Item, {
        tag: "li",
        set: setAttributes,
        attr: attributes,
        items: items,
        index: index,
        isSelected: isSelected
      }, states.hasImage && wp.element.createElement("div", {
        className: "image"
      }, wp.element.createElement(CP.SelectResponsiveImage, {
        attr: attributes,
        set: setAttributes,
        keys: imageKeys.image,
        index: index,
        size: "vga",
        isTemplate: states.isTemplate
      })), wp.element.createElement("header", null, wp.element.createElement("div", {
        className: "text"
      }, states.hasTitle && wp.element.createElement("h3", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          items[index].title = text;
          save();
        },
        value: item.title
      })), states.hasTitle && states.hasTitleCaption && wp.element.createElement("p", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          items[index].titleCaption = text;
          save();
        },
        value: item.titleCaption
      })), wp.element.createElement("div", {
        class: "price"
      }, wp.element.createElement("span", {
        class: "listPrice"
      }, states.unitBefore && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit), wp.element.createElement("span", {
        class: "number"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(listPrice) {
          items[index].listPrice = listPrice;
          save();
        },
        value: item.listPrice
      })), states.unitAfter && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit)), wp.element.createElement("span", {
        class: "price"
      }, states.unitBefore && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit), wp.element.createElement("span", {
        class: "number"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(price) {
          items[index].price = price;
          save();
        },
        value: item.price
      })), states.unitAfter && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit)), wp.element.createElement("span", {
        class: "priceCaption"
      }, wp.element.createElement(RichText, {
        onChange: function onChange(priceCaption) {
          setAttributes({
            priceCaption: priceCaption
          });
        },
        value: priceCaption
      }))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && wp.element.createElement("div", {
        class: "contents"
      }, states.hasSubTitle && wp.element.createElement("h4", null, wp.element.createElement(RichText, {
        onChange: function onChange(subTitle) {
          items[index].subTitle = subTitle;
          save();
        },
        value: item.subTitle,
        placeholder: "SubTitle"
      })), states.hasText && wp.element.createElement("p", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          items[index].text = text;
          save();
        },
        value: item.text
      })), states.hasSpec && wp.element.createElement("dl", {
        className: "spec"
      }, item.specLabels.map(function (label, specIndex) {
        return [wp.element.createElement("dt", null, wp.element.createElement(RichText, {
          onChange: function onChange(text) {
            items[index].specLabels[specIndex].text = text;
            save();
          },
          value: items[index].specLabels[specIndex].text
        })), wp.element.createElement("dd", null, wp.element.createElement(RichText, {
          onChange: function onChange(text) {
            items[index].specValues[specIndex].text = text;
            save();
          },
          value: items[index].specValues[specIndex].text
        }))];
      })), states.hasLink && wp.element.createElement("div", {
        className: "link"
      }, linkText, isSelected && wp.element.createElement(TextControl, {
        onChange: function onChange(linkUrl) {
          items[index].linkUrl = linkUrl;
          save();
        },
        value: item.linkUrl,
        placeholder: "URL\u3092\u5165\u529B"
      })))));
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
      filters: CP.filters.pricecard || {}
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
      selectiveClasses: itemSelectiveClasses,
      filters: CP.filters.pricecard || {}
    }), wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? wp.element.createElement(CP.EditItemsTable, {
      set: setAttributes,
      attr: attributes,
      columns: [{
        type: 'text',
        key: 'title',
        cond: states.hasTitle
      }, {
        type: 'text',
        key: 'titleCaption',
        cond: states.hasTitleCaption
      }, {
        type: 'image',
        keys: imageKeys.image,
        cond: states.hasImage
      }, {
        type: 'text',
        key: 'imageCode',
        cond: states.hasImage && states.isTemplate
      }, {
        type: 'text',
        key: 'subTitle',
        cond: states.hasSubTitle
      }, {
        type: 'text',
        key: 'text',
        cond: states.hasText
      }, {
        type: 'text',
        key: 'listPrice',
        cond: true
      }, {
        type: 'text',
        key: 'price',
        cond: true
      }, {
        type: 'text',
        key: 'linkUrl',
        cond: states.hasLink
      }],
      isTemplate: states.isTemplate
    }) : wp.element.createElement(Fragment, null, AltMode && doLoop ? wp.element.createElement("div", {
      className: "alt_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: "welcome-comments"
    })), wp.element.createElement(InnerBlocks, null)) : wp.element.createElement("ul", {
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
        priceUnit = attributes.priceUnit,
        priceCaption = attributes.priceCaption,
        linkText = attributes.linkText,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop;
    var primaryClass = 'wp-block-catpow-pricecard';

    var classArray = _.uniq(classes.split(' '));

    var states = CP.wordsToFlags(classes);
    var rtn = [];
    var imageKeys = {
      image: {
        src: "src",
        alt: "alt",
        code: 'imageCode',
        items: "items"
      }
    };
    items.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      rtn.push(wp.element.createElement("li", {
        className: item.classes
      }, states.hasImage && wp.element.createElement("div", {
        className: "image"
      }, wp.element.createElement(CP.ResponsiveImage, {
        attr: attributes,
        keys: imageKeys.image,
        index: index,
        size: "vga",
        isTemplate: states.isTemplate
      })), wp.element.createElement("header", null, wp.element.createElement("div", {
        className: "text"
      }, states.hasTitle && wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
        value: item.title
      })), states.hasTitle && states.hasTitleCaption && wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
        value: item.titleCaption
      })), wp.element.createElement("div", {
        class: "price"
      }, wp.element.createElement("span", {
        class: "listPrice"
      }, states.unitBefore && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit), wp.element.createElement("span", {
        class: "number"
      }, item.listPrice), states.unitAfter && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit)), wp.element.createElement("span", {
        class: "price"
      }, states.unitBefore && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit), wp.element.createElement("span", {
        class: "number"
      }, item.price), states.unitAfter && wp.element.createElement("span", {
        class: "unit"
      }, priceUnit)), wp.element.createElement("span", {
        class: "priceCaption"
      }, wp.element.createElement(RichText.Content, {
        value: priceCaption
      }))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && wp.element.createElement("div", {
        class: "contents"
      }, states.hasSubTitle && wp.element.createElement("h4", null, wp.element.createElement(RichText.Content, {
        value: item.subTitle
      })), states.hasText && wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
        value: item.text
      })), states.hasSpec && wp.element.createElement("dl", {
        className: "spec"
      }, item.specLabels.map(function (label, specIndex) {
        return [wp.element.createElement("dt", null, wp.element.createElement(RichText.Content, {
          value: items[index].specLabels[specIndex].text
        })), wp.element.createElement("dd", null, wp.element.createElement(RichText.Content, {
          value: items[index].specValues[specIndex].text
        }))];
      })), states.hasLink && wp.element.createElement("a", {
        className: "link",
        href: item.linkUrl
      }, linkText))));
    });
    return wp.element.createElement(Fragment, null, wp.element.createElement("ul", {
      className: classes
    }, rtn), doLoop && wp.element.createElement("onEmpty", null, wp.element.createElement(InnerBlocks.Content, null)));
  },
  deprecated: [{
    save: function save(_ref3) {
      var attributes = _ref3.attributes,
          className = _ref3.className;
      var _attributes$items3 = attributes.items,
          items = _attributes$items3 === void 0 ? [] : _attributes$items3,
          _attributes$classes3 = attributes.classes,
          classes = _attributes$classes3 === void 0 ? '' : _attributes$classes3,
          priceUnit = attributes.priceUnit,
          priceCaption = attributes.priceCaption,
          linkText = attributes.linkText,
          loopCount = attributes.loopCount;
      var primaryClass = 'wp-block-catpow-pricecard';

      var classArray = _.uniq(classes.split(' '));

      var states = CP.wordsToFlags(classes);
      var rtn = [];
      var imageKeys = {
        image: {
          src: "src",
          alt: "alt",
          code: 'imageCode',
          items: "items"
        }
      };
      items.map(function (item, index) {
        if (!item.controlClasses) {
          item.controlClasses = 'control';
        }

        rtn.push(wp.element.createElement("li", {
          className: item.classes
        }, states.hasImage && wp.element.createElement("div", {
          className: "image"
        }, wp.element.createElement(CP.ResponsiveImage, {
          attr: attributes,
          keys: imageKeys.image,
          index: index,
          size: "vga",
          isTemplate: states.isTemplate
        })), wp.element.createElement("header", null, wp.element.createElement("div", {
          className: "text"
        }, states.hasTitle && wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
          value: item.title
        })), states.hasTitle && states.hasTitleCaption && wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
          value: item.titleCaption
        })), wp.element.createElement("div", {
          class: "price"
        }, wp.element.createElement("span", {
          class: "listPrice"
        }, states.unitBefore && wp.element.createElement("span", {
          class: "unit"
        }, priceUnit), wp.element.createElement("span", {
          class: "number"
        }, item.listPrice), states.unitAfter && wp.element.createElement("span", {
          class: "unit"
        }, priceUnit)), wp.element.createElement("span", {
          class: "price"
        }, states.unitBefore && wp.element.createElement("span", {
          class: "unit"
        }, priceUnit), wp.element.createElement("span", {
          class: "number"
        }, item.price), states.unitAfter && wp.element.createElement("span", {
          class: "unit"
        }, priceUnit)), wp.element.createElement("span", {
          class: "priceCaption"
        }, wp.element.createElement(RichText.Content, {
          value: priceCaption
        }))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && wp.element.createElement("div", {
          class: "contents"
        }, states.hasSubTitle && wp.element.createElement("h4", null, wp.element.createElement(RichText.Content, {
          value: item.subTitle
        })), states.hasText && wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
          value: item.text
        })), states.hasSpec && wp.element.createElement("dl", {
          className: "spec"
        }, item.specLabels.map(function (label, specIndex) {
          return [wp.element.createElement("dt", null, wp.element.createElement(RichText.Content, {
            value: items[index].specLabels[specIndex].text
          })), wp.element.createElement("dd", null, wp.element.createElement(RichText.Content, {
            value: items[index].specValues[specIndex].text
          }))];
        })), states.hasLink && wp.element.createElement("a", {
          className: "link",
          href: item.linkUrl
        }, linkText))));
      });
      return wp.element.createElement("ul", {
        className: classes
      }, states.doLoop && '[loop_template ' + (loopParam || '') + ']', rtn, states.doLoop && '[/loop_template]');
    },
    migrate: function migrate(attributes) {
      var states = CP.wordsToFlags(classes);
      attributes.content_path = attributes.loopParam.split(' ')[0];
      attributes.query = attributes.loopParam.split(' ').slice(1).join("\n");
      attributes.doLoop = states.doLoop;
      return attributes;
    }
  }]
});
