(() => {
  // ../ui/SelectColor/input.jsx
  Catpow.UI.SelectColor = (props) => {
    const { useState, useEffect } = wp.element;
    const { name } = props;
    const [value, setValue] = useState(props.value);
    const color = value.substr(5) || 0;
    var items = Array.from(Array(13), (v, i) => {
      var classes = "fillColor" + i;
      if (color == i) {
        classes += " active";
      }
      return /* @__PURE__ */ React.createElement("li", { className: classes, onClick: () => {
        setValue("color" + i);
      } }, " ");
    });
    ;
    return /* @__PURE__ */ React.createElement("div", { className: "SelectColor" }, /* @__PURE__ */ React.createElement("ul", null, items), /* @__PURE__ */ React.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
