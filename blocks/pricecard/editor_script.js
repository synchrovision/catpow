registerBlockType('catpow/pricecard', {
	title: '🐾 PriceCard',
	description: 'サービス・商品情報の一覧ブロックです。',
	icon: 'index-card',
	category: 'catpow',
	attributes: {
		version: { type: 'number', default: 0 },
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-pricecard hasImage hasTitle hasSpec unitBefore' },
		priceUnit: { source: 'text', selector: 'span.price .unit', default: '¥' },
		priceCaption: { source: 'children', selector: 'span.priceCaption', default: ['（税込）'] },
		linkText: { source: 'text', selector: '.link', default: 'more info' },
		items: {
			source: 'query',
			selector: 'li.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				title: { source: 'children', selector: 'header .text h3' },
				titleCaption: { source: 'children', selector: 'header .text p' },
				src: { source: 'attribute', selector: 'li>.image [src]', attribute: 'src' },
				alt: { source: 'attribute', selector: 'li>.image [src]', attribute: 'alt' },
				subTitle: { source: 'children', selector: '.contents h4' },
				text: { source: 'children', selector: '.contents p' },
				listPrice: { source: 'text', selector: 'span.listPrice .number' },
				price: { source: 'text', selector: 'span.price .number' },

				specLabels: { source: 'query', selector: 'dl.spec dt', query: { text: { source: 'children' } } },
				specValues: { source: 'query', selector: 'dl.spec dd', query: { text: { source: 'children' } } },
				linkUrl: { source: 'attribute', selector: '.link', attribute: 'href' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
				return {
					classes: 'item',
					title: ['Title'],
					titleCaption: ['Caption'],
					src: cp.theme_url + '/images/dummy.jpg',
					alt: 'dummy',
					subTitle: ['SubTitle'],
					text: ['Text'],
					listPrice: '0,000',
					price: '0,000',
					specLabels: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
						return { text: ['label'] };
					}),
					specValues: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
						return { text: ['value'] };
					}),
					linkUrl: cp.home_url
				};
			})
		},
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
		    priceUnit = attributes.priceUnit,
		    priceCaption = attributes.priceCaption,
		    linkText = attributes.linkText,
		    loopCount = attributes.loopCount;

		var primaryClass = 'wp-block-catpow-pricecard';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{ input: 'text', label: '価格単位', key: 'priceUnit' }, { type: 'radio', label: '単位の位置', values: { "unitBefore": "前", "unitAfter": "後" } }, { label: 'タイトル', values: 'hasTitle' }, { label: 'キャプション', values: 'hasTitleCaption' }, { label: 'リンク', values: 'hasLink', sub: [{ input: 'text', label: 'リンク文字列', key: 'linkText' }] }, { label: '画像', values: 'hasImage' }, { label: 'サブタイトル', values: 'hasSubTitle' }, { label: 'テキスト', values: 'hasText' }, { label: 'スペック', values: 'hasSpec' }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ label: 'ループ', values: 'doLoop', sub: [{ label: 'パラメータ', input: 'text', key: 'loopParam' }, { label: 'ループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];
		var itemSelectiveClasses = ['color', { label: 'タイプ', values: { 'normal': "通常", 'recommended': "おすすめ", 'deprecated': "非推奨", 'cheap': "安価", 'expensive': "高級" } }, { label: '値引き', values: 'discount' }];
		var itemTemplateSelectiveClasses = [{ label: '画像', values: 'loopImage', sub: [{ label: 'src', input: 'text', key: 'src' }, { label: 'alt', input: 'text', key: 'alt' }] }];

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", items: "items" }
		};
		var save = function save() {
			setAttibutes({ items: JSON.parse(JSON.stringify(items)) });
		};

		items.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			rtn.push(wp.element.createElement(
				Item,
				{
					tag: 'li',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: index,
					isSelected: isSelected
				},
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						size: 'vga'
					})
				),
				wp.element.createElement(
					'header',
					null,
					wp.element.createElement(
						'div',
						{ className: 'text' },
						states.hasTitle && wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									items[index].title = text;save();
								},
								value: item.title
							})
						),
						states.hasTitle && states.hasTitleCaption && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									items[index].titleCaption = text;save();
								},
								value: item.titleCaption
							})
						),
						wp.element.createElement(
							'div',
							{ 'class': 'price' },
							wp.element.createElement(
								'span',
								{ 'class': 'listPrice' },
								states.unitBefore && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								),
								wp.element.createElement(
									'span',
									{ 'class': 'number' },
									wp.element.createElement(RichText, {
										onChange: function onChange(listPrice) {
											items[index].listPrice = listPrice;save();
										},
										value: item.listPrice
									})
								),
								states.unitAfter && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								)
							),
							wp.element.createElement(
								'span',
								{ 'class': 'price' },
								states.unitBefore && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								),
								wp.element.createElement(
									'span',
									{ 'class': 'number' },
									wp.element.createElement(RichText, {
										onChange: function onChange(price) {
											items[index].price = price;save();
										},
										value: item.price
									})
								),
								states.unitAfter && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								)
							),
							wp.element.createElement(
								'span',
								{ 'class': 'priceCaption' },
								wp.element.createElement(RichText, {
									onChange: function onChange(priceCaption) {
										setAttributes({ priceCaption: priceCaption });
									},
									value: priceCaption
								})
							)
						)
					)
				),
				(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(subTitle) {
								items[index].subTitle = subTitle;save();
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
								items[index].text = text;save();
							},
							value: item.text
						})
					),
					states.hasSpec && wp.element.createElement(
						'dl',
						{ className: 'spec' },
						item.specLabels.map(function (label, specIndex) {
							return [wp.element.createElement(
								'dt',
								null,
								wp.element.createElement(RichText, {
									onChange: function onChange(text) {
										items[index].specLabels[specIndex].text = text;
										save();
									},
									value: items[index].specLabels[specIndex].text
								})
							), wp.element.createElement(
								'dd',
								null,
								wp.element.createElement(RichText, {
									onChange: function onChange(text) {
										items[index].specValues[specIndex].text = text;
										save();
									},
									value: items[index].specValues[specIndex].text
								})
							)];
						})
					),
					states.hasLink && wp.element.createElement(
						'div',
						{ className: 'link' },
						linkText,
						isSelected && wp.element.createElement(TextControl, { onChange: function onChange(linkUrl) {
								items[index].linkUrl = linkUrl;
								save();
							}, value: item.linkUrl, placeholder: 'URL\u3092\u5165\u529B' })
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

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
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
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(SelectClassPanel, {
					title: '\u30AF\u30E9\u30B9',
					icon: 'art',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.pricecard || {}
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
					title: '\u30A2\u30A4\u30C6\u30E0',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: itemSelectiveClasses,
					filters: CP.filters.pricecard || {}
				}),
				states.isTemplate && wp.element.createElement(SelectItemClassPanel, {
					title: '\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: itemTemplateSelectiveClasses,
					filters: CP.filters.pricecard || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			attributes.EditMode ? wp.element.createElement(EditItemsTable, {
				set: setAttributes,
				attr: attributes,
				columns: [{ type: 'text', key: 'title', cond: states.hasTitle }, { type: 'text', key: 'titleCaption', cond: states.hasTitleCaption }, { type: 'image', keys: imageKeys.image, cond: states.hasImage }, { type: 'text', key: 'subTitle', cond: states.hasSubTitle }, { type: 'text', key: 'text', cond: states.hasText }, { type: 'text', key: 'listPrice' }, { type: 'text', key: 'price' }, { type: 'text', key: 'linkUrl', cond: states.hasLink }]
			}) : wp.element.createElement(
				'ul',
				{ className: classes },
				rtn
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var items = attributes.items,
		    classes = attributes.classes,
		    priceUnit = attributes.priceUnit,
		    priceCaption = attributes.priceCaption,
		    linkText = attributes.linkText,
		    loopCount = attributes.loopCount;

		var primaryClass = 'wp-block-catpow-pricecard';
		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", items: "items" }
		};
		items.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						index: index,
						size: 'vga'
					})
				),
				wp.element.createElement(
					'header',
					null,
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
						),
						wp.element.createElement(
							'div',
							{ 'class': 'price' },
							wp.element.createElement(
								'span',
								{ 'class': 'listPrice' },
								states.unitBefore && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								),
								wp.element.createElement(
									'span',
									{ 'class': 'number' },
									item.listPrice
								),
								states.unitAfter && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								)
							),
							wp.element.createElement(
								'span',
								{ 'class': 'price' },
								states.unitBefore && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								),
								wp.element.createElement(
									'span',
									{ 'class': 'number' },
									item.price
								),
								states.unitAfter && wp.element.createElement(
									'span',
									{ 'class': 'unit' },
									priceUnit
								)
							),
							wp.element.createElement(
								'span',
								{ 'class': 'priceCaption' },
								wp.element.createElement(RichText.Content, { value: priceCaption })
							)
						)
					)
				),
				(states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText.Content, { value: item.subTitle })
					),
					states.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText.Content, { value: item.text })
					),
					states.hasSpec && wp.element.createElement(
						'dl',
						{ className: 'spec' },
						item.specLabels.map(function (label, specIndex) {
							return [wp.element.createElement(
								'dt',
								null,
								wp.element.createElement(RichText.Content, { value: items[index].specLabels[specIndex].text })
							), wp.element.createElement(
								'dd',
								null,
								wp.element.createElement(RichText.Content, { value: items[index].specValues[specIndex].text })
							)];
						})
					),
					states.hasLink && wp.element.createElement(
						'a',
						{ className: 'link', href: item.linkUrl },
						linkText
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
