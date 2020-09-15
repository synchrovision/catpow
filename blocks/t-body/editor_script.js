registerBlockType('catpow/t-body', {
	title: '🐾 T-Body',
	description: 'HTMLメールのベースとなるヘッダ・フッタのブロックです。',
	icon: 'editor-code',
	category: 'catpow-mail',
	attributes: {
		classes: { source: 'attribute', selector: 'table', attribute: 'class', default: 'wp-block-catpow-t-body hasHeader hasFooter' },
		headerText: { source: 'children', selector: 'thead th', default: ['Title'] },
		footerText: { source: 'children', selector: 'tfoot td', default: ['caption'] },
		body_class: { type: 'string', default: 'white' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes,
		    headerText = attributes.headerText,
		    footerText = attributes.footerText,
		    body_class = attributes.body_class;

		var primaryClass = 'wp-block-catpow-t-body';
		var states = CP.wordsToFlags(classes);

		var selectiveClasses = ['color', { label: 'ヘッダ', values: 'hasHeader' }, { label: 'フッタ', values: 'hasFooter' }, { label: '背景色', values: ['white', 'gray', 'black'], key: 'body_class' }];

		return [wp.element.createElement(
			'div',
			{ className: "mail_body " + body_class },
			wp.element.createElement(
				'table',
				{ width: '100%', align: 'center', valign: 'top', className: classes },
				states.hasHeader && wp.element.createElement(
					'thead',
					null,
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'th',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(headerText) {
									setAttributes({ headerText: headerText });
								},
								value: headerText
							})
						)
					)
				),
				wp.element.createElement(
					'tbody',
					null,
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(
								'center',
								null,
								wp.element.createElement(InnerBlocks, null)
							)
						)
					)
				),
				states.hasFooter && wp.element.createElement(
					'tfoot',
					null,
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(footerText) {
									setAttributes({ footerText: footerText });
								},
								value: footerText
							})
						)
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
				filters: CP.filters['t-body'] || {}
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
		    headerText = attributes.headerText,
		    footerText = attributes.footerText;

		var primaryClass = 'wp-block-catpow-t-body';
		var states = CP.wordsToFlags(classes);
		return wp.element.createElement(
			'table',
			{ width: '100%', align: 'center', valign: 'top', className: classes },
			states.hasHeader && wp.element.createElement(
				'thead',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						wp.element.createElement(RichText.Content, { value: headerText })
					)
				)
			),
			wp.element.createElement(
				'tbody',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'td',
						null,
						wp.element.createElement(
							'center',
							null,
							wp.element.createElement(InnerBlocks.Content, null)
						)
					)
				)
			),
			states.hasFooter && wp.element.createElement(
				'tfoot',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'td',
						null,
						wp.element.createElement(RichText.Content, { value: footerText })
					)
				)
			)
		);
	}
});
