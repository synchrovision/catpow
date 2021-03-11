registerPlugin('catpow-sidebar', { render: function render(props) {
		var _wp$element = wp.element,
		    useState = _wp$element.useState,
		    useCallback = _wp$element.useCallback,
		    useReducer = _wp$element.useReducer;

		var _useState = useState(structure),
		    _useState2 = babelHelpers.slicedToArray(_useState, 2),
		    structure = _useState2[0],
		    setStructure = _useState2[1];

		var _CP = CP,
		    DataStructure = _CP.DataStructure,
		    DataStructureItem = _CP.DataStructureItem;
		var _wp$components = wp.components,
		    Button = _wp$components.Button,
		    ButtonGroup = _wp$components.ButtonGroup;

		if (!structure) {
			wp.apiFetch({ path: '/cp/v1/config/structure' }).then(function (structure) {
				setStructure(structure);
			});
		}

		var RenderMeta = useCallback(function (_ref) {
			var meta = _ref.meta;

			return wp.element.createElement(
				DataStructure,
				null,
				meta.map(function (item) {
					return wp.element.createElement(
						DataStructureItem,
						{ title: item.label, name: item.name },
						item.meta.length && wp.element.createElement(RenderMeta, { meta: item.meta })
					);
				})
			);
		}, [props]);

		return wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(
				PluginSidebarMoreMenuItem,
				{ target: 'catpow-sidebar' },
				'\uD83D\uDC3ECatpow'
			),
			wp.element.createElement(
				PluginSidebar,
				{
					name: 'catpow-sidebar',
					title: '\uD83D\uDC3ECatpow',
					icon: wp.element.createElement(
						'svg',
						{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
						wp.element.createElement(
							'g',
							null,
							wp.element.createElement('path', { d: 'M10.1,14.5c0-0.9,0.5-1.4,1.3-1.5c0.6-0.1,1.1-0.5,1.6-0.8c0.8-0.5,2.3-0.4,3,0.1c0.4,0.3,0.8,0.6,1,1.1 c0.2,0.5,0.1,1,0.1,1.5c-0.1,0.8,0.1,1.6,0.1,2.4c0,1.3-1.4,1.7-2.3,1.4c-0.6-0.3-0.9-0.8-1.3-1.3c-0.4-0.4-0.9-0.7-1.4-0.9 c-0.8-0.3-1.7-0.6-2.1-1.6C10,14.8,10.1,14.6,10.1,14.5z' }),
							wp.element.createElement('path', { d: 'M2.8,8.6c0.3-1,0.5-2.2,0.9-3.3c0.3-0.8,1.9-1.3,2.7-1c0.9,0.3,1.7,0.9,2.5,1.4c0.5,0.3,1.1,0.5,1.4,1.1 c0.2,0.5,0.2,0.9,0,1.4c-0.6,1.2-1.7,1-2.7,1.1c-0.8,0.1-1.4,0.5-2,0.9c-0.5,0.3-1,0.5-1.6,0.4C3.2,10.2,2.7,9.7,2.8,8.6z' }),
							wp.element.createElement('path', { d: 'M4.9,2.2C4.8,2.8,4.8,3.6,4,3.9C3.5,4.1,3.2,3.8,2.9,3.5C2,2.6,2.2,1.6,2.7,0.6c0.2-0.3,0.5-0.5,0.9-0.4 c0.4,0,0.7,0.3,0.9,0.6C4.8,1.2,4.9,1.7,4.9,2.2z' }),
							wp.element.createElement('path', { d: 'M1,3.5c0.8,0,1.3,0.8,1.5,1.4c0.2,0.7,0.1,1.2-0.4,1.7C1.6,7.1,0.9,6.8,0.5,6.2C0.1,5.6,0.1,4.9,0.2,4.3 C0.2,3.8,0.4,3.4,1,3.5z' }),
							wp.element.createElement('path', { d: 'M5.8,1.8c0-1.2,0.4-1.6,1.3-1.5c0.6,0.1,1,0.6,1.1,1.2c0.1,0.8,0,1.5-0.6,2.1C7.1,4,6.7,3.7,6.5,3.4C6,3,5.7,2.4,5.8,1.8z ' }),
							wp.element.createElement('path', { d: 'M15.3,11.5c-0.7,0-1-0.3-1-1c0-0.9,0.9-1.8,1.8-1.8c0.6,0,1.1,0.6,1.1,1.3C17.2,10.7,16.3,11.5,15.3,11.5z' }),
							wp.element.createElement('path', { d: 'M17.3,12.5c0-1.1,0.3-1.5,1.1-1.5c0.8,0,1.3,0.5,1.3,1.2c0,1-0.6,1.7-1.3,1.7C17.6,13.9,17.3,13.5,17.3,12.5z' }),
							wp.element.createElement('path', { d: 'M11.6,11.8c-0.5,0.1-0.9-0.2-0.9-0.8c0-1,0.6-1.9,1.3-2c0.8,0,1.3,0.4,1.3,1.2C13.3,11.1,12.7,11.7,11.6,11.8z' }),
							wp.element.createElement('path', { d: 'M18.9,17.7c-0.7,0-1.2-0.9-1-1.5c0.2-0.4,0.1-0.8,0.4-1.2c0.3-0.3,1.2-0.3,1.4,0.1c0.4,0.8,0.3,1.7-0.3,2.4 C19.3,17.6,19.1,17.7,18.9,17.7z' }),
							wp.element.createElement('path', { d: 'M8.7,3.4c0-0.6,0.4-1.1,0.9-1.1C10.2,2.3,11,3.2,11,4c0,0.6-0.5,0.9-1.1,1C9.2,4.9,8.7,4.3,8.7,3.4z' })
						)
					)
				},
				wp.element.createElement(
					PanelBody,
					{ title: '\u30C7\u30FC\u30BF\u69CB\u9020', initialOpen: false },
					wp.element.createElement(
						DataStructure,
						null,
						structure && Object.keys(structure).map(function (data_type) {
							return wp.element.createElement(
								DataStructureItem,
								{ title: data_type },
								structure[data_type].length && wp.element.createElement(
									DataStructure,
									null,
									structure[data_type].map(function (item) {
										return wp.element.createElement(
											DataStructureItem,
											{ title: item.label, name: item.name },
											item.meta.length && wp.element.createElement(RenderMeta, { meta: item.meta })
										);
									})
								)
							);
						})
					)
				)
			)
		);
	} });
