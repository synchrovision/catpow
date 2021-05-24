/**
* Finderのレイアウトを変更する
*/

Catpow.Finder.SelectLayout = function (props) {
	var useContext = wp.element.useContext;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	var selections = [{ value: 'list', icon: 'excerpt-view' }, { value: 'grid', icon: 'grid-view' }, { value: 'table', icon: 'list-view' }];
	return wp.element.createElement(
		'div',
		{ className: 'FinderControl FinderSelectLayout' },
		wp.element.createElement(
			'ul',
			{ className: 'items' },
			selections.map(function (sel) {
				return wp.element.createElement(
					'li',
					{
						className: 'item' + (state.layout === sel.value ? ' active' : ''),
						onClick: function onClick() {
							dispatch({ type: 'setLayout', layout: sel.value });
						}
					},
					wp.element.createElement('div', { 'class': "icon dashicons dashicons-" + sel.icon })
				);
			})
		)
	);
};
