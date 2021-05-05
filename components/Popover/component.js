Catpow.Popover = function (_ref) {
	var children = _ref.children,
	    open = _ref.open,
	    onClose = _ref.onClose,
	    closeButton = _ref.closeButton,
	    _ref$position = _ref.position,
	    position = _ref$position === undefined ? 'top' : _ref$position;

	var _wp$element$useState = wp.element.useState('closed'),
	    _wp$element$useState2 = babelHelpers.slicedToArray(_wp$element$useState, 2),
	    state = _wp$element$useState2[0],
	    setPopoverState = _wp$element$useState2[1];

	if (open && state === 'closed') {
		setPopoverState('open');
	}
	if (!open && state === 'open') {
		setPopoverState('close');
	}
	return wp.element.createElement(
		'div',
		{
			className: 'Popover ' + state + ' ' + position,
			onAnimationEnd: function onAnimationEnd() {
				if (state === 'close') {
					setPopoverState('closed');
				}
			}
		},
		wp.element.createElement(
			'div',
			{ 'class': 'PopoverBody' },
			wp.element.createElement('div', { 'class': 'PopoverArrow' }),
			wp.element.createElement(
				'div',
				{ className: 'PopoverContents' },
				children
			),
			closeButton && wp.element.createElement(
				'div',
				{ className: 'PopoverControl' },
				wp.element.createElement('div', { className: 'close', onClick: onClose })
			)
		)
	);
};
