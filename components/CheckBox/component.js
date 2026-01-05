(() => {
  // ../components/CheckBox/component.jsx
  Catpow.CheckBox = (props) => {
    const { label, onChange } = props;
    const { useState } = wp.element;
    const selected = props.selected || props.value;
    if (label) {
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: "cp-checkbox" + (selected ? " selected" : ""),
          onClick: (e) => {
            onChange(!selected);
          },
          role: "checkbox",
          "aria-checked": selected
        },
        /* @__PURE__ */ wp.element.createElement("div", { className: "cp-checkbox__icon" + (selected ? " selected" : "") }, " "),
        label
      );
    }
    return /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: "cp-checkbox__icon" + (selected ? " selected" : ""),
        onClick: (e) => {
          onChange(!selected);
        },
        role: "checkbox",
        "aria-checked": selected
      },
      " "
    );
  };
})();
