(() => {
  // ../components/TableInput/component.jsx
  Catpow.TableInput = (props) => {
    const { className = "TableInput", labels, items, onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange, children } = props;
    const { useState, useCallback, useEffect, useReducer, useMemo, useRef, forwardRef } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), [className]);
    const Row = useMemo(() => {
      return forwardRef((props2, ref) => {
        const { classes: classes2, index, length, children: children2 } = props2;
        return /* @__PURE__ */ wp.element.createElement("tr", { className: classes2() }, children2.map((child, index2) => /* @__PURE__ */ wp.element.createElement("td", { className: classes2.td("is-input"), key: index2 }, child)), /* @__PURE__ */ wp.element.createElement("td", { className: classes2.td("is-control"), key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls() }, index > 0 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.button("is-up"), onClick: () => onMoveItem(index, index - 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.spacer() }), index < length - 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.button("is-down"), onClick: () => onMoveItem(index, index + 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.spacer() }), length > 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.button("is-remove"), onClick: () => onRemoveItem(index) }) : /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.spacer() }), /* @__PURE__ */ wp.element.createElement("div", { className: classes2.td.controls.button("is-add"), onClick: () => onAddItem(index + 1) }))));
      });
    }, [onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("table", { className: classes.table() }, labels && /* @__PURE__ */ wp.element.createElement("thead", { className: classes.table.thead() }, /* @__PURE__ */ wp.element.createElement("tr", { className: classes.table.thead.tr() }, labels.map((label, index) => /* @__PURE__ */ wp.element.createElement("th", { className: classes.table.thead.tr.th(), key: index }, label)), /* @__PURE__ */ wp.element.createElement("td", { className: classes.table.thead.tr.td() }))), /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.table.tbody() }, children.map((child, index) => /* @__PURE__ */ wp.element.createElement(Row, { classes: classes.table.tbody.tr, index, length: children.length, key: index }, child)))));
  };
})();
