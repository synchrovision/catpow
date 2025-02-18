(() => {
  // ../components/FixedBG/component.jsx
  Catpow.FixedBG = (props) => {
    const { useEffect, useRef } = wp.element;
    const { className = "FixedBG" } = props;
    const ref = useRef({});
    const bg = useRef({});
    useEffect(() => {
      var requestID;
      const update = () => {
        const bnd = ref.current.parentNode.getBoundingClientRect();
        const winh = window.innerHeight;
        const t = Math.max(0, Math.min(bnd.top, winh));
        ref.current.style.top = t + "px";
        ref.current.style.bottom = Math.max(0, winh - bnd.bottom) + "px";
        bg.current.style.top = -t + "px";
        requestID = window.requestAnimationFrame(update);
      };
      update();
      return () => {
        window.cancelAnimationFrame(requestID);
      };
    }, [props]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-fixedbg", ref }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-fixedbg__contents", ref: bg }, props.children));
  };
})();
