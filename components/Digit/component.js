Catpow.Digit = function (props) {
	if (undefined === Catpow.Digit.flags) {
		Catpow.Digit.flags = [[1, 1, 1, 0, 1, 1, 1], [0, 0, 1, 0, 0, 1, 0], [1, 0, 1, 1, 1, 0, 1], [1, 0, 1, 1, 0, 1, 1], [0, 1, 1, 1, 0, 1, 0], [1, 1, 0, 1, 0, 1, 1], [1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1]];
	}
	var flags = Catpow.Digit.flags[props.value];
	return wp.element.createElement(
		'span',
		{ className: 'Digit' },
		wp.element.createElement(
			'svg',
			{ viewBox: '0 0 200 360' },
			wp.element.createElement('polygon', { className: flags[0] ? 'active' : 'inactive', points: '40.4,39 21.4,20 40.4,1 159.6,1 178.6,20 159.6,39 ' }),
			wp.element.createElement('polygon', { className: flags[1] ? 'active' : 'inactive', points: '1,159.6 1,40.4 20,21.4 39,40.4 39,159.6 20,178.6 ' }),
			wp.element.createElement('polygon', { className: flags[2] ? 'active' : 'inactive', points: '161,159.6 161,40.4 180,21.4 199,40.4 199,159.6 180,178.6 ' }),
			wp.element.createElement('polygon', { className: flags[3] ? 'active' : 'inactive', points: '40.4,199 21.4,180 40.4,161 159.6,161 178.6,180 159.6,199 ' }),
			wp.element.createElement('polygon', { className: flags[4] ? 'active' : 'inactive', points: '1,319.6 1,200.4 20,181.4 39,200.4 39,319.6 20,338.6 ' }),
			wp.element.createElement('polygon', { className: flags[5] ? 'active' : 'inactive', points: '161,319.6 161,200.4 180,181.4 199,200.4 199,319.6 180,338.6 ' }),
			wp.element.createElement('polygon', { className: flags[6] ? 'active' : 'inactive', points: '40.4,359 21.4,340 40.4,321 159.6,321 178.6,340 159.6,359 ' })
		)
	);
};
