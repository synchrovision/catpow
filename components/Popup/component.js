Catpow.Popup = function (_ref) {
	var children = _ref.children,
	    open = _ref.open,
	    onClose = _ref.onClose,
	    closeButton = _ref.closeButton;

	var _wp$element$useState = wp.element.useState('closed'),
	    _wp$element$useState2 = babelHelpers.slicedToArray(_wp$element$useState, 2),
	    state = _wp$element$useState2[0],
	    setPopupState = _wp$element$useState2[1];

	if (open && state === 'closed') {
		setPopupState('open');
	}
	if (!open && state === 'open') {
		setPopupState('close');
	}
	return wp.element.createElement(
		'div',
		{
			className: 'Popup ' + state,
			onAnimationEnd: function onAnimationEnd() {
				if (state === 'close') {
					setPopupState('closed');
				}
			}
		},
		wp.element.createElement('div', { 'class': 'PopupBG', onClick: onClose }),
		wp.element.createElement(
			'div',
			{ 'class': 'PopupBody' },
			wp.element.createElement(
				'div',
				{ className: 'PopupContents' },
				children
			),
			closeButton && wp.element.createElement(
				'div',
				{ className: 'PopupControl' },
				wp.element.createElement('div', { className: 'close', onClick: onClose })
			)
		)
	);
};
