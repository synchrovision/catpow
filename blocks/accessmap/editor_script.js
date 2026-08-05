(() => {
  // ../blocks/accessmap/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/accessmap", {
    apiVersion: 3,
    title: "\u{1F43E} Access Map",
    description: __("\u5730\u56F3\u3068\u30A2\u30AF\u30BB\u30B9\u60C5\u5831\u3092\u8868\u793A", "catpow"),
    icon: "location-alt",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, vars, HeadingTag, items = [], z, t, hl, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      var states = useMemo(() => CP.classNamesToFlags(classes), [classes]);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            values: { isTypeFlat: __("\u30D5\u30E9\u30C3\u30C8", "catpow"), isTypeCard: __("\u30AB\u30FC\u30C9", "catpow"), isTypeFrame: __("\u30D5\u30FC\u30EC\u30E0", "catpow") }
          },
          {
            name: "mapColor",
            type: "buttons",
            label: __("\u5730\u56F3\u306E\u8272", "catpow"),
            values: {
              hasMapColorNone: __("\u901A\u5E38", "catpow"),
              hasMapColorGray: __("\u30B0\u30EC\u30FC", "catpow"),
              hasMapColorSync: __("\u540C\u8272", "catpow")
            }
          },
          { name: "hasTel", values: "hasTel", label: __("\u96FB\u8A71\u756A\u53F7", "catpow") },
          { name: "hasMail", values: "hasMail", label: __("\u30E1\u30FC\u30EB", "catpow") },
          { name: "hasSite", values: "hasSite", label: __("\u30B5\u30A4\u30C8", "catpow") },
          {
            name: "t",
            key: "t",
            input: "select",
            label: __("\u5730\u56F3\u30BF\u30A4\u30D7", "catpow"),
            values: {
              m: __("\u5730\u56F3", "catpow"),
              k: __("\u822A\u7A7A\u5199\u771F", "catpow"),
              h: __("\u5730\u56F3 + \u822A\u7A7A\u5199\u771F", "catpow"),
              p: __("\u5730\u5F62\u56F3", "catpow"),
              e: "Google Earth"
            }
          },
          {
            name: "z",
            key: "z",
            input: "range",
            label: __("\u30BA\u30FC\u30E0", "catpow"),
            min: 0,
            max: 23
          },
          {
            name: "hl",
            key: "hl",
            input: "buttons",
            label: __("\u8A00\u8A9E", "catpow"),
            values: ["ja", "us", "zh-CN", "zh-TW"]
          },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          "color",
          {
            name: "source",
            type: "gridbuttons",
            values: { useQuery: __("\u691C\u7D22", "catpow"), useEmbedUrl: __("\u57CB\u3081\u8FBC\u307FURL", "catpow") },
            sub: {
              useQuery: [
                { name: "q", key: "q", input: "text", label: __("\u691C\u7D22\u30EF\u30FC\u30C9", "catpow") },
                { name: "ll", key: "ll", input: "text", label: __("\u4E2D\u5FC3\u5EA7\u6A19", "catpow") }
              ],
              useEmbedUrl: [
                {
                  name: "src",
                  key: "src",
                  input: "textarea",
                  label: __("\u57CB\u3081\u8FBC\u307FURL", "catpow"),
                  rows: 10,
                  filter: (value, state, props) => {
                    const matches = value.match(/src="(.+?)"/);
                    if (matches) {
                      return matches[1];
                    }
                    return value;
                  }
                }
              ]
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const selectiveItemTemplateClasses = useMemo(() => {
        const selectiveItemTemplateClasses2 = [
          {
            name: "imageMapCode",
            input: "text",
            label: __("\u5730\u56F3\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
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
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", "catpow"), icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), isTemplate && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemTemplateClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }, __("\u30A2\u30AF\u30BB\u30B9\u60C5\u5831", "catpow")), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
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
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }, __("\u4EE3\u66FF\u30B3\u30F3\u30C6\u30F3\u30C4", "catpow")), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        let url;
        const index = i % items.length;
        const item = items[index];
        const itemState = CP.classNamesToFlags(item.classes);
        if (itemState.useEmbedURL) {
          url = item.src;
        } else {
          let q = item.q || item.address.replace(/<br\/?>|\n/, " ");
          url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
          if (!!item.ll) {
            url += `&ll=${item.ll}`;
          }
        }
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "div", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: i }, /* @__PURE__ */ wp.element.createElement("div", { className: "_map" }, isTemplate ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { className: "_gmap", text: item.q || item.address.replace(/<br\/?>|\n/, " ") }) : /* @__PURE__ */ wp.element.createElement("iframe", { src: url, className: "_gmap", "data-ll": item.ll || false, "data-q": item.q || false })), /* @__PURE__ */ wp.element.createElement("div", { className: "_access" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
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
            className: "_address",
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
            className: "_tel",
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
            className: "_mail",
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
            className: "_site",
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
            className: "_info",
            onChange: (info) => {
              item.info = info;
              save();
            },
            value: item.info
          }
        )));
      })))));
    },
    save({ attributes }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { classes, vars, HeadingTag, items = [], z, t, hl, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: classes, style: vars }, items.map((item, index) => {
        let url;
        const itemState = CP.classNamesToFlags(item.classes);
        if (itemState.useEmbedURL) {
          url = item.src;
        } else {
          let q = item.q || item.address.replace(/<br\/?>|\n/, " ");
          url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
          if (!!item.ll) {
            url += `&ll=${item.ll}`;
          }
        }
        return /* @__PURE__ */ wp.element.createElement("div", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_map" }, /* @__PURE__ */ wp.element.createElement("iframe", { src: url, className: "_gmap", "data-ll": item.ll, "data-q": item.q })), /* @__PURE__ */ wp.element.createElement("div", { className: "_access" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_address", value: item.address }), states.hasTel && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_tel", value: item.tel }), states.hasMail && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_mail", value: item.mail }), states.hasSite && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_site", value: item.site }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_info", value: item.info })));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
