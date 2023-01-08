(() => {
  // default/config/template/finder/app.jsx
  window.app = (props) => {
    const { Finder } = Catpow;
    const { SelectLayout } = Finder;
    return /* @__PURE__ */ wp.element.createElement(Finder, { ...props }, /* @__PURE__ */ wp.element.createElement(SelectLayout, null));
  };
})();
