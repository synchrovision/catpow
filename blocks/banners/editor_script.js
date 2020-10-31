CP.config.banners = {
	imageKeys: {
		image: { src: "src", alt: "alt", code: 'imageCode', items: "items" }
	}
};

registerBlockType('catpow/banners', {
	title: '🐾 Banners',
	description: 'リンク付きのバナー画像を並べて表示するブロックです。',
	icon: 'images-alt',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-banners medium hasTitle';
				return createBlock('catpow/banners', attributes);
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
		    classes = attributes.classes,
		    loopCount = attributes.loopCount,
		    imageCode = attributes.imageCode,
		    doLoop = attributes.doLoop,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode,
		    _attributes$AltMode = attributes.AltMode,
		    AltMode = _attributes$AltMode === undefined ? false : _attributes$AltMode;


		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.banners.imageKeys;


		var selectiveClasses = [{ label: 'サイズ', values: ['small', 'medium', 'large'] }, { label: 'タイトル', values: 'hasTitle' }, CP.selectiveClassesPreset.isTemplate];
		var selectiveItemClasses = [{ input: 'image', label: '画像', keys: imageKeys.image }, { input: 'text', label: 'alt', key: 'alt' }, { input: 'text', label: 'target', key: 'target' }, 'event'];
		var itemTemplateSelectiveClasses = [{ input: 'text', label: '画像', key: 'imageCode' }];

		var rtn = [];
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
					tag: "li",
					set: setAttributes,
					attr: attributes,
					items: items,
					index: index,
					isSelected: isSelected
				},
				states.hasTitle && wp.element.createElement(
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
					"a",
					null,
					wp.element.createElement(SelectResponsiveImage, {
						attr: attributes,
						set: setAttributes,
						keys: imageKeys.image,
						index: index,
						size: "medium-large",
						isTemplate: states.isTemplate
					})
				),
				isSelected && wp.element.createElement(
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
					filters: CP.filters.banners || {}
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
				states.isTemplate ? wp.element.createElement(SelectItemClassPanel, {
					title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
					icon: "edit",
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: itemTemplateSelectiveClasses,
					filters: CP.filters.banners || {}
				}) : wp.element.createElement(SelectItemClassPanel, {
					title: "\u30D0\u30CA\u30FC",
					icon: "edit",
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					itemClasses: selectiveItemClasses,
					filters: CP.filters.banners || {}
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
					columns: [{ type: 'text', key: 'title', cond: states.hasTitle }, { type: 'image', label: 'image', keys: imageKeys.image, cond: true }, { type: 'text', key: 'imageCode', cond: states.isTemplate }, { type: 'text', key: 'linkUrl', cond: true }, { type: 'text', key: 'target', cond: true }],
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
		    classes = attributes.classes,
		    loopParam = attributes.loopParam,
		    doLoop = attributes.doLoop;


		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.banners.imageKeys;


		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				"ul",
				{ className: classes },
				items.map(function (item, index) {
					return wp.element.createElement(
						"li",
						{ className: item.classes },
						states.hasTitle && wp.element.createElement(
							"h3",
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						wp.element.createElement(
							"a",
							{ href: item.linkUrl, target: item.target, "data-event": item.event, rel: item.target ? 'noopener noreferrer' : '' },
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.image,
								index: index,
								isTemplate: states.isTemplate
							})
						)
					);
				})
			),
			doLoop && wp.element.createElement(
				"onEmpty",
				null,
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	},

	deprecated: [{
		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
			var _attributes$items3 = attributes.items,
			    items = _attributes$items3 === undefined ? [] : _attributes$items3,
			    classes = attributes.classes,
			    loopParam = attributes.loopParam;


			var states = CP.wordsToFlags(classes);
			var imageKeys = {
				image: { src: "src", srcset: "srcset", alt: "alt", code: 'imageCode', items: "items" }
			};

			return wp.element.createElement(
				"ul",
				{ className: classes },
				states.doLoop && '[loop_template ' + loopParam + ']',
				items.map(function (item, index) {
					return wp.element.createElement(
						"li",
						{ className: item.classes },
						states.hasTitle && wp.element.createElement(
							"h3",
							null,
							wp.element.createElement(RichText.Content, { value: item.title })
						),
						wp.element.createElement(
							"a",
							{ href: item.linkUrl, target: item.target, "data-event": item.event, rel: item.target ? 'noopener noreferrer' : '' },
							wp.element.createElement(ResponsiveImage, {
								attr: attributes,
								keys: imageKeys.image,
								index: index,
								isTemplate: states.isTemplate
							})
						)
					);
				}),
				states.doLoop && '[/loop_template]'
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
