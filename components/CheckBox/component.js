(() => {
  // ../components/CheckBox/component.jsx
  Catpow.CheckBox = (props) => {
    const { label, onChange } = props;
    const { useState } = wp.element;
    const selected = props.selected || props.value;
    if (label) {
      return /* @__PURE__ */ React.createElement("div", { className: "CheckBox" + (selected ? " selected" : ""), onClick: (e) => {
        onChange(!selected);
      }, role: "checkbox", "aria-checked": selected }, /* @__PURE__ */ React.createElement("div", { className: "CheckBoxIcon" + (selected ? " selected" : "") }, " "), label);
    }
    return /* @__PURE__ */ React.createElement("div", { className: "CheckBoxIcon" + (selected ? " selected" : ""), onClick: (e) => {
      onChange(!selected);
    }, role: "checkbox", "aria-checked": selected }, " ");
  };
})();
