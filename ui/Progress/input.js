(() => {
  // ../ui/Progress/input.jsx
  Catpow.UI.Progress = ({ name, value, max = 100, step = 1 }) => {
    const { useState } = wp.element;
    const [val, setVal] = useState(value);
    const [drawing, setDrawing] = useState(false);
    const updateVal = (e) => {
      if (!drawing) {
        return false;
      }
      const bnd = e.currentTarget.getBoundingClientRect();
      setVal(Math.round((e.clientX - bnd.left) / bnd.width * max / step) * step);
    };
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cpui-progress" }, /* @__PURE__ */ wp.element.createElement(
      "progress",
      {
        value: val,
        max,
        onMouseMove: updateVal,
        onMouseDown: () => setDrawing(true),
        onMouseUp: () => setDrawing(false),
        onMouseLeave: () => setDrawing(false)
      },
      val
    ), /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "numer",
        onChange: (e) => {
          setVal(e.currentTarget.value);
        },
        value: val,
        max,
        min: 0,
        size: 3,
        step
      }
    ), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value: val }));
  };
})();
