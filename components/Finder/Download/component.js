Catpow.Finder.Download = function (props) {
	var _wp$element = wp.element,
	    useContext = _wp$element.useContext,
	    useCallback = _wp$element.useCallback;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	var _props$action = props.action,
	    action = _props$action === undefined ? 'download' : _props$action;


	var download = useCallback(function () {
		var selectedItems = state.itemsInPage.filter(function (item) {
			return item._selected;
		});
		var items = selectedItems.length ? selectedItems : state.items;
		var rows = items.map(function (item) {
			return item._id;
		});
		console.log(rows);
		wp.apiFetch({
			path: state.apiPath + '/' + action,
			method: 'POST',
			data: { rows: rows }
		}).then(function (res) {
			Catpow.util.download(res.data, res.name || state.name + '.csv', 'text/csv');
		});
	}, [state.items, state.itemsInPage, dispatch]);

	return wp.element.createElement(
		'div',
		{ className: 'FinderControl FinderDownload' },
		wp.element.createElement(
			'ul',
			{ className: 'items' },
			wp.element.createElement(
				'li',
				{ className: 'item', onClick: download },
				wp.element.createElement('div', { 'class': "icon dashicons dashicons-download" })
			)
		)
	);
};
