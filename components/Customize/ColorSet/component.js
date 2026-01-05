(() => {
  // ../components/Customize/ColorSet/component.jsx
  Catpow.Customize.ColorSet = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const { ColorPicker } = wp.components;
    const { id, value, onChange, param } = props;
    const { roles } = param;
    const [inputMode, setInputMode] = useState("pane");
    const { hexToHsl, hslToHex, hexToHsb } = Catpow.util;
    const [activeRole, setActiveRole] = useState(null);
    const isDarkColor = useCallback((color) => {
      if (!color) {
        return true;
      }
      if (/^#(\w{6}|\w{8})$/.test(color)) {
        return color.match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).reduce((p, c, i) => p + parseInt(c, 16) * [3, 6, 2][i], 0) < 1536;
      }
      if (color.slice(0, 3) === "hsl") {
        return getTones(color).l < 60;
      }
    }, []);
    const getTextColorForTone = useCallback((tone) => {
      if (tone.l < 70) {
        return "#FFFFFF";
      }
      return hslToHex({ h: tone.h, s: tone.s / 2, l: Math.max(0, Math.min(100, tone.l * 2 - 150)) });
    }, []);
    const autoDefine = useCallback((colors2, key, flag) => {
      if (flag & 1) {
        if (key === "b") {
          const bla = colors2.tones.b.l * 4 / 1e3;
          colors2.shade = "hsla(0,0%,0%," + Math.pround(0.6 - bla, 3) + ")";
          colors2.shadow = "hsla(0,0%,0%," + Math.pround(0.7 - bla, 3) + ")";
          colors2.tones.sh = getTones(colors2.shade);
          colors2.tones.shd = getTones(colors2.shadow);
        }
      }
      if (flag & 2) {
        if (key === "b") {
          colors2.text = getTextColorForTone(colors2.tones.b);
          colors2.tones.t = getTones(colors2.text);
        }
      }
      if (flag & 4) {
        if (key === "b") {
          colors2.sheet = hslToHex({ h: colors2.tones.b.h, s: colors2.tones.b.s, l: colors2.tones.b.l + (colors2.tones.b.l < 50 ? 5 : -5) });
          colors2.tones.s = getTones(colors2.sheet);
        }
      }
      if (flag & 8) {
        if (key === "b") {
          const bla = colors2.tones.b.l * 4 / 1e3;
          colors2.light = "hsla(0,0%,100%," + Math.pround(0.1 + bla, 3) + ")";
          colors2.tones.lt = getTones(colors2.light);
        }
      }
      if (flag & 16) {
        if (key === "m") {
          colors2.inside = getTextColorForTone(colors2.tones.m);
          colors2.tones.i = getTones(colors2.inside);
        }
      }
      if (flag & 32) {
        if (key === "m") {
          colors2.accent = hslToHex({
            h: colors2.tones.m.h,
            s: Math.min(100, colors2.tones.m.s * 1.4),
            l: colors2.tones.m.l < 40 ? 50 : colors2.tones.m.l - 20
          });
          colors2.tones.a = getTones(colors2.accent);
        }
      }
    }, []);
    const getTones = useCallback((color) => {
      var hsl, hsb;
      if (/^#(\w{6}|\w{8})$/.test(color)) {
        hsl = hexToHsl(color);
        hsb = hexToHsb(color);
        return {
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: color.length === 9 ? parseInt(color.slice(-2), 16) / 255 : 1,
          t: 1 - hsl.l / 100,
          S: hsb.s,
          B: hsb.b
        };
      }
      if (color.slice(0, 3) === "hsl") {
        const matches = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d\.]+))?\)/);
        return {
          h: matches[1],
          s: matches[2],
          l: matches[3],
          a: matches[4] === void 0 ? 1 : matches[4]
        };
      }
    }, []);
    const colorReducer = useCallback((colors2, action) => {
      if (action.autoDefine) {
        return { ...colors2, autoDefine: action.autoDefine ^ colors2.autoDefine };
      }
      if (action.hueRange) {
        const newColors2 = { ...colors2, hueRange: parseInt(action.hueRange) };
        onChange(newColors2);
        return newColors2;
      }
      if (action.hueShift !== void 0) {
        const newColors2 = { ...colors2, hueShift: parseInt(action.hueShift) };
        onChange(newColors2);
        return newColors2;
      }
      const { role, value: value2 } = action;
      const key = roles[role].shorthand;
      colors2.tones[key] = getTones(value2);
      const newColors = { ...colors2, [role]: value2 };
      autoDefine(newColors, key, colors2.autoDefine);
      onChange(newColors);
      return newColors;
    }, []);
    const initColors = useCallback(
      (colors2) => {
        if (!colors2) {
          colors2 = {};
        }
        if (!colors2.tones) {
          colors2.tones = {};
        }
        if (!colors2.hueRange) {
          colors2.hueRange = 30;
        }
        if (!colors2.hueShift) {
          colors2.hueShift = 0;
        }
        Object.keys(roles).map((role) => {
          const key = roles[role].shorthand;
          if (!colors2[role]) {
            colors2[role] = roles[role].default;
          }
          if (!colors2.tones[key]) {
            colors2.tones[key] = getTones(colors2[role]);
          }
        });
        if (void 0 === colors2.useAutoDefine) {
          colors2.autoDefine = 63;
        }
        return colors2;
      },
      [roles]
    );
    const [colors, setColors] = useReducer(colorReducer, value, initColors);
    const ModeSelect = useCallback((props2) => {
      const { Icon } = wp.components;
      const { value: value2, onChange: onChange2 } = props2;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-modeselect" }, /* @__PURE__ */ wp.element.createElement(Icon, { className: "colorset-modeselect__item" + (value2 === "pane" ? " active" : ""), icon: "admin-settings", onClick: () => onChange2("pane") }), /* @__PURE__ */ wp.element.createElement(Icon, { className: "colorset-modeselect__item" + (value2 === "bulk" ? " active" : ""), icon: "media-text", onClick: () => onChange2("bulk") }));
    }, []);
    const Palette = useCallback((props2) => {
      const { role, value: value2, open, onClick } = props2;
      const ref = useRef(null);
      return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette__item is-" + (open ? "open" : "close") }, /* @__PURE__ */ wp.element.createElement("div", { className: "chip " + (isDarkColor(value2[role]) ? "is-dark" : "is-light"), onClick, style: { backgroundColor: value2[role] } }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, roles[role].label)), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette__box" }, /* @__PURE__ */ wp.element.createElement(
        ColorPicker,
        {
          color: value2[role],
          onChange: (value3) => {
            setColors({ role, value: value3 });
          },
          enableAlpha: true,
          defaultValue: "#000"
        }
      ))));
    }, []);
    const HueRange = useCallback((props2) => {
      const { value: value2 } = props2;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange__input" }, /* @__PURE__ */ wp.element.createElement("label", null, "Range"), /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          type: "range",
          value: value2.hueRange,
          onChange: (e) => {
            setColors({ hueRange: e.currentTarget.value });
          },
          min: 1,
          max: 30
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-huerange__input" }, /* @__PURE__ */ wp.element.createElement("label", null, "Shift"), /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          type: "range",
          value: value2.hueShift,
          onChange: (e) => {
            setColors({ hueShift: e.currentTarget.value });
          },
          min: -180,
          max: 180
        }
      )));
    }, []);
    const BulkInput = useCallback(
      (props2) => {
        const { Icon } = wp.components;
        const { value: value2 } = props2;
        const [tmp, setTmp] = useState();
        const keyRoleMap = useMemo(() => {
          const map = { hr: "hueRange", hs: "hueShift" };
          Object.keys(roles).map((role) => {
            map[roles[role].shorthand] = role;
          });
          return map;
        }, [roles]);
        const checkValue = useCallback((tmp2) => {
          const lines = tmp2.split("\n");
          if (lines.some((line) => {
            if (!line) {
              return true;
            }
            const [key, val] = line.split(" : ");
            const role = keyRoleMap[key];
            if (key === "hr" || key === "hs") {
              return !/^-?\d+$/.test(val);
            }
            if (roles[role].alphaEnabled) {
              return !/^hsla?\(\d+,\d+%,\d+%(,[\d\.]+)?\)$/.test(val);
            }
            return !/^#\w{6}$/.test(val);
          })) {
            return false;
          }
          return true;
        }, []);
        const commitValue = useCallback((tmp2) => {
          const lines = tmp2.split("\n"), colors2 = {};
          lines.map((line) => {
            const [key, val] = line.split(" : ");
            const role = keyRoleMap[key];
            if (key === "hr" || key === "hs") {
              colors2[role] = parseInt(val);
            } else {
              colors2[role] = val;
              value2.tones[key] = getTones(val);
            }
          });
          onChange({ ...value2, ...colors2 });
        }, []);
        useEffect(() => {
          setTmp(
            Object.keys(roles).map((role) => roles[role].shorthand + " : " + value2[role]).join("\n") + "\nhr : " + value2.hueRange + "\nhs : " + value2.hueShift
          );
        }, [value2]);
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-bulkinput" }, /* @__PURE__ */ wp.element.createElement(
          "textarea",
          {
            className: "cp-colorset-bulkinput__textarea",
            value: tmp,
            rows: Object.keys(roles).length + 2,
            onChange: (e) => {
              const tmp2 = e.currentTarget.value;
              setTmp(tmp2);
              if (checkValue(tmp2)) {
                commitValue(tmp2);
              }
            }
          }
        ), /* @__PURE__ */ wp.element.createElement(Icon, { className: "cp-colorset-bulkinput__clipboard", icon: "clipboard", onClick: () => navigator.clipboard.writeText(tmp) }));
      },
      [roles]
    );
    const Preview = useCallback((props2) => {
      const { value: value2 } = props2;
      const Row = useCallback((props3) => {
        const { h, s, l, hr, hs } = props3;
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-preview__row" }, [...Array(12).keys()].map((i) => /* @__PURE__ */ wp.element.createElement("div", { className: "colorset-preview__row__item", style: { backgroundColor: "hsl(" + (h + hr * (i - 6) + hs) + "," + s + "%," + l + "%)" }, key: i })));
      }, []);
      return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-preview" }, /* @__PURE__ */ wp.element.createElement(Row, { h: value2.tones.b.h, s: value2.tones.b.s, l: value2.tones.b.l, hr: value2.hueRange, hs: value2.hueShift }), /* @__PURE__ */ wp.element.createElement(Row, { h: value2.tones.s.h, s: value2.tones.s.s, l: value2.tones.s.l, hr: value2.hueRange, hs: value2.hueShift }), /* @__PURE__ */ wp.element.createElement(Row, { h: value2.tones.m.h, s: value2.tones.m.s, l: value2.tones.m.l, hr: value2.hueRange, hs: value2.hueShift }), /* @__PURE__ */ wp.element.createElement(Row, { h: value2.tones.a.h, s: value2.tones.a.s, l: value2.tones.a.l, hr: value2.hueRange, hs: value2.hueShift }));
    }, []);
    switch (inputMode) {
      case "pane": {
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset" }, /* @__PURE__ */ wp.element.createElement(ModeSelect, { value: inputMode, onChange: setInputMode }), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset-palette" }, Object.keys(roles).map((role) => /* @__PURE__ */ wp.element.createElement(Palette, { role, value: colors, open: role === activeRole, onClick: () => setActiveRole(role === activeRole ? null : role), key: role }))), /* @__PURE__ */ wp.element.createElement(HueRange, { value: colors }), /* @__PURE__ */ wp.element.createElement(Preview, { value: colors }));
      }
      case "bulk": {
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-colorset" }, /* @__PURE__ */ wp.element.createElement(ModeSelect, { value: inputMode, onChange: setInputMode }), /* @__PURE__ */ wp.element.createElement(BulkInput, { value: colors }), /* @__PURE__ */ wp.element.createElement(Preview, { value: colors }));
      }
    }
  };
})();
