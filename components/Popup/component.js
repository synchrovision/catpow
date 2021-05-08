Catpow.Popup = function (props) {
	var children = props.children,
	    open = props.open,
	    onClose = props.onClose,
	    onClosed = props.onClosed,
	    _props$closeButton = props.closeButton,
	    closeButton = _props$closeButton === undefined ? false : _props$closeButton,
	    _props$closeOnClickAw = props.closeOnClickAway,
	    closeOnClickAway = _props$closeOnClickAw === undefined ? true : _props$closeOnClickAw;
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useEffect = _wp$element.useEffect;

	var _useState = useState('closed'),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    state = _useState2[0],
	    setPopupState = _useState2[1];

	useEffect(function () {
		return setPopupState(open ? 'open' : 'close');
	}, [open]);

	return wp.element.createElement(
		Catpow.External,
		{ className: 'PopupContainer' },
		wp.element.createElement(
			'div',
			{
				className: 'Popup ' + state,
				onAnimationEnd: function onAnimationEnd() {
					if (state === 'close') {
						setPopupState('closed');
						onClosed();
					}
				}
			},
			wp.element.createElement('div', { 'class': 'PopupBG', onClick: function onClick() {
					if (closeOnClickAway) {
						onClose();
					}
				} }),
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
		)
	);
};
