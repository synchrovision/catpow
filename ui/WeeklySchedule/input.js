/*
* 週間スケジュール
* 
*/
Catpow.UI.WeeklySchedule = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var value = props.value,
		    step = props.step,
		    range = props.range,
		    dayLabels = props.dayLabels;

		console.log(props);
		_this.dayLabels = dayLabels || ['日', '月', '火', '水', '木', '金', '土'];
		_this.dayClasses = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
		value = value || [];
		value = value.map(function (item) {
			return { start: parseInt(item.start), end: parseInt(item.end) };
		});
		step = step || 15;
		_this.state = { value: value, step: step, range: range };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    value = _state.value,
			    step = _state.step,
			    range = _state.range,
			    id = _state.id;

			var hs = [];

			if (!id) {
				this.setState({ id: 'ws' + new Date().getTime().toString(16) });
			}
			var save = function save() {
				_this2.setState({ value: JSON.parse(JSON.stringify(value)) });
			};
			var minutesToTime = function minutesToTime(minutes) {
				minutes = Math.floor(parseInt(minutes % 1440) / step) * step;
				var h = Math.floor(minutes / 60);
				return ('0' + h).slice(-2) + ':' + ('0' + (minutes - h * 60)).slice(-2);
			};
			var minutesToDayAndTime = function minutesToDayAndTime(minutes) {
				if (minutes < 0) {
					minutes += 1440 * 7;
				}
				minutes = minutes % (1440 * 7);
				return {
					d: Math.floor(minutes / 1440),
					m: minutes % 1440
				};
			};
			var getMinutes = function getMinutes(e) {
				return Math.floor((Math.floor(e.x / e.w * 7) * 1440 + e.y / e.h * 1440) / step) * step;
			};
			var Rect = function Rect(props) {
				var children = props.children,
				    day = props.day,
				    start = props.start,
				    end = props.end,
				    otherProps = babelHelpers.objectWithoutProperties(props, ['children', 'day', 'start', 'end']);

				return wp.element.createElement(
					'div',
					babelHelpers.extends({
						style: {
							position: 'absolute',
							top: start / 1440 * 100 + '%',
							bottom: (1440 - end) / 1440 * 100 + '%',
							left: day % 7 / 7 * 100 + '%',
							right: (6 - day % 7) / 7 * 100 + '%'
						}
					}, otherProps),
					children
				);
			};
			var Event = function Event(props) {
				var index = props.index,
				    start = props.start,
				    end = props.end,
				    otherProps = babelHelpers.objectWithoutProperties(props, ['index', 'start', 'end']);

				var d,
				    h = {},
				    rcts = [];

				var _wp$element$useState = wp.element.useState(start);

				var _wp$element$useState2 = babelHelpers.slicedToArray(_wp$element$useState, 2);

				start = _wp$element$useState2[0];
				h.setStart = _wp$element$useState2[1];

				var _wp$element$useState3 = wp.element.useState(end);

				var _wp$element$useState4 = babelHelpers.slicedToArray(_wp$element$useState3, 2);

				end = _wp$element$useState4[0];
				h.setEnd = _wp$element$useState4[1];

				hs[index] = h;
				if (start > end) {
					end += 1440 * 7;
				}
				start = minutesToDayAndTime(start);
				end = minutesToDayAndTime(end);
				var startHandler = wp.element.createElement('div', { className: 'handler moveStart', 'data-drawaction': 'moveStart' });
				var endHandler = wp.element.createElement('div', { className: 'handler moveEnd', 'data-drawaction': 'moveEnd' });
				var label = wp.element.createElement(
					'div',
					{ className: 'label' },
					minutesToTime(start.m) + '〜' + minutesToTime(end.m)
				);
				if (start.d < end.d) {
					rcts.push({ day: start.d, start: start.m, end: 1440, children: [label, startHandler] });
					for (d = start.d + 1; d < end.d; d++) {
						rcts.push({ day: d, start: 0, end: 1440 });
					}
					rcts.push({ day: end.d, start: 0, end: end.m, children: [endHandler] });
				} else if (start.d > end.d || start.m > end.m) {
					rcts.push({ day: start.d, start: start.m, end: 1440, children: [label, startHandler] });
					for (d = start.d + 1; d < 7; d++) {
						rcts.push({ day: d, start: 0, end: 1440 });
					}
					for (d = 0; d < end.d; d++) {
						rcts.push({ day: d, start: 0, end: 1440 });
					}
					rcts.push({ day: end.d, start: 0, end: end.m, children: [endHandler] });
				} else {
					rcts = [{ day: start.d, start: start.m, end: end.m, children: [label, startHandler, endHandler] }];
				}
				return wp.element.createElement(
					'div',
					{ className: 'item event', 'data-index': index },
					rcts.map(function (rectProps) {
						return wp.element.createElement(Rect, babelHelpers.extends({ className: 'rect', 'data-drawaction': 'move' }, rectProps));
					})
				);
			};
			var events = value.map(function (eventProps, index) {
				return wp.element.createElement(Event, babelHelpers.extends({ index: index }, eventProps));
			});

			return wp.element.createElement(
				'div',
				{ className: 'WeeklySchedule' },
				wp.element.createElement(
					'table',
					{ 'class': 'grid' },
					wp.element.createElement(
						'thead',
						null,
						wp.element.createElement(
							'tr',
							null,
							wp.element.createElement('td', { className: 'spacer' }),
							Array.from({ length: 7 }).map(function (_, i) {
								return wp.element.createElement(
									'th',
									null,
									_this2.dayLabels[i]
								);
							})
						)
					),
					wp.element.createElement(
						'tbody',
						null,
						Array.from({ length: 24 }).map(function (_, i) {
							return wp.element.createElement(
								'tr',
								null,
								wp.element.createElement(
									'th',
									null,
									i,
									':00'
								),
								Array.from({ length: 7 }).map(function (_, i) {
									return wp.element.createElement('td', null);
								})
							);
						})
					)
				),
				wp.element.createElement(
					Catpow.DrawArea,
					{
						className: 'DrawArea',
						onCatch: function onCatch(e) {
							//console.log(e);
						},
						onDraw: function onDraw(e) {
							switch (e.action) {
								case 'move':
									var t = getMinutes({ w: e.w, h: e.h, x: e.tx + e.w / 14, y: e.ty });
									hs[e.index].setStart(value[e.index]['start'] + t);
									hs[e.index].setEnd(value[e.index]['end'] + t);
									break;
								case 'moveStart':
									hs[e.index].setStart(getMinutes(e));
									break;
								case 'moveEnd':
									hs[e.index].setEnd(getMinutes(e));
									break;
							}
						},
						onRelease: function onRelease(e) {
							switch (e.action) {
								case 'add':
									value.push({
										start: getMinutes(e),
										end: getMinutes(e) + 120
									});
									break;
								case 'move':
									var t = getMinutes({ w: e.w, h: e.h, x: e.tx + e.w / 14, y: e.ty });
									value[e.index]['start'] += t;
									value[e.index]['end'] += t;
									break;
								case 'moveStart':
									value[e.index]['start'] = getMinutes(e);
									break;
								case 'moveEnd':
									value[e.index]['end'] = getMinutes(e);
									break;
							}
							e.resetItem();
							save();
						},
						onDelete: function onDelete(e) {
							console.log(e);
							value.splice(e.index, 1);
							save();
						}
					},
					wp.element.createElement('div', { className: 'item base', 'data-drawaction': 'add' }),
					events
				),
				wp.element.createElement(Catpow.UI.HiddenValues, { name: this.props.name, value: value })
			);
		}
	}]);
	return _class;
}(wp.element.Component);
