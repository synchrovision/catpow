Catpow.CalendarSelect = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var date, min, minDate, max, maxDate, crr, i;

		if (props.value) {
			date = new Date(props.value);
		} else if (props.default) {
			date = new Date(props.default);
		} else {
			date = new Date();
		}
		if (props.min) {
			min = new Date(props.min);
		} else {
			min = new Date(Date.now() - 1000 * 3600 * 24 * 100);
		}
		if (props.max) {
			max = new Date(props.max);
		} else {
			max = new Date(Date.now() + 1000 * 3600 * 24 * 100);
		}

		minDate = min.getDate();
		maxDate = max.getDate();

		crr = new Date(date);
		crr.setDate(1);

		_this.thead = wp.element.createElement(
			"thead",
			null,
			wp.element.createElement(
				"tr",
				null,
				"日,月,火,水,木,金,土".split(',').map(function (d) {
					return wp.element.createElement(
						"td",
						null,
						d
					);
				})
			)
		);

		_this.state = { date: date, min: min, minDate: minDate, max: max, maxDate: maxDate, crr: crr };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    date = _state.date,
			    min = _state.min,
			    minDate = _state.minDate,
			    max = _state.max,
			    maxDate = _state.maxDate,
			    crr = _state.crr;

			var crrHasActive, crrHasMin, crrHasMax, prevMonth, nextMonth, activeDate, startDay, lastDate, c, r, d, cells, rows;
			if (min > date) {
				date = new Date(min);
			} else if (max < date) {
				date = new Date(max);
			} else {
				date = new Date(date);
			}
			crr = new Date(crr);

			crrHasActive = crr.getFullYear() == date.getFullYear() && crr.getMonth() == date.getMonth();
			crrHasMin = crr.getFullYear() == min.getFullYear() && crr.getMonth() == min.getMonth();
			crrHasMax = crr.getFullYear() == max.getFullYear() && crr.getMonth() == max.getMonth();
			activeDate = date.getDate();

			var cell = function cell(i) {
				if (i < 1 || i > lastDate) {
					return wp.element.createElement("td", null);
				}
				if (crrHasMin && i < minDate || crrHasMax && i > maxDate) {
					return wp.element.createElement(
						"td",
						{ className: "disable" },
						i
					);
				}
				return wp.element.createElement(
					"td",
					{
						className: crrHasActive && i == activeDate ? 'active' : '',
						onClick: function onClick(e) {
							_this2.setState({ date: new Date(crr.getFullYear(), crr.getMonth(), i) });
						}
					},
					i
				);
			};

			startDay = crr.getDay();
			crr.setMonth(crr.getMonth() - 1);
			prevMonth = crr.getMonth() + 1;
			crr.setMonth(crr.getMonth() + 2);
			nextMonth = crr.getMonth() + 1;
			crr.setDate(0);
			lastDate = crr.getDate();
			crr.setDate(1);

			rows = [];
			for (r = 0; r < 6; r++) {
				cells = [];
				for (c = 1; c <= 7; c++) {
					cells.push(cell(r * 7 + c - startDay));
				}
				rows.push(wp.element.createElement(
					"tr",
					null,
					cells
				));
			}

			var goto = function goto(i) {
				crr.setMonth(crr.getMonth() + i);
				_this2.setState({ crr: crr });
			};

			return wp.element.createElement(
				"div",
				{ className: 'CalendarSelect' },
				wp.element.createElement(
					"table",
					null,
					wp.element.createElement(
						"caption",
						null,
						wp.element.createElement(
							"div",
							{ "class": "year" },
							crr.getFullYear(),
							wp.element.createElement(
								"span",
								{ className: "unit" },
								"\u5E74"
							)
						),
						!crrHasMin && wp.element.createElement(
							"span",
							{ "class": "prev", onClick: function onClick(e) {
									goto(-1);
								} },
							prevMonth,
							wp.element.createElement(
								"span",
								{ className: "unit" },
								"\u6708"
							)
						),
						wp.element.createElement(
							"span",
							{ "class": "current" },
							crr.getMonth() + 1,
							wp.element.createElement(
								"span",
								{ className: "unit" },
								"\u6708"
							)
						),
						!crrHasMax && wp.element.createElement(
							"span",
							{ "class": "next", onClick: function onClick(e) {
									goto(1);
								} },
							nextMonth,
							wp.element.createElement(
								"span",
								{ className: "unit" },
								"\u6708"
							)
						)
					),
					this.thead,
					wp.element.createElement(
						"tbody",
						null,
						rows
					)
				),
				wp.element.createElement(Catpow.HiddenValues, {
					name: this.props.name,
					value: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
