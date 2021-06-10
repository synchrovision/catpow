registerBlockType('catpow/panel', {
  title: '🐾 Panel',
  description: '大小の矩形パネルをレイアウトします。',
  icon: 'grid-view',
  category: 'catpow',
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'ul',
      attribute: 'class',
      default: 'wp-block-catpow-panel panel tile column1 grid32'
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
          selector: '.image [src]',
          attribute: 'src'
        },
        alt: {
          source: 'attribute',
          selector: '.image [src]',
          attribute: 'alt'
        },
        title: {
          source: 'children',
          selector: '.text h3'
        },
        text: {
          source: 'children',
          selector: '.text p'
        },
        iconSrc: {
          source: 'attribute',
          selector: '.text .icon [src]',
          attribute: 'src'
        },
        iconAlt: {
          source: 'attribute',
          selector: '.text .icon [src]',
          attribute: 'alt'
        },
        linkUrl: {
          source: 'attribute',
          selector: '.text .link a',
          attribute: 'href'
        },
        linkText: {
          source: 'text',
          selector: '.text .link a'
        }
      },
      default: babelHelpers.toConsumableArray(Array(8)).map(function (n, i) {
        return {
          classes: 'item hasIcon hasLink hasTitle rspan1 cspan1 color' + i * 2,
          src: cp.theme_url + '/images/dummy.jpg',
          alt: 'dummy',
          title: ['Title'],
          text: ['Text'],
          iconSrc: cp.theme_url + '/images/dummy_icon.svg',
          iconAlt: 'dummy',
          linkUrl: cp.home_url
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
    var classes = attributes.classes,
        _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items;
    var primaryClass = 'wp-block-catpow-panel';

    var classArray = _.uniq(classes.split(' '));

    var imageKeys = {
      icon: {
        src: "iconSrc",
        alt: "iconAlt",
        items: "items"
      },
      image: {
        src: "src",
        alt: "alt",
        items: "items"
      }
    };
    var selectiveClasses = [{
      label: 'タイプ',
      filter: 'type',
      values: {
        tile: 'タイル',
        menu: 'メニュー'
      },
      item: {
        tile: ['color', {
          label: '白文字',
          values: 'brightText',
          sub: [{
            label: '色付き背景',
            values: 'colorBG'
          }]
        }, {
          label: 'アイコン',
          values: 'hasIcon'
        }, {
          label: 'タイトル',
          values: 'hasTitle'
        }, {
          label: '文章',
          values: 'hasText'
        }, {
          label: '画像',
          values: 'hasImage',
          sub: [{
            label: '画像を薄く',
            values: 'paleImage'
          }, {
            label: '画像',
            input: 'image',
            keys: imageKeys.image,
            size: 'vga'
          }]
        }, {
          label: 'リンク',
          values: 'hasLink',
          sub: [{
            label: '外部リンク',
            values: 'linkExternal'
          }]
        }, {
          label: '縦サイズ',
          values: {
            rspan1: '1',
            rspan2: '2',
            rspan3: '3'
          }
        }, {
          label: '横サイズ',
          values: {
            cspan1: '1',
            cspan2: '2',
            cspan3: '3'
          }
        }],
        menu: ['color', {
          label: 'アイコン',
          values: 'hasIcon'
        }, {
          label: 'タイトル',
          values: 'hasTitle'
        }, {
          label: '文章',
          values: 'hasText'
        }, {
          label: '画像',
          values: 'hasImage',
          sub: [{
            label: '画像',
            input: 'image',
            keys: imageKeys.image,
            size: 'vga'
          }]
        }, {
          label: 'リンク',
          values: 'hasLink',
          sub: [{
            label: '外部リンク',
            values: 'linkExternal'
          }]
        }, {
          label: '縦サイズ',
          values: {
            rspan1: '1',
            rspan2: '2',
            rspan3: '3'
          }
        }, {
          label: '横サイズ',
          values: {
            cspan1: '1',
            cspan2: '2',
            cspan3: '3'
          }
        }]
      },
      bind: {
        tile: ['panel'],
        menu: ['panel']
      }
    }, {
      label: 'サイズ',
      values: {
        column1: '1/1',
        column2: '1/2',
        column3: '1/3',
        column4: '1/4'
      }
    }, {
      label: 'カラム数',
      values: {
        grid18: '1-2-3-6-9-18',
        grid24: '1-2-3-4-6-8-12-24',
        grid27: '1-3-9-27',
        grid32: '1-2-4-8-16-32'
      }
    }];
    var itemsCopy = items.map(function (obj) {
      return jQuery.extend(true, {}, obj);
    });
    var rtn = [];
    var totalGrid = 0;
    itemsCopy.map(function (item, index) {
      if (!item.controlClasses) {
        item.controlClasses = 'control';
      }

      var itemStates = {
        hasIcon: false,
        hasTitle: false,
        hasText: false,
        hasImage: false,
        hasLink: false,
        linkExternal: false
      };
      var itemClassArray = (item.classes || '').split(' ');
      Object.keys(itemStates).forEach(function (key) {
        this[key] = itemClassArray.indexOf(key) !== -1;
      }, itemStates);
      totalGrid += (CP.getNumberClass({
        attr: item
      }, 'rspan') || 1) * (CP.getNumberClass({
        attr: item
      }, 'cspan') || 1);
      rtn.push(wp.element.createElement(CP.Item, {
        tag: "li",
        set: setAttributes,
        attr: attributes,
        items: itemsCopy,
        index: index,
        isSelected: isSelected
      }, itemStates.hasImage && wp.element.createElement("div", {
        className: "image"
      }, wp.element.createElement(CP.SelectResponsiveImage, {
        attr: attributes,
        set: setAttributes,
        keys: imageKeys.image,
        index: index,
        size: "vga"
      })), wp.element.createElement("div", {
        class: "text"
      }, itemStates.hasIcon && wp.element.createElement("div", {
        className: "icon"
      }, wp.element.createElement(CP.SelectResponsiveImage, {
        attr: attributes,
        set: setAttributes,
        keys: imageKeys.icon,
        index: index,
        size: "thumbnail"
      })), itemStates.hasTitle && wp.element.createElement("h3", null, wp.element.createElement(RichText, {
        onChange: function onChange(title) {
          itemsCopy[index].title = title;
          setAttributes({
            items: itemsCopy
          });
        },
        value: item.title
      })), itemStates.hasText && wp.element.createElement("p", null, wp.element.createElement(RichText, {
        onChange: function onChange(text) {
          itemsCopy[index].text = text;
          setAttributes({
            items: itemsCopy
          });
        },
        value: item.text
      })), itemStates.hasLink && wp.element.createElement("div", {
        className: "link"
      }, wp.element.createElement(TextControl, {
        onChange: function onChange(linkUrl) {
          itemsCopy[index].linkUrl = linkUrl;
          setAttributes({
            items: itemsCopy
          });
        },
        value: item.linkUrl
      })))));
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
    })), wp.element.createElement("ul", {
      class: attributes.EditMode ? primaryClass + ' edit' : classes
    }, rtn), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses
    }), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30D1\u30CD\u30EB",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: itemsCopy,
      index: attributes.currentItemIndex,
      triggerClasses: selectiveClasses[0]
    }), wp.element.createElement(PanelBody, {
      title: "info",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement("p", null, "\u5408\u8A08\u30B0\u30EA\u30C3\u30C9\u6570\uFF1A", totalGrid)), wp.element.createElement(PanelBody, {
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
    })), wp.element.createElement(CP.ItemControlInfoPanel, null))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    var _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2;
    var rtn = [];
    items.map(function (item, index) {
      var itemStates = {
        hasIcon: false,
        hasTitle: false,
        hasText: false,
        hasImage: false,
        hasLink: false,
        linkExternal: false
      };
      var itemClassArray = (item.classes || '').split(' ');
      Object.keys(itemStates).forEach(function (key) {
        this[key] = itemClassArray.indexOf(key) !== -1;
      }, itemStates);
      rtn.push(wp.element.createElement("li", {
        class: item.classes
      }, itemStates.hasImage && wp.element.createElement("div", {
        className: "image"
      }, wp.element.createElement("img", {
        src: item.src,
        alt: item.alt
      })), wp.element.createElement("div", {
        class: "text"
      }, itemStates.hasIcon && wp.element.createElement("div", {
        class: "icon"
      }, wp.element.createElement("img", {
        src: item.iconSrc,
        alt: item.iconAlt
      })), itemStates.hasTitle && wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
        value: item.title
      })), itemStates.hasText && wp.element.createElement("p", null, wp.element.createElement(RichText.Content, {
        value: item.text
      })), itemStates.hasLink && wp.element.createElement("div", {
        className: "link"
      }, wp.element.createElement("a", {
        href: item.linkUrl,
        target: itemStates.linkExternal ? '_brank' : false,
        rel: itemStates.linkExternal ? 'noopener noreferrer' : 'bookmark'
      }, " ")))));
    });
    return wp.element.createElement("ul", {
      className: classes
    }, rtn);
  }
});
