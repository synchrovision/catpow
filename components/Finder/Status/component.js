/**
* Finderの表示項目を絞り込みするコンポーネント
*/

Catpow.Finder.Status = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useContext = _wp$element.useContext;
	var _wp$i18n = wp.i18n,
	    __ = _wp$i18n.__,
	    sprintf = _wp$i18n.sprintf;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	var _useState = useState(false),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    open = _useState2[0],
	    setOpen = _useState2[1];

	var cols = state.index.cols;


	var selectedItems = state.itemsInPage.filter(function (item) {
		return item._selected;
	});

	return wp.element.createElement(
		'div',
		{ className: 'FinderControl FinderStatus' },
		sprintf(__('%d件中%d件表示', 'catpow'), state.items.length, state.itemsInPage.length),
		selectedItems.length > 0 && sprintf(__('%d件選択', 'catpow'), selectedItems.length)
	);
};
