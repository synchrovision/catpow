(() => {
  // ../blocks/graphics/editor_script.jsx
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
          rtn[devicesForCss[deviceIndex]]["#" + id + "_item_" + index] = { left: bnd[0], top: bnd[1], width: bnd[2], height: bnd[3] };
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
      return rect.split(",").map((rect2) => rect2.split(" ").map((n) => parseFloat(n)));
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
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { __ } = wp.i18n;
      const { useState, useMemo, useCallback, useEffect, useReducer, useRef } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { BaseControl, Icon, PanelBody, RangeControl, TextareaControl, TextControl, Toolbar, ToolbarGroup, ToolbarButton, ToolbarDropdownMenu } = wp.components;
      const { id, classes = "", src, srcset, alt, heights, items = [], device } = attributes;
      const { bem } = Catpow.util;
      const [currentItemNodes, setCurrentItemNodes] = useState([]);
      const [currentItemIndexes, setCurrentItemIndexes] = useState([]);
      const [containerNode, setContainerNode] = useState(false);
      const targetRefs = useRef([]);
      useEffect(() => {
        setCurrentItemNodes(currentItemIndexes.sort().map((index) => targetRefs.current[index]));
      }, [currentItemIndexes, targetRefs, setCurrentItemNodes]);
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
          { name: "type", type: "buttons", label: "\u30BF\u30A4\u30D7", filter: "type", values: { isImage: "\u753B\u50CF", isText: "\u30C6\u30AD\u30B9\u30C8" }, sub: {
            isImage: [
              { name: "type", type: "buttons", values: ["type1", "type2", "type3"] },
              { name: "alt", input: "text", label: "\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8", key: "alt" },
              { name: "link", input: "text", label: "\u30EA\u30F3\u30AF", key: "link" },
              { name: "image", input: "picture", label: "\u753B\u50CF", keys: imageKeys2.image, devices: devices2 }
            ],
            isText: [
              { name: "type", type: "buttons", values: ["type1", "type2", "type3"] },
              "color",
              { name: "inverse", label: "\u30CC\u30AD\u6587\u5B57", values: "inverse", sub: [
                { name: "hasBackground", label: "\u80CC\u666F\u8272", values: "hasBackground" }
              ] },
              { name: "title", label: "\u898B\u51FA\u3057", values: "hasTitle" },
              { name: "lead", label: "\u30EA\u30FC\u30C9", values: "hasLead" },
              { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
            ]
          } },
          { name: "hasBoxShadow", label: "\u5F71\uFF08\u30DC\u30C3\u30AF\u30B9\uFF09", values: "hasBoxShadow" },
          { name: "hasTextShadow", label: "\u5F71\uFF08\u30C6\u30AD\u30B9\u30C8\uFF09", values: "hasTextShadow" },
          { name: "isEllipse", label: "\u5186\u5F62", values: "isEllipse" },
          { name: "fadeIn", label: "\u30D5\u30A7\u30FC\u30C9\u30A4\u30F3", values: "fadeIn" },
          { name: "fadeIn", label: "\u30D5\u30A7\u30FC\u30C9\u30A4\u30F3", values: "fadeIn" },
          { name: "slideIn", label: "\u30B9\u30E9\u30A4\u30C9\u30A4\u30F3", values: "slideIn", sub: [
            { name: "direction", type: "radio", filter: "slideIn", label: "\u65B9\u5411", values: {
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
        if (!id || document.querySelectorAll("#" + id).length > 1) {
          setAttributes({ id: "g" + new Date().getTime().toString(16) });
        }
      }, [!id]);
      const save = useCallback(() => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      }, [items]);
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
      const copyFirstRect = useCallback(() => {
        const deviceIndex = device ? devicesForCss.indexOf(device) : 0;
        const f = (item) => {
          const rectData = parseRectAttr(item.rect);
          rectData[deviceIndex] = rectData[0];
          item.rect = getRectAttr(rectData);
        };
        if (currentItemIndexes.length) {
          currentItemIndexes.forEach((index) => f(items[index]));
        } else {
          items.forEach(f);
        }
        save();
      }, [devicesForCss, device, save, items, currentItemIndexes]);
      const onClickItem = useCallback((e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        const selected = currentItemIndexes.includes(index);
        if (e.shiftKey) {
          if (selected) {
            setCurrentItemIndexes(currentItemIndexes.filter((i) => i !== index));
          } else {
            setCurrentItemIndexes(currentItemIndexes.concat([index]));
          }
        } else if (!selected) {
          setCurrentItemIndexes([index]);
        }
      }, [currentItemIndexes, setCurrentItemIndexes]);
      const alignItems = useCallback((direction) => {
        const deviceIndex = device ? devicesForCss.indexOf(device) : 0;
        const l = currentItemIndexes.length;
        const rectDatasList = currentItemIndexes.map((itemIndex) => parseRectAttr(items[itemIndex].rect));
        const targetRectDatas = rectDatasList.map((rectDatas) => rectDatas[deviceIndex]);
        const lefts = targetRectDatas.map((c) => c[0]);
        const centers = targetRectDatas.map((c) => c[0] + c[2] / 2);
        const rights = targetRectDatas.map((c) => c[0] + c[2]);
        const minLeft = Math.min.apply(null, lefts);
        const maxLeft = Math.max.apply(null, lefts);
        const minCenter = Math.min.apply(null, centers);
        const maxCenter = Math.max.apply(null, centers);
        const minRight = Math.min.apply(null, rights);
        const maxRight = Math.max.apply(null, rights);
        const tops = targetRectDatas.map((c) => c[1]);
        const middles = targetRectDatas.map((c) => c[1] + c[3] / 2);
        const bottoms = targetRectDatas.map((c) => c[1] + c[3]);
        const minTop = Math.min.apply(null, tops);
        const maxTop = Math.max.apply(null, tops);
        const minMiddle = Math.min.apply(null, middles);
        const maxMiddle = Math.max.apply(null, middles);
        const minBottom = Math.min.apply(null, bottoms);
        const maxBottom = Math.max.apply(null, bottoms);
        const totalWidth = targetRectDatas.map((c) => c[2]).reduce((p, c) => p + c);
        const totalHeight = targetRectDatas.map((c) => c[3]).reduce((p, c) => p + c);
        const width = maxRight - minLeft;
        const height = maxBottom - minTop;
        const marginX = width - totalWidth;
        const marginY = height - totalHeight;
        const sortLeft = targetRectDatas.slice().sort((a, b) => a[0] - b[0]);
        const sortCenter = targetRectDatas.slice().sort((a, b) => a[0] + a[2] / 2 - (b[0] + b[2] / 2));
        const sortRight = targetRectDatas.slice().sort((a, b) => a[0] + a[2] - (b[0] + b[2]));
        const sortTop = targetRectDatas.slice().sort((a, b) => a[1] - b[1]);
        const sortMiddle = targetRectDatas.slice().sort((a, b) => a[1] + a[3] / 2 - (b[1] + b[3] / 2));
        const sortBottom = targetRectDatas.slice().sort((a, b) => a[1] + a[3] - (b[1] + b[3]));
        const cb = {
          left: (c) => c[0] = minLeft,
          center: (c) => c[0] = minLeft + (width - c[2]) / 2,
          right: (c) => c[0] = minLeft + (width - c[2]),
          top: (c) => c[1] = minTop,
          middle: (c) => c[1] = minTop + (height - c[3]) / 2,
          bottom: (c) => c[1] = minTop + (height - c[3]),
          evenLeft: (c) => c[0] = minLeft + (maxLeft - minLeft) / (l - 1) * sortLeft.indexOf(c),
          evenCenter: (c) => c[0] = minCenter + (maxCenter - minCenter) / (l - 1) * sortCenter.indexOf(c) - c[2] / 2,
          evenRight: (c) => c[0] = minRight - c[2] + (maxRight - minRight) / (l - 1) * sortRight.indexOf(c),
          evenTop: (c) => c[1] = minTop + (maxTop - minTop) / (l - 1) * sortTop.indexOf(c),
          evenMiddle: (c) => c[1] = minMiddle + (maxMiddle - minMiddle) / (l - 1) * sortMiddle.indexOf(c) - c[3] / 2,
          evenBottom: (c) => c[1] = minBottom - c[3] + (maxBottom - minBottom) / (l - 1) * sortBottom.indexOf(c),
          evenSpaceH: (c) => c[0] = sortCenter.slice(0, sortCenter.indexOf(c)).reduce((p, c2) => p + c2[2] + marginX / (l - 1), minLeft),
          evenSpaceV: (c) => c[1] = sortMiddle.slice(0, sortMiddle.indexOf(c)).reduce((p, c2) => p + c2[3] + marginY / (l - 1), minTop)
        }[direction];
        rectDatasList.forEach((rectDatas, index) => {
          cb(rectDatas[deviceIndex]);
          items[currentItemIndexes[index]].rect = getRectAttr(rectDatas);
        });
        save();
      }, [save, device, currentItemIndexes, items]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attr: attributes, set: setAttributes, devices: CP.config.graphics.devicesForCss, defaultInput: "pc" }), /* @__PURE__ */ wp.element.createElement(BlockControls, null, device !== "pc" && /* @__PURE__ */ wp.element.createElement(ToolbarButton, { icon: "update", label: "update", onClick: copyFirstRect }), currentItemIndexes.length > 0 && /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { label: "control" }, currentItemIndexes.length === 1 && /* @__PURE__ */ wp.element.createElement(
        ToolbarButton,
        {
          icon: "insert",
          label: "insert",
          onClick: () => {
            items.splice(currentItemIndexes[0], 0, JSON.parse(JSON.stringify(items[currentItemIndexes[0]])));
            save();
          }
        }
      ), currentItemIndexes.length === 1 && /* @__PURE__ */ wp.element.createElement(
        ToolbarButton,
        {
          icon: "remove",
          label: "remove",
          onClick: () => {
            items.splice(currentItemIndexes[0], 1);
            save();
          }
        }
      ), currentItemIndexes.length > 1 && /* @__PURE__ */ wp.element.createElement(
        ToolbarDropdownMenu,
        {
          icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "left" }),
          label: "align",
          controls: [
            { title: "Left", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "left" }), onClick: () => alignItems("left") },
            { title: "Center", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "center" }), onClick: () => alignItems("center") },
            { title: "Right", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "right" }), onClick: () => alignItems("right") },
            { title: "Top", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "top" }), onClick: () => alignItems("top") },
            { title: "Middle", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "middle" }), onClick: () => alignItems("middle") },
            { title: "Bottom", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "bottom" }), onClick: () => alignItems("bottom") },
            { title: "Even Left", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenLeft" }), onClick: () => alignItems("evenLeft") },
            { title: "Even Center", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenCenter" }), onClick: () => alignItems("evenCenter") },
            { title: "Even Right", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenRight" }), onClick: () => alignItems("evenRight") },
            { title: "Even Top", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenTop" }), onClick: () => alignItems("evenTop") },
            { title: "Even Middle", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenMiddle" }), onClick: () => alignItems("evenMiddle") },
            { title: "Even Bottom", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenBottom" }), onClick: () => alignItems("evenBottom") },
            { title: "Even Space Horizontal", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenSpaceH" }), onClick: () => alignItems("evenSpaceH") },
            { title: "Even Space Vertical ", icon: /* @__PURE__ */ wp.element.createElement(CP.AlignmentIcon, { icon: "evenSpaceV" }), onClick: () => alignItems("evenSpaceV") }
          ]
        }
      ))), /* @__PURE__ */ wp.element.createElement("div", { id, className: classes + (isSelected ? " alt_content " + device : ""), ref: setContainerNode }, isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })), /* @__PURE__ */ wp.element.createElement("div", { className: "base" }, states.hasBaseImage && /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.base,
          devices,
          device: device === "pc" ? null : device
        }
      )), isSelected && /* @__PURE__ */ wp.element.createElement(
        CP.BoundingBox,
        {
          targets: currentItemNodes,
          container: containerNode,
          onChange: () => {
            const bnd = containerNode.getBoundingClientRect();
            const deviceIndex = device ? devicesForCss.indexOf(device) : 0;
            currentItemNodes.forEach((el) => {
              const { index } = el.dataset;
              const tgtBnd = el.getBoundingClientRect();
              const rectDatas = parseRectAttr(items[index].rect);
              rectDatas[deviceIndex] = [
                Math.pround((tgtBnd.left - bnd.left) / bnd.width * 100, 2),
                Math.pround((tgtBnd.top - bnd.top) / bnd.height * 100, 2),
                Math.pround(tgtBnd.width / bnd.width * 100, 2),
                Math.pround(tgtBnd.height / bnd.height * 100, 2)
              ];
              items[index].rect = getRectAttr(rectDatas);
            });
            save();
          },
          onDeselect: () => {
            setCurrentItemIndexes([]);
          },
          onDuplicate: () => {
            items.push.apply(items, items.filter((item, index) => currentItemIndexes.includes(index)));
            save();
          },
          onDelete: () => {
            setAttributes({
              items: items.filter((item, index) => currentItemIndexes.includes(index))
            });
          },
          viewMode: device
        }
      ), items.map((item, index) => {
        var itemStates = CP.wordsToFlags(item.classes);
        var itemClasses = item.classes;
        var itemSelected = currentItemIndexes.includes(index);
        if (isSelected) {
          itemClasses += " visible active actived";
        }
        if (itemSelected) {
          itemClasses += " selected";
        }
        const itemBody = () => {
          if (itemSelected && currentItemIndexes.length === 1) {
            if (itemStates.isText) {
              return /* @__PURE__ */ wp.element.createElement("span", { className: "body" }, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  tagName: "h3",
                  className: "title",
                  placeholder: "Title",
                  onChange: (title) => {
                    console.log(title);
                    item.title = title;
                    save();
                  },
                  value: item.title
                }
              ), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  tagName: "h4",
                  className: "lead",
                  placeholder: "Lead",
                  onChange: (lead) => {
                    item.lead = lead;
                    save();
                  },
                  value: item.lead
                }
              ), itemStates.hasText && /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  tagName: "p",
                  className: "text",
                  placeholder: "Text",
                  onChange: (text) => {
                    item.text = text;
                    save();
                  },
                  value: item.text
                }
              ));
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
            return /* @__PURE__ */ wp.element.createElement("span", { className: "body" }, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
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
            ref: (el) => targetRefs.current[index] = el,
            onClick: onClickItem,
            key: index
          },
          itemBody()
        );
      }), /* @__PURE__ */ wp.element.createElement("style", null, device !== "pc" ? CP.createStyleCode(cssDatas[device]) : renderCssDatas(cssDatas))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
        ),
        /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: "ID",
            onChange: (id2) => {
              setAttributes({ id: id2 });
            },
            value: id
          }
        )
      ), currentItemIndexes.length === 1 && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: currentItemIndexes[0],
          selectiveClasses: selectiveItemClasses,
          filters: CP.filters.graphics || {},
          initialOpen: true
        }
      ), currentItemIndexes.length === 1 && /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ITEM CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => {
            items[currentItemIndexes[0]].classes = classes2;
            save();
          },
          value: items[currentItemIndexes[0]].classes
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { id, classes, heights, items = [] } = attributes;
      const { bem } = Catpow.util;
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
            return /* @__PURE__ */ wp.element.createElement("span", { className: "body" }, itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), itemStates.hasLead && /* @__PURE__ */ wp.element.createElement("h4", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.lead })), itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })));
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
