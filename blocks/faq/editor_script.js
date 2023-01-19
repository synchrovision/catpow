(() => {
  // blocks/faq/editor_script.jsx
  CP.config.faq = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/faq", {
    title: "\u{1F43E} FaQ",
    description: "\u8CEA\u554F\u3068\u56DE\u7B54\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-help",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-faq accordion";
            return createBlock("catpow/faq", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-faq" },
      items: {
        source: "query",
        selector: "li.item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          title: { source: "html", selector: "header .text h3" },
          titleCaption: { source: "html", selector: "header .text p" },
          src: { source: "attribute", selector: "li>.image [src]", attribute: "src" },
          alt: { source: "attribute", selector: "li>.image [src]", attribute: "alt" },
          subTitle: { source: "html", selector: ".contents h4" },
          text: { source: "html", selector: ".contents p" },
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
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-faq";
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.faq;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "titleCaption", label: "Q\u306B\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
          { name: "subTitle", label: "A\u306B\u898B\u51FA\u3057", values: "hasSubTitle" },
          { name: "accordion", label: "\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3", values: "accordion" },
          { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
        ];
        wp.hooks.applyFilters("catpow.blocks.faq.selectiveClasses", CP.finderProxy(selectiveClasses2));
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
            /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  items[index].title = text;
                  save();
                },
                value: item.title
              }
            )), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  items[index].titleCaption = text;
                  save();
                },
                value: item.titleCaption
              }
            )))),
            /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (subTitle) => {
                  items[index].subTitle = subTitle;
                  save();
                },
                value: item.subTitle,
                placeholder: "SubTitle"
              }
            )), /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
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
      )), ",", /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.faq || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), ",", /* @__PURE__ */ wp.element.createElement("ul", { className: attributes.EditMode ? primaryClass + " edit" : classes }, rtn));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.faq;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: rtn }));
    }
  });
})();
