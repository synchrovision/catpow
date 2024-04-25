(() => {
  // ../components/SelectMenuItem/component.jsx
  Catpow.SelectMenuItem = (props) => {
    const { useCallback, useMemo } = wp.element;
    const { className = "SelectMenuItem", value, onChange } = props;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const [options, setOptions] = useState(false);
    useEffect(() => {
      if (void 0 !== store.menuItems) {
        setOptions(store.menuItems);
        return;
      }
      wp.apiFetch({ path: "/cp/v1/menu/items" }).then((res) => {
        console.log(res);
        store.menuItems = res;
        setOptions(store.menuItems);
      }).catch((e) => {
        console.error(e);
      });
    }, [setOptions]);
    if (options === false) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() });
  };
})();
