registerBlockType('catpow/simpletable', {
	title: '🐾 SimpleTable',
	description: '見出しと本文の２列で構成されるシンプルなテーブルです。',
	icon: 'editor-table',
	category: 'catpow',

	transforms: {
		from: [{
			type: 'block',
			blocks: CP.tableConvertibles,
			isMatch: function isMatch(attributes) {
				return attributes.rows[0].cells.length === 2;
			},
			transform: function transform(attributes) {
				attributes.classes = "wp-block-catpow-simpletable spec";
				return createBlock('catpow/simpletable', attributes);
			}
		}]
	},
	attributes: {
		classes: { source: 'attribute', selector: 'table', attribute: 'class', default: 'wp-block-catpow-simpletable spec' },
		rows: {
			source: 'query',
			selector: 'table tr',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				cond: { source: 'attribute', attribute: 'data-refine-cond' },
				cells: {
					source: 'query',
					selector: 'th,td',
					query: {
						text: { source: 'children' },
						classes: { source: 'attribute', attribute: 'class' },
						style: { source: 'attribute', attribute: 'style' }
					}
				}
			},
			default: [{ classes: '', cells: [{ text: ['Title'], classes: '' }, { text: ['Content'], classes: '' }] }, { classes: '', cells: [{ text: ['Title'], classes: '' }, { text: ['Content'], classes: '' }] }, { classes: '', cells: [{ text: ['Title'], classes: '' }, { text: ['Content'], classes: '' }] }]
		},
		blockState: { type: 'object', default: { enableBlockFormat: true } }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var classes = attributes.classes,
		    rows = attributes.rows;


		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			values: ['spec', 'info', 'history', 'inputs'],
			item: {
				spec: [{ label: '種別', values: {
						normal: 'なし',
						important: '重要',
						caution: '注意'
					} }],
				inputs: [{ label: '種別', values: {
						normal: 'なし',
						required: '必須',
						optional: '任意',
						readonly: '固定'
					} }, 'cond']
			}
		}];

		var saveItems = function saveItems() {
			setAttributes({ rows: JSON.parse(JSON.stringify(rows)) });
		};
		return [wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.simpletable || {}
			}),
			wp.element.createElement(SelectItemClassPanel, {
				title: '\u884C',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: rows,
				index: attributes.currentItemIndex,
				triggerClasses: selectiveClasses[0],
				filters: CP.filters.simpletable || {}
			}),
			wp.element.createElement(ItemControlInfoPanel, null)
		), wp.element.createElement(
			'table',
			{ className: classes },
			wp.element.createElement(
				'tbody',
				null,
				rows.map(function (row, index) {
					return wp.element.createElement(
						Item,
						{
							tag: 'tr',
							set: setAttributes,
							attr: attributes,
							items: rows,
							itemskey: 'rows',
							index: index,
							isSelected: isSelected
						},
						wp.element.createElement(
							'th',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									row.cells[0].text = text;saveItems();
								},
								value: row.cells[0].text
							})
						),
						wp.element.createElement(
							'td',
							null,
							wp.element.createElement(RichText, {
								onChange: function onChange(text) {
									row.cells[1].text = text;saveItems();
								},
								value: row.cells[1].text
							})
						)
					);
				})
			)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var classes = attributes.classes,
		    rows = attributes.rows;

		return wp.element.createElement(
			'table',
			{ className: classes },
			wp.element.createElement(
				'tbody',
				null,
				rows.map(function (row, index) {
					return wp.element.createElement(
						'tr',
						{ className: row.classes, 'data-refine-cond': row.cond },
						wp.element.createElement(
							'th',
							{ className: row.cells[0].classes },
							wp.element.createElement(RichText.Content, { value: row.cells[0].text })
						),
						wp.element.createElement(
							'td',
							{ className: row.cells[1].classes },
							wp.element.createElement(RichText.Content, { value: row.cells[1].text })
						)
					);
				})
			)
		);
	}
});
