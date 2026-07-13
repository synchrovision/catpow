(() => {
  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // ../blocks/lightbox/editor_script.jsx
  CP.config.lightbox = {
    imageKeys: {
      thumbnail: {
        src: "thumbnailSrc",
        alt: "thumbnailAlt",
        code: "thumbnailCode",
        items: "items"
      },
      sliderImage: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/lightbox", {
    title: "\u{1F43E} Lightbox",
    description: "\u30AF\u30EA\u30C3\u30AF\u3067\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8868\u793A\u3059\u308B\u753B\u50CF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-lightbox is-level3 is-type-flat has-title has-caption";
            return wp.blocks.createBlock("catpow/lightbox", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        items = [],
        classes,
        vars,
        sliderVars,
        HeadingTag,
        SliderHeadingTag,
        sliderClasses,
        blockState,
        loopCount,
        doLoop,
        EditMode = false,
        AltMode = false,
        OpenMode = false,
        currentItemIndex = 0
      } = attributes;
      const { imageKeys } = CP.config.lightbox;
      const states = CP.classNamesToFlags(classes);
      const sliderStates = CP.classNamesToFlags(sliderClasses);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "color",
          "colorScheme",
          "hasContentWidth",
          "hasMargin",
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: { isTypeThumbnail: "\u30B5\u30E0\u30CD\u30FC\u30EB", isTypeFlat: "\u30D5\u30E9\u30C3\u30C8", isTypeCard: "\u30AB\u30FC\u30C9" },
            sub: {
              isTypeFlat: ["itemSize"],
              isTypeCard: ["itemSize"]
            }
          },
          { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          {
            name: "hasCaption",
            label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
            values: "hasCaption"
          },
          { preset: "hasContentWidth", label: "\u30B9\u30E9\u30A4\u30C0\u30FC\u5E45", classKey: "sliderClasses", vars: "sliderVars" },
          { preset: "level", label: "\u30B9\u30E9\u30A4\u30C0\u30FC\u30EC\u30D9\u30EB", classKey: "sliderClasses" },
          { name: "sliderTitle", label: "\u30B9\u30E9\u30A4\u30C0\u30FC\u30BF\u30A4\u30C8\u30EB", classKey: "sliderClasses", values: "hasTitle", sub: [{ preset: "headingTag", key: "SliderHeadingTag", classKey: "sliderClasses" }] },
          { name: "sliderImage", label: "\u30B9\u30E9\u30A4\u30C0\u30FC\u753B\u50CF", classKey: "sliderClasses", values: "hasImage" },
          { name: "sliderText", label: "\u30B9\u30E9\u30A4\u30C0\u30FC\u30C6\u30AD\u30B9\u30C8", classKey: "sliderClasses", values: "hasText" },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.lightbox.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          {
            name: "image",
            input: "image",
            label: "\u753B\u50CF",
            keys: imageKeys.sliderIimage,
            isTemplate: states.isTemplate
          },
          {
            name: "imageCode",
            input: "text",
            label: "\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "imageCode",
            cond: states.isTemplate
          },
          {
            name: "",
            input: "image",
            label: "\u30B5\u30E0\u30CD\u30FC\u30EB\u753B\u50CF",
            keys: imageKeys.thumbnail,
            isTemplate: states.isTemplate
          },
          {
            name: "thumbnailCode",
            input: "text",
            label: "\u30B5\u30E0\u30CD\u30FC\u30EB\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "thumbnailCode",
            cond: states.isTemplate
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.lightbox.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const goto = (index) => {
        setAttributes({ currentItemIndex: Math.max(0, Math.min(index, items.length - 1)) });
      };
      const blockProps = useBlockProps({ className: OpenMode ? "cp-lightbox-preview" : EditMode || AltMode && doLoop ? "cp-altcontent" : classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes, modes: ["EditMode", "AltMode", "OpenMode"] }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }), /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30DC\u30C3\u30AF\u30B9\u30AF\u30E9\u30B9", onChange: (sliderClasses2) => setAttributes({ sliderClasses: sliderClasses2 }), value: sliderClasses })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), !OpenMode ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            {
              type: "image",
              label: "thumbnail",
              keys: imageKeys.thumbnail
            },
            {
              type: "text",
              key: "thumbnailCode",
              cond: states.isTemplate
            },
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "caption",
              cond: states.hasCaption
            },
            {
              type: "image",
              label: "image",
              keys: imageKeys.sliderImage,
              cond: sliderStates.hasImage
            },
            {
              type: "text",
              key: "imageCode",
              cond: states.isTemplate && sliderStates.hasImage
            },
            { type: "text", key: "sliderTitle", cond: sliderStates.hasTitle },
            { type: "text", key: "sliderText", cond: sliderStates.hasText }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", attributes, setAttributes, keys: imageKeys.thumbnail, index, size: "vga", isTemplate: states.isTemplate })), states.hasTitle && /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (text) => {
              item.title = text;
              save();
            },
            value: item.title
          }
        ), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (text) => {
              item.caption = text;
              save();
            },
            value: item.caption
          }
        )));
      })))))) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: sliderClasses, style: sliderVars }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
        var isActive = currentItemIndex == index;
        return /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_item", { "is-active": isActive }), key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-lightbox__contents" }, sliderStates.hasTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            className: "_title",
            tagName: SliderHeadingTag,
            onChange: (subTitle) => {
              items[index].subTitle = subTitle;
              setAttributes({ items });
            },
            value: item.subTitle,
            placeholder: "SubTitle"
          }
        ), sliderStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", attributes, setAttributes, keys: imageKeys.sliderImage, index, size: "full", isTemplate: states.isTemplate })), sliderStates.hasText && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "div",
            className: "_text",
            onChange: (text) => {
              items[index].text = text;
              setAttributes({ items });
            },
            value: item.text
          }
        )));
      })), /* @__PURE__ */ wp.element.createElement("div", { className: "_control" }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx("_prev", { "is-active": currentItemIndex > 0 }), onClick: () => goto(currentItemIndex - 1) }), /* @__PURE__ */ wp.element.createElement("ul", { className: "_dots is-active" }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_dot", { "is-active": currentItemIndex == index }), "data-index": index, onClick: () => goto(index) }))), /* @__PURE__ */ wp.element.createElement("div", { className: clsx("_next", { "is-active": currentItemIndex < items.length - 1 }), onClick: () => goto(currentItemIndex + 1) }), /* @__PURE__ */ wp.element.createElement("div", { className: "_close" }))))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", vars, sliderVars, HeadingTag, SliderHeadingTag, sliderClasses, blockState, doLoop } = attributes;
      var states = CP.classNamesToFlags(classes);
      var sliderStates = CP.classNamesToFlags(sliderClasses);
      const { imageKeys } = CP.config.lightbox;
      const context = {
        blockId: "{$uid}",
        length: items.length
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: classes,
          "data-wp-interactive": "catpow/lightbox",
          "data-wp-context": JSON.stringify(context),
          "data-wp-init": "callbacks.initBlock",
          "data-wp-style----current": "callbacks.getCurrentIndex",
          style: { ...vars, "--length": items.length, "--current": -1 }
        },
        /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
          return /* @__PURE__ */ wp.element.createElement(
            "li",
            {
              className: item.classes,
              "data-index": index,
              "data-wp-on--click": "actions.open",
              "data-wp-class--is-active": "callbacks.isCurrent",
              "aria-controls": `{$uid}-slide-${index}`,
              "data-wp-bind--aria-selected": "callbacks.isCurrent",
              key: index
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attributes, keys: imageKeys.thumbnail, index, isTemplate: states.isTemplate })),
            states.hasTitle && /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.caption })),
            /* @__PURE__ */ wp.element.createElement("div", { className: "contents_" }, sliderStates.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SliderHeadingTag, className: "_title", value: item.subTitle }), sliderStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attributes, keys: imageKeys.sliderImage, index, isTemplate: states.isTemplate })), sliderStates.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_text", value: item.text }))
          );
        })),
        /* @__PURE__ */ wp.element.createElement("div", { id: "{$uid}", className: sliderClasses, style: sliderVars }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
          return /* @__PURE__ */ wp.element.createElement("li", { id: `{$uid}-slide-${index}`, className: "_item", "data-index": index, "data-wp-class--is-active": "callbacks.isCurrent", "data-wp-bind--inert": "!callbacks.isCurrent", key: index });
        })), /* @__PURE__ */ wp.element.createElement("div", { className: "_control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_prev", "data-wp-class--is-active": "callbacks.hasPrev", "data-wp-on--click": "actions.prev" }), /* @__PURE__ */ wp.element.createElement("ul", { className: "_dots", "data-wp-class--is-active": "callbacks.hasDots" }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            className: "_dot",
            "data-index": index,
            "data-wp-class--is-active": "callbacks.isCurrent",
            "data-wp-on--click": "actions.goto",
            "aria-controls": `{$uid}-slide-${index}`,
            "data-wp-bind--aria-selected": "callbacks.isCurrent",
            style: { "--index": index },
            key: index
          }
        ))), /* @__PURE__ */ wp.element.createElement("div", { className: "_next", "data-wp-class--is-active": "callbacks.hasNext", "data-wp-on--click": "actions.next" })))
      )), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
