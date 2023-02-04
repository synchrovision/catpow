(() => {
  // blocks/panes/editor_script.jsx
  CP.config.panes = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      symbol: { src: "symbolSrc", alt: "symbolAlt", code: "symbolCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/panes", {
    title: "\u{1F43E} Panes",
    description: "\u77E9\u5F62\u306E\u753B\u50CF\u3068\u30C6\u30AD\u30B9\u30C8\u306E\u30DA\u30A2\u306E\u30EA\u30B9\u30C8\u3002",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-panes";
            return wp.blocks.createBlock("catpow/panes", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      var states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.panes;
      var selectiveClasses = [
        { label: "\u30B7\u30F3\u30DC\u30EB", values: "hasSymbol" },
        {
          label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          values: "isTemplate",
          sub: [
            { input: "bool", label: "\u30EB\u30FC\u30D7", key: "doLoop", sub: [
              { label: "content path", input: "text", key: "content_path" },
              { label: "query", input: "textarea", key: "query" },
              { label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", input: "range", key: "loopCount", min: 1, max: 16 }
            ] }
          ]
        }
      ];
      const itemSelectiveClasses = [
        "color",
        "pattern",
        { input: "symbol", keys: imageKeys.symbol, cond: states.hasSymbol },
        {
          input: "text",
          label: "\u30B7\u30F3\u30DC\u30EB\u753B\u50CF\u30B3\u30FC\u30C9",
          key: "symbolCode",
          cond: states.isTemplate && states.hasSymbol
        },
        {
          input: "text",
          label: "\u753B\u50CF\u30B3\u30FC\u30C9",
          key: "imageCode",
          cond: states.isTemplate
        }
      ];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
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
            /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "large",
                isTemplate: states.isTemplate
              }
            )),
            /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasSymbol && /* @__PURE__ */ wp.element.createElement("div", { className: "symbol" }, /* @__PURE__ */ wp.element.createElement(
              CP.ResponsiveImage,
              {
                attr: attributes,
                keys: imageKeys.symbol,
                index,
                size: "medium",
                isTemplate: states.isTemplate
              }
            )), /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            )), /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (titleCaption) => {
                  item.titleCaption = titleCaption;
                  save();
                },
                value: item.titleCaption
              }
            )))),
            states.hasLink && isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
              "p",
              {
                contentEditable: true,
                suppressContentEditableWarning: true,
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
          filters: CP.filters.panes || {}
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
          selectiveClasses: itemSelectiveClasses,
          filters: CP.filters.panes || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image, cond: true },
            { type: "text", key: "imageCode", cond: states.isTemplate },
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "titleCaption", cond: states.hasTitleCaption },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn)));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", linkUrl, loopParam, doLoop } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.panes;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image,
              index,
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasSymbol && /* @__PURE__ */ wp.element.createElement("div", { className: "symbol" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.symbol,
              index,
              size: "medium",
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
