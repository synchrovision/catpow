CP.config.section = {
  devices: ['sp', 'tb'],
  imageKeys: {
    navIcon: {
      src: "navIcon"
    },
    image: {
      mime: "imageMime",
      src: "imageSrc",
      alt: "imageAlt",
      srcset: "imageSrcset"
    },
    titleImage: {
      mime: "titleImageMime",
      src: "titleImageSrc",
      alt: "titleImageAlt",
      srcset: "titleImageSrcset",
      sources: "titleImageSources"
    },
    headerImage: {
      mime: "headerImageMime",
      src: "headerImageSrc",
      alt: "headerImageAlt",
      srcset: "headerImageSrcset"
    },
    headerBackgroundImage: {
      mime: "headerBackgroundImageMime",
      src: "headerBackgroundImageSrc",
      alt: "headerBackgroundImageAlt",
      srcset: "headerBackgroundImageSrcset",
      sources: "headerBackgroundImageSources"
    },
    backgroundImage: {
      src: "backgroundImageSrc",
      srcset: "backgroundImageSrcset",
      sources: "backgroundImageSources"
    }
  },
  imageSizes: {
    image: 'medium',
    headerImage: 'medium_large'
  }
};
registerBlockType('catpow/section', {
  title: '🐾 Section',
  description: __('見出しと内容のまとまりを表すセクションのブロックです。', 'catpow'),
  icon: 'id-alt',
  category: 'catpow',
  example: CP.example,
  edit: function edit(props) {
    var attributes = props.attributes,
        className = props.className,
        setAttributes = props.setAttributes;
    var useMemo = wp.element.useMemo;
    var SectionTag = attributes.SectionTag,
        HeadingTag = attributes.HeadingTag,
        color = attributes.color,
        id = attributes.id,
        classes = attributes.classes,
        prefix = attributes.prefix,
        title = attributes.title,
        lead = attributes.lead,
        headerImageMime = attributes.headerImageMime,
        headerImageSrc = attributes.headerImageSrc,
        headerImageSrcset = attributes.headerImageSrcset,
        headerImageAlt = attributes.headerImageAlt,
        headerImageCode = attributes.headerImageCode,
        headerBackgroundImageCode = attributes.headerBackgroundImageCode,
        imageMime = attributes.imageMime,
        imageSrc = attributes.imageSrc,
        imageSrcset = attributes.imageSrcset,
        imageAlt = attributes.imageAlt,
        imageCode = attributes.imageCode,
        backgroundImageSrc = attributes.backgroundImageSrc,
        backgroundImageCode = attributes.backgroundImageCode,
        headerPatternImageCss = attributes.headerPatternImageCss,
        patternImageCss = attributes.patternImageCss,
        frameImageCss = attributes.frameImageCss,
        borderImageCss = attributes.borderImageCss,
        iconSrc = attributes.iconSrc,
        iconAlt = attributes.iconAlt;
    var states = CP.wordsToFlags(classes);
    var _CP$config$section = CP.config.section,
        devices = _CP$config$section.devices,
        imageKeys = _CP$config$section.imageKeys,
        imageSizes = _CP$config$section.imageSizes;
    CP.inheritColor(props, ['iconSrc', 'patternImageCss', 'headerPatternImageCss', 'frameImageCss', 'borderImageCss']);
    CP.manageStyleData(props, ['patternImageCss', 'headerPatternImageCss', 'frameImageCss', 'borderImageCss']);
    var selectiveClasses = useMemo(function () {
      var _CP$config$section2 = CP.config.section,
          devices = _CP$config$section2.devices,
          imageKeys = _CP$config$section2.imageKeys,
          imageSizes = _CP$config$section2.imageSizes;
      var selectiveClasses = [{
        name: 'sectionTag',
        input: 'buttons',
        key: 'SectionTag',
        label: __('セクションタグ', 'catpow'),
        values: ['article', 'section', 'aside', 'div']
      }, {
        name: 'headingTag',
        input: 'buttons',
        key: 'HeadingTag',
        label: __('見出しタグ', 'catpow'),
        values: ['h2', 'h3', 'h4'],
        effect: function effect(val, states, _ref) {
          var set = _ref.set;

          for (var key in states) {
            if (key.substr(0, 5) === 'level') {
              states[key] = false;
            }
          }

          if (/^h\d$/.test(val)) {
            states['level' + val[1]] = true;
          }

          set({
            classes: CP.flagsToWords(states)
          });
        }
      }, {
        name: 'type',
        label: __('タイプ', 'catpow'),
        type: 'gridbuttons',
        values: ['scene', 'article', 'column'],
        sub: {
          scene: ['color', {
            name: 'prefix',
            label: __('プレフィクス', 'catpow'),
            values: 'hasPrefix'
          }, {
            name: 'titleImage',
            label: __('タイトル画像', 'catpow'),
            values: 'hasTitleImage',
            sub: [{
              input: 'picture',
              keys: imageKeys.titleImage,
              devices: devices
            }]
          }, {
            name: 'headerImage',
            label: __('ヘッダ画像', 'catpow'),
            values: 'hasHeaderImage',
            sub: [{
              input: 'image',
              keys: imageKeys.headerImage,
              size: imageSizes.headerImage
            }]
          }, {
            name: 'headerBackgroundImage',
            label: __('ヘッダ背景画像', 'catpow'),
            values: 'hasHeaderBackgroundImage',
            sub: [{
              input: 'picture',
              label: __('背景画像', 'catpow'),
              keys: imageKeys.headerBackgroundImage,
              devices: devices
            }, {
              label: __('薄く', 'catpow'),
              values: 'paleHeaderBG'
            }]
          }, {
            name: 'inverseText',
            label: __('抜き色文字', 'catpow'),
            values: 'inverseText',
            sub: [{
              label: __('ヘッダ背景色', 'catpow'),
              values: 'hasHeaderBackgroundColor',
              sub: [{
                label: __('パターン画像', 'catpow'),
                values: 'hasHeaderPatternImage',
                sub: [{
                  input: 'pattern',
                  css: 'headerPatternImageCss',
                  sel: '#' + id + ' > .contents > .header'
                }]
              }]
            }]
          }, {
            name: 'lead',
            label: __('リード', 'catpow'),
            values: 'hasLead'
          }, {
            name: 'backgroundImage',
            label: __('背景画像', 'catpow'),
            values: 'hasBackgroundImage',
            sub: [{
              input: 'picture',
              label: __('背景画像', 'catpow'),
              keys: imageKeys.backgroundImage,
              devices: devices
            }, {
              name: 'paleBG',
              label: __('薄く', 'catpow'),
              values: 'paleBG'
            }]
          }, {
            name: 'backgroundColor',
            label: __('背景色', 'catpow'),
            values: 'hasBackgroundColor'
          }, {
            name: 'navIcon',
            label: __('メニューアイコン', 'catpow'),
            values: 'hasNavIcon',
            sub: [{
              input: 'image',
              label: __('アイコン', 'catpow'),
              keys: imageKeys.navIcon,
              size: 'thumbnail'
            }]
          }, {
            name: 'template',
            label: __('テンプレート', 'catpow'),
            values: 'isTemplate',
            sub: [{
              name: 'headerImageCode',
              input: 'text',
              label: __('ヘッダ画像コード', 'catpow'),
              key: 'headerImageCode',
              cond: 'hasHeaderImage'
            }, {
              name: 'headerBackgroundImageCode',
              input: 'text',
              label: __('ヘッダ背景画像コード', 'catpow'),
              key: 'headerBackgroundImageCode',
              cond: 'hasHeaderBackgroundImage'
            }, {
              name: 'backgroundImageCode',
              input: 'text',
              label: __('背景画像コード', 'catpow'),
              key: 'backgroundImageCode',
              cond: 'hasBackgroundImage'
            }]
          }],
          article: ['color', {
            name: 'level',
            type: 'buttons',
            label: __('レベル', 'catpow'),
            values: {
              level2: '2',
              level3: '3',
              level4: '4'
            }
          }, {
            name: 'headingType',
            type: 'gridbuttons',
            label: __('見出しタイプ', 'catpow'),
            filter: 'heading_type',
            values: ['header', 'headline', 'catch']
          }, {
            name: 'headerImage',
            label: __('ヘッダ画像', 'catpow'),
            values: 'hasHeaderImage',
            sub: [{
              input: 'image',
              keys: imageKeys.headerImage,
              size: imageSizes.headerImage,
              cond: function cond(states, _ref2) {
                var attr = _ref2.attr;
                return !states.isTemplate || !attr.headerImageCode;
              }
            }]
          }, {
            name: 'lead',
            label: __('リード', 'catpow'),
            values: 'hasLead'
          }, {
            name: 'backgroundImage',
            label: __('背景画像', 'catpow'),
            values: 'hasBackgroundImage',
            sub: [{
              input: 'picture',
              keys: imageKeys.backgroundImage,
              devices: devices,
              cond: function cond(states, _ref3) {
                var attr = _ref3.attr;
                return !states.isTemplate || !attr.backgroundImageCode;
              }
            }, {
              label: __('薄く', 'catpow'),
              values: 'paleBG'
            }]
          }, {
            name: 'backgroundColor',
            label: __('背景色', 'catpow'),
            values: 'hasBackgroundColor'
          }, {
            name: 'navIcon',
            label: __('メニューアイコン', 'catpow'),
            values: 'hasNavIcon',
            sub: [{
              input: 'image',
              label: __('アイコン', 'catpow'),
              keys: imageKeys.navIcon,
              size: 'thumbnail'
            }]
          }, {
            name: 'patternImage',
            label: __('パターン画像', 'catpow'),
            values: 'hasPatternImage',
            sub: [{
              input: 'pattern',
              css: 'patternImageCss',
              sel: '#' + id,
              color: color
            }]
          }, {
            name: 'frameImage',
            label: __('フレーム画像', 'catpow'),
            values: 'hasFrameImage',
            sub: [{
              input: 'frame',
              css: 'frameImageCss',
              sel: '#' + id,
              color: color
            }]
          }, {
            name: 'borderImage',
            label: __('ボーダー画像', 'catpow'),
            values: 'hasBorderImage',
            sub: [{
              input: 'border',
              css: 'borderImageCss',
              sel: '#' + id + ' > .contents',
              color: color
            }]
          }, {
            name: 'template',
            label: __('テンプレート', 'catpow'),
            values: 'isTemplate',
            sub: [{
              input: 'text',
              label: __('ヘッダ画像コード', 'catpow'),
              key: 'headerImageCode',
              cond: 'hasHeaderImage'
            }, {
              input: 'text',
              label: __('背景画像コード', 'catpow'),
              key: 'backgroundImageCode',
              cond: 'hasBackgroundImage'
            }]
          }],
          column: ['color', 'pattern', {
            name: 'icon',
            label: __('アイコン', 'catpow'),
            values: 'hasIcon',
            sub: [{
              input: 'icon',
              color: color
            }]
          }, {
            name: 'image',
            label: __('画像', 'catpow'),
            values: 'hasImage',
            sub: [{
              input: 'image',
              keys: imageKeys.image
            }]
          }, {
            name: 'backgroundImage',
            label: __('背景画像', 'catpow'),
            values: 'hasBackgroundImage',
            sub: [{
              input: 'picture',
              keys: imageKeys.backgroundImage,
              devices: devices,
              cond: function cond(states, _ref4) {
                var attr = _ref4.attr;
                return !states.isTemplate || !attr.backgroundImageCode;
              }
            }, {
              label: __('薄く', 'catpow'),
              values: 'paleBG'
            }]
          }, {
            name: 'border',
            label: __('線', 'catpow'),
            values: {
              no_border: __('なし', 'catpow'),
              thin_border: __('細', 'catpow'),
              bold_border: __('太', 'catpow')
            }
          }, {
            name: 'round',
            label: __('角丸', 'catpow'),
            values: 'round'
          }, {
            name: 'shadow',
            label: __('影', 'catpow'),
            values: 'shadow',
            sub: [{
              label: __('内側', 'catpow'),
              values: 'inset'
            }]
          }, {
            name: 'navIcon',
            label: __('メニューアイコン', 'catpow'),
            values: 'hasNavIcon',
            sub: [{
              input: 'image',
              label: __('アイコン', 'catpow'),
              keys: imageKeys.navIcon,
              size: 'thumbnail'
            }]
          }, {
            name: 'borderImage',
            label: __('ボーダー画像', 'catpow'),
            values: 'hasBorderImage',
            sub: [{
              input: 'border',
              css: 'borderImageCss',
              sel: '#' + id + ' > .contents',
              color: color
            }]
          }, {
            name: 'template',
            label: __('テンプレート', 'catpow'),
            values: 'isTemplate',
            sub: [{
              input: 'text',
              label: __('画像コード', 'catpow'),
              key: 'imageCode',
              cond: 'hasImage'
            }, {
              input: 'text',
              label: __('背景画像コード', 'catpow'),
              key: 'backgroundImageCode',
              cond: 'hasBackgroundImage'
            }]
          }]
        },
        bind: {
          scene: ['level2'],
          column: ['level3']
        }
      }];
      wp.hooks.applyFilters('catpow.blocks.section.selectiveClasses', CP.finderProxy(selectiveClasses));
      return selectiveClasses;
    }, []);
    var level = CP.getNumberClass({
      attr: attributes
    }, 'level');
    return [wp.element.createElement(BlockControls, null, wp.element.createElement(CP.AlignClassToolbar, {
      set: setAttributes,
      attr: attributes
    })), wp.element.createElement(SectionTag, {
      id: id,
      className: classes
    }, states.hasImage && wp.element.createElement("div", {
      class: "image"
    }, states.isTemplate && imageCode ? wp.element.createElement(CP.DummyImage, {
      text: imageCode
    }) : wp.element.createElement(CP.SelectResponsiveImage, {
      attr: attributes,
      set: setAttributes,
      keys: imageKeys.image,
      size: imageSizes.image
    })), wp.element.createElement("div", {
      class: "contents"
    }, wp.element.createElement("header", {
      class: "header"
    }, wp.element.createElement("div", {
      class: "title"
    }, states.hasIcon && wp.element.createElement(CP.OutputIcon, {
      item: attributes
    }), states.hasPrefix && wp.element.createElement("div", {
      class: "prefix"
    }, wp.element.createElement(RichText, {
      tagName: "div",
      value: prefix,
      onChange: function onChange(prefix) {
        return setAttributes({
          prefix: prefix
        });
      }
    })), states.hasHeaderImage && wp.element.createElement("div", {
      class: "image"
    }, states.isTemplate && headerImageCode ? wp.element.createElement(CP.DummyImage, {
      text: headerImageCode
    }) : wp.element.createElement(CP.SelectResponsiveImage, {
      set: setAttributes,
      attr: attributes,
      keys: imageKeys.headerImage,
      size: imageSizes.headerImage
    })), states.hasTitleImage ? wp.element.createElement(HeadingTag, {
      class: "titleImage"
    }, states.isTemplate && titleImageCode ? wp.element.createElement(CP.DummyImage, {
      text: titleImageCode
    }) : wp.element.createElement(CP.SelectResponsiveImage, {
      set: setAttributes,
      attr: attributes,
      keys: imageKeys.titleImage,
      devices: devices
    })) : wp.element.createElement(HeadingTag, {
      className: "heading"
    }, wp.element.createElement(RichText, {
      tagName: "div",
      value: title,
      onChange: function onChange(title) {
        return setAttributes({
          title: title
        });
      }
    })), states.hasLead && wp.element.createElement("p", {
      className: "lead"
    }, wp.element.createElement(RichText, {
      tagName: "div",
      value: lead,
      onChange: function onChange(lead) {
        return setAttributes({
          lead: lead
        });
      }
    }))), states.hasHeaderBackgroundImage && wp.element.createElement("div", {
      class: "background"
    }, states.isTemplate && headerBackgroundImageCode ? wp.element.createElement(CP.DummyImage, {
      text: headerBackgroundImageCode
    }) : wp.element.createElement(CP.SelectResponsiveImage, {
      set: setAttributes,
      attr: attributes,
      keys: imageKeys.headerBackgroundImage
    }))), wp.element.createElement("div", {
      class: "text"
    }, wp.element.createElement(InnerBlocks, null))), states.hasBackgroundImage && wp.element.createElement("div", {
      class: "background"
    }, states.isTemplate && backgroundImageCode ? wp.element.createElement(CP.DummyImage, {
      text: backgroundImageCode
    }) : wp.element.createElement(CP.SelectResponsiveImage, {
      set: setAttributes,
      attr: attributes,
      keys: imageKeys.backgroundImage
    })), states.hasPatternImage && wp.element.createElement("style", null, patternImageCss), states.hasHeaderPatternImage && wp.element.createElement("style", null, headerPatternImageCss), states.hasBorderImage && wp.element.createElement("style", null, borderImageCss), states.hasFrameImage && wp.element.createElement("style", null, frameImageCss)), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: __('クラス', 'catpow'),
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.section || {}
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
    })), wp.element.createElement(PanelBody, {
      title: "CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: __('クラス', 'catpow'),
      onChange: function onChange(classes) {
        return setAttributes({
          classes: classes
        });
      },
      value: classes
    })))];
  },
  save: function save(_ref5) {
    var attributes = _ref5.attributes,
        className = _ref5.className,
        setAttributes = _ref5.setAttributes;
    var SectionTag = attributes.SectionTag,
        HeadingTag = attributes.HeadingTag,
        id = attributes.id,
        navIcon = attributes.navIcon,
        classes = attributes.classes,
        prefix = attributes.prefix,
        title = attributes.title,
        lead = attributes.lead,
        headerImageSrc = attributes.headerImageSrc,
        headerImageSrcset = attributes.headerImageSrcset,
        headerImageAlt = attributes.headerImageAlt,
        headerImageCode = attributes.headerImageCode,
        headerBackgroundImageCode = attributes.headerBackgroundImageCode,
        imageSrc = attributes.imageSrc,
        imageSrcset = attributes.imageSrcset,
        imageAlt = attributes.imageAlt,
        imageCode = attributes.imageCode,
        backgroundImageSrc = attributes.backgroundImageSrc,
        backgroundImageCode = attributes.backgroundImageCode,
        headerPatternImageCss = attributes.headerPatternImageCss,
        patternImageCss = attributes.patternImageCss,
        frameImageCss = attributes.frameImageCss,
        borderImageCss = attributes.borderImageCss,
        iconSrc = attributes.iconSrc,
        iconAlt = attributes.iconAlt;
    var level = CP.getNumberClass({
      attr: attributes
    }, 'level');
    var states = CP.wordsToFlags(classes);
    var _CP$config$section3 = CP.config.section,
        devices = _CP$config$section3.devices,
        imageKeys = _CP$config$section3.imageKeys,
        imageSizes = _CP$config$section3.imageSizes;
    return wp.element.createElement(SectionTag, {
      id: id,
      className: classes,
      "data-icon": navIcon
    }, states.hasImage && wp.element.createElement("div", {
      class: "image"
    }, states.isTemplate && imageCode ? imageCode : wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.image,
      size: "medium_large"
    })), wp.element.createElement("div", {
      class: "contents"
    }, wp.element.createElement("header", {
      class: "header"
    }, wp.element.createElement("div", {
      class: "title"
    }, states.hasIcon && wp.element.createElement(CP.OutputIcon, {
      item: attributes
    }), states.hasPrefix && wp.element.createElement("div", {
      class: "prefix"
    }, wp.element.createElement(RichText.Content, {
      value: prefix
    })), states.hasHeaderImage && wp.element.createElement("div", {
      class: "image"
    }, states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.headerImage
    })), states.hasTitleImage ? wp.element.createElement(HeadingTag, {
      class: "titleImage"
    }, states.isTemplate && titleImageCode ? titleImageCode : wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.titleImage,
      devices: devices
    })) : wp.element.createElement(HeadingTag, {
      className: "heading"
    }, wp.element.createElement(RichText.Content, {
      value: title
    })), states.hasLead && wp.element.createElement("p", {
      className: "lead"
    }, wp.element.createElement(RichText.Content, {
      value: lead
    }))), states.hasHeaderBackgroundImage && wp.element.createElement("div", {
      class: "background"
    }, states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.headerBackgroundImage,
      devices: devices
    }))), wp.element.createElement("div", {
      class: "text"
    }, wp.element.createElement(InnerBlocks.Content, null))), states.hasBackgroundImage && wp.element.createElement("div", {
      class: "background"
    }, states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
      attr: attributes,
      keys: imageKeys.backgroundImage,
      devices: devices
    })), states.hasPatternImage && wp.element.createElement("style", {
      className: "patternImageCss"
    }, patternImageCss), states.hasHeaderPatternImage && wp.element.createElement("style", {
      className: "headerPatternImageCss"
    }, headerPatternImageCss), states.hasBorderImage && wp.element.createElement("style", {
      className: "borderImageCss"
    }, borderImageCss), states.hasFrameImage && wp.element.createElement("style", {
      className: "frameImageCss"
    }, frameImageCss));
  }
});
