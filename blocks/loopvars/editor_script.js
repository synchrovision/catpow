registerBlockType('catpow/loopvars', {
	title: '🐾 LoopVars',
	description: 'ブロックの内容を変数のテーブルをループして表示します。各変数はブロック内で[var 変数名]のショートコードで利用できます。',
	icon: 'editor-code',
	category: 'catpow-functional',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    className = _ref.className;
		var items = attributes.items,
		    columns = attributes.columns,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode;


		console.log(columns);

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(SelectModeToolbar, {
				set: setAttributes,
				attr: attributes
			}),
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
					columns: columns
				})
			) : wp.element.createElement(
				'div',
				{ className: "embedded_content" },
				wp.element.createElement(
					'div',
					{ className: 'label' },
					'LoopVars'
				),
				wp.element.createElement(InnerBlocks, { template: [['catpow/section', { title: '[var title]' }, [['core/paragraph', { content: '[var text]' }]]]] })
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					PanelBody,
					{ title: '\u5909\u6570' },
					wp.element.createElement(EditItemsTable, {
						set: setAttributes,
						attr: attributes,
						itemsKey: 'columns',
						columns: [{ type: 'text', key: 'type' }, { type: 'text', key: 'key' }]
					})
				)
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
