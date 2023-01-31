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
      if (!states.hasBaseImage && heights) {
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
      src: { source: "attribute", selector: ".base [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy_bg.jpg" },
      srcset: { source: "attribute", selector: ".base [src]", attribute: "srcset" },
      alt: { source: "attribute", selector: ".base [src]", attribute: "alt" },
      sources: CP.getPictureSoucesAttributesForDevices(CP.config.graphics.devices, ".base picture", "dummy_bg.jpg"),
      heights: { source: "attribute", selector: ".wp-block-catpow-graphics", "attribute": "data-heights", default: "60,80,120" },
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
          title: { source: "html", selector: ".title" },
          lead: { source: "html", selector: ".lead" },
          text: { source: "html", selector: ".text" },
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
      },
      device: { type: "string", default: "pc" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { __ } = wp.i18n;
      const { useState, useMemo, useCallback, useEffect, useReducer } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { BaseControl, Icon, PanelBody, RangeControl, TextareaControl, TextControl } = wp.components;
      const { id, classes = "", src, srcset, alt, heights, items = [], device } = attributes;
      console.log(attributes);
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
          }
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
      useEffect(() => {
        if (!id) {
          setAttributes({ id: "g" + new Date().getTime().toString(16) });
        }
      }, [!id]);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const onMouseDown = (e) => {
        const tgt = e.target;
        const controlNode = tgt.closest("[data-control-type]");
        const itemNode = tgt.closest(".item");
        if (!itemNode) {
          tgtItem = false;
          setAttributes({ currentItemIndex: -1 });
          return;
        }
        var i = itemNode.dataset.index;
        tgtItem = { node: itemNode };
        if (controlNode) {
          tgtItem.type = controlNode.dataset.controlType;
        }
        tgtItem.node.style.animation = "none";
        tgtItem.node.style.transition = "none";
        tgtItem.node.style.transform = "scale(1)";
        console.log(tgtItem);
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
      const InputHeights = useCallback((props) => {
        const { onChange, value } = props;
        const marks = useMemo(() => [
          { value: 50, label: "50" },
          { value: 100, label: "100" },
          { value: 200, label: "200" },
          { value: 400, label: "400" }
        ], []);
        const devices2 = CP.config.graphics.devicesForCss;
        const init = useCallback((states3) => {
          if (!states3.value) {
            states3.value = wp.data.select("core/blocks").getBlockType("catpow/graphics").attributes.heights.default;
          }
          states3.heights = states3.value.split(",").map((n) => parseInt(n));
          return states3;
        }, []);
        const reducer = useCallback((states3, action) => {
          const heights2 = states3.heights.slice();
          heights2[action.index] = action.value;
          const value2 = heights2.join(",");
          onChange(value2, action.device);
          return { value: value2, heights: heights2 };
        }, []);
        const [states2, dispatch] = useReducer(reducer, { value }, init);
        return /* @__PURE__ */ wp.element.createElement(BaseControl, { label: __("\u9AD8\u3055", "catpow") }, devices2.map((device2, index) => /* @__PURE__ */ wp.element.createElement(
          RangeControl,
          {
            key: device2,
            value: states2.heights[index],
            currentInput: states2.heights[index],
            beforeIcon: CP.devices[device2].icon,
            min: 10,
            max: 400,
            marks,
            withInputField: true,
            onChange: (value2) => dispatch({ index, device: device2, value: value2 })
          }
        )));
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attr: attributes, set: setAttributes, devices: CP.config.graphics.devicesForCss }), /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          id,
          className: classes + (device ? " alt_content " + device : ""),
          onMouseDown,
          onMouseMove,
          onMouseUp,
          onDoubleClick
        },
        /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })),
        /* @__PURE__ */ wp.element.createElement("div", { className: "base" }, states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
          CP.ResponsiveImage,
          {
            attr: attributes,
            keys: imageKeys.base,
            devices,
            device: device === "pc" ? null : device
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
                return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(
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
                  device: device === "pc" ? null : device,
                  keys: imageKeys.image,
                  index
                }
              );
            }
            if (itemStates.isText) {
              return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
            }
            return /* @__PURE__ */ wp.element.createElement(
              CP.ResponsiveImage,
              {
                attr: attributes,
                keys: imageKeys.image,
                devices,
                device: device === "pc" ? null : device,
                index
              }
            );
          };
          return wp.element.createElement(
            "span",
            {
              id: id + "_item_" + index,
              className: itemClasses,
              "data-index": index,
              "data-rect": item.rect,
              key: index
            },
            /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, itemBody(), isSelected && itemSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "pos", "data-control-type": "pos" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "move" })), /* @__PURE__ */ wp.element.createElement("div", { className: "del", "data-control-type": "del" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "dismiss" })), /* @__PURE__ */ wp.element.createElement("div", { className: "dup", "data-control-type": "dup" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "plus-alt" })), /* @__PURE__ */ wp.element.createElement("div", { className: "bnd", "data-control-type": "bnd" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "leftright" }))))
          );
        }),
        /* @__PURE__ */ wp.element.createElement("style", null, device !== "pc" ? CP.createStyleCode(cssDatas[device]) : renderCssDatas(cssDatas))
      ), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.graphics || {},
          initialOpen: true
        },
        !states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
          InputHeights,
          {
            value: heights,
            onChange: (heights2, device2) => {
              setAttributes({ heights: heights2, device: device2 });
            }
          }
        )
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
      const { RichText } = wp.blockEditor;
      const { id, classes, heights, items = [] } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, getCssDatas, renderCssDatas } = CP.config.graphics;
      const cssDatas = getCssDatas(attributes, states);
      return /* @__PURE__ */ wp.element.createElement("div", { id, className: classes, "data-heights": heights }, /* @__PURE__ */ wp.element.createElement("div", { className: "base" }, states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
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
            return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
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
        return wp.element.createElement(
          item.link ? "a" : "span",
          {
            id: id + "_item_" + index,
            className: item.classes,
            href: item.link,
            "data-rect": item.rect,
            key: index
          },
          itemBody()
        );
      }), /* @__PURE__ */ wp.element.createElement("style", null, renderCssDatas(cssDatas)));
    }
  });
})();
