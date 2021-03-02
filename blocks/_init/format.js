registerFormatType('catpow/ruby', {
	title: 'Ruby',
	tagName: 'ruby',
	className: null,
	edit: function edit(_ref) {
		var isActive = _ref.isActive,
		    value = _ref.value,
		    onChange = _ref.onChange;

		var onToggle = function onToggle() {
			if (isActive) {
				return onChange(wp.richText.toggleFormat(value, { type: 'catpow/ruby' }));
			}
			if (wp.richText.isCollapsed(value)) {
				alert(__('ルビをつけたいテキストを選択してください'));return;
			}
			var rt = prompt(__('ルビを入力'));
			if (rt === null) {
				return;
			}
			return onChange(wp.richText.insert(value, wp.richText.create({ html: '<ruby>' + wp.richText.slice(value).text + '<rt>' + rt + '</rt></ruby>' }), value.start, value.end));
		};

		var icon = wp.element.createElement(
			'svg',
			{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
			wp.element.createElement('path', { d: 'M3.6,19.8L8.9,6.2h1.9l5.6,13.6h-2l-1.6-4.1H7l-1.5,4.1H3.6z M7.6,14.2h4.6l-1.4-3.8c-0.4-1.1-0.8-2.1-1-2.8 c-0.2,0.9-0.4,1.7-0.7,2.6L7.6,14.2z' }),
			wp.element.createElement('path', { d: 'M10.7,4.4C10.4,4.7,10.1,4.9,9.8,5C9.6,5.1,9.3,5.1,9,5.1C8.4,5.2,8,5,7.7,4.8c-0.3-0.3-0.4-0.6-0.4-1c0-0.2,0-0.4,0.2-0.6 C7.6,3,7.7,2.8,7.9,2.7C8,2.6,8.2,2.5,8.5,2.4c0.2,0,0.4-0.1,0.7-0.1c0.7-0.1,1.1-0.2,1.4-0.3c0-0.1,0-0.2,0-0.2 c0-0.3-0.1-0.6-0.2-0.7c-0.2-0.2-0.5-0.3-0.9-0.3C9.1,0.8,8.8,0.9,8.6,1C8.4,1.2,8.3,1.4,8.2,1.8L7.4,1.7C7.5,1.3,7.6,1,7.8,0.8 c0.2-0.2,0.4-0.4,0.7-0.5c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.7,0,1,0.1c0.3,0.1,0.4,0.2,0.6,0.4c0.1,0.1,0.2,0.3,0.3,0.5 c0,0.1,0,0.4,0,0.7l0,1.1c0,0.8,0,1.2,0.1,1.4c0,0.2,0.1,0.4,0.2,0.6l-0.8,0C10.8,4.9,10.7,4.7,10.7,4.4z M10.6,2.6 C10.3,2.8,9.9,2.9,9.3,3C9,3,8.7,3.1,8.6,3.1C8.5,3.2,8.4,3.3,8.3,3.4C8.2,3.5,8.2,3.6,8.2,3.8c0,0.2,0.1,0.4,0.3,0.5 c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0,0.6-0.1,0.8-0.2s0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8L10.6,2.6z' })
		);

		return [wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(RichTextShortcut, {
				type: 'primary',
				character: 'r',
				onUse: onToggle
			}),
			wp.element.createElement(RichTextToolbarButton, {
				icon: icon,
				title: 'Ruby',
				onClick: onToggle,
				isActive: isActive,
				shortcutType: 'primary',
				shortcutCharacter: 'r'
			})
		)];
	}
});
registerFormatType('catpow/rt', {
	title: 'RubyText',
	tagName: 'rt',
	className: null
});
registerFormatType('catpow/small', {
	title: 'small',
	tagName: 'small',
	className: null,
	edit: function edit(_ref2) {
		var isActive = _ref2.isActive,
		    value = _ref2.value,
		    onChange = _ref2.onChange;

		var onToggle = function onToggle() {
			return onChange(toggleFormat(value, { type: 'catpow/small' }));
		};

		var icon = wp.element.createElement(
			'svg',
			{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
			wp.element.createElement('path', { d: 'M5.6,16.7l3.6-9.4h1.3l3.8,9.4H13l-1.1-2.8H8l-1,2.8H5.6z M8.3,12.9h3.2l-1-2.6C10.2,9.5,10,8.9,9.9,8.4 C9.7,9,9.6,9.6,9.3,10.1L8.3,12.9z' })
		);

		return [wp.element.createElement(
			Fragment,
			null,
			wp.element.createElement(RichTextShortcut, {
				type: 'primary',
				character: '-',
				onUse: onToggle
			}),
			wp.element.createElement(RichTextToolbarButton, {
				icon: icon,
				title: 'small',
				onClick: onToggle,
				isActive: isActive,
				shortcutType: 'primary',
				shortcutCharacter: '-'
			})
		)];
	}
});

registerFormatType('catpow/title', {
	title: 'Title',
	tagName: 'span',
	className: 'ititle',
	attributes: {
		type: 'class'
	},
	edit: function edit(props) {
		var isActive = props.isActive,
		    value = props.value,
		    onChange = props.onChange,
		    activeAttributes = props.activeAttributes;
		var _wp$components = wp.components,
		    Popover = _wp$components.Popover,
		    Card = _wp$components.Card,
		    CardBody = _wp$components.CardBody;
		var _wp$element = wp.element,
		    useMemo = _wp$element.useMemo,
		    useCallback = _wp$element.useCallback;
		var applyFormat = wp.richText.applyFormat;


		var onToggle = function onToggle() {
			return onChange(toggleFormat(value, { type: 'catpow/title', attributes: { type: 'iheader' } }));
		};
		var el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
		var setAttributes = useCallback(function (attr) {
			onChange(applyFormat(value, { type: 'catpow/title', attributes: Object.assign(activeAttributes, attr) }));
		}, [value, activeAttributes]);

		var icon = wp.element.createElement(
			'svg',
			{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
			wp.element.createElement(
				'g',
				null,
				wp.element.createElement('path', { d: 'M6.9,15.9V2.6h2.7v5.2h5.3V2.6h2.7v13.3h-2.7v-5.8H9.6v5.8H6.9z' })
			),
			wp.element.createElement('rect', { x: '1', y: '1', width: '4', height: '18' }),
			wp.element.createElement('rect', { x: '5', y: '18', width: '14', height: '1' })
		);

		return [wp.element.createElement(
			Fragment,
			null,
			isActive && wp.element.createElement(
				Popover,
				{ getAnchorRect: function getAnchorRect() {
						return el.getBoundingClientRect();
					}, position: 'bottom left', focusOnMount: false },
				wp.element.createElement(
					Card,
					{ size: 'small' },
					wp.element.createElement(
						CardBody,
						null,
						wp.element.createElement(CP.SelectButtons, {
							options: [{ label: 'header', value: 'iheader' }, { label: 'headline', value: 'iheadline' }, { label: 'catch', value: 'icatch' }],
							selected: activeAttributes['type'],
							onChange: function onChange(type) {
								return setAttributes({ type: type });
							}
						})
					)
				)
			),
			wp.element.createElement(
				BlockControls,
				null,
				wp.element.createElement(Toolbar, {
					controls: [{ icon: icon, onClick: onToggle, isActive: isActive }]
				})
			),
			wp.element.createElement(RichTextToolbarButton, {
				icon: icon,
				title: 'Title',
				onClick: onToggle,
				isActive: isActive
			})
		)];
	}
});
registerFormatType('catpow/mark', {
	title: 'Mark',
	tagName: 'mark',
	className: 'mark',
	attributes: {
		color: 'class'
	},
	edit: function edit(props) {
		var isActive = props.isActive,
		    value = props.value,
		    onChange = props.onChange,
		    activeAttributes = props.activeAttributes;
		var _wp$components2 = wp.components,
		    Popover = _wp$components2.Popover,
		    Card = _wp$components2.Card,
		    CardBody = _wp$components2.CardBody;
		var _wp$element2 = wp.element,
		    useMemo = _wp$element2.useMemo,
		    useCallback = _wp$element2.useCallback;
		var applyFormat = wp.richText.applyFormat;


		var onToggle = function onToggle() {
			return onChange(toggleFormat(value, { type: 'catpow/mark', attributes: { color: 'color0' } }));
		};
		var el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
		var setAttributes = useCallback(function (attr) {
			onChange(applyFormat(value, { type: 'catpow/mark', attributes: Object.assign(activeAttributes, attr) }));
		}, [value, activeAttributes]);

		var icon = wp.element.createElement(
			'svg',
			{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
			wp.element.createElement('polygon', { points: '7.9,10.8 12.1,10.8 10,5.3 \t' }),
			wp.element.createElement('path', { d: 'M0,2v16h20V2H0z M13.7,15.3L12.5,12h-5l-1.2,3.4H4.7L9,4h1.9l4.3,11.3H13.7z' })
		);

		return [wp.element.createElement(
			Fragment,
			null,
			isActive && wp.element.createElement(
				Popover,
				{ getAnchorRect: function getAnchorRect() {
						return el.getBoundingClientRect();
					}, position: 'bottom center', focusOnMount: false },
				wp.element.createElement(
					Card,
					{ size: 'small' },
					wp.element.createElement(
						CardBody,
						null,
						wp.element.createElement(CP.SelectThemeColor, {
							onChange: function onChange(color) {
								return setAttributes({ color: color });
							},
							selected: activeAttributes['color']
						})
					)
				)
			),
			wp.element.createElement(
				BlockControls,
				null,
				wp.element.createElement(Toolbar, {
					controls: [{ icon: icon, onClick: onToggle, isActive: isActive }]
				})
			),
			wp.element.createElement(RichTextToolbarButton, {
				icon: icon,
				title: 'Mark',
				onClick: onToggle,
				isActive: isActive
			})
		)];
	}
});
registerFormatType('catpow/large', {
	title: 'Large',
	tagName: 'strong',
	className: 'large',
	attributes: {
		color: 'class'
	},
	edit: function edit(props) {
		var isActive = props.isActive,
		    value = props.value,
		    onChange = props.onChange,
		    activeAttributes = props.activeAttributes;
		var _wp$components3 = wp.components,
		    Popover = _wp$components3.Popover,
		    Card = _wp$components3.Card,
		    CardBody = _wp$components3.CardBody;
		var _wp$element3 = wp.element,
		    useMemo = _wp$element3.useMemo,
		    useCallback = _wp$element3.useCallback;
		var applyFormat = wp.richText.applyFormat;


		var onToggle = function onToggle() {
			return onChange(toggleFormat(value, { type: 'catpow/large', attributes: { color: 'color0' } }));
		};
		var el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
		var setAttributes = useCallback(function (attr) {
			onChange(applyFormat(value, { type: 'catpow/large', attributes: Object.assign(activeAttributes, attr) }));
		}, [value, activeAttributes]);

		var icon = wp.element.createElement(
			'svg',
			{ role: 'img', focusable: 'false', xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 20 20', 'aria-hidden': 'true' },
			wp.element.createElement('path', { d: 'M4.8,0.5h5c1.6,0,2.8,0.1,3.6,0.4c0.8,0.2,1.5,0.7,2,1.5c0.5,0.8,0.8,2,0.8,3.6c0,1.1-0.2,1.9-0.5,2.4 c-0.4,0.4-1.1,0.8-2.1,1c1.2,0.3,1.9,0.7,2.4,1.3c0.4,0.6,0.6,1.5,0.6,2.8v1.8c0,1.3-0.1,2.3-0.4,2.9c-0.3,0.6-0.8,1.1-1.4,1.3 c-0.7,0.2-2,0.3-4,0.3H4.8V0.5z M9.8,3.8v4.3c0.2,0,0.4,0,0.5,0c0.5,0,0.8-0.1,0.9-0.4c0.1-0.2,0.2-0.9,0.2-2.1 c0-0.6-0.1-1-0.2-1.3s-0.3-0.4-0.4-0.5C10.7,3.8,10.4,3.8,9.8,3.8z M9.8,11.1v5.4c0.7,0,1.2-0.1,1.4-0.3c0.2-0.2,0.3-0.7,0.3-1.5 v-1.8c0-0.8-0.1-1.3-0.3-1.5C11.1,11.2,10.6,11.1,9.8,11.1z' })
		);

		return [wp.element.createElement(
			Fragment,
			null,
			isActive && wp.element.createElement(
				Popover,
				{ getAnchorRect: function getAnchorRect() {
						return el.getBoundingClientRect();
					}, position: 'bottom center', focusOnMount: false },
				wp.element.createElement(
					Card,
					{ size: 'small' },
					wp.element.createElement(
						CardBody,
						null,
						wp.element.createElement(CP.SelectThemeColor, {
							onChange: function onChange(color) {
								return setAttributes({ color: color });
							},
							selected: activeAttributes['color']
						})
					)
				)
			),
			wp.element.createElement(
				BlockControls,
				null,
				wp.element.createElement(Toolbar, {
					controls: [{ icon: icon, onClick: onToggle, isActive: isActive }]
				})
			),
			wp.element.createElement(RichTextToolbarButton, {
				icon: icon,
				title: 'Large',
				onClick: onToggle,
				isActive: isActive
			})
		)];
	}
});

registerFormatType('catpow/tag', {
	title: 'tag',
	tagName: 'a',
	className: 'tag',
	attributes: {
		url: 'href',
		color: 'class'
	},
	edit: function edit(props) {
		var isActive = props.isActive,
		    value = props.value,
		    onChange = props.onChange,
		    onFocus = props.onFocus,
		    activeAttributes = props.activeAttributes,
		    activeObject = props.activeObject;
		var _wp$components4 = wp.components,
		    Popover = _wp$components4.Popover,
		    BaseControle = _wp$components4.BaseControle,
		    TextControl = _wp$components4.TextControl,
		    Card = _wp$components4.Card,
		    CardBody = _wp$components4.CardBody;
		var _wp$element4 = wp.element,
		    useState = _wp$element4.useState,
		    useMemo = _wp$element4.useMemo,
		    useCallback = _wp$element4.useCallback;
		var _wp$richText = wp.richText,
		    removeFormat = _wp$richText.removeFormat,
		    applyFormat = _wp$richText.applyFormat,
		    insert = _wp$richText.insert,
		    create = _wp$richText.create,
		    slice = _wp$richText.slice;


		var onToggle = function onToggle() {
			return onChange(toggleFormat(value, { type: 'catpow/tag', attributes: { class: 'color0' } }));
		};
		var el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
		var setAttributes = useCallback(function (attr) {
			onChange(applyFormat(value, { type: 'catpow/tag', attributes: Object.assign(activeAttributes, attr) }));
		}, [value, activeAttributes]);

		return [wp.element.createElement(
			Fragment,
			null,
			isActive && wp.element.createElement(
				Popover,
				{ getAnchorRect: function getAnchorRect() {
						return el.getBoundingClientRect();
					}, position: 'bottom center', focusOnMount: false },
				wp.element.createElement(
					Card,
					null,
					wp.element.createElement(
						CardBody,
						null,
						wp.element.createElement(TextControl, {
							label: 'URL',
							value: activeAttributes['url'],
							onChange: function onChange(url) {
								return setAttributes({ url: url });
							}
						})
					)
				),
				wp.element.createElement(
					Card,
					{ size: 'small' },
					wp.element.createElement(
						CardBody,
						null,
						wp.element.createElement(CP.SelectThemeColor, {
							onChange: function onChange(color) {
								return setAttributes({ color: color });
							},
							selected: activeAttributes['color']
						})
					)
				)
			),
			wp.element.createElement(
				BlockControls,
				null,
				wp.element.createElement(Toolbar, {
					controls: [{ icon: 'tag', onClick: onToggle, isActive: isActive }]
				})
			),
			wp.element.createElement(RichTextToolbarButton, {
				icon: 'tag',
				title: 'tag',
				onClick: onToggle,
				isActive: isActive
			})
		)];
	}
});

registerFormatType('catpow/clear', {
	title: 'clear',
	tagName: 'div',
	className: null,
	edit: function edit(_ref3) {
		var isActive = _ref3.isActive,
		    value = _ref3.value,
		    onChange = _ref3.onChange;
		var create = wp.richText.create;

		return [wp.element.createElement(RichTextToolbarButton, {
			icon: 'dismiss',
			title: '🧹全てのスタイルをクリア',
			onClick: function onClick() {
				return onChange(create({ html: value.text }));
			},
			isActive: false
		})];
	}
});
