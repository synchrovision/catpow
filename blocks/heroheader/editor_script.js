(() => {
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

  // node_modules-included/catpow/src/hooks/useChangeEffect.jsx
  var useChangeEffect = (callback, deps) => {
    const { useEffect: useEffect2, useRef: useRef2 } = react_default;
    const ref = useRef2(true);
    useEffect2(() => {
      if (ref.current) {
        ref.current = false;
      } else {
        return callback();
      }
    }, deps);
  };

  // ../blocks/heroheader/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.heroheader = {
    devices: ["tb", "sp"],
    linkKeys: {
      link: { href: "href", items: "buttons" }
    },
    imageKeys: {
      bgImages: { src: "src", alt: "alt", sources: "sources", items: "images" }
    }
  };
  wp.blocks.registerBlockType("catpow/heroheader", {
    title: "\u{1F43E} HeroHeader",
    description: __("\u30DA\u30FC\u30B8\u306E\u6700\u521D\u306B\u8868\u793A\u3059\u308B\u30D8\u30C3\u30C0\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { isTemplate, classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div", EditMode = false } = attributes;
      const { useState: useState2, useMemo: useMemo2, useEffect: useEffect2, useRef: useRef2 } = wp.element;
      const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const states = CP.classNamesToFlags(attributes.classes);
      const [ref, setRef] = useState2(null);
      const { devices, imageKeys, linkKeys } = CP.config.heroheader;
      const selectiveClasses = useMemo2(() => {
        const selectiveClasses2 = [
          { preset: "colorScheme", label: __("\u30C6\u30AD\u30B9\u30C8\u914D\u8272", "catpow"), classKey: "bodyClasses" },
          {
            name: "hasTextBackground",
            label: __("\u30C6\u30AD\u30B9\u30C8\u80CC\u666F", "catpow"),
            values: "hasTextBackground",
            sub: [
              {
                name: "textBackground",
                type: "buttons",
                values: {
                  hasTextBackgroundFade: __("\u307C\u304B\u3057", "catpow"),
                  hasTextBackgroundBelt: __("\u5E2F", "catpow"),
                  hasTextBackgroundRect: __("\u77E9\u5F62", "catpow"),
                  hasTextBackgroundCircle: __("\u5186", "catpow")
                }
              },
              {
                name: "blendmode",
                label: __("\u30D6\u30EC\u30F3\u30C9\u30E2\u30FC\u30C9", "catpow"),
                vars: "vars",
                key: "--cp-text-background-blendmode",
                input: "blendmode"
              },
              { name: "opacity", label: __("\u4E0D\u900F\u660E\u5EA6", "catpow"), input: "range", min: 0, max: 1, step: 0.1, vars: "vars", key: "--cp-text-background-opacity" }
            ]
          },
          { preset: "align", classKey: "bodyClasses" },
          { preset: "verticalAlign", classKey: "bodyClasses" },
          { preset: "textAlign", classKey: "bodyClasses" },
          "hasButtons",
          { preset: "itemSize", cond: ({ hasButtons }) => hasButtons, classKey: "bodyClasses" }
        ];
        wp.hooks.applyFilters("catpow.blocks.heroheader.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const sliderSelectiveClasses = useMemo2(() => {
        const sliderSelectiveClasses2 = [
          { name: "sliderFixed", label: __("\u56FA\u5B9A", "catpow"), values: "hasSliderFixed" },
          {
            name: "sliderSplit",
            label: __("\u5207\u629C", "catpow"),
            values: "hasSliderSplit",
            sub: [
              {
                name: "sliderSize",
                label: __("\u30B5\u30A4\u30BA", "catpow"),
                vars: "vars",
                key: "--cp-slider-size",
                input: "range",
                min: 0,
                max: 100,
                step: 10
              },
              { name: "sp", type: "buttons", label: __("\u4F4D\u7F6E\uFF08SP\uFF09", "catpow"), values: { hasSliderTop: __("\u4E0A", "catpow"), hasSliderBottom: __("\u4E0B", "catpow") } },
              { name: "pc", type: "buttons", label: __("\u4F4D\u7F6E\uFF08PC\uFF09", "catpow"), values: { hasSliderLeft: __("\u5DE6", "catpow"), hasSliderRight: __("\u53F3", "catpow") } },
              {
                name: "sliderBorder",
                label: __("\u5883\u754C\u52B9\u679C", "catpow"),
                values: "hasSliderBorder",
                sub: [
                  {
                    type: "buttons",
                    values: { hasSliderBorderFade: __("\u307C\u304B\u3057", "catpow"), hasSliderBorderSlope: __("\u50BE\u659C", "catpow"), hasSliderBorderEllipse: __("\u6955\u5186", "catpow") },
                    sub: {
                      hasSliderBorderSlope: [
                        { label: __("\u65B9\u5411\uFF08SP\uFF09", "catpow"), type: "buttons", values: { hasSliderBorderSlopeLeft: __("\u5DE6", "catpow"), hasSliderBorderSlopeRight: __("\u53F3", "catpow") } },
                        { label: __("\u65B9\u5411\uFF08PC\uFF09", "catpow"), type: "buttons", values: { hasSliderBorderSlopeTop: __("\u4E0A", "catpow"), hasSliderBorderSlopeBottom: __("\u4E0B", "catpow") } }
                      ],
                      hasSliderBorderEllipse: [{ type: "buttons", values: { hasSliderBorderEllipseInside: __("\u5185", "catpow"), hasSliderBorderEllipseOutside: __("\u5916", "catpow") } }]
                    }
                  },
                  { name: "amount", input: "range", min: 0, max: 100, step: 10, vars: "vars", key: "--cp-slider-border-amount" }
                ]
              }
            ]
          },
          {
            name: "blendmode",
            label: __("\u30D6\u30EC\u30F3\u30C9\u30E2\u30FC\u30C9", "catpow"),
            vars: "vars",
            key: "--cp-slider-blendmode",
            input: "blendmode"
          },
          {
            name: "opacity",
            label: __("\u4E0D\u900F\u660E\u5EA6", "catpow"),
            vars: "vars",
            key: "--cp-slider-opacity",
            input: "range",
            min: 0,
            max: 1,
            step: 0.1
          },
          heroheaderSelectiveClasses,
          { input: "pictures", label: __("\u753B\u50CF", "catpow"), key: "images", keys: imageKeys.bgImages }
        ];
        wp.hooks.applyFilters("catpow.blocks.heroheader.sliderSelectiveClasses", CP.finderProxy(sliderSelectiveClasses2));
        return sliderSelectiveClasses2;
      }, []);
      useEffect2(() => {
        if (!Element || !ref) {
          return;
        }
        const doc = ref.ownerDocument;
        if (![...doc.scripts].find(({ src }) => src === heroheaderSelectiveClasses.mjs[Element])) {
          const script = doc.createElement("script");
          script.src = heroheaderSelectiveClasses.mjs[Element];
          script.type = "module";
          doc.head.appendChild(script);
        }
      }, [Element, ref]);
      useChangeEffect(() => {
        setAttributes({ params: { ...heroheaderSelectiveClasses.sub[Element][0].default, ...params } });
      }, [Element]);
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: CP.convertCssVarsForPreview(vars) });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30E9\u30A4\u30C0\u30FC", "catpow"), icon: "images-alt", ...{ setAttributes, attributes }, selectiveClasses: sliderSelectiveClasses }), states.hasButtons && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30DC\u30BF\u30F3", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["buttons", attributes.currentItemIndex],
          selectiveClasses: ["buttonParams"]
        }
      )), /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          itemKeys: ["buttons"],
          columns: [
            { type: "icon", label: "icon" },
            { type: "text", key: "text" }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(Element, { class: "wp-block-catpow-heroheader__bg", className: "_bg", ...params }, images.map((image, index) => /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_picture", attributes, keys: imageKeys.bgImages, itemKeys: ["images", index], devices, key: index }))), /* @__PURE__ */ wp.element.createElement("div", { className: bodyClasses, ref: setRef }, /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: HeadingTag,
          className: "_title",
          placeholder: __("\u30BF\u30A4\u30C8\u30EB\u3092\u5165\u529B", "catpow"),
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      ), /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "p",
          className: "_text",
          placeholder: __("\u30C6\u30AD\u30B9\u30C8\u3092\u5165\u529B", "catpow"),
          onChange: (text2) => {
            setAttributes({ text: text2 });
          },
          value: text
        }
      ), states.hasButtons && /* @__PURE__ */ wp.element.createElement("div", { className: "_buttons cp-buttons" }, buttons.map((button, index) => /* @__PURE__ */ wp.element.createElement(CP.Button.Edit, { tag: "li", isItem: true, ...{ setAttributes, attributes }, itemKeys: ["buttons", index], keys: linkKeys, key: index }))))))));
    },
    save({ attributes }) {
      const { classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div" } = attributes;
      const { RichText, useBlockProps } = wp.blockEditor;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, linkKeys } = CP.config.heroheader;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("script", { type: "module", src: heroheaderSelectiveClasses.mjs[Element] }), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement(Element, { className: "_bg", ...params }, images.map((image, index) => /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_picture", attributes, keys: imageKeys.bgImages, itemKeys: ["images", index], devices }))), /* @__PURE__ */ wp.element.createElement("div", { className: bodyClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: text }), states.hasButtons && /* @__PURE__ */ wp.element.createElement("ul", { className: "_buttons" }, buttons.map((button, index) => /* @__PURE__ */ wp.element.createElement(CP.Button, { tag: "li", blockTypeName: "catpow/buttons", ...{ attributes }, itemKeys: ["buttons", index], keys: linkKeys, key: index }))))))));
    }
  });
})();
