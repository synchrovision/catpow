(() => {
  // ../blocks/sphere/editor_script.jsx
  CP.config.sphere = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/sphere", {
    title: "\u{1F43E} Sphere",
    description: "\u4E38\u578B\u306E\u30A2\u30A4\u30C6\u30E0\u30EA\u30B9\u30C8\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "image-filter",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-sphere medium has-subtitle has-text";
            return wp.blocks.createBlock("catpow/sphere", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix, EditMode = false } = attributes;
      const primaryClass = "wp-block-catpow-sphere";
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.sphere;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "hasContentWidth",
          "hasMargin",
          "itemSize",
          "color",
          "colorScheme",
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          { name: "icon", label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon" },
          { name: "catpion", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasCaption" },
          { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
        ];
        wp.hooks.applyFilters("catpow.blocks.sphere.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          "color",
          {
            preset: "icon",
            cond: () => states.hasIcon
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.sphere.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, [classes]);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemClasses,
          initialOpen: true
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps({ className: classes, style: vars }) }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", attributes, setAttributes, keys: imageKeys.image, itemKeys: ["items", index], size: "large" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item }), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (title) => {
              items[index].title = title;
              save();
            },
            value: item.title,
            placeholder: "Title"
          }
        ), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (caption) => {
              items[index].caption = caption;
              save();
            },
            value: item.caption,
            placeholder: "Caption"
          }
        ), states.hasText && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_text",
            onChange: (text) => {
              items[index].text = text;
              save();
            },
            value: item.text,
            placeholder: "Text"
          }
        )));
      }))));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { items = [], classes = "", vars, HeadingTag, countPrefix, countSuffix } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes, style: vars }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.catption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", calssName: "_caption", value: item.caption }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text })));
      })));
    }
  });
})();
