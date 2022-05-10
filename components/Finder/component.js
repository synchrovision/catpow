var _excluded = ["className", "children"],
    _excluded2 = ["className"],
    _excluded3 = ["className", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
* WP APIで取得したインデックス情報を元に
* 検索のユーザーインターフェースを提供するコンポーネント
* ステートをURLと連携することを前提とし、ステートを変更すると
* ブラウザの履歴にステートに対応するURLを追加する
* 専用の子孫コンポーネントを持ち
* コンテキストによってこれらの
* 子孫コンポーネントのステートを一元管理する
*/
Catpow.FinderContext = wp.element.createContext({});

Catpow.Finder = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      useReducer = _wp$element.useReducer;
  var basepath = props.basepath,
      baseurl = props.baseurl,
      _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className;
  var pushState = useCallback(function (state) {
    var _state$path = state.path,
        path = _state$path === void 0 ? '' : _state$path,
        query = state.query;
    var q = {};

    if (query) {
      Object.keys(query).map(function (key) {
        q['q[' + key + ']' + (Array.isArray(query[key]) ? '[]' : '')] = query[key];
      });
    }

    var uri = URI(baseurl);
    history.pushState(state, '', uri.directory(uri.directory() + '/' + path).addQuery(q).toString());
  }, [props]);
  var updateResults = useCallback(function (state) {
    state.items = state.index.rows.filter(function (row) {
      return Object.keys(state.query).every(function (key) {
        if (state.query[key].length === 0) {
          return true;
        }

        return state.query[key].some(function (val) {
          return val == row[key].value[0];
        });
      });
    });

    if (Object.keys(state.sort).length > 0) {
      var keys = Object.keys(state.sort);
      state.items.sort(function (a, b) {
        var rtn = 0;
        keys.some(function (key) {
          if (a[key].value[0] == b[key].value[0]) {
            return false;
          }

          rtn = a[key].value[0] < b[key].value[0] === (state.sort[key] === 'asc') ? -1 : 1;
          return true;
        });
        return rtn;
      });
    }

    reflectResults(state);
  }, []);
  var reflectResults = useCallback(function (state) {
    state.selectedRows = state.items.filter(function (row) {
      return row._selected;
    });
    state.maxNumPages = Math.ceil(state.items.length / state.itemsPerPage);
    state.page = Math.min(state.maxNumPages, Math.max(1, state.page));
    var offset = state.itemsPerPage * (state.page - 1);
    state.itemsInPage = state.items.slice(offset, offset + state.itemsPerPage);
  }, []);
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'setIndex':
        {
          var config = state.config;
          var index = action.index,
              _action$wait = action.wait,
              wait = _action$wait === void 0 ? false : _action$wait;
          var colsByRole = {};
          var colsToShow = [];
          var colsToShowByRole = {};
          Object.keys(index.cols).map(function (name, i) {
            var col = index.cols[name];
            var _col$role = col.role,
                role = _col$role === void 0 ? 'none' : _col$role;
            col.name = name;
            col.hide = config.cols[name] ? config.cols[name].hide : i > 8 || ['contents', 'data'].indexOf(role) !== -1;

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
          return _objectSpread(_objectSpread({}, state), {}, {
            index: index,
            colsByRole: colsByRole,
            colsToShow: colsToShow,
            colsToShowByRole: colsToShowByRole,
            wait: wait
          });
        }

      case 'updateRows':
        {
          if (action.rows) {
            var newRowsMap = new Map(action.rows.map(function (row) {
              return [row._id, row];
            }));
            state.index.rows.map(function (row) {
              if (newRowsMap.has(row._id)) {
                console.log(row);
                console.log(newRowsMap.get(row._id));
                babelHelpers.extends(row, newRowsMap.get(row._id));
              }
            });
          }

          updateResults(state);
          return _objectSpread({}, state);
        }

      case 'removeRows':
        {
          var removeFrags = new Map(action.rows.map(function (row) {
            return [row, true];
          }));
          state.index.rows = state.index.rows.filter(function (row) {
            return !removeFrags.has(row);
          });
          state.items = state.items.filter(function (row) {
            return !removeFrags.has(row);
          });
          reflectResults(state);
          return _objectSpread({}, state);
        }

      case 'setPath':
        return _objectSpread(_objectSpread({}, state), {}, {
          path: action.path
        });

      case 'addQuery':
        {
          var key = action.key,
              val = action.val;
          var query = state.query;

          if (!query[key]) {
            query[key] = [];
          }

          if (query[key].indexOf(val) === -1) {
            query[key].push(val);
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            query: _objectSpread({}, query)
          });
        }

      case 'removeQuery':
        {
          var _key = action.key,
              _val = action.val;
          var _query = state.query;

          if (!_query[_key]) {
            _query[_key] = [];
          }

          _query[_key] = _query[_key].filter(function (v) {
            return v !== _val;
          });

          if (_query[_key].length === 0) {
            delete _query[_key];
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            query: _objectSpread({}, _query)
          });
        }

      case 'setQeury':
        return _objectSpread(_objectSpread({}, state), {}, {
          query: action.query
        });

      case 'setPathAndQuery':
        return _objectSpread(_objectSpread({}, state), {}, {
          path: action.path,
          query: action.query
        });

      case 'updateSort':
        {
          var _key2 = action.key,
              _val2 = action.val;

          if (!action.val) {
            delete state.sort[_key2];
            return _objectSpread(_objectSpread({}, state), {}, {
              sort: _objectSpread({}, state.sort)
            });
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            sort: _objectSpread(_objectSpread({}, state.sort), {}, babelHelpers.defineProperty({}, _key2, [_val2]))
          });
        }

      case 'switchSort':
        {
          var _key3 = action.key;

          if (state.sort[_key3] === 'desc') {
            delete state.sort[_key3];
            return _objectSpread(_objectSpread({}, state), {}, {
              sort: _objectSpread({}, state.sort)
            });
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            sort: _objectSpread(_objectSpread({}, state.sort), {}, babelHelpers.defineProperty({}, _key3, state.sort[_key3] ? 'desc' : 'asc'))
          });
        }

      case 'update':
        return _objectSpread(_objectSpread({}, state), action.data || {});

      case 'setLayout':
        if (action.layout === state.layout) {
          return state;
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          layout: action.layout,
          transition: 'mod'
        });

      case 'showColumn':
      case 'hideColumn':
        {
          var _state$index$cols$act = state.index.cols[action.name].role,
              role = _state$index$cols$act === void 0 ? 'none' : _state$index$cols$act;
          state.index.cols[action.name].hide = action.type !== 'showColumn';
          state.colsToShow = Object.keys(state.index.cols).map(function (key) {
            return state.index.cols[key];
          }).filter(function (col) {
            return !col.hide;
          });
          state.colsToShowByRole[role] = state.colsToShow.filter(function (col) {
            return col.role === role;
          });
          return _objectSpread({}, state);
        }

      case 'selectRow':
      case 'deselectRow':
        {
          action.row._selected = action.type === 'selectRow';
          var selectedRows = state.index.rows.filter(function (row) {
            return row._selected;
          });
          return _objectSpread(_objectSpread({}, state), {}, {
            selectedRows: selectedRows
          });
        }

      case 'selectAllRowsInPage':
      case 'deselectAllRowsInPage':
        {
          var isSelect = action.type === 'selectAllRowsInPage';
          state.index.rows.map(function (row) {
            return row._selected = false;
          });

          var _selectedRows = state.itemsInPage.filter(function (row) {
            return row._selected = isSelect;
          });

          return _objectSpread(_objectSpread({}, state), {}, {
            selectedRows: _selectedRows
          });
        }

      case 'focusItem':
        return _objectSpread(_objectSpread({}, state), {}, {
          focused: action.row
        });

      case 'blurItem':
        return _objectSpread(_objectSpread({}, state), {}, {
          focused: false
        });

      case 'setItems':
        {
          var maxNumPages = Math.ceil(action.items.length / state.itemsPerPage);
          return _objectSpread(_objectSpread({}, state), {}, {
            items: action.items,
            maxNumPages: maxNumPages,
            page: Math.min(maxNumPages, state.page)
          });
        }

      case 'setPage':
        {
          var page = Math.min(state.maxNumPages, Math.max(1, action.page));

          if (page == state.page) {
            return state;
          }

          var offset = state.itemsPerPage * (page - 1);
          return _objectSpread(_objectSpread({}, state), {}, {
            itemsInPage: state.items.slice(offset, offset + state.itemsPerPage),
            page: page
          });
        }

      case 'setItemsPerPage':
        {
          if (!action.itemsPerPage || action.itemsPerPage === state.itemsPerPage) {
            return state;
          }

          state.itemsPerPage = action.itemsPerPage;
          reflectResults(state);
          return _objectSpread({}, state);
        }

      case 'updateDevice':
        {
          var device = Catpow.util.getDevice();

          if (device === state.device) {
            return state;
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            device: Catpow.util.getDevice()
          });
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    wait: true,
    config: JSON.parse(localStorage.getItem('config:' + basepath) || '{}'),
    index: {
      cols: {},
      rows: []
    },
    colsByRole: {},
    colsToShow: [],
    colsToShowByRole: {},
    path: props.path,
    apiPath: '/cp/v1/' + basepath,
    query: props.query || {},
    sort: props.sort || {},
    layout: 'table',
    items: [],
    itemsInPage: [],
    itemsPerPage: 20,
    selectedRows: [],
    focused: false,
    page: 1,
    device: Catpow.util.getDevice()
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var fillConf = useCallback(function (conf) {
    switch (conf.output_type) {
      case 'select':
      case 'radio':
      case 'checkbox':
        conf.dict = {};

        if (Array.isArray(conf.value)) {
          conf.value.map(function (val) {
            conf.dict[val] = val;
          });
        } else {
          Object.keys(conf.value).map(function (label) {
            if (babelHelpers.typeof(conf.value[label]) === 'object') {
              if (Array.isArray(conf.value[label])) {
                conf.value[label].map(function (val) {
                  conf.dict[val] = val;
                });
              } else {
                Object.keys(conf.value[label]).map(function (label_) {
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
  var info = useMemo(function () {
    return {
      roleGroups: {
        images: ['image'],
        header: ['label', 'name', 'altname'],
        tags: ['group', 'tag'],
        excerpt: ['desc'],
        address: ['zip', 'prefecture', 'address'],
        contact: ['tel', 'fax', 'email', 'url'],
        contents: ['data', 'contents'],
        style: ['color']
      }
    };
  }, []);
  useEffect(function () {
    localStorage.setItem('config:' + basepath, JSON.stringify({
      cols: state.index.cols
    }));
  }, [state]);
  useEffect(function () {
    updateResults(state);
    dispatch({
      type: 'update'
    });
  }, [state.path, state.query, state.index, state.sort]);
  useEffect(function () {
    if (!state.ignorePushState) {
      pushState(state);
    } else {
      dispatch({
        type: 'update',
        data: {
          ignorePushState: false
        }
      });
    }
  }, [state.path, state.query]);
  useEffect(function () {
    wp.apiFetch({
      path: state.apiPath + '/index'
    }).then(function (index) {
      dispatch({
        type: 'setIndex',
        index: index
      });
    });
    window.addEventListener('popstate', function (e) {
      if (!e.state) {
        return;
      }

      dispatch({
        type: 'update',
        data: {
          path: e.state.path,
          query: e.state.query,
          ignorePushState: true
        }
      });
    });
    window.addEventListener('resize', function (e) {
      dispatch({
        type: 'updateDevice'
      });
    });
  }, [props]);
  return wp.element.createElement(Catpow.AppManager, null, wp.element.createElement(Catpow.FinderContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch,
      info: info
    }
  }, wp.element.createElement("div", {
    className: "Finder " + className
  }, props.children)));
};

Catpow.Finder.Nav = function (props) {
  var _props$className2 = props.className,
      className = _props$className2 === void 0 ? '' : _props$className2,
      children = props.children,
      otherProps = babelHelpers.objectWithoutProperties(props, _excluded);
  return wp.element.createElement("div", babelHelpers.extends({
    className: "FinderNavigation " + className
  }, otherProps), children);
};

Catpow.Finder.Spacer = function (props) {
  var _props$className3 = props.className,
      className = _props$className3 === void 0 ? '' : _props$className3,
      otherProps = babelHelpers.objectWithoutProperties(props, _excluded2);
  return wp.element.createElement("div", babelHelpers.extends({
    className: "FinderSpacer " + className
  }, otherProps));
};

Catpow.Finder.Main = function (props) {
  var _props$className4 = props.className,
      className = _props$className4 === void 0 ? '' : _props$className4,
      children = props.children,
      otherProps = babelHelpers.objectWithoutProperties(props, _excluded3);
  return wp.element.createElement("div", babelHelpers.extends({
    className: "FinderMain " + className
  }, otherProps), children);
};
