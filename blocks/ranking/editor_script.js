(() => {
  // ../blocks/ranking/editor_script.jsx
  CP.config.ranking = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/ranking", {
    title: "\u{1F43E} Ranking",
    description: "\u30E9\u30F3\u30AD\u30F3\u30B0\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "awards",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-ranking";
            if (!attributes.countPrefix) {
              attributes.countPrefix = "Step.";
            }
            return wp.blocks.createBlock("catpow/ranking", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-ranking" },
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
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-ranking";
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.ranking;
      var selectiveClasses = [
        { label: "\u753B\u50CF", values: "hasImage" },
        { label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
        { label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
        { label: "\u30EA\u30F3\u30AF", values: "hasLink" }
      ];
      let rtn = [];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", set: setAttributes, attr: attributes, items, index, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga" })), /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
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
          )))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(
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
          ))), states.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
            TextControl,
            {
              onChange: (linkUrl) => {
                items[index].linkUrl = linkUrl;
                save();
              },
              value: item.linkUrl,
              placeholder: "URL\u3092\u5165\u529B"
            }
          )))
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement("ul", { className: attributes.EditMode ? primaryClass + " edit" : classes }, rtn));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.ranking;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    }
  });
})();
