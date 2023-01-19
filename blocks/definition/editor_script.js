(() => {
  // blocks/definition/editor_script.jsx
  wp.blocks.registerBlockType("catpow/definition", {
    title: "\u{1F43E} Definition",
    description: "\u5B9A\u7FA9\u30EA\u30B9\u30C8\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-definition";
            return createBlock("catpow/definition", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-definition";
      var classArray = _.uniq((className + " " + classes).split(" "));
      var states = CP.wordsToFlags(classes);
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
        wp.hooks.applyFilters("catpow.blocks.definition.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
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
              tag: "dl",
              set: setAttributes,
              attr: attributes,
              items,
              index,
              isSelected,
              key: index
            },
            /* @__PURE__ */ wp.element.createElement("dt", { className: "title" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            )),
            /* @__PURE__ */ wp.element.createElement("dd", { className: "text" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  item.text = text;
                  save();
                },
                value: item.text
              }
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
          filters: CP.filters.definition || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "text", cond: states.hasText }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { className: classes }, rtn)));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", loopCount, doLoop } = attributes;
      const states = CP.wordsToFlags(classes);
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("dl", { className: "item", key: index }, /* @__PURE__ */ wp.element.createElement("dt", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), /* @__PURE__ */ wp.element.createElement("dd", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
