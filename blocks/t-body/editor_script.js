registerBlockType('catpow/t-body', {
	title: '🐾 T-Body',
	description: 'HTMLメールのベースとなるヘッダ・フッタのブロックです。',
	icon: 'editor-code',
	category: 'catpow-mail',
	supports: {
		multiple: false
	},
	attributes: {
		type: { type: 'string', source: 'meta', meta: 'type', default: 'html' },
		isHtmlMail: { type: 'boolean', default: false },
		classes: { source: 'attribute', selector: 'table', attribute: 'class', default: 'wp-block-catpow-t-body hasHeader hasFooter' },
		headerText: { source: 'children', selector: 'thead th', default: ['Title'] },
		footerText: { source: 'children', selector: 'tfoot td', default: ['caption'] },
		body_class: { type: 'string', default: 'white' },
		textMail: { source: 'text', selector: 'textmail' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var type = attributes.type,
		    isHtmlMail = attributes.isHtmlMail,
		    classes = attributes.classes,
		    headerText = attributes.headerText,
		    footerText = attributes.footerText,
		    body_class = attributes.body_class,
		    textMail = attributes.textMail,
		    _attributes$TextMode = attributes.TextMode,
		    TextMode = _attributes$TextMode === undefined ? false : _attributes$TextMode;

		var primaryClass = 'wp-block-catpow-t-body';
		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{ input: 'buttons', label: 'メールタイプ', key: 'type', values: ['plain', 'html'], sub: {
				html: [{ input: 'bool', label: 'テキストメール編集モード', key: 'TextMode' }, 'color', { label: 'ヘッダ', values: 'hasHeader' }, { label: 'フッタ', values: 'hasFooter' }, { type: 'buttons', label: '背景色', values: ['white', 'gray', 'black'], key: 'body_class' }]
			}, effect: function effect(val) {
				setAttributes({ isHtmlMail: val === 'html' });
			} }];

		return wp.element.createElement(
			Fragment,
			null,
			!isHtmlMail || TextMode ? wp.element.createElement(TextareaControl, {
				value: textMail,
				onChange: function onChange(textMail) {
					return setAttributes({ textMail: textMail });
				},
				rows: 20
			}) : wp.element.createElement(
				'div',
				{ className: "mail_body " + body_class },
				wp.element.createElement(
					'table',
					{ width: '100%', align: 'center', valign: 'top', className: classes },
					states.hasHeader && wp.element.createElement(
						'thead',
						{ className: 'wp-block-catpow-t-body__header' },
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
						{ className: 'wp-block-catpow-t-body__body' },
						wp.element.createElement(
							'tr',
							null,
							wp.element.createElement(
								'td',
								null,
								wp.element.createElement(
									'div',
									{ className: 'wp-block-catpow-t-body__body__contents' },
									wp.element.createElement(InnerBlocks, null)
								)
							)
						)
					),
					states.hasFooter && wp.element.createElement(
						'tfoot',
						{ className: 'wp-block-catpow-t-body__footer' },
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
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					BlockControls,
					null,
					wp.element.createElement(Toolbar, {
						controls: [{
							icon: 'media-text',
							label: 'テキストメール',
							isActive: TextMode,
							onClick: function onClick() {
								return setAttributes({ TextMode: !TextMode });
							}
						}]
					})
				),
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
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;
		var type = attributes.type,
		    isHtmlMail = attributes.isHtmlMail,
		    classes = attributes.classes,
		    headerText = attributes.headerText,
		    textMail = attributes.textMail,
		    footerText = attributes.footerText;

		var primaryClass = 'wp-block-catpow-t-body';
		var states = CP.wordsToFlags(classes);
		return wp.element.createElement(
			Fragment,
			null,
			(!isHtmlMail || textMail) && wp.element.createElement(
				'textmail',
				null,
				textMail
			),
			isHtmlMail && wp.element.createElement(
				'table',
				{ width: '100%', align: 'center', className: classes },
				states.hasHeader && wp.element.createElement(
					'thead',
					{ className: 'wp-block-catpow-t-body__header' },
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
					{ className: 'wp-block-catpow-t-body__body' },
					wp.element.createElement(
						'tr',
						null,
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(
								'div',
								{ className: 'wp-block-catpow-t-body__body__contents' },
								wp.element.createElement(InnerBlocks.Content, null)
							)
						)
					)
				),
				states.hasFooter && wp.element.createElement(
					'tfoot',
					{ className: 'wp-block-catpow-t-body__footer' },
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
			)
		);
	}
});
