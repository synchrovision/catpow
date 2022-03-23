function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.Customize.ColorSet = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      useReducer = _wp$element.useReducer;
  var id = props.id,
      value = props.value,
      onChange = props.onChange,
      param = props.param;
  var roles = param.roles;

  var _useState = useState('pane'),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      inputMode = _useState2[0],
      setInputMode = _useState2[1];

  var _Catpow$util = Catpow.util,
      hexToHsl = _Catpow$util.hexToHsl,
      hslToHex = _Catpow$util.hslToHex,
      hexToHsb = _Catpow$util.hexToHsb;

  var _useState3 = useState(null),
      _useState4 = babelHelpers.slicedToArray(_useState3, 2),
      activeRole = _useState4[0],
      setActiveRole = _useState4[1];

  var isDarkColor = useCallback(function (color) {
    if (!color) {
      return true;
    }

    if (/^#\w{6}$/.test(color)) {
      return color.match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).reduce(function (p, c, i) {
        return p + parseInt(c, 16) * [3, 6, 2][i];
      }, 0) < 0x600;
    }

    if (color.substr(0, 3) === 'hsl') {
      return getTones(color).l < 60;
    }
  }, []);
  var getTextColorForTone = useCallback(function (tone) {
    if (tone.l < 70) {
      return '#FFFFFF';
    }

    return hslToHex({
      h: tone.h,
      s: tone.s / 2,
      l: Math.max(0, Math.min(100, tone.l * 2 - 150))
    });
  }, []);
  var autoDefine = useCallback(function (colors, key, flag) {
    if (flag & 1) {
      if (key === 'b') {
        var bla = colors.tones.b.l * 4 / 1000;
        colors.shade = 'hsla(0,0%,0%,' + (0.6 - bla) + ')';
        colors.shadow = 'hsla(0,0%,0%,' + (0.7 - bla) + ')';
        colors.tones.sh = getTones(colors.shade);
        colors.tones.shd = getTones(colors.shadow);
      }
    }

    if (flag & 2) {
      if (key === 'b') {
        colors.text = getTextColorForTone(colors.tones.b);
        colors.tones.t = getTones(colors.text);
      }
    }

    if (flag & 4) {
      if (key === 'b') {
        colors.sheet = hslToHex({
          h: colors.tones.b.h,
          s: colors.tones.b.s,
          l: colors.tones.b.l + (colors.tones.b.l < 50 ? 5 : -5)
        });
        colors.tones.s = getTones(colors.sheet);
      }
    }

    if (flag & 8) {
      if (key === 'b') {
        var _bla = colors.tones.b.l * 4 / 1000;

        colors.light = 'hsla(0,0%,100%,' + (0.1 + _bla) + ')';
        colors.tones.lt = getTones(colors.light);
      }
    }

    if (flag & 16) {
      if (key === 'm') {
        colors.inside = getTextColorForTone(colors.tones.m);
        colors.tones.i = getTones(colors.inside);
      }
    }

    if (flag & 32) {
      if (key === 'm') {
        colors.accent = hslToHex({
          h: colors.tones.m.h,
          s: Math.min(100, colors.tones.m.s * 1.4),
          l: colors.tones.m.l < 40 ? 50 : colors.tones.m.l - 20
        });
        colors.tones.a = getTones(colors.accent);
      }
    }
  }, []);
  var getTones = useCallback(function (color) {
    var hsl, hsb;

    if (/^#\w{6}$/.test(color)) {
      hsl = hexToHsl(color);
      hsb = hexToHsb(color);
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        t: 1 - hsl.l / 100,
        S: hsb.s,
        B: hsb.b
      };
    }

    if (color.substr(0, 3) === 'hsl') {
      var matches = color.match(/hsla?\((\d+),(\d+)%,(\d+)%(?:,([\d\.]+))?\)/);
      return {
        h: matches[1],
        s: matches[2],
        l: matches[3],
        a: matches[4] === undefined ? 1 : matches[4]
      };
    }
  }, []);
  var colorReducer = useCallback(function (colors, action) {
    if (action.autoDefine) {
      return _objectSpread(_objectSpread({}, colors), {}, {
        autoDefine: action.autoDefine ^ colors.autoDefine
      });
    }

    if (action.hueRange) {
      var _newColors = _objectSpread(_objectSpread({}, colors), {}, {
        hueRange: parseInt(action.hueRange)
      });

      onChange(_newColors);
      return _newColors;
    }

    if (action.hueShift !== undefined) {
      var _newColors2 = _objectSpread(_objectSpread({}, colors), {}, {
        hueShift: parseInt(action.hueShift)
      });

      onChange(_newColors2);
      return _newColors2;
    }

    var role = action.role,
        value = action.value;
    var key = roles[role].shorthand;
    colors.tones[key] = getTones(value);

    var newColors = _objectSpread(_objectSpread({}, colors), {}, babelHelpers.defineProperty({}, role, value));

    autoDefine(newColors, key, colors.autoDefine);
    onChange(newColors);
    return newColors;
  }, []);
  var initColors = useCallback(function (colors) {
    if (!colors.tones) {
      colors.tones = {};
    }

    if (!colors.hueRange) {
      colors.hueRange = 30;
    }

    if (!colors.hueShift) {
      colors.hueShift = 0;
    }

    Object.keys(roles).map(function (role) {
      var key = roles[role].shorthand;

      if (!colors[role]) {
        colors[role] = roles[role].default;
      }

      if (!colors.tones[key]) {
        colors.tones[key] = getTones(colors[role]);
      }
    });

    if (undefined === colors.useAutoDefine) {
      colors.autoDefine = 63;
    }

    return colors;
  }, [roles]);

  var _useReducer = useReducer(colorReducer, value, initColors),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      colors = _useReducer2[0],
      setColors = _useReducer2[1];

  var ColorPicker = useCallback(function (props) {
    var role = props.role,
        value = props.value,
        open = props.open,
        onClick = props.onClick;
    var ref = useRef(null);
    useEffect(function () {
      jQuery(ref.current).wpColorPicker({
        hide: false,
        change: function change(e, ui) {
          setColors({
            role: role,
            value: e.target.value
          });
        }
      });
    }, [ref.current]);
    return wp.element.createElement("div", {
      className: "ColorSet-ColorPicker__item " + (open ? 'open' : 'close')
    }, wp.element.createElement("div", {
      className: "chip " + (isDarkColor(value[role]) ? 'is-dark' : 'is-light'),
      onClick: onClick,
      style: {
        backgroundColor: value[role]
      }
    }, wp.element.createElement("div", {
      class: "label"
    }, roles[role].label)), wp.element.createElement(Catpow.Popover, {
      open: open
    }, wp.element.createElement("div", {
      class: "ColorSet-ColorPicker__box"
    }, wp.element.createElement("input", {
      ref: ref,
      type: "text",
      value: value[role],
      "data-alpha-enabled": roles[role].alphaEnabled,
      "data-alpha-color-type": roles[role].alphaEnabled ? 'hsla' : 'hex'
    }))));
  }, []);
  var HueRange = useCallback(function (props) {
    var value = props.value;
    var Preview = useCallback(function (props) {
      var h = props.h,
          s = props.s,
          l = props.l,
          hr = props.hr,
          hs = props.hs;
      return wp.element.createElement("div", {
        className: "ColorSet-HueRange__preview"
      }, babelHelpers.toConsumableArray(Array(12).keys()).map(function (i) {
        return wp.element.createElement("div", {
          class: "ColorSet-HueRange__preview__item",
          style: {
            backgroundColor: 'hsl(' + (h + hr * (i - 6) + hs) + ',' + s + '%,' + l + '%)'
          }
        });
      }));
    }, [value.tones.m.h, value.hueRange]);
    return wp.element.createElement("div", {
      class: "ColorSet-HueRange"
    }, wp.element.createElement("div", {
      class: "ColorSet-HueRange__input"
    }, wp.element.createElement("label", null, "Range"), wp.element.createElement("input", {
      type: "range",
      value: value.hueRange,
      onChange: function onChange(e) {
        setColors({
          hueRange: e.currentTarget.value
        });
      },
      min: 1,
      max: 30
    })), wp.element.createElement("div", {
      class: "ColorSet-HueRange__input"
    }, wp.element.createElement("label", null, "Shift"), wp.element.createElement("input", {
      type: "range",
      value: value.hueShift,
      onChange: function onChange(e) {
        setColors({
          hueShift: e.currentTarget.value
        });
      },
      min: -180,
      max: 180
    })), wp.element.createElement(Preview, {
      h: value.tones.b.h,
      s: value.tones.b.s,
      l: value.tones.b.l,
      hr: value.hueRange,
      hs: value.hueShift
    }), wp.element.createElement(Preview, {
      h: value.tones.s.h,
      s: value.tones.s.s,
      l: value.tones.s.l,
      hr: value.hueRange,
      hs: value.hueShift
    }), wp.element.createElement(Preview, {
      h: value.tones.m.h,
      s: value.tones.m.s,
      l: value.tones.m.l,
      hr: value.hueRange,
      hs: value.hueShift
    }), wp.element.createElement(Preview, {
      h: value.tones.a.h,
      s: value.tones.a.s,
      l: value.tones.a.l,
      hr: value.hueRange,
      hs: value.hueShift
    }));
  }, []);
  var BulkInput = useCallback(function (props) {
    var value = props.value;

    var _useState5 = useState(),
        _useState6 = babelHelpers.slicedToArray(_useState5, 2),
        tmp = _useState6[0],
        setTmp = _useState6[1];

    var checkValue = useCallback(function (tmp) {
      var lines = tmp.split("\n");

      if (Object.keys(roles).some(function (role, index) {
        if (!lines[index]) {
          return true;
        }

        if (roles[role].alphaEnabled) {
          return !/hsla?\(\d+,\d+%,\d+%(,[\d\.]+)?\)/.test(lines[index]);
        }

        return !/^#\w{6}$/.test(lines[index]);
      })) {
        return false;
      }

      return true;
    }, []);
    var commitValue = useCallback(function (tmp) {
      var lines = tmp.split("\n"),
          colors = {};
      Object.keys(roles).map(function (role, index) {
        colors[role] = lines[index];
      });
      onChange(_objectSpread(_objectSpread({}, value), colors));
    }, []);
    useEffect(function () {
      setTmp(Object.keys(roles).map(function (role) {
        return value[role];
      }).join("\n"));
    }, [value]);
    return wp.element.createElement("textarea", {
      value: tmp,
      rows: Object.keys(roles).length,
      onChange: function onChange(e) {
        var tmp = e.currentTarget.value;
        setTmp(tmp);

        if (checkValue(tmp)) {
          commitValue(tmp);
        }
      }
    });
  }, [roles]);

  switch (inputMode) {
    case 'pane':
      {
        return wp.element.createElement("div", {
          className: "ColorSet"
        }, wp.element.createElement("div", {
          className: "ColorSet-ColorPicker"
        }, Object.keys(roles).map(function (role) {
          return wp.element.createElement(ColorPicker, {
            role: role,
            value: value,
            open: role === activeRole,
            onClick: function onClick() {
              return setActiveRole(role === activeRole ? null : role);
            }
          });
        })), wp.element.createElement(HueRange, {
          value: value
        }));
      }

    case 'bulk':
      {
        return wp.element.createElement("div", {
          className: "ColorSet"
        }, wp.element.createElement(BulkInput, {
          value: value
        }));
      }
  }
};
