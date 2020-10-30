CP.config.section = {
	imageKeys: {
		navIcon: { src: "navIcon" },
		image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
		headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
		headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset" },
		backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset" }
	},
	imageSizes: {
		image: 'medium',
		headerImage: 'medium_large'
	}
};

registerBlockType('catpow/section', {
	title: '🐾 Section',
	description: '見出しと内容のまとまりを表すセクションのブロックです。',
	icon: 'id-alt',
	category: 'catpow',
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
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var id = attributes.id,
		    classes = attributes.classes,
		    prefix = attributes.prefix,
		    title = attributes.title,
		    read = attributes.read,
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
		    iconSrc = attributes.iconSrc,
		    iconAlt = attributes.iconAlt;


		var states = CP.wordsToFlags(classes);
		var _CP$config$section = CP.config.section,
		    imageKeys = _CP$config$section.imageKeys,
		    imageSizes = _CP$config$section.imageSizes;


		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			values: ['scene', 'article', 'column'],
			sub: {
				scene: ['color', 'pattern', { label: 'プレフィクス', values: 'hasPrefix' }, { label: 'ヘッダ画像', values: 'hasHeaderImage', sub: [{ input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage }] }, { label: 'ヘッダ背景画像', values: 'hasHeaderBackgroundImage', sub: [{ input: 'image', label: 'PC版背景画像', keys: imageKeys.headerBackgroundImage }, { input: 'image', label: 'SP版背景画像', keys: imageKeys.headerBackgroundImage, ofSP: true, sizes: '480px' }, { label: '薄く', values: 'paleHeaderBG' }] }, { label: '抜き色文字', values: 'inverseText', sub: [{ label: 'ヘッダ背景色', values: 'hasHeaderBackgroundColor' }] }, { label: 'リード', values: 'hasRead' }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'image', label: 'PC版背景画像', keys: imageKeys.backgroundImage }, { input: 'image', label: 'SP版背景画像', keys: imageKeys.backgroundImage, ofSP: true, sizes: '480px' }, { label: '薄く', values: 'paleBG' }] }, { label: '背景色', values: 'hasBackgroundColor' }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: 'ヘッダ画像コード',
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: 'ヘッダ背景画像コード',
						key: 'headerBackgroundImageCode',
						cond: states.hasHeaderBackgroundImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				article: ['color', { label: 'レベル', values: { level2: '2', level3: '3', level4: '4' } }, { label: '見出しタイプ', filter: 'heading_type', values: { header: 'ヘッダ', headline: 'ヘッドライン', catch: 'キャッチ' } }, { label: 'ヘッダ画像', values: 'hasHeaderImage', sub: [{
						input: 'image', keys: imageKeys.headerImage, size: imageSizes.headerImage,
						cond: !states.isTemplate || !headerImageCode
					}] }, { label: 'リード', values: 'hasRead' }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{
						input: 'image', label: 'PC版背景画像', keys: imageKeys.backgroundImage,
						cond: !states.isTemplate || !backgroundImageCode
					}, {
						input: 'image', label: 'SP版背景画像', keys: imageKeys.backgroundImage,
						ofSP: true, sizes: '480px',
						cond: !states.isTemplate || !backgroundImageCode
					}, { label: '薄く', values: 'paleBG' }] }, { label: '背景色', values: 'hasBackgroundColor' }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: 'ヘッダ画像コード',
						key: 'headerImageCode',
						cond: states.hasHeaderImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}],
				column: ['color', 'pattern', { label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon' }] }, { label: '画像', values: 'hasImage', sub: [{ input: 'image', keys: imageKeys.image }] }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ input: 'image', label: 'PC版背景画像', keys: imageKeys.backgroundImage }, { input: 'image', label: 'SP版背景画像', keys: imageKeys.backgroundImage, ofSP: true, sizes: '480px' }, { label: '薄く', values: 'paleBG' }] }, { label: '線', values: { no_border: 'なし', thin_border: '細', bold_border: '太' } }, { label: '角丸', values: 'round' }, { label: '影', values: 'shadow', sub: [{ label: '内側', values: 'inset' }] }, { label: 'メニューアイコン', values: 'hasNavIcon', sub: [{ input: 'image', label: 'アイコン', keys: imageKeys.navIcon, size: 'thumbnail' }] }, {
					label: 'テンプレート',
					values: 'isTemplate',
					sub: [{
						input: 'text',
						label: '画像コード',
						key: 'imageCode',
						cond: states.hasImage
					}, {
						input: 'text',
						label: '背景画像コード',
						key: 'backgroundImageCode',
						cond: states.hasBackgroundImage
					}]
				}]
			},
			bind: {
				scene: ['level1'],
				column: ['level3']
			}
		}];

		var level = CP.getNumberClass({ attr: attributes }, 'level');

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(AlignClassToolbar, { set: setAttributes, attr: attributes })
		), wp.element.createElement(
			"section",
			{ id: id, className: classes },
			states.hasImage && wp.element.createElement(
				"div",
				{ "class": "image" },
				states.isTemplate && imageCode ? wp.element.createElement(DummyImage, { text: imageCode }) : wp.element.createElement(SelectResponsiveImage, {
					attr: attributes,
					set: setAttributes,
					keys: imageKeys.image,
					size: imageSizes.image
				})
			),
			wp.element.createElement(
				"div",
				{ "class": "contents" },
				wp.element.createElement(
					"header",
					null,
					wp.element.createElement(
						"div",
						{ "class": "title" },
						states.hasIcon && wp.element.createElement(
							"div",
							{ "class": "icon" },
							wp.element.createElement("img", { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							"div",
							{ "class": "prefix" },
							wp.element.createElement(RichText, { tagName: "div", value: prefix, onChange: function onChange(prefix) {
									return setAttributes({ prefix: prefix });
								} })
						),
						states.hasHeaderImage && wp.element.createElement(
							"div",
							{ "class": "image" },
							states.isTemplate && headerImageCode ? wp.element.createElement(DummyImage, { text: headerImageCode }) : wp.element.createElement(SelectResponsiveImage, {
								set: setAttributes,
								attr: attributes,
								keys: imageKeys.headerImage,
								size: imageSizes.headerImage
							})
						),
						el('h' + level, { className: 'heading' }, wp.element.createElement(RichText, { tagName: "div", value: title, onChange: function onChange(title) {
								return setAttributes({ title: title });
							} })),
						states.hasRead && wp.element.createElement(
							"p",
							null,
							wp.element.createElement(RichText, { tagName: "div", value: read, onChange: function onChange(read) {
									return setAttributes({ read: read });
								} })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						"div",
						{ "class": "background" },
						states.isTemplate && headerBackgroundImageCode ? wp.element.createElement(DummyImage, { text: headerBackgroundImageCode }) : wp.element.createElement(SelectResponsiveImage, {
							set: setAttributes,
							attr: attributes,
							keys: imageKeys.headerBackgroundImage
						})
					)
				),
				wp.element.createElement(
					"div",
					{ "class": "text" },
					wp.element.createElement(InnerBlocks, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				"div",
				{ "class": "background" },
				states.isTemplate && backgroundImageCode ? wp.element.createElement(DummyImage, { text: backgroundImageCode }) : wp.element.createElement(SelectResponsiveImage, {
					set: setAttributes,
					attr: attributes,
					keys: imageKeys.backgroundImage
				})
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: "\u30AF\u30E9\u30B9",
				icon: "art",
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.section || {}
			}),
			wp.element.createElement(
				PanelBody,
				{ title: "ID", icon: "admin-links", initialOpen: false },
				wp.element.createElement(TextControl, {
					label: "ID",
					onChange: function onChange(id) {
						setAttributes({ id: id });
					},
					value: id
				})
			),
			wp.element.createElement(
				PanelBody,
				{ title: "CLASS", icon: "admin-generic", initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: "\u30AF\u30E9\u30B9",
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


		var level = CP.getNumberClass({ attr: attributes }, 'level');

		var states = CP.wordsToFlags(classes);
		var _CP$config$section2 = CP.config.section,
		    imageKeys = _CP$config$section2.imageKeys,
		    imageSizes = _CP$config$section2.imageSizes;


		return wp.element.createElement(
			"section",
			{ id: id, className: classes, "data-icon": navIcon },
			states.hasImage && wp.element.createElement(
				"div",
				{ "class": "image" },
				states.isTemplate && imageCode ? imageCode : wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.image,
					size: "medium_large"
				})
			),
			wp.element.createElement(
				"div",
				{ "class": "contents" },
				wp.element.createElement(
					"header",
					null,
					wp.element.createElement(
						"div",
						{ "class": "title" },
						states.hasIcon && wp.element.createElement(
							"div",
							{ "class": "icon" },
							wp.element.createElement("img", { src: iconSrc, alt: iconAlt })
						),
						states.hasPrefix && wp.element.createElement(
							"div",
							{ "class": "prefix" },
							wp.element.createElement(RichText.Content, { value: prefix })
						),
						states.hasHeaderImage && wp.element.createElement(
							"div",
							{ "class": "image" },
							states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerImage
							})
						),
						el('h' + level, { className: 'heading' }, title),
						states.hasRead && wp.element.createElement(
							"p",
							null,
							wp.element.createElement(RichText.Content, { value: read })
						)
					),
					states.hasHeaderBackgroundImage && wp.element.createElement(
						"div",
						{ "class": "background" },
						states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.headerBackgroundImage
						})
					)
				),
				wp.element.createElement(
					"div",
					{ "class": "text" },
					wp.element.createElement(InnerBlocks.Content, null)
				)
			),
			states.hasBackgroundImage && wp.element.createElement(
				"div",
				{ "class": "background" },
				states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.backgroundImage
				})
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
		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
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
				"section",
				{ id: id, className: classes, "data-icon": navIcon },
				states.hasImage && wp.element.createElement(
					"div",
					{ "class": "image" },
					states.isTemplate && imageCode ? imageCode : wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						size: "medium_large"
					})
				),
				wp.element.createElement(
					"div",
					{ "class": "contents" },
					wp.element.createElement(
						"header",
						null,
						wp.element.createElement(
							"div",
							{ "class": "title" },
							states.hasIcon && wp.element.createElement(
								"div",
								{ "class": "icon" },
								wp.element.createElement("img", { src: iconSrc, alt: iconAlt })
							),
							states.hasPrefix && wp.element.createElement(
								"div",
								{ "class": "prefix" },
								wp.element.createElement(RichText.Content, { value: prefix })
							),
							states.hasHeaderImage && wp.element.createElement(
								"div",
								{ "class": "image" },
								states.isTemplate && headerImageCode ? headerImageCode : wp.element.createElement(ResponsiveImage, {
									attr: attributes,
									keys: imageKeys.headerImage
								})
							),
							wp.element.createElement(
								"h2",
								null,
								title
							),
							states.hasRead && wp.element.createElement(
								"p",
								null,
								wp.element.createElement(RichText.Content, { value: read })
							)
						),
						states.hasHeaderBackgroundImage && wp.element.createElement(
							"div",
							{ "class": "background" },
							states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerBackgroundImage
							})
						)
					),
					wp.element.createElement(
						"div",
						{ "class": "text" },
						wp.element.createElement(InnerBlocks.Content, null)
					)
				),
				states.hasBackgroundImage && wp.element.createElement(
					"div",
					{ "class": "background" },
					states.isTemplate && backgroundImageCode ? backgroundImageCode : wp.element.createElement(ResponsiveImage, {
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
