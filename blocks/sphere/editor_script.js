CP.config.sphere = {
	imageKeys: {
		image: { src: "src", alt: "alt", items: "items" }
	}
};
registerBlockType('catpow/sphere', {
	title: '🐾 Sphere',
	description: 'ログイン中のユーザーの情報を表示するためのコンテナです。',
	icon: 'image-filter',
	category: 'catpow',
	transforms: {
		from: [{
			type: 'block',
			blocks: CP.listedConvertibles,
			transform: function transform(attributes) {
				attributes.classes = 'wp-block-catpow-sphere medium hasSubTitle hasText';
				return createBlock('catpow/sphere', attributes);
			}
		}]
	},
	attributes: {
		version: { type: 'number', default: 0 },
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-sphere' },
		items: {
			source: 'query',
			selector: 'li.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				subImageSrc: { source: 'attribute', selector: '.contents .image [src]', attribute: 'src' },
				subImageAlt: { source: 'attribute', selector: '.contents .image [src]', attribute: 'alt' },
				subTitle: { source: 'children', selector: '.contents h4' },
				text: { source: 'children', selector: '.contents p' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
				return {
					classes: 'item',
					title: ['Title'],
					titleCaption: ['Caption'],
					subTitle: ['SubTitle'],
					src: cp.theme_url + '/images/dummy_icon.svg',
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

		var primaryClass = 'wp-block-catpow-sphere';

		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.sphere.imageKeys;


		var selectiveClasses = [{ label: 'サイズ', filter: 'size', values: ['small', 'medium', 'large'] }, { label: '画像', values: 'hasSubImage' }, { label: 'タイトル', values: 'hasSubTitle' }, { label: 'テキスト', values: 'hasText' }];

		var rtn = [];
		var save = function save() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		items.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			rtn.push(wp.element.createElement(
				CP.Item,
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
					{ "class": "contents" },
					states.hasSubImage && wp.element.createElement(
						"div",
						{ className: "image" },
						wp.element.createElement(CP.SelectResponsiveImage, {
							attr: attributes,
							set: setAttributes,
							keys: imageKeys.subImage,
							index: index,
							size: "medium"
						})
					),
					states.hasSubTitle && wp.element.createElement(
						"h4",
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(subTitle) {
								items[index].subTitle = subTitle;save();
							},
							value: item.subTitle,
							placeholder: "SubTitle"
						})
					),
					states.hasText && wp.element.createElement(
						"p",
						null,
						wp.element.createElement(RichText, {
							onChange: function onChange(text) {
								items[index].text = text;save();
							},
							value: item.text
						})
					)
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
			wp.element.createElement(CP.SelectClassPanel, {
				title: "\u30AF\u30E9\u30B9",
				icon: "art",
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses
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
			wp.element.createElement(CP.SelectClassPanel, {
				title: "\u30A2\u30A4\u30C6\u30E0",
				icon: "edit",
				set: setAttributes,
				attr: attributes,
				items: items,
				index: attributes.currentItemIndex,
				selectiveClasses: ['color']
			}),
			wp.element.createElement(CP.ItemControlInfoPanel, null)
		), wp.element.createElement(
			"ul",
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


		var states = CP.wordsToFlags(classes);
		var imageKeys = CP.config.sphere.imageKeys;


		var rtn = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				"li",
				{ className: item.classes },
				wp.element.createElement(
					"div",
					{ "class": "contents" },
					states.hasSubImage && wp.element.createElement(
						"div",
						{ className: "image" },
						wp.element.createElement("img", { src: item.subImageSrc, alt: item.subImageAlt })
					),
					states.hasSubTitle && wp.element.createElement(
						"h4",
						null,
						wp.element.createElement(RichText.Content, { value: item.subTitle })
					),
					states.hasText && wp.element.createElement(
						"p",
						null,
						wp.element.createElement(RichText.Content, { value: item.text })
					)
				)
			));
		});
		return wp.element.createElement(
			"ul",
			{ className: classes },
			rtn
		);
	}
});
