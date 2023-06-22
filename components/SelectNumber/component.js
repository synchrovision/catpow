(() => {
  // ../components/SelectNumber/component.jsx
  Catpow.SelectNumber = (props) => {
    const { min = 1, max = 10, label, step = 1, exclude = false, value, onChange } = props;
    const { useState, useMemo } = wp.element;
    const selections = useMemo(() => {
      const selections2 = [];
      for (let i = parseInt(min); i <= parseInt(max); i += parseInt(step)) {
        selections2.push(i);
      }
      return selections2;
    }, [min, max, step]);
    return /* @__PURE__ */ wp.element.createElement("select", { className: "SelectNumber", vaule: value, onChange: (e) => {
      onChange(e.currentTarget.value);
    } }, label && /* @__PURE__ */ wp.element.createElement("option", null, label), selections.map((i) => /* @__PURE__ */ wp.element.createElement("option", { value: i, disabled: exclude && exclude.includes(i), key: i }, i)));
  };
})();
