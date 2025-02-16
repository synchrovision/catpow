(() => {
  // ../components/Popover/component.jsx
  Catpow.Popover = function(props) {
    const { className = "cp-popover", children, open, onClose, size = "middle", closeButton = false, closeOnClickAway = true } = props;
    const { Fragment, useEffect, useState, useRef } = wp.element;
    const [state, setPopoverState] = useState("closed");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const { bem } = Catpow.util;
    const classes = bem(className);
    useEffect(() => setPopoverState(open ? "open" : state === "closed" ? "closed" : "close"), [open]);
    const ref = useRef({});
    const [contentRef, setContentRef] = useState();
    useEffect(() => {
      if (ref.current.getBoundingClientRect && open) {
        const bnd = ref.current.getBoundingClientRect();
        const x = bnd.left + bnd.width / 2;
        const ux = window.innerWidth / 8, cy = window.innerHeight / 2;
        setPositionY(bnd.bottom < cy ? "bottom" : "top");
        setPositionX(x < ux * 3 ? "right" : x > ux * 5 ? "left" : "center");
      }
    }, [ref, open]);
    useEffect(() => {
      if (!open || !contentRef || !onClose || !closeOnClickAway) {
        return;
      }
      const doc = contentRef.ownerDocument;
      const cb = (e) => {
        if (!contentRef.contains(e.target)) {
          onClose();
          doc.body.removeEventListener("click", cb);
        }
      };
      requestAnimationFrame(() => {
        doc.body.addEventListener("click", cb);
      });
      return () => doc.body.removeEventListener("click", cb);
    }, [open, onClose, closeOnClickAway, contentRef]);
    return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes.anchor(), ref }), /* @__PURE__ */ wp.element.createElement(Catpow.External, { className: classes.container(), trace: ref.current }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes(`is-size-${size} is-${state} is-${positionX} is-${positionY}`),
        onAnimationEnd: () => {
          if (state === "close") {
            setPopoverState("closed");
          }
        },
        ref: setContentRef
      },
      /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.arrow() }), /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.contents() }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.control() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.control.button("is-button-close"), onClick: onClose })))
    )));
  };
})();
