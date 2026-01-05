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

  // ../blocks/artframe/editor_script.jsx
  wp.blocks.registerBlockType("catpow/artframe", {
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return wp.blocks.createBlock("catpow/artframe", { classes: "wp-block-catpow-artframe" }, innerBlocks);
          }
        }
      ]
    },
    example: CP.example,
    edit(props) {
      const { useMemo: useMemo2 } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { attributes, setAttributes } = props;
      const { classes, contentsClasses, contentsBodyClasses, vars, params, element: Element = "div" } = attributes;
      const selectiveClasses = useMemo2(() => {
        const selectiveClasses2 = [
          "color",
          "colorScheme",
          "zIndex",
          { preset: "backgroundColor", classKey: "contentsClasses" },
          { preset: "backgroundImage", classKey: "contentsClasses" },
          { preset: "backgroundPattern", classKey: "contentsClasses" },
          { preset: "contentWidth", classKey: "contentsBodyClasses" },
          "hasMargin",
          { preset: "hasPadding", classKey: "contentsBodyClasses" },
          artframeSelectiveClasses
        ];
        wp.hooks.applyFilters("catpow.blocks.artframe.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      useChangeEffect(() => {
        setAttributes({ params: { ...artframeSelectiveClasses.sub[Element][0].default, ...params } });
      }, [Element]);
      const blockProps = useBlockProps({ className: classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(Element, { ...params }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsBodyClasses }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", initialOpen: true, icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes, contentsClasses, contentsBodyClasses, vars, params, element: Element = "div" } = attributes;
      const blockProps = useBlockProps.save({ className: classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("script", { type: "module", src: artframeSelectiveClasses.mjs[Element] }), /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(Element, { ...params }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsBodyClasses }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))))));
    }
  });
})();
