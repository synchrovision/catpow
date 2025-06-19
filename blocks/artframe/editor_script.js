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

  // modules/src/hooks/useAgent.jsx
  var { useMemo: useMemo2, useState: useState2, useCallback: useCallback2, useRef: useRef2, useEffect: useEffect2, createContext: createContext2, useContext: useContext2, lazy } = react_default;
  var AgentContext = createContext2();

  // modules/src/hooks/useThrottle.jsx
  var { useEffect: useEffect3, useRef: useRef3 } = react_default;

  // modules/src/hooks/useDebounce.jsx
  var { useEffect: useEffect4 } = react_default;

  // modules/src/hooks/useChangeEffect.jsx
  var useChangeEffect = (callback, deps) => {
    const { useEffect: useEffect5, useRef: useRef4 } = react_default;
    const ref = useRef4(true);
    useEffect5(() => {
      if (ref.current) {
        ref.current = false;
      } else {
        return callback();
      }
    }, deps);
  };

  // ../blocks/artframe/editor_script.jsx
  wp.blocks.registerBlockType("catpow/artframe", {
    title: "\u{1F43E} ArtFrame",
    description: "\u5207\u308A\u629C\u304D\u3068\u88C5\u98FE\u30A2\u30FC\u30C8\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "images-alt",
    category: "catpow",
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
      const { useMemo: useMemo3 } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { attributes, setAttributes } = props;
      const { params, element: Element2 = "div" } = attributes;
      const selectiveClasses = useMemo3(() => {
        const selectiveClasses2 = ["color", "colorScheme", artframeSelectiveClasses];
        wp.hooks.applyFilters("catpow.blocks.artframe.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      useChangeEffect(() => {
        setAttributes({ params: { ...artframeSelectiveClasses.sub[Element2][0].default, ...params } });
      }, [Element2]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(Element2, { ...params }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { params, element: Element2 = "div" } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("script", { type: "module", src: artframeSelectiveClasses.mjs[Element2] }), /* @__PURE__ */ wp.element.createElement(Element2, { ...params }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
