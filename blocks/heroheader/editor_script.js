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
      const { classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div", EditMode = false } = attributes;
      const { useState: useState2, useMemo: useMemo2, useEffect: useEffect2, useRef: useRef2 } = wp.element;
      const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const states = CP.classNamesToFlags(attributes.classes);
      const [ref, setRef] = useState2(null);
      const { devices, imageKeys } = CP.config.heroheader;
      const selectiveClasses = useMemo2(() => {
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "color",
          "colorScheme",
          { name: "hasButtons", label: __("\u30DC\u30BF\u30F3", "catow"), values: "hasButtons" },
          {
            name: "blendmode",
            label: __("\u30B9\u30E9\u30A4\u30C0\u30FC\u30D6\u30EC\u30F3\u30C9\u30E2\u30FC\u30C9", "catpow"),
            vars: "vars",
            key: "--cp-slider-blendmode",
            input: "blendmode"
          },
          {
            name: "opacity",
            label: __("\u30B9\u30E9\u30A4\u30C0\u30FC\u4E0D\u900F\u660E\u5EA6", "catpow"),
            vars: "vars",
            key: "--cp-slider-opacity",
            input: "range",
            min: 0,
            max: 1,
            step: 0.1
          },
          "backgroundImage",
          { preset: "hasContentWidth", classKey: "bodyClasses" },
          { name: "hasTextBackground", label: __("\u30C6\u30AD\u30B9\u30C8\u80CC\u666F", "catpow"), values: "hasTextBackground", classKey: "bodyClasses" },
          { preset: "hasPadding", classKey: "bodyClasses" },
          { preset: "textAlign", classKey: "bodyClasses" },
          { preset: "alignContent", classKey: "bodyClasses" },
          { preset: "itemSize", label: "\u30DC\u30BF\u30F3\u30B5\u30A4\u30BA", classKey: "bodyClasses" },
          heroheaderSelectiveClasses,
          { input: "pictures", label: __("\u30B9\u30E9\u30A4\u30C9\u30B7\u30E7\u30FC\u753B\u50CF", "catpow"), key: "images", keys: imageKeys.bgImages }
        ];
        wp.hooks.applyFilters("catpow.blocks.heroheader.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
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
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : attributes.classes, style: CP.convertCssVarsForPreview(vars) });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses })), /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          itemKeys: ["buttons"],
          columns: [
            { type: "icon", label: "icon" },
            { type: "text", key: "text" }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps, ref: setRef }, /* @__PURE__ */ wp.element.createElement("div", { className: bodyClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: HeadingTag,
          className: "_title",
          placeholder: __("\u30BF\u30A4\u30C8\u30EB\u3092\u5165\u529B", "catpow"),
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: attributes.title
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
          value: attributes.text
        }
      )), states.hasButtons && /* @__PURE__ */ wp.element.createElement("div", { className: "_buttons" }, buttons.map((button, index) => /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: "_button", ...{ setAttributes, attributes }, itemKeys: ["buttons", index], indexKey: "currentButtonIndex", key: index }, /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", setAttributes, attributes, keys: { items: "buttons", href: "linkUrl" }, index }, /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: button }), /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "span",
          className: "_text",
          placeholder: __("\u30C6\u30AD\u30B9\u30C8\u3092\u5165\u529B", "catpow"),
          onChange: (text2) => {
            button.text = text2;
            setAttributes({ buttons: [...buttons] });
          },
          value: button.text
        }
      )))))), /* @__PURE__ */ wp.element.createElement(Element, { class: "wp-block-catpow-heroheader__bg", className: "_bg", ...params }, images.map((image, index) => /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_picture", attributes, keys: imageKeys.bgImages, itemKeys: ["images", index], devices, key: index }))))));
    },
    save({ attributes }) {
      const { classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div" } = attributes;
      const { RichText, useBlockProps } = wp.blockEditor;
      const states = CP.classNamesToFlags(attributes.classes);
      const { devices, imageKeys } = CP.config.heroheader;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("script", { type: "module", src: heroheaderSelectiveClasses.mjs[Element] }), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: attributes.classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement("div", { className: bodyClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: attributes.title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: attributes.text })), states.hasButtons && /* @__PURE__ */ wp.element.createElement("ul", { className: "_buttons" }, buttons.map((button, index) => /* @__PURE__ */ wp.element.createElement("li", { className: "_button", key: index }, /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attributes, keys: { items: "buttons", href: "linkUrl" }, index }, /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: button }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "span", className: "_text", value: button.text })))))), /* @__PURE__ */ wp.element.createElement(Element, { className: "_bg", ...params }, images.map((image, index) => /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_picture", attributes, keys: imageKeys.bgImages, itemKeys: ["images", index], devices }))))));
    }
  });
})();
