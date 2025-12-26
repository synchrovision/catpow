(() => {
  // node_modules-included/catpow/src/util/array/chunk.js
  var chunk = function* (array, size) {
    if (size <= 0) return;
    for (let i = 0; i < array.length; i += size) {
      yield array.slice(i, i + size);
    }
  };

  // node_modules-included/catpow/src/util/array/range.js
  var range = function* (start, end, step = 1) {
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      yield i;
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
    title: "\u{1F43E} T-Banners",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u8907\u6570\u30D0\u30CA\u30FC\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-banners" },
      items: {
        source: "query",
        selector: "tbody td:not(.is-spacer-cell)",
        query: {
          src: { source: "attribute", selector: "[src]", attribute: "src" },
          alt: { source: "attribute", selector: "[src]", attribute: "alt" },
          url: { source: "attribute", selector: "a", attribute: "href" },
          loopImage: { source: "text", selector: "td", default: "[output image]" }
        },
        default: [...range(4)].map(() => ({ src: wpinfo.theme_url + "/images/dummy.jpg", alt: "", url: wpinfo.home_url, loopImage: "[output image]" }))
      },
      width: { source: "attribute", selector: "table", attribute: "width", default: "100%" },
      gapX: { type: "number", default: 10 },
      gapY: { type: "number", default: 10 },
      align: { source: "attribute", selector: "table", attribute: "align", default: "center" },
      columns: { type: "number", default: 2 },
      marginTop: { type: "number", default: 1 },
      marginBottom: { type: "number", default: 1 }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState: useState2, useMemo: useMemo2 } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo2(() => {
        const selectiveClasses2 = [
          { name: "align", input: "buttons", label: __("\u914D\u7F6E", "catpow"), key: "align", options: ["left", "center", "right"] },
          { name: "range", input: "range", label: __("\u5E45", "catpow"), key: "width", min: 10, max: 100, step: 5, unit: "%" },
          { name: "marginTop", input: "range", label: "\u4E0A\u4F59\u767D", key: "marginTop", min: 0, max: 10 },
          { name: "marginBottom", input: "range", label: "\u4E0B\u4F59\u767D", key: "marginBottom", min: 0, max: 10 },
          { name: "gapX", input: "range", label: __("\u6A2A\u9593\u9694", "catpow"), key: "gapX", min: 0, max: 20 },
          { name: "gapY", input: "range", label: __("\u7E26\u9593\u9694", "catpow"), key: "gapY", min: 0, max: 20 },
          { name: "columns", input: "range", label: __("\u5217\u6570", "catpow"), key: "columns", min: 1, max: 5 },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [{ name: "loopImage", label: "\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", input: "text", key: "loopImage" }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-banners.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: columns * 2 - 1 })), [...chunk(items, columns)].map((itemGroup, gIndex) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, gIndex > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${gapY}px` }, colSpan: columns * 2 - 1 })), /* @__PURE__ */ wp.element.createElement("tr", null, itemGroup.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gapX}px` } }), /* @__PURE__ */ wp.element.createElement(CP.Item, { className: "_td", tag: "td", set: setAttributes, attr: attributes, items, index: gIndex * columns + index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", set: setAttributes, attr: attributes, keys: { items: "items", href: "url" }, index: gIndex * columns + index }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          className: "_img",
          set: setAttributes,
          attr: attributes,
          keys: { items: "items", src: "src", alt: "alt", code: "loopImage" },
          index: gIndex * columns + index,
          size: "medium",
          isTemplate: states.isTemplate
        }
      ))))), [...Array(columns - itemGroup.length)].map((_, index) => /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", key: "spacer_" + index }))))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: columns * 2 - 1 }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes }) {
      const { classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width, align }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: columns * 2 - 1 })), [...chunk(items, columns)].map((itemGroup, gIndex) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, gIndex > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${gapY}px` }, colSpan: columns * 2 - 1 })), /* @__PURE__ */ wp.element.createElement("tr", null, itemGroup.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gapX}px` } }), /* @__PURE__ */ wp.element.createElement("td", { key: index }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link", href: item.url }, states.isTemplate ? loopImage : /* @__PURE__ */ wp.element.createElement("img", { width: "100%", height: "auto", src: item.src, alt: item.alt }))))), [...Array(columns - itemGroup.length)].map((_, index) => /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", key: "spacer_" + index }))))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: columns * 2 - 1 })))));
    }
  });
})();
