Catpow.Popover = function (props) {
	var children = props.children,
	    open = props.open,
	    onClose = props.onClose,
	    closeButton = props.closeButton,
	    _props$position = props.position,
	    position = _props$position === undefined ? 'top' : _props$position;
	var _wp$element = wp.element,
	    Fragment = _wp$element.Fragment,
	    useEffect = _wp$element.useEffect,
	    useState = _wp$element.useState,
	    useRef = _wp$element.useRef;

	var _useState = useState('closed'),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    state = _useState2[0],
	    setPopoverState = _useState2[1];

	useEffect(function () {
		return setPopoverState(open ? 'open' : state === 'closed' ? 'closed' : 'close');
	}, [open]);

	var ref = useRef({});

	return wp.element.createElement(
		Fragment,
		null,
		wp.element.createElement('div', { className: 'PopoverAnchor', ref: ref }),
		wp.element.createElement(
			Catpow.External,
			{ className: 'PopoverContainer', trace: ref.current },
			wp.element.createElement(
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
			)
		)
	);
};
