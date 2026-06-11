(() => {
  // ../components/Popover/component.jsx
  Catpow.Popover = function(props) {
    const { className = "cp-popover", children, open = false, onClose, size = "middle", closeButton = false, closeOnClickAway = true } = props;
    const { Fragment, useEffect, useLayoutEffect, useState, useRef } = wp.element;
    const [isOpen, setIsOpen] = useState(!!open);
    const [popoverRef, setPopoverRef] = useState();
    useEffect(() => {
      setIsOpen(!!open);
    }, [open]);
    useLayoutEffect(() => {
      if (popoverRef?.togglePopover) {
        popoverRef.togglePopover(isOpen);
      }
    }, [isOpen]);
    console.log("Popover");
    return /* @__PURE__ */ wp.element.createElement(Catpow.Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: `${className} is-size-${size} is-${isOpen ? "open" : "close"}` }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: "_anchor",
        onClick: () => {
          setIsOpen(!isOpen);
        }
      }
    ), /* @__PURE__ */ wp.element.createElement("div", { className: "_body", inert: !isOpen, popover: closeOnClickAway ? "auto" : "manual", ref: setPopoverRef }, /* @__PURE__ */ wp.element.createElement("div", { className: "_arrow" }), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: "_control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_button is-button-close", onClick: () => setIsOpen(false) })))));
  };
})();
