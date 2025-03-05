import { CP } from "./CP.jsx";
import { bem, classNamesToFlags, flagsToClassNames } from "catpow/util";

CP.CustomColorVars = (props) => {
  const { useState, useRef, useMemo, useCallback } = wp.element;
  const {
    ColorPicker,
    CheckboxControl,
    Flex,
    FlexItem,
    FlexBlock,
    Button,
    Popover,
  } = wp.components;
  const { label = "カスタムカラー", value, onChange } = props;
  const cache = useRef(value);
  const [index, setIndex] = useState(-1);
  const [useCustomColor, setUseCustomColor] = useState(
    Object.keys(value).length > 0
  );
  const classes = bem("cp-customcolorvars");
  const roles = [
    { key: "b", label: "背景色" },
    { key: "s", label: "強調背景色" },
    { key: "t", label: "文字色" },
    { key: "m", label: "基本色" },
    { key: "a", label: "強調色" },
    { key: "i", label: "反転文字色" },
  ];
  const keys = ["h", "s", "l"];

  const originalColors = useMemo(() => {
    const originalColors = {};
    const selectedBlock = wp.data
      .select("core/block-editor")
      .getSelectedBlock();
    const editorCanvas = document.querySelector('iframe[name="editor-canvas"]');
    const el = (
      editorCanvas ? editorCanvas.contentDocument : document
    ).getElementById("block-" + selectedBlock.clientId);
    if (!el) {
      return originalColors;
    }
    const styles = window.getComputedStyle(el);
    roles.forEach((role) => {
      const hsla = {};
      keys.forEach((key) => {
        hsla[key] = styles.getPropertyValue(`--cp-tones-${role.key}-${key}`);
      });
      originalColors[role.key] = `hsl(${hsla.h},${hsla.s},${hsla.l})`;
    });
    return originalColors;
  }, []);
  const colors = useMemo(() => {
    const colors = {};
    roles.forEach((role) => {
      const hsla = {};
      if (
        keys.every((key) => {
          const name = `--cp-tones-${role.key}-${key}`;
          if (!value.hasOwnProperty(name)) {
            return false;
          }
          hsla[key] = value[name];
          return true;
        })
      ) {
        colors[role.key] = `hsl(${hsla.h},${hsla.s},${hsla.l})`;
      }
    });
    return colors;
  }, []);

  const Item = useCallback((props) => {
    const { classes, role, originalColor, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isCustomized, setIsCustomized] = useState(!!props.color);
    const [color, setColor] = useState(props.color || originalColor);

    const onChangeComplete = useCallback(
      (color) => {
        setIsCustomized(true);
        setColor(color.hex);
        onChange({
          [`--cp-tones-${role.key}-h`]: color.hsl.h + "",
          [`--cp-tones-${role.key}-s`]: color.hsl.s + "%",
          [`--cp-tones-${role.key}-l`]: color.hsl.l + "%",
        });
      },
      [onChange, role, setColor]
    );
    const clearColorVars = useCallback(() => {
      setIsCustomized(false);
      setColor(originalColor);
      onChange({
        [`--cp-tones-${role.key}-h`]: null,
        [`--cp-tones-${role.key}-s`]: null,
        [`--cp-tones-${role.key}-l`]: null,
      });
    }, [onChange, role, originalColor, setColor, setIsCustomized]);

    return (
      <div className={classes(flagsToClassNames({ isCustomized }))}>
        <div
          className={classes.chip()}
          onClick={() => setIsOpen(!isOpen)}
          style={{ backgroundColor: color }}
        >
          <div className={classes.chip.label()}>{role.label}</div>
        </div>
        {isOpen && (
          <Popover onClose={() => setIsOpen(false)}>
            <ColorPicker color={color} onChangeComplete={onChangeComplete} />
            <Flex justify="center">
              <FlexItem>
                <Button text="CLEAR" onClick={clearColorVars} />
              </FlexItem>
            </Flex>
          </Popover>
        )}
      </div>
    );
  }, []);
  const clearAllColorVars = useCallback(() => {
    const vars = {};
    roles.forEach((role) => {
      keys.forEach((key) => {
        vars[`--cp-tones-${role.key}-${key}`] = null;
      });
    });
    onChange(vars);
  }, [onChange]);

  return (
    <div className={classes()}>
      <CheckboxControl
        label={label}
        onChange={() => {
          if (useCustomColor) {
            cache.current = value;
            clearAllColorVars();
          } else {
            onChange(cache.current);
          }
          setUseCustomColor(!useCustomColor);
        }}
        checked={useCustomColor}
      />
      <div className={classes.items({ "is-active": useCustomColor })}>
        {roles.map((role) => (
          <Item
            role={role}
            classes={classes.items.item}
            onChange={onChange}
            color={colors[role.key] || false}
            originalColor={originalColors[role.key]}
            key={role.key}
          />
        ))}
      </div>
    </div>
  );
};
