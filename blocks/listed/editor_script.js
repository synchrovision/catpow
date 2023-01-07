(() => {
  // blocks/listed/editor_script.jsx
  CP.config.listed = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" },
      subImage: { src: "subImageSrc", alt: "subImageAlt", code: "subImageCode", items: "items" },
      backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/listed", {
    title: "\u{1F43E} Listed",
    description: "\u76EE\u6B21\u3084\u304A\u77E5\u3089\u305B\u306A\u3069\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText";
            return createBlock("catpow/listed", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], TitleTag, SubTitleTag, classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-listed";
      var classArray = _.uniq((className + " " + classes2).split(" "));
      var classNameArray = className.split(" ");
      var states = CP.wordsToFlags(classes2);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "titleTag", input: "buttons", filter: "titleTag", key: "TitleTag", label: "\u30BF\u30A4\u30C8\u30EB\u30BF\u30B0", values: ["h2", "h3", "h4"], effect: (val, { set }) => {
            if (/^h\d$/.test(val)) {
              set({ SubTitleTag: "h" + (parseInt(val[1]) + 1) });
            }
          } },
          { name: "titleTag", input: "buttons", filter: "subTitleTag", key: "SubTitleTag", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB\u30BF\u30B0", values: ["h3", "h4", "h5"], cond: "hasSubTitle" },
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            type: "gridbuttons",
            values: {
              orderd: "\u9023\u756A\u30EA\u30B9\u30C8",
              news: "\u304A\u77E5\u3089\u305B",
              index: "\u76EE\u6B21",
              menu: "\u30E1\u30CB\u30E5\u30FC"
            },
            sub: {
              orderd: [
                { name: "image", label: "\u753B\u50CF", values: "hasImage" },
                { name: "countPrefix", input: "text", label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countPrefix" },
                { name: "countSuffix", input: "text", label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countSuffix" },
                { name: "titleCaption", label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
                { name: "subTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              news: [
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              index: [
                { name: "level", label: "\u30EC\u30D9\u30EB", "values": ["level0", "level1", "level2", "level3"] }
              ],
              menu: [
                { name: "size", type: "buttons", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
                { name: "image", type: "buttons", label: "\u753B\u50CF", values: { noImage: "\u306A\u3057", hasImage: "\u5927", hasHeaderImage: "\u5C0F" } },
                { name: "backgroundImage", label: "\u80CC\u666F\u753B\u50CF", values: "hasBackgroundImage", sub: [
                  { name: "paleBG", label: "\u8584\u304F", values: "paleBG" }
                ] },
                { name: "backgroundColor", label: "\u80CC\u666F\u8272", values: "hasBackgroundColor" },
                { name: "inverseText", label: "\u629C\u304D\u8272\u6587\u5B57", values: "inverseText" },
                { name: "titleCaption", label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
                { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ]
            },
            bind: {
              orderd: ["hasHeader", "hasCounter", "hasTitle", "hasText"],
              news: ["hasText", "hasSubTitle"],
              index: ["hasHeader", "hasTitle", "hasText"],
              menu: ["hasHeader", "hasTitle"]
            },
            item: {
              news: [],
              index: [],
              menu: ["color"],
              sphere: ["color"]
            }
          },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              { name: "loop", input: "bool", label: "\u30EB\u30FC\u30D7", key: "doLoop", sub: [
                { name: "contentPath", label: "content path", input: "text", key: "content_path" },
                { name: "query", label: "query", input: "textarea", key: "query" },
                { name: "loopCount", label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", input: "range", key: "loopCount", min: 1, max: 16 }
              ] }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.listed.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemTemplateClasses = useMemo(() => {
        const selectiveItemTemplateClasses2 = [
          {
            name: "imageCode",
            input: "text",
            label: "\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "imageCode",
            cond: "hasImage"
          },
          {
            name: "headerImageCode",
            input: "text",
            label: "\u30D8\u30C3\u30C0\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "headerImageCode",
            cond: "hasHeaderImage"
          },
          {
            name: "subImageCode",
            input: "text",
            label: "\u30B5\u30D6\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "subImageCode",
            cond: "hasSubImage"
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.listed.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses2));
        return selectiveItemTemplateClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
      const { imageKeys } = CP.config.listed;
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
            states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { class: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "vga",
                isTemplate: states.isTemplate
              }
            )),
            states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: "header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { class: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.headerImage,
                index,
                size: "thumbnail",
                isTemplate: states.isTemplate
              }
            )), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(TitleTag, { className: "title" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            )), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", { className: "titlecaption" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (titleCaption) => {
                  item.titleCaption = titleCaption;
                  save();
                },
                value: item.titleCaption
              }
            )))),
            (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { class: "contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { class: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.subImage,
                index,
                size: "medium",
                isTemplate: states.isTemplate
              }
            )), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(SubTitleTag, { className: "subtitle" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (subTitle) => {
                  item.subTitle = subTitle;
                  save();
                },
                value: item.subTitle,
                placeholder: "SubTitle"
              }
            )), states.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (text) => {
                  item.text = text;
                  save();
                },
                value: item.text
              }
            ))),
            states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.backgroundImage,
                index,
                isTemplate: states.isTemplate
              }
            )),
            states.hasLink && isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
              "p",
              {
                contentEditable: true,
                onBlur: (e) => {
                  item.linkUrl = e.currentTarget.innerHTML;
                  save();
                }
              },
              item.linkUrl
            ))
          )
        );
      });
      if (rtn.length < loopCount) {
        let len = rtn.length;
        while (rtn.length < loopCount) {
          rtn.push(rtn[rtn.length % len]);
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes
        }
      ), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.listed || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      )), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          triggerClasses: selectiveClasses[2],
          filters: CP.filters.listed || {}
        }
      ), states.isTemplate && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemTemplateClasses,
          filters: CP.filters.listed || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
            { type: "text", key: "imageCode", cond: states.isTemplate && states.hasImage },
            { type: "image", label: "sub", keys: imageKeys.subImage, cond: states.hasSubImage },
            { type: "text", key: "subImageCode", cond: states.isTemplate && states.hasSubImage },
            { type: "image", label: "header", keys: imageKeys.headerImage, cond: states.hasHeaderImage },
            { type: "text", key: "headerImageCode", cond: states.isTemplate && states.hasHeaderImage },
            { type: "image", label: "bg", keys: imageKeys.backgroundImage, cond: states.hasBackgroundImage },
            { type: "text", key: "backgroundImageCode", cond: states.isTemplate && states.hasBackgroundImage },
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "titleCaption", cond: states.hasTitleCaption },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn)));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText: RichText2 } = wp.blockEditor;
      const { items = [], TitleTag, SubTitleTag, classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, linkUrl, linkText, loopParam, doLoop } = attributes;
      const states = CP.wordsToFlags(classes2);
      const { imageKeys } = CP.config.listed;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image,
              index,
              isTemplate: states.isTemplate
            }
          )), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: "header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.headerImage,
              index,
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(TitleTag, { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", { className: "titlecaption" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.titleCaption })))), (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { class: "contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.subImage,
              index,
              isTemplate: states.isTemplate
            }
          )), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(SubTitleTag, { className: "subtitle" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.text }))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.backgroundImage,
              index,
              isTemplate: states.isTemplate
            }
          )), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, linkUrl, linkText, loopParam } = attributes;
          var classArray = _.uniq(classes2.split(" "));
          var states = CP.wordsToFlags(classes2);
          const imageKeys = {
            image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
            headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" },
            subImage: { src: "subImageSrc", alt: "subImageAlt", code: "subImageCode", items: "items" },
            backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
          };
          let rtn = [];
          items.map((item, index) => {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  attr: attributes,
                  keys: imageKeys.image,
                  index,
                  isTemplate: states.isTemplate
                }
              )), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  attr: attributes,
                  keys: imageKeys.headerImage,
                  index,
                  isTemplate: states.isTemplate
                }
              )), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { class: "contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { class: "prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { class: "suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  attr: attributes,
                  keys: imageKeys.subImage,
                  index,
                  isTemplate: states.isTemplate
                }
              )), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  attr: attributes,
                  keys: imageKeys.backgroundImage,
                  index,
                  isTemplate: states.isTemplate
                }
              )), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states.doLoop && "[loop_template " + (loopParam || "") + "]", rtn, states.doLoop && "[/loop_template]");
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
