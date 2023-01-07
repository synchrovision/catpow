(() => {
  // ../blocks/sphere/editor_script.jsx
  CP.config.sphere = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/sphere", {
    title: "\u{1F43E} Sphere",
    description: "\u30ED\u30B0\u30A4\u30F3\u4E2D\u306E\u30E6\u30FC\u30B6\u30FC\u306E\u60C5\u5831\u3092\u8868\u793A\u3059\u308B\u305F\u3081\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "image-filter",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-sphere medium hasSubTitle hasText";
            return createBlock("catpow/sphere", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-sphere" },
      items: {
        source: "query",
        selector: "li.item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          subImageSrc: { source: "attribute", selector: ".contents .image [src]", attribute: "src" },
          subImageAlt: { source: "attribute", selector: ".contents .image [src]", attribute: "alt" },
          subTitle: { source: "children", selector: ".contents h4" },
          text: { source: "children", selector: ".contents p" }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: "item",
            title: ["Title"],
            titleCaption: ["Caption"],
            subTitle: ["SubTitle"],
            src: cp.theme_url + "/images/dummy_icon.svg",
            alt: "dummy",
            text: ["Text"],
            linkUrl: cp.home_url
          };
        })
      },
      countPrefix: { source: "text", selector: ".counter .prefix", default: "" },
      countSuffix: { source: "text", selector: ".counter .suffix", default: "" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-sphere";
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.sphere;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", type: "buttons", label: "\u30B5\u30A4\u30BA", filter: "size", values: ["small", "medium", "large"] },
          { name: "image", label: "\u753B\u50CF", values: "hasSubImage" },
          { name: "subTitle", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
          { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
        ];
        wp.hooks.applyFilters("catpow.blocks.sphere.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["color"];
        wp.hooks.applyFilters("catpow.blocks.sphere.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
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
              isSelected
            },
            /* @__PURE__ */ wp.element.createElement("div", { class: "contents" }, states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.subImage,
                index,
                size: "medium"
              }
            )), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (subTitle) => {
                  items[index].subTitle = subTitle;
                  save();
                },
                value: item.subTitle,
                placeholder: "SubTitle"
              }
            )), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  items[index].text = text;
                  save();
                },
                value: item.text
              }
            )))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return [
        /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
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
        )),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses
          }
        ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30AF\u30E9\u30B9",
            onChange: (classes2) => setAttributes({ classes: classes2 }),
            value: classes
          }
        )), /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30A2\u30A4\u30C6\u30E0",
            icon: "edit",
            set: setAttributes,
            attr: attributes,
            items,
            index: attributes.currentItemIndex,
            selectiveClasses: selectiveItemClasses
          }
        ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)),
        /* @__PURE__ */ wp.element.createElement("ul", { className: attributes.EditMode ? primaryClass + " edit" : classes }, rtn)
      ];
    },
    save({ attributes, className }) {
      const { items = [], classes = "", countPrefix, countSuffix } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.sphere;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, /* @__PURE__ */ wp.element.createElement("div", { class: "contents" }, states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.subImageSrc, alt: item.subImageAlt })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    }
  });
})();
