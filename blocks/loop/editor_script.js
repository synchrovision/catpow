registerBlockType('catpow/loop', {
	title: '🐾 Loop',
	description: 'テーマに定義されたテンプレートで投稿を表示します。',
	icon: 'editor-code',
	category: 'catpow-embed',
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    className = _ref.className,
		    clientId = _ref.clientId;
		var content_path = attributes.content_path,
		    query = attributes.query,
		    config = attributes.config,
		    _attributes$EditMode = attributes.EditMode,
		    EditMode = _attributes$EditMode === undefined ? false : _attributes$EditMode;

		var configData = void 0;

		if (!config) {
			if (content_path) {
				var path = content_path.substr(0, content_path.lastIndexOf('/'));
				wp.apiFetch({ path: 'cp/v1/' + path + '/config' }).then(function (config) {
					Object.keys(config).map(function (key) {
						return config[key].json = 'config';
					});
					setAttributes({ config: JSON.stringify(config) });
				}).catch(function (res) {
					setAttributes({ config: '{}' });
				});
			}
			configData = {};
		} else {
			configData = JSON.parse(config);
		}

		return wp.element.createElement(
			Fragment,
			null,
			configData.template && wp.element.createElement(
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
			configData.template && EditMode ? wp.element.createElement(
				'div',
				{ className: 'alt_content loopContents' },
				wp.element.createElement(
					'div',
					{ 'class': 'label' },
					wp.element.createElement(Icon, { icon: 'edit' })
				),
				wp.element.createElement(InnerBlocks, {
					allowedBlocks: ['catpow/loopcontent'],
					template: configData.template,
					templateLock: configData.templateLock || "ALL"
				})
			) : wp.element.createElement(
				'div',
				{ 'class': 'embedded_content' },
				wp.element.createElement(
					'div',
					{ 'class': 'label' },
					content_path
				),
				wp.element.createElement(ServerSideRender, { block: 'catpow/loop', attributes: attributes })
			),
			wp.element.createElement(
				InspectorControls,
				null,
				wp.element.createElement(
					PanelBody,
					{ title: 'Query' },
					wp.element.createElement(TreeSelect, {
						label: 'content path',
						selectedId: content_path,
						tree: cpEmbeddablesTree.loop,
						onChange: function onChange(content_path) {
							var path = content_path.substr(0, content_path.lastIndexOf('/'));
							wp.apiFetch({ path: 'cp/v1/' + path + '/template' }).then(function (template) {
								wp.data.dispatch('core/block-editor').replaceInnerBlocks(clientId, CP.createBlocks(template));
							}).catch(function (res) {});
							setAttributes({ content_path: content_path, config: null });
						}
					}),
					content_path && content_path.substr(-8) === 'loop.php' && wp.element.createElement(TextareaControl, {
						label: 'query',
						value: query,
						onChange: function onChange(query) {
							setAttributes({ query: query });
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
	},


	deprecated: [{
		save: function save() {
			return 'null';
		}
	}]
});

registerBlockType('catpow/loopcontent', {
	title: '🐾 LoopContent',
	icon: 'editor-code',
	category: 'catpow',
	parent: ['catpow/loop'],
	attributes: {
		name: { type: 'attribute', label: '名前', selector: 'loopContent', attribute: 'name', default: 'content' }
	},
	edit: function edit(_ref3) {
		var attributes = _ref3.attributes,
		    className = _ref3.className,
		    setAttributes = _ref3.setAttributes,
		    clientId = _ref3.clientId;
		var name = attributes.name;


		var template = name == 'on_empty' ? [['core/paragraph', { align: 'center', content: 'Not Found' }]] : [['catpow/section']];

		return wp.element.createElement(
			'div',
			{ className: 'loopContent' },
			wp.element.createElement(InnerBlocks, { template: template, templateLock: false })
		);
	},
	save: function save(_ref4) {
		var attributes = _ref4.attributes,
		    className = _ref4.className,
		    setAttributes = _ref4.setAttributes;
		var name = attributes.name;

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				'loopContent',
				{ name: name },
				wp.element.createElement(InnerBlocks.Content, null)
			)
		);
	}
});
