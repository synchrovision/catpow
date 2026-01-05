(() => {
  // ../blocks/contactinfo/editor_script.jsx
  CP.config.contactinfo = {
    linkKeys: {
      link: { href: "href", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/contactinfo", {
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, useEffect } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], title, lead, caption, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-contactinfo";
      const { bem, classNamesToFlags, flagsToClassNames } = Catpow.util;
      const states = useMemo(() => classNamesToFlags(attributes.classes), [attributes.classes]);
      const classes = useMemo(() => bem(attributes.classes), [attributes.classes]);
      const { linkKeys } = CP.config.contactinfo;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "size",
            label: "\u30B5\u30A4\u30BA",
            type: "buttons",
            values: {
              "is-size-small": "\u5C0F",
              "is-size-medium": "\u4E2D",
              "is-size-large": "\u5927"
            }
          },
          { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "has-title" },
          { name: "lead", label: "\u30EA\u30FC\u30C9", values: "has-lead" },
          { name: "caption", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "has-caption" },
          {
            name: "icon",
            label: "\u30A2\u30A4\u30B3\u30F3",
            values: "has-icon",
            sub: [{ input: "icon" }]
          },
          { name: "itemTitle", label: "\u500B\u5225\u30BF\u30A4\u30C8\u30EB", values: "has-item-title" },
          { name: "itemLead", label: "\u500B\u5225\u30EA\u30FC\u30C9", values: "has-item-lead" },
          {
            name: "itemCaption",
            label: "\u500B\u5225\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
            values: "has-item-caption"
          },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.banners;
        const selectiveItemClasses2 = ["color", "event"];
        wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
      const { imageKeys } = CP.config.contactinfo;
      const len = Math.max(items.length, loopCount);
      [...Array(len).keys()].forEach((i) => {
        const index = i % items.length;
        const item = items[index];
        const itemClasses = classes._items.item;
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", set: setAttributes, attr: attributes, items, index, isSelected, key: i }, states.hasItemTitle && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "h4",
              className: itemClasses.title(),
              onChange: (title2) => {
                item.title = title2;
                save();
              },
              value: item.title
            }
          ), states.hasItemLead && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "p",
              className: itemClasses.lead(),
              onChange: (lead2) => {
                item.lead = lead2;
                save();
              },
              value: item.lead
            }
          ), /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: itemClasses.link(), attr: attributes, set: setAttributes, keys: linkKeys.link, index }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: itemClasses.link.icon(), item: attributes }), /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "span",
              className: itemClasses.link.text(),
              onChange: (link) => {
                items[index].link = link;
                save();
              },
              value: item.link
            }
          )), states.hasItemCaption && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "small",
              className: itemClasses.caption(),
              onChange: (caption2) => {
                item.caption = caption2;
                save();
              },
              value: item.caption
            }
          ))
        );
      });
      useEffect(() => {
        states.hasMultipleItems = len > 1;
        setAttributes({ classes: flagsToClassNames(states) });
      }, [len > 1]);
      const blockProps = useBlockProps({ className: classes() });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: attributes.classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasItemTitle },
            { type: "text", key: "lead", cond: states.hasItemLead },
            { type: "text", key: "link" },
            { type: "text", key: "href" },
            { type: "text", key: "caption", cond: states.hasItemCaption }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "h3",
          className: classes._title(),
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      ), states.hasLead && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "p",
          className: classes._lead(),
          onChange: (lead2) => {
            setAttributes({ lead: lead2 });
          },
          value: lead
        }
      ), /* @__PURE__ */ wp.element.createElement("ul", { className: classes._items() }, rtn), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "small",
          className: classes._caption(),
          onChange: (caption2) => {
            setAttributes({ caption: caption2 });
          },
          value: caption
        }
      ))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { items = [], title, lead, caption, doLoop, EditMode = false, AltMode = false } = attributes;
      const states = Catpow.util.classNamesToFlags(attributes.classes);
      const classes = Catpow.util.bem(attributes.classes);
      const { linkKeys } = CP.config.contactinfo;
      let rtn = [];
      items.forEach((item, index) => {
        const itemClasses = classes._items.item;
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: itemClasses(), key: index }, states.hasItemTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h4", className: itemClasses.title(), value: item.title }), states.hasItemLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: itemClasses.lead(), value: item.lead }), /* @__PURE__ */ wp.element.createElement(CP.Link, { className: itemClasses.link(), attr: attributes, keys: linkKeys.link, index, ...CP.extractEventDispatcherAttributes("catpow/contactinfo", item) }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: itemClasses.link.icon(), item: attributes }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "span", className: itemClasses.link.text(), value: item.link })), states.hasItemCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "small", className: itemClasses.caption(), value: item.caption }))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes() }) }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h3", className: classes._title(), value: title }), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: classes._lead(), value: lead }), /* @__PURE__ */ wp.element.createElement("ul", { className: classes._items() }, rtn), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "small", className: classes._caption(), value: caption })), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
