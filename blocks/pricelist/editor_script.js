(() => {
  // blocks/pricelist/editor_script.jsx
  wp.blocks.registerBlockType("catpow/pricelist", {
    title: "\u{1F43E} PriceList",
    description: "\u4FA1\u683C\u8868\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], classes: classes2, loopParam, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-pricelist";
      var states = CP.wordsToFlags(classes2);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
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
        wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          { name: "heading", label: "\u898B\u51FA\u3057", values: "isHeading" },
          { name: "level1", label: "\u30EC\u30D9\u30EB", values: { level1: "1", level2: "2", level3: "3" } },
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          { name: "caption", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasCaption" }
        ];
        wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      let rtn = [];
      const imageKeys = {
        image: { src: "imageSrc", alt: "imageAlt", code: "imageCode", items: "items" }
      };
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        const itemStates = CP.wordsToFlags(item.classes);
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
            itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "vga"
              }
            )),
            /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            )),
            !itemStates.isHeading && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "line" }), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (price) => {
                  item.price = price;
                  save();
                },
                value: item.price
              }
            ))),
            itemStates.hasCaption && /* @__PURE__ */ wp.element.createElement("div", { className: "caption" }, /* @__PURE__ */ wp.element.createElement(
              RichText2,
              {
                onChange: (caption) => {
                  item.caption = caption;
                  save();
                },
                value: item.caption
              }
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
          filters: CP.filters.pricelist || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes3) => setAttributes({ classes: classes3 }),
          value: classes2
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
          selectiveClasses: selectiveItemClasses,
          filters: CP.filters.pricelist || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
            { type: "text", key: "imageCode", cond: states.isTemplate && states.hasImage },
            { type: "text", key: "title", cond: true },
            { type: "text", key: "caption", cond: true },
            { type: "text", key: "price", cond: true }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText: RichText2 } = wp.blockEditor;
      const { items = [], classes: classes2 = "", loopParam, loopCount, doLoop } = attributes;
      var classArray = _.uniq(classes2.split(" "));
      var states = CP.wordsToFlags(classes2);
      const imageKeys = {
        image: { src: "imageSrc", alt: "imageAlt", items: "items" }
      };
      let rtn = [];
      items.map((item, index) => {
        const itemStates = CP.wordsToFlags(item.classes);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.title })), !itemStates.isHeading && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "line" }), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.price }))), itemStates.hasCaption && /* @__PURE__ */ wp.element.createElement("div", { className: "caption" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.caption })))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2 = "", loopParam, loopCount } = attributes;
          var classArray = _.uniq(classes2.split(" "));
          var states = CP.wordsToFlags(classes2);
          const imageKeys = {
            image: { src: "imageSrc", alt: "imageAlt", items: "items" }
          };
          let rtn = [];
          items.map((item, index) => {
            const itemStates = CP.wordsToFlags(item.classes);
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
                CP.ResponsiveImage,
                {
                  attr: attributes,
                  keys: imageKeys.image
                }
              )), /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), !itemStates.isHeading && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "line" }), /* @__PURE__ */ wp.element.createElement("div", { className: "price" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.price }))), itemStates.hasCaption && /* @__PURE__ */ wp.element.createElement("div", { className: "caption" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.caption })))
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
