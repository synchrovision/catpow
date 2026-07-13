(() => {
  // ../blocks/panes/editor_script.jsx
  CP.config.panes = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      symbol: {
        src: "symbolSrc",
        alt: "symbolAlt",
        code: "symbolCode",
        items: "items"
      }
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
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", HeadingTag, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      var states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.panes;
      var selectiveClasses = ["headingTag", "level", "hasContentWidth", "hasMargin", { label: "\u30B7\u30F3\u30DC\u30EB", values: "hasSymbol" }, "isTemplate"];
      const itemSelectiveClasses = ["color", { input: "icon" }];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30A4\u30C6\u30E0", icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: itemSelectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            {
              type: "image",
              label: "image",
              keys: imageKeys.image,
              cond: true
            },
            { type: "text", key: "imageCode", cond: states.isTemplate },
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { class: "_img", attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "large", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasSymbol && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_symbol", item }), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (title) => {
              item.title = title;
              save();
            },
            value: item.title
          }
        ), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (titleCaption) => {
              item.titleCaption = titleCaption;
              save();
            },
            value: item.titleCaption
          }
        ))), states.hasLink && isSelected && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", attr: attributes, set: setAttributes, keys: linkKeys.link, index }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            onChange: (linkText) => {
              item.linkText = linkText;
              save();
            },
            value: item.linkText
          }
        )));
      })))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", HeadingTag, vars, linkUrl, loopParam, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.panes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasSymbol && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_symbol", item }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }))), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attr: attributes, keys: linkKeys.link, index, ...CP.extractEventDispatcherAttributes("catpow/panes", item) }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.linkText })))))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
