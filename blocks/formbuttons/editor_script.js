(() => {
  // ../blocks/formbuttons/editor_script.jsx
  var blockConfig = {
    linkKeys: {
      link: { href: "action", items: "items" }
    }
  };
  CP.config.formbuttons = blockConfig;
  wp.blocks.registerBlockType("catpow/formbuttons", {
    title: "\u{1F43E} FormButtons",
    description: "\u30D5\u30A9\u30FC\u30E0\u7528\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002",
    icon: "upload",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { isTemplate, items = [], classes = "", vars, EditMode = false } = attributes;
      const { linkKeys } = blockConfig;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = ["buttonsOptions"];
        wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["buttonParams"];
        wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            { type: "text", key: "copy", cond: states.hasMicroCopy },
            { type: "text", key: "text", cond: true },
            { type: "text", key: "caption", cond: states.hasCaption },
            { type: "text", key: "action", cond: true }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { className: item.classes, tag: "li", ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasMicroCopy && /* @__PURE__ */ wp.element.createElement(
          "span",
          {
            className: "_copy cp-button__copy",
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
        ), /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "-button cp-button__link", attributes, setAttributes, keys: linkKeys.link, itemKeys: ["items", index] }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon cp-button__link-icon", item }), /* @__PURE__ */ wp.element.createElement(
          "span",
          {
            className: "_text cp-button__link-text",
            onInput: (e) => {
              item.text = e.target.innerText;
            },
            onBlur: saveItems,
            contentEditable: true,
            suppressContentEditableWarning: true
          },
          item.text
        )), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
          "span",
          {
            className: "_caption cp-button__caption",
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
        ));
      }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30DC\u30BF\u30F3", icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { setAttributes, attributes })));
    },
    save({ attributes }) {
      const { useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", vars } = attributes;
      const blockType = wp.data.select("core/blocks").getBlockType("catpow/formbuttons");
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasMicroCopy && /* @__PURE__ */ wp.element.createElement("span", { className: "_copy cp-button__copy" }, item.copy), /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: "-button cp-button__link",
            role: "button",
            "data-action": item.action,
            "data-callback": item.callback,
            "data-target": item.target,
            "ignore-message": item.ignoreMessage,
            ...CP.extractEventDispatcherAttributes("catpow/formbuttons", item)
          },
          itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon cp-button__link-icon", item }),
          /* @__PURE__ */ wp.element.createElement("span", { className: "_text cp-button__link-text" }, item.text)
        ), states.hasCaption && /* @__PURE__ */ wp.element.createElement("span", { className: "_caption cp-button__caption" }, item.caption));
      })));
    },
    deprecated: [
      {
        attributes: {
          version: { type: "number", default: 0 },
          classes: {
            source: "attribute",
            selector: "ul",
            attribute: "class",
            default: "wp-block-catpow-formbuttons buttons"
          },
          items: {
            source: "query",
            selector: "li.item",
            query: {
              classes: { source: "attribute", attribute: "class" },
              event: { source: "attribute", attribute: "data-event" },
              button: { source: "text" }
            },
            default: [{ classes: "item", button: "[button \u9001\u4FE1 send]" }]
          }
        },
        save({ attributes, className }) {
          const { items = [], classes = "" } = attributes;
          var classArray = _.uniq(classes.split(" "));
          let rtn = [];
          items.map((item, index) => {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, "data-event": item.event }, item.button)
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
        },
        migrate(attributes) {
          const { items = [] } = attributes;
          const parseButtonShortCode = (code) => {
            let matches = code.match(/^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/);
            if (matches) {
              let rtn = { content: matches[1], action: matches[2] };
              if (matches[3]) {
                rtn.ignore_message = 1;
              }
              return rtn;
            }
            return { content: "\u9001\u4FE1" };
          };
          items.map((item) => {
            const buttonData = parseButtonShortCode(item.button);
            item.action = buttonData.action;
            item.text = buttonData.content;
            item.ignore_message = buttonData.ignore_message;
          });
          return attributes;
        }
      }
    ]
  });
})();
