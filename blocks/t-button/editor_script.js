registerBlockType('catpow/t-button', {
	title: '🐾 T-Button',
	description: 'HTMLメール用のテーブルレイアウトのボタンです。',
	icon: 'editor-code',
	category: 'catpow-mail',
	parent: ['catpow/t-body', 'catpow/t-box', 'catpow/t-loop'],
	attributes: {
		classes: { source: 'attribute', selector: 'a', attribute: 'class', default: 'wp-block-catpow-t-button medium' },
		title: { source: 'children', selector: 'tbody td', default: 'Title' },
		url: { source: 'attribute', selector: 'a', attribute: 'href', default: cp.home_url }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes,
		    title = attributes.title;

		var primaryClass = 'wp-block-catpow-t-button';
		var states = CP.wordsToFlags(classes);

		var selectiveClasses = ['color', { label: 'サイズ', values: ['large', 'medium', 'small'] }, { input: 'text', label: 'URL', key: 'url' }];

		return [wp.element.createElement(
			'a',
			{ className: classes },
			wp.element.createElement(
				'table',
				{ width: '100%' },
				wp.element.createElement(
					'tbody',
					null,
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(title) {
									setAttributes({ title: title });
								},
								value: title
							})
						)
					)
				)
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(CP.SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters['t-button'] || {}
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
		    title = attributes.title,
		    url = attributes.url;

		var primaryClass = 'wp-block-catpow-t-button';
		return wp.element.createElement(
			'a',
			{ className: classes, href: url },
			wp.element.createElement(
				'table',
				{ width: '100%' },
				wp.element.createElement(
					'tbody',
					null,
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(RichText.Content, { value: title })
						)
					)
				)
			)
		);
	}
});
