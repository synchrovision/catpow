registerBlockType('catpow/formblock', {
	title: '🐾 FormBlock',
	description: 'テーマに定義された編集可能なフォームを表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    className = _ref.className,
		    isSelected = _ref.isSelected,
		    clientId = _ref.clientId;
		var content_path = attributes.content_path,
		    inputs = attributes.inputs,
		    data_id = attributes.data_id,
		    values = attributes.values,
		    actions = attributes.actions,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode;


		var postDataSelection = false;

		if (!actions && content_path) {
			var path = content_path.substr(0, content_path.lastIndexOf('/'));
			wp.apiFetch({ path: 'cp/v1/' + path + '/actions' }).then(function (actions) {
				Object.keys(actions).map(function (key) {
					return actions[key].json = 'action';
				});
				setAttributes({ actions: actions });
			});
		}

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				BlockControls,
				null,
				wp.element.createElement(Toolbar, {
					controls: [{
						icon: 'edit',
						title: 'EditMode',
						isActive: EditMode,
						onClick: function onClick() {
							return setAttributes({ EditMode: !EditMode });
						}
					}]
				})
			),
			wp.element.createElement(
				'div',
				{ 'class': "formBlock embedded_content" + (EditMode ? ' editMode' : '') },
				wp.element.createElement(
					'div',
					{ 'class': 'label' },
					content_path || 'not selected'
				),
				wp.element.createElement(InnerBlocks, {
					allowedBlocks: ['catpow/formblockcontent']
				})
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					PanelBody,
					{ title: '\u30D5\u30A9\u30FC\u30E0' },
					wp.element.createElement(TreeSelect, {
						label: 'path',
						selectedId: content_path,
						tree: cpEmbeddablesTree.formblock,
						onChange: function onChange(content_path) {
							var path = content_path.substr(0, content_path.lastIndexOf('/'));
							wp.apiFetch({ path: 'cp/v1/' + path + '/template' }).then(function (template) {
								wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, CP.createBlocks(template));
							});
							setAttributes({ content_path: content_path, actions: null });
						}
					})
				),
				wp.element.createElement(
					PanelBody,
					{ title: '\u5165\u529B\u5024', initialOpen: false },
					wp.element.createElement(TextControl, {
						label: '\u5165\u529B\u540D',
						value: inputs,
						onChange: function onChange(inputs) {
							setAttributes({ inputs: inputs });
						}
					}),
					wp.element.createElement(TextControl, {
						label: '\u30C7\u30FC\u30BFID',
						value: data_id,
						onChange: function onChange(data_id) {
							setAttributes({ data_id: data_id });
						}
					}),
					wp.element.createElement(TextareaControl, {
						label: '\u521D\u671F\u5024',
						value: values,
						onChange: function onChange(values) {
							setAttributes({ values: values });
						}
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

registerBlockType('catpow/formblockcontent', {
	title: '🐾 FormBlockContent',
	icon: 'editor-code',
	category: 'catpow',
	parent: ['catpow/formblock'],
	attributes: {
		name: { type: 'attribute', label: '名前', selector: 'formBlockContent', attribute: 'name', default: 'edit' },
		action: { type: 'attribute', label: 'アクション', selector: 'formBlockContent', attribute: 'action', default: '{}' }
	},
	edit: function edit(_ref3) {
		var attributes = _ref3.attributes,
		    className = _ref3.className,
		    setAttributes = _ref3.setAttributes,
		    clientId = _ref3.clientId;
		var name = attributes.name;


		var parentClientId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, 'catpow/formblock')[0];
		var parentBlock = wp.data.select('core/block-editor').getBlock(parentClientId);
		var actions = parentBlock.attributes.actions;

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'div',
				{ className: 'formBlockContent embedded_content' },
				wp.element.createElement(
					'div',
					{ 'class': 'label' },
					name
				),
				wp.element.createElement(InnerBlocks, { template: [['catpow/section']], templateLock: false })
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					PanelBody,
					{ title: '\u8A2D\u5B9A', initialOpen: true },
					wp.element.createElement(TextControl, {
						label: '\u540D\u524D',
						value: name,
						onChange: function onChange(name) {
							setAttributes({ name: name });
						}
					})
				),
				actions && wp.element.createElement(CP.SelectClassPanel, {
					title: '\u30A2\u30AF\u30B7\u30E7\u30F3',
					icon: 'edit',
					set: setAttributes,
					attr: attributes,
					selectiveClasses: actions,
					initialOpen: true
				})
			)
		);
	},
	save: function save(_ref4) {
		var attributes = _ref4.attributes,
		    className = _ref4.className,
		    setAttributes = _ref4.setAttributes;
		var name = attributes.name,
		    action = attributes.action;

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'formBlockContent',
				{ name: name, action: action },
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
