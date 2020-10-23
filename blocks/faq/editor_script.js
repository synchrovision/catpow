registerBlockType('catpow/faq', {
	title: '🐾 FaQ',
	description: '質問と回答の一覧ブロックです。',
	icon: 'editor-help',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-faq accordion';
				return createBlock('catpow/faq', attributes);
			}
		}]
	},
	attributes: {
		version: { type: 'number', default: 0 },
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-faq' },
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
				linkUrl: { source: 'attribute', selector: '.link a', attribute: 'href' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
				return {
					classes: 'item',
					title: ['Title'],
					titleCaption: ['Caption'],
					subTitle: ['SubTitle'],
					src: cp.theme_url + '/images/dummy.jpg',
					alt: 'dummy',
					text: ['Text'],
					linkUrl: cp.home_url
				};
			})
		},
		countPrefix: { source: 'text', selector: '.counter .prefix', default: '' },
		countSuffix: { source: 'text', selector: '.counter .suffix', default: '' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items,
		    _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes,
		    countPrefix = attributes.countPrefix,
		    countSuffix = attributes.countSuffix;

		var primaryClass = 'wp-block-catpow-faq';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = {
			hasImage: false,
			hasCounter: false,
			hasTitleCaption: false,
			hasSubTitle: false,
			hasLink: false
		};

		var selectiveClasses = [{ label: 'Qにキャプション', values: 'hasTitleCaption' }, { label: 'Aに見出し', values: 'hasSubTitle' }, { label: 'アコーディオン', values: 'accordion' }, { label: 'リンク', values: 'hasLink' }];

		var itemsCopy = items.map(function (obj) {
			return jQuery.extend(true, {}, obj);
		});

		var hasClass = function hasClass(cls) {
			return classArray.indexOf(cls) !== -1;
		};
		Object.keys(states).forEach(function (key) {
			this[key] = hasClass(key);
		}, states);

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", items: "items" }
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
					wp.element.createElement(
						'div',
						{ className: 'text' },
						wp.element.createElement(
							'h3',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									itemsCopy[index].title = text;setAttributes({ items: itemsCopy });
								},
								value: item.title
							})
						),
						states.hasTitleCaption && wp.element.createElement(
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
				wp.element.createElement(
					'div',
					{ 'class': 'contents' },
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
					wp.element.createElement(
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
				states.hasLink && wp.element.createElement(
					'div',
					{ className: 'link' },
					wp.element.createElement(TextControl, { onChange: function onChange(linkUrl) {
							itemsCopy[index].linkUrl = linkUrl;
							setAttributes({ items: itemsCopy });
						}, value: item.linkUrl, placeholder: 'URL\u3092\u5165\u529B' })
				)
			));
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
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
				filters: CP.filters.faq || {}
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
		var _attributes$items2 = attributes.items,
		    items = _attributes$items2 === undefined ? [] : _attributes$items2,
		    _attributes$classes2 = attributes.classes,
		    classes = _attributes$classes2 === undefined ? '' : _attributes$classes2,
		    countPrefix = attributes.countPrefix,
		    countSuffix = attributes.countSuffix;

		var classArray = _.uniq(classes.split(' '));

		var states = {
			hasImage: false,
			hasCounter: false,
			hasTitleCaption: false,
			hasSubTitle: false,
			hasLink: false
		};
		var hasClass = function hasClass(cls) {
			return classArray.indexOf(cls) !== -1;
		};
		Object.keys(states).forEach(function (key) {
			this[key] = hasClass(key);
		}, states);

		var rtn = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				states.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement('img', { src: item.src, alt: item.alt })
				),
				wp.element.createElement(
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
					wp.element.createElement(
						'div',
						{ className: 'text' },
						wp.element.createElement(
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
				wp.element.createElement(
					'div',
					{ 'class': 'contents' },
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText.Content, { value: item.subTitle })
					),
					wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText.Content, { value: item.text })
					)
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
			wp.element.createElement(RichText.Content, { value: rtn })
		);
	}
});
