(() => {
  // ../components/SelectMenuItem/component.jsx
  Catpow.SelectMenuItem = (props) => {
    const { useCallback, useMemo, useState, useEffect } = wp.element;
    const { className = "SelectMenuItem", value, onChange } = props;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { cache } = Catpow.SelectMenuItem;
    const [options, setOptions] = useState(false);
    useEffect(() => {
      if (void 0 !== cache.menuItems) {
        setOptions(cache.menuItems);
        return;
      }
      wp.apiFetch({ path: "/cp/v1/menu/items" }).then((res) => {
        console.log(res);
        cache.menuItems = res;
        setOptions(cache.menuItems);
      }).catch((e) => {
        console.error(e);
      });
    }, [setOptions]);
    if (options === false) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() });
  };
  Catpow.SelectMenuItem.cache = {};
})();
