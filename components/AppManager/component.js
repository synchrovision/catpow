Catpow.AppManagerContext = wp.element.createContext({});
Catpow.AppManager = function (props) {
	var children = props.children;
	var _wp$element = wp.element,
	    Fragment = _wp$element.Fragment,
	    useCallback = _wp$element.useCallback,
	    useReducer = _wp$element.useReducer;


	var reducer = useCallback(function (state, action) {
		switch (action.type) {
			case 'update':
				return babelHelpers.extends({}, state, action.data || {});
			case 'setOuterContents':
				{
					var name = action.name,
					    _children = action.children;

					return babelHelpers.extends({}, state, { outerContents: babelHelpers.extends({}, state.outerContents, babelHelpers.defineProperty({}, name, _children)) });
				}
		}
	}, []);

	var _useReducer = useReducer(reducer, { outerContents: false }),
	    _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
	    state = _useReducer2[0],
	    dispatch = _useReducer2[1];

	return wp.element.createElement(
		Fragment,
		null,
		wp.element.createElement(
			Catpow.AppManagerContext.Provider,
			{ value: { state: state, dispatch: dispatch } },
			children
		),
		Object.keys(state.outerContents).map(function (name) {
			return state.outerContents[name];
		})
	);
};
Catpow.OuterContents = function (props) {
	var name = props.name,
	    children = props.children;
	var _wp$element2 = wp.element,
	    useCallback = _wp$element2.useCallback,
	    useContext = _wp$element2.useContext,
	    useEffect = _wp$element2.useEffect;

	var _useContext = useContext(Catpow.AppManagerContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch;

	useEffect(function () {
		dispatch({ type: 'setOuterContents', name: name, children: children });
	}, [name, children]);

	return false;
};
