(() => {
  // ../components/Popup/component.jsx
  Catpow.Popup = (props) => {
    const { children, open, onClose, onClosed, closeButton = false, closeOnClickAway = true } = props;
    const { useState, useEffect } = wp.element;
    const [state, setPopupState] = useState("closed");
    useEffect(() => setPopupState(open ? "open" : "close"), [open]);
    return /* @__PURE__ */ wp.element.createElement(Catpow.External, { id: "PopupContainer", className: "cp-popup-container" }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: "cp-popup " + state,
        onAnimationEnd: () => {
          if (state === "close") {
            setPopupState("closed");
            onClosed && onClosed();
          }
        }
      },
      /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-bg", onClick: () => {
        if (closeOnClickAway) {
          onClose();
        }
      } }),
      /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-contents" }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "close", onClick: onClose })))
    ));
  };
})();
