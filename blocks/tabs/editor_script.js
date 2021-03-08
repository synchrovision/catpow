registerBlockType('catpow/tabs', {
	title: '🐾 Tabs',
	description: 'タブによる表示切り替えのブロックです。',
	icon: 'editor-code',
	category: 'catpow',
	attributes: {
		classes: { source: 'attribute', selector: 'div', attribute: 'class', default: 'wp-block-catpow-tabs left' },
		items: {
			source: 'query',
			selector: 'ul.tab li.item',
			query: {
				title: { source: 'children', selector: 'h3' }
			},
			default: [].concat(babelHelpers.toConsumableArray(Array(3))).map(function () {
				return { title: ['title'] };
			})
		}
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var classes = attributes.classes,
		    items = attributes.items;

		var primaryClass = 'wp-block-catpow-tabs';

		var template = [],
		    realTabs = [];
		for (var i = 0; i < items.length; i++) {
			template.push(['catpow/tabscontent']);
		}

		var itemsCopy = items.map(function (obj) {
			return jQuery.extend(true, {}, obj);
		});
		var rtn = [];

		var currentIndex = attributes.currentIndex || 0;

		itemsCopy.map(function (item, index) {
			var className = currentIndex == index ? 'active' : currentIndex > index ? 'before' : 'after';
			rtn.push(wp.element.createElement(
				CP.Item,
				{
					tag: 'li',
					className: className,
					set: setAttributes,
					attr: attributes,
					items: itemsCopy,
					index: index,
					isSelected: isSelected
				},
				wp.element.createElement(
					'h3',
					{ onClick: function onClick() {
							setAttributes({ currentIndex: index });
						} },
					wp.element.createElement(RichText, {
						onChange: function onChange(title) {
							itemsCopy[index].title = title;setAttributes({ items: itemsCopy });
						},
						value: item.title
					})
				)
			));
		});

		return [wp.element.createElement(
			'div',
			{ className: classes, 'data-current-index': currentIndex },
			wp.element.createElement(
				'ul',
				{ 'class': 'tab' },
				rtn
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(InnerBlocks, {
					template: template,
					templateLock: 'all'
				})
			)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;
		var classes = attributes.classes,
		    items = attributes.items;


		var rtn = [];
		items.map(function (item, index) {
			rtn.push(wp.element.createElement(
				'li',
				{ className: 'item' },
				wp.element.createElement(
					'h3',
					null,
					wp.element.createElement(RichText.Content, { value: item.title })
				)
			));
		});

		return wp.element.createElement(
			'div',
			{ className: classes },
			wp.element.createElement(
				'ul',
				{ 'class': 'tab' },
				rtn
			),
			wp.element.createElement(
				'div',
				{ 'class': 'contents' },
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});

registerBlockType('catpow/tabscontent', {
	title: '🐾 TabsContent',
	icon: 'editor-code',
	category: 'catpow',
	parent: ['catpow/tabs'],
	edit: function edit(_ref3) {
		var attributes = _ref3.attributes,
		    className = _ref3.className,
		    setAttributes = _ref3.setAttributes;

		return [wp.element.createElement(
			'div',
			{ className: 'tabs_content' },
			wp.element.createElement(InnerBlocks, { template: [['catpow/section']], templateLock: false })
		)];
	},
	save: function save(_ref4) {
		var attributes = _ref4.attributes,
		    className = _ref4.className,
		    setAttributes = _ref4.setAttributes;

		return wp.element.createElement(
			'div',
			{ className: 'tabs_content' },
			wp.element.createElement(InnerBlocks.Content, null)
		);
	}
});
