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

  // ../components/JsonEditor/Image/component.jsx
  window.Catpow.JsonEditor.Image = (props) => {
    const { className = "cp-jsoneditor-input-image", agent, onUpdate, keys = ["url", "alt", "width", "height", "id", "mime"] } = props;
    const onChangeHandle = useCallback((originalValue) => {
      const value = keys.reduce((value2, key) => {
        if (originalValue[key] !== void 0) {
          value2[key] = originalValue[key];
        }
        return value2;
      }, {});
      onUpdate(value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMedia, { src: agent.getValue() && agent.getValue().url, onChange: onChangeHandle }));
  };
})();
