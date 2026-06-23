(() => {
  // node_modules-included/catpow/src/util/buffer/debounce.ts
  var debounce = (callback, interval) => {
    let timer;
    return (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(callback, interval, e);
    };
  };

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // react-global:react
  var react_default = window.wp.element;
  var useState = wp.element.useState;
  var useEffect = wp.element.useEffect;
  var useLayoutEffect = wp.element.useLayoutEffect;
  var useRef = wp.element.useRef;
  var forwardRef = wp.element.forwardRef;
  var useMemo = wp.element.useMemo;
  var useCallback = wp.element.useCallback;
  var createContext = wp.element.createContext;
  var useContext = wp.element.useContext;
  var useReducer = wp.element.useReducer;
  var createElement = wp.element.createElement;
  var cloneElement = wp.element.cloneElement;
  var isValidElement = wp.element.isValidElement;
  var Fragment = wp.element.Fragment;

  // ../blocks/slider/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.slider = {
    devices: ["tb", "sp"],
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: "slideCode", sources: "slideSources", items: "items" },
      backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: "backgroundImageCode", sources: "backgroundImageSources", items: "items" }
    },
    imageSizes: {
      image: "vga"
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/slider", {
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-slider is-type-card has-title has-text has-image";
            if (!attributes.config) {
              attributes.config = "{}";
            }
            return wp.blocks.createBlock("catpow/slider", attributes);
          }
        },
        {
          type: "block",
          blocks: ["catpow/datatable"],
          isMatch: ({ rows }) => {
            const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
            return CP.isRowsConvertibleToItems(rows, block.attributes.items);
          },
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-slider story hasTitle hasText hasImage";
            const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
            attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
            return wp.blocks.createBlock("catpow/slider", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState: useState2, useMemo: useMemo2, useEffect: useEffect2 } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextControl, TextareaControl } = wp.components;
      const { classes = "", vars, controlClasses = "", HeadingTag, config, items, doLoop, EditMode = false, AltMode = false, device } = attributes;
      const [blockEl, setBlockEl] = useState2(false);
      const configData = useMemo2(() => JSON.parse(config), [config]);
      if (configData.current === void 0) {
        configData.current = 0;
      }
      const { currentItemIndex = configData.current } = attributes;
      const states = CP.classNamesToFlags(classes);
      const controlStates = CP.classNamesToFlags(controlClasses);
      const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;
      const selectiveClasses = useMemo2(() => {
        const { devices: devices2, imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.slider;
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "hasContentWidth",
          "itemSize",
          "hasMargin",
          "hasPadding",
          "color",
          "colorScheme",
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            values: { isTypeCarousel: "\u30AB\u30EB\u30FC\u30BB\u30EB", isTypeCard: "\u30AB\u30FC\u30C9", isTypeFlat: "\u30D5\u30E9\u30C3\u30C8" },
            filter: "type",
            type: "gridbuttons"
          },
          { label: __("\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasTitle" },
          { label: __("\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", "catpow"), values: "hasCaption" },
          { label: __("\u30C6\u30AD\u30B9\u30C8", "catpow"), values: "hasText" },
          { label: __("\u30EA\u30F3\u30AF", "catpow"), values: "hasLink" },
          { label: "\u30A2\u30ED\u30FC", values: "hasArrows" },
          { label: "\u30C9\u30C3\u30C8", values: "hasDots" },
          { input: "range", label: "\u521D\u671F\u30B9\u30E9\u30A4\u30C9", json: "config", key: "current", min: 0, max: items.length - 1 },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.slider.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const animateClasses = [
        {
          input: "bool",
          label: "\u81EA\u52D5\u518D\u751F",
          json: "config",
          key: "autoPlay",
          sub: [
            { input: "range", label: "\u81EA\u52D5\u518D\u751F\u9593\u9694\uFF08\u79D2\uFF09", json: "config", key: "interval", coef: 1e3, min: 0.5, max: 10, step: 0.1 },
            { input: "range", label: "\u624B\u52D5\u64CD\u4F5C\u5F8C\u505C\u6B62\u6642\u9593\uFF08\u79D2\uFF09", json: "config", key: "wait", coef: 1e3, min: 0, max: 60, step: 1 }
          ]
        }
      ];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const gotoItem = useCallback(
        (i) => {
          configData.current = (i + items.length) % items.length;
          setAttributes({ currentItemIndex: configData.current, config: JSON.stringify(configData) });
        },
        [configData]
      );
      const prevItem = useCallback(() => {
        gotoItem(configData.current - 1);
      }, [gotoItem]);
      const nextItem = useCallback(() => {
        gotoItem(configData.current + 1);
      }, [gotoItem]);
      const getRelativeIndex = (i, c, l) => {
        const h = l >> 1;
        return (i - c + h + l) % l - h;
      };
      const getPosClass = (index) => {
        const p = getRelativeIndex(index, currentItemIndex, items.length);
        if (p == 0) {
          return "is-active";
        }
        if (p == 1) {
          return "is-next";
        }
        if (p == -1) {
          return "is-prev";
        }
        if (p > 0) {
          return "is-after";
        }
        if (p < 0) {
          return "is-before";
        }
      };
      useEffect2(() => {
        if (!blockEl) {
          return;
        }
        const contents = blockEl.querySelector(".wp-block-catpow-slider__contents");
        const items2 = [...contents.children];
        const scrollToMainItems = debounce((e) => {
          const scrollLeftMax = blockEl.scrollWidth - blockEl.clientWidth;
          const gap = contents.children[attributes.items.length].offsetLeft - contents.children[0].offsetLeft;
          const threasholdLeft = scrollLeftMax / 2 - gap / 2;
          const threasholdRight = threasholdLeft + gap;
          if (blockEl.scrollLeft < threasholdLeft) {
            blockEl.scrollTo({ left: blockEl.scrollLeft + gap, behavior: "instant" });
          } else if (blockEl.scrollLeft > threasholdRight) {
            blockEl.scrollTo({ left: blockEl.scrollLeft - gap, behavior: "instant" });
          }
        }, 160);
        const updateCssVars = () => {
          const startItem = items2[0];
          const endItem = items2[items2.length - 1];
          const w = endItem.offsetLeft - startItem.offsetLeft;
          const u = w / (items2.length - 1);
          const o = startItem.offsetLeft - blockEl.scrollLeft - (blockEl.offsetWidth - startItem.offsetWidth) / 2;
          const activeItemIndex = Math.floor(-o / w * items2.length);
          for (let i = 0; i < items2.length; i++) {
            items2[i].classList.toggle("is-prev", activeItemIndex === i - 1);
            items2[i].classList.toggle("is-active", activeItemIndex === i);
            items2[i].classList.toggle("is-next", activeItemIndex === i + 1);
            items2[i].style.setProperty("--cp-slider-item-position", o + u * i);
          }
          gotoItem(activeItemIndex % attributes.items.length);
        };
        blockEl.addEventListener("scroll", scrollToMainItems);
        blockEl.addEventListener("scroll", updateCssVars);
        updateCssVars();
        return () => {
          blockEl.removeEventListener("scroll", scrollToMainItems);
          blockEl.removeEventListener("scroll", updateCssVars);
        };
      }, [blockEl, items, gotoItem]);
      const blockProps = useBlockProps({ className: EditMode || AltMode ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u8A2D\u5B9A", icon: "video-alt3", set: setAttributes, attr: attributes, selectiveClasses: animateClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30B9\u30E9\u30A4\u30C9",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          triggerClasses: selectiveClasses.find(({ item }) => !!item)
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "picture", label: "slide", keys: imageKeys.slide, devices, cond: states.hasSlide },
            { type: "text", key: "slideCode", cond: states.isTemplate && states.hasSlide },
            { type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
            { type: "text", key: "imageCode", cond: states.isTemplate && states.hasImage },
            { type: "picture", label: "bg", keys: imageKeys.backgroundImage, devices, cond: states.hasBackgroundImage },
            { type: "text", key: "backgroundImageCode", cond: states.isTemplate && states.hasBackgroundImage },
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "caption", cond: states.hasCaption },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "linkText", cond: states.hasLink },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps, ref: setBlockEl }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_contents" }, [0, 1, 2].map(
        () => items.map((item, index) => {
          return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: clsx(item.classes, getPosClass(index)), set: setAttributes, attr: attributes, items, index, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", attr: attributes, set: setAttributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), (states.hasTitle || states.hasCaption || states.hasText || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: HeadingTag,
              className: "_title",
              onChange: (title) => {
                item.title = title;
                save();
              },
              value: item.title,
              placeholder: "Title"
            }
          ), states.hasCaption && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "p",
              className: "_caption",
              onChange: (caption) => {
                item.caption = caption;
                save();
              },
              value: item.caption,
              placeholder: "Caption"
            }
          ), states.hasText && /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "p",
              className: "_text",
              onChange: (text) => {
                item.text = text;
                save();
              },
              value: item.text,
              placeholder: "Text"
            }
          ), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", attr: attributes, set: setAttributes, keys: linkKeys.link, index, isSelected }, /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              onChange: (linkText) => {
                item.linkText = linkText;
                save();
              },
              value: item.linkText,
              placeholder: "Link"
            }
          )))));
        })
      )), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "_arrow is-arrow-prev", onClick: prevItem }), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "_dots" }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_dot", getPosClass(index)), onClick: () => gotoItem(index), key: index });
      })), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "_arrow is-arrow-next", onClick: nextItem }))))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { vars, classes = "", controlClasses = "", HeadingTag, config, items = [], doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;
      const blockProps = useBlockProps.save({
        className: classes,
        style: vars,
        "data-wp-interactive": "catpow/slider",
        "data-wp-context": config,
        "data-wp-init": "callbacks.initBlock"
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_contents" }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), (states.hasTitle || states.hasCaption || states.hasText || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.caption }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attr: attributes, keys: linkKeys.link, index }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.linkText }))))))), /* @__PURE__ */ wp.element.createElement("div", { className: controlClasses, "data-config": config }, states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "_arrow is-arrow-prev", "data-wp-on--click": "actions.prev" }), states.hasDots && /* @__PURE__ */ wp.element.createElement("ul", { className: "_dots" }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: "_dot", "data-wp-on--click": "actions.onClickItem", "data-wp-class--is-active": "callbacks.isActive", "data-index": index }))), states.hasArrows && /* @__PURE__ */ wp.element.createElement("div", { className: "_arrow is-arrow-next", "data-wp-on--click": "actions.next" })))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
