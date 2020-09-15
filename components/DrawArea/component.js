/**
* ドラッグによるアイテム操作のための汎用コンポーネント
* ドラッグ開始・ドラッグ・ドラッグ終了でオブジェクトを共有させる
*/
Catpow.DrawArea = function (props) {
	var event;
	var onCatch = props.onCatch,
	    onDraw = props.onDraw,
	    onRelease = props.onRelease,
	    onDelete = props.onDelete,
	    grid = props.grid,
	    children = props.children,
	    otherProps = babelHelpers.objectWithoutProperties(props, ["onCatch", "onDraw", "onRelease", "onDelete", "grid", "children"]);

	var _wp$element$useState = wp.element.useState(-1),
	    _wp$element$useState2 = babelHelpers.slicedToArray(_wp$element$useState, 2),
	    index = _wp$element$useState2[0],
	    setIndex = _wp$element$useState2[1];

	var initEventData = function initEventData(area, item) {
		var areaRect = area.getBoundingClientRect();
		var baseRect = item.getBoundingClientRect();
		event = {
			item: item,
			areaRect: areaRect,
			baseRect: baseRect,
			index: item.dataset.index,
			w: areaRect.width,
			h: areaRect.height,
			base: {
				l: baseRect.left - areaRect.left,
				c: baseRect.left + baseRect.width / 2 - areaRect.left,
				r: baseRect.right - areaRect.left,
				t: baseRect.top - areaRect.top,
				m: baseRect.top + baseRect.height / 2 - areaRect.top,
				b: baseRect.bottom - areaRect.top
			},
			path: [],
			moveItem: moveItem,
			resizeItem: resizeItem,
			resetItem: resetItem
		};
	};
	var setEventData = function setEventData(e) {
		event.x = e.clientX - event.areaRect.left;
		event.y = e.clientY - event.areaRect.top;
		event.path.push({ x: event.x, y: event.y });
		event.tx = event.x - event.path[0].x;
		event.ty = event.y - event.path[0].y;
	};
	var moveItem = function moveItem() {
		if (grid) {
			event.item.style.transform = "translate(" + Math.floor(event.tx / grid[0]) * grid[0] + "px," + Math.floor(event.ty / grid[1]) * grid[1] + "px)";
		} else {
			event.item.style.transform = "translate(" + event.tx + "px," + event.ty + "px)";
		}
	};
	var resizeItem = function resizeItem(p) {
		p = p || 'r';
		var v, l, t, g;
		switch (p) {
			case 'l':
				v = false;
				l = event.base.r - event.x;
				t = event.x - event.base.l;
				break;
			case 'r':
				v = false;
				l = event.x - event.base.r;
				break;
			case 't':
				v = true;
				l = event.base.b - event.y;
				t = event.y - event.base.t;
				break;
			case 'b':
				v = true;
				l = event.y - event.base.t;
				break;
		}
		if (grid) {
			g = grid[v ? 1 : 0];
			l = Math.floor(l / g) * g;
			if (t) {
				t = Math.floor(l / g) * g;
			}
		}
		event.item.style[v ? 'height' : 'width'] = l + "px";
		if (t) {
			event.item.style.transform = "translate" + (v ? "Y" : "X") + "(" + t + "px)";
		}
	};
	var resetItem = function resetItem() {
		event.item.style.width = null;
		event.item.style.height = null;
		event.item.style.transform = null;
	};

	return wp.element.createElement(
		"div",
		babelHelpers.extends({
			onMouseDown: function onMouseDown(e) {
				var handler = e.target.closest('[data-drawaction]');
				if (!handler) {
					event = false;return;
				}
				initEventData(e.currentTarget, e.target.closest('.item'));
				event.handler = handler;
				event.action = handler.dataset.drawaction;
				setEventData(e);
				onCatch(event);
			},
			onMouseMove: function onMouseMove(e) {
				if (!event) {
					return;
				}
				setEventData(e);
				onDraw(event);
			},
			onMouseUp: function onMouseUp(e) {
				if (!event) {
					return;
				}
				setEventData(e);
				onRelease(event);
				setIndex(event.index);
				event = false;
			},
			onKeyDown: function onKeyDown(e) {
				if (index < 0) {
					return;
				}
				initEventData(e.currentTarget, e.currentTarget.querySelector(".item[data-index='" + index + "']"));
				switch (e.key) {
					case 'Backspace':
						event.action = 'delete';
						onDelete(event);
						break;
				}
			},
			tabIndex: 0
		}, otherProps),
		children
	);
};
