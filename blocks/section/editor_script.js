CP.config.section = {
	devices: ['sp', 'tb'],
	imageKeys: {
		navIcon: { src: "navIcon" },
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
		headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset", sources: "headerBackgroundImageSources" },
		backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" }
	},
	imageSizes: {
		image: 'medium',
		headerImage: 'medium_large'
	}
};

registerBlockType('catpow/section', {
	title: '🐾 Section',
	description: __('見出しと内容のまとまりを表すセクションのブロックです。', 'catpow'),
	icon: 'id-alt',
	category: 'catpow',
	attributes: {
		color: { default: "0" },
		id: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'id' },
		classes: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'class', default: 'wp-block-catpow-section article level3 center catch' },
		navIcon: { source: 'attribute', selector: '.wp-block-catpow-section', attribute: 'data-icon' },

		SectionTag: { type: 'text', default: 'section' },
		HeadingTag: { type: 'text', default: 'h2' },

		prefix: { source: 'children', selector: 'header div.prefix' },
		title: { type: 'array', source: 'children', selector: 'header h2,header .heading', default: ['Title'] },
		lead: { type: 'array', source: 'children', selector: 'header p,header .lead' },

		headerImageMime: { source: 'attribute', selector: 'header .image [src]', attribute: 'data-mime' },
		headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		headerImageSrcset: { source: 'attribute', selector: 'header .image [src]', attribute: 'srcset' },
		headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
		headerImageCode: { source: 'text', selector: 'header .image' },

		headerBackgroundImageMime: { source: 'attribute', selector: 'header .background [src]', attribute: 'data-mime' },
		headerBackgroundImageSrc: { source: 'attribute', selector: 'header .background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		headerBackgroundImageSrcset: { source: 'attribute', selector: 'header .background [src]', attribute: 'srcset' },
		headerBackgroundImageAlt: { source: 'attribute', selector: 'header .background [src]', attribute: 'alt' },
		headerBackgroundImageCode: { source: 'text', selector: 'header .background' },
		headerBackgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.section.devices, 'header .background picture', 'dummy_bg.jpg'),

		imageMime: { source: 'attribute', selector: '.image [src]', attribute: 'data-mime' },
		imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
		imageSrcset: { source: 'attribute', selector: '.image [src]', attribute: 'srcset' },
		imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
		imageCode: { source: 'text', selector: '.image' },

		backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		backgroundImageSrcset: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'srcset' },
		backgroundImageCode: { source: 'text', selector: '.wp-block-catpow-section>.background' },
		backgroundImageSources: CP.getPictureSoucesAttributesForDevices(CP.config.section.devices, '.wp-block-catpow-section>.background picture', 'dummy_bg.jpg'),

		patternImageCss: { source: 'text', selector: 'style.patternImageCss' },
		headerPatternImageCss: { source: 'text', selector: 'style.headerPatternImageCss' },
		frameImageCss: { source: 'text', selector: 'style.frameImageCss' },
		borderImageCss: { source: 'text', selector: 'style.borderImageCss' },

		iconSrc: { source: 'attribute', selector: '.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
		iconAlt: { source: 'attribute', selector: '.icon [src]', attribute: 'alt' }
	},
	example: CP.example,
	edit: function edit(props) {
		var attributes = props.attributes,
		    className = props.className,
		    setAttributes = props.setAttributes;
		var SectionTag = attributes.SectionTag,
		    HeadingTag = attributes.HeadingTag,
		    color = attributes.color,
		    id = attributes.id,
		    classes = attributes.classes,
		    prefix = attributes.prefix,
		    title = attributes.title,
		    lead = attributes.lead,
		    headerImageMime = attributes.headerImageMime,
		    headerImageSrc = attributes.headerImageSrc,
		    headerImageSrcset = attributes.headerImageSrcset,
		    headerImageAlt = attributes.headerImageAlt,
		    headerImageCode = attributes.headerImageCode,
		    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
		    imageMime = attributes.imageMime,
		    imageSrc = attributes.imageSrc,
		    imageSrcset = attributes.imageSrcset,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode,
		    backgroundImageSrc = attributes.backgroundImageSrc,
		    backgroundImageCode = attributes.backgroundImageCode,
		    headerPatternImageCss = attributes.headerPatternImageCss,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss,
		    iconSrc = attributes.iconSrc,
		    iconAlt = attributes.iconAlt;


		var states = CP.wordsToFlags(classes);
		var _CP$config$section = CP.config.section,
		    devices = _CP$config$section.devices,
		    imageKeys = _CP$config$section.imageKeys,
		    imageSizes = _CP$config$section.imageSizes;


		CP.inheritColor(props, ['iconSrc', 'patternImageCss', 'headerPatternImageCss', 'frameImageCss', 'borderImageCss']);
		CP.manageStyleData(props, ['patternImageCss', 'headerPatternImageCss', 'frameImageCss', 'borderImageCss']);

		var selectiveClasses = [{ input: 'buttons', filter: 'sectionTag', key: 'SectionTag', label: __('セクションタグ', 'catpow'), values: ['article', 'section', 'aside', 'div'] }, { input: 'buttons', filter: 'headingTag', key: 'HeadingTag', label: __('見出しタグ', 'catpow'), values: ['h2', 'h3', 'h4'], effect: function effect(val) {
				for (var key in states) {
					if (key.substr(0, 5) === 'level') {
						states[key] = false;
					}
				}
				if (/^h\d$/.test(val)) {
					states['level' + val[1]] = true;
				}
				setAttributes({ classes: CP.flagsToWords(states) });
			} }, {
			label: __('タイプ', 'catpow'),
			filter: 'type',
			type: 'gridbuttons',
			values: ['scene', 'article', 'column'],
			sub: {
				scene: ['color', { label: __('プレフィクス', 'catpow'), values: 'hasPrefix' }, { label: __('ヘッダ画像', 'catpow'), values: 'hasHeaderImage', sub: [{ input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage }] }, { label: __('ヘッダ背景画像', 'catpow'), values: 'hasHeaderBackgroundImage', sub: [{ input: 'picture', label: __('背景画像', 'catpow'), keys: imageKeys.headerBackgroundImage, devices: devices }, { label: __('薄く', 'catpow'), values: 'paleHeaderBG' }] }, { label: __('抜き色文字', 'catpow'), values: 'inverseText', sub: [{ label: __('ヘッダ背景色', 'catpow'), values: 'hasHeaderBackgroundColor', sub: [{ label: __('パターン画像', 'catpow'), values: 'hasHeaderPatternImage', sub: [{ input: 'pattern', css: 'headerPatternImageCss', sel: '#' + id + ' > .contents > .header' }] }] }] }, { label: __('リード', 'catpow'), values: 'hasLead' }, { label: __('背景画像', 'catpow'), values: 'hasBackgroundImage', sub: [{ input: 'picture', label: __('背景画像', 'catpow'), keys: imageKeys.backgroundImage, devices: devices }, { label: __('薄く', 'catpow'), values: 'paleBG' }] }, { label: __('背景色', 'catpow'), values: 'hasBackgroundColor' }, { label: __('メニューアイコン', 'catpow'), values: 'hasNavIcon', sub: [{ input: 'image', label: __('アイコン', 'catpow'), keys: imageKeys.navIcon, size: 'thumbnail' }] }, {
					label: __('テンプレート', 'catpow'),
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: __('ヘッダ画像コード', 'catpow'),
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: __('ヘッダ背景画像コード', 'catpow'),
						key: 'headerBackgroundImageCode',
						cond: states.hasHeaderBackgroundImage
					}, {
						input: 'text',
						label: __('背景画像コード', 'catpow'),
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				article: ['color', { type: 'buttons', label: __('レベル', 'catpow'), values: { level2: '2', level3: '3', level4: '4' } }, { type: 'gridbuttons', label: __('見出しタイプ', 'catpow'), filter: 'heading_type', values: ['header', 'headline', 'catch'] }, { label: __('ヘッダ画像', 'catpow'), values: 'hasHeaderImage', sub: [{
						input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage,
						cond: !states.isTemplate || !headerImageCode
					}] }, { label: __('リード', 'catpow'), values: 'hasLead' }, { label: __('背景画像', 'catpow'), values: 'hasBackgroundImage', sub: [{ input: 'picture', keys: imageKeys.backgroundImage, devices: devices, cond: !states.isTemplate || !backgroundImageCode }, { label: __('薄く', 'catpow'), values: 'paleBG' }] }, { label: __('背景色', 'catpow'), values: 'hasBackgroundColor' }, { label: __('メニューアイコン', 'catpow'), values: 'hasNavIcon', sub: [{ input: 'image', label: __('アイコン', 'catpow'), keys: imageKeys.navIcon, size: 'thumbnail' }] }, { label: __('パターン画像', 'catpow'), values: 'hasPatternImage', sub: [{ input: 'pattern', css: 'patternImageCss', sel: '#' + id, color: color }] }, { label: __('フレーム画像', 'catpow'), values: 'hasFrameImage', sub: [{ input: 'frame', css: 'frameImageCss', sel: '#' + id, color: color }] }, { label: __('ボーダー画像', 'catpow'), values: 'hasBorderImage', sub: [{ input: 'border', css: 'borderImageCss', sel: '#' + id + ' > .contents', color: color }] }, {
					label: __('テンプレート', 'catpow'),
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: __('ヘッダ画像コード', 'catpow'),
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: __('背景画像コード', 'catpow'),
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				column: ['color', 'pattern', { label: __('アイコン', 'catpow'), values: 'hasIcon', sub: [{ input: 'icon', color: color }] }, { label: __('画像', 'catpow'), values: 'hasImage', sub: [{ input: 'image', keys: imageKeys.image }] }, { label: __('背景画像', 'catpow'), values: 'hasBackgroundImage', sub: [{ input: 'picture', keys: imageKeys.backgroundImage, devices: devices, cond: !states.isTemplate || !backgroundImageCode }, { label: __('薄く', 'catpow'), values: 'paleBG' }] }, { label: __('線', 'catpow'), values: { no_border: __('なし', 'catpow'), thin_border: __('細', 'catpow'), bold_border: __('太', 'catpow') } }, { label: __('角丸', 'catpow'), values: 'round' }, { label: __('影', 'catpow'), values: 'shadow', sub: [{ label: __('内側', 'catpow'), values: 'inset' }] }, { label: __('メニューアイコン', 'catpow'), values: 'hasNavIcon', sub: [{ input: 'image', label: __('アイコン', 'catpow'), keys: imageKeys.navIcon, size: 'thumbnail' }] }, { label: __('ボーダー画像', 'catpow'), values: 'hasBorderImage', sub: [{ input: 'border', css: 'borderImageCss', sel: '#' + id + ' > .contents', color: color }] }, {
					label: __('テンプレート', 'catpow'),
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: __('画像コード', 'catpow'),
						key: 'imageCode',
						cond: states.hasImage
					}, {
						input: 'text',
						label: __('背景画像コード', 'catpow'),
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}]
			},
			bind: {
				scene: ['level2'],
				column: ['level3']
			}
		}];

		var level = CP.getNumberClass({ attr: attributes }, 'level');

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })
		), wp.element.createElement(
			SectionTag,
			{ id: id, className: classes },
			states.hasImage && wp.element.createElement(
				'div',
				{ 'class': 'image' },
				states.isTemplate && imageCode ? wp.element.createElement(CP.DummyImage, { text: imageCode }) : wp.element.createElement(CP.SelectResponsiveImage, {
					attr: attributes,
					set: setAttributes,
					keys: imageKeys.image,
					size: imageSizes.image
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(
					'header',
					{ 'class': 'header' },
					wp.element.createElement(
						'div',
						{ 'class': 'title' },
						states.hasIcon && wp.element.createElement(
							'div',
							{ 'class': 'icon' },
							wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							'div',
							{ 'class': 'prefix' },
							wp.element.createElement(RichText, { tagName: 'div', value: prefix, onChange: function onChange(prefix) {
									return setAttributes({ prefix: prefix });
								} })
						),
						states.hasHeaderImage && wp.element.createElement(
							'div',
							{ 'class': 'image' },
							states.isTemplate && headerImageCode ? wp.element.createElement(CP.DummyImage, { text: headerImageCode }) : wp.element.createElement(CP.SelectResponsiveImage, {
								set: setAttributes,
								attr: attributes,
								keys: imageKeys.headerImage,
								size: imageSizes.headerImage
							})
						),
						wp.element.createElement(
							HeadingTag,
							{ className: 'heading' },
							wp.element.createElement(RichText, { tagName: 'div', value: title, onChange: function onChange(title) {
									return setAttributes({ title: title });
								} })
						),
						states.hasLead && wp.element.createElement(
							'p',
							{ className: 'lead' },
							wp.element.createElement(RichText, { tagName: 'div', value: lead, onChange: function onChange(lead) {
									return setAttributes({ lead: lead });
								} })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						'div',
						{ 'class': 'background' },
						states.isTemplate && headerBackgroundImageCode ? wp.element.createElement(CP.DummyImage, { text: headerBackgroundImageCode }) : wp.element.createElement(CP.SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: imageKeys.headerBackgroundImage
						})
					)
				),
				wp.element.createElement(
					'div',
					{ 'class': 'text' },
					wp.element.createElement(InnerBlocks, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				states.isTemplate && backgroundImageCode ? wp.element.createElement(CP.DummyImage, { text: backgroundImageCode }) : wp.element.createElement(CP.SelectResponsiveImage, {
					set: setAttributes,
					attr: attributes,
					keys: imageKeys.backgroundImage
				})
			),
			states.hasPatternImage && wp.element.createElement(
				'style',
				null,
				patternImageCss
			),
			states.hasHeaderPatternImage && wp.element.createElement(
				'style',
				null,
				headerPatternImageCss
			),
			states.hasBorderImage && wp.element.createElement(
				'style',
				null,
				borderImageCss
			),
			states.hasFrameImage && wp.element.createElement(
				'style',
				null,
				frameImageCss
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(CP.SelectClassPanel, {
				title: __('クラス', 'catpow'),
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.section || {}
			}),
			wp.element.createElement(
				PanelBody,
				{ title: 'ID', icon: 'admin-links', initialOpen: false },
				wp.element.createElement(TextControl, {
					label: 'ID',
					onChange: function onChange(id) {
						setAttributes({ id: id });
					},
					value: id
				})
			),
			wp.element.createElement(
				PanelBody,
				{ title: 'CLASS', icon: 'admin-generic', initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: __('クラス', 'catpow'),
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
		var SectionTag = attributes.SectionTag,
		    HeadingTag = attributes.HeadingTag,
		    id = attributes.id,
		    navIcon = attributes.navIcon,
		    classes = attributes.classes,
		    prefix = attributes.prefix,
		    title = attributes.title,
		    lead = attributes.lead,
		    headerImageSrc = attributes.headerImageSrc,
		    headerImageSrcset = attributes.headerImageSrcset,
		    headerImageAlt = attributes.headerImageAlt,
		    headerImageCode = attributes.headerImageCode,
		    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
		    imageSrc = attributes.imageSrc,
		    imageSrcset = attributes.imageSrcset,
		    imageAlt = attributes.imageAlt,
		    imageCode = attributes.imageCode,
		    backgroundImageSrc = attributes.backgroundImageSrc,
		    backgroundImageCode = attributes.backgroundImageCode,
		    headerPatternImageCss = attributes.headerPatternImageCss,
		    patternImageCss = attributes.patternImageCss,
		    frameImageCss = attributes.frameImageCss,
		    borderImageCss = attributes.borderImageCss,
		    iconSrc = attributes.iconSrc,
		    iconAlt = attributes.iconAlt;


		var level = CP.getNumberClass({ attr: attributes }, 'level');

		var states = CP.wordsToFlags(classes);
		var _CP$config$section2 = CP.config.section,
		    devices = _CP$config$section2.devices,
		    imageKeys = _CP$config$section2.imageKeys,
		    imageSizes = _CP$config$section2.imageSizes;


		return wp.element.createElement(
			SectionTag,
			{ id: id, className: classes, 'data-icon': navIcon },
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
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(
					'header',
					{ 'class': 'header' },
					wp.element.createElement(
						'div',
						{ 'class': 'title' },
						states.hasIcon && wp.element.createElement(
							'div',
							{ 'class': 'icon' },
							wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							'div',
							{ 'class': 'prefix' },
							wp.element.createElement(RichText.Content, { value: prefix })
						),
						states.hasHeaderImage && wp.element.createElement(
							'div',
							{ 'class': 'image' },
							states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(CP.ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerImage
							})
						),
						wp.element.createElement(
							HeadingTag,
							{ className: 'heading' },
							wp.element.createElement(RichText.Content, { value: title })
						),
						states.hasLead && wp.element.createElement(
							'p',
							{ className: 'lead' },
							wp.element.createElement(RichText.Content, { value: lead })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						'div',
						{ 'class': 'background' },
						states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.headerBackgroundImage,
							devices: devices
						})
					)
				),
				wp.element.createElement(
					'div',
					{ 'class': 'text' },
					wp.element.createElement(InnerBlocks.Content, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				'div',
				{ 'class': 'background' },
				states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.backgroundImage,
					devices: devices
				})
			),
			states.hasPatternImage && wp.element.createElement(
				'style',
				{ className: 'patternImageCss' },
				patternImageCss
			),
			states.hasHeaderPatternImage && wp.element.createElement(
				'style',
				{ className: 'headerPatternImageCss' },
				headerPatternImageCss
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
	},

	deprecated: [{
		attributes: {
			id: { source: 'attribute', selector: 'section', attribute: 'id' },
			classes: { source: 'attribute', selector: 'section', attribute: 'class', default: 'wp-block-catpow-section article level3 center catch' },
			navIcon: { source: 'attribute', selector: 'section', attribute: 'data-icon' },

			prefix: { source: 'children', selector: 'header div.prefix' },
			title: { type: 'array', source: 'children', selector: 'header h2,header .heading', default: ['Title'] },
			read: { type: 'array', source: 'children', selector: 'header p' },

			headerImageMime: { source: 'attribute', selector: 'header .image [src]', attribute: 'data-mime' },
			headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
			headerImageSrcset: { source: 'attribute', selector: 'header .image [src]', attribute: 'srcset' },
			headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
			headerImageCode: { source: 'text', selector: 'header .image' },

			headerBackgroundImageMime: { source: 'attribute', selector: 'header .background [src]', attribute: 'data-mime' },
			headerBackgroundImageSrc: { source: 'attribute', selector: 'header .background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
			headerBackgroundImageSrcset: { source: 'attribute', selector: 'header .background [src]', attribute: 'srcset' },
			headerBackgroundImageAlt: { source: 'attribute', selector: 'header .background [src]', attribute: 'alt' },
			headerBackgroundImageCode: { source: 'text', selector: 'header .background' },

			imageMime: { source: 'attribute', selector: '.image [src]', attribute: 'data-mime' },
			imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src', default: cp.theme_url + '/images/dummy.jpg' },
			imageSrcset: { source: 'attribute', selector: '.image [src]', attribute: 'srcset' },
			imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
			imageCode: { source: 'text', selector: '.image' },

			backgroundImageSrc: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
			backgroundImageSrcset: { source: 'attribute', selector: '.wp-block-catpow-section>.background [src]', attribute: 'srcset' },
			backgroundImageCode: { source: 'text', selector: '.wp-block-catpow-section>.background' },

			iconSrc: { source: 'attribute', selector: '.icon [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_icon.svg' },
			iconAlt: { source: 'attribute', selector: '.icon [src]', attribute: 'alt' }
		},
		save: function save(_ref2) {
			var attributes = _ref2.attributes,
			    className = _ref2.className;
			var id = attributes.id,
			    navIcon = attributes.navIcon,
			    classes = attributes.classes,
			    prefix = attributes.prefix,
			    title = attributes.title,
			    read = attributes.read,
			    headerImageSrc = attributes.headerImageSrc,
			    headerImageSrcset = attributes.headerImageSrcset,
			    headerImageAlt = attributes.headerImageAlt,
			    headerImageCode = attributes.headerImageCode,
			    headerBackgroundImageCode = attributes.headerBackgroundImageCode,
			    imageSrc = attributes.imageSrc,
			    imageSrcset = attributes.imageSrcset,
			    imageAlt = attributes.imageAlt,
			    imageCode = attributes.imageCode,
			    backgroundImageSrc = attributes.backgroundImageSrc,
			    backgroundImageCode = attributes.backgroundImageCode,
			    iconSrc = attributes.iconSrc,
			    iconAlt = attributes.iconAlt;


			var states = CP.wordsToFlags(classes);
			var level = CP.getNumberClass({ attr: attributes }, 'level');

			var imageKeys = {
				navIcon: { src: "icon" },
				image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
				headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
				headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset" },
				backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset" }
			};

			return wp.element.createElement(
				'section',
				{ id: id, className: classes, 'data-icon': navIcon },
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
					'div',
					{ 'class': 'contents' },
					wp.element.createElement(
						'header',
						null,
						wp.element.createElement(
							'div',
							{ 'class': 'title' },
							states.hasIcon && wp.element.createElement(
								'div',
								{ 'class': 'icon' },
								wp.element.createElement('img', { src: iconSrc, alt: iconAlt })
							),
							states.hasPrefix && wp.element.createElement(
								'div',
								{ 'class': 'prefix' },
								wp.element.createElement(RichText.Content, { value: prefix })
							),
							states.hasHeaderImage && wp.element.createElement(
								'div',
								{ 'class': 'image' },
								states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(CP.ResponsiveImage, {
									attr: attributes,
									keys: imageKeys.headerImage
								})
							),
							wp.element.createElement(
								'h2',
								null,
								title
							),
							states.hasRead && wp.element.createElement(
								'p',
								null,
								wp.element.createElement(RichText.Content, { value: read })
							)
						),
						states.hasHeaderBackgroundImage && wp.element.createElement(
							'div',
							{ 'class': 'background' },
							states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerBackgroundImage
							})
						)
					),
					wp.element.createElement(
						'div',
						{ 'class': 'text' },
						wp.element.createElement(InnerBlocks.Content, null)
					)
				),
				states.hasBackgroundImage && wp.element.createElement(
					'div',
					{ 'class': 'background' },
					states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(CP.ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.backgroundImage
					})
				)
			);
		},
		migrate: function migrate(attributes) {
			attributes.classes += ' level2';
			return attributes;
		}
	}]
});
