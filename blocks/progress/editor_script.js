registerBlockType('catpow/progress', {
	title: '🐾 Progress',
	description: '進捗のブロックです。',
	icon: 'editor-ul',
	category: 'catpow',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var _wp$element = wp.element,
		    useMemo = _wp$element.useMemo,
		    useCallback = _wp$element.useCallback;
		var _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items,
		    classes = attributes.classes,
		    currentItemIndex = attributes.currentItemIndex;

		var primaryClass = 'wp-block-catpow-progress';

		var states = CP.wordsToFlags(classes);

		var selectiveClasses = useMemo(function () {
			return [{ input: 'range', label: '進捗', min: 0, max: items.length - 1, key: 'progress' }, { label: '番号', values: 'hasCounter', sub: [{ input: 'text', label: '番号前置テキスト', key: 'countPrefix' }, { input: 'text', label: '番号後置テキスト', key: 'countSuffix' }] }];
		}, [items.length]);

		var save = useCallback(function () {
			setAttributes({ items: JSON.parse(JSON.stringify(attributes.items)) });
		}, [setAttributes, attributes]);

		var Items = useCallback(function (props) {
			var countPrefix = attributes.countPrefix,
			    countSuffix = attributes.countSuffix;

			var states = CP.wordsToFlags(attributes.classes);
			return attributes.items.map(function (item, index) {
				return wp.element.createElement(
					CP.Item,
					{
						tag: 'li',
						className: index == attributes.progress ? 'active' : '',
						set: setAttributes,
						attr: attributes,
						items: attributes.items,
						index: index
					},
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
						{ className: 'label' },
						wp.element.createElement(RichText, {
							onChange: function onChange(label) {
								item.label = label;save();
							},
							value: item.label
						})
					)
				);
			});
		}, [setAttributes, attributes]);

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(CP.SelectModeToolbar, {
				set: setAttributes,
				attr: attributes
			}),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(CP.SelectClassPanel, {
					title: '\u30AF\u30E9\u30B9',
					icon: 'art',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.progress || {}
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
				wp.element.createElement(CP.ItemControlInfoPanel, null)
			),
			wp.element.createElement(
				Fragment,
				null,
				wp.element.createElement(
					'div',
					{ className: classes },
					wp.element.createElement(
						'ul',
						{ className: 'items' },
						wp.element.createElement(Items, null)
					)
				)
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var _wp$element2 = wp.element,
		    useMemo = _wp$element2.useMemo,
		    useCallback = _wp$element2.useCallback;
		var _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes;


		var Items = function Items(props) {
			var countPrefix = attributes.countPrefix,
			    countSuffix = attributes.countSuffix;

			var states = CP.wordsToFlags(attributes.classes);
			return attributes.items.map(function (item, index) {
				return wp.element.createElement(
					'li',
					{ className: 'item' + (index == attributes.progress ? ' active' : '') },
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
						{ className: 'label' },
						wp.element.createElement(RichText.Content, { value: item.label })
					)
				);
			});
		};

		return wp.element.createElement(
			'div',
			{ className: classes, 'data-progress': attributes.progress },
			wp.element.createElement(
				'ul',
				{ className: 'items' },
				wp.element.createElement(Items, null)
			)
		);
	}
});
