(() => {
  // ../components/Contents/component.jsx
  Catpow.Contents = (props) => {
    const { useEffect, useRef } = wp.element;
    const { className = "cp-contents", deps, html } = props;
    const ref = useRef({});
    useEffect(() => {
      ref.current.innerHTML = html;
      if (deps.styles) {
        deps.styles.filter((href) => {
          for (let i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[i].href === href) {
              return false;
            }
          }
          return true;
        }).map((href) => {
          const el = document.createElement("link");
          el.setAttribute("rel", "stylesheet");
          el.setAttribute("href", href);
          document.head.appendChild(el);
        });
      }
      if (deps.scripts) {
        deps.scripts.filter((src) => {
          for (let i = 0; i < document.scripts.length; i++) {
            if (document.scripts[i].src === src) {
              return false;
            }
          }
          return true;
        }).map((src) => {
          const el = document.createElement("script");
          el.setAttribute("type", "stylesheet");
          el.setAttribute("src", src);
          document.body.appendChild(el);
        });
      }
    }, [html, deps]);
    return /* @__PURE__ */ wp.element.createElement("div", { className, ref });
  };
})();
