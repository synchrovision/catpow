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
		color: { default: "0" },
		id: { source: 'attribute', selector: '.wp-block-catpow-div', attribute: 'id' },
		classes: { source: 'attribute', selector: 'div', attribute: 'class', default: 'wp-block-catpow-div frame thinBorder' },

		iconImageSrc: { source: 'attribute', selector: '.wp-block-catpow-div>.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
		iconImageAlt: { source: 'attribute', selector: '.wp-block-catpow-div>.icon [src]', attribute: 'alt' },

		backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-div>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		backgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.div.devices, '.wp-block-catpow-div>.background picture', 'dummy_bg.jpg'),

		patternImageCss: { source: 'text', selector: 'style.patternImageCss' },
		frameImageCss: { source: 'text', selector: 'style.frameImageCss' },
		borderImageCss: { source: 'text', selector: 'style.borderImageCss' }
	},
	providesContext: { 'catpow/color': 'color' },
	usesContext: ['catpow/color'],
	example: CP.example,
	edit: function edit(props) {
		var attributes = props.attributes,
		    className = props.className,
		    setAttributes = props.setAttributes,
		    context = props.context;
		var id = attributes.id,
		    classes = attributes.classes,
		    color = attributes.color,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss;


		var states = CP.wordsToFlags(classes);
		var _CP$config$div = CP.config.div,
		    devices = _CP$config$div.devices,
		    imageKeys = _CP$config$div.imageKeys;


		CP.inheritColor(props, ['iconImageSrc', 'patternImageCss', 'frameImageCss', 'borderImageCss']);
		CP.manageStyleData(props, ['patternImageCss', 'frameImageCss', 'borderImageCss']);

		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			type: 'buttons',
			values: ['block', 'frame', 'columns'],
			sub: {
				frame: [{ label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon', label: 'アイコン', keys: imageKeys.iconImage, color: color }] }, { type: 'buttons', label: '線', values: { noBorder: 'なし', thinBorder: '細', boldBorder: '太' } }, { label: '角丸', values: 'round' }, { label: '影', values: 'shadow', sub: [{ label: '内側', values: 'inset' }] }],
				columns: [{ label: '幅', values: { narrow: '狭い', regular: '普通', wide: '広い' } }]
			}
		}, 'color', { type: 'buttons', label: '背景', values: { noBackground: 'なし', hasBackgroundColor: '色', hasBackgroundImage: '画像', hasPatternImage: 'パターン' }, sub: {
				hasBackgroundColor: [{ label: 'パターン', values: 'hasPattern', sub: ['pattern'] }],
				hasBackgroundImage: [{ input: 'picture', label: '背景画像', keys: imageKeys.backgroundImage, devices: devices }],
				hasPatternImage: [{ input: 'pattern', css: 'patternImageCss', sel: '#' + id, color: color }]
			} }, { type: 'buttons', label: 'ボーダー画像', values: { noBorder: 'なし', hasFrameImage: 'フレーム', hasBorderImage: 'ボーダー' }, sub: {
				hasFrameImage: [{ input: 'frame', css: 'frameImageCss', sel: '#' + id, color: color }],
				hasBorderImage: [{ input: 'border', css: 'borderImageCss', sel: '#' + id, color: color }]
			} }, { type: 'buttons', label: '余白', 'values': { noPad: 'なし', thinPad: '極細', lightPad: '細', mediumPad: '中', boldPad: '太', heavyPad: '極太' } }];

		return [wp.element.createElement(
			'div',
			{ id: id, className: classes },
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
			wp.element.createElement(InnerBlocks, { template: [['core/paragraph', { content: CP.dummyText.text }]], templateLock: false }),
			states.hasPatternImage && wp.element.createElement(
				'style',
				{ className: 'patternImageCss' },
				patternImageCss
			),
			states.hasBorderImage && wp.element.createElement(
				'style',
				{ className: 'borderImageCss' },
				borderImageCss
			),
			states.hasFrameImage && wp.element.createElement(
				'style',
				{ className: 'frameImageCss' },
				frameImageCss
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
	save: function save(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var id = attributes.id,
		    _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes,
		    color = attributes.color,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss;


		var states = CP.wordsToFlags(classes);
		var _CP$config$div2 = CP.config.div,
		    devices = _CP$config$div2.devices,
		    imageKeys = _CP$config$div2.imageKeys;


		return wp.element.createElement(
			'div',
			{ id: id, className: classes },
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
			wp.element.createElement(InnerBlocks.Content, null),
			states.hasPatternImage && wp.element.createElement(
				'style',
				{ className: 'patternImageCss' },
				patternImageCss
			),
			states.hasBorderImage && wp.element.createElement(
				'style',
				{ className: 'borderImageCss' },
				borderImageCss
			),
			states.hasFrameImage && wp.element.createElement(
				'style',
				{ className: 'frameImageCss' },
				frameImageCss
			)
		);
	}
});
