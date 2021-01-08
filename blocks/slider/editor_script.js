CP.config.slider = {
	devices: ['sp', 'tb'],
	imageKeys: {
		image: { src: "src", alt: "alt", code: 'imageCode', items: "items" },
		slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: 'slideCode', sources: 'slideSources', items: "items" },
		backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: 'backgroundImageCode', sources: 'backgroundImageSources', items: "items" }
	},
	imageSizes: {
		image: 'vga'
	}
};

registerBlockType('catpow/slider', {
	title: '🐾 Slider',
	description: 'スライダーのブロックです。',
	icon: 'video-alt3',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-slider story hasTitle hasText hasImage';
				if (!attributes.controlClasses) {
					attributes.controlClasses = 'controls loop autoplay flickable';
				}
				if (!attributes.config) {
					attributes.config = '{}';
				}
				return createBlock('catpow/slider', attributes);
			}
		}]
	},

	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes;
		var _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes,
		    _attributes$controlCl = attributes.controlClasses,
		    controlClasses = _attributes$controlCl === undefined ? '' : _attributes$controlCl,
		    config = attributes.config,
		    items = attributes.items,
		    doLoop = attributes.doLoop,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode,
		    _attributes$AltMode = attributes.AltMode,
		    AltMode = _attributes$AltMode === undefined ? false : _attributes$AltMode,
		    device = attributes.device;


		var states = CP.wordsToFlags(classes);
		var _CP$config$slider = CP.config.slider,
		    devices = _CP$config$slider.devices,
		    imageKeys = _CP$config$slider.imageKeys,
		    imageSizes = _CP$config$slider.imageSizes;


		var statesClasses = [{ label: 'アロー', values: 'hasArrows' }, { label: 'ドット', values: 'hasDots' }, { input: 'range', label: '表示スライド', json: 'config', key: 'initialSlide', min: 0, max: items.length - 1 }];
		var animateClasses = [{ label: 'ループ', values: 'loop', sub: [{ label: 'アイテムを反復', values: 'loopItems' }] }, { label: '自動再生', values: 'autoplay', sub: [{ input: 'range', label: '自動再生間隔（単位:0.1秒）', json: 'config', key: 'interval', coef: 100, min: 0, max: 100 }, { input: 'range', label: '操作停止時間（単位:0.1秒）', json: 'config', key: 'wait', coef: 100, min: 0, max: 100 }, { label: 'ホバーで停止', values: 'stopbyhover' }] }];
		var controllerClasses = [{ label: 'フリック操作', values: 'flickable' }, { label: 'スクロール操作', values: 'scrollable' }, { label: '閉じる操作', values: 'closable' }];

		var selectiveClasses = [{
			label: 'タイプ', values: ['visual', 'story', 'articles', 'index'],
			filter: 'type',
			sub: {
				visual: [{ label: '見出し', values: 'hasTitle', sub: [{ label: 'サブタイトル', values: 'hasSubTitle' }, { label: 'テキスト', values: 'hasText' }, { label: '白文字', values: 'brightText', sub: [{ label: '色付き背景', values: 'colorBG' }] }] }, { label: 'スライド画像', values: 'hasSlide' }, { label: 'イメージ画像', values: 'hasImage', sub: [{ label: 'サムネール', values: 'hasThumbnail' }] }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ label: '背景画像を薄く', values: 'paleBG' }] }, { label: 'リンク', values: 'hasLink' }],
				story: [{ label: 'サブタイトル', values: 'hasSubTitle' }, { label: '白文字', values: 'brightText', sub: [{ label: '色付き背景', values: 'colorBG' }] }, { label: '画像', values: 'hasImage', sub: [{ label: 'サムネール', values: 'hasThumbnail' }] }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ label: '背景画像を薄く', values: 'paleBG' }] }, { label: 'リンク', values: 'hasLink' }],
				articles: [{ label: 'タイトル', values: 'hasTitle' }, { label: 'テキスト', values: 'hasText' }, { label: '画像', values: 'hasImage' }, { label: 'リンク', values: 'hasLink' }],
				index: [{ label: 'サブタイトル', values: 'hasSubTitle' }, { label: '画像', values: 'hasImage' }, { label: 'リンク', values: 'hasLink' }]
			},
			bind: {
				story: ['hasTitle', 'hasText'],
				index: ['hasTitle', 'hasText']
			},
			item: {
				visual: ['color', 'pattern', { input: 'picture', label: 'スライド画像', keys: imageKeys.slide, devices: devices, cond: states.hasSlide }, { input: 'picture', label: '背景画像', keys: imageKeys.backgroundImage, devices: devices, cond: states.hasBackgroundImage }],
				story: ['color', 'pattern', { input: 'picture', label: '背景画像', keys: imageKeys.backgroundImage, devices: devices, cond: states.hasBackgroundImage }]
			}
		}, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ input: 'bool', label: 'ループ', key: 'doLoop', sub: [{ label: 'content path', input: 'text', key: 'content_path' }, { label: 'query', input: 'textarea', key: 'query' }, { label: 'プレビューループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];

		var save = function save() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var rtn = [];
		var thumbs = [];
		var dots = [];

		var configData = JSON.parse(config);
		if (configData.initialSlide === undefined) {
			configData.initialSlide = 0;
		}
		var gotoItem = function gotoItem(i) {
			configData.initialSlide = (i + items.length) % items.length;
			setAttributes({ currentItemIndex: configData.initialSlide, config: JSON.stringify(configData) });
		};
		var prevItem = function prevItem() {
			gotoItem(configData.initialSlide - 1);
		};
		var nextItem = function nextItem() {
			gotoItem(configData.initialSlide + 1);
		};

		var pushItem = function pushItem(item, index) {
			var posClass, itemClass, imageIndex;
			imageIndex = (index - configData.initialSlide + items.length) % items.length;
			if (imageIndex == 0) {
				posClass = 'active';
			} else if (imageIndex < Math.floor(items.length / 2)) {
				posClass = 'after';
			} else {
				posClass = 'before';
				imageIndex -= items.length;
			}
			itemClass = posClass + ' image' + imageIndex + ' thumb' + imageIndex;
			rtn.push(wp.element.createElement(
				Item,
				{
					tag: 'li',
					className: itemClass,
					set: setAttributes,
					attr: attributes,
					items: items,
					index: index
				},
				states.hasSlide && wp.element.createElement(
					'div',
					{ className: 'slide' },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.slide,
						devices: devices,
						device: device,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				(states.hasTitle || states.hasSubTitle || states.hasText) && wp.element.createElement(
					'div',
					{ 'class': 'text' },
					states.hasTitle && wp.element.createElement(
						'h3',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(title) {
								item.title = title;save();
							},
							value: item.title
						})
					),
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(subTitle) {
								item.subTitle = subTitle;save();
							},
							value: item.subTitle
						})
					),
					states.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(text) {
								item.text = text;save();
							},
							value: item.text
						})
					)
				),
				states.hasBackgroundImage && wp.element.createElement(
					'div',
					{ className: 'background' },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.backgroundImage,
						devices: devices,
						device: device,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				states.hasLink && wp.element.createElement(
					'div',
					{ className: 'link' },
					wp.element.createElement(TextControl, {
						onChange: function onChange(linkUrl) {
							item.linkUrl = linkUrl;save();
						},
						value: item.linkUrl,
						placeholder: 'URL\u3092\u5165\u529B'
					})
				)
			));
			if (states.hasImage && states.hasThumbnail) {
				thumbs.push(wp.element.createElement(
					'li',
					{ 'class': 'item ' + posClass + ' thumb' + imageIndex, onClick: function onClick() {
							return gotoItem(index);
						} },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						isTemplate: states.isTemplate
					})
				));
			}
			if (states.hasDots) {
				dots.push(wp.element.createElement('li', { 'class': 'dot ' + posClass + ' dot' + imageIndex, onClick: function onClick() {
						return gotoItem(index);
					} }));
			}
		};

		var l = items.length;
		for (var i = 0; i < l; i++) {
			pushItem(items[i % l], i % l);
		}

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(SelectModeToolbar, {
				set: setAttributes,
				attr: attributes
			}),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(SelectClassPanel, {
					title: '\u30AF\u30E9\u30B9',
					icon: 'art',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.slider || {}
				}),
				wp.element.createElement(SelectClassPanel, {
					title: '\u8868\u793A\u8A2D\u5B9A',
					icon: 'admin-appearance',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: statesClasses,
					filters: CP.filters.slider || {}
				}),
				wp.element.createElement(SelectClassPanel, {
					key: 'controlClasses',
					title: '\u30A2\u30CB\u30E1\u30FC\u30B7\u30E7\u30F3\u8A2D\u5B9A',
					icon: 'video-alt3',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: animateClasses,
					filters: CP.filters.slider || {}
				}),
				wp.element.createElement(SelectClassPanel, {
					key: 'controlClasses',
					title: '\u64CD\u4F5C\u8A2D\u5B9A',
					icon: 'universal-access',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: controllerClasses,
					filters: CP.filters.slider || {}
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
				),
				wp.element.createElement(SelectClassPanel, {
					title: '\u30B9\u30E9\u30A4\u30C9',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					triggerClasses: selectiveClasses[0],
					filters: CP.filters.slider || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			attributes.EditMode ? wp.element.createElement(
				'div',
				{ className: 'alt_content' },
				wp.element.createElement(
					'div',
					{ 'class': 'label' },
					wp.element.createElement(Icon, { icon: 'edit' })
				),
				wp.element.createElement(EditItemsTable, {
					set: setAttributes,
					attr: attributes,
					columns: [{ type: 'picture', label: 'slide', keys: imageKeys.slide, devices: devices, cond: states.hasSlide }, { type: 'text', key: 'slideCode', cond: states.isTemplate && states.hasSlide }, { type: 'image', label: 'image', keys: imageKeys.image, cond: states.hasImage }, { type: 'text', key: 'imageCode', cond: states.isTemplate && states.hasImage }, { type: 'picture', label: 'bg', keys: imageKeys.backgroundImage, devices: devices, cond: states.hasBackgroundImage }, { type: 'text', key: 'backgroundImageCode', cond: states.isTemplate && states.hasBackgroundImage }, { type: 'text', key: 'title', cond: states.hasTitle }, { type: 'text', key: 'subTitle', cond: states.hasSubTitle }, { type: 'text', key: 'text', cond: states.hasText }, { type: 'text', key: 'linkUrl', cond: states.hasLink }],
					isTemplate: states.isTemplate
				})
			) : wp.element.createElement(
				Fragment,
				null,
				AltMode && doLoop ? wp.element.createElement(
					'div',
					{ className: 'alt_content' },
					wp.element.createElement(
						'div',
						{ 'class': 'label' },
						wp.element.createElement(Icon, { icon: 'welcome-comments' })
					),
					wp.element.createElement(InnerBlocks, null)
				) : wp.element.createElement(
					'div',
					{ className: classes },
					wp.element.createElement(
						'ul',
						{ 'class': 'contents' },
						rtn
					),
					wp.element.createElement(
						'div',
						{ className: controlClasses, 'data-config': config },
						states.hasArrows && wp.element.createElement(
							'div',
							{ 'class': 'arrow prev', onClick: prevItem },
							' '
						),
						states.hasImage && states.hasThumbnail && wp.element.createElement(
							'ul',
							{ 'class': 'thumbnail' },
							thumbs
						),
						states.hasDots && wp.element.createElement(
							'ul',
							{ 'class': 'dots' },
							dots
						),
						states.hasArrows && wp.element.createElement(
							'div',
							{ 'class': 'arrow next', onClick: nextItem },
							' '
						)
					)
				)
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var _attributes$classes2 = attributes.classes,
		    classes = _attributes$classes2 === undefined ? '' : _attributes$classes2,
		    _attributes$controlCl2 = attributes.controlClasses,
		    controlClasses = _attributes$controlCl2 === undefined ? '' : _attributes$controlCl2,
		    config = attributes.config,
		    _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items,
		    doLoop = attributes.doLoop;


		var states = CP.wordsToFlags(classes);
		var _CP$config$slider2 = CP.config.slider,
		    devices = _CP$config$slider2.devices,
		    imageKeys = _CP$config$slider2.imageKeys,
		    imageSizes = _CP$config$slider2.imageSizes;


		var rtn = [];
		var thumbs = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				states.hasSlide && wp.element.createElement(
					'div',
					{ className: 'slide' },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.slide,
						devices: devices,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				(states.hasTitle || states.hasSubTitle || states.hasText) && wp.element.createElement(
					'div',
					{ 'class': 'text' },
					states.hasTitle && wp.element.createElement(
						'h3',
						null,
						wp.element.createElement(RichText.Content, { value: item.title })
					),
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText.Content, { value: item.subTitle })
					),
					states.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText.Content, { value: item.text })
					)
				),
				states.hasBackgroundImage && wp.element.createElement(
					'div',
					{ className: 'background' },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.backgroundImage,
						devices: devices,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				states.hasLink && wp.element.createElement(
					'div',
					{ className: 'link' },
					wp.element.createElement(
						'a',
						{ href: item.linkUrl },
						' '
					)
				)
			));
			if (states.hasImage && states.hasThumbnail) {
				thumbs.push(wp.element.createElement(
					'li',
					{ 'class': item.classes },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						index: index,
						isTemplate: states.isTemplate
					})
				));
			}
		});

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'ul',
					{ 'class': 'contents' },
					rtn
				),
				wp.element.createElement(
					'div',
					{ className: controlClasses, 'data-config': config },
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow prev' },
						' '
					),
					states.hasImage && states.hasThumbnail && wp.element.createElement(
						'ul',
						{ 'class': 'thumbnail' },
						thumbs
					),
					states.hasDots && wp.element.createElement(
						'ul',
						{ 'class': 'dots' },
						wp.element.createElement(
							'li',
							{ 'class': 'dot' },
							' '
						)
					),
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow next' },
						' '
					)
				)
			),
			doLoop && wp.element.createElement(
				'onEmpty',
				null,
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	},

	deprecated: [{
		attributes: {
			classes: { source: 'attribute', selector: 'div', attribute: 'class', default: 'hasTitle hasText hasImage' },
			controlClasses: { source: 'attribute', selector: 'div.controls', attribute: 'class', default: 'controls loop autoplay flickable' },
			config: {
				source: 'attribute',
				selector: 'div.controls',
				attribute: 'data-config',
				default: '{}'
			},
			items: {
				source: 'query',
				selector: 'li.item',
				query: {
					title: { source: 'children', selector: '.text h3' },
					subTitle: { source: 'children', selector: '.text h4' },
					src: { source: 'attribute', selector: '.image [src]', attribute: 'src' },
					alt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
					text: { source: 'children', selector: '.text p' },
					url: { source: 'attribute', selector: 'a', attribute: 'href' },
					bg: { source: 'attribute', attribute: 'style' }
				},
				default: [{
					title: ['Title'],
					subTitle: ['SubTitle'],
					src: cp.theme_url + '/images/dummy.jpg',
					alt: 'dummy',
					text: ['Text'],
					url: 'https://',
					bg: "background-image:url('" + cp.theme_url + "/images/dummy.jpg')"
				}]
			}
		},

		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
			var _attributes$classes3 = attributes.classes,
			    classes = _attributes$classes3 === undefined ? '' : _attributes$classes3,
			    _attributes$controlCl3 = attributes.controlClasses,
			    controlClasses = _attributes$controlCl3 === undefined ? '' : _attributes$controlCl3,
			    config = attributes.config,
			    _attributes$items2 = attributes.items,
			    items = _attributes$items2 === undefined ? [] : _attributes$items2;

			var classArray = _.uniq(classes.split(' '));
			var controlClassArray = _.uniq(controlClasses.split(' '));
			var states = {
				hasArrows: false,
				hasDots: false,
				hasThumbnail: false,

				hasTitle: false,
				hasSubTitle: false,
				hasText: false,
				hasImage: false,
				hasBackgroundImage: false
			};
			var controlStates = {
				loop: false,
				autoplay: false,
				flickable: false,
				scrollable: false,
				stopbyhover: false,
				closable: false
			};
			var hasClass = function hasClass(cls) {
				return classArray.indexOf(cls) !== -1;
			};
			Object.keys(states).forEach(function (key) {
				this[key] = hasClass(key);
			}, states);
			var hasControlClass = function hasControlClass(cls) {
				return controlClassArray.indexOf(cls) !== -1;
			};
			Object.keys(controlStates).forEach(function (key) {
				this[key] = hasClass(key);
			}, controlStates);

			var rtn = [];
			var thumbs = [];
			items.map(function (item, index) {
				if (states.hasBackgroundImage) {
					if (typeof item.bg === 'string') {
						item.bg = { backgroundImage: item.bg.substr('background-image:'.length) };
					}
				} else {
					item.bg = {};
				}
				rtn.push(wp.element.createElement(
					'li',
					{ 'class': 'item', style: item.bg },
					states.hasImage && wp.element.createElement(
						'div',
						{ className: 'image' },
						wp.element.createElement('img', { src: item.src, alt: item.alt })
					),
					wp.element.createElement(
						'div',
						{ 'class': 'text' },
						states.hasTitle && wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						states.hasSubTitle && wp.element.createElement(
							'h4',
							null,
							wp.element.createElement(RichText.Content, { value: item.subTitle })
						),
						states.hasText && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText.Content, { value: item.text })
						)
					)
				));
				if (states.hasThumbnail) {
					thumbs.push(wp.element.createElement(
						'li',
						{ 'class': 'item', style: item.bg },
						wp.element.createElement('img', { src: item.src, alt: item.alt })
					));
				}
			});

			return wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'ul',
					{ 'class': 'contents' },
					rtn
				),
				wp.element.createElement(
					'div',
					{ className: controlClasses, 'data-config': config },
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow prev' },
						' '
					),
					states.hasThumbnail && wp.element.createElement(
						'ul',
						{ 'class': 'thumbnail' },
						thumbs
					),
					states.hasDots && wp.element.createElement(
						'ul',
						{ 'class': 'dots' },
						wp.element.createElement(
							'li',
							{ 'class': 'dot' },
							' '
						)
					),
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow next' },
						' '
					)
				)
			);
		}
	}, {
		save: function save(_ref4) {
			var attributes = _ref4.attributes,
			    className = _ref4.className;
			var _attributes$classes4 = attributes.classes,
			    classes = _attributes$classes4 === undefined ? '' : _attributes$classes4,
			    _attributes$controlCl4 = attributes.controlClasses,
			    controlClasses = _attributes$controlCl4 === undefined ? '' : _attributes$controlCl4,
			    config = attributes.config,
			    _attributes$items3 = attributes.items,
			    items = _attributes$items3 === undefined ? [] : _attributes$items3;

			var classArray = _.uniq(classes.split(' '));
			var controlClassArray = _.uniq(controlClasses.split(' '));

			var states = CP.wordsToFlags(classes);

			var imageKeys = {
				image: { src: "src", alt: "alt", code: 'imageCode', items: "items" },
				slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: 'slideCode', items: "items" },
				backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: 'backgroundImageCode', items: "items" }
			};

			var rtn = [];
			var thumbs = [];
			items.map(function (item, index) {
				rtn.push(wp.element.createElement(
					'li',
					{ className: item.classes },
					states.hasSlide && wp.element.createElement(
						'div',
						{ className: 'slide' },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.slide,
							index: index,
							isTemplate: states.isTemplate
						})
					),
					states.hasImage && wp.element.createElement(
						'div',
						{ className: 'image' },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.image,
							index: index,
							isTemplate: states.isTemplate
						})
					),
					(states.hasTitle || states.hasSubTitle || states.hasText) && wp.element.createElement(
						'div',
						{ 'class': 'text' },
						states.hasTitle && wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						states.hasSubTitle && wp.element.createElement(
							'h4',
							null,
							wp.element.createElement(RichText.Content, { value: item.subTitle })
						),
						states.hasText && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText.Content, { value: item.text })
						)
					),
					states.hasBackgroundImage && wp.element.createElement(
						'div',
						{ className: 'background' },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.backgroundImage,
							index: index,
							isTemplate: states.isTemplate
						})
					),
					states.hasLink && wp.element.createElement(
						'div',
						{ className: 'link' },
						wp.element.createElement(
							'a',
							{ href: item.linkUrl },
							' '
						)
					)
				));
				if (states.hasImage && states.hasThumbnail) {
					thumbs.push(wp.element.createElement(
						'li',
						{ 'class': item.classes },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.image,
							index: index,
							isTemplate: states.isTemplate
						})
					));
				}
			});

			return wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'ul',
					{ 'class': 'contents' },
					states.doLoop && '[loop_template ' + (loopParam || '') + ']',
					rtn,
					states.doLoop && '[/loop_template]'
				),
				wp.element.createElement(
					'div',
					{ className: controlClasses, 'data-config': config },
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow prev' },
						' '
					),
					states.hasImage && states.hasThumbnail && wp.element.createElement(
						'ul',
						{ 'class': 'thumbnail' },
						thumbs
					),
					states.hasDots && wp.element.createElement(
						'ul',
						{ 'class': 'dots' },
						wp.element.createElement(
							'li',
							{ 'class': 'dot' },
							' '
						)
					),
					states.hasArrows && wp.element.createElement(
						'div',
						{ 'class': 'arrow next' },
						' '
					)
				)
			);
		},
		migrate: function migrate(attributes) {
			var states = CP.wordsToFlags(classes);
			attributes.content_path = attributes.loopParam.split(' ')[0];
			attributes.query = attributes.loopParam.split(' ').slice(1).join("\n");
			attributes.doLoop = states.doLoop;
			return attributes;
		}
	}]
});
