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
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var items = attributes.items,
		    classes = attributes.classes,
		    boxClasses = attributes.boxClasses,
		    blockState = attributes.blockState,
		    loopCount = attributes.loopCount,
		    doLoop = attributes.doLoop,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode,
		    _attributes$AltMode = attributes.AltMode,
		    AltMode = _attributes$AltMode === undefined ? false : _attributes$AltMode,
		    _attributes$OpenMode = attributes.OpenMode,
		    OpenMode = _attributes$OpenMode === undefined ? false : _attributes$OpenMode,
		    _attributes$currentIt = attributes.currentItemIndex,
		    currentItemIndex = _attributes$currentIt === undefined ? 0 : _attributes$currentIt;

		var primaryClass = 'wp-block-catpow-lightbox';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{ label: 'サイズ', values: ['small', 'medium', 'large'] }, { label: 'サムネール画像', values: 'hasHeaderImage' }, { label: 'タイトル', values: 'hasTitle' }, { label: 'タイトルキャプション', values: 'hasTitleCaption' }, { label: '画像', values: 'hasImage' }, { label: 'タイトル', values: 'hasSubTitle' }, { label: 'テキスト', values: 'hasText' }, { label: 'ボックスサイズ', values: ['small', 'medium', 'large'], key: 'boxClasses' }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ input: 'bool', label: 'ループ', key: 'doLoop', sub: [{ label: 'content path', input: 'text', key: 'content_path' }, { label: 'query', input: 'textarea', key: 'query' }, { label: 'プレビューループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
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
		}];
		var save = function save() {
			setAttibutes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" }
		};

		var AnyMode = AltMode || EditMode || OpenMode;

		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				Item,
				{
					tag: 'li',
					set: setAttributes,
					attr: attributes,
					items: items,
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
							size: 'vga',
							isTemplate: states.isTemplate
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
									item.title = text;save();
								},
								value: item.title
							})
						),
						states.hasTitleCaption && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									item.titleCaption = text;save();
								},
								value: item.titleCaption
							})
						)
					)
				)
			));
		});

		if (rtn.length < loopCount) {
			var len = rtn.length;
			while (rtn.length < loopCount) {
				rtn.push(rtn[rtn.length % len]);
			}
		}

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(SelectModeToolbar, {
				set: setAttributes,
				attr: attributes,
				modes: ['EditMode', 'AltMode', 'OpenMode']
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
					items: items,
					index: attributes.currentItemIndex,
					triggerClasses: selectiveClasses[0],
					filters: CP.filters.lightbox || {}
				}),
				states.isTemplate && wp.element.createElement(SelectItemClassPanel, {
					title: '\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: itemTemplateSelectiveClasses,
					filters: CP.filters.lightbox || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			!OpenMode ? wp.element.createElement(
				Fragment,
				null,
				EditMode ? wp.element.createElement(
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
						columns: [{ type: 'image', label: 'image', keys: imageKeys.image, cond: states.hasImage }, { type: 'text', key: 'imageCode', cond: states.isTemplate && states.hasImage }, { type: 'image', label: 'header', keys: imageKeys.headerImage, cond: states.hasHeaderImage }, { type: 'text', key: 'headerImageCode', cond: states.isTemplate && states.hasHeaderImage }, { type: 'text', key: 'title', cond: states.hasTitle }, { type: 'text', key: 'titleCaption', cond: states.hasTitleCaption }, { type: 'text', key: 'subTitle', cond: states.hasSubTitle }, { type: 'text', key: 'text', cond: states.hasText }],
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
						'ul',
						{ className: classes },
						rtn
					)
				)
			) : wp.element.createElement(
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
								items.map(function (item, index) {
									var isActive = currentItemIndex == index;
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
															items[index].subTitle = subTitle;setAttributes({ items: items });
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
													size: 'full',
													isTemplate: states.isTemplate
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
															items[index].text = text;setAttributes({ items: items });
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
										var isActive = currentItemIndex == index;
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
		    blockState = attributes.blockState,
		    doLoop = attributes.doLoop;

		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		var imageKeys = {
			image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" }
		};

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
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
								{ className: 'image' },
								wp.element.createElement(ResponsiveImage, {
									attr: attributes,
									keys: imageKeys.headerImage,
									index: index,
									isTemplate: states.isTemplate
								})
							),
							states.hasTitle && wp.element.createElement(
								'div',
								{ className: 'text' },
								wp.element.createElement(
									'h3',
									null,
									wp.element.createElement(RichText.Content, { value: item.title })
								),
								states.hasTitleCaption && wp.element.createElement(
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
								wp.element.createElement(ResponsiveImage, {
									attr: attributes,
									keys: imageKeys.image,
									index: index,
									isTemplate: states.isTemplate
								})
							),
							states.hasText && wp.element.createElement(
								'div',
								{ className: 'text' },
								wp.element.createElement(RichText.Content, { value: item.text })
							)
						)
					);
				})
			),
			doLoop && wp.element.createElement(
				'onEmpty',
				null,
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
