(() => {
  // node_modules-included/catpow/src/util/array/chunk.js
  var chunk = function* (array, size) {
    if (size <= 0) return;
    for (let i = 0; i < array.length; i += size) {
      yield array.slice(i, i + size);
    }
  };

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

  // ../blocks/t-banners/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-banners", {
    icon: "editor-code",
    category: "catpow-mail",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState: useState2, useMemo: useMemo2 } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo2(() => {
        const selectiveClasses2 = [
          { name: "align", input: "buttons", label: __("\u914D\u7F6E", "catpow"), key: "align", options: ["left", "center", "right"] },
          { name: "range", input: "range", label: __("\u5E45", "catpow"), key: "width", min: 10, max: 100, step: 5, unit: "%" },
          { name: "marginTop", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "marginTop", min: 0, max: 10 },
          { name: "marginBottom", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "marginBottom", min: 0, max: 10 },
          { name: "gapX", input: "range", label: __("\u6A2A\u9593\u9694", "catpow"), key: "gapX", min: 0, max: 20 },
          { name: "gapY", input: "range", label: __("\u7E26\u9593\u9694", "catpow"), key: "gapY", min: 0, max: 20 },
          { name: "columns", input: "range", label: __("\u5217\u6570", "catpow"), key: "columns", min: 1, max: 5 },
          {
            name: "template",
            input: "bool",
            key: "isTemplate",
            sub: [{ name: "loopImage", label: __("\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", "catpow"), input: "text", key: "loopImage" }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-banners.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps({ className: classes }), width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: columns * 2 - 1 })), [...chunk(items, columns)].map((itemGroup, gIndex) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, gIndex > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${gapY}px` }, colSpan: columns * 2 - 1 })), /* @__PURE__ */ wp.element.createElement("tr", null, itemGroup.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gapX}px` } }), /* @__PURE__ */ wp.element.createElement(CP.Item, { className: "_td", tag: "td", ...{ setAttributes, attributes }, itemKeys: ["items", gIndex * columns + index], key: index }, /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", setAttributes, attributes, keys: { items: "items", href: "url" }, itemKeys: ["items", gIndex * columns + index] }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          className: "_img",
          setAttributes,
          attributes,
          keys: { items: "items", src: "src", alt: "alt", code: "loopImage" },
          itemKeys: ["items", gIndex * columns + index],
          size: "medium",
          isTemplate
        }
      ))))), [...Array(columns - itemGroup.length)].map((_, index) => /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", key: "spacer_" + index }))))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: columns * 2 - 1 }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes }) {
      const { useBlockProps } = wp.blockEditor;
      const { isTemplate, classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps.save({ className: classes }), width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: columns * 2 - 1 })), [...chunk(items, columns)].map((itemGroup, gIndex) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, gIndex > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${gapY}px` }, colSpan: columns * 2 - 1 })), /* @__PURE__ */ wp.element.createElement("tr", null, itemGroup.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gapX}px` } }), /* @__PURE__ */ wp.element.createElement("td", { key: index }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link", href: item.url }, isTemplate ? loopImage : /* @__PURE__ */ wp.element.createElement("img", { width: "100%", height: "auto", src: item.src, alt: item.alt }))))), [...Array(columns - itemGroup.length)].map((_, index) => /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", key: "spacer_" + index }))))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: columns * 2 - 1 })))));
    }
  });
})();
