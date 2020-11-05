CP.config.panes = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
		symbol: { src: "symbolSrc", alt: "symbolAlt", code: "symbolCode", items: "items" }
	}
};

registerBlockType('catpow/panes', {
	title: '🐾 Panes',
	description: '矩形の画像とテキストのペアのリスト。',
	icon: 'editor-ul',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-panes';
				return createBlock('catpow/panes', attributes);
			}
		}]
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
		    loopCount = attributes.loopCount,
		    doLoop = attributes.doLoop,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode,
		    _attributes$AltMode = attributes.AltMode,
		    AltMode = _attributes$AltMode === undefined ? false : _attributes$AltMode;

		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.panes.imageKeys;


		var selectiveClasses = [{ label: 'シンボル', values: 'hasSymbol' }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ input: 'bool', label: 'ループ', key: 'doLoop', sub: [{ label: 'content path', input: 'text', key: 'content_path' }, { label: 'query', input: 'textarea', key: 'query' }, { label: 'プレビューループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];
		var itemSelectiveClasses = ['color', 'pattern', { input: 'symbol', keys: imageKeys.symbol, cond: states.hasSymbol }, {
			input: 'text',
			label: 'シンボル画像コード',
			key: 'symbolCode',
			cond: states.isTemplate && states.hasSymbol
		}, {
			input: 'text',
			label: '画像コード',
			key: 'imageCode',
			cond: states.isTemplate
		}];

		var save = function save() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var rtn = [];

		items.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			rtn.push(wp.element.createElement(
				Item,
				{
					tag: "li",
					set: setAttributes,
					attr: attributes,
					items: items,
					index: index,
					isSelected: isSelected
				},
				wp.element.createElement(
					"div",
					{ "class": "image" },
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						size: "large",
						isTemplate: states.isTemplate
					})
				),
				wp.element.createElement(
					"div",
					{ "class": "contents" },
					wp.element.createElement(
						"div",
						{ className: "text" },
						states.hasSymbol && wp.element.createElement(
							"div",
							{ className: "symbol" },
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.symbol,
								index: index,
								size: "medium",
								isTemplate: states.isTemplate
							})
						),
						wp.element.createElement(
							"h3",
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(title) {
									item.title = title;save();
								},
								value: item.title
							})
						),
						wp.element.createElement(
							"p",
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
				states.hasLink && isSelected && wp.element.createElement(
					"div",
					{ className: "link" },
					wp.element.createElement(
						"p",
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
				attr: attributes
			}),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(SelectClassPanel, {
					title: "\u30AF\u30E9\u30B9",
					icon: "art",
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.panes || {}
				}),
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
				),
				wp.element.createElement(SelectClassPanel, {
					title: "\u30A2\u30A4\u30C6\u30E0",
					icon: "edit",
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					selectiveClasses: itemSelectiveClasses,
					filters: CP.filters.panes || {}
				}),
				wp.element.createElement(ItemControlInfoPanel, null)
			),
			EditMode ? wp.element.createElement(
				"div",
				{ className: "alt_content" },
				wp.element.createElement(
					"div",
					{ "class": "label" },
					wp.element.createElement(Icon, { icon: "edit" })
				),
				wp.element.createElement(EditItemsTable, {
					set: setAttributes,
					attr: attributes,
					columns: [{ type: 'image', label: 'image', keys: imageKeys.image, cond: true }, { type: 'text', key: 'imageCode', cond: states.isTemplate }, { type: 'text', key: 'title', cond: states.hasTitle }, { type: 'text', key: 'titleCaption', cond: states.hasTitleCaption }, { type: 'text', key: 'linkUrl', cond: states.hasLink }],
					isTemplate: states.isTemplate
				})
			) : wp.element.createElement(
				Fragment,
				null,
				AltMode && doLoop ? wp.element.createElement(
					"div",
					{ className: "alt_content" },
					wp.element.createElement(
						"div",
						{ "class": "label" },
						wp.element.createElement(Icon, { icon: "welcome-comments" })
					),
					wp.element.createElement(InnerBlocks, null)
				) : wp.element.createElement(
					"ul",
					{ className: classes },
					rtn
				)
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var _attributes$items2 = attributes.items,
		    items = _attributes$items2 === undefined ? [] : _attributes$items2,
		    _attributes$classes2 = attributes.classes,
		    classes = _attributes$classes2 === undefined ? '' : _attributes$classes2,
		    linkUrl = attributes.linkUrl,
		    loopParam = attributes.loopParam,
		    doLoop = attributes.doLoop;

		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.panes.imageKeys;


		var rtn = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				"li",
				{ className: item.classes },
				wp.element.createElement(
					"div",
					{ className: "image" },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						index: index,
						isTemplate: states.isTemplate
					})
				),
				wp.element.createElement(
					"div",
					{ "class": "contents" },
					wp.element.createElement(
						"div",
						{ className: "text" },
						states.hasSymbol && wp.element.createElement(
							"div",
							{ className: "symbol" },
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.symbol,
								index: index,
								size: "medium",
								isTemplate: states.isTemplate
							})
						),
						wp.element.createElement(
							"h3",
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						wp.element.createElement(
							"p",
							null,
							wp.element.createElement(RichText.Content, { value: item.titleCaption })
						)
					)
				),
				states.hasLink && item.linkUrl && wp.element.createElement(
					"div",
					{ className: "link" },
					wp.element.createElement(
						"a",
						{ href: item.linkUrl },
						" "
					)
				)
			));
		});
		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				"ul",
				{ className: classes },
				rtn
			),
			doLoop && wp.element.createElement(
				"onEmpty",
				null,
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
