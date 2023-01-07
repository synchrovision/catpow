(() => {
  // blocks/banners/editor_script.jsx
  CP.config.banners = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/banners", {
    title: "\u{1F43E} Banners",
    description: "\u30EA\u30F3\u30AF\u4ED8\u304D\u306E\u30D0\u30CA\u30FC\u753B\u50CF\u3092\u4E26\u3079\u3066\u8868\u793A\u3059\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "images-alt",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-banners medium hasTitle";
            return createBlock("catpow/banners", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { items = [], classes: classes2, loopCount, imageCode, doLoop, EditMode = false, AltMode = false } = attributes;
      const states = CP.wordsToFlags(classes2);
      const { imageKeys } = CP.config.banners;
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = [
          { label: "\u30B5\u30A4\u30BA", type: "buttons", values: ["small", "medium", "large"] },
          { label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          CP.selectiveClassesPreset.isTemplate
        ];
        wp.hooks.applyFilters("catpow.blocks.banners.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.banners;
        const selectiveItemClasses2 = [
          { name: "image", input: "image", label: "\u753B\u50CF", keys: imageKeys2.image },
          { name: "alt", input: "text", label: "alt", key: "alt" },
          { name: "target", input: "text", label: "target", key: "target" },
          "event"
        ];
        wp.hooks.applyFilters("catpow.blocks.banners.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const itemTemplateSelectiveClasses = [
        { input: "text", label: "\u753B\u50CF", key: "imageCode" }
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
            states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            )),
            /* @__PURE__ */ wp.element.createElement("a", null, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "medium-large",
                isTemplate: states.isTemplate
              }
            )),
            isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
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
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
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
          filters: CP.filters.banners || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes3) => setAttributes({ classes: classes3 }),
          value: classes2
        }
      )), states.isTemplate ? /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: itemTemplateSelectiveClasses,
          filters: CP.filters.banners || {}
        }
      ) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30D0\u30CA\u30FC",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemClasses,
          filters: CP.filters.banners || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "image", label: "image", keys: imageKeys.image, cond: true },
            { type: "text", key: "imageCode", cond: states.isTemplate },
            { type: "text", key: "alt", cond: true },
            { type: "text", key: "linkUrl", cond: true },
            { type: "text", key: "target", cond: true }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn)));
    },
    save({ attributes, className }) {
      const { items = [], classes: classes2, loopParam, doLoop } = attributes;
      const states = CP.wordsToFlags(classes2);
      const { imageKeys } = CP.config.banners;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl, target: item.target, "data-event": item.event, rel: item.target ? "noopener noreferrer" : "" }, /* @__PURE__ */ wp.element.createElement(
          CP.ResponsiveImage,
          {
            attr: attributes,
            keys: imageKeys.image,
            index,
            isTemplate: states.isTemplate
          }
        )));
      })), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2, loopParam } = attributes;
          var states = CP.wordsToFlags(classes2);
          const imageKeys = {
            image: { src: "src", srcset: "srcset", alt: "alt", code: "imageCode", items: "items" }
          };
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states.doLoop && "[loop_template " + loopParam + "]", items.map((item, index) => {
            return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl, target: item.target, "data-event": item.event, rel: item.target ? "noopener noreferrer" : "" }, /* @__PURE__ */ wp.element.createElement(
              CP.ResponsiveImage,
              {
                attr: attributes,
                keys: imageKeys.image,
                index,
                isTemplate: states.isTemplate
              }
            )));
          }), states.doLoop && "[/loop_template]");
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
