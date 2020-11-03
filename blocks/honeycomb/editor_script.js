registerBlockType('catpow/honeycomb', {
	title: '🐾 honeycomb',
	description: '六角形のパネルをレイアウトします。',
	icon: wp.element.createElement(
		'svg',
		{ viewBox: '0 0 512 512' },
		wp.element.createElement('path', { d: 'M282.6,176.3l71.7,41.4v82.8l-71.7,41.4L211,300.4v-82.8L282.6,176.3 M282.6,168l-78.9,45.5v91.1l78.9,45.5l78.9-45.5 v-91.1L282.6,168L282.6,168z' }),
		wp.element.createElement('polygon', { points: '120.9,357 120.9,448 199.7,493.6 278.6,448 278.6,357 199.7,311.5 \t' }),
		wp.element.createElement('polygon', { points: '30.9,214 30.9,305 109.7,350.6 188.6,305 188.6,214 109.7,168.5 \t' }),
		wp.element.createElement('polygon', { points: '117.9,65 117.9,156 196.7,201.6 275.6,156 275.6,65 196.7,19.5 \t' }),
		wp.element.createElement('polygon', { points: '290.4,357.9 290.4,449 369.3,494.5 448.1,449 448.1,357.9 369.3,312.4 \t' })
	),
	category: 'catpow',
	attributes: {
		id: { source: 'attribute', selector: '.wp-block-catpow-honeycomb', attribute: 'id', default: '' },
		classes: { source: 'attribute', selector: '.wp-block-catpow-honeycomb', attribute: 'class', default: 'wp-block-catpow-honeycomb hasBaseImage' },
		breakpoints: { source: 'attribute', selector: '.wp-block-catpow-honeycomb', 'attribute': 'data-breakpoints', default: '480,960' },
		grid: { source: 'attribute', selector: '.wp-block-catpow-honeycomb', 'attribute': 'data-grid', default: '4 6,6 4,8 3' },
		items: {
			source: 'query',
			selector: '.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				order: { source: 'attribute', 'attribute': 'data-order' },
				src: { source: 'attribute', selector: 'svg image', attribute: 'href' },
				title: { source: 'children', selector: '.title' },
				text: { source: 'children', selector: '.text' }
			},
			default: [{
				classes: 'item hasImage hasTitle hasText',
				order: '2 2 2 1,2 2 2 1,2 2 2 1',
				src: cp.theme_url + '/images/dummy.jpg',
				title: ['Title'],
				text: ['Text']
			}]
		},
		bp: { source: 'attribute', default: '0' }
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var id = attributes.id,
		    classes = attributes.classes,
		    _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items;
		var breakpoints = attributes.breakpoints,
		    grid = attributes.grid;


		if (!id) {
			setAttributes({ id: 'hnc' + new Date().getTime().toString(16) });
		}
		if (undefined == attributes.bp) {
			setAttributes({ bp: breakpoints[0] });
		}

		breakpoints = breakpoints.split(',');
		breakpoints.unshift('0');
		grid = grid.split(',').map(function (val) {
			return val.split(' ');
		});
		var bpIndex = breakpoints.indexOf(attributes.bp);
		if (bpIndex < 0) {
			setAttributes({ bp: breakpoints[0] });
		}
		var currentGrid = grid[bpIndex];

		var cssDatas = {};

		breakpoints.map(function (bp, bpIndex) {
			cssDatas[bp] = babelHelpers.defineProperty({}, '#' + id, CP.createGridStyleCodeData(grid[bpIndex]));
		});

		var states = CP.wordsToFlags(classes);
		var imageKeys = {
			image: { src: "src", items: "items" }
		};
		var selectiveClasses = [];
		var selectiveItemClasses = ['color', { label: '画像', values: 'hasImage', sub: [{ input: 'image', keys: imageKeys.image }] }, { label: 'タイトル', values: 'hasTitle' }, { label: 'テキスト', values: 'hasText' }];

		var tgtItem = false;

		var itemHandler = [wp.element.createElement(
			'div',
			{ className: 'handler move', 'data-drawaction': 'move' },
			wp.element.createElement(Icon, { icon: 'move' })
		), wp.element.createElement(
			'div',
			{ className: 'handler clone', 'data-drawaction': 'clone' },
			wp.element.createElement(Icon, { icon: 'plus-alt' })
		), wp.element.createElement(
			'div',
			{ className: 'handler delete', 'data-drawaction': 'delete' },
			wp.element.createElement(Icon, { icon: 'dismiss' })
		)];

		var save = function save() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(SelectBreakPointToolbar, {
				breakpoints: breakpoints,
				value: attributes.bp,
				onChange: function onChange(bp) {
					return setAttributes({ bp: bp });
				}
			})
		), wp.element.createElement(
			Catpow.DrawArea,
			{
				id: id,
				className: classes,
				onCatch: function onCatch(e) {
					console.log('onCatch');
				},
				onDraw: function onDraw(e) {
					e.moveItem();
				},
				onRelease: function onRelease(e) {
					e.resetItem();
					console.log(e);
					if (e.action === 'delete') {
						items.splice(e.index, 1);
						save();
						return;
					}
					var order = items[e.index].order.split(',');
					if (e.action === 'clone') {
						items.splice(e.index, 0, JSON.parse(JSON.stringify(items[e.index])));
					}
					order[bpIndex] = Math.max(1, Math.min(currentGrid[0] - 1, Math.ceil(e.x / e.w * currentGrid[0]))) + ' ' + Math.max(1, Math.min(currentGrid[1], Math.ceil(e.y / e.h * currentGrid[1]))) + ' 2 1';
					items[e.index].order = order.join(',');
					save();
				},
				style: {
					width: (attributes.bp == '0' ? breakpoints[1] : attributes.bp) + 'px',
					margin: '0 auto',
					border: 'solid 1px #888'
				}
			},
			items.map(function (item, index) {
				var _wp$element$createEle;

				var itemID = id + '_item_' + index;
				var itemStates = CP.wordsToFlags(item.classes);
				var itemClasses = item.classes;
				var itemSelected = attributes.currentItemIndex == index;
				var order = item.order.split(',').map(function (val) {
					return val.split(' ');
				});
				if (itemSelected) {
					itemClasses += ' selected';
				}
				breakpoints.map(function (bp, bpIndex) {
					cssDatas[bp] = cssDatas[bp] || {};
					cssDatas[bp]['#' + itemID] = CP.createGridItemStyleCodeData(order[bpIndex]);
				});
				return wp.element.createElement(
					Catpow.Hexagon,
					(_wp$element$createEle = {
						id: itemID,
						className: itemClasses,
						'data-index': index,
						src: itemStates.hasImage ? item.src : false,
						handler: itemHandler
					}, babelHelpers.defineProperty(_wp$element$createEle, 'data-index', index), babelHelpers.defineProperty(_wp$element$createEle, 'onClick', function onClick() {
						setAttributes({ currentItemIndex: index });
					}), _wp$element$createEle),
					itemStates.hasTitle && wp.element.createElement(
						'h3',
						null,
						wp.element.createElement(RichText, {
							placeholder: 'Title',
							onChange: function onChange(title) {
								item.title = title;save();
							},
							value: item.title
						})
					),
					itemStates.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText, {
							placeholder: 'Text',
							onChange: function onChange(text) {
								item.text = text;save();
							},
							value: item.text
						})
					)
				);
			}),
			wp.element.createElement(
				'style',
				null,
				CP.createStyleCode(cssDatas[attributes.bp])
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(
				PanelBody,
				{ title: 'Grid', icon: 'admin-links', initialOpen: false },
				wp.element.createElement(TextControl, {
					label: 'BreakPoints',
					onChange: function onChange(breakpoints) {
						setAttributes({ breakpoints: breakpoints });
					},
					value: attributes.breakpoints
				}),
				wp.element.createElement(TextControl, {
					label: 'Grid',
					onChange: function onChange(grid) {
						setAttributes({ grid: grid });
					},
					value: attributes.grid
				})
			),
			wp.element.createElement(
				PanelBody,
				{ title: 'ID', icon: 'admin-links', initialOpen: false },
				wp.element.createElement(TextControl, {
					label: 'ID',
					onChange: function onChange(id) {
						setAttributes({ id: id });
					},
					value: id
				})
			),
			wp.element.createElement(SelectClassPanel, {
				title: '\u30A2\u30A4\u30C6\u30E0',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: items,
				index: attributes.currentItemIndex,
				selectiveClasses: selectiveItemClasses,
				filters: CP.filters.honeycomb || {}
			}),
			items[attributes.currentItemIndex] && wp.element.createElement(
				PanelBody,
				{ title: 'ITEM CLASS', icon: 'admin-generic', initialOpen: false },
				wp.element.createElement(TextareaControl, {
					label: '\u30AF\u30E9\u30B9',
					onChange: function onChange(classes) {
						items[attributes.currentItemIndex].classes = classes;
						save();
					},
					value: items[attributes.currentItemIndex].classes
				})
			),
			wp.element.createElement(ItemControlInfoPanel, null)
		)];
	},
	save: function save(_ref2) {
		var attributes = _ref2.attributes,
		    className = _ref2.className,
		    setAttributes = _ref2.setAttributes;
		var id = attributes.id,
		    classes = attributes.classes,
		    _attributes$items2 = attributes.items,
		    items = _attributes$items2 === undefined ? [] : _attributes$items2;
		var breakpoints = attributes.breakpoints,
		    grid = attributes.grid;


		breakpoints = breakpoints.split(',');
		breakpoints.unshift('0');
		grid = grid.split(',').map(function (val) {
			return val.split(' ');
		});

		var cssDatas = {};

		breakpoints.map(function (bp, bpIndex) {
			cssDatas[bp] = babelHelpers.defineProperty({}, '#' + id, CP.createGridStyleCodeData(grid[bpIndex]));
		});

		var states = CP.wordsToFlags(classes);
		var imageKeys = {
			image: { src: "src", items: "items" }
		};

		return wp.element.createElement(
			'div',
			{
				id: id,
				className: classes,
				'data-breakpoints': breakpoints,
				'data-grid': grid
			},
			items.map(function (item, index) {
				var itemID = id + '_item_' + index;
				var itemStates = CP.wordsToFlags(item.classes);
				item.order = item.order || '';
				var order = item.order.split(',').map(function (val) {
					return val.split(' ');
				});
				breakpoints.map(function (bp, bpIndex) {
					cssDatas[bp] = cssDatas[bp] || {};
					cssDatas[bp]['#' + itemID] = CP.createGridItemStyleCodeData(order[bpIndex]);
				});
				return wp.element.createElement(
					Catpow.Hexagon,
					{
						id: itemID,
						className: item.classes,
						src: itemStates.hasImage ? item.src : false,
						'data-order': item.order
					},
					itemStates.hasTitle && wp.element.createElement(
						'h3',
						null,
						wp.element.createElement(RichText.Content, { value: item.title })
					),
					itemStates.hasText && wp.element.createElement(
						'p',
						null,
						wp.element.createElement(RichText.Content, { value: item.text })
					)
				);
			}),
			wp.element.createElement(
				'style',
				null,
				breakpoints.map(function (bp) {
					if ('0' == bp) {
						return CP.createStyleCode(cssDatas[bp]);
					}
					return '@media(min-width:' + bp + 'px){' + CP.createStyleCode(cssDatas[bp]) + '}';
				})
			)
		);
	}
});
