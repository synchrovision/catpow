Catpow.Finder.Focused = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useCallback = _wp$element.useCallback,
	    useContext = _wp$element.useContext;
	var _wp$i18n = wp.i18n,
	    __ = _wp$i18n.__,
	    sprintf = _wp$i18n.sprintf;

	var _useContext = useContext(Catpow.FinderContext),
	    state = _useContext.state,
	    dispatch = _useContext.dispatch,
	    info = _useContext.info;

	var roleGroups = info.roleGroups;
	var cols = state.index.cols;


	var flagsToWords = useCallback(function (classes) {
		return Object.keys(classes).filter(function (key) {
			return classes[key];
		}).join(' ');
	}, []);
	var hasRoleGroup = useCallback(function (group) {
		return !roleGroups[group].every(function (role) {
			return !state.colsByRole[role] || !state.colsByRole[role].length;
		});
	}, [state.colsByRole, roleGroups]);
	var ucfirst = useCallback(function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}, []);

	var flags = { FinderFocused: true };
	Object.keys(roleGroups).map(function (group) {
		flags['has' + ucfirst(group)] = hasRoleGroup(group);
	});

	return wp.element.createElement(
		'div',
		{ className: flagsToWords(flags) },
		wp.element.createElement(
			'table',
			{ 'class': 'items' },
			Object.keys(roleGroups).map(function (group) {
				if (!hasRoleGroup(group)) {
					return false;
				}
				return roleGroups[group].map(function (role) {
					if (!state.colsByRole[role] || !state.colsByRole[role].length) {
						return false;
					}
					return state.colsByRole[role].map(function (col) {
						return wp.element.createElement(
							'tr',
							{ 'class': 'item' },
							wp.element.createElement(
								'th',
								{ 'class': 'label' },
								col.label
							),
							wp.element.createElement(
								'td',
								{ 'class': 'value' },
								wp.element.createElement(Catpow.Output, babelHelpers.extends({ conf: col }, state.focused[col.name]))
							)
						);
					});
				});
			})
		)
	);
};
