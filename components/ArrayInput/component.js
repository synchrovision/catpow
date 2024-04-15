(() => {
  // ../components/ArrayInput/component.jsx
  Catpow.ArrayInput = (props) => {
    const { className = "ArrayInput", items, onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange, children } = props;
    const { useState, useCallback, useEffect, useReducer, useMemo, useRef, forwardRef } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), [className]);
    const Item = useMemo(() => {
      return forwardRef((props2, ref) => {
        const { classes: classes2, index, length, children: children2 } = props2;
        return /* @__PURE__ */ wp.element.createElement("li", { className: classes2() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.body() }, /* @__PURE__ */ wp.element.createElement("span", null, props2.id), children2), /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls() }, index > 0 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.button("is-up"), onClick: () => onMoveItem(index, index - 1) }, "\u2191") : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.spacer() }), index < length - 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.button("is-down"), onClick: () => onMoveItem(index, index + 1) }, "\u2193") : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.spacer() }), length > 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.button("is-remove"), onClick: () => onRemoveItem(index) }, "-") : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.spacer() }), /* @__PURE__ */ wp.element.createElement("div", { className: classes2.controls.button("is-add"), onClick: () => onAddItem(index + 1) }, "+")));
      });
    }, [onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items() }, children.map((child, index) => /* @__PURE__ */ wp.element.createElement(Item, { classes: classes.items.item, index, length: children.length, key: index }, child))));
  };
})();
