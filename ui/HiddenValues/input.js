Catpow.UI.HiddenValues = function (props) {
	var useCallback = wp.element.useCallback;

	var hiddenInput = useCallback(function (name, val) {
		if (val instanceof Object) {
			return Object.keys(val).map(function (k) {
				return hiddenInput(name + '[' + k + ']', val[k]);
			});
		} else {
			return wp.element.createElement('input', { type: 'hidden', name: name, value: val });
		}
	}, [props]);
	return wp.element.createElement(
		'div',
		{ className: 'hiddenValues' },
		hiddenInput(props.name, props.value)
	);
};
