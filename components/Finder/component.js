(() => {
  // ../components/Finder/component.jsx
  Catpow.FinderContext = wp.element.createContext({});
  Catpow.Finder = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const { basepath, baseurl, className = "" } = props;
    const pushState = useCallback(
      (state2) => {
        const { path = "", query } = state2;
        let q = {};
        if (query) {
          Object.keys(query).map((key) => {
            q["q[" + key + "]" + (Array.isArray(query[key]) ? "[]" : "")] = query[key];
          });
        }
        const uri = URI(baseurl);
        history.pushState(
          state2,
          "",
          uri.directory(uri.directory() + "/" + path).addQuery(q).toString()
        );
      },
      [props]
    );
    const updateResults = useCallback((state2) => {
      state2.items = state2.index.rows.filter((row) => {
        return Object.keys(state2.query).every((key) => {
          if (state2.query[key].length === 0) {
            return true;
          }
          return state2.query[key].some((val) => val == row[key].value[0]);
        });
      });
      if (Object.keys(state2.sort).length > 0) {
        const keys = Object.keys(state2.sort);
        state2.items.sort((a, b) => {
          var rtn = 0;
          keys.some((key) => {
            if (a[key].value[0] == b[key].value[0]) {
              return false;
            }
            rtn = a[key].value[0] < b[key].value[0] === (state2.sort[key] === "asc") ? -1 : 1;
            return true;
          });
          return rtn;
        });
      }
      reflectResults(state2);
    }, []);
    const reflectResults = useCallback((state2) => {
      state2.selectedRows = state2.items.filter((row) => row._selected);
      state2.maxNumPages = Math.ceil(state2.items.length / state2.itemsPerPage);
      state2.page = Math.min(state2.maxNumPages, Math.max(1, state2.page));
      const offset = state2.itemsPerPage * (state2.page - 1);
      state2.itemsInPage = state2.items.slice(offset, offset + state2.itemsPerPage);
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "setIndex": {
          const { config } = state2;
          const { index, wait = false } = action;
          const colsByRole = {};
          const colsToShow = [];
          const colsToShowByRole = {};
          Object.keys(index.cols).map((name, i) => {
            const col = index.cols[name];
            const { role = "none" } = col;
            col.name = name;
            col.hide = config.cols[name] ? config.cols[name].hide : i > 8 || ["contents", "data"].indexOf(role) !== -1;
            if (!colsByRole[role]) {
              colsByRole[role] = [];
            }
            colsByRole[role].push(col);
            if (!col.hide) {
              colsToShow.push(col);
              if (!colsToShowByRole[role]) {
                colsToShowByRole[role] = [];
              }
              colsToShowByRole[role].push(col);
            }
            fillConf(index.cols[name]);
          });
          return { ...state2, index, colsByRole, colsToShow, colsToShowByRole, wait };
        }
        case "updateRows": {
          if (action.rows) {
            const newRowsMap = new Map(action.rows.map((row) => [row._id, row]));
            state2.index.rows.map((row) => {
              if (newRowsMap.has(row._id)) {
                console.log(row);
                console.log(newRowsMap.get(row._id));
                Object.assign(row, newRowsMap.get(row._id));
              }
            });
          }
          updateResults(state2);
          return { ...state2 };
        }
        case "removeRows": {
          const removeFrags = new Map(action.rows.map((row) => [row, true]));
          state2.index.rows = state2.index.rows.filter((row) => !removeFrags.has(row));
          state2.items = state2.items.filter((row) => !removeFrags.has(row));
          reflectResults(state2);
          return { ...state2 };
        }
        case "setPath":
          return { ...state2, path: action.path };
        case "addQuery": {
          const { key, val } = action;
          const { query } = state2;
          if (!query[key]) {
            query[key] = [];
          }
          if (query[key].indexOf(val) === -1) {
            query[key].push(val);
          }
          return { ...state2, query: { ...query } };
        }
        case "removeQuery": {
          const { key, val } = action;
          const { query } = state2;
          if (!query[key]) {
            query[key] = [];
          }
          query[key] = query[key].filter((v) => v !== val);
          if (query[key].length === 0) {
            delete query[key];
          }
          return { ...state2, query: { ...query } };
        }
        case "setQeury":
          return { ...state2, query: action.query };
        case "setPathAndQuery":
          return { ...state2, path: action.path, query: action.query };
        case "updateSort": {
          const { key, val } = action;
          if (!action.val) {
            delete state2.sort[key];
            return { ...state2, sort: { ...state2.sort } };
          }
          return { ...state2, sort: { ...state2.sort, [key]: [val] } };
        }
        case "switchSort": {
          const { key } = action;
          if (state2.sort[key] === "desc") {
            delete state2.sort[key];
            return { ...state2, sort: { ...state2.sort } };
          }
          return { ...state2, sort: { ...state2.sort, [key]: state2.sort[key] ? "desc" : "asc" } };
        }
        case "update":
          return { ...state2, ...action.data || {} };
        case "setLayout":
          if (action.layout === state2.layout) {
            return state2;
          }
          return { ...state2, layout: action.layout, transition: "mod" };
        case "showColumn":
        case "hideColumn": {
          const { role = "none" } = state2.index.cols[action.name];
          state2.index.cols[action.name].hide = action.type !== "showColumn";
          state2.colsToShow = Object.keys(state2.index.cols).map((key) => state2.index.cols[key]).filter((col) => !col.hide);
          state2.colsToShowByRole[role] = state2.colsToShow.filter((col) => col.role === role);
          return { ...state2 };
        }
        case "showMessage": {
          const { message } = action;
          return { ...state2, message, showMessage: true };
        }
        case "hideMessage": {
          return { ...state2, showMessage: false };
        }
        case "selectRow":
        case "deselectRow": {
          action.row._selected = action.type === "selectRow";
          const selectedRows = state2.index.rows.filter((row) => row._selected);
          return { ...state2, selectedRows };
        }
        case "selectAllRowsInPage":
        case "deselectAllRowsInPage": {
          const isSelect = action.type === "selectAllRowsInPage";
          state2.index.rows.map((row) => row._selected = false);
          const selectedRows = state2.itemsInPage.filter((row) => row._selected = isSelect);
          return { ...state2, selectedRows };
        }
        case "focusItem":
          return { ...state2, focused: action.row };
        case "blurItem":
          return { ...state2, focused: false };
        case "setItems": {
          const maxNumPages = Math.ceil(action.items.length / state2.itemsPerPage);
          return {
            ...state2,
            items: action.items,
            maxNumPages,
            page: Math.min(maxNumPages, state2.page)
          };
        }
        case "setPage": {
          const page = Math.min(state2.maxNumPages, Math.max(1, action.page));
          if (page == state2.page) {
            return state2;
          }
          const offset = state2.itemsPerPage * (page - 1);
          return {
            ...state2,
            itemsInPage: state2.items.slice(offset, offset + state2.itemsPerPage),
            page
          };
        }
        case "setItemsPerPage": {
          if (!action.itemsPerPage || action.itemsPerPage === state2.itemsPerPage) {
            return state2;
          }
          state2.itemsPerPage = action.itemsPerPage;
          reflectResults(state2);
          return { ...state2 };
        }
        case "updateDevice": {
          const device = Catpow.util.getDevice();
          if (device === state2.device) {
            return state2;
          }
          return { ...state2, device: Catpow.util.getDevice() };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {
      wait: true,
      config: JSON.parse(localStorage.getItem("config:" + basepath) || "{}"),
      index: {
        cols: {},
        rows: []
      },
      colsByRole: {},
      colsToShow: [],
      colsToShowByRole: {},
      path: props.path,
      apiPath: "/cp/v1/" + basepath,
      query: props.query || {},
      sort: props.sort || {},
      layout: "table",
      items: [],
      itemsInPage: [],
      itemsPerPage: 20,
      selectedRows: [],
      focused: false,
      page: 1,
      device: Catpow.util.getDevice()
    });
    const fillConf = useCallback((conf) => {
      switch (conf.output_type) {
        case "select":
        case "radio":
        case "checkbox":
          conf.dict = {};
          if (Array.isArray(conf.value)) {
            conf.value.map((val) => {
              conf.dict[val] = val;
            });
          } else {
            Object.keys(conf.value).map((label) => {
              if (typeof conf.value[label] === "object") {
                if (Array.isArray(conf.value[label])) {
                  conf.value[label].map((val) => {
                    conf.dict[val] = val;
                  });
                } else {
                  Object.keys(conf.value[label]).map((label_) => {
                    conf.dict[conf.value[label][label_]] = label_;
                  });
                }
              } else {
                conf.dict[conf.value[label]] = label;
              }
            });
          }
          break;
      }
    }, []);
    const info = useMemo(() => {
      return {
        roleGroups: {
          images: ["image"],
          header: ["label", "name", "altname"],
          tags: ["group", "tag"],
          excerpt: ["desc"],
          address: ["zip", "prefecture", "address"],
          contact: ["tel", "fax", "email", "url"],
          contents: ["data", "contents"],
          style: ["color"]
        }
      };
    }, []);
    useEffect(() => {
      localStorage.setItem("config:" + basepath, JSON.stringify({ cols: state.index.cols }));
    }, [state]);
    useEffect(() => {
      updateResults(state);
      dispatch({ type: "update" });
    }, [state.path, state.query, state.index, state.sort]);
    useEffect(() => {
      if (!state.ignorePushState) {
        pushState(state);
      } else {
        dispatch({ type: "update", data: { ignorePushState: false } });
      }
    }, [state.path, state.query]);
    useEffect(() => {
      wp.apiFetch({
        path: state.apiPath + "/index"
      }).then((index) => {
        dispatch({ type: "setIndex", index });
      });
      window.addEventListener("popstate", (e) => {
        if (!e.state) {
          return;
        }
        dispatch({
          type: "update",
          data: {
            path: e.state.path,
            query: e.state.query,
            ignorePushState: true
          }
        });
      });
      window.addEventListener("resize", (e) => {
        dispatch({ type: "updateDevice" });
      });
    }, [props]);
    return /* @__PURE__ */ wp.element.createElement(Catpow.AppManager, null, /* @__PURE__ */ wp.element.createElement(Catpow.FinderContext.Provider, { value: { state, dispatch, info } }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder " + className }, props.children)));
  };
  Catpow.Finder.Nav = (props) => {
    const { className = "", children, ...otherProps } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-navigation " + className, ...otherProps }, children);
  };
  Catpow.Finder.Spacer = (props) => {
    const { className = "", ...otherProps } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-spacer " + className, ...otherProps });
  };
  Catpow.Finder.Main = (props) => {
    const { className = "", children, ...otherProps } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-main " + className, ...otherProps }, children);
  };
})();
