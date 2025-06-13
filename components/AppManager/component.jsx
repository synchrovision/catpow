Catpow.AppManagerContext = wp.element.createContext({});
Catpow.AppManager = (props) => {
	const { children } = props;
	const { Fragment, useCallback, useReducer } = wp.element;

	const reducer = useCallback((state, action) => {
		switch (action.type) {
			case "update":
				return { ...state, ...(action.data || {}) };
			case "setOuterContents": {
				const { name, children } = action;
				return { ...state, outerContents: { ...state.outerContents, [name]: children } };
			}
		}
	}, []);
	const [state, dispatch] = useReducer(reducer, { outerContents: false });

	return (
		<Fragment>
			<Catpow.AppManagerContext.Provider value={{ state, dispatch }}>{children}</Catpow.AppManagerContext.Provider>
			{Object.keys(state.outerContents).map((name) => state.outerContents[name])}
		</Fragment>
	);
};
Catpow.OuterContents = (props) => {
	const { name, children } = props;
	const { useCallback, useContext, useEffect } = wp.element;
	const { state, dispatch } = useContext(Catpow.AppManagerContext);
	useEffect(() => {
		dispatch({ type: "setOuterContents", name, children });
	}, [name, children]);

	return false;
};
