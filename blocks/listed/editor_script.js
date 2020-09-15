registerBlockType('catpow/listed', {
	title: '🐾 Listed',
	description: '目次やお知らせなどの一覧ブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText';
				return createBlock('catpow/listed', attributes);
			}
		}]
	},
	attributes: {
		version: { type: 'number', default: 0 },
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText' },
		items: {
			source: 'query',
			selector: 'li.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				title: { source: 'children', selector: 'header .text h3' },
				titleCaption: { source: 'children', selector: 'header .text p' },

				headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src' },
				headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
				headerImageCode: { source: 'text', selector: 'header .image' },

				subImageSrc: { source: 'attribute', selector: '.contents .image [src]', attribute: 'src' },
				subImageAlt: { source: 'attribute', selector: '.contents .image [src]', attribute: 'alt' },
				subImageCode: { source: 'text', selector: '.contents .image' },

				src: { source: 'attribute', selector: 'li>.image [src]', attribute: 'src' },
				alt: { source: 'attribute', selector: 'li>.image [src]', attribute: 'alt' },
				imageCode: { source: 'text', selector: 'li>.image' },

				subTitle: { source: 'children', selector: '.contents h4' },
				text: { source: 'children', selector: '.contents p' },
				linkUrl: { source: 'attribute', selector: '.link a', attribute: 'href' },

				backgroundImageSrc: { source: 'attribute', selector: '.background [src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
				backgroundImageSrcset: { source: 'attribute', selector: '.background [src]', attribute: 'srcset' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
				return {
					classes: 'item',
					title: ['Title'],
					titleCaption: ['Caption'],
					headerImageSrc: cp.theme_url + '/images/dummy.jpg',
					headerImageAlt: 'dummy',
					subTitle: ['SubTitle'],
					src: cp.theme_url + '/images/dummy.jpg',
					alt: 'dummy',
					text: ['Text'],
					linkUrl: cp.home_url
				};
			})
		},
		countPrefix: { source: 'text', selector: '.counter .prefix', default: '' },
		countSuffix: { source: 'text', selector: '.counter .suffix', default: '' },
		subCountPrefix: { source: 'text', selector: '.subcounter .prefix', default: '' },
		subCountSuffix: { source: 'text', selector: '.subcounter .suffix', default: '' },
		loopParam: { type: 'text', default: '' },
		loopCount: { type: 'number', default: 1 }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var items = attributes.items,
		    classes = attributes.classes,
		    countPrefix = attributes.countPrefix,
		    countSuffix = attributes.countSuffix,
		    subCountPrefix = attributes.subCountPrefix,
		    subCountSuffix = attributes.subCountSuffix,
		    loopCount = attributes.loopCount;

		var primaryClass = 'wp-block-catpow-listed';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			values: {
				orderd: '連番リスト',
				news: 'お知らせ',
				index: '目次',
				menu: 'メニュー'
			},
			sub: {
				orderd: [{ label: '画像', values: 'hasImage' }, { input: 'text', label: '番号前置テキスト', key: 'countPrefix' }, { input: 'text', label: '番号後置テキスト', key: 'countSuffix' }, { label: 'タイトルキャプション', values: 'hasTitleCaption' }, { label: 'サブタイトル', values: 'hasSubTitle' }, { label: 'リンク', values: 'hasLink' }],
				news: [{ label: 'リンク', values: 'hasLink' }],
				index: [{ label: 'レベル', 'values': ['level0', 'level1', 'level2', 'level3'] }],
				menu: [{ label: 'サイズ', values: ['small', 'medium', 'large'] }, { label: '画像', values: { noImage: 'なし', hasImage: '大', hasHeaderImage: '小' } }, { label: '背景画像', values: 'hasBackgroundImage', sub: [{ label: '薄く', values: 'paleBG' }] }, { label: '背景色', values: 'hasBackgroundColor' }, { label: '抜き色文字', values: 'inverseText' }, { label: 'タイトルキャプション', values: 'hasTitleCaption' }, { label: 'テキスト', values: 'hasText' }, { label: 'リンク', values: 'hasLink' }]
			},
			bind: {
				orderd: ['hasHeader', 'hasCounter', 'hasTitle', 'hasText'],
				news: ['hasText', 'hasSubTitle'],
				index: ['hasHeader', 'hasTitle', 'hasText'],
				menu: ['hasHeader', 'hasTitle']
			},
			item: {
				news: [],
				index: [],
				menu: ['color'],
				sphere: ['color']
			}
		}, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ label: 'ループ', values: 'doLoop', sub: [{ label: 'パラメータ', input: 'text', key: 'loopParam' }, { label: 'ループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];
		var itemTemplateSelectiveClasses = [{
			input: 'text',
			label: '画像コード',
			key: 'imageCode',
			cond: states.hasImage
		}, {
			input: 'text',
			label: 'ヘッダ画像コード',
			key: 'headerImageCode',
			cond: states.hasHeaderImage
		}, {
			input: 'text',
			label: 'サブ画像コード',
			key: 'subImageCode',
			cond: states.hasSubImage
		}];

		var itemsCopy = items.map(function (obj) {
			return jQuery.extend(true, {}, obj);
		});

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", items: "items" },
			subImage: { src: "subImageSrc", alt: "subImageAlt", items: "items" },
			backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", items: "items" }
		};

		itemsCopy.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			rtn.push(wp.element.createElement(
				Item,
				{
					tag: 'li',
					set: setAttributes,
					attr: attributes,
					items: itemsCopy,
					index: index,
					isSelected: isSelected
				},
				states.hasImage && wp.element.createElement(
					'div',
					{ 'class': 'image' },
					states.isTemplate && item.imageCode ? wp.element.createElement(DummyImage, { text: item.imageCode }) : wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						size: 'vga'
					})
				),
				states.hasHeader && wp.element.createElement(
					'header',
					null,
					states.hasCounter && wp.element.createElement(
						'div',
						{ className: 'counter' },
						countPrefix && wp.element.createElement(
							'span',
							{ 'class': 'prefix' },
							countPrefix
						),
						wp.element.createElement(
							'span',
							{ className: 'number' },
							index + 1
						),
						countSuffix && wp.element.createElement(
							'span',
							{ 'class': 'suffix' },
							countSuffix
						)
					),
					states.hasHeaderImage && wp.element.createElement(
						'div',
						{ 'class': 'image' },
						states.isTemplate && item.headerImageCode ? wp.element.createElement(DummyImage, { text: item.headerImageCode }) : wp.element.createElement(SelectResponsiveImage, {
							attr: attributes,
							set: setAttributes,
							keys: imageKeys.headerImage,
							index: index,
							size: 'thumbnail'
						})
					),
					wp.element.createElement(
						'div',
						{ className: 'text' },
						states.hasTitle && wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									itemsCopy[index].title = text;setAttributes({ items: itemsCopy });
								},
								value: item.title
							})
						),
						states.hasTitle && states.hasTitleCaption && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									itemsCopy[index].titleCaption = text;setAttributes({ items: itemsCopy });
								},
								value: item.titleCaption
							})
						)
					)
				),
				(states.hasSubImage || states.hasSubTitle || states.hasText) && wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					states.hasSubCounter && wp.element.createElement(
						'div',
						{ className: 'subcounter' },
						subCountPrefix && wp.element.createElement(
							'span',
							{ 'class': 'prefix' },
							subCountPrefix
						),
						wp.element.createElement(
							'span',
							{ className: 'number' },
							index + 1
						),
						subCountSuffix && wp.element.createElement(
							'span',
							{ 'class': 'suffix' },
							subCountSuffix
						)
					),
					states.hasSubImage && wp.element.createElement(
						'div',
						{ 'class': 'image' },
						states.isTemplate && item.subImageCode ? wp.element.createElement(DummyImage, { text: item.subImageCode }) : wp.element.createElement(SelectResponsiveImage, {
							attr: attributes,
							set: setAttributes,
							keys: imageKeys.subImage,
							index: index,
							size: 'medium'
						})
					),
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(subTitle) {
								itemsCopy[index].subTitle = subTitle;setAttributes({ items: itemsCopy });
							},
							value: item.subTitle,
							placeholder: 'SubTitle'
						})
					),
					states.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(text) {
								itemsCopy[index].text = text;setAttributes({ items: itemsCopy });
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
						index: index
					})
				),
				states.hasLink && isSelected && wp.element.createElement(
					'div',
					{ className: 'link' },
					wp.element.createElement(
						'p',
						{
							contentEditable: true,
							onBlur: function onBlur(e) {
								itemsCopy[index].linkUrl = e.currentTarget.innerHTML;
								setAttributes({ items: itemsCopy });
							}
						},
						item.linkUrl
					)
				)
			));
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}
		if (rtn.length < loopCount) {
			var len = rtn.length;
			while (rtn.length < loopCount) {
				rtn.push(rtn[rtn.length % len]);
			}
		}

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(Toolbar, {
				controls: [{
					icon: 'edit',
					title: 'EditMode',
					isActive: attributes.EditMode,
					onClick: function onClick() {
						return setAttributes({ EditMode: !attributes.EditMode });
					}
				}]
			})
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.listed || {}
			}),
			wp.element.createElement(
				PanelBody,
				{ title: 'CLASS', icon: 'admin-generic', initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: '\u30AF\u30E9\u30B9',
					onChange: function onChange(clss) {
						return setAttributes({ classes: clss });
					},
					value: classArray.join(' ')
				})
			),
			wp.element.createElement(SelectItemClassPanel, {
				title: '\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: itemsCopy,
				index: attributes.currentItemIndex,
				triggerClasses: selectiveClasses[0],
				filters: CP.filters.listed || {}
			}),
			states.isTemplate && wp.element.createElement(SelectItemClassPanel, {
				title: '\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: itemsCopy,
				index: attributes.currentItemIndex,
				itemClasses: itemTemplateSelectiveClasses,
				filters: CP.filters.listed || {}
			}),
			wp.element.createElement(ItemControlInfoPanel, null)
		), wp.element.createElement(
			'ul',
			{ className: attributes.EditMode ? primaryClass + ' edit' : classes },
			rtn
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var items = attributes.items,
		    classes = attributes.classes,
		    countPrefix = attributes.countPrefix,
		    countSuffix = attributes.countSuffix,
		    subCountPrefix = attributes.subCountPrefix,
		    subCountSuffix = attributes.subCountSuffix,
		    linkUrl = attributes.linkUrl,
		    linkText = attributes.linkText,
		    loopParam = attributes.loopParam;

		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		var rtn = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					states.isTemplate && item.imageCode ? item.imageCode : wp.element.createElement('img', { src: item.src, alt: item.alt })
				),
				states.hasHeader && wp.element.createElement(
					'header',
					null,
					states.hasCounter && wp.element.createElement(
						'div',
						{ className: 'counter' },
						countPrefix && wp.element.createElement(
							'span',
							{ 'class': 'prefix' },
							countPrefix
						),
						wp.element.createElement(
							'span',
							{ className: 'number' },
							index + 1
						),
						countSuffix && wp.element.createElement(
							'span',
							{ 'class': 'suffix' },
							countSuffix
						)
					),
					states.hasHeaderImage && wp.element.createElement(
						'div',
						{ className: 'image' },
						states.isTemplate && item.headerImageCode ? item.headerImageCode : wp.element.createElement('img', { src: item.headerImageSrc, alt: item.headerImageAlt })
					),
					wp.element.createElement(
						'div',
						{ className: 'text' },
						states.hasTitle && wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						states.hasTitle && states.hasTitleCaption && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText.Content, { value: item.titleCaption })
						)
					)
				),
				(states.hasSubImage || states.hasSubTitle || states.hasText) && wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					states.hasSubCounter && wp.element.createElement(
						'div',
						{ className: 'subcounter' },
						subCountPrefix && wp.element.createElement(
							'span',
							{ 'class': 'prefix' },
							subCountPrefix
						),
						wp.element.createElement(
							'span',
							{ className: 'number' },
							index + 1
						),
						subCountSuffix && wp.element.createElement(
							'span',
							{ 'class': 'suffix' },
							subCountSuffix
						)
					),
					states.hasSubImage && wp.element.createElement(
						'div',
						{ className: 'image' },
						states.isTemplate && item.subImageCode ? item.subImageCode : wp.element.createElement('img', { src: item.subImageSrc, alt: item.subImageAlt })
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
					wp.element.createElement('img', { src: item.backgroundImageSrc, srcset: item.backgroundImageSrcset })
				),
				states.hasLink && item.linkUrl && wp.element.createElement(
					'div',
					{ className: 'link' },
					wp.element.createElement(
						'a',
						{ href: item.linkUrl },
						' '
					)
				)
			));
		});
		return wp.element.createElement(
			'ul',
			{ className: classes },
			states.doLoop && '[loop_template ' + (loopParam || '') + ']',
			rtn,
			states.doLoop && '[/loop_template]'
		);
	}
});
