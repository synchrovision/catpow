registerBlockType('catpow/graphics', {
	title: '🐾 graphics',
	description: '画像を自由にレイアウトします。',
	icon: 'format-image',
	category: 'catpow',
	attributes: {
		id: { source: 'attribute', selector: '.wp-block-catpow-graphics', attribute: 'id', default: '' },
		classes: { source: 'attribute', selector: '.wp-block-catpow-graphics', attribute: 'class', default: 'wp-block-catpow-graphics hasBaseImage' },
		src: { source: 'attribute', selector: '[src]', attribute: 'src', default: cp.theme_url + '/images/dummy_bg.jpg' },
		srcset: { source: 'attribute', selector: '[src]', attribute: 'srcset' },
		alt: { source: 'attribute', selector: '[src]', attribute: 'alt' },
		height: { source: 'attribute', selector: '.wp-block-catpow-graphics', 'attribute': 'data-height', default: '60' },
		heightSP: { source: 'attribute', selector: '.wp-block-catpow-graphics', 'attribute': 'data-height-sp', default: '120' },
		items: {
			source: 'query',
			selector: '.item',
			query: {
				classes: { source: 'attribute', attribute: 'class' },
				rect: { source: 'attribute', 'attribute': 'data-rect' },
				rectSP: { source: 'attribute', 'attribute': 'data-rect-sp' },
				src: { source: 'attribute', selector: '[src]', attribute: 'src' },
				srcset: { source: 'attribute', selector: '[src]', attribute: 'srcset' },
				alt: { source: 'attribute', selector: '[src]', attribute: 'alt' },
				title: { source: 'children', selector: '.title' },
				lead: { source: 'children', selector: '.lead' },
				text: { source: 'children', selector: '.text' },
				link: { source: 'attribute', attribute: 'href' }
			},
			default: [{
				id: 'graphics_image1',
				classes: 'item isImage',
				rect: '25 25 50',
				rectSP: '25 25 50',
				src: cp.theme_url + '/images/dummy.jpg',
				srcset: '',
				alt: '',
				title: ['Title'],
				lead: ['Lead'],
				text: ['Text'],
				link: ''
			}]
		}
	},
	example: CP.example,
	edit: function edit(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className,
		    setAttributes = _ref.setAttributes,
		    isSelected = _ref.isSelected;
		var id = attributes.id,
		    _attributes$classes = attributes.classes,
		    classes = _attributes$classes === undefined ? '' : _attributes$classes,
		    src = attributes.src,
		    srcset = attributes.srcset,
		    alt = attributes.alt,
		    height = attributes.height,
		    heightSP = attributes.heightSP,
		    _attributes$items = attributes.items,
		    items = _attributes$items === undefined ? [] : _attributes$items;

		var primaryClass = 'wp-block-catpow-graphics';
		var classArray = (classes || '').split(' ');

		if (!id) {
			setAttributes({ id: 'g' + new Date().getTime().toString(16) });
		}

		attributes.EditMode = attributes.EditMode || 'pc';
		var isModeSP = attributes.EditMode == 'sp';

		var cssData = {},
		    cssDataSP = {};

		var states = CP.wordsToFlags(classes);
		var imageKeys = {
			base: { src: "src", srcset: "srcset", alt: "alt" },
			image: { src: "src", srcset: "srcset", alt: "alt", items: "items" }
		};
		var selectiveClasses = [{
			label: 'ベース画像',
			values: 'hasBaseImage',
			sub: [{ input: 'image', label: '画像', keys: imageKeys.base, ofSP: isModeSP, sizes: isModeSP ? '480px' : false }]
		}];
		selectiveClasses.push({ label: '高さ', input: 'text', key: 'height' });
		selectiveClasses.push({ label: 'SP版高さ', input: 'text', key: 'heightSP' });
		var selectiveItemClasses = [{ label: 'タイプ', filter: 'type', values: { isImage: '画像', isText: 'テキスト' }, sub: {
				isImage: [{ label: 'タイプ', filter: 'imageType', values: ['type1', 'type2', 'type3'] }, { input: 'text', label: '代替テキスト', key: 'alt' }, { input: 'text', label: 'リンク', key: 'link' }],
				isText: [{ label: 'タイプ', filter: 'textType', values: ['type1', 'type2', 'type3'] }, 'color', { label: 'ヌキ文字', values: 'inverse' }, { label: '見出し', values: 'hasTitle' }, { label: 'リード', values: 'hasLead' }, { label: 'テキスト', values: 'hasText' }]
			} }, { label: 'フェードイン', values: 'fadeIn' }, { label: 'スライドイン', values: 'slideIn', sub: [{ type: 'radio', filer: 'slideIn', label: '方向', values: {
					slideInLeft: '左',
					slideInRight: '右',
					slideInUp: '上',
					slideInDown: '下',
					slideInFront: '前',
					slideInBack: '後'
				} }] }, { label: '回転', filter: 'roll', values: 'roll', sub: [{ type: 'radio', label: '方向', values: { rollLeft: '左', rollRight: '右' } }, { type: 'radio', label: '速度', values: { rollSlow: '遅い', rollFast: '速い' } }] }, { label: 'ホバー', filter: 'hover', values: 'hover', sub: [{ label: 'フェード', values: 'hoverFade' }, { type: 'radio', label: '動き', values: {
					hoverNoMove: 'なし',
					hoverZoom: 'ズーム',
					hoverLift: 'リフト',
					hoverJump: 'ジャンプ'
				} }] }];

		if (!states.hasBaseImage) {
			cssData['#' + id + ' .base'] = { 'padding-top': height + '%' };
			cssDataSP['#' + id + ' .base'] = { 'padding-top': heightSP + '%' };
		}

		var tgtItem = false;

		var save = function save() {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		var onMouseDown = function onMouseDown(e) {
			var tgt = e.target;
			var itemNode = tgt.closest('.item');
			if (!itemNode) {
				tgtItem = false;setAttributes({ currentItemIndex: i });return;
			}
			var i = itemNode.dataset.index;
			tgtItem = { node: itemNode };
			if (tgt.classList.contains('pos')) {
				tgtItem.type = 'pos';
			}
			if (tgt.classList.contains('del')) {
				tgtItem.type = 'del';
			}
			if (tgt.classList.contains('dup')) {
				tgtItem.type = 'dup';
			}
			if (tgt.classList.contains('bnd')) {
				tgtItem.type = 'bnd';
			}
			tgtItem.node.style.animation = 'none';
			tgtItem.node.style.transition = 'none';
			tgtItem.node.style.transform = 'scale(1)';
			if (attributes.currentItemIndex != i) {
				setAttributes({ currentItemIndex: i });
			}
		};
		var onMouseMove = function onMouseMove(e) {
			if (!tgtItem) {
				return;
			}
			var bnd = e.currentTarget.getBoundingClientRect();
			if (tgtItem.type === 'pos') {
				tgtItem.node.style.left = e.clientX - bnd.left + 'px';
				tgtItem.node.style.top = e.clientY - bnd.top + 'px';
			} else if (tgtItem.type === 'bnd') {
				var tgtBnd = tgtItem.node.getBoundingClientRect();
				tgtItem.node.style.width = e.clientX - tgtBnd.left + 'px';
			}
		};
		var onMouseUp = function onMouseUp(e) {
			if (tgtItem) {
				var bnd = e.currentTarget.getBoundingClientRect();
				var i = tgtItem.node.dataset.index;
				var rectKey = 'rect' + (isModeSP ? 'SP' : '');
				var rectDate = items[i][rectKey].split(' ');
				if (tgtItem.type === 'pos') {
					if (e.altKey) {
						items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
					}
					rectDate[0] = parseInt((e.clientX - bnd.left) / bnd.width * 1000) / 10;
					rectDate[1] = parseInt((e.clientY - bnd.top) / bnd.height * 1000) / 10;
					items[i][rectKey] = rectDate.join(' ');
					tgtItem.node.style.left = '';
					tgtItem.node.style.top = '';
				} else if (tgtItem.type === 'del') {
					items.splice(i, 1);
				} else if (tgtItem.type === 'dup') {
					items.splice(i, 0, JSON.parse(JSON.stringify(items[i])));
					rectDate[0] = parseFloat(rectDate[0]) + 1;
					rectDate[1] = parseFloat(rectDate[1]) + 1;
					items[i][rectKey] = rectDate.join(' ');
				} else if (tgtItem.type === 'bnd') {
					var tgtBnd = tgtItem.node.getBoundingClientRect();
					rectDate[2] = parseInt((e.clientX - tgtBnd.left) / bnd.width * 1000) / 10;
					items[i][rectKey] = rectDate.join(' ');
					tgtItem.node.style.width = '';
				}
				tgtItem.node.style.animation = '';
				tgtItem.node.style.transition = '';
				tgtItem.node.style.transform = '';
				tgtItem = false;
				save();
			}
		};
		var onDoubleClick = function onDoubleClick(e) {
			var tgt = e.target;
			if (tgt.classList.contains('pos')) {
				if (isModeSP) {
					var item = items[tgt.parentNode.dataset.index];
					item['rectSP'] = item['rect'];
					tgtItem = false;
					save();
				}
			} else if (tgt.classList.contains('bnd')) {
				var item = items[tgt.parentNode.dataset.index];
				var rectKey = 'rect' + (isModeSP ? 'SP' : '');
			}
		};

		return [wp.element.createElement(
			BlockControls,
			null,
			wp.element.createElement(Toolbar, {
				controls: [{
					icon: 'desktop',
					title: 'PC',
					isActive: !isModeSP,
					onClick: function onClick() {
						return setAttributes({ EditMode: 'pc' });
					}
				}]
			}),
			wp.element.createElement(Toolbar, {
				controls: [{
					icon: 'smartphone',
					title: 'SP',
					isActive: isModeSP,
					onClick: function onClick() {
						return setAttributes({ EditMode: 'sp' });
					}
				}]
			})
		), wp.element.createElement(
			'div',
			{
				id: id,
				className: classes + (isModeSP ? ' sp' : ' pc'),
				onMouseDown: onMouseDown,
				onMouseMove: onMouseMove,
				onMouseUp: onMouseUp,
				onDoubleClick: onDoubleClick
			},
			wp.element.createElement(
				'div',
				{ 'class': 'base' },
				states.hasBaseImage && wp.element.createElement('img', { src: src, srcset: srcset, alt: alt, sizes: isModeSP ? '480px' : false })
			),
			items.map(function (item, index) {
				var bnd = item.rect.split(' ').map(function (val) {
					return val + '%';
				});
				var bndSP = item.rectSP.split(' ').map(function (val) {
					return val + '%';
				});
				var itemID = id + '_item_' + index;
				var itemStates = CP.wordsToFlags(item.classes);
				var itemClasses = item.classes;
				var itemSelected = attributes.currentItemIndex == index;
				if (isSelected) {
					itemClasses += ' visible active actived';
				}
				if (itemSelected) {
					itemClasses += ' selected';
				}
				cssData['#' + itemID] = { left: bnd[0], top: bnd[1], width: bnd[2] };
				cssDataSP['#' + itemID] = { left: bndSP[0], top: bndSP[1], width: bndSP[2] };

				var itemBody = function itemBody() {
					if (itemSelected) {
						if (itemStates.isText) {
							return wp.element.createElement(
								Fragment,
								null,
								itemStates.hasTitle && wp.element.createElement(
									'h3',
									{ className: 'title' },
									wp.element.createElement(RichText, {
										placeholder: 'Title',
										onChange: function onChange(title) {
											console.log(title);item.title = title;save();
										},
										value: item.title
									})
								),
								itemStates.hasLead && wp.element.createElement(
									'h4',
									{ className: 'lead' },
									wp.element.createElement(RichText, {
										placeholder: 'Lead',
										onChange: function onChange(lead) {
											item.lead = lead;save();
										},
										value: item.lead
									})
								),
								itemStates.hasText && wp.element.createElement(
									'p',
									{ className: 'text' },
									wp.element.createElement(RichText, {
										placeholder: 'Text',
										onChange: function onChange(text) {
											item.text = text;save();
										},
										value: item.text
									})
								)
							);
						}
						return wp.element.createElement(SelectResponsiveImage, {
							attr: attributes,
							set: function set(data) {
								if (isModeSP) {
									Object.assign(data.items[index], {
										src: item.src,
										srcset: data.items[index].src + ' 480w,' + item.src
									});
								}
								setAttributes(data);
							},
							sizes: isModeSP ? '480px' : false,
							keys: imageKeys.image,
							index: index
						});
					}
					if (itemStates.isText) {
						return wp.element.createElement(
							Fragment,
							null,
							itemStates.hasTitle && wp.element.createElement(
								'h3',
								{ className: 'title' },
								wp.element.createElement(RichText.Content, { value: item.title })
							),
							itemStates.hasLead && wp.element.createElement(
								'h4',
								{ className: 'lead' },
								wp.element.createElement(RichText.Content, { value: item.lead })
							),
							itemStates.hasText && wp.element.createElement(
								'p',
								{ className: 'text' },
								wp.element.createElement(RichText.Content, { value: item.text })
							)
						);
					}
					return wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						sizes: isModeSP ? '480px' : false,
						keys: imageKeys.image,
						index: index
					});
				};

				return el('span', {
					id: itemID,
					className: itemClasses,
					'data-index': index,
					'data-rect': item.rect,
					'data-rect-sp': item.rectSP
				}, wp.element.createElement(
					Fragment,
					null,
					itemBody(),
					isSelected && itemSelected && wp.element.createElement(
						'div',
						{ className: 'control' },
						wp.element.createElement(
							'div',
							{ className: 'pos' },
							wp.element.createElement(Icon, { icon: 'move' })
						),
						wp.element.createElement(
							'div',
							{ className: 'del' },
							wp.element.createElement(Icon, { icon: 'dismiss' })
						),
						wp.element.createElement(
							'div',
							{ className: 'dup' },
							wp.element.createElement(Icon, { icon: 'plus-alt' })
						),
						wp.element.createElement(
							'div',
							{ className: 'bnd' },
							wp.element.createElement(Icon, { icon: 'leftright' })
						)
					)
				));
			}),
			wp.element.createElement(
				'style',
				null,
				CP.createStyleCode(isModeSP ? cssDataSP : cssData)
			)
		), wp.element.createElement(
			InspectorControls,
			null,
			wp.element.createElement(SelectClassPanel, {
				title: '\u30AF\u30E9\u30B9',
				icon: 'art',
				set: setAttributes,
				attr: attributes,
				selectiveClasses: selectiveClasses,
				filters: CP.filters.graphics || {}
			}),
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
			wp.element.createElement(SelectItemClassPanel, {
				title: '\u30A2\u30A4\u30C6\u30E0',
				icon: 'edit',
				set: setAttributes,
				attr: attributes,
				items: items,
				index: attributes.currentItemIndex,
				itemClasses: selectiveItemClasses,
				filters: CP.filters.graphics || {}
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
		    height = attributes.height,
		    heightSP = attributes.heightSP,
		    _attributes$items2 = attributes.items,
		    items = _attributes$items2 === undefined ? [] : _attributes$items2;

		var classArray = (classes || '').split(' ');

		var cssData = {},
		    cssDataSP = {};

		var states = CP.wordsToFlags(classes);
		var imageKeys = {
			base: { src: "src", srcset: "srcset", alt: "alt" },
			image: { src: "src", srcset: "srcset", alt: "alt", items: "items" }
		};

		if (!states.hasBaseImage) {
			cssData['#' + id + ' .base'] = { 'padding-top': height + '%' };
			cssDataSP['#' + id + ' .base'] = { 'padding-top': heightSP + '%' };
		}

		return wp.element.createElement(
			'div',
			{ id: id, className: classes, 'data-height': height, 'data-height-sp': heightSP },
			wp.element.createElement(
				'div',
				{ 'class': 'base' },
				states.hasBaseImage && wp.element.createElement(ResponsiveImage, {
					attr: attributes,
					keys: imageKeys.base
				})
			),
			items.map(function (item, index) {
				var bnd = item.rect.split(' ').map(function (val) {
					return val + '%';
				});
				var bndSP = item.rectSP.split(' ').map(function (val) {
					return val + '%';
				});
				var itemID = id + '_item_' + index;
				var itemStates = CP.wordsToFlags(item.classes);
				cssData['#' + itemID] = { left: bnd[0], top: bnd[1], width: bnd[2] };
				cssDataSP['#' + itemID] = { left: bndSP[0], top: bndSP[1], width: bndSP[2] };

				var itemBody = function itemBody() {
					if (itemStates.isText) {
						return wp.element.createElement(
							Fragment,
							null,
							itemStates.hasTitle && wp.element.createElement(
								'h3',
								{ className: 'title' },
								wp.element.createElement(RichText.Content, { value: item.title })
							),
							itemStates.hasLead && wp.element.createElement(
								'h4',
								{ className: 'lead' },
								wp.element.createElement(RichText.Content, { value: item.lead })
							),
							itemStates.hasText && wp.element.createElement(
								'p',
								{ className: 'text' },
								wp.element.createElement(RichText.Content, { value: item.text })
							)
						);
					}
					return wp.element.createElement(ResponsiveImage, {
						attr: attributes,
						keys: imageKeys.image,
						index: index
					});
				};

				return el(item.link ? 'a' : 'span', {
					id: itemID,
					className: item.classes,
					href: item.link,
					'data-rect': item.rect,
					'data-rect-sp': item.rectSP
				}, itemBody());
			}),
			wp.element.createElement(
				'style',
				null,
				CP.createStyleCode(cssData),
				'@media(max-width:768px){' + CP.createStyleCode(cssDataSP) + '}'
			)
		);
	}
});
