CP.config.accordion = {
	devices: ['sp', 'tb'],
	imageKeys: {
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt" }
	},
	imageSizes: {
		image: 'thumbnail'
	}
};

registerBlockType('catpow/accordion', {
	title: '🐾 Accordion',
	description: 'クリックで折り畳みできるブロックです。',
	icon: 'insert',
	category: 'catpow',
	attributes: {
		classes: { source: 'attribute', selector: '.wp-block-catpow-accordion', attribute: 'class', default: 'wp-block-catpow-accordion' },

		title: { type: 'array', source: 'children', selector: '.title', default: ['Title'] },

		imageMime: { source: 'attribute', selector: '.image [src]', attribute: 'data-mime' },
		imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
		imageCode: { source: 'text', selector: '.image' }

	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var useState = wp.element.useState;
		var classes = attributes.classes,
		    title = attributes.title,
		    imageMime = attributes.imageMime,
		    imageSrc = attributes.imageSrc,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode;


		var states = CP.wordsToFlags(classes);
		var _CP$config$accordion = CP.config.accordion,
		    devices = _CP$config$accordion.devices,
		    imageKeys = _CP$config$accordion.imageKeys,
		    imageSizes = _CP$config$accordion.imageSizes;


		var selectiveClasses = ['color', { label: '画像', values: 'hasImage', sub: [{ input: 'image', keys: imageKeys.image, size: imageSizes.image }] }, { label: '他を閉じる', values: 'exclusive' }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{
				input: 'text',
				label: '画像コード',
				key: 'imageCode',
				cond: states.hasImage
			}]
		}];

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'div',
					{ className: 'header' },
					states.hasImage && wp.element.createElement(
						'div',
						{ className: 'image' },
						states.isTemplate && imageCode ? wp.element.createElement(CP.DummyImage, { text: imageCode }) : wp.element.createElement(CP.SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: imageKeys.image,
							size: imageSizes.image
						})
					),
					wp.element.createElement(
						'h3',
						{ className: 'title' },
						wp.element.createElement(RichText, { tagName: 'div', value: title, onChange: function onChange(title) {
								return setAttributes({ title: title });
							} })
					),
					wp.element.createElement('span', { className: 'icon' })
				),
				wp.element.createElement(
					'div',
					{ className: 'container' },
					wp.element.createElement(
						'div',
						{ className: 'contents' },
						wp.element.createElement(InnerBlocks, null)
					)
				)
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(CP.SelectClassPanel, {
					title: '\u30AF\u30E9\u30B9',
					icon: 'art',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.accordion || {}
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
		var classes = attributes.classes,
		    title = attributes.title,
		    imageMime = attributes.imageMime,
		    imageSrc = attributes.imageSrc,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode;

		var states = CP.wordsToFlags(classes);
		var _CP$config$accordion2 = CP.config.accordion,
		    devices = _CP$config$accordion2.devices,
		    imageKeys = _CP$config$accordion2.imageKeys,
		    imageSizes = _CP$config$accordion2.imageSizes;


		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'div',
					{ className: 'header' },
					states.hasImage && wp.element.createElement(
						'div',
						{ 'class': 'image' },
						states.isTemplate && imageCode ? imageCode : wp.element.createElement(CP.ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.image,
							size: 'medium_large'
						})
					),
					wp.element.createElement(
						'h3',
						{ className: 'title' },
						wp.element.createElement(RichText.Content, { value: title })
					),
					wp.element.createElement('span', { className: 'icon' })
				),
				wp.element.createElement(
					'div',
					{ className: 'container' },
					wp.element.createElement(
						'div',
						{ className: 'contents' },
						wp.element.createElement(InnerBlocks.Content, null)
					)
				)
			)
		);
	}
});
