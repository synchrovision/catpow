/**
* FinderのTableViewで表示するカラムを選択
*/

Catpow.Finder.SelectColumns = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useContext = _wp$element.useContext;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	var _useState = useState(false),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    open = _useState2[0],
	    setOpen = _useState2[1];

	var cols = state.index.cols;


	return wp.element.createElement(
		"div",
		{ className: "FinderControl FinderSelectColumns" },
		wp.element.createElement(
			"ul",
			{ className: "items" },
			wp.element.createElement(
				"li",
				{ className: 'item' + (open ? ' active' : '') },
				wp.element.createElement("div", { className: "icon dashicons dashicons-visibility", onClick: function onClick() {
						return setOpen(!open);
					} }),
				wp.element.createElement(
					Catpow.Popover,
					{ open: open },
					wp.element.createElement(
						"div",
						{ className: "CheckBox__wrapper" },
						Object.keys(cols).map(function (name) {
							return wp.element.createElement(Catpow.CheckBox, {
								label: cols[name].label,
								selected: !cols[name].hide,
								onChange: function onChange(val) {
									return dispatch({ type: (val ? 'show' : 'hide') + 'Column', name: name });
								}
							});
						})
					)
				)
			)
		)
	);
};
