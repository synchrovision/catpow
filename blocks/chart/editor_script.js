registerBlockType('catpow/chart', {
	title: '🐾 Chart',
	description: 'グラフを表示します。',
	icon: 'chart-bar',
	category: 'catpow',
	attributes: {
		classes: { source: 'attribute', selector: 'div', attribute: 'class', default: 'wp-block-catpow-chart BarChart' },
		graph: {
			source: 'query',
			selector: 'svg',
			query: {
				title: { source: 'text', selector: 'g.ChartText text.title' },
				unit: { source: 'text', selector: 'g.ChartText text.unit' },
				rowTitle: { source: 'text', selector: 'g.ChartText text.rowTitle' },
				rowUnit: { source: 'text', selector: 'g.ChartText text.rowUnit' },
				total: { source: 'attribute', selector: 'data-total' },
				rows: {
					source: 'query',
					selector: 'g.graph g.row',
					query: {
						classes: { source: 'attribute', attribute: 'class' },
						label: { source: 'attribute', attribute: 'data-label' },
						vals: {
							source: 'query',
							selector: '.val',
							query: {
								value: { source: 'attribute', attribute: 'data-value' }
							}
						}
					}
				},
				cols: {
					source: 'query',
					selector: 'g.graph g.col',
					query: {
						classes: { source: 'attribute', attribute: 'class' },
						label: { source: 'attribute', attribute: 'data-label' }
					}
				}
			},
			default: [{
				title: '男女比',
				unit: '%',
				rowTitle: '日数',
				rowUnit: '日',
				rows: [{ classes: 'row weak', label: '1', vals: [{ value: 30 }, { value: 40 }] }, { classes: 'row normal', label: '2', vals: [{ value: 40 }, { value: 60 }] }, { classes: 'row strong', label: '3', vals: [{ value: 50 }, { value: 80 }] }, { classes: 'row strong', label: '4', vals: [{ value: 60 }, { value: 100 }] }],
				cols: [{ classes: 'col color1', label: '男性' }, { classes: 'col color2', label: '女性' }]
			}]
		}
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var classes = attributes.classes,
		    graph = attributes.graph;

		var primaryClass = 'wp-block-catpow-chart';
		var classArray = _.uniq((className + ' ' + classes).split(' '));
		var classNameArray = className.split(' ');

		var states = {
			hasTitle: false,
			hasTitleCaption: false,
			hasText: false,
			hasBackgroundImage: false
		};

		var selectiveClasses = [{
			label: 'タイプ',
			filter: 'type',
			values: {
				BarChart: '棒グラフ',
				PieChart: '円グラフ',
				LineChart: '折れ線グラフ',
				RadarChart: 'レーダーチャート'
			}
		}];
		var type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);

		var graphCopy = jQuery.extend(true, {}, graph[0]);

		var hasClass = function hasClass(cls) {
			return classArray.indexOf(cls) !== -1;
		};
		Object.keys(states).forEach(function (key) {
			this[key] = hasClass(key);
		}, states);

		var DataTable = function DataTable() {
			return wp.element.createElement(
				'div',
				{ className: 'dataTable' },
				wp.element.createElement(
					'table',
					null,
					wp.element.createElement(
						'thead',
						null,
						wp.element.createElement(
							'tr',
							null,
							wp.element.createElement(
								'th',
								{ colSpan: graphCopy.cols.length + 1 },
								wp.element.createElement(TextControl, {
									onChange: function onChange(label) {
										graphCopy.label = label;
										setAttributes({ graph: graphCopy });
									},
									value: graphCopy.label,
									placeholder: '\u30BF\u30A4\u30C8\u30EB'
								})
							)
						),
						wp.element.createElement(
							'tr',
							null,
							wp.element.createElement('th', null),
							graphCopy.cols.map(function (col, c) {
								return wp.element.createElement(
									'th',
									null,
									wp.element.createElement(TextControl, {
										onChange: function onChange(label) {
											col.label = label;
											setAttributes({ graph: graphCopy });
										},
										value: col.label,
										placeholder: '項目' + (c + 1)
									})
								);
							})
						)
					),
					wp.element.createElement(
						'tbody',
						null,
						graphCopy.rows.map(function (row, r) {
							return wp.element.createElement(
								'tr',
								null,
								wp.element.createElement(
									'th',
									null,
									wp.element.createElement(TextControl, {
										onChange: function onChange(label) {
											row.label = label;
											setAttributes({ graph: graphCopy });
										},
										value: row.label,
										placeholder: '項目' + (r + 1)
									})
								),
								row.vals.map(function (val, c) {
									return wp.element.createElement(
										'td',
										null,
										wp.element.createElement(TextControl, {
											onChange: function onChange(val) {
												val.value = val;
												setAttributes({ graph: graphCopy });
											},
											value: val.value,
											placeholder: '値' + (c + 1)
										})
									);
								})
							);
						})
					)
				)
			);
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
				filters: CP.filters.chart || {}
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
			)
		), wp.element.createElement(
			'div',
			{ className: classes },
			el(Catpow[type + 'Output'], graphCopy)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className;
		var classes = attributes.classes,
		    graph = attributes.graph;

		var classArray = _.uniq(attributes.classes.split(' '));

		var selectiveClasses = [{
			label: 'タイプ',
			values: {
				BarChart: '棒グラフ',
				PieChat: '円グラフ',
				LineChart: '折れ線グラフ',
				RadarChart: 'レーダーチャート'
			}
		}];
		var type = CP.getSelectiveClass({ attr: attributes }, selectiveClasses[0].values);

		var states = {
			hasTitle: false,
			hasTitleCaption: false,
			hasText: false,
			hasBackgroundImage: false
		};

		var hasClass = function hasClass(cls) {
			return classArray.indexOf(cls) !== -1;
		};
		Object.keys(states).forEach(function (key) {
			this[key] = hasClass(key);
		}, states);
		return wp.element.createElement(
			'div',
			{ className: classes },
			el(Catpow[type + 'Output'], graph[0])
		);
	}
});
