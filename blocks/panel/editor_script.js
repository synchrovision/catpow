(() => {
  // blocks/panel/editor_script.jsx
  CP.config.panel = {
    imageKeys: {
      icon: { src: "iconSrc", alt: "iconAlt", items: "items" },
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/panel", {
    title: "\u{1F43E} Panel",
    description: "\u5927\u5C0F\u306E\u77E9\u5F62\u30D1\u30CD\u30EB\u3092\u30EC\u30A4\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002",
    icon: "grid-view",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-panel panel tile column1 grid32" },
      items: {
        source: "query",
        selector: "li.item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          src: { source: "attribute", selector: ".image [src]", attribute: "src" },
          alt: { source: "attribute", selector: ".image [src]", attribute: "alt" },
          title: { source: "children", selector: ".text h3" },
          text: { source: "children", selector: ".text p" },
          iconSrc: { source: "attribute", selector: ".text .icon [src]", attribute: "src" },
          iconAlt: { source: "attribute", selector: ".text .icon [src]", attribute: "alt" },
          linkUrl: { source: "attribute", selector: ".text .link a", attribute: "href" },
          linkText: { source: "text", selector: ".text .link a" }
        },
        default: [...Array(8)].map((n, i) => {
          return {
            classes: "item hasIcon hasLink hasTitle rspan1 cspan1 color" + i * 2,
            src: wpinfo.theme_url + "/images/dummy.jpg",
            alt: "dummy",
            title: ["Title"],
            text: ["Text"],
            iconSrc: wpinfo.theme_url + "/images/dummy_icon.svg",
            iconAlt: "dummy",
            linkUrl: wpinfo.home_url
          };
        })
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl, Toolbar } = wp.components;
      const { classes, items = [] } = attributes;
      const primaryClass = "wp-block-catpow-panel";
      var classArray = _.uniq(classes.split(" "));
      const { imageKeys } = CP.config.panel;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            values: { tile: "\u30BF\u30A4\u30EB", menu: "\u30E1\u30CB\u30E5\u30FC" },
            item: {
              tile: [
                "color",
                { name: "brightText", label: "\u767D\u6587\u5B57", values: "brightText", sub: [
                  { name: "colorBG", label: "\u8272\u4ED8\u304D\u80CC\u666F", values: "colorBG" }
                ] },
                { name: "icon", label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon" },
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u6587\u7AE0", values: "hasText" },
                { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [
                  { name: "paleImage", label: "\u753B\u50CF\u3092\u8584\u304F", values: "paleImage" },
                  { name: "image", label: "\u753B\u50CF", input: "image", keys: imageKeys.image, size: "vga" }
                ] },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink", sub: [
                  { name: "external", label: "\u5916\u90E8\u30EA\u30F3\u30AF", values: "linkExternal" }
                ] },
                { name: "rowSpan", label: "\u7E26\u30B5\u30A4\u30BA", values: { rspan1: "1", rspan2: "2", rspan3: "3" } },
                { name: "colSpan", label: "\u6A2A\u30B5\u30A4\u30BA", values: { cspan1: "1", cspan2: "2", cspan3: "3" } }
              ],
              menu: [
                "color",
                { name: "icon", label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon" },
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u6587\u7AE0", values: "hasText" },
                { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [
                  { name: "image", label: "\u753B\u50CF", input: "image", keys: imageKeys.image, size: "vga" }
                ] },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink", sub: [
                  { name: "external", label: "\u5916\u90E8\u30EA\u30F3\u30AF", values: "linkExternal" }
                ] },
                { name: "rowSpan", label: "\u7E26\u30B5\u30A4\u30BA", values: { rspan1: "1", rspan2: "2", rspan3: "3" } },
                { name: "colSpan", label: "\u6A2A\u30B5\u30A4\u30BA", values: { cspan1: "1", cspan2: "2", cspan3: "3" } }
              ]
            },
            bind: {
              tile: ["panel"],
              menu: ["panel"]
            }
          },
          {
            name: "size",
            label: "\u30B5\u30A4\u30BA",
            values: {
              column1: "1/1",
              column2: "1/2",
              column3: "1/3",
              column4: "1/4"
            }
          },
          {
            name: "columnsCount",
            label: "\u30AB\u30E9\u30E0\u6570",
            values: {
              grid18: "1-2-3-6-9-18",
              grid24: "1-2-3-4-6-8-12-24",
              grid27: "1-3-9-27",
              grid32: "1-2-4-8-16-32"
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.panel.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      let itemsCopy = items.map((obj) => jQuery.extend(true, {}, obj));
      let rtn = [];
      let totalGrid = 0;
      itemsCopy.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        var itemStates = {
          hasIcon: false,
          hasTitle: false,
          hasText: false,
          hasImage: false,
          hasLink: false,
          linkExternal: false
        };
        var itemClassArray = (item.classes || "").split(" ");
        Object.keys(itemStates).forEach(function(key) {
          this[key] = itemClassArray.indexOf(key) !== -1;
        }, itemStates);
        totalGrid += (CP.getNumberClass({ attr: item }, "rspan") || 1) * (CP.getNumberClass({ attr: item }, "cspan") || 1);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              set: setAttributes,
              attr: attributes,
              items: itemsCopy,
              index,
              isSelected,
              key: index
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
            /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement("div", { className: "icon" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.icon,
                index,
                size: "thumbnail"
              }
            )), itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (title) => {
                  itemsCopy[index].title = title;
                  setAttributes({ items: itemsCopy });
                },
                value: item.title
              }
            )), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  itemsCopy[index].text = text;
                  setAttributes({ items: itemsCopy });
                },
                value: item.text
              }
            )), itemStates.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(TextControl, { onChange: (linkUrl) => {
              itemsCopy[index].linkUrl = linkUrl;
              setAttributes({ items: itemsCopy });
            }, value: item.linkUrl })))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        Toolbar,
        {
          controls: [
            {
              icon: "edit",
              title: "EditMode",
              isActive: attributes.EditMode,
              onClick: () => setAttributes({ EditMode: !attributes.EditMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement("ul", { className: attributes.EditMode ? primaryClass + " edit" : classes }, rtn), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
          title: "\u30D1\u30CD\u30EB",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items: itemsCopy,
          index: attributes.currentItemIndex,
          triggerClasses: selectiveClasses[0]
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "info", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement("p", null, "\u5408\u8A08\u30B0\u30EA\u30C3\u30C9\u6570\uFF1A", totalGrid)), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (clss) => setAttributes({ classes: clss }),
          value: classArray.join(" ")
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { classes = "", items = [] } = attributes;
      let rtn = [];
      items.map((item, index) => {
        var itemStates = {
          hasIcon: false,
          hasTitle: false,
          hasText: false,
          hasImage: false,
          hasLink: false,
          linkExternal: false
        };
        var itemClassArray = (item.classes || "").split(" ");
        Object.keys(itemStates).forEach(function(key) {
          this[key] = itemClassArray.indexOf(key) !== -1;
        }, itemStates);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement("div", { className: "icon" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.iconSrc, alt: item.iconAlt })), itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })), itemStates.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
            "a",
            {
              href: item.linkUrl,
              target: itemStates.linkExternal ? "_brank" : false,
              rel: itemStates.linkExternal ? "noopener noreferrer" : "bookmark"
            },
            " "
          ))))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    }
  });
})();
