(() => {
  // ../blocks/pricecard/editor_script.jsx
  wp.blocks.registerBlockType("catpow/pricecard", {
    title: "\u{1F43E} PriceCard",
    description: "\u30B5\u30FC\u30D3\u30B9\u30FB\u5546\u54C1\u60C5\u5831\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "index-card",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { Fragment } = wp.element;
      const { InnerBlocks, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes: classes2 = "", priceUnit, priceCaption, linkText, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-pricecard";
      var classArray = _.uniq((className + " " + classes2).split(" "));
      var classNameArray = className.split(" ");
      var states = CP.classNamesToFlags(classes2);
      var selectiveClasses = [
        { input: "text", label: "\u4FA1\u683C\u5358\u4F4D", key: "priceUnit" },
        {
          type: "radio",
          label: "\u5358\u4F4D\u306E\u4F4D\u7F6E",
          values: { unitBefore: "\u524D", unitAfter: "\u5F8C" }
        },
        { label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
        { label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
        {
          label: "\u30EA\u30F3\u30AF",
          values: "hasLink",
          sub: [{ input: "text", label: "\u30EA\u30F3\u30AF\u6587\u5B57\u5217", key: "linkText" }]
        },
        { label: "\u753B\u50CF", values: "hasImage" },
        { label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
        { label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
        { label: "\u30B9\u30DA\u30C3\u30AF", values: "hasSpec" },
        {
          label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          values: "isTemplate",
          sub: [
            {
              input: "bool",
              label: "\u30EB\u30FC\u30D7",
              key: "doLoop",
              sub: [
                { label: "content path", input: "text", key: "content_path" },
                { label: "query", input: "textarea", key: "query" },
                {
                  label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570",
                  input: "range",
                  key: "loopCount",
                  min: 1,
                  max: 16
                }
              ]
            }
          ]
        }
      ];
      const itemSelectiveClasses = [
        "color",
        {
          label: "\u30BF\u30A4\u30D7",
          values: {
            normal: "\u901A\u5E38",
            recommended: "\u304A\u3059\u3059\u3081",
            deprecated: "\u975E\u63A8\u5968",
            cheap: "\u5B89\u4FA1",
            expensive: "\u9AD8\u7D1A"
          }
        },
        { label: "\u5024\u5F15\u304D", values: "discount" },
        {
          label: "\u753B\u50CF\u30B3\u30FC\u30C9",
          input: "text",
          key: "imageCode",
          cond: states.isTemplate
        }
      ];
      let rtn = [];
      const imageKeys = {
        image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
      };
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", set: setAttributes, attr: attributes, items, index, isSelected, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("header", null, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (text) => {
                items[index].title = text;
                save();
              },
              value: item.title
            }
          )), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (text) => {
                items[index].titleCaption = text;
                save();
              },
              value: item.titleCaption
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement("span", { className: "listPrice" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (listPrice) => {
                items[index].listPrice = listPrice;
                save();
              },
              value: item.listPrice
            }
          )), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "price" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (price) => {
                items[index].price = price;
                save();
              },
              value: item.price
            }
          )), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "priceCaption" }, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (priceCaption2) => {
                setAttributes({ priceCaption: priceCaption2 });
              },
              value: priceCaption
            }
          ))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (subTitle) => {
                items[index].subTitle = subTitle;
                save();
              },
              value: item.subTitle,
              placeholder: "SubTitle"
            }
          )), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
            RichText2,
            {
              onChange: (text) => {
                items[index].text = text;
                save();
              },
              value: item.text
            }
          )), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "spec" }, item.specLabels.map((label, specIndex) => {
            return /* @__PURE__ */ wp.element.createElement(Fragment, { key: specIndex }, /* @__PURE__ */ wp.element.createElement("dt", null, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  items[index].specLabels[specIndex].text = text;
                  save();
                },
                value: items[index].specLabels[specIndex].text
              }
            )), /* @__PURE__ */ wp.element.createElement("dd", null, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  items[index].specValues[specIndex].text = text;
                  save();
                },
                value: items[index].specValues[specIndex].text
              }
            )));
          })), states.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, linkText, isSelected && /* @__PURE__ */ wp.element.createElement(
            TextControl,
            {
              onChange: (linkUrl) => {
                items[index].linkUrl = linkUrl;
                save();
              },
              value: item.linkUrl,
              placeholder: "URL\u3092\u5165\u529B"
            }
          ))))
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      if (rtn.length < loopCount) {
        let len = rtn.length;
        while (rtn.length < loopCount) {
          rtn.push(rtn[rtn.length % len]);
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (clss) => setAttributes({ classes: clss }), value: classArray.join(" ") })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: itemSelectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "image", keys: imageKeys.image, cond: states.hasImage },
            {
              type: "text",
              key: "imageCode",
              cond: states.hasImage && states.isTemplate
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "listPrice", cond: true },
            { type: "text", key: "price", cond: true },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      ) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn)));
    },
    save({ attributes, className }) {
      const { Fragment } = wp.element;
      const { InnerBlocks, RichText: RichText2 } = wp.blockEditor;
      const { items = [], classes: classes2 = "", priceUnit, priceCaption, linkText, loopCount, doLoop } = attributes;
      const primaryClass = "wp-block-catpow-pricecard";
      var classArray = _.uniq(classes2.split(" "));
      var states = CP.classNamesToFlags(classes2);
      let rtn = [];
      const imageKeys = {
        image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("header", null, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.titleCaption })), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement("span", { className: "listPrice" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, item.listPrice), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "price" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, item.price), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "priceCaption" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: priceCaption }))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.text })), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "spec" }, item.specLabels.map((label, specIndex) => {
            return /* @__PURE__ */ wp.element.createElement(Fragment, { key: specIndex }, /* @__PURE__ */ wp.element.createElement("dt", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: items[index].specLabels[specIndex].text })), /* @__PURE__ */ wp.element.createElement("dd", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: items[index].specValues[specIndex].text })));
          })), states.hasLink && /* @__PURE__ */ wp.element.createElement("a", { className: "link", href: item.linkUrl }, linkText)))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2 = "", priceUnit, priceCaption, linkText, loopCount } = attributes;
          const primaryClass = "wp-block-catpow-pricecard";
          var classArray = _.uniq(classes2.split(" "));
          var states = CP.classNamesToFlags(classes2);
          let rtn = [];
          const imageKeys = {
            image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
          };
          items.map((item, index) => {
            if (!item.controlClasses) {
              item.controlClasses = "control";
            }
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("header", null, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement("span", { className: "listPrice" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, item.listPrice), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "price" }, states.unitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, item.price), states.unitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "priceCaption" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: priceCaption }))))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "spec" }, item.specLabels.map((label, specIndex) => {
                return [
                  /* @__PURE__ */ wp.element.createElement("dt", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: items[index].specLabels[specIndex].text })),
                  /* @__PURE__ */ wp.element.createElement("dd", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: items[index].specValues[specIndex].text }))
                ];
              })), states.hasLink && /* @__PURE__ */ wp.element.createElement("a", { className: "link", href: item.linkUrl }, linkText)))
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states.doLoop && "[loop_template " + (loopParam || "") + "]", rtn, states.doLoop && "[/loop_template]");
        },
        migrate(attributes) {
          var states = CP.classNamesToFlags(classes);
          attributes.content_path = attributes.loopParam.split(" ")[0];
          attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
          attributes.doLoop = states.doLoop;
          return attributes;
        }
      }
    ]
  });
})();
