/*
絞り込み選択のUI
*/
Catpow.UI.SelectPreparedImage = function (props) {
	var setURLparams = Catpow.util.setURLparams;
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useEffect = _wp$element.useEffect;
	var name = props.name,
	    _props$color = props.color,
	    color = _props$color === undefined ? 'i' : _props$color;

	var _useState = useState(props.value),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    value = _useState2[0],
	    setValue = _useState2[1];

	var _useState3 = useState([]),
	    _useState4 = babelHelpers.slicedToArray(_useState3, 2),
	    images = _useState4[0],
	    setImages = _useState4[1];

	useEffect(function () {
		wp.apiFetch({ path: 'cp/v1/images/' + props.type }).then(setImages);
	}, [setImages]);

	var onClick = function onClick(e) {
		return setValue(e.currentTarget.src);
	};
	return wp.element.createElement(
		'div',
		{ className: 'SelectPreparedImage' },
		wp.element.createElement(
			'ul',
			null,
			images.map(function (image) {
				var url = setURLparams(image.url, { c: color, theme: cp.theme });
				return wp.element.createElement(
					'li',
					{ className: 'item ' + (value == url ? 'active' : '') },
					wp.element.createElement('img', {
						src: url,
						alt: image.alt,
						onClick: onClick
					})
				);
			})
		),
		wp.element.createElement(Catpow.UI.HiddenValues, { name: name, value: value })
	);
};
