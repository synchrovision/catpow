(() => {
  // ../blocks/buttons/editor_script.jsx
  var blockConfig = {
    linkKeys: {
      link: { href: "url", items: "items" }
    }
  };
  CP.config.buttons = blockConfig;
  wp.blocks.registerBlockType("catpow/buttons", {
    title: "\u{1F43E} Buttons",
    description: "\u30DC\u30BF\u30F3\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
      "path",
      {
        d: "M19.5,11c0,2.8-2.2,5-5,5h-9c-2.8,0-5-2.2-5-5V9c0-2.8,2.2-5,5-5h9c2.8,0,5,2.2,5,5V11z M5.5,5c-2.2,0-4,1.8-4,4\n				c0,2.2,1.8,4,4,4h9c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H5.5z"
      }
    )),
    category: "catpow",
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { attributes, className, setAttributes, isSelected } = props;
      const { items = [], classes: classes2, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const { linkKeys } = blockConfig;
      const primaryClass = "wp-block-catpow-buttons";
      var classArray = _.uniq((className + " " + classes2).split(" "));
      var classNameArray = className.split(" ");
      const states = CP.classNamesToFlags(classes2);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "size",
          "fontSize",
          "itemSize",
          "itemGap",
          { name: "microcopy", label: "\u30DE\u30A4\u30AF\u30ED\u30B3\u30D4\u30FC", values: "hasMicroCopy" },
          { name: "caption", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasCaption" },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.buttons.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          "color",
          "rate",
          {
            name: "icon",
            label: "\u30A2\u30A4\u30B3\u30F3",
            values: "hasIcon",
            sub: [{ input: "icon" }]
          },
          "event"
        ];
        wp.hooks.applyFilters("catpow.blocks.buttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
      items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, set: setAttributes, attr: attributes, items, index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "-button", attr: attributes, set: setAttributes, keys: linkKeys.link, index, isSelected }, states.hasMicroCopy && /* @__PURE__ */ wp.element.createElement(
            "span",
            {
              className: "_copy",
              onInput: (e) => {
                item.copy = e.target.innerText;
              },
              onBlur: (e) => {
                saveItems();
              },
              contentEditable: true,
              suppressContentEditableWarning: true
            },
            item.copy
          ), itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item }), /* @__PURE__ */ wp.element.createElement(
            "span",
            {
              className: "_text",
              onInput: (e) => {
                item.text = e.target.innerText;
              },
              onBlur: (e) => {
                saveItems();
              },
              contentEditable: true,
              suppressContentEditableWarning: true
            },
            item.text
          ), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
            "span",
            {
              className: "_caption",
              onInput: (e) => {
                item.caption = e.target.innerText;
              },
              onBlur: (e) => {
                saveItems();
              },
              contentEditable: true,
              suppressContentEditableWarning: true
            },
            item.caption
          )))
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
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30DC\u30BF\u30F3", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (clss) => setAttributes({ classes: clss }), value: classArray.join(" ") })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "text", cond: true },
            { type: "text", key: "url", cond: true }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2, style: vars }, rtn)))));
    },
    save(props) {
      const { InnerBlocks } = wp.blockEditor;
      const { attributes, className } = props;
      const { items = [], classes: classes2, vars, loopParam, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes2);
      const blockType = wp.data.select("core/blocks").getBlockType("catpow/buttons");
      let rtn = [];
      items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        const eventDispatcherAttributes = {};
        if (blockType.attributes.items.eventDispatcherAttributes) {
          blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
            eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
          });
        }
        const shouldOpenWithOtherWindow = /^\w+:\/\//.test(item.url);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("a", { href: item.url, className: "-button", target: shouldOpenWithOtherWindow ? "_blank" : null, rel: shouldOpenWithOtherWindow ? "noopener" : null, ...eventDispatcherAttributes }, states.hasMicroCopy && /* @__PURE__ */ wp.element.createElement("span", { className: "_copy" }, item.copy), itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item }), /* @__PURE__ */ wp.element.createElement("span", { className: "_text" }, item.text), states.hasCaption && /* @__PURE__ */ wp.element.createElement("span", { className: "_caption" }, item.caption)))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes2, style: vars }, rtn)), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2, loopParam } = attributes;
          const states = CP.classNamesToFlags(classes2);
          let rtn = [];
          items.map((item, index) => {
            const itemStates = CP.classNamesToFlags(item.classes);
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, /* @__PURE__ */ wp.element.createElement("a", { href: item.url, className: "button", "data-event": item.event }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement("span", { className: "icon" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.iconSrc, alt: item.iconAlt })), item.text))
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states?.doLoop && "[loop_template " + loopParam + "]", rtn, states?.doLoop && "[/loop_template]");
        },
        migrate(attributes) {
          var states = CP.classNamesToFlags(classes);
          attributes.content_path = attributes.loopParam.split(" ")[0];
          attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
          attributes.doLoop = states?.doLoop;
          return attributes;
        }
      }
    ]
  });
})();
