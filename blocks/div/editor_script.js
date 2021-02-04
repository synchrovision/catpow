CP.config.div = {
	devices: ['sp', 'tb'],
	imageKeys: {
		iconImage: { src: "iconImageSrc", alt: "iconImageAlt" },
		backgroundImage: { src: "backgroundImageSrc", sources: "backgroundImageSources" }
	}
};
registerBlockType('catpow/div', {
	title: '🐾 Div',
	description: 'コンテンツを枠で囲んだりレイアウト調整をするためのコンテナです。',
	icon: 'editor-code',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: ['core/group'],
			transform: function transform(attributes, innerBlocks) {
				return createBlock('catpow/div', { classes: 'wp-block-catpow-div frame thinBorder' }, innerBlocks);
			}
		}]
	},
	attributes: {
		classes: { source: 'attribute', selector: 'div', attribute: 'class', default: 'wp-block-catpow-div frame thinBorder' },

		iconImageSrc: { source: 'attribute', selector: '.wp-block-catpow-div>.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
		iconImageAlt: { source: 'attribute', selector: '.wp-block-catpow-div>.icon [src]', attribute: 'alt' },

		backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-div>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		backgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.div.devices, '.wp-block-catpow-div>.background picture', 'dummy_bg.jpg')
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var classes = attributes.classes;


		var states = CP.wordsToFlags(classes);
		var _CP$config$div = CP.config.div,
		    devices = _CP$config$div.devices,
		    imageKeys = _CP$config$div.imageKeys;


		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			values: ['block', 'frame', 'columns'],
			sub: {
				frame: [{ label: '色', values: 'hasColor', sub: ['color'] }, { label: 'パターン', values: 'hasPattern', sub: ['pattern'] }, { label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon', label: 'アイコン', keys: imageKeys.iconImage }] }, { label: '線', values: { noBorder: 'なし', thinBorder: '細', boldBorder: '太' } }, { label: '角丸', values: 'round' }, { label: '影', values: 'shadow', sub: [{ label: '内側', values: 'inset' }] }],
				columns: [{ label: '幅', values: { narrow: '狭い', regular: '普通', wide: '広い' } }]
			}
		}, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'picture', label: '背景画像', keys: imageKeys.backgroundImage, devices: devices }] }, { label: '余白', 'values': { noPad: 'なし', thinPad: '極細', lightPad: '細', mediumPad: '中', boldPad: '太', heavyPad: '極太' } }];

		return [wp.element.createElement(
			'div',
			{ className: classes },
			states.hasIcon && wp.element.createElement(
				'div',
				{ 'class': 'icon' },
				wp.element.createElement(SelectResponsiveImage, {
					set: setAttributes,
					attr: attributes,
					keys: imageKeys.iconImage,
					size: 'middle'
				})
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				wp.element.createElement(ResponsiveImage, {
					set: setAttributes,
					attr: attributes,
					keys: imageKeys.backgroundImage,
					devices: devices
				})
			),
			wp.element.createElement(InnerBlocks, { template: [['core/paragraph', { content: CP.dummyText.text }]], templateLock: false })
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.div || {}
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
		var _CP$config$div2 = CP.config.div,
		    devices = _CP$config$div2.devices,
		    imageKeys = _CP$config$div2.imageKeys;


		return wp.element.createElement(
			'div',
			{ className: classes },
			states.hasIcon && wp.element.createElement(
				'div',
				{ 'class': 'icon' },
				wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.iconImage
				})
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.backgroundImage,
					devices: devices
				})
			),
			wp.element.createElement(InnerBlocks.Content, null)
		);
	}
});
