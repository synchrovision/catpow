(() => {
  // ../components/Popup/component.jsx
  Catpow.Popup = (props) => {
    const { children, open, onClose, onClosed, closeButton = false, closeOnClickAway = true } = props;
    const { useState, useEffect, useRef } = wp.element;
    const [state, setPopupState] = useState("closed");
    useEffect(() => setPopupState(open ? "open" : "close"), [open]);
    const ref = useRef({});
    useEffect(() => {
      if (state === "close") {
        setTimeout(() => {
          Promise.all(ref.current.getAnimations({ subTree: true }).map((animation) => animation.finished)).then(() => {
            setPopupState("closed");
            onClosed && onClosed();
          });
        }, 100);
      }
    }, [state]);
    return /* @__PURE__ */ wp.element.createElement(Catpow.External, { id: "PopupContainer", className: "cp-popup__container" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup is-" + state, ref }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: "cp-popup__bg",
        onClick: () => {
          if (closeOnClickAway) {
            onClose();
          }
        }
      }
    ), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup__body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-contents" }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-control__close", onClick: onClose })))));
  };
})();
