(() => {
  // ../components/SelectNumber/component.jsx
  Catpow.SelectNumber = (props) => {
    const { min = 1, max = 10, label, step = 1, value, onChange } = props;
    const { useState, useMemo } = wp.element;
    const selections = useMemo(() => {
      const selections2 = [];
      for (let i = parseInt(min); i <= parseInt(max); i += parseInt(step)) {
        selections2.push(i);
      }
      return selections2;
    }, [min, max, step]);
    return /* @__PURE__ */ React.createElement("select", { className: "SelectNumber", onChange: (e) => {
      onChange(e.currentTarget.value);
    } }, label && /* @__PURE__ */ React.createElement("option", { selected: value === void 0 }, label), selections.map((i) => /* @__PURE__ */ React.createElement("option", { value: i, selected: value === i, key: i }, i)));
  };
})();
