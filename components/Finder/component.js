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
	    className = _props$className === undefined ? '' : _props$className;

	var pushState = useCallback(function (state) {
		var _state$path = state.path,
		    path = _state$path === undefined ? '' : _state$path,
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

	var reducer = useCallback(function (state, action) {
		switch (action.type) {
			case 'setIndex':
				{
					var index = action.index;
					return babelHelpers.extends({}, state, { index: index });
				}
			case 'setPath':
				return babelHelpers.extends({}, state, { path: action.path });
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
					return babelHelpers.extends({}, state, { query: babelHelpers.extends({}, query) });
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
					return babelHelpers.extends({}, state, { query: babelHelpers.extends({}, _query) });
				}
			case 'setQeury':
				return babelHelpers.extends({}, state, { query: action.query });
			case 'setPathAndQuery':
				return babelHelpers.extends({}, state, { path: action.path, query: action.query });
			case 'update':
				return babelHelpers.extends({}, state, action.data || {});
			case 'setLayout':
				if (action.layout === state.layout) {
					return state;
				}
				return babelHelpers.extends({}, state, { layout: action.layout, transition: 'mod' });
			case 'showColumn':
				state.index.cols[action.name].hide = false;
				return babelHelpers.extends({}, state);
			case 'hideColumn':
				state.index.cols[action.name].hide = true;
				return babelHelpers.extends({}, state);
			case 'selectRow':
				action.row._selected = true;
				return babelHelpers.extends({}, state);
			case 'deselectRow':
				action.row._selected = false;
				return babelHelpers.extends({}, state);
			case 'focusItem':
				return babelHelpers.extends({}, state, { focused: action.row });
			case 'blurItem':
				return babelHelpers.extends({}, state, { focused: false });
			case 'setItems':
				var maxNumPages = Math.ceil(action.items.length / state.itemsPerPage);
				return babelHelpers.extends({}, state, {
					items: action.items,
					maxNumPages: maxNumPages,
					page: Math.min(maxNumPages, state.page)
				});
			case 'setPage':
				{
					var page = Math.min(state.maxNumPages, Math.max(1, action.page));
					if (page == state.page) {
						return state;
					}
					var offset = state.itemsPerPage * (page - 1);
					return babelHelpers.extends({}, state, {
						itemsInPage: state.items.slice(offset, offset + state.itemsPerPage),
						page: page
					});
				}
			case 'setItemsPerPage':
				{
					if (!action.itemsPerPage) {
						return state;
					}
					var _maxNumPages = Math.ceil(state.items.length / action.itemsPerPage);
					var _page = Math.min(_maxNumPages, state.page);
					var _offset = action.itemsPerPage * (_page - 1);
					return babelHelpers.extends({}, state, {
						itemsInPage: state.items.slice(_offset, _offset + action.itemsPerPage),
						itemsPerPage: action.itemsPerPage,
						maxNumPages: _maxNumPages,
						page: _page
					});
				}
			case 'updateDevice':
				var device = Catpow.util.getDevice();
				if (device === state.device) {
					return state;
				}
				return babelHelpers.extends({}, state, { device: Catpow.util.getDevice() });
		}
		return state;
	}, []);

	var _useReducer = useReducer(reducer, {
		index: {
			cols: {},
			rows: [],
			colsByRole: {}
		},
		path: props.path,
		apiPath: '/cp/v1/' + basepath,
		query: props.query || {},
		layout: 'table',
		items: [],
		itemsInPage: [],
		itemsPerPage: 20,
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

	var config = useMemo(function () {
		return JSON.parse(localStorage.getItem('config:' + basepath) || '{}');
	}, [state]);
	useEffect(function () {
		localStorage.setItem('config:' + basepath, JSON.stringify({ cols: state.index.cols }));
	}, [state]);

	useEffect(function () {
		var items = state.index.rows.filter(function (row) {
			return Object.keys(state.query).every(function (key) {
				if (state.query[key].length === 0) {
					return true;
				}
				return state.query[key].indexOf(row[key][0]) !== -1;
			});
		});
		var itemsInPage = items.slice(0, state.itemsPerPage);
		var maxNumPages = Math.ceil(items.length / state.itemsPerPage);
		dispatch({ type: 'update', data: {
				page: 1,
				items: items,
				itemsInPage: itemsInPage,
				maxNumPages: maxNumPages
			} });
	}, [state.path, state.query, state.index]);
	useEffect(function () {
		if (!state.ignorePushState) {
			pushState(state);
		} else {
			dispatch({ type: 'update', data: { ignorePushState: false } });
		}
	}, [state.path, state.query]);

	useEffect(function () {
		wp.apiFetch({
			path: state.apiPath + '/index'
		}).then(function (index) {
			index.colsByRole = {};
			Object.keys(index.cols).map(function (name, i) {
				index.cols[name].hide = config.cols[name] ? config.cols[name].hide : i > 8 || ['contents', 'data'].indexOf(index.cols[name].role) !== -1;
				fillConf(index.cols[name]);
			});
			dispatch({ type: 'setIndex', index: index });
		});
		window.addEventListener('popstate', function (e) {
			if (!e.state) {
				return;
			}
			dispatch({ type: 'update', data: {
					path: e.state.path,
					query: e.state.query,
					ignorePushState: true
				} });
		});
		window.addEventListener('resize', function (e) {
			dispatch({ type: 'updateDevice' });
		});
	}, [props]);

	return wp.element.createElement(
		Catpow.AppManager,
		null,
		wp.element.createElement(
			Catpow.FinderContext.Provider,
			{ value: { state: state, dispatch: dispatch } },
			wp.element.createElement(
				'div',
				{ className: "Finder " + className },
				props.children
			)
		)
	);
};
Catpow.Finder.Nav = function (props) {
	var _props$className2 = props.className,
	    className = _props$className2 === undefined ? '' : _props$className2,
	    children = props.children,
	    otherProps = babelHelpers.objectWithoutProperties(props, ['className', 'children']);

	return wp.element.createElement(
		'div',
		babelHelpers.extends({ className: "FinderNavigation " + className }, otherProps),
		children
	);
};
Catpow.Finder.Spacer = function (props) {
	var _props$className3 = props.className,
	    className = _props$className3 === undefined ? '' : _props$className3,
	    otherProps = babelHelpers.objectWithoutProperties(props, ['className']);

	return wp.element.createElement('div', babelHelpers.extends({ className: "FinderSpacer " + className }, otherProps));
};
Catpow.Finder.Main = function (props) {
	var _props$className4 = props.className,
	    className = _props$className4 === undefined ? '' : _props$className4,
	    children = props.children,
	    otherProps = babelHelpers.objectWithoutProperties(props, ['className', 'children']);

	return wp.element.createElement(
		'div',
		babelHelpers.extends({ className: "FinderMain " + className }, otherProps),
		children
	);
};
