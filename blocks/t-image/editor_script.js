registerBlockType('catpow/t-image', {
	title: '🐾 T-Image',
	description: 'HTMLメール用の画像ブロックです。',
	icon: 'editor-code',
	category: 'catpow-mail',
	attributes: {
		classes: { source: 'attribute', selector: 'table', attribute: 'class', default: 'wp-block-catpow-t-image' },
		src: { source: 'attribute', selector: '[src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		alt: { source: 'attribute', selector: '[src]', attribute: 'alt' },
		loopImage: { source: 'text', selector: 'td', default: '[output image]' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes,
		    src = attributes.src,
		    alt = attributes.alt,
		    loopImage = attributes.loopImage;

		var primaryClass = 'wp-block-catpow-t-image';
		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ label: '画像出力コード', input: 'text', key: 'loopImage' }]
		}];

		return [wp.element.createElement(
			'table',
			{ width: '100%', className: classes },
			wp.element.createElement(
				'tbody',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'td',
						null,
						states.isTemplate ? wp.element.createElement('img', {
							src: cp.plugins_url + '/catpow/callee/dummy_image.php?text=' + loopImage,
							width: '100%',
							height: 'auto'
						}) : wp.element.createElement(SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: { src: 'src', alt: 'alt' },
							size: 'large',
							width: '100%',
							height: 'auto'
						})
					)
				)
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters['t-image'] || {}
			}),
			wp.element.createElement(
				PanelBody,
				{ title: 'CLASS', icon: 'admin-generic', initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: '\u30AF\u30E9\u30B9',
					onChange: function onChange(classes) {
						return setAttributes({ classes: classes });
					},
					value: classes
				})
			)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;
		var classes = attributes.classes,
		    src = attributes.src,
		    alt = attributes.alt,
		    loopImage = attributes.loopImage;

		var primaryClass = 'wp-block-catpow-t-image';
		var states = CP.wordsToFlags(classes);
		return wp.element.createElement(
			'table',
			{ width: '100%', className: classes },
			wp.element.createElement(
				'tbody',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'td',
						null,
						states.isTemplate ? loopImage : wp.element.createElement('img', { width: '100%', height: 'auto', src: src, alt: alt })
					)
				)
			)
		);
	}
});
