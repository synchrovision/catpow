/*
絞り込み選択のUI
*/
Catpow.SelectPreparedImage = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useEffect = _wp$element.useEffect;
	var name = props.name;

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
				return wp.element.createElement(
					'li',
					{ className: 'item ' + (value == image.url ? 'active' : '') },
					wp.element.createElement('img', {
						src: image.url,
						alt: image.alt,
						onClick: onClick
					})
				);
			})
		),
		wp.element.createElement(Catpow.HiddenValues, { name: name, value: value })
	);
};
