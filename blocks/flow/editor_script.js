(() => {
  // blocks/flow/editor_script.jsx
  CP.config.flow = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/flow", {
    title: "\u{1F43E} Flow",
    description: "\u624B\u9806\u3084\u9806\u756A\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ol",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-flow medium hasCounter";
            if (!attributes.countPrefix) {
              attributes.countPrefix = "Step.";
            }
            return createBlock("catpow/flow", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-flow medium hasCounter" },
      items: {
        source: "query",
        selector: "li.item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          title: { source: "children", selector: "header .text h3" },
          titleCaption: { source: "children", selector: "header .text p" },
          src: { source: "attribute", selector: "li>.image [src]", attribute: "src" },
          alt: { source: "attribute", selector: "li>.image [src]", attribute: "alt" },
          subTitle: { source: "children", selector: ".contents h4" },
          text: { source: "children", selector: ".contents p,.contents .text" },
          linkUrl: { source: "attribute", selector: ".link a", attribute: "href" }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: "item",
            title: ["Title"],
            titleCaption: ["Caption"],
            subTitle: ["SubTitle"],
            src: wpinfo.theme_url + "/images/dummy.jpg",
            alt: "dummy",
            text: ["Text"],
            linkUrl: wpinfo.home_url
          };
        })
      },
      countPrefix: { source: "text", selector: ".counter .prefix", default: "" },
      countSuffix: { source: "text", selector: ".counter .suffix", default: "" },
      blockState: { type: "object", default: { enableBlockFormat: true } }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl, Toolbar } = wp.components;
      const { items = [], classes, countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-flow";
      var classArray = _.uniq((className + " " + classes).split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.flow;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.flow;
        const selectiveClasses2 = [
          { name: "counter", label: "\u756A\u53F7", values: "hasCounter", sub: [
            { name: "countPrefix", input: "text", label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countPrefix" },
            { name: "countSuffix", input: "text", label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countSuffix" }
          ] },
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          { name: "titleCaption", label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
          { name: "sbTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
          { name: "size", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
          { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
        ];
        wp.hooks.applyFilters("catpow.blocks.flow.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      let rtn = [];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              set: setAttributes,
              attr: attributes,
              items,
              index,
              isSelected,
              key: index
            },
            states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "vga"
              }
            )),
            /* @__PURE__ */ wp.element.createElement("header", { onFocus: () => {
              attributes.blockState.enableBlockFormat = false;
            } }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  items[index].title = text;
                  save();
                },
                value: item.title
              }
            )), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  items[index].titleCaption = text;
                  save();
                },
                value: item.titleCaption
              }
            )))),
            /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", { onFocus: () => {
              attributes.blockState.enableBlockFormat = false;
            } }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (subTitle) => {
                  items[index].subTitle = subTitle;
                  save();
                },
                value: item.subTitle,
                placeholder: "SubTitle",
                onFocus: () => {
                  attributes.blockState.enableBlockFormat = false;
                }
              }
            )), /* @__PURE__ */ wp.element.createElement("div", { className: "text", onFocus: () => {
              attributes.blockState.enableBlockFormat = true;
            } }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  items[index].text = text;
                  save();
                },
                value: item.text
              }
            ))),
            states.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(TextControl, { onChange: (linkUrl) => {
              items[index].linkUrl = linkUrl;
              save();
            }, value: item.linkUrl, placeholder: "URL\u3092\u5165\u529B" }))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        Toolbar,
        {
          controls: [
            {
              icon: "edit",
              title: "EditMode",
              isActive: attributes.EditMode,
              onClick: () => setAttributes({ EditMode: !attributes.EditMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.flow || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
            { type: "text", key: "title" },
            { type: "text", key: "titleCaption", cond: states.hasTitleCaption },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text" },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn));
    },
    save({ attributes, className }) {
      const { RichText: RichText2 } = wp.blockEditor;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      var classArray = _.uniq(classes.split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.flow;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.titleCaption })))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.subTitle })), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.text }))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    },
    deprecated: [
      {
        attributes: {
          version: { type: "number", default: 0 },
          classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-flow medium hasCounter" },
          items: {
            source: "query",
            selector: "li.item",
            query: {
              classes: { source: "attribute", attribute: "class" },
              title: { source: "children", selector: "header .text h3" },
              titleCaption: { source: "children", selector: "header .text p" },
              src: { source: "attribute", selector: "li>.image [src]", attribute: "src" },
              alt: { source: "attribute", selector: "li>.image [src]", attribute: "alt" },
              subTitle: { source: "children", selector: ".contents h4" },
              text: { source: "children", selector: ".contents p" },
              linkUrl: { source: "attribute", selector: ".link a", attribute: "href" }
            },
            default: [...Array(3)].map(() => {
              return {
                classes: "item",
                title: ["Title"],
                titleCaption: ["Caption"],
                subTitle: ["SubTitle"],
                src: wpinfo.theme_url + "/images/dummy.jpg",
                alt: "dummy",
                text: ["Text"],
                linkUrl: wpinfo.home_url
              };
            })
          },
          countPrefix: { source: "text", selector: ".counter .prefix", default: "" },
          countSuffix: { source: "text", selector: ".counter .suffix", default: "" }
        },
        save({ attributes, className }) {
          const { items = [], classes = "", countPrefix, countSuffix } = attributes;
          var classArray = _.uniq(classes.split(" "));
          var states = {
            hasImage: false,
            hasCounter: false,
            hasTitleCaption: false,
            hasSubTitle: false,
            hasLink: false
          };
          const hasClass = (cls) => classArray.indexOf(cls) !== -1;
          Object.keys(states).forEach(function(key) {
            this[key] = hasClass(key);
          }, states);
          let rtn = [];
          items.map((item, index) => {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
        }
      }
    ]
  });
})();
