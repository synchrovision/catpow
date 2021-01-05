/**
* 
*/
Catpow.AnimationContext = wp.element.createContext({});

Catpow.Animation = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useContext = _wp$element.useContext,
	    useEffect = _wp$element.useEffect,
	    useReducer = _wp$element.useReducer,
	    useRef = _wp$element.useRef;
	var _props$className = props.className,
	    className = _props$className === undefined ? 'Animation' : _props$className;

	var ref = useRef({ pointer: { x: 0, y: 0 }, clicked: false, press: false });

	var _useReducer = useReducer(function (state, action) {
		switch (action.type) {
			case 'tick':
				var clicked = false,
				    bnd = ref.current.getBoundingClientRect();
				if (bnd.top > window.innerHeight || bnd.bottom < 0) {
					return state;
				}
				if (ref.clicked) {
					var clicked = true;ref.clicked = false;
				}
				return babelHelpers.extends({}, state, {
					step: state.step + 1,
					container: ref.current,
					bnd: bnd,
					width: bnd.width,
					height: bnd.height,
					focus: { x: window.innerWidth / 2 - bnd.left, y: window.innerHeight / 2 - bnd.top },
					pointer: ref.pointer,
					clicked: clicked,
					press: ref.press
				});
		}
		return state;
	}, {
		step: 0,
		bnd: {},
		width: 1920,
		height: 1080,
		focus: {},
		pointer: {},
		clicked: false,
		press: false
	}),
	    _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
	    state = _useReducer2[0],
	    dispatch = _useReducer2[1];

	useEffect(function () {
		var requestID;
		var tick = function tick() {
			requestID = window.requestAnimationFrame(tick);
			dispatch({ type: 'tick' });
		};
		tick();
		return function () {
			window.cancelAnimationFrame(requestID);
		};
	}, [props]);

	return wp.element.createElement(
		Catpow.AnimationContext.Provider,
		{ value: { state: state, dispatch: dispatch } },
		wp.element.createElement(
			'div',
			{ className: className, ref: ref },
			props.children
		)
	);
};
