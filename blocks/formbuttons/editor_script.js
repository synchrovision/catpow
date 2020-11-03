registerBlockType('catpow/formbuttons', {
	title: '🐾 FormButtons',
	description: 'フォーム用のボタンです。',
	icon: 'upload',
	category: 'catpow',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items,
		    _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes;

		var primaryClass = 'wp-block-catpow-formbuttons';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var selectiveClasses = [{ label: 'サイズ', filter: 'size', values: { l: '大', m: '中', s: '小', ss: '極小' } }, { label: 'インライン', values: 'i' }];
		var itemClasses = ['color', { label: '属性', filter: 'rank', values: ['default', 'primary', 'negative', 'danger', 'secure'] }, { label: 'アイコン', values: 'hasIcon', sub: [{ input: 'icon' }] }, 'event'];

		var saveItems = function saveItems() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var rtn = [];

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
							onBlur: saveItems,
							contentEditable: 'true'
						},
						item.text
					),
					wp.element.createElement(
						'span',
						{ 'class': 'action',
							onInput: function onInput(e) {
								item.action = e.target.innerText;
							},
							onBlur: saveItems,
							contentEditable: 'true'
						},
						item.action
					)
				)
			));
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}

		return [wp.element.createElement(
			'ul',
			{ className: classes },
			rtn
		), wp.element.createElement(
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
		), wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(AlignClassToolbar, { set: setAttributes, attr: attributes })
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var _attributes$items2 = attributes.items,
		    items = _attributes$items2 === undefined ? [] : _attributes$items2,
		    _attributes$classes2 = attributes.classes,
		    classes = _attributes$classes2 === undefined ? '' : _attributes$classes2;

		var classArray = _.uniq(classes.split(' '));

		var rtn = [];
		items.map(function (item, index) {
			var itemStates = CP.wordsToFlags(item.classes);
			rtn.push(wp.element.createElement(
				'li',
				{ className: item.classes },
				wp.element.createElement(
					'div',
					{
						className: 'button',
						'data-action': item.action,
						'data-target': item.target,
						'ignore-message': item.ignoreMessage,
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
			rtn
		);
	},

	deprecated: [{
		attributes: {
			version: { type: 'number', default: 0 },
			classes: { source: 'attribute', selector: 'ul', attribute: 'class', default: 'wp-block-catpow-formbuttons buttons' },
			items: {
				source: 'query',
				selector: 'li.item',
				query: {
					classes: { source: 'attribute', attribute: 'class' },
					event: { source: 'attribute', attribute: 'data-event' },
					button: { source: 'text' }
				},
				default: [{ classes: 'item', button: '[button 送信 send]' }]
			}
		},
		save: function save(_ref3) {
			var attributes = _ref3.attributes,
			    className = _ref3.className;
			var _attributes$items3 = attributes.items,
			    items = _attributes$items3 === undefined ? [] : _attributes$items3,
			    _attributes$classes3 = attributes.classes,
			    classes = _attributes$classes3 === undefined ? '' : _attributes$classes3;

			var classArray = _.uniq(classes.split(' '));

			var rtn = [];
			items.map(function (item, index) {
				rtn.push(wp.element.createElement(
					'li',
					{ className: item.classes, 'data-event': item.event },
					item.button
				));
			});
			return wp.element.createElement(
				'ul',
				{ className: classes },
				rtn
			);
		},
		migrate: function migrate(attributes) {
			var _attributes$items4 = attributes.items,
			    items = _attributes$items4 === undefined ? [] : _attributes$items4;

			var parseButtonShortCode = function parseButtonShortCode(code) {
				var matches = code.match(/^\[button ([^ ]+) ([^ ]+)( ignore_message\=1)?\]$/);
				if (matches) {
					var rtn = { content: matches[1], action: matches[2] };
					if (matches[3]) {
						rtn.ignore_message = 1;
					}
					return rtn;
				}
				return { content: '送信' };
			};
			items.map(function (item) {
				var buttonData = parseButtonShortCode(item.button);
				item.action = buttonData.action;
				item.text = buttonData.content;
				item.ignore_message = buttonData.ignore_message;
			});
			return attributes;
		}
	}]
});
