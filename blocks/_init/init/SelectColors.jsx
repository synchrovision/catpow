import { CP } from "./CP.jsx";

CP.SelectColors = (props) => {
  const { useState, useRef, useReducer, useCallback } = wp.element;
  const { ColorPicker, ColorPalette, Popover } = wp.components;
  const { onChange } = props;
  const [index, setIndex] = useState(-1);

  const init = useCallback((colors) => {
    const colorValues = colors.map((color) => {
      if (typeof color === "string") {
        return color;
      }
      if ("h" in color) {
        if ("a" in color) {
          return `hsla(${color.h},${color.s},${color.l},${color.a})`;
        }
        return `hsl(${color.h},${color.s},${color.l})`;
      }
      if ("a" in color) {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
      }
      return `rgba(${color.r},${color.g},${color.b})`;
    });
    return colorValues.map((color) => {
      return { name: color, color };
    });
  }, []);
  const reducer = useCallback((colors, action) => {
    const { index, color } = action;
    const newColors = [...colors];
    newColors.splice(index, 1, { name: color, color });
    return newColors;
  }, []);
  const [colors, updateColors] = useReducer(reducer, props.colors, init);
  const onChangeOfColorPalette = useCallback(
    (value) => {
      setIndex(colors.findIndex((color) => color.color == value));
    },
    [colors]
  );
  const onChangeOfColorPicker = useCallback(
    (value) => {
      updateColors({ index, color: value.hex });
      onChange(index, value);
    },
    [onChange, index, updateColors]
  );

  return (
    <div>
      <ColorPalette
        colors={colors}
        value={index > -1 ? colors[index].color : "rgba(0,0,0,0)"}
        onChange={onChangeOfColorPalette}
        disableCustomColors={true}
      />
      {index > -1 && (
        <Popover onClose={() => setIndex(-1)}>
          <ColorPicker
            color={colors[index].color}
            onChangeComplete={onChangeOfColorPicker}
          />
        </Popover>
      )}
    </div>
  );
};
