(() => {
  // ../components/InputText/component.jsx
  Catpow.InputText = (props) => {
    const { onChange, size = null, map = null } = props;
    const { useState, useMemo, useCallback, useEffect, useReducer } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem("cp-inputtext"), []);
    const [value, setValue] = useState(props.value);
    const reverseMap = useMemo(() => {
      if (!map) {
        return null;
      }
      const reverseMap2 = {};
      for (let key in map) {
        reverseMap2[map[key]] = key;
      }
      return reverseMap2;
    }, [map]);
    useEffect(() => {
      setValue(reverseMap && reverseMap[props.value] || props.value);
    }, [setValue, props.value, reverseMap]);
    useEffect(() => {
      const timer = setTimeout(() => {
        onChange(map && map[value] || value);
      }, 500);
      return () => clearTimeout(timer);
    }, [value, map]);
    const onBlurHandle = useCallback(
      (e) => {
        if (props.default && !value) {
          setValue(props.default);
        }
      },
      [props.default]
    );
    const [datalistId, datalist] = useMemo(() => {
      if (props.datalist == null) {
        return [null, null];
      }
      const datalistId2 = (performance.now() * 1e3).toString(16);
      const datalist2 = Array.isArray(props.datalist) ? props.datalist : props.datalist.split(",");
      return [datalistId2, datalist2];
    }, [props.datalist]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("input", { type: "text", className: classes.input(), size, value, onChange: (e) => setValue(e.currentTarget.value), onBlur: onBlurHandle, list: datalistId }), datalist && /* @__PURE__ */ wp.element.createElement("datalist", { id: datalistId }, datalist.map((val) => /* @__PURE__ */ wp.element.createElement("option", { value: val, key: val }))));
  };
})();
