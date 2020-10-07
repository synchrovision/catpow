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
		}, {
			input: 'text',
			label: 'サブ画像コード',
			key: 'subImageCode',
			cond: states.hasSubImage
		}];

		var save = function save() {
			setAttibutes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var rtn = [];
		var imageKeys = {
			image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" },
			subImage: { src: "subImageSrc", alt: "subImageAlt", code: "subImageCode", items: "items" },
			backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
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
					{ 'class': 'image' },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						size: 'vga',
						isTemplate: states.isTemplate
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
						wp.element.createElement(SelectResponsiveImage, {
							attr: attributes,
							set: setAttributes,
							keys: imageKeys.headerImage,
							index: index,
							size: 'thumbnail',
							isTemplate: states.isTemplate
						})
					),
					wp.element.createElement(
						'div',
						{ className: 'text' },
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
						states.hasTitle && states.hasTitleCaption && wp.element.createElement(
							'p',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(titleCaption) {
									item.titleCaption = titleCaption;save();
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
						wp.element.createElement(SelectResponsiveImage, {
							attr: attributes,
							set: setAttributes,
							keys: imageKeys.subImage,
							index: index,
							size: 'medium',
							isTemplate: states.isTemplate
						})
					),
					states.hasSubTitle && wp.element.createElement(
						'h4',
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(subTitle) {
								item.subTitle = subTitle;save();
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
						index: index,
						isTemplate: states.isTemplate
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
								item.linkUrl = e.currentTarget.innerHTML;
								save();
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
					items: items,
					index: attributes.currentItemIndex,
					triggerClasses: selectiveClasses[0],
					filters: CP.filters.listed || {}
				}),
				states.isTemplate && wp.element.createElement(SelectItemClassPanel, {
					title: '\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: itemTemplateSelectiveClasses,
					filters: CP.filters.listed || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			attributes.EditMode ? wp.element.createElement(EditItemsTable, {
				set: setAttributes,
				attr: attributes,
				columns: [{ type: 'image', label: 'image', keys: imageKeys.image, cond: states.hasImage }, { type: 'text', key: 'imageCode', cond: states.isTemplate && states.hasImage }, { type: 'image', label: 'sub', keys: imageKeys.subImage, cond: states.hasSubImage }, { type: 'text', key: 'subImageCode', cond: states.isTemplate && states.hasSubImage }, { type: 'image', label: 'header', keys: imageKeys.headerImage, cond: states.hasHeaderImage }, { type: 'text', key: 'headerImageCode', cond: states.isTemplate && states.hasHeaderImage }, { type: 'image', label: 'bg', keys: imageKeys.backgroundImage, cond: states.hasBackgroundImage }, { type: 'text', key: 'backgroundImageCode', cond: states.isTemplate && states.hasBackgroundImage }, { type: 'text', key: 'title', cond: states.hasTitle }, { type: 'text', key: 'titleCaption', cond: states.hasTitleCaption }, { type: 'text', key: 'subTitle', cond: states.hasSubTitle }, { type: 'text', key: 'text', cond: states.hasText }, { type: 'text', key: 'linkUrl', cond: states.hasLink }],
				isTemplate: states.isTemplate
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
		    countPrefix = attributes.countPrefix,
		    countSuffix = attributes.countSuffix,
		    subCountPrefix = attributes.subCountPrefix,
		    subCountSuffix = attributes.subCountSuffix,
		    linkUrl = attributes.linkUrl,
		    linkText = attributes.linkText,
		    loopParam = attributes.loopParam,
		    doLoop = attributes.doLoop;

		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		var imageKeys = {
			image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
			headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" },
			subImage: { src: "subImageSrc", alt: "subImageAlt", code: "subImageCode", items: "items" },
			backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
		};

		var rtn = [];
		items.map(function (item, index) {
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
						isTemplate: states.isTemplate
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
						{ className: 'image' },
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.headerImage,
							index: index,
							isTemplate: states.isTemplate
						})
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
						wp.element.createElement(ResponsiveImage, {
							attr: attributes,
							keys: imageKeys.subImage,
							index: index,
							isTemplate: states.isTemplate
						})
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
			doLoop ? wp.element.createElement(
				'loopBlockContent',
				null,
				rtn
			) : rtn
		);
	},

	deprecated: [{
		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
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

			var imageKeys = {
				image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
				headerImage: { src: "headerImageSrc", alt: "headerImageAlt", code: "headerImageCode", items: "items" },
				subImage: { src: "subImageSrc", alt: "subImageAlt", code: "subImageCode", items: "items" },
				backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", code: "backgroundImageCode", items: "items" }
			};

			var rtn = [];
			items.map(function (item, index) {
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
							isTemplate: states.isTemplate
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
							{ className: 'image' },
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.headerImage,
								index: index,
								isTemplate: states.isTemplate
							})
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
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.subImage,
								index: index,
								isTemplate: states.isTemplate
							})
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
				state.doLoop && '[loop_template ' + (loopParam || '') + ']',
				rtn,
				state.doLoop && '[/loop_template]'
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
