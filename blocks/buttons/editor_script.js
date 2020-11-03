registerBlockType('catpow/buttons', {
	title: '🐾 Buttons',
	description: 'ボタンのブロックです。',
	icon: wp.element.createElement(
		'svg',
		{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
		wp.element.createElement('path', { d: 'M19.5,11c0,2.8-2.2,5-5,5h-9c-2.8,0-5-2.2-5-5V9c0-2.8,2.2-5,5-5h9c2.8,0,5,2.2,5,5V11z M5.5,5c-2.2,0-4,1.8-4,4 c0,2.2,1.8,4,4,4h9c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H5.5z' })
	),
	category: 'catpow',
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
		    doLoop = attributes.doLoop,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode,
		    _attributes$AltMode = attributes.AltMode,
		    AltMode = _attributes$AltMode === undefined ? false : _attributes$AltMode;

		var primaryClass = 'wp-block-catpow-buttons';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = [{ label: 'サイズ', filter: 'size', values: { l: '大', m: '中', s: '小', ss: '極小' } }, { label: 'インライン', values: 'i' }, {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ input: 'bool', label: 'ループ', key: 'doLoop', sub: [{ label: 'content path', input: 'text', key: 'content_path' }, { label: 'query', input: 'textarea', key: 'query' }, { label: 'プレビューループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}];
		var itemClasses = ['color', { label: '属性', filter: 'rank', values: ['default', 'primary', 'negative', 'danger', 'secure'] }, { label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon' }] }, 'event'];

		var saveItems = function saveItems() {
			setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
		};

		var rtn = [];

		items.map(function (item, index) {
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
				wp.element.createElement(
					'div',
					{ 'class': 'button' },
					itemStates.hasIcon && wp.element.createElement(
						'span',
						{ className: 'icon' },
						wp.element.createElement('img', { src: item.iconSrc, alt: item.iconAlt })
					),
					wp.element.createElement(
						'span',
						{
							onInput: function onInput(e) {
								item.text = e.target.innerText;
							},
							onBlur: function onBlur(e) {
								saveItems();
							},
							contentEditable: 'true'
						},
						item.text
					),
					isSelected && wp.element.createElement(
						'span',
						{ 'class': 'url',
							onInput: function onInput(e) {
								item.url = e.target.innerText;
							},
							onBlur: function onBlur(e) {
								saveItems();
							},
							contentEditable: 'true'
						},
						item.url
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
				wp.element.createElement(AlignClassToolbar, { set: setAttributes, attr: attributes })
			),
			wp.element.createElement(SelectModeToolbar, {
				set: setAttributes,
				attr: attributes
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
					filters: CP.filters.buttons || {}
				}),
				wp.element.createElement(SelectClassPanel, {
					title: '\u30DC\u30BF\u30F3',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					items: items,
					index: attributes.currentItemIndex,
					selectiveClasses: itemClasses,
					filters: CP.filters.buttons || {}
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
			),
			wp.element.createElement(
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
						columns: [{ type: 'text', key: 'text', cond: true }, { type: 'text', key: 'url', cond: true }],
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

		var rtn = [];
		items.map(function (item, index) {
			var itemStates = CP.wordsToFlags(item.classes);
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				wp.element.createElement(
					'a',
					{
						href: item.url,
						className: 'button',
						'data-event': item.event
					},
					itemStates.hasIcon && wp.element.createElement(
						'span',
						{ className: 'icon' },
						wp.element.createElement('img', { src: item.iconSrc, alt: item.iconAlt })
					),
					item.text
				)
			));
		});
		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'ul',
				{ className: classes },
				rtn
			),
			doLoop && wp.element.createElement(
				'onEmpty',
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

			var rtn = [];
			items.map(function (item, index) {
				var itemStates = CP.wordsToFlags(item.classes);
				rtn.push(wp.element.createElement(
					'li',
					{ className: item.classes },
					wp.element.createElement(
						'a',
						{
							href: item.url,
							className: 'button',
							'data-event': item.event
						},
						itemStates.hasIcon && wp.element.createElement(
							'span',
							{ className: 'icon' },
							wp.element.createElement('img', { src: item.iconSrc, alt: item.iconAlt })
						),
						item.text
					)
				));
			});
			return wp.element.createElement(
				'ul',
				{ className: classes },
				states.doLoop && '[loop_template ' + loopParam + ']',
				rtn,
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
