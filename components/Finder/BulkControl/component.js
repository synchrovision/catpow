(() => {
  // ../components/Finder/BulkControl/component.jsx
  Catpow.Finder.BulkControl = (props) => {
    const { callback } = props;
    const { useState, useCallback, useMemo, useEffect, useContext } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const [value, setValue] = useState(false);
    const [modal, setModal] = useState(false);
    const { cols } = state.index;
    useEffect(() => {
      wp.apiFetch({
        path: state.apiPath + "/bulk/index"
      }).then((bulk) => {
        dispatch({ type: "update", data: { bulk } });
      });
    }, []);
    const options = useMemo(() => {
      if (!state.bulk) {
        return {};
      }
      const options2 = {};
      Object.keys(state.bulk).map((name) => {
        options2[state.bulk[name].label] = name;
      });
      return options2;
    }, [state.bulk]);
    const exec_bulk = useCallback(async (action) => {
      try {
        const conf = state.bulk[action];
        const vals = await show_modal(conf);
        wp.apiFetch({
          path: state.apiPath + "/bulk/exec/" + action,
          method: "POST",
          data: { rows: state.selectedRows.map((row) => row._id), vals }
        }).then((res) => {
          if (callback) {
            callback({ action, res, state, dispatch });
          }
          if (res.remove) {
            dispatch({ type: "removeRows", rows: state.selectedRows });
          }
          if (res.update) {
            dispatch({ type: "updateRows", rows: res.update });
          }
          if (res.message) {
            dispatch({ type: "showMessage", ...res.message });
          }
          if (res.download) {
            Catpow.util.download(res.download.data, res.download.name || state.name + ".csv", "text/csv");
          }
        });
      } catch (err) {
        return false;
      }
    }, [state, dispatch]);
    const show_modal = useCallback((conf) => {
      const { ModalForm, Buttons } = Catpow;
      const { Input, Button } = ModalForm;
      return new Promise((resolve, reject) => {
        if (!conf.inputs) {
          resolve(false);
          return;
        }
        setModal(
          /* @__PURE__ */ wp.element.createElement(
            ModalForm,
            {
              onComplete: (values) => {
                setModal(false);
                if (values.accept) {
                  resolve(values);
                } else {
                  reject(false);
                }
              }
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-bulkcontrol-form" }, /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, conf.label), /* @__PURE__ */ wp.element.createElement("ul", { className: "inputs" }, conf.inputs.map((props2) => {
              const { label, desc, caption, ...otherPorps } = props2;
              return /* @__PURE__ */ wp.element.createElement("li", { className: "item" }, label && /* @__PURE__ */ wp.element.createElement("h4", { className: "label" }, label), desc && /* @__PURE__ */ wp.element.createElement("p", { className: "desc" }, desc), /* @__PURE__ */ wp.element.createElement("div", { className: "input" }, /* @__PURE__ */ wp.element.createElement(Input, { ...otherPorps })), caption && /* @__PURE__ */ wp.element.createElement("p", { className: "caption" }, caption));
            })), /* @__PURE__ */ wp.element.createElement(Buttons, null, /* @__PURE__ */ wp.element.createElement(
              Button,
              {
                label: __("\u30AD\u30E3\u30F3\u30BB\u30EB", "catpow"),
                className: "negative",
                name: "accept",
                value: false
              }
            ), /* @__PURE__ */ wp.element.createElement(
              Button,
              {
                label: __("\u5B9F\u884C", "catpow"),
                className: "primary",
                name: "accept",
                value: true
              }
            )))
          )
        );
      });
    }, [setModal]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-control cp-finder-bulkcontrol" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, /* @__PURE__ */ wp.element.createElement("li", { className: "item" + (open ? " active" : "") }, /* @__PURE__ */ wp.element.createElement("div", { className: "inputs" }, /* @__PURE__ */ wp.element.createElement(
      Catpow.SelectBox,
      {
        label: __("\u4E00\u62EC\u51E6\u7406", "catpow"),
        value,
        options,
        onChange: (val) => {
          setValue(val);
        }
      }
    ), /* @__PURE__ */ wp.element.createElement(
      Catpow.Button,
      {
        label: __("\u5B9F\u884C", "catpow"),
        onClick: (e) => {
          exec_bulk(value);
        }
      }
    )))), modal);
  };
})();
