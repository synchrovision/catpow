registerBlockType('catpow/switcher', {
	title: '🐾 Switcher',
	description: '日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。',
	icon: 'editor-code',
	category: 'catpow-functional',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected,
		    clientId = _ref.clientId;
		var _wp$element = wp.element,
		    useEffect = _wp$element.useEffect,
		    useRef = _wp$element.useRef;
		var _attributes$currentIn = attributes.currentIndex,
		    currentIndex = _attributes$currentIn === undefined ? 0 : _attributes$currentIn;

		var blocksToReplace = useRef([]);
		var selectiveClasses = [{
			label: 'ファクター',
			input: 'select',
			key: 'factor',
			values: {
				schedule: '日時',
				is_user_logged_in: 'ログイン',
				current_user_can: 'ユーザー権限',
				user_value: 'ユーザー情報',
				input_value: 'フォーム入力値',
				content_value: 'コンテンツ情報'
			}
		}, {
			label: 'フィールド',
			input: 'text',
			key: 'field',
			cond: ['user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1
		}, {
			label: '比較',
			input: 'buttons',
			key: 'compare',
			values: ['=', 'IN', 'BETWEEN'],
			cond: ['user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1
		}, {
			label: '値',
			input: 'textarea',
			key: 'values',
			cond: ['schedule', 'current_user_can', 'user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1,
			effect: function effect(values) {
				var editor = wp.data.dispatch('core/block-editor');
				var blocks = wp.data.select('core/block-editor').getBlock(clientId).innerBlocks;
				values = values.split("\n");
				var newBlocks = values.map(function (cond, index) {
					if (undefined === blocks[index]) {
						return wp.blocks.createBlock('catpow/switchercontent', { cond: cond });
					}
					editor.updateBlockAttributes(blocks[index].clientId, { cond: cond });
					return blocks[index];
				});
				if (blocks.length !== values.lenght) {
					blocksToReplace.current = newBlocks;
				}
			}
		}];
		var values = attributes.values.split("\n");
		useEffect(function () {
			if (blocksToReplace.current.length > 0) {
				wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, blocksToReplace.current);
				blocksToReplace.current = [];
			}
		}, [currentIndex]);
		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'div',
				{ className: 'switcherEdit', 'data-current-index': currentIndex },
				wp.element.createElement(
					'ul',
					{ className: 'tabs' },
					values.map(function (cond, index) {
						return wp.element.createElement(
							'li',
							{
								className: "tab" + (index === currentIndex ? ' active' : ''),
								onClick: function onClick() {
									setAttributes({ currentIndex: index });
								}
							},
							cond
						);
					})
				),
				wp.element.createElement(
					'div',
					{ className: 'contents' },
					wp.element.createElement(InnerBlocks, {
						template: values.map(function (cond) {
							return ['catpow/switchercontent', { cond: cond }];
						}),
						allowedBlocks: ['catpow/switchercontent']
					})
				)
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(CP.SelectClassPanel, {
					title: '\u30AF\u30E9\u30B9',
					icon: 'art',
					classKey: 'factor',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: selectiveClasses,
					filters: CP.filters.switcher || {},
					initialOpen: true
				})
			)
		);
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;

		return wp.element.createElement(InnerBlocks.Content, null);
	}
});

registerBlockType('catpow/switchercontent', {
	title: '🐾 SwitcherContent',
	icon: 'editor-code',
	category: 'catpow',
	parent: ['catpow/switcher'],
	attributes: {
		cond: { type: 'attribute', label: '条件', selector: 'switcherContent', attribute: 'cond', default: 'content' }
	},
	edit: function edit(_ref3) {
		var attributes = _ref3.attributes,
		    className = _ref3.className,
		    setAttributes = _ref3.setAttributes,
		    clientId = _ref3.clientId;
		var cond = attributes.cond;


		return wp.element.createElement(
			'div',
			{ className: 'switcherContent' },
			wp.element.createElement(InnerBlocks, { template: [['core/paragraph']], templateLock: false })
		);
	},
	save: function save(_ref4) {
		var attributes = _ref4.attributes,
		    className = _ref4.className,
		    setAttributes = _ref4.setAttributes;
		var cond = attributes.cond;

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'switcherContent',
				{ cond: cond },
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
