/**
* Finderのページネーション
*/

Catpow.Finder.Pagenate = function (props) {
	var useContext = wp.element.useContext;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	if (!state.maxNumPages || state.maxNumPages < 2) {
		return false;
	}
	return wp.element.createElement(
		"div",
		{ className: "FinderPagenate" },
		wp.element.createElement(
			"div",
			{
				className: "button button_prev" + (state.page <= 1 ? ' disable' : ''),
				onClick: function onClick() {
					if (state.page <= 1) {
						return;
					}
					dispatch({ type: 'setPage', page: state.page - 1 });
				}
			},
			wp.element.createElement("div", { "class": "icon dashicons dashicons-arrow-left-alt2" })
		),
		wp.element.createElement(
			"ul",
			{ className: "items" },
			[].concat(babelHelpers.toConsumableArray(Array(state.maxNumPages).keys())).map(function (i) {
				var page = i + 1;
				var p = page - state.page;
				var stateClass = p === 0 ? 'active' : p < 0 ? 'before' : 'after';
				return wp.element.createElement(
					"li",
					{
						className: 'item item' + p + ' ' + stateClass,
						onClick: function onClick() {
							dispatch({ type: 'setPage', page: page });
						}
					},
					page
				);
			})
		),
		wp.element.createElement(
			"div",
			{
				className: "button button_next" + (state.page >= state.maxNumPages ? ' disable' : ''),
				onClick: function onClick() {
					if (state.page >= state.maxNumPages) {
						return;
					}
					dispatch({ type: 'setPage', page: state.page + 1 });
				}
			},
			wp.element.createElement("div", { "class": "icon dashicons dashicons-arrow-right-alt2" })
		)
	);
};
