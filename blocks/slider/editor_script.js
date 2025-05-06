(() => {
  // ../blocks/slider/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.slider = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: "slideCode", sources: "slideSources", items: "items" },
      backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: "backgroundImageCode", sources: "backgroundImageSources", items: "items" }
    },
    imageSizes: {
      image: "vga"
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/slider", {
    title: "\u{1F43E} Slider",
    description: "\u30B9\u30E9\u30A4\u30C0\u30FC\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "video-alt3",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-slider story hasTitle hasText hasImage";
            if (!attributes.controlClasses) {
              attributes.controlClasses = "controls loop autoplay flickable";
            }
            if (!attributes.config) {
              attributes.config = "{}";
            }
            return wp.blocks.createBlock("catpow/slider", attributes);
          }
        },
        {
          type: "block",
          blocks: ["catpow/datatable"],
          isMatch: ({ rows }) => {
            const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
            return CP.isRowsConvertibleToItems(rows, block.attributes.items);
          },
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-slider story hasTitle hasText hasImage";
            const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
            attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
            return wp.blocks.createBlock("catpow/slider", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextControl, TextareaControl } = wp.components;
      const { vars, classes: classes2 = "", controlClasses = "", config, items, doLoop, EditMode = false, AltMode = false, device } = attributes;
      const states = CP.wordsToFlags(classes2);
      const controlStates = CP.wordsToFlags(controlClasses);
      const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;
      var statesClasses = [
        { label: "\u30A2\u30ED\u30FC", values: "hasArrows" },
        { label: "\u30C9\u30C3\u30C8", values: "hasDots" },
        { input: "range", label: "\u8868\u793A\u30B9\u30E9\u30A4\u30C9", json: "config", key: "initialSlide", min: 0, max: items.length - 1 }
      ];
      var animateClasses = [
        { label: "\u30EB\u30FC\u30D7", values: "loop", sub: [{ label: "\u30A2\u30A4\u30C6\u30E0\u3092\u53CD\u5FA9", values: "loopItems" }] },
        {
          label: "\u81EA\u52D5\u518D\u751F",
          values: "autoplay",
          sub: [
            { input: "range", label: "\u81EA\u52D5\u518D\u751F\u9593\u9694\uFF08\u5358\u4F4D:0.1\u79D2\uFF09", json: "config", key: "interval", coef: 100, min: 0, max: 100 },
            { input: "range", label: "\u64CD\u4F5C\u505C\u6B62\u6642\u9593\uFF08\u5358\u4F4D:0.1\u79D2\uFF09", json: "config", key: "wait", coef: 100, min: 0, max: 100 },
            { label: "\u30DB\u30D0\u30FC\u3067\u505C\u6B62", values: "stopbyhover" }
          ]
        }
      ];
      var controllerClasses = [
        { label: "\u30D5\u30EA\u30C3\u30AF\u64CD\u4F5C", values: "flickable" },
        { label: "\u30B9\u30AF\u30ED\u30FC\u30EB\u64CD\u4F5C", values: "scrollable" },
        { label: "\u9589\u3058\u308B\u64CD\u4F5C", values: "closable" }
      ];
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.slider;
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            values: ["visual", "story", "articles", "banners", "index"],
            filter: "type",
            type: "gridbuttons",
            sub: {
              visual: [
                {
                  name: "hasTitle",
                  label: "\u898B\u51FA\u3057",
                  values: "hasTitle",
                  sub: [
                    { name: "subTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
                    { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
                  ]
                },
                "textColor",
                {
                  name: "image",
                  type: "buttons",
                  label: "\u753B\u50CF",
                  values: { hasImage: "\u30A4\u30E1\u30FC\u30B8\u753B\u50CF", hasSlide: "\u30B9\u30E9\u30A4\u30C9\u753B\u50CF" },
                  sub: {
                    hasImage: [{ name: "thumbnail", label: "\u30B5\u30E0\u30CD\u30FC\u30EB", values: "hasThumbnail" }]
                  }
                },
                "backgroundImage",
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              story: [
                { name: "subTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
                "textColor",
                { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [{ name: "thumbnail", label: "\u30B5\u30E0\u30CD\u30FC\u30EB", values: "hasThumbnail" }] },
                "backgroundImage",
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              banners: [
                "itemSize",
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              articles: [
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
                { name: "image", label: "\u753B\u50CF", values: "hasImage" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              index: [
                { name: "subTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
                { name: "image", label: "\u753B\u50CF", values: "hasImage" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ]
            },
            bind: {
              story: ["hasTitle", "hasText"],
              banners: ["hasSlide"],
              index: ["hasTitle", "hasText"]
            },
            item: {
              visual: [
                "color",
                "pattern",
                { name: "slide", input: "picture", label: "\u30B9\u30E9\u30A4\u30C9\u753B\u50CF", keys: imageKeys2.slide, devices: devices2, cond: "hasSlide" },
                { name: "backgroundImage", input: "picture", label: "\u80CC\u666F\u753B\u50CF", keys: imageKeys2.backgroundImage, devices: devices2, cond: "hasBackgroundImage" }
              ],
              story: ["color", "pattern", { name: "backgroundImage", input: "picture", label: "\u80CC\u666F\u753B\u50CF", keys: imageKeys2.backgroundImage, devices: devices2, cond: "hasBackgroundImage" }]
            }
          },
          {
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              {
                name: "loop",
                input: "bool",
                label: "\u30EB\u30FC\u30D7",
                key: "doLoop",
                sub: [
                  { name: "contentPath", label: "content path", input: "text", key: "content_path" },
                  { name: "query", label: "query", input: "textarea", key: "query" },
                  { name: "loopCount", label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", input: "range", key: "loopCount", min: 1, max: 16 }
                ]
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.slider.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      var rtn = [];
      var thumbs = [];
      var dots = [];
      let configData = JSON.parse(config);
      if (configData.initialSlide === void 0) {
        configData.initialSlide = 0;
      }
      const gotoItem = (i) => {
        configData.initialSlide = (i + items.length) % items.length;
        setAttributes({ currentItemIndex: configData.initialSlide, config: JSON.stringify(configData) });
      };
      const prevItem = () => {
        gotoItem(configData.initialSlide - 1);
      };
      const nextItem = () => {
        gotoItem(configData.initialSlide + 1);
      };
      const getRelativeIndex = (i, c, l2, lp) => {
        if (!lp) {
          return i - c;
        }
        const h = l2 >> 1;
        return (i - c + h + l2) % l2 - h;
      };
      const pushItem = (item, index) => {
        var posClass, itemClass;
        const p = getRelativeIndex(index, configData.initialSlide, items.length, controlStates.loop);
        if (p == 0) {
          posClass = "active";
        } else if (p > 0) {
          posClass = "after";
          if (p === 1) {
            posClass += " next";
          }
        } else {
          posClass = "before";
          if (p === 1) {
            posClass += " prev";
          }
        }
        itemClass = posClass + " item" + p;
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: itemClass, set: setAttributes, attr: attributes, items, index, style: { "--item-p": p }, key: index }, states.hasSlide && /* @__PURE__ */ wp.element.createElement("div", { className: "slide" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.slide, devices, device, index, isTemplate: states.isTemplate })), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), (states.hasTitle || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "h3",
              className: "title",
              onChange: (title) => {
                item.title = title;
                save();
              },
              value: item.title
            }
          ), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "h4",
              className: "subtitle",
              onChange: (subTitle) => {
                item.subTitle = subTitle;
                save();
              },
              value: item.subTitle
            }
          ), states.hasText && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "p",
              className: "text",
              onChange: (text) => {
                item.text = text;
                save();
              },
              value: item.text
            }
          )), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.backgroundImage, devices, device, index, isTemplate: states.isTemplate })), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "link", attr: attributes, set: setAttributes, keys: linkKeys.link, index, isSelected }))
        );
        if (states.hasImage && states.hasThumbnail) {
          thumbs.push(
            /* @__PURE__ */ wp.element.createElement("li", { className: "item " + posClass + " thumb" + p, onClick: () => gotoItem(index), key: index }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, isTemplate: states.isTemplate }))
          );
        }
        if (states.hasDots) {
          dots.push(/* @__PURE__ */ wp.element.createElement("li", { className: "dot " + posClass + " dot" + p, onClick: () => gotoItem(index), key: index }));
        }
      };
      const l = items.length;
      for (let i = 0; i < l; i++) {
        pushItem(items[i % l], i % l);
      }
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8868\u793A\u8A2D\u5B9A", icon: "admin-appearance", set: setAttributes, attr: attributes, selectiveClasses: statesClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { classKey: "controlClasses", title: "\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u8A2D\u5B9A", icon: "video-alt3", set: setAttributes, attr: attributes, selectiveClasses: animateClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { classKey: "controlClasses", title: "\u64CD\u4F5C\u8A2D\u5B9A", icon: "universal-access", set: setAttributes, attr: attributes, selectiveClasses: controllerClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes3) => setAttributes({ classes: classes3 }), value: classes2 }), /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30B3\u30F3\u30C8\u30ED\u30FC\u30E9\u30FC\u30AF\u30E9\u30B9", onChange: (controlClasses2) => setAttributes({ controlClasses: controlClasses2 }), value: controlClasses })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30B9\u30E9\u30A4\u30C9", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, triggerClasses: selectiveClasses[0] }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "picture", label: "slide", keys: imageKeys.slide, devices, cond: states.hasSlide },
            { type: "text", key: "slideCode", cond: states.isTemplate && states.hasSlide },
            { type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
            { type: "text", key: "imageCode", cond: states.isTemplate && states.hasImage },
            { type: "picture", label: "bg", keys: imageKeys.backgroundImage, devices, cond: states.hasBackgroundImage },
            { type: "text", key: "backgroundImageCode", cond: states.isTemplate && states.hasBackgroundImage },
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { className: classes2, style: vars }, /* @__PURE__ */ wp.element.createElement("ul", { className: "contents" }, rtn), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow prev", onClick: prevItem }, " "), states.hasImage && states.hasThumbnail && /* @__PURE__ */ wp.element.createElement("ul", { className: "thumbnail" }, thumbs), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "dots" }, dots), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow next", onClick: nextItem }, " ")))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { vars, classes: classes2 = "", controlClasses = "", config, items = [], doLoop } = attributes;
      const states = CP.wordsToFlags(classes2);
      const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;
      var rtn = [];
      var thumbs = [];
      items.map(function(item, index) {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasSlide && /* @__PURE__ */ wp.element.createElement("div", { className: "slide" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.slide, devices, index, isTemplate: states.isTemplate })), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), (states.hasTitle || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h3", className: "title", value: item.title }), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h4", className: "subtitle", value: item.subTitle }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "text", value: item.text })), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.backgroundImage, devices, index, isTemplate: states.isTemplate })), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "link", attr: attributes, keys: linkKeys.link, index }))
        );
        if (states.hasImage && states.hasThumbnail) {
          thumbs.push(
            /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate }))
          );
        }
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes2, style: vars }, /* @__PURE__ */ wp.element.createElement("ul", { className: "contents" }, rtn), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow prev" }, " "), states.hasImage && states.hasThumbnail && /* @__PURE__ */ wp.element.createElement("ul", { className: "thumbnail" }, thumbs), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "dots" }, /* @__PURE__ */ wp.element.createElement("li", { className: "dot" }, " ")), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow next" }, " "))), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        attributes: {
          classes: { source: "attribute", selector: "div", attribute: "class", default: "hasTitle hasText hasImage" },
          controlClasses: { source: "attribute", selector: "div.controls", attribute: "class", default: "controls loop autoplay flickable" },
          config: {
            source: "attribute",
            selector: "div.controls",
            attribute: "data-config",
            default: "{}"
          },
          items: {
            source: "query",
            selector: "li.item",
            query: {
              title: { source: "html", selector: ".text h3" },
              subTitle: { source: "html", selector: ".text h4" },
              src: { source: "attribute", selector: ".image [src]", attribute: "src" },
              alt: { source: "attribute", selector: ".image [src]", attribute: "alt" },
              text: { source: "html", selector: ".text p" },
              url: { source: "attribute", selector: "a", attribute: "href" },
              bg: { source: "attribute", attribute: "style" }
            },
            default: [
              {
                title: ["Title"],
                subTitle: ["SubTitle"],
                src: wpinfo.theme_url + "/images/dummy.jpg",
                alt: "dummy",
                text: ["Text"],
                url: "https://",
                bg: "background-image:url('" + wpinfo.theme_url + "/images/dummy.jpg')"
              }
            ]
          }
        },
        save({ attributes, className }) {
          const { InnerBlocks, RichText } = wp.blockEditor;
          const { classes: classes2 = "", controlClasses = "", config, items = [] } = attributes;
          var classArray = _.uniq(classes2.split(" "));
          var controlClassArray = _.uniq(controlClasses.split(" "));
          var states = {
            hasArrows: false,
            hasDots: false,
            hasThumbnail: false,
            hasTitle: false,
            hasSubTitle: false,
            hasText: false,
            hasImage: false,
            hasBackgroundImage: false
          };
          var controlStates = {
            loop: false,
            autoplay: false,
            flickable: false,
            scrollable: false,
            stopbyhover: false,
            closable: false
          };
          const hasClass = (cls) => classArray.indexOf(cls) !== -1;
          Object.keys(states).forEach(function(key) {
            this[key] = hasClass(key);
          }, states);
          const hasControlClass = (cls) => controlClassArray.indexOf(cls) !== -1;
          Object.keys(controlStates).forEach(function(key) {
            this[key] = hasClass(key);
          }, controlStates);
          var rtn = [];
          var thumbs = [];
          items.map(function(item, index) {
            if (states.hasBackgroundImage) {
              if (typeof item.bg === "string") {
                item.bg = { backgroundImage: item.bg.slice("background-image:".length) };
              }
            } else {
              item.bg = {};
            }
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: "item", style: item.bg, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))))
            );
            if (states.hasThumbnail) {
              thumbs.push(
                /* @__PURE__ */ wp.element.createElement("li", { className: "item", style: item.bg }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt }))
              );
            }
          });
          return /* @__PURE__ */ wp.element.createElement("div", { className: classes2 }, /* @__PURE__ */ wp.element.createElement("ul", { className: "contents" }, rtn), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow prev" }, " "), states.hasThumbnail && /* @__PURE__ */ wp.element.createElement("ul", { className: "thumbnail" }, thumbs), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "dots" }, /* @__PURE__ */ wp.element.createElement("li", { className: "dot" }, " ")), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow next" }, " ")));
        }
      },
      {
        save({ attributes, className }) {
          const { InnerBlocks, RichText } = wp.blockEditor;
          const { classes: classes2 = "", controlClasses = "", config, items = [] } = attributes;
          var classArray = _.uniq(classes2.split(" "));
          var controlClassArray = _.uniq(controlClasses.split(" "));
          var states = CP.wordsToFlags(classes2);
          const imageKeys = {
            image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
            slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: "slideCode", items: "items" },
            backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
          };
          var rtn = [];
          var thumbs = [];
          items.map(function(item, index) {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasSlide && /* @__PURE__ */ wp.element.createElement("div", { className: "slide" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.slide, index, isTemplate: states.isTemplate })), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), (states.hasTitle || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.backgroundImage, index, isTemplate: states.isTemplate })), states.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
            );
            if (states.hasImage && states.hasThumbnail) {
              thumbs.push(
                /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate }))
              );
            }
          });
          return /* @__PURE__ */ wp.element.createElement("div", { className: classes2 }, /* @__PURE__ */ wp.element.createElement("ul", { className: "contents" }, states.doLoop && "[loop_template " + (loopParam || "") + "]", rtn, states.doLoop && "[/loop_template]"), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow prev" }, " "), states.hasImage && states.hasThumbnail && /* @__PURE__ */ wp.element.createElement("ul", { className: "thumbnail" }, thumbs), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "dots" }, /* @__PURE__ */ wp.element.createElement("li", { className: "dot" }, " ")), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "arrow next" }, " ")));
        },
        migrate(attributes) {
          var states = CP.wordsToFlags(classes);
          attributes.content_path = attributes.loopParam.split(" ")[0];
          attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
          attributes.doLoop = states.doLoop;
          return attributes;
        }
      }
    ]
  });
})();
