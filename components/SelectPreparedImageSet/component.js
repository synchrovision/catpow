(() => {
  // ../components/SelectPreparedImageSet/component.jsx
  Catpow.SelectPreparedImageSet = (props) => {
    const { className = "cp-selectpreparedimageset", name, value, color, onChange, ...otherProps } = props;
    const { useEffect, useReducer, useMemo } = wp.element;
    const { getURLparam, setURLparam, setURLparams, removeURLparam, bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const [state, dispatch] = wp.element.useReducer((state2, action) => {
      switch (action.type) {
        case "update":
          if (action.imagesets) {
            state2.imagesets = action.imagesets;
            const bareURL = removeURLparam(value, "c");
            for (const key in state2.imagesets) {
              if (state2.imagesets[key].url === bareURL) {
                state2.imageset = state2.imagesets[key];
                break;
              }
            }
          }
          if (action.imageset) {
            state2.imageset = action.imageset;
          }
          if (state2.imageset) {
            onChange(state2.imageset.map((item) => {
              return { ...item, url: setURLparams(item.url, { c: color, theme: wpinfo.theme }) };
            }));
          }
      }
      return { ...state2 };
    }, { page: 0, imagesets: null, imageset: null });
    const cache = useMemo(() => {
      if (Catpow.SelectPreparedImage.cache == null) {
        Catpow.SelectPreparedImage.cache = {};
      }
      return Catpow.SelectPreparedImage.cache;
    }, []);
    if (state.imagesets === null) {
      if (cache[name]) {
        dispatch({ type: "update", imagesets: cache[name] });
      } else {
        wp.apiFetch({ path: "cp/v1/imageset/" + name }).then((imagesets) => {
          cache[name] = imagesets;
          dispatch({ type: "update", imagesets });
        });
      }
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("ul", { className: classes("is-" + name), ...otherProps }, Object.keys(state.imagesets).map((key) => {
      const imageset = state.imagesets[key];
      const url = setURLparams(imageset[0].url, { c: color, theme: wpinfo.theme });
      return /* @__PURE__ */ wp.element.createElement("li", { className: classes.item({ "is-active": value == url }), key }, /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          className: classes.item._img(),
          src: url,
          alt: imageset[0].alt,
          onClick: () => dispatch({ type: "update", imageset })
        }
      ));
    }));
  };
})();
