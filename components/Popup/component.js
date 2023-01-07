(() => {
  // ../components/Popup/component.jsx
  Catpow.Popup = (props) => {
    const { children, open, onClose, onClosed, closeButton = false, closeOnClickAway = true } = props;
    const { useState, useEffect } = wp.element;
    const [state, setPopupState] = useState("closed");
    useEffect(() => setPopupState(open ? "open" : "close"), [open]);
    return /* @__PURE__ */ React.createElement(Catpow.External, { id: "PopupContainer", className: "PopupContainer" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "Popup " + state,
        onAnimationEnd: () => {
          if (state === "close") {
            setPopupState("closed");
            onClosed && onClosed();
          }
        }
      },
      /* @__PURE__ */ React.createElement("div", { class: "PopupBG", onClick: () => {
        if (closeOnClickAway) {
          onClose();
        }
      } }),
      /* @__PURE__ */ React.createElement("div", { class: "PopupBody" }, /* @__PURE__ */ React.createElement("div", { className: "PopupContents" }, children), closeButton && /* @__PURE__ */ React.createElement("div", { className: "PopupControl" }, /* @__PURE__ */ React.createElement("div", { className: "close", onClick: onClose })))
    ));
  };
})();
