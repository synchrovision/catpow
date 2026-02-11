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
      const { classes, HeadingTag = "h3", items = [], title, lead, caption, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-contactinfo";
      const { bem, classNamesToFlags, flagsToClassNames } = Catpow.util;
      const states = useMemo(() => classNamesToFlags(classes), [classes]);
      const { linkKeys } = CP.config.contactinfo;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "level",
          "color",
          { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          { name: "lead", label: "\u30EA\u30FC\u30C9", values: "hasLead" },
          { name: "caption", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasCaption" },
          {
            name: "icon",
            label: "\u30A2\u30A4\u30B3\u30F3",
            values: "hasIcon",
            sub: [{ input: "icon" }]
          },
          { name: "itemTitle", label: "\u500B\u5225\u30BF\u30A4\u30C8\u30EB", values: "hasItemTitle" },
          { name: "itemLead", label: "\u500B\u5225\u30EA\u30FC\u30C9", values: "hasItemLead" },
          {
            name: "itemCaption",
            label: "\u500B\u5225\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
            values: "hasItemCaption"
          },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["color", "event"];
        wp.hooks.applyFilters("catpow.blocks.contactinfo.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const len = Math.max(items.length, loopCount);
      useEffect(() => {
        states.hasMultipleItems = len > 1;
        setAttributes({ classes: flagsToClassNames(states) });
      }, [len > 1]);
      const blockProps = useBlockProps({ className: classes });
      console.log({ items });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps, className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
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
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps, className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: HeadingTag,
          className: "_title",
          placeholder: "Input Title",
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      ), states.hasLead && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "p",
          className: "_lead",
          placeholder: "Input Lead",
          onChange: (lead2) => {
            setAttributes({ lead: lead2 });
          },
          value: lead
        }
      ), /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, [...Array(len).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { className: "_item", tag: "li", set: setAttributes, attr: attributes, items, index, isSelected, key: i }, states.hasItemTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "h4",
            className: "_title",
            placeholder: "Input Title",
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
            className: "_lead",
            placeholder: "Input Lead",
            onChange: (lead2) => {
              item.lead = lead2;
              save();
            },
            value: item.lead
          }
        ), /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", attr: attributes, set: setAttributes, keys: linkKeys.link, index }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: attributes }), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "span",
            className: "_text",
            placeholder: "Input Link",
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
            className: "_caption",
            placeholder: "Input Caption",
            onChange: (caption2) => {
              item.caption = caption2;
              save();
            },
            value: item.caption
          }
        ));
      })), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "small",
          className: "_caption",
          placeholder: "Input Caption",
          onChange: (caption2) => {
            setAttributes({ caption: caption2 });
          },
          value: caption
        }
      )))));
    },
    save({ attributes }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { classes, HeadingTag = "h3", items = [], title, lead, caption, doLoop } = attributes;
      const states = Catpow.util.classNamesToFlags(classes);
      const { linkKeys } = CP.config.contactinfo;
      let rtn = [];
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title }), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_lead", value: lead }), /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: "_item", key: index }, states.hasItemTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h4", className: "_title", value: item.title }), states.hasItemLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_lead", value: item.lead }), /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attr: attributes, keys: linkKeys.link, index, ...CP.extractEventDispatcherAttributes("catpow/contactinfo", item) }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: attributes }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "span", className: "_text", value: item.link })), states.hasItemCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "small", className: "_caption", value: item.caption }));
      })), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "small", className: "_caption", value: caption }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
