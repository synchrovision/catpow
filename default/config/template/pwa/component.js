var Finder = function Finder(props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useCallback = _wp$element.useCallback,
	    useEffect = _wp$element.useEffect,
	    useRef = _wp$element.useRef;
	var basepath = props.basepath,
	    baseurl = props.baseurl;

	var _useState = useState(props.path),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    path = _useState2[0],
	    setPath = _useState2[1];

	var _useState3 = useState(props.query || {}),
	    _useState4 = babelHelpers.slicedToArray(_useState3, 2),
	    query = _useState4[0],
	    setQuery = _useState4[1];

	var _useState5 = useState(null),
	    _useState6 = babelHelpers.slicedToArray(_useState5, 2),
	    index = _useState6[0],
	    setIndex = _useState6[1];

	var _useState7 = useState(null),
	    _useState8 = babelHelpers.slicedToArray(_useState7, 2),
	    contents = _useState8[0],
	    setContents = _useState8[1];

	var _useState9 = useState(null),
	    _useState10 = babelHelpers.slicedToArray(_useState9, 2),
	    pageState = _useState10[0],
	    setPageState = _useState10[1];

	var _useState11 = useState([]),
	    _useState12 = babelHelpers.slicedToArray(_useState11, 2),
	    items = _useState12[0],
	    setItems = _useState12[1];

	var _useState13 = useState([]),
	    _useState14 = babelHelpers.slicedToArray(_useState13, 2),
	    tags = _useState14[0],
	    setTags = _useState14[1];

	var cache = useRef({});

	var parsePath = useCallback(function (path) {
		var matches = void 0;
		if (matches = path.match(/^(\d+)\/?$/)) {
			return { item_id: matches[1] };
		}
	}, []);
	var save = useCallback(function (state) {
		var path = state.path,
		    query = state.query;

		var q = {};
		if (query) {
			Object.keys(query).map(function (key) {
				q['q[' + key + ']' + (Array.isArray(query[key]) ? '[]' : '')] = query[key];
			});
		}
		history.pushState(state, '', URI(baseurl).query(q).toString());
	}, []);
	var toggleTag = useCallback(function (tag) {
		var i = void 0,
		    tags = query.tags || [];
		if ((i = tags.indexOf(tag.id)) === -1) {
			tags.push(tag.id);
		} else {
			tags.splice(i, 1);
		}
		setQuery(Object.assign({}, query, { tags: tags }));
		save({ path: path, query: query });
	}, [path, query]);

	var showDetailOfItem = useCallback(function (item) {
		setPageState('wait');
		wp.apiFetch({
			path: '/cp/v1/' + basepath + '/finder/' + item.id + '/detail'
		}).then(function (contents) {
			setPageState('success');
			setContents(contents);
			save({ path: path, query: query });
		});
	}, [path, query]);

	useEffect(function () {
		wp.apiFetch({
			path: '/cp/v1/' + basepath + '/finder/index'
		}).then(setIndex);
		window.addEventListener('popstate', function (e) {
			setPath(e.state.path);
			setQuery(e.state.query);
		});
	}, [props]);

	var pathData = parsePath(path);
	useEffect(function () {
		if (index) {
			var tagsById = {};
			index.tags.map(function (tag) {
				tag.count = 0;
				tagsById[tag.id] = tag;
			});
			var _items = index.items.filter(function (item) {
				if (query.tags) {
					return query.tags.every(function (tag) {
						return item.tags.indexOf(tag) !== -1;
					});
				}
				return true;
			});
			setItems(_items);
			_items.map(function (item) {
				item.tags.map(function (tag) {
					tagsById[tag].count++;
				});
			});
		}
	}, [path, query, index]);

	var texts = [wp.element.createElement(
		'p',
		null,
		'\u60C5\u306B\u68F9\u3055\u305B\u3070\u6D41\u3055\u308C\u308B\u3002\u667A\u306B\u50CD\u3051\u3070\u89D2\u304C\u7ACB\u3064\u3002\u3069\u3053\u3078\u8D8A\u3057\u3066\u3082\u4F4F\u307F\u306B\u304F\u3044\u3068\u609F\u3063\u305F\u6642\u3001\u8A69\u304C\u751F\u308C\u3066\u3001\u753B\u304C\u51FA\u6765\u308B\u3002\u3068\u304B\u304F\u306B\u4EBA\u306E\u4E16\u306F\u4F4F\u307F\u306B\u304F\u3044\u3002\u610F\u5730\u3092\u901A\u305B\u3070\u7AAE\u5C48\u3060\u3002 \u3068\u304B\u304F\u306B\u4EBA\u306E\u4E16\u306F\u4F4F\u307F\u306B\u304F\u3044\u3002 \u3069\u3053\u3078\u8D8A\u3057\u3066\u3082\u4F4F\u307F\u306B\u304F\u3044\u3068\u609F\u3063\u305F\u6642\u3001\u8A69\u304C\u751F\u308C\u3066\u3001\u753B\u304C\u51FA\u6765\u308B\u3002\u610F\u5730\u3092\u901A\u305B\u3070\u7AAE\u5C48\u3060\u3002\u5C71\u8DEF\u3092\u767B\u308A\u306A\u304C\u3089\u3001\u3053\u3046\u8003\u3048\u305F\u3002\u667A\u306B\u50CD\u3051\u3070\u89D2\u304C\u7ACB\u3064\u3002\u3069\u3053\u3078\u8D8A\u3057\u3066\u3082\u4F4F\u307F\u306B\u304F\u3044\u3068\u609F\u3063\u305F\u6642\u3001\u8A69\u304C\u751F\u308C\u3066\u3001\u753B\u304C\u51FA\u6765\u308B\u3002\u667A\u306B\u50CD\u3051\u3070\u89D2\u304C\u7ACB\u3064\u3002 \u3068\u304B\u304F\u306B\u4EBA\u306E\u4E16\u306F\u4F4F\u307F\u306B\u304F\u3044\u3002\u5C71\u8DEF\u3092\u767B\u308A\u306A\u304C\u3089\u3001\u3053\u3046\u8003\u3048\u305F\u3002\u3068\u304B\u304F\u306B\u4EBA\u306E\u4E16\u306F\u4F4F\u307F\u306B\u304F\u3044\u3002\u4F4F\u307F\u306B\u304F\u3055\u304C\u9AD8\u3058\u308B\u3068\u3001\u5B89\u3044\u6240\u3078\u5F15\u304D\u8D8A\u3057\u305F\u304F\u306A\u308B\u3002\u4F4F\u307F\u306B\u304F\u3055\u304C\u9AD8\u3058\u308B\u3068\u3001\u5B89\u3044\u6240\u3078\u5F15\u304D\u8D8A\u3057\u305F\u304F\u306A\u308B\u3002\u60C5\u306B\u68F9\u3055\u305B\u3070\u6D41\u3055\u308C\u308B\u3002 \u610F\u5730\u3092\u901A\u305B\u3070\u7AAE\u5C48\u3060\u3002\u4F4F\u307F\u306B\u304F\u3055\u304C\u9AD8\u3058\u308B\u3068\u3001\u5B89\u3044\u6240\u3078\u5F15\u304D\u8D8A\u3057\u305F\u304F\u306A\u308B\u3002\u610F\u5730\u3092\u901A\u305B\u3070\u7AAE\u5C48\u3060\u3002'
	), wp.element.createElement(
		'p',
		null,
		'\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u3002\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002\u543E\u8F29\u306F\u3053\u3053\u3067\u59CB\u3081\u3066\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u3092\u898B\u305F\u3002\u3057\u304B\u3082\u3042\u3068\u3067\u805E\u304F\u3068\u305D\u308C\u306F\u66F8\u751F\u3068\u3044\u3046\u4EBA\u9593\u4E2D\u3067\u4E00\u756A\u7370\u60AA\u306A\u7A2E\u65CF\u3067\u3042\u3063\u305F\u305D\u3046\u3060\u3002\u3053\u306E\u66F8\u751F\u3068\u3044\u3046\u306E\u306F\u6642\u3005\u6211\u3005\u3092\u6355\u3048\u3066\u716E\u3066\u98DF\u3046\u3068\u3044\u3046\u8A71\u3067\u3042\u308B\u3002\u3057\u304B\u3057\u305D\u306E\u5F53\u6642\u306F\u4F55\u3068\u3044\u3046\u8003\u3082\u306A\u304B\u3063\u305F\u304B\u3089\u5225\u6BB5\u6050\u3057\u3044\u3068\u3082\u601D\u308F\u306A\u304B\u3063\u305F\u3002\u305F\u3060\u5F7C\u306E\u638C\u306B\u8F09\u305B\u3089\u308C\u3066\u30B9\u30FC\u3068\u6301\u3061\u4E0A\u3052\u3089\u308C\u305F\u6642\u4F55\u3060\u304B\u30D5\u30EF\u30D5\u30EF\u3057\u305F\u611F\u3058\u304C\u3042\u3063\u305F\u3070\u304B\u308A\u3067\u3042\u308B\u3002\u638C\u306E\u4E0A\u3067\u5C11\u3057\u843D\u3061\u4ED8\u3044\u3066\u66F8\u751F\u306E\u9854\u3092\u898B\u305F\u306E\u304C\u3044\u308F\u3086\u308B\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u306E\u898B\u59CB\u3067\u3042\u308D\u3046\u3002\u3053\u306E\u6642\u5999\u306A\u3082\u306E\u3060\u3068\u601D\u3063\u305F\u611F\u3058\u304C\u4ECA\u3067\u3082\u6B8B\u3063\u3066\u3044\u308B\u3002\u7B2C\u4E00\u6BDB\u3092\u4EE5\u3066\u88C5\u98FE\u3055\u308C\u3079\u304D\u306F\u305A\u306E\u9854\u304C\u3064\u308B\u3064\u308B\u3057\u3066\u307E\u308B\u3067\u85AC\u7F36\u3060\u3002\u305D\u306E\u5F8C\u732B\u306B\u3082\u5927\u5206\u9022\u3063\u305F\u304C\u3053\u3093\u306A\u7247\u8F2A\u306B\u306F\u4E00\u5EA6\u3082\u51FA\u4F1A\u308F\u3057\u305F\u4E8B\u304C\u306A\u3044\u3002\u306E\u307F\u306A\u3089\u305A\u9854\u306E\u771F\u4E2D\u304C\u4F59\u308A\u306B\u7A81\u8D77\u3057\u3066\u3044\u308B\u3002\u305D\u3046\u3057\u3066\u305D\u306E\u7A74\u306E\u4E2D\u304B\u3089\u6642\u3005\u3077\u3046\u3077\u3046\u3068\u70DF\u3092\u5439\u304F\u3002\u3069\u3046\u3082\u54BD\u305B\u307D\u304F\u3066\u5B9F\u306B\u5F31\u3063\u305F\u3002\u3053\u308C\u304C\u4EBA\u9593\u306E\u98F2\u3080\u70DF\u8349\u3068\u3044\u3046\u3082\u306E\u3067\u3042\u308B\u4E8B\u306F\u6F38\u304F\u3053\u306E\u9803\u77E5\u3063\u305F\u3002'
	), wp.element.createElement(
		'p',
		null,
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	)];

	var _useState15 = useState(1),
	    _useState16 = babelHelpers.slicedToArray(_useState15, 2),
	    ti = _useState16[0],
	    setTi = _useState16[1];

	var _useState17 = useState(texts[0]),
	    _useState18 = babelHelpers.slicedToArray(_useState17, 2),
	    hoge = _useState18[0],
	    setHoge = _useState18[1];

	var qTags = query.tags || [];
	if (index === null) {
		return false;
	}
	return wp.element.createElement(
		'div',
		{ className: 'finder' },
		wp.element.createElement(
			Catpow.Transition,
			{ fitHeight: true },
			hoge
		),
		wp.element.createElement(
			'button',
			{
				onClick: function onClick() {
					setTi((ti + 1) % 3);
					setHoge(texts[ti]);
				}
			},
			'test'
		),
		index.tags && wp.element.createElement(
			'ul',
			{ className: 'finder_tags' },
			index.tags.map(function (tag) {
				var className = "finder_tags_item";
				if (qTags.indexOf(tag.id) !== -1) {
					className += ' active';
				}
				if (tag.count === 0) {
					className += ' empty';
				}
				return wp.element.createElement(
					'li',
					{
						className: className,
						onClick: function onClick() {
							return toggleTag(tag);
						}
					},
					tag.label,
					wp.element.createElement(
						'span',
						{ className: 'finder_tags_item_count' },
						'(',
						tag.count,
						')'
					)
				);
			})
		),
		wp.element.createElement(
			'ul',
			{ className: 'finder_items' },
			items.map(function (item) {
				return wp.element.createElement(
					'div',
					{
						className: 'finder_items_item',
						onClick: function onClick() {
							return showDetailOfItem(item);
						}
					},
					item.title
				);
			})
		),
		contents && wp.element.createElement(Catpow.Contents, { className: 'finder_contents', html: contents.html, deps: contents.deps })
	);
};
var TestCounter = function TestCounter() {
	var useState = wp.element.useState;

	var _useState19 = useState(0),
	    _useState20 = babelHelpers.slicedToArray(_useState19, 2),
	    count = _useState20[0],
	    setCount = _useState20[1];

	return wp.element.createElement(
		'div',
		{ onClick: function onClick() {
				return setCount(count + 1);
			} },
		'counter ',
		count
	);
};
