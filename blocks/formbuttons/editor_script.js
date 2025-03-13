(() => {
  // ../blocks/formbuttons/editor_script.jsx
  wp.blocks.registerBlockType("catpow/formbuttons", {
    title: "\u{1F43E} FormButtons",
    description: "\u30D5\u30A9\u30FC\u30E0\u7528\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002",
    icon: "upload",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "" } = attributes;
      const primaryClass = "wp-block-catpow-formbuttons";
      var classArray = _.uniq((className + " " + classes).split(" "));
      var classNameArray = className.split(" ");
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = [
          {
            name: "size",
            label: "\u30B5\u30A4\u30BA",
            filter: "size",
            values: { l: "\u5927", m: "\u4E2D", s: "\u5C0F", ss: "\u6975\u5C0F" }
          },
          { name: "inline", label: "\u30A4\u30F3\u30E9\u30A4\u30F3", values: "i" }
        ];
        wp.hooks.applyFilters(
          "catpow.blocks.formbuttons.selectiveClasses",
          CP.finderProxy(selectiveClasses2)
        );
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          "color",
          {
            name: "rank",
            type: "gridbuttons",
            label: "\u5C5E\u6027",
            filter: "rank",
            values: [
              "default",
              "primary",
              "secondary",
              "negative",
              "danger",
              "secure"
            ]
          },
          {
            name: "icon",
            label: "\u30A2\u30A4\u30B3\u30F3",
            values: "hasIcon",
            sub: [{ input: "icon" }]
          },
          "event"
        ];
        wp.hooks.applyFilters(
          "catpow.blocks.formbuttons.selectiveItemClasses",
          CP.finderProxy(selectiveItemClasses2)
        );
        return selectiveItemClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
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
              isSelected,
              key: index
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "button" }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item }), /* @__PURE__ */ wp.element.createElement(
              "span",
              {
                onInput: (e) => {
                  item.text = e.target.innerText;
                },
                onBlur: saveItems,
                contentEditable: true,
                suppressContentEditableWarning: true
              },
              item.text
            ), /* @__PURE__ */ wp.element.createElement(
              "span",
              {
                className: "action",
                onInput: (e) => {
                  item.action = e.target.innerText;
                },
                onBlur: saveItems,
                contentEditable: true,
                suppressContentEditableWarning: true
              },
              item.action
            ))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30DC\u30BF\u30F3",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })));
    },
    save({ attributes, className }) {
      const { items = [], classes = "" } = attributes;
      var classArray = _.uniq(classes.split(" "));
      const blockType = wp.data.select("core/blocks").getBlockType("catpow/formbuttons");
      let rtn = [];
      items.map((item, index) => {
        const itemStates = CP.wordsToFlags(item.classes);
        const eventDispatcherAttributes = {};
        if (blockType.attributes.items.eventDispatcherAttributes) {
          blockType.attributes.items.eventDispatcherAttributes.map(
            (attr_name) => {
              eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
            }
          );
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement(
            "div",
            {
              className: "button",
              "data-action": item.action,
              "data-callback": item.callback,
              "data-target": item.target,
              "ignore-message": item.ignoreMessage,
              ...eventDispatcherAttributes
            },
            itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item }),
            item.text
          ))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
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
            let matches = code.match(
              /^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/
            );
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
