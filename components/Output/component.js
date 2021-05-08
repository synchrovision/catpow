Catpow.Output = function (props) {
	var conf = props.conf,
	    value = props.value;
	var el = wp.element.createElemnt;

	if (!value) return '';
	switch (conf.output_type) {
		case 'group':
			return wp.element.createElement(
				'ul',
				{ className: 'OutputGroup' },
				value.map(function (row) {
					return wp.element.createElement(
						'li',
						{ className: 'item' },
						Object.keys(conf.meta).map(function (name) {
							return wp.element.createElement(
								'dl',
								null,
								wp.element.createElement(
									'dt',
									null,
									conf.meta[name].label
								),
								wp.element.createElement(
									'dd',
									null,
									wp.element.createElement(Catpow.Output, { conf: conf.meta[name], value: row[name] })
								)
							);
						})
					);
				})
			);
		case 'select':
		case 'radio':
		case 'checkbox':
			return value.map(function (val) {
				return conf.dict[val];
			}).join(',');
		case 'image':
			return wp.element.createElement(
				'ul',
				{ className: 'OutputImages' },
				wp.element.createElement(
					'li',
					{ className: 'item' },
					props.images.map(function (image) {
						return wp.element.createElement('img', { className: 'OutputImage', src: image.url });
					})
				)
			);
		default:
			return value.join(',');
	}
};
