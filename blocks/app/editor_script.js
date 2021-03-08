/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/
registerBlockType('catpow/app', {
	title: '🐾 App',
	icon: 'editor-code',
	category: 'catpow-embed',
	example: CP.example,
	supports: {
		customClassName: false
	},
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    setAttributes = _ref.setAttributes,
		    className = _ref.className;
		var content_path = attributes.content_path,
		    props = attributes.props,
		    config = attributes.config;


		if (!config && content_path) {
			var path = content_path.substr(0, content_path.lastIndexOf('/'));
			wp.apiFetch({ path: 'cp/v1/' + path + '/config' }).then(function (config) {
				Object.keys(config).map(function (key) {
					return config[key].json = 'props';
				});
				setAttributes({ config: config });
			});
		}

		return [wp.element.createElement(
			'div',
			{ 'class': 'embedded_content' },
			wp.element.createElement(
				'div',
				{ 'class': 'label' },
				content_path
			),
			wp.element.createElement(ServerSideRender, { block: 'catpow/app', attributes: attributes })
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(
				PanelBody,
				{ title: 'Path' },
				wp.element.createElement(TreeSelect, {
					label: 'path',
					selectedId: content_path,
					tree: cpEmbeddablesTree.app,
					onChange: function onChange(content_path) {
						var path = content_path.substr(0, content_path.lastIndexOf('/'));
						setAttributes({ content_path: content_path, config: false, props: JSON.stringify({ path: path }) });
					}
				})
			),
			config && wp.element.createElement(CP.SelectClassPanel, {
				title: '\u8A2D\u5B9A',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: config,
				initialOpen: true
			})
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;

		return 'null';
	}
});
