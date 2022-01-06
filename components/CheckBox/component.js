Catpow.CheckBox = function (props) {
  var label = props.label,
      onChange = props.onChange;
  var useState = wp.element.useState;
  var selected = props.selected || props.value;

  if (label) {
    return wp.element.createElement("div", {
      className: "CheckBox" + (selected ? ' selected' : ''),
      onClick: function onClick(e) {
        onChange(!selected);
      },
      role: "checkbox",
      "aria-checked": selected
    }, wp.element.createElement("div", {
      className: "CheckBoxIcon" + (selected ? ' selected' : '')
    }, " "), label);
  }

  return wp.element.createElement("div", {
    className: "CheckBoxIcon" + (selected ? ' selected' : ''),
    onClick: function onClick(e) {
      onChange(!selected);
    },
    role: "checkbox",
    "aria-checked": selected
  }, " ");
};
