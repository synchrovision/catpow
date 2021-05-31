CP.config.graphics = {
  devices: ['sp', 'tb'],
  devicesForCss: ['pc', 'tb', 'sp'],
  imageKeys: {
    base: {
      src: "src",
      srcset: "srcset",
      sources: 'sources',
      alt: "alt"
    },
    image: {
      src: "src",
      srcset: "srcset",
      sources: 'sources',
      alt: "alt",
      items: "items"
    }
  },
  getCssDatas: function getCssDatas(attr, states) {
    var id = attr.id,
        items = attr.items,
        heights = attr.heights;
    var devicesForCss = CP.config.graphics.devicesForCss;
    var rtn = {};
    devicesForCss.map(function (device) {
      rtn[device] = {};
    });

    if (!states.hasBaseImage) {
      heights.split(',').map(function (height, deviceIndex) {
        rtn[devicesForCss[deviceIndex]]['#' + id + ' .base'] = {
          'padding-top': height + '%'
        };
      });
    }

    items.map(function (item, index) {
      item.rect.split(',').map(function (rect, deviceIndex) {
        var bnd = rect.split(' ').map(function (val) {
          return val + '%';
        });
        rtn[devicesForCss[deviceIndex]]['#' + id + '_item_' + index] = {
          left: bnd[0],
          top: bnd[1],
          width: bnd[2]
        };
      });
    });
    return rtn;
  },
  renderCssDatas: function renderCssDatas(cssDatas) {
    return CP.config.graphics.devicesForCss.map(function (device) {
      if (device === 'pc') {
        return CP.createStyleCode(cssDatas[device]);
      }

      return '@media' + CP.devices[device].media_query + '{' + CP.createStyleCode(cssDatas[device]) + '}';
    }).join('');
  },
  parseRectAttr: function parseRectAttr(rect) {
    return rect.split(',').map(function (rect) {
      return rect.split(' ');
    });
  },
  getRectAttr: function getRectAttr(rectDatas) {
    return rectDatas.map(function (rectData) {
      return rectData.join(' ');
    }).join(',');
  }
};
registerBlockType('catpow/graphics', {
  title: '🐾 graphics',
  description: '画像を自由にレイアウトします。',
  icon: 'format-image',
  category: 'catpow',
  attributes: {
    id: {
      source: 'attribute',
      selector: '.wp-block-catpow-graphics',
      attribute: 'id',
      default: ''
    },
    classes: {
      source: 'attribute',
      selector: '.wp-block-catpow-graphics',
      attribute: 'class',
      default: 'wp-block-catpow-graphics hasBaseImage'
    },
    src: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'src',
      default: cp.theme_url + '/images/dummy_bg.jpg'
    },
    srcset: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'srcset'
    },
    alt: {
      source: 'attribute',
      selector: '[src]',
      attribute: 'alt'
    },
    sources: CP.getPictureSoucesAttributesForDevices(CP.config.graphics.devices, '.base picture', 'dummy_bg.jpg'),
    height: {
      source: 'attribute',
      selector: '.wp-block-catpow-graphics',
      'attribute': 'data-heights',
      default: '120,80,60'
    },
    items: {
      source: 'query',
      selector: '.item',
      query: {
        classes: {
          source: 'attribute',
          attribute: 'class'
        },
        rect: {
          source: 'attribute',
          'attribute': 'data-rect'
        },
        rectSP: {
          source: 'attribute',
          'attribute': 'data-rect-sp'
        },
        src: {
          source: 'attribute',
          selector: '[src]',
          attribute: 'src'
        },
        srcset: {
          source: 'attribute',
          selector: '[src]',
          attribute: 'srcset'
        },
        alt: {
          source: 'attribute',
          selector: '[src]',
          attribute: 'alt'
        },
        sources: CP.getPictureSoucesAttributes(),
        title: {
          source: 'children',
          selector: '.title'
        },
        lead: {
          source: 'children',
          selector: '.lead'
        },
        text: {
          source: 'children',
          selector: '.text'
        },
        link: {
          source: 'attribute',
          attribute: 'href'
        }
      },
      default: [{
        id: 'graphics_image1',
        classes: 'item isImage',
        rect: '25 25 50,25 25 50,25 25 50',
        src: cp.theme_url + '/images/dummy.jpg',
        srcset: '',
        alt: '',
        sources: CP.getPictureSoucesAttributesDefaultValueForDevices(CP.config.graphics.devices),
        title: ['Title'],
        lead: ['Lead'],
        text: ['Text'],
        link: ''
      }]
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var id = attributes.id,
        _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        src = attributes.src,
        srcset = attributes.srcset,
        alt = attributes.alt,
        heights = attributes.heights,
        _attributes$items = attributes.items,
        items = _attributes$items === void 0 ? [] : _attributes$items,
        device = attributes.device;

    if (!id) {
      setAttributes({
        id: 'g' + new Date().getTime().toString(16)
      });
    }

    attributes.EditMode = attributes.EditMode || 'pc';
    var isModeSP = attributes.EditMode == 'sp';
    var states = CP.wordsToFlags(classes);
    var _CP$config$graphics = CP.config.graphics,
        devices = _CP$config$graphics.devices,
        devicesForCss = _CP$config$graphics.devicesForCss,
        imageKeys = _CP$config$graphics.imageKeys,
        getCssDatas = _CP$config$graphics.getCssDatas,
        renderCssDatas = _CP$config$graphics.renderCssDatas,
        parseRectAttr = _CP$config$graphics.parseRectAttr,
        getRectAttr = _CP$config$graphics.getRectAttr;
    var cssDatas = getCssDatas(attributes, states);
    var selectiveClasses = [{
      label: 'ベース画像',
      values: 'hasBaseImage',
      sub: [{
        input: 'picture',
        keys: imageKeys.base,
        devices: devices
      }]
    }, {
      label: '高さ',
      input: 'text',
      key: 'heights'
    }];
    var selectiveItemClasses = [{
      label: 'タイプ',
      filter: 'type',
      values: {
        isImage: '画像',
        isText: 'テキスト'
      },
      sub: {
        isImage: [{
          label: 'タイプ',
          filter: 'imageType',
          values: ['type1', 'type2', 'type3']
        }, {
          input: 'text',
          label: '代替テキスト',
          key: 'alt'
        }, {
          input: 'text',
          label: 'リンク',
          key: 'link'
        }, {
          input: 'picture',
          label: '画像',
          keys: imageKeys.image,
          devices: devices
        }],
        isText: [{
          label: 'タイプ',
          filter: 'textType',
          values: ['type1', 'type2', 'type3']
        }, 'color', {
          label: 'ヌキ文字',
          values: 'inverse'
        }, {
          label: '見出し',
          values: 'hasTitle'
        }, {
          label: 'リード',
          values: 'hasLead'
        }, {
          label: 'テキスト',
          values: 'hasText'
        }]
      }
    }, {
      label: 'フェードイン',
      values: 'fadeIn'
    }, {
      label: 'スライドイン',
      values: 'slideIn',
      sub: [{
        type: 'radio',
        filer: 'slideIn',
        label: '方向',
        values: {
          slideInLeft: '左',
          slideInRight: '右',
          slideInUp: '上',
          slideInDown: '下',
          slideInFront: '前',
          slideInBack: '後'
        }
      }]
    }, {
      label: '回転',
      filter: 'roll',
      values: 'roll',
      sub: [{
        type: 'radio',
        label: '方向',
        values: {
          rollLeft: '左',
          rollRight: '右'
        }
      }, {
        type: 'radio',
        label: '速度',
        values: {
          rollSlow: '遅い',
          rollFast: '速い'
        }
      }]
    }, {
      label: 'ホバー',
      filter: 'hover',
      values: 'hover',
      sub: [{
        label: 'フェード',
        values: 'hoverFade'
      }, {
        type: 'radio',
        label: '動き',
        values: {
          hoverNoMove: 'なし',
          hoverZoom: 'ズーム',
          hoverLift: 'リフト',
          hoverJump: 'ジャンプ'
        }
      }]
    }];
    var tgtItem = false;

    var save = function save() {
      setAttributes({
        items: JSON.parse(JSON.stringify(items))
      });
    };

    var onMouseDown = function onMouseDown(e) {
      var tgt = e.target;
      var itemNode = tgt.closest('.item');

      if (!itemNode) {
        tgtItem = false;
        setAttributes({
          currentItemIndex: i
        });
        return;
      }

      var i = itemNode.dataset.index;
      tgtItem = {
        node: itemNode
      };

      if (tgt.classList.contains('pos')) {
        tgtItem.type = 'pos';
      }

      if (tgt.classList.contains('del')) {
        tgtItem.type = 'del';
      }

      if (tgt.classList.contains('dup')) {
        tgtItem.type = 'dup';
      }

      if (tgt.classList.contains('bnd')) {
        tgtItem.type = 'bnd';
      }

      tgtItem.node.style.animation = 'none';
      tgtItem.node.style.transition = 'none';
      tgtItem.node.style.transform = 'scale(1)';

      if (attributes.currentItemIndex != i) {
        setAttributes({
          currentItemIndex: i
        });
      }
    };

    var onMouseMove = function onMouseMove(e) {
      if (!tgtItem) {
        return;
      }

      var bnd = e.currentTarget.getBoundingClientRect();

      if (tgtItem.type === 'pos') {
        tgtItem.node.style.left = e.clientX - bnd.left + 'px';
        tgtItem.node.style.top = e.clientY - bnd.top + 'px';
      } else if (tgtItem.type === 'bnd') {
        var tgtBnd = tgtItem.node.getBoundingClientRect();
        tgtItem.node.style.width = e.clientX - tgtBnd.left + 'px';
      }
    };

    var onMouseUp = function onMouseUp(e) {
      if (tgtItem) {
        var bnd = e.currentTarget.getBoundingClientRect();
        var i = tgtItem.node.dataset.index;
        var rectDatas = parseRectAttr(items[i].rect);
        var deviceIndex = device ? devicesForCss.indexOf(device) : 0;
        var rectData = rectDatas[deviceIndex];

        if (tgtItem.type === 'pos') {
          if (e.altKey) {
            items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
          }

          rectData[0] = parseInt((e.clientX - bnd.left) / bnd.width * 1000) / 10;
          rectData[1] = parseInt((e.clientY - bnd.top) / bnd.height * 1000) / 10;
          items[i].rect = getRectAttr(rectDatas);
          tgtItem.node.style.left = '';
          tgtItem.node.style.top = '';
        } else if (tgtItem.type === 'del') {
          items.splice(i, 1);
        } else if (tgtItem.type === 'dup') {
          items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
          rectData[0] = parseFloat(rectData[0]) + 1;
          rectData[1] = parseFloat(rectData[1]) + 1;
          items[i].rect = getRectAttr(rectDatas);
        } else if (tgtItem.type === 'bnd') {
          var tgtBnd = tgtItem.node.getBoundingClientRect();
          rectData[2] = parseInt((e.clientX - tgtBnd.left) / bnd.width * 1000) / 10;
          items[i].rect = getRectAttr(rectDatas);
          tgtItem.node.style.width = '';
        }

        tgtItem.node.style.animation = '';
        tgtItem.node.style.transition = '';
        tgtItem.node.style.transform = '';
        tgtItem = false;
        save();
      }
    };

    var onDoubleClick = function onDoubleClick(e) {
      var tgt = e.target;
    };

    return wp.element.createElement(Fragment, null, wp.element.createElement(CP.SelectDeviceToolbar, {
      attr: attributes,
      set: setAttributes,
      devices: devices
    }), wp.element.createElement("div", {
      id: id,
      className: classes + (device ? ' alt_content ' + device : ''),
      onMouseDown: onMouseDown,
      onMouseMove: onMouseMove,
      onMouseUp: onMouseUp,
      onDoubleClick: onDoubleClick
    }, device && wp.element.createElement("div", {
      class: "label"
    }, wp.element.createElement(Icon, {
      icon: CP.devices[device].icon
    })), wp.element.createElement("div", {
      class: "base"
    }, states.hasBaseImage && wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.base,
      devices: devices,
      device: device
    })), items.map(function (item, index) {
      var itemStates = CP.wordsToFlags(item.classes);
      var itemClasses = item.classes;
      var itemSelected = attributes.currentItemIndex == index;

      if (isSelected) {
        itemClasses += ' visible active actived';
      }

      if (itemSelected) {
        itemClasses += ' selected';
      }

      var itemBody = function itemBody() {
        if (itemSelected) {
          if (itemStates.isText) {
            return wp.element.createElement(Fragment, null, itemStates.hasTitle && wp.element.createElement("h3", {
              className: "title"
            }, wp.element.createElement(RichText, {
              placeholder: "Title",
              onChange: function onChange(title) {
                console.log(title);
                item.title = title;
                save();
              },
              value: item.title
            })), itemStates.hasLead && wp.element.createElement("h4", {
              className: "lead"
            }, wp.element.createElement(RichText, {
              placeholder: "Lead",
              onChange: function onChange(lead) {
                item.lead = lead;
                save();
              },
              value: item.lead
            })), itemStates.hasText && wp.element.createElement("p", {
              className: "text"
            }, wp.element.createElement(RichText, {
              placeholder: "Text",
              onChange: function onChange(text) {
                item.text = text;
                save();
              },
              value: item.text
            })));
          }

          return wp.element.createElement(CP.SelectResponsiveImage, {
            attr: attributes,
            set: setAttributes,
            devices: devices,
            device: device,
            keys: imageKeys.image,
            index: index
          });
        }

        if (itemStates.isText) {
          return wp.element.createElement(Fragment, null, itemStates.hasTitle && wp.element.createElement("h3", {
            className: "title"
          }, wp.element.createElement(RichText.Content, {
            value: item.title
          })), itemStates.hasLead && wp.element.createElement("h4", {
            className: "lead"
          }, wp.element.createElement(RichText.Content, {
            value: item.lead
          })), itemStates.hasText && wp.element.createElement("p", {
            className: "text"
          }, wp.element.createElement(RichText.Content, {
            value: item.text
          })));
        }

        return wp.element.createElement(CP.ResponsiveImage, {
          attr: attributes,
          keys: imageKeys.image,
          devices: devices,
          device: device,
          index: index
        });
      };

      return el('span', {
        id: id + '_item_' + index,
        className: itemClasses,
        'data-index': index,
        'data-rect': item.rect
      }, wp.element.createElement(Fragment, null, itemBody(), isSelected && itemSelected && wp.element.createElement("div", {
        className: "control"
      }, wp.element.createElement("div", {
        className: "pos"
      }, wp.element.createElement(Icon, {
        icon: "move"
      })), wp.element.createElement("div", {
        className: "del"
      }, wp.element.createElement(Icon, {
        icon: "dismiss"
      })), wp.element.createElement("div", {
        className: "dup"
      }, wp.element.createElement(Icon, {
        icon: "plus-alt"
      })), wp.element.createElement("div", {
        className: "bnd"
      }, wp.element.createElement(Icon, {
        icon: "leftright"
      })))));
    }), wp.element.createElement("style", null, device ? CP.createStyleCode(cssDatas[device]) : renderCssDatas(cssDatas))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.graphics || {}
    }), wp.element.createElement(PanelBody, {
      title: "ID",
      icon: "admin-links",
      initialOpen: false
    }, wp.element.createElement(TextControl, {
      label: "ID",
      onChange: function onChange(id) {
        setAttributes({
          id: id
        });
      },
      value: id
    })), wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30A2\u30A4\u30C6\u30E0",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      items: items,
      index: attributes.currentItemIndex,
      selectiveClasses: selectiveItemClasses,
      filters: CP.filters.graphics || {}
    }), items[attributes.currentItemIndex] && wp.element.createElement(PanelBody, {
      title: "ITEM CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: "\u30AF\u30E9\u30B9",
      onChange: function onChange(classes) {
        items[attributes.currentItemIndex].classes = classes;
        save();
      },
      value: items[attributes.currentItemIndex].classes
    })), wp.element.createElement(CP.ItemControlInfoPanel, null)));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var id = attributes.id,
        classes = attributes.classes,
        heights = attributes.heights,
        heightSP = attributes.heightSP,
        _attributes$items2 = attributes.items,
        items = _attributes$items2 === void 0 ? [] : _attributes$items2;
    var states = CP.wordsToFlags(classes);
    var _CP$config$graphics2 = CP.config.graphics,
        devices = _CP$config$graphics2.devices,
        imageKeys = _CP$config$graphics2.imageKeys,
        getCssDatas = _CP$config$graphics2.getCssDatas,
        renderCssDatas = _CP$config$graphics2.renderCssDatas;
    var cssDatas = getCssDatas(attributes, states);
    return wp.element.createElement("div", {
      id: id,
      className: classes,
      "data-heights": heights
    }, wp.element.createElement("div", {
      class: "base"
    }, states.hasBaseImage && wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.base,
      devices: devices
    })), items.map(function (item, index) {
      var itemStates = CP.wordsToFlags(item.classes);

      var itemBody = function itemBody() {
        if (itemStates.isText) {
          return wp.element.createElement(Fragment, null, itemStates.hasTitle && wp.element.createElement("h3", {
            className: "title"
          }, wp.element.createElement(RichText.Content, {
            value: item.title
          })), itemStates.hasLead && wp.element.createElement("h4", {
            className: "lead"
          }, wp.element.createElement(RichText.Content, {
            value: item.lead
          })), itemStates.hasText && wp.element.createElement("p", {
            className: "text"
          }, wp.element.createElement(RichText.Content, {
            value: item.text
          })));
        }

        return wp.element.createElement(CP.ResponsiveImage, {
          attr: attributes,
          keys: imageKeys.image,
          index: index,
          devices: devices
        });
      };

      return el(item.link ? 'a' : 'span', {
        id: id + '_item_' + index,
        className: item.classes,
        href: item.link,
        'data-rect': item.rect
      }, itemBody());
    }), wp.element.createElement("style", null, renderCssDatas(cssDatas)));
  }
});
