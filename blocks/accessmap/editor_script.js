(() => {
  // ../blocks/accessmap/editor_script.jsx
  CP.config.accessmap = {
    imageKeys: {
      mapImage: { src: "mapImageSrc", alt: "mapImageAlt", code: "mapImageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/accessmap", {
    title: "\u{1F43E} Access Map",
    description: "\u5730\u56F3\u3068\u30A2\u30AF\u30BB\u30B9\u60C5\u5831\u3092\u8868\u793A",
    icon: "location-alt",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, useCallback, useEffect } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextControl, TextareaControl } = wp.components;
      const { classes, TitleTag, items = [], z, t, hl, loopCount, doLoop } = attributes;
      const primaryClassName = "wp-block-catpow-accessmap";
      var classArray = _.uniq((className + " " + classes).split(" "));
      var classNameArray = className.split(" ");
      const { bem, classNamesToFlags, flagsToClassNames } = Catpow.util;
      var states = useMemo(() => CP.wordsToFlags(classes), [classes]);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", type: "buttons", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
          { name: "mapColor", type: "buttons", label: "\u5730\u56F3\u306E\u8272", values: { mapColorNone: "\u901A\u5E38", mapColorGray: "\u30B0\u30EC\u30FC", mapColorSync: "\u540C\u8272" } },
          { name: "titleTag", input: "buttons", key: "TitleTag", label: "\u30BF\u30A4\u30C8\u30EB\u30BF\u30B0", values: ["h2", "h3", "h4"] },
          { name: "hasTel", values: "hasTel", label: "\u96FB\u8A71\u756A\u53F7" },
          { name: "hasMail", values: "hasMail", label: "\u30E1\u30FC\u30EB" },
          { name: "hasSite", values: "hasSite", label: "\u30B5\u30A4\u30C8" },
          { name: "t", key: "t", input: "select", label: "\u30BF\u30A4\u30D7", values: { m: "\u5730\u56F3", k: "\u822A\u7A7A\u5199\u771F", h: "\u5730\u56F3 + \u822A\u7A7A\u5199\u771F", p: "\u5730\u5F62\u56F3", e: "Google Earth" } },
          { name: "z", key: "z", input: "range", label: "\u30BA\u30FC\u30E0", min: 0, max: 23 },
          { name: "hl", key: "hl", input: "buttons", label: "\u8A00\u8A9E", values: ["ja", "us", "zh-CN", "zh-TW"] },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              { input: "bool", label: "\u30EB\u30FC\u30D7", key: "doLoop", sub: [
                { label: "content path", input: "text", key: "content_path" },
                { label: "query", input: "textarea", key: "query" },
                { label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", input: "range", key: "loopCount", min: 1, max: 16 }
              ] }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          "color",
          { name: "q", key: "q", input: "text", label: "\u30DE\u30FC\u30AB\u30FC" },
          { name: "ll", key: "ll", input: "text", label: "\u4E2D\u5FC3\u5EA7\u6A19" }
        ];
        wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const selectiveItemTemplateClasses = useMemo(() => {
        const selectiveItemTemplateClasses2 = [
          {
            name: "imageMapCode",
            input: "text",
            label: "\u5730\u56F3\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "imageCode",
            cond: "hasImage"
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses2));
        return selectiveItemTemplateClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
      const { imageKeys } = CP.config.accessmap;
      [...Array(Math.max(items.length, loopCount)).keys()].forEach((i) => {
        const index = i % items.length;
        const item = items[index];
        let q = item.q || item.address.replace(/<br\/?>|\n/, " ");
        let url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
        if (!!item.ll) {
          url += `&ll=${item.ll}`;
        }
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
              isSelected,
              key: i
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "map" }, states.isTemplate ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { className: "gmap", text: q }) : /* @__PURE__ */ wp.element.createElement("iframe", { src: url, frameBorder: "0", className: "gmap", "data-ll": item.ll || false, "data-q": item.q || false })),
            /* @__PURE__ */ wp.element.createElement("div", { className: "access" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: TitleTag,
                className: "title",
                onChange: (title) => {
                  item.title = title;
                  save();
                },
                value: item.title
              }
            ), /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "address",
                onChange: (address) => {
                  item.address = address;
                  save();
                },
                value: item.address
              }
            ), states.hasTel && /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "tel",
                onChange: (tel) => {
                  item.tel = tel;
                  save();
                },
                value: item.tel
              }
            ), states.hasMail && /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "mail",
                onChange: (mail) => {
                  item.mail = mail;
                  save();
                },
                value: item.mail
              }
            ), states.hasSite && /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "site",
                onChange: (site) => {
                  item.site = site;
                  save();
                },
                value: item.site
              }
            ), /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "info",
                onChange: (info) => {
                  item.info = info;
                  save();
                },
                value: item.info
              }
            ))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
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
          selectiveClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
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
          selectiveClasses: selectiveItemClasses
        }
      ), states.isTemplate && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemTemplateClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "q" },
            { type: "text", key: "ll" },
            { type: "text", key: "title" },
            { type: "text", key: "zipcode" },
            { type: "text", key: "address" },
            { type: "text", key: "tel" },
            { type: "text", key: "mail" },
            { type: "text", key: "site" },
            { type: "text", key: "info" }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, attributes.AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { className: classes }, rtn)));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { classes, TitleTag, items = [], z, t, hl, doLoop } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.accessmap;
      let rtn = [];
      items.map((item, index) => {
        let url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=`;
        url += item.q || item.address;
        if (!!item.ll) {
          url += `&ll=${item.ll}`;
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("div", { className: "item", key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "map" }, /* @__PURE__ */ wp.element.createElement("iframe", { src: url, frameBorder: "0", className: "gmap", "data-ll": item.ll, "data-q": item.q })), /* @__PURE__ */ wp.element.createElement("div", { className: "access" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: TitleTag, className: "title", value: item.title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "address", value: item.address }), states.hasTel && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "tel", value: item.tel }), states.hasMail && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "mail", value: item.mail }), states.hasSite && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "tel", value: item.site }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "info", value: item.info })))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
