registerBlockType('catpow/pricelist', {
	title: '🐾 PriceList',
	description: '価格表のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	attributes: {
		classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-pricelist' },
		items: {
			source: 'query',
			selector: 'li.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				imageSrc: { source: 'attribute', selector: '.image [src]', attribute: 'src' },
				imageAlt: { source: 'attribute', selector: '.image [src]', attribute: 'alt' },
				imageCode: { source: 'text', selector: '.image' },
				title: { source: 'children', selector: '.title' },
				caption: { source: 'children', selector: '.caption' },
				price: { source: 'children', selector: '.price' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function (n, i) {
				return {
					classes: 'item hasCaption level' + (i + 1),
					imageSrc: cp.theme_url + '/images/dummy.jpg',
					imageAlt: 'dummy',
					imageCode: '',
					title: ['Product'],
					caption: ['caption'],
					price: ['¥0,000']
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
		    loopParam = attributes.loopParam,
		    loopCount = attributes.loopCount;

		var primaryClass = 'wp-block-catpow-pricelist';

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ label: 'ループ', values: 'doLoop', sub: [{ label: 'パラメータ', input: 'text', key: 'loopParam' }, { label: 'ループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];
		var itemSelectiveClasses = [{ label: '見出し', values: 'isHeading' }, { label: 'レベル', values: { level1: '1', level2: '2', level3: '3' } }, { label: '画像', values: 'hasImage' }, { label: 'キャプション', values: 'hasCaption' }];

		var rtn = [];
		var imageKeys = {
			image: { src: "imageSrc", alt: "imageAlt", items: "items" }
		};
		var save = function save() {
			setAttibutes({ items: JSON.parse(JSON.stringify(items)) });
		};

		items.map(function (item, index) {
			if (!item.controlClasses) {
				item.controlClasses = 'control';
			}
			var itemStates = CP.wordsToFlags(item.classes);
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
				itemStates.hasImage && wp.element.createElement(
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
					'div',
					{ className: 'title' },
					wp.element.createElement(RichText, {
						onChange: function onChange(title) {
							item.title = title;save();
						},
						value: item.title
					})
				),
				!itemStates.isHeading && wp.element.createElement(
					Fragment,
					null,
					wp.element.createElement('div', { className: 'line' }),
					wp.element.createElement(
						'div',
						{ className: 'price' },
						wp.element.createElement(RichText, {
							onChange: function onChange(price) {
								item.price = price;save();
							},
							value: item.price
						})
					)
				),
				itemStates.hasCaption && wp.element.createElement(
					'div',
					{ className: 'caption' },
					wp.element.createElement(RichText, {
						onChange: function onChange(caption) {
							item.caption = caption;save();
						},
						value: item.caption
					})
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
				filters: CP.filters.pricelist || {}
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
			wp.element.createElement(SelectItemClassPanel, {
				title: '\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: items,
				index: attributes.currentItemIndex,
				itemClasses: itemSelectiveClasses,
				filters: CP.filters.pricelist || {}
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
		    loopParam = attributes.loopParam,
		    loopCount = attributes.loopCount;

		var classArray = _.uniq(attributes.classes.split(' '));

		var states = CP.wordsToFlags(classes);

		var imageKeys = {
			image: { src: "imageSrc", alt: "imageAlt", items: "items" }
		};

		var rtn = [];
		items.map(function (item, index) {
			var itemStates = CP.wordsToFlags(item.classes);
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				itemStates.hasImage && wp.element.createElement(
					'div',
					{ className: 'image' },
					wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image
					})
				),
				wp.element.createElement(
					'div',
					{ className: 'title' },
					wp.element.createElement(RichText.Content, { value: item.title })
				),
				!itemStates.isHeading && wp.element.createElement(
					Fragment,
					null,
					wp.element.createElement('div', { className: 'line' }),
					wp.element.createElement(
						'div',
						{ className: 'price' },
						wp.element.createElement(RichText.Content, { value: item.price })
					)
				),
				itemStates.hasCaption && wp.element.createElement(
					'div',
					{ className: 'caption' },
					wp.element.createElement(RichText.Content, { value: item.caption })
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
