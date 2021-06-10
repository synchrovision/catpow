registerBlockType('catpow/dialog', {
  title: '🐾 Dialog',
  description: 'フキダシで会話を表現するブロックです。',
  icon: 'format-chat',
  category: 'catpow',
  transforms: {
    from: [{
      type: 'block',
      blocks: CP.listedConvertibles,
      transform: function transform(attributes) {
        attributes.classes = 'wp-block-catpow-dialog';
        return createBlock('catpow/dialog', attributes);
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
        countPrefix = attributes.countPrefix,
        countSuffix = attributes.countSuffix,
        subCountPrefix = attributes.subCountPrefix,
        subCountSuffix = attributes.subCountSuffix,
        loopCount = attributes.loopCount,
        doLoop = attributes.doLoop,
        _attributes$EditMode = attributes.EditMode,
        EditMode = _attributes$EditMode === void 0 ? false : _attributes$EditMode,
        _attributes$AltMode = attributes.AltMode,
        AltMode = _attributes$AltMode === void 0 ? false : _attributes$AltMode;
    var primaryClass = 'wp-block-catpow-dialog';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    var classNameArray = className.split(' ');
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
    var itemClasses = ['color', {
      label: 'position',
      values: ['left', 'right']
    }, {
      label: 'type',
      filter: 'type',
      values: ['say', 'shout', 'think', 'whisper']
    }];
    var itemsCopy = items.map(function (obj) {
      return jQuery.extend(true, {}, obj);
    });
    var rtn = [];
    var imageKeys = {
      headerImage: {
        src: "headerImageSrc",
        alt: "headerImageAlt",
        code: "headerImageCode",
        items: "items"
      }
    };
    itemsCopy.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      rtn.push(wp.element.createElement(CP.Item, {
        tag: "li",
        set: setAttributes,
        attr: attributes,
        items: itemsCopy,
        index: index,
        isSelected: isSelected
      }, wp.element.createElement("header", null, wp.element.createElement("div", {
        className: "image"
      }, wp.element.createElement(CP.SelectResponsiveImage, {
        attr: attributes,
        set: setAttributes,
        keys: imageKeys.headerImage,
        index: index,
        size: "thumbnail",
        isTemplate: states.isTemplate
      })), wp.element.createElement("div", {
        className: "text"
      }, wp.element.createElement("h3", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          itemsCopy[index].title = text;
          setAttributes({
            items: itemsCopy
          });
        },
        value: item.title
      })))), wp.element.createElement("div", {
        class: "contents"
      }, wp.element.createElement("p", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          itemsCopy[index].text = text;
          setAttributes({
            items: itemsCopy
          });
        },
        value: item.text
      })))));
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
    }), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
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
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.banners || {}
    }), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: itemsCopy,
      index: attributes.currentItemIndex,
      selectiveClasses: itemClasses,
      filters: CP.filters.dialog || {}
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
        type: 'image',
        label: 'header',
        keys: imageKeys.headerImage,
        cond: true
      }, {
        type: 'text',
        key: 'headerImageCode',
        cond: states.isTemplate
      }, {
        type: 'text',
        key: 'title',
        cond: true
      }, {
        type: 'text',
        key: 'text',
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
        _attributes$classes2 = attributes.classes,
        classes = _attributes$classes2 === void 0 ? '' : _attributes$classes2,
        countPrefix = attributes.countPrefix,
        countSuffix = attributes.countSuffix,
        subCountPrefix = attributes.subCountPrefix,
        subCountSuffix = attributes.subCountSuffix,
        linkUrl = attributes.linkUrl,
        linkText = attributes.linkText,
        loopParam = attributes.loopParam,
        doLoop = attributes.doLoop;

    var classArray = _.uniq(classes.split(' '));

    var states = CP.wordsToFlags(classes);
    var imageKeys = {
      headerImage: {
        src: "headerImageSrc",
        alt: "headerImageAlt",
        code: "headerImageCode",
        items: "items"
      }
    };
    var rtn = [];
    items.map(function (item, index) {
      rtn.push(wp.element.createElement("li", {
        className: item.classes
      }, wp.element.createElement("header", null, wp.element.createElement("div", {
        class: "image"
      }, wp.element.createElement(CP.ResponsiveImage, {
        attr: attributes,
        keys: imageKeys.headerImage,
        index: index,
        isTemplate: states.isTemplate
      })), wp.element.createElement("div", {
        className: "text"
      }, wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
        value: item.title
      })))), wp.element.createElement("div", {
        class: "contents"
      }, wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
        value: item.text
      })))));
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
          countPrefix = attributes.countPrefix,
          countSuffix = attributes.countSuffix,
          subCountPrefix = attributes.subCountPrefix,
          subCountSuffix = attributes.subCountSuffix,
          linkUrl = attributes.linkUrl,
          linkText = attributes.linkText,
          loopParam = attributes.loopParam;

      var classArray = _.uniq(classes.split(' '));

      var states = CP.wordsToFlags(classes);
      var rtn = [];
      items.map(function (item, index) {
        rtn.push(wp.element.createElement("li", {
          className: item.classes
        }, wp.element.createElement("header", null, wp.element.createElement("div", {
          class: "image"
        }, wp.element.createElement("img", {
          src: item.headerImageSrc,
          alt: item.headerImageAlt
        })), wp.element.createElement("div", {
          className: "text"
        }, wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
          value: item.title
        })))), wp.element.createElement("div", {
          class: "contents"
        }, wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
          value: item.text
        })))));
      });
      return wp.element.createElement("ul", {
        className: classes
      }, states.doLoop && '[loop_template ' + loopParam + ']', rtn, states.doLoop && '[/loop_template]');
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
