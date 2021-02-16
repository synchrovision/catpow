registerBlockType('catpow/t-media-text', {
	title: '🐾 T-media-text',
	description: 'HTMLメール用の画像・テキストのセットのブロックです。',
	icon: 'editor-code',
	category: 'catpow-mail',
	parent: ['catpow/t-body', 'catpow/t-box', 'catpow/t-loop'],
	attributes: {
		classes: { source: 'attribute', selector: 'table', attribute: 'class', default: 'wp-block-catpow-t-media-text' },
		src: { source: 'attribute', selector: '[src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		alt: { source: 'attribute', selector: '[src]', attribute: 'alt' },
		imageCode: { source: 'text', selector: 'td.imageCell', default: cp.theme_url + '/images/dummy.jpg' },
		width: { source: 'attribute', selector: 'td.imageCell', attribute: 'width', default: '200' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes,
		    src = attributes.src,
		    alt = attributes.alt,
		    imageCode = attributes.imageCode,
		    width = attributes.width;

		var primaryClass = 'wp-block-catpow-t-media-text';
		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ label: '画像出力コード', input: 'text', key: 'imageCode' }]
		}, { input: 'range', label: '画像の幅', key: 'width', min: 50, max: 400, step: 10 }];

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
						{ className: 'imageCell', width: width },
						wp.element.createElement(SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: { src: 'src', alt: 'alt', code: 'imageCode' },
							size: 'large',
							width: '100%',
							height: 'auto',
							isTemplate: states.isTemplate
						})
					),
					wp.element.createElement('td', { className: 'spacerCell' }),
					wp.element.createElement(
						'td',
						{ className: 'textCell' },
						wp.element.createElement(InnerBlocks, null)
					)
				)
			)
		), wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(VerticalAlignClassToolbar, { set: setAttributes, attr: attributes })
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters['t-media-text'] || {}
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
		    imageCode = attributes.imageCode,
		    width = attributes.width;

		var primaryClass = 'wp-block-catpow-t-media-text';
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
						{ className: 'imageCell', width: width },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: { src: 'src', alt: 'alt', code: 'imageCode' },
							size: 'large',
							width: '100%',
							height: 'auto',
							isTemplate: states.isTemplate
						})
					),
					wp.element.createElement('td', { className: 'spacerCell' }),
					wp.element.createElement(
						'td',
						{ className: 'textCell' },
						wp.element.createElement(InnerBlocks.Content, null)
					)
				)
			)
		);
	}
});
