CP.config.unit = {
	devices: ['sp', 'tb'],
	imageKeys: {
		image: { sources: 'sources', src: "src", alt: "alt", code: "code" }
	}
};
registerBlockType('catpow/unit', {
	title: '🐾 Unit',
	description: '画像とテキストを並べてレイアウトするためのブロックです。',
	icon: 'align-pull-left',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: ['core/group'],
			transform: function transform(attributes, innerBlocks) {
				return createBlock('catpow/unit', { classes: 'wp-block-catpow-unit' }, innerBlocks);
			}
		}]
	},
	attributes: {
		classes: { source: 'attribute', selector: '.wp-block-catpow-unit', attribute: 'class', default: 'wp-block-catpow-unit' },

		sources: CP.getPictureSoucesAttributesForDevices(CP.config.unit.devices),

		mime: { source: 'attribute', selector: '[src]', attribute: 'data-mime' },
		src: { source: 'attribute', selector: '[src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		alt: { source: 'attribute', selector: '[src]', attribute: 'alt' },
		code: { source: 'text' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes;


		var states = CP.wordsToFlags(classes);
		var _CP$config$unit = CP.config.unit,
		    devices = _CP$config$unit.devices,
		    imageKeys = _CP$config$unit.imageKeys;


		var selectiveClasses = ['color', {
			label: 'タイプ',
			filter: 'type',
			values: ['default', 'snap', 'panel'],
			sub: {
				frame: [{ label: '色', values: 'hasColor', sub: ['color'] }],
				columns: [{ label: '幅', values: { narrow: '狭い', regular: '普通', wide: '広い' } }]
			}
		}, { input: 'picture', label: '画像', keys: imageKeys.image, devices: devices, isTemplate: states.isTemplate }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{
				input: 'text',
				label: '画像コード',
				key: 'code',
				cond: true
			}]
		}];

		return [wp.element.createElement(
			'div',
			{ className: classes },
			wp.element.createElement(
				'figure',
				{ 'class': 'image' },
				wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.image
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(InnerBlocks, { template: [['core/paragraph', { content: CP.dummyText.text }]], templateLock: false })
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
				filters: CP.filters.unit || {}
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
		var _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes;


		var states = CP.wordsToFlags(classes);
		var _CP$config$unit2 = CP.config.unit,
		    devices = _CP$config$unit2.devices,
		    imageKeys = _CP$config$unit2.imageKeys;


		return wp.element.createElement(
			'div',
			{ className: classes },
			wp.element.createElement(
				'figure',
				{ 'class': 'image' },
				wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.image
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
