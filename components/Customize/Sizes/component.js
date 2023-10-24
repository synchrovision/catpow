(() => {
  // ../components/Customize/Sizes/component.jsx
  Catpow.Customize.Sizes = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer, useContext, createContext } = wp.element;
    const { id, value, onChange, param } = props;
    const { roles, breakpoints } = param;
    const [inputMode, setInputMode] = useState("diagram");
    const { bem } = Catpow.util;
    const classes = bem("Sizes");
    const minSize = 0.5;
    const DataContext = useMemo(() => wp.element.createContext({}), []);
    const StateContext = useMemo(() => wp.element.createContext({}), []);
    const ControlContext = useMemo(() => wp.element.createContext({}), []);
    const [graphEl, setGraphEl] = useState(false);
    const rolesBySlug = useMemo(() => {
      const rolesBySlug2 = {};
      Object.keys(roles).forEach((key) => {
        rolesBySlug2[roles[key].shorthand] = roles[key];
      });
      return rolesBySlug2;
    }, [roles]);
    const get6Sizes = useCallback((min, mid, max) => {
      const d1 = max - min;
      const d2 = mid - min - d1 / 2;
      return [...Array(6).keys()].map((i) => min + d1 * i / 5 + d2 * (1 - Math.abs(i / 2.5 - 1, 2)));
    }, []);
    const getRel6Sizes = useCallback((min, mid, max, rmax) => {
      const a = (rmax - minSize) / (max - minSize);
      return get6Sizes((min - minSize) * a + minSize, (mid - minSize) * a + minSize, rmax);
    }, []);
    const replace6SizeValues = useCallback((value2, role, bp, newValues) => {
      newValues.forEach((val, i) => {
        value2[role + (6 - i)][bp] = val;
      });
    }, []);
    const getMasterValuesFromValue = useCallback((value2) => {
      const masterValues = {};
      const min = parseFloat(value2.h6[0]), max = parseFloat(value2.h1[0]);
      const d = max - min;
      let mid = d / 2;
      for (let i = 1; i < 5; i++) {
        mid += (parseFloat(value2["h" + (i + 1)][0]) - min - d / 5 * i) / (1 - Math.pow(i / 2.5 - 1, 2)) / 4;
      }
      masterValues[getMasterValuesSlug("h", 0, 0)] = min;
      masterValues[getMasterValuesSlug("h", 0, 1)] = mid;
      masterValues[getMasterValuesSlug("h", 0, 2)] = max;
      const bps = Object.keys(breakpoints);
      for (let role of ["h", "p"]) {
        for (let bp = role === "h" ? 1 : 0; bp < bps.length; bp++) {
          if (value2[role + "1"][bp]) {
            masterValues[getMasterValuesSlug(role, bp)] = parseFloat(value2[role + "1"][bp]);
          }
        }
      }
      return masterValues;
    }, []);
    const getColOfRole = useCallback((slug) => {
      const matches = slug.match(/\w([1-6])/);
      if (matches) {
        return 12 - matches[1] * 2;
      }
      return 10;
    }, []);
    const getMasterValuesSlug = useCallback((role, bp, pos = false) => pos === false ? `${role}-${bp}` : `${role}-${bp}-${pos}`, []);
    const parseMasterValuesSlug = useCallback((slug) => {
      let [, role, bp, , pos] = slug.match(/(h|p)\-(\d)(\-(\d))?/);
      if (pos === void 0) {
        pos = false;
      }
      return { role, bp, pos };
    }, []);
    const init = useCallback(({ value: value2 }) => {
      let breakpointsFlags = 0;
      if (!value2) {
        value2 = {};
      }
      Object.keys(rolesBySlug).forEach((role) => {
        if (!value2.hasOwnProperty(role)) {
          value2[role] = rolesBySlug[role].default;
        }
      });
      Object.keys(breakpoints).forEach((bpLabel, index) => {
        if (index > 0 && value2.h1[index]) {
          breakpointsFlags |= 1 << index - 1;
        }
      });
      const masterValues = getMasterValuesFromValue(value2);
      return { value: value2, masterValues, breakpointsFlags, focusBreakpointsFlags: 1, editMaster: true };
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "UPDATE_VALUE": {
          if (action.role.responsive) {
            const newValues = [...state2.value[action.role.shorthand]];
            newValues[action.bp] = action.value;
            return { ...state2, value: { ...state2.value, [action.role]: newValues } };
          } else {
            return { ...state2, value: { ...state2.value, [action.role]: action.value } };
          }
        }
        case "UPDATE_MASTER_VALUE": {
          const value2 = JSON.parse(JSON.stringify(state2.value));
          const slug = getMasterValuesSlug(action.role, action.bp, action.pos || false);
          const masterValues = { ...state2.masterValues, [slug]: action.value };
          const bps = Object.keys(breakpoints);
          const args = [masterValues["h-0-0"], masterValues["h-0-1"], masterValues["h-0-2"]];
          for (const role of action.role === "h" ? ["h", "p"] : ["p"]) {
            for (let bp = parseInt(action.bp); bp <= bps.length; bp++) {
              if (role === "h" && bp === 0) {
                replace6SizeValues(value2, "h", 0, get6Sizes.apply(null, args));
              } else {
                if (bp === 0 || bp > 0 && state2.breakpointsFlags & 1 << bp - 1) {
                  args[3] = masterValues[getMasterValuesSlug(role, bp)];
                  if (args[3]) {
                    replace6SizeValues(value2, role, bp, getRel6Sizes.apply(null, args));
                  }
                }
              }
            }
          }
          return { ...state2, masterValues, value: value2 };
        }
        case "TOGGLE_EDIT_MASTER": {
          return { ...state2, editMaster: !state2.editMaster };
        }
        case "TOGGLE_FOCUS_BREAKPOINT": {
          return { ...state2, focusBreakpointsFlags: state2.focusBreakpointsFlags ^ 1 << action.bp };
        }
        case "TOGGLE_BREAKPOINT": {
          const bpFlag = 1 << action.bp - 1;
          const isActiveBp = state2.breakpointsFlags & bpFlag;
          const breakpointsFlags = state2.breakpointsFlags ^ bpFlag;
          const value2 = JSON.parse(JSON.stringify(state2.value));
          const masterValues = { ...state2.masterValues };
          if (isActiveBp) {
            Object.keys(value2).forEach((key) => {
              if (!!rolesBySlug[key].responsive) {
                value2[key] = [...value2[key]];
                value2[key][action.bp] = null;
              }
            });
            masterValues[getMasterValuesSlug("h", action.bp)] = null;
            masterValues[getMasterValuesSlug("p", action.bp)] = null;
          } else {
            const bp = Math.min(1, action.bp);
            Object.keys(value2).forEach((key) => {
              if (!!rolesBySlug[key].responsive) {
                value2[key] = [...value2[key]];
                value2[key][action.bp] = value2[key][action.bp + 1] || rolesBySlug[key].default[bp];
              }
            });
            masterValues[getMasterValuesSlug("h", action.bp)] = value2.h1[action.bp];
            masterValues[getMasterValuesSlug("p", action.bp)] = value2.p1[action.bp];
          }
          return { ...state2, value: value2, masterValues, breakpointsFlags };
        }
      }
    }, []);
    const [state, dispatch] = useReducer(reducer, { value }, init);
    const Point = useCallback((props2) => {
      const { classes: classes2, label, onChange: onChange2, role, bp } = props2;
      const { min = 0.5, max = 15, step = 0.0625 } = role;
      const ref = useRef();
      const { graphEl: graphEl2 } = useContext(DataContext);
      const state2 = useContext(StateContext);
      const valueInState = role.master ? state2.masterValues[role.slug] : role.responsive ? state2.value[role.shorthand][bp] : state2.value[role.shorthand];
      const [value2, setValue] = useState(parseFloat(valueInState));
      const x = useMemo(() => props2.col / 10, [props2.col]);
      const [y, setY] = useState(Math.sqrt(value2 / max));
      const minY = useMemo(() => Math.sqrt(min / max), [min, max]);
      useEffect(() => {
        const value3 = parseFloat(valueInState);
        setValue(value3);
        setY(Math.sqrt(value3 / max));
      }, [valueInState]);
      useEffect(() => {
        if (!ref || !ref.current) {
          return;
        }
        const el = ref.current;
        const state3 = { isHold: false, org: null, bnd: null };
        const handleMouseDown = (e) => {
          state3.isHold = true;
          state3.org = e.clientY;
          state3.bnd = graphEl2.getBoundingClientRect();
        };
        const handleMouseMove = (e) => {
          if (state3.isHold) {
            const y2 = Math.max(minY, Math.min(1, (state3.bnd.bottom - e.clientY) / state3.bnd.height));
            const value3 = Math.round(y2 * y2 * max / step) * step;
            setY(y2);
            setValue(value3);
            onChange2(value3);
          }
        };
        const handleMouseUp = (e) => {
          handleMouseMove(e);
          state3.isHold = false;
        };
        el.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
          el.removeEventListener("mousedown", handleMouseDown);
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [ref.current, onChange2]);
      const isDisabled = useMemo(() => {
        return !state2.editMaster === !!role.master || !(state2.focusBreakpointsFlags & 1 << bp);
      }, [state2.editMaster, state2.focusBreakpointsFlags]);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes2({ "is-master": role.master, "is-disabled": isDisabled }), style: { "--point-x": x, "--point-y": y }, ref }, role.label && /* @__PURE__ */ wp.element.createElement("div", { className: classes2.label() }, role.label));
    }, []);
    const points = useMemo(() => {
      return Object.keys(state.value).map((roleSlug) => {
        return Object.keys(breakpoints).map((bpLabel, bp) => {
          const role = rolesBySlug[roleSlug];
          if (!role.responsive || bp > 0 && !(state.breakpointsFlags & 1 << bp - 1)) {
            return false;
          }
          return /* @__PURE__ */ wp.element.createElement(
            Point,
            {
              classes: classes.graph.point,
              role,
              bp,
              col: getColOfRole(roleSlug),
              onChange: (value2) => {
                dispatch({ type: "UPDATE_VALUE", role, bp, value: value2 });
              },
              key: roleSlug + "-" + bp
            }
          );
        });
      });
    }, [Point, state.breakpointsFlags, dispatch]);
    const masterPoints = useMemo(() => {
      const bps = Object.keys(breakpoints);
      return Object.keys(state.masterValues).map((slug) => {
        const { role, bp, pos } = parseMasterValuesSlug(slug);
        let label = role;
        if (pos !== false) {
          label += "-" + ["min", "mid", "max"][pos];
        } else {
          label += "(" + bps[bp] + ")";
        }
        const roleObj = { master: true, slug, label };
        return /* @__PURE__ */ wp.element.createElement(
          Point,
          {
            classes: classes.graph.point,
            role: roleObj,
            bp,
            col: pos === false ? 10 : pos * 5,
            onChange: (value2) => {
              dispatch({ type: "UPDATE_MASTER_VALUE", role, bp, pos, value: value2 });
            },
            key: slug
          }
        );
      });
    }, [Point, state.breakpointsFlags, dispatch]);
    const data = useMemo(() => {
      return { ...props, rolesBySlug, graphEl };
    }, [props, rolesBySlug, graphEl]);
    const control = useMemo(() => {
      return { dispatch };
    }, [dispatch]);
    const ToggleBreakPoints = useCallback((props2) => {
      const { classes: classes2 } = props2;
      const { param: param2 } = useContext(DataContext);
      const { breakpoints: breakpoints2 } = param2;
      const { breakpointsFlags } = useContext(StateContext);
      const { dispatch: dispatch2 } = useContext(ControlContext);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes2() }, Object.keys(breakpoints2).map((bpLabel, bpIndex) => {
        if (bpIndex === 0) {
          return false;
        }
        const isActive = breakpointsFlags & 1 << bpIndex - 1;
        return /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: classes2.item({ "is-active": isActive }),
            onClick: () => dispatch2({ type: "TOGGLE_BREAKPOINT", bp: bpIndex })
          },
          bpLabel
        );
      }));
    }, []);
    const ToggleFocusBreakPoints = useCallback((props2) => {
      const { classes: classes2 } = props2;
      const { param: param2 } = useContext(DataContext);
      const { breakpoints: breakpoints2 } = param2;
      const { breakpointsFlags, focusBreakpointsFlags } = useContext(StateContext);
      const { dispatch: dispatch2 } = useContext(ControlContext);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes2() }, Object.keys(breakpoints2).map((bpLabel, bpIndex) => {
        if (bpIndex > 0 && !(breakpointsFlags & 1 << bpIndex - 1)) {
          return false;
        }
        const isActive = focusBreakpointsFlags & 1 << bpIndex;
        return /* @__PURE__ */ wp.element.createElement(
          "div",
          {
            className: classes2.item({ "is-active": isActive }),
            onClick: () => dispatch2({ type: "TOGGLE_FOCUS_BREAKPOINT", bp: bpIndex })
          },
          bpLabel
        );
      }));
    }, []);
    const Lines = useCallback((props2) => {
      const { classes: classes2 } = props2;
      const { param: param2 } = useContext(DataContext);
      const { breakpoints: breakpoints2 } = param2;
      const { value: value2, breakpointsFlags, focusBreakpointsFlags } = useContext(StateContext);
      const lines = useMemo(() => {
        const lines2 = [];
        Object.keys(breakpoints2).forEach((bpLabel, bpIndex) => {
          if (bpIndex === 0 || breakpointsFlags & 1 << bpIndex - 1) {
            const isActive = !!(focusBreakpointsFlags & 1 << bpIndex);
            let d = "";
            for (let role of ["h", "p"]) {
              const roleObj = rolesBySlug[role + "1"];
              const { max = 15 } = roleObj;
              for (let i = 0; i < 6; i++) {
                d += (i === 0 ? "M" : " L") + " " + i * 20 + " " + (1 - Math.sqrt(parseFloat(value2[role + (6 - i)][bpIndex]) / max)) * 100;
              }
              lines2.push(/* @__PURE__ */ wp.element.createElement("path", { className: classes2.line({ "is-active": isActive }), d, key: `${role}-${bpIndex}` }));
            }
          }
        });
        return lines2;
      }, [value2, breakpointsFlags, focusBreakpointsFlags]);
      return /* @__PURE__ */ wp.element.createElement("svg", { className: classes2(), viewBox: "0 0 100 100" }, lines);
    }, []);
    const Table = useCallback((props2) => {
      const { classes: classes2 } = props2;
      const { param: param2, rolesBySlug: rolesBySlug2 } = useContext(DataContext);
      const state2 = useContext(StateContext);
      const { dispatch: dispatch2 } = useContext(ControlContext);
      const tables = useMemo(() => {
        const rows = [[], []];
        const rowClasses = classes2.table.tbody.tr;
        Object.keys(state2.value).forEach((roleSlug) => {
          const role = rolesBySlug2[roleSlug];
          if (role.responsive) {
            const cells = [/* @__PURE__ */ wp.element.createElement("th", { className: rowClasses.th(), key: "label" }, role.label)];
            Object.keys(breakpoints).forEach((bpLabel, bp) => {
              cells.push(/* @__PURE__ */ wp.element.createElement("td", { className: rowClasses.td(), key: bpLabel }, state2.value[roleSlug][bp]));
            });
            rows[0].push(/* @__PURE__ */ wp.element.createElement("tr", { className: rowClasses(), key: roleSlug }, cells));
          } else {
            rows[1].push(
              /* @__PURE__ */ wp.element.createElement("tr", { className: rowClasses(), key: roleSlug }, /* @__PURE__ */ wp.element.createElement("th", { className: rowClasses.th() }, role.label), /* @__PURE__ */ wp.element.createElement("td", { className: rowClasses.td() }, state2.value[roleSlug]))
            );
          }
        });
        return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("table", { className: classes2.table("is-responsive") }, /* @__PURE__ */ wp.element.createElement("thead", { className: classes2.table.thead() }, /* @__PURE__ */ wp.element.createElement("td", { className: classes2.table.thead.td("is-spacer") }), Object.keys(breakpoints).map((bpLabel, bp) => {
          return /* @__PURE__ */ wp.element.createElement("th", null);
        })), /* @__PURE__ */ wp.element.createElement("tbody", { className: classes2.table.tbody() }, rows[0])), /* @__PURE__ */ wp.element.createElement("table", { className: classes2.table("is-static") }, /* @__PURE__ */ wp.element.createElement("tbody", { className: classes2.table.tbody() }, rows[1])));
      }, [state2.value, state2.breakpointsFlags]);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes2() }, tables);
    }, []);
    return /* @__PURE__ */ wp.element.createElement(DataContext.Provider, { value: data }, /* @__PURE__ */ wp.element.createElement(StateContext.Provider, { value: state }, /* @__PURE__ */ wp.element.createElement(ControlContext.Provider, { value: control }, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.header() }, "Sizes"), /* @__PURE__ */ wp.element.createElement("div", { className: classes.control() }, /* @__PURE__ */ wp.element.createElement(ToggleBreakPoints, { classes: classes.control.togglebreakpoints })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.graph(), ref: setGraphEl }, /* @__PURE__ */ wp.element.createElement(Lines, { classes: classes.graph.lines }), points, masterPoints), /* @__PURE__ */ wp.element.createElement(Table, { classes: classes.table }), /* @__PURE__ */ wp.element.createElement("div", { className: classes.control() }, /* @__PURE__ */ wp.element.createElement(ToggleFocusBreakPoints, { classes: classes.control.togglefocusbreakpoints }), /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes.control.button({ "is-active": !state.editMaster }),
        onClick: () => dispatch({ type: "TOGGLE_EDIT_MASTER" })
      },
      "\u500B\u5225\u8ABF\u6574"
    ))))));
  };
})();
