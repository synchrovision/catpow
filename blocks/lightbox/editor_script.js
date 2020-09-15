registerBlockType('catpow/lightbox', {
	title: '🐾 Lightbox',
	description: 'クリックでポップアップ表示する画像です。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-lightbox medium hasTitle hasImage hasText';
				return createBlock('catpow/lightbox', attributes);
			}
		}]
	},
	attributes: {
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-lightbox medium hasTitle hasImage hasText' },
		boxClasses: { source: 'attribute', selector: '.contents', attribute: 'class', default: 'contents' },
		items: {
			source: 'query',
			selector: 'li.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				title: { source: 'children', selector: 'header .text h3' },
				titleCaption: { source: 'children', selector: 'header .text p' },
				headerImageSrc: { source: 'attribute', selector: 'header .image [src]', attribute: 'src' },
				headerImageAlt: { source: 'attribute', selector: 'header .image [src]', attribute: 'alt' },
				src: { source: 'attribute', selector: '.contents .image [src]', attribute: 'src' },
				alt: { source: 'attribute', selector: '.contents .image [src]', attribute: 'alt' },
				subTitle: { source: 'children', selector: '.contents .title h4' },
				text: { source: 'children', selector: '.contents .text' }
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
					text: ['Text']
				};
			})
		},
		blockState: { type: 'object', default: { enableBlockFormat: false } }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var items = attributes.items,
		    classes = attributes.classes,
		    boxClasses = attributes.boxClasses,
		    blockState = attributes.blockState;

		var primaryClass = 'wp-block-catpow-lightbox';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{ label: 'サイズ', values: ['small', 'medium', 'large'] }, { label: 'サムネール画像', values: 'hasHeaderImage' }, { label: 'タイトル', values: 'hasTitle' }, { label: 'タイトルキャプション', values: 'hasTitleCaption' }, { label: '画像', values: 'hasImage' }, { label: 'タイトル', values: 'hasSubTitle' }, { label: 'テキスト', values: 'hasText' }, { label: 'ボックスサイズ', values: ['small', 'medium', 'large'], key: 'boxClasses' }];

		var itemsCopy = items.map(function (obj) {
			return jQuery.extend(true, {}, obj);
		});

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", items: "items" }
		};

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
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
					filters: CP.filters.lightbox || {}
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
					}),
					wp.element.createElement(TextareaControl, {
						label: '\u30DC\u30C3\u30AF\u30B9\u30AF\u30E9\u30B9',
						onChange: function onChange(clss) {
							return setAttributes({ boxClasses: clss });
						},
						value: boxClasses
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
					filters: CP.filters.lightbox || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			wp.element.createElement(
				'ul',
				{ className: attributes.EditMode ? primaryClass + ' edit' : classes },
				itemsCopy.map(function (item, index) {
					return wp.element.createElement(
						Item,
						{
							tag: 'li',
							set: setAttributes,
							attr: attributes,
							items: itemsCopy,
							index: index
						},
						wp.element.createElement(
							'header',
							null,
							states.hasHeaderImage && wp.element.createElement(
								'div',
								{ className: 'image' },
								wp.element.createElement(SelectResponsiveImage, {
									attr: attributes,
									set: setAttributes,
									keys: imageKeys.headerImage,
									index: index,
									size: 'vga'
								})
							),
							states.hasTitle && wp.element.createElement(
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
								states.hasTitle && wp.element.createElement(
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
						)
					);
				})
			),
			isSelected && attributes.currentItemIndex >= 0 && wp.element.createElement(
				'div',
				{ className: 'lightbox_preview' },
				wp.element.createElement(
					'div',
					{ id: 'cp_lightbox', className: 'cp_lightbox_container active' },
					wp.element.createElement(
						'div',
						{ 'class': 'cp_lightbox_content' },
						wp.element.createElement(
							'div',
							{ 'class': 'group active' },
							wp.element.createElement(
								'ul',
								{ 'class': 'items' },
								itemsCopy.map(function (item, index) {
									var isActive = attributes.currentItemIndex == index;
									return wp.element.createElement(
										'li',
										{ className: isActive ? 'item active' : 'item' },
										wp.element.createElement(
											'div',
											{ className: boxClasses },
											states.hasSubTitle && wp.element.createElement(
												'header',
												{ className: 'title' },
												wp.element.createElement(
													'h4',
													null,
													wp.element.createElement(RichText, {
														onChange: function onChange(subTitle) {
															itemsCopy[index].subTitle = subTitle;setAttributes({ items: itemsCopy });
														},
														value: item.subTitle,
														placeholder: 'SubTitle'
													})
												)
											),
											states.hasImage && wp.element.createElement(
												'div',
												{ className: 'image' },
												wp.element.createElement(SelectResponsiveImage, {
													attr: attributes,
													set: setAttributes,
													keys: imageKeys.image,
													index: index,
													size: 'full'
												})
											),
											states.hasText && wp.element.createElement(
												'div',
												{ className: 'text' },
												wp.element.createElement(
													'div',
													{
														onFocus: function onFocus() {
															blockState.enableBlockFormat = true;
														},
														onBlur: function onBlur() {
															blockState.enableBlockFormat = false;
														}
													},
													wp.element.createElement(RichText, {
														onChange: function onChange(text) {
															itemsCopy[index].text = text;setAttributes({ items: itemsCopy });
														},
														value: item.text
													})
												)
											)
										)
									);
								})
							),
							wp.element.createElement(
								'div',
								{ 'class': 'cp_lightbox_control' },
								wp.element.createElement('div', { className: 'prev active' }),
								wp.element.createElement(
									'ul',
									{ className: 'dots active' },
									items.map(function (item, index) {
										var isActive = attributes.currentItemIndex == index;
										return wp.element.createElement('li', { className: isActive ? 'dot active' : 'dot', 'data-index': index });
									})
								),
								wp.element.createElement('div', { className: 'next active' }),
								wp.element.createElement('div', { className: 'close' })
							)
						)
					)
				)
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var items = attributes.items,
		    classes = attributes.classes,
		    boxClasses = attributes.boxClasses,
		    blockState = attributes.blockState;

		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		return wp.element.createElement(
			'ul',
			{ className: classes },
			items.map(function (item, index) {
				return wp.element.createElement(
					'li',
					{ className: item.classes },
					wp.element.createElement(
						'header',
						null,
						states.hasHeaderImage && wp.element.createElement(
							'div',
							{ 'class': 'image' },
							wp.element.createElement('img', { src: item.headerImageSrc, alt: item.headerImageAlt })
						),
						states.hasTitle && wp.element.createElement(
							'div',
							{ className: 'text' },
							wp.element.createElement(
								'h3',
								null,
								wp.element.createElement(RichText.Content, { value: item.title })
							),
							tates.hasTitleCaption && wp.element.createElement(
								'p',
								null,
								wp.element.createElement(RichText.Content, { value: item.titleCaption })
							)
						)
					),
					wp.element.createElement(
						'div',
						{ 'class': boxClasses },
						states.hasSubTitle && wp.element.createElement(
							'header',
							{ className: 'title' },
							wp.element.createElement(
								'h4',
								null,
								wp.element.createElement(RichText.Content, { value: item.subTitle })
							)
						),
						states.hasImage && wp.element.createElement(
							'div',
							{ className: 'image' },
							wp.element.createElement('img', { src: item.src, alt: item.alt })
						),
						states.hasText && wp.element.createElement(
							'div',
							{ className: 'text' },
							wp.element.createElement(RichText.Content, { value: item.text })
						)
					)
				);
			})
		);
	}
});
