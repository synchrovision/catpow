(() => {
  // blocks/graphics/editor_script.jsx
  CP.config.graphics = {
    devices: ["sp", "tb"],
    devicesForCss: ["pc", "tb", "sp"],
    imageKeys: {
      base: { src: "src", srcset: "srcset", sources: "sources", alt: "alt" },
      image: { src: "src", srcset: "srcset", sources: "sources", alt: "alt", items: "items" }
    },
    getCssDatas: (attr, states) => {
      const { id, items, heights } = attr;
      const { devicesForCss } = CP.config.graphics;
      let rtn = {};
      devicesForCss.map((device) => {
        rtn[device] = {};
      });
      if (!states.hasBaseImage) {
        heights.split(",").map((height, deviceIndex) => {
          rtn[devicesForCss[deviceIndex]]["#" + id + " .base"] = { "padding-top": height + "%" };
        });
      }
      items.map((item, index) => {
        item.rect.split(",").map((rect, deviceIndex) => {
          const bnd = rect.split(" ").map((val) => val + "%");
          rtn[devicesForCss[deviceIndex]]["#" + id + "_item_" + index] = { left: bnd[0], top: bnd[1], width: bnd[2] };
        });
      });
      return rtn;
    },
    renderCssDatas: (cssDatas) => {
      return CP.config.graphics.devicesForCss.map((device) => {
        if (device === "pc") {
          return CP.createStyleCode(cssDatas[device]);
        }
        return "@media" + CP.devices[device].media_query + "{" + CP.createStyleCode(cssDatas[device]) + "}";
      }).join("");
    },
    parseRectAttr: (rect) => {
      return rect.split(",").map((rect2) => rect2.split(" "));
    },
    getRectAttr: (rectDatas) => {
      return rectDatas.map((rectData) => rectData.join(" ")).join(",");
    }
  };
  wp.blocks.registerBlockType("catpow/graphics", {
    title: "\u{1F43E} graphics",
    description: "\u753B\u50CF\u3092\u81EA\u7531\u306B\u30EC\u30A4\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002",
    icon: "format-image",
    category: "catpow",
    attributes: {
      id: { source: "attribute", selector: ".wp-block-catpow-graphics", attribute: "id", default: "" },
      classes: { source: "attribute", selector: ".wp-block-catpow-graphics", attribute: "class", default: "wp-block-catpow-graphics hasBaseImage" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy_bg.jpg" },
      srcset: { source: "attribute", selector: "[src]", attribute: "srcset" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      sources: CP.getPictureSoucesAttributesForDevices(CP.config.graphics.devices, ".base picture", "dummy_bg.jpg"),
      height: { source: "attribute", selector: ".wp-block-catpow-graphics", "attribute": "data-heights", default: "120,80,60" },
      items: {
        source: "query",
        selector: ".item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          rect: { source: "attribute", "attribute": "data-rect" },
          rectSP: { source: "attribute", "attribute": "data-rect-sp" },
          src: { source: "attribute", selector: "[src]", attribute: "src" },
          srcset: { source: "attribute", selector: "[src]", attribute: "srcset" },
          alt: { source: "attribute", selector: "[src]", attribute: "alt" },
          sources: CP.getPictureSoucesAttributes(),
          title: { source: "children", selector: ".title" },
          lead: { source: "children", selector: ".lead" },
          text: { source: "children", selector: ".text" },
          link: { source: "attribute", attribute: "href" }
        },
        default: [
          {
            id: "graphics_image1",
            classes: "item isImage",
            rect: "25 25 50,25 25 50,25 25 50",
            src: wpinfo.theme_url + "/images/dummy.jpg",
            srcset: "",
            alt: "",
            sources: CP.getPictureSoucesAttributesDefaultValueForDevices(CP.config.graphics.devices),
            title: ["Title"],
            lead: ["Lead"],
            text: ["Text"],
            link: ""
          }
        ]
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { id, classes = "", src, srcset, alt, heights, items = [], device } = attributes;
      if (!id) {
        setAttributes({ id: "g" + new Date().getTime().toString(16) });
      }
      attributes.EditMode = attributes.EditMode || "pc";
      var isModeSP = attributes.EditMode == "sp";
      const states = CP.wordsToFlags(classes);
      const { devices, devicesForCss, imageKeys, getCssDatas, renderCssDatas, parseRectAttr, getRectAttr } = CP.config.graphics;
      const cssDatas = getCssDatas(attributes, states);
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, devicesForCss: devicesForCss2, imageKeys: imageKeys2, getCssDatas: getCssDatas2, renderCssDatas: renderCssDatas2, parseRectAttr: parseRectAttr2, getRectAttr: getRectAttr2 } = CP.config.graphics;
        const selectiveClasses2 = [
          {
            name: "baseImage",
            label: "\u30D9\u30FC\u30B9\u753B\u50CF",
            values: "hasBaseImage",
            sub: [
              { name: "picture", input: "picture", keys: imageKeys2.base, devices: devices2 }
            ]
          },
          { name: "height", label: "\u9AD8\u3055", input: "text", key: "heights" }
        ];
        wp.hooks.applyFilters("catpow.blocks.graphics.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { devices: devices2, devicesForCss: devicesForCss2, imageKeys: imageKeys2, getCssDatas: getCssDatas2, renderCssDatas: renderCssDatas2, parseRectAttr: parseRectAttr2, getRectAttr: getRectAttr2 } = CP.config.graphics;
        const selectiveItemClasses2 = [
          { name: "type", label: "\u30BF\u30A4\u30D7", filter: "type", values: { isImage: "\u753B\u50CF", isText: "\u30C6\u30AD\u30B9\u30C8" }, sub: {
            isImage: [
              { name: "imageType", label: "\u30BF\u30A4\u30D7", filter: "imageType", values: ["type1", "type2", "type3"] },
              { name: "alt", input: "text", label: "\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8", key: "alt" },
              { name: "link", input: "text", label: "\u30EA\u30F3\u30AF", key: "link" },
              { name: "image", input: "picture", label: "\u753B\u50CF", keys: imageKeys2.image, devices: devices2 }
            ],
            isText: [
              { name: "textType", label: "\u30BF\u30A4\u30D7", filter: "textType", values: ["type1", "type2", "type3"] },
              "color",
              { name: "inverse", label: "\u30CC\u30AD\u6587\u5B57", values: "inverse" },
              { name: "title", label: "\u898B\u51FA\u3057", values: "hasTitle" },
              { name: "lead", label: "\u30EA\u30FC\u30C9", values: "hasLead" },
              { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
            ]
          } },
          { name: "fadeIn", label: "\u30D5\u30A7\u30FC\u30C9\u30A4\u30F3", values: "fadeIn" },
          { name: "slideIn", label: "\u30B9\u30E9\u30A4\u30C9\u30A4\u30F3", values: "slideIn", sub: [
            { name: "direction", type: "radio", filer: "slideIn", label: "\u65B9\u5411", values: {
              slideInLeft: "\u5DE6",
              slideInRight: "\u53F3",
              slideInUp: "\u4E0A",
              slideInDown: "\u4E0B",
              slideInFront: "\u524D",
              slideInBack: "\u5F8C"
            } }
          ] },
          { name: "roll", label: "\u56DE\u8EE2", filter: "roll", values: "roll", sub: [
            { name: "direction", type: "radio", label: "\u65B9\u5411", values: { rollLeft: "\u5DE6", rollRight: "\u53F3" } },
            { name: "speed", type: "radio", label: "\u901F\u5EA6", values: { rollSlow: "\u9045\u3044", rollFast: "\u901F\u3044" } }
          ] },
          { name: "hover", label: "\u30DB\u30D0\u30FC", filter: "hover", values: "hover", sub: [
            { name: "fade", label: "\u30D5\u30A7\u30FC\u30C9", values: "hoverFade" },
            { name: "motion", type: "radio", label: "\u52D5\u304D", values: {
              hoverNoMove: "\u306A\u3057",
              hoverZoom: "\u30BA\u30FC\u30E0",
              hoverLift: "\u30EA\u30D5\u30C8",
              hoverJump: "\u30B8\u30E3\u30F3\u30D7"
            } }
          ] }
        ];
        wp.hooks.applyFilters("catpow.blocks.graphics.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      var tgtItem = false;
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const onMouseDown = (e) => {
        var tgt = e.target;
        var itemNode = tgt.closest(".item");
        if (!itemNode) {
          tgtItem = false;
          setAttributes({ currentItemIndex: i });
          return;
        }
        var i = itemNode.dataset.index;
        tgtItem = { node: itemNode };
        if (tgt.classList.contains("pos")) {
          tgtItem.type = "pos";
        }
        if (tgt.classList.contains("del")) {
          tgtItem.type = "del";
        }
        if (tgt.classList.contains("dup")) {
          tgtItem.type = "dup";
        }
        if (tgt.classList.contains("bnd")) {
          tgtItem.type = "bnd";
        }
        tgtItem.node.style.animation = "none";
        tgtItem.node.style.transition = "none";
        tgtItem.node.style.transform = "scale(1)";
        if (attributes.currentItemIndex != i) {
          setAttributes({ currentItemIndex: i });
        }
      };
      const onMouseMove = (e) => {
        if (!tgtItem) {
          return;
        }
        var bnd = e.currentTarget.getBoundingClientRect();
        if (tgtItem.type === "pos") {
          tgtItem.node.style.left = e.clientX - bnd.left + "px";
          tgtItem.node.style.top = e.clientY - bnd.top + "px";
        } else if (tgtItem.type === "bnd") {
          var tgtBnd = tgtItem.node.getBoundingClientRect();
          tgtItem.node.style.width = e.clientX - tgtBnd.left + "px";
        }
      };
      const onMouseUp = (e) => {
        if (tgtItem) {
          var bnd = e.currentTarget.getBoundingClientRect();
          var i = tgtItem.node.dataset.index;
          let rectDatas = parseRectAttr(items[i].rect);
          const deviceIndex = device ? devicesForCss.indexOf(device) : 0;
          let rectData = rectDatas[deviceIndex];
          if (tgtItem.type === "pos") {
            if (e.altKey) {
              items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
            }
            rectData[0] = parseInt((e.clientX - bnd.left) / bnd.width * 1e3) / 10;
            rectData[1] = parseInt((e.clientY - bnd.top) / bnd.height * 1e3) / 10;
            items[i].rect = getRectAttr(rectDatas);
            tgtItem.node.style.left = "";
            tgtItem.node.style.top = "";
          } else if (tgtItem.type === "del") {
            items.splice(i, 1);
          } else if (tgtItem.type === "dup") {
            items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
            rectData[0] = parseFloat(rectData[0]) + 1;
            rectData[1] = parseFloat(rectData[1]) + 1;
            items[i].rect = getRectAttr(rectDatas);
          } else if (tgtItem.type === "bnd") {
            var tgtBnd = tgtItem.node.getBoundingClientRect();
            rectData[2] = parseInt((e.clientX - tgtBnd.left) / bnd.width * 1e3) / 10;
            items[i].rect = getRectAttr(rectDatas);
            tgtItem.node.style.width = "";
          }
          tgtItem.node.style.animation = "";
          tgtItem.node.style.transition = "";
          tgtItem.node.style.transform = "";
          tgtItem = false;
          save();
        }
      };
      const onDoubleClick = (e) => {
        var tgt = e.target;
      };
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attr: attributes, set: setAttributes, devices }), /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          id,
          className: classes + (device ? " alt_content " + device : ""),
          onMouseDown,
          onMouseMove,
          onMouseUp,
          onDoubleClick
        },
        device && /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })),
        /* @__PURE__ */ wp.element.createElement("div", { class: "base" }, states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
          CP.ResponsiveImage,
          {
            attr: attributes,
            keys: imageKeys.base,
            devices,
            device
          }
        )),
        items.map((item, index) => {
          var itemStates = CP.wordsToFlags(item.classes);
          var itemClasses = item.classes;
          var itemSelected = attributes.currentItemIndex == index;
          if (isSelected) {
            itemClasses += " visible active actived";
          }
          if (itemSelected) {
            itemClasses += " selected";
          }
          const itemBody = () => {
            if (itemSelected) {
              if (itemStates.isText) {
                return /* @__PURE__ */ wp.element.createElement(Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(
                  RichText,
                  {
                    placeholder: "Title",
                    onChange: (title) => {
                      console.log(title);
                      item.title = title;
                      save();
                    },
                    value: item.title
                  }
                )), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(
                  RichText,
                  {
                    placeholder: "Lead",
                    onChange: (lead) => {
                      item.lead = lead;
                      save();
                    },
                    value: item.lead
                  }
                )), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(
                  RichText,
                  {
                    placeholder: "Text",
                    onChange: (text) => {
                      item.text = text;
                      save();
                    },
                    value: item.text
                  }
                )));
              }
              return /* @__PURE__ */ wp.element.createElement(
                CP.SelectResponsiveImage,
                {
                  attr: attributes,
                  set: setAttributes,
                  devices,
                  device,
                  keys: imageKeys.image,
                  index
                }
              );
            }
            if (itemStates.isText) {
              return /* @__PURE__ */ wp.element.createElement(Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
            }
            return /* @__PURE__ */ wp.element.createElement(
              CP.ResponsiveImage,
              {
                attr: attributes,
                keys: imageKeys.image,
                devices,
                device,
                index
              }
            );
          };
          return el(
            "span",
            {
              id: id + "_item_" + index,
              className: itemClasses,
              "data-index": index,
              "data-rect": item.rect
            },
            /* @__PURE__ */ wp.element.createElement(Fragment, null, itemBody(), isSelected && itemSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "pos" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "move" })), /* @__PURE__ */ wp.element.createElement("div", { className: "del" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "dismiss" })), /* @__PURE__ */ wp.element.createElement("div", { className: "dup" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "plus-alt" })), /* @__PURE__ */ wp.element.createElement("div", { className: "bnd" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "leftright" }))))
          );
        }),
        /* @__PURE__ */ wp.element.createElement("style", null, device ? CP.createStyleCode(cssDatas[device]) : renderCssDatas(cssDatas))
      ), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.graphics || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ID", icon: "admin-links", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "ID",
          onChange: (id2) => {
            setAttributes({ id: id2 });
          },
          value: id
        }
      )), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemClasses,
          filters: CP.filters.graphics || {}
        }
      ), items[attributes.currentItemIndex] && /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ITEM CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => {
            items[attributes.currentItemIndex].classes = classes2;
            save();
          },
          value: items[attributes.currentItemIndex].classes
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)));
    },
    save({ attributes, className, setAttributes }) {
      const { id, classes, heights, heightSP, items = [] } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, getCssDatas, renderCssDatas } = CP.config.graphics;
      const cssDatas = getCssDatas(attributes, states);
      return /* @__PURE__ */ wp.element.createElement("div", { id, className: classes, "data-heights": heights }, /* @__PURE__ */ wp.element.createElement("div", { class: "base" }, states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.base,
          devices
        }
      )), items.map((item, index) => {
        var itemStates = CP.wordsToFlags(item.classes);
        const itemBody = () => {
          if (itemStates.isText) {
            return /* @__PURE__ */ wp.element.createElement(Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
          }
          return /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image,
              index,
              devices
            }
          );
        };
        return el(
          item.link ? "a" : "span",
          {
            id: id + "_item_" + index,
            className: item.classes,
            href: item.link,
            "data-rect": item.rect
          },
          itemBody()
        );
      }), /* @__PURE__ */ wp.element.createElement("style", null, renderCssDatas(cssDatas)));
    }
  });
})();
