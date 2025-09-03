Catpow.Calendar = (props) => {
	const { Fragment } = wp.element;
	const { useState, useCallback, useEffect, useReducer, useMemo } = wp.element;
	const { className = "cp-calendar", size = "medium", min = null, max = null, exclude = null, onSelect = null, onChange = null, showYear = true, showMonth = true, showControl = false } = props;
	const { bem, getDateValue, getDateTimeObject } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const { type, values } = useMemo(() => {
		const val = props.values ?? props.value ?? props.default;
		if (!val) {
			return { type: "string", values: {} };
		}
		if (Array.isArray(val)) {
			const values = {};
			val.forEach((v) => (values[getDateValue(props.value)] = true));
			return { type: "array", values };
		}
		if (typeof val === "string") {
			return {
				type: "string",
				values: { [getDateValue(props.value)]: true },
			};
		}
		return { type: "object", values: props.values };
	}, [props.value, props.values]);

	const minTime = min ? getDateTimeObject(min).getTime() : Number.MIN_VALUE;
	const maxTime = max ? getDateTimeObject(max).getTime() : Number.MAX_VALUE;

	const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
	const init = useCallback((state) => {
		const d = getDateTimeObject(Object.keys(values)[0] ?? "now");
		return { year: d.getFullYear(), month: d.getMonth() + 1 };
	}, []);
	const reducer = useCallback((state, action) => {
		switch (action.type) {
			case "goto":
				return {
					year: action.year,
					month: action.month,
				};
			case "reset":
				return {
					year: props.year,
					month: props.month,
				};
			case "prevYear":
				return {
					year: state.year - 1,
					month: state.month,
				};
			case "nextYear":
				return {
					year: state.year + 1,
					month: state.month,
				};
			case "prev10Year":
				return {
					year: state.year - 10,
					month: state.month,
				};
			case "next10Year":
				return {
					year: state.year + 10,
					month: state.month,
				};
			case "prevMonth":
				var d = new Date(state.year, state.month - 2);
				return {
					year: d.getFullYear(),
					month: d.getMonth() + 1,
				};
			case "nextMonth":
				var d = new Date(state.year, state.month);
				return {
					year: d.getFullYear(),
					month: d.getMonth() + 1,
				};
		}
	}, []);
	const [state, dispatch] = useReducer(reducer, { year: props.year, month: props.month }, init);
	const weeks = useMemo(() => {
		var r,
			c,
			d,
			dateObject,
			weeks = [],
			days;
		const msOfDay = 86400000;
		const firstDay = new Date(state.year, state.month - 1, 1);
		const lastDay = new Date(state.year, state.month, 0);
		var d = -firstDay.getDay() + 1;
		for (var r = 0; r < 6; r++) {
			days = [];
			for (c = 1; c <= 7; c++) {
				dateObject = new Date(state.year, state.month - 1, d);
				days.push({
					dateObject,
					value: getDateValue(dateObject),
					inMonth: dateObject.getMonth() == state.month - 1,
				});
				d++;
			}
			weeks.push({ days });
		}
		return weeks;
	}, [state.year, state.month]);

	const onSelectDayHandle = useCallback(
		(day) => {
			if (onSelect) {
				onSelect(day.value, { day });
			}
			if (onChange) {
				if (type === "string") {
					for (let key in values) {
						delete values[key];
					}
					values[day.value] = true;
					onChange(day.value);
				} else if (type === "array") {
					if (values[day.value]) {
						delete values[day.value];
					} else {
						values[day.value] = true;
					}
					onChange(Object.keys(values));
				} else {
					console.error("onChange is supported only for string or array type value");
				}
			}
		},
		[type, values, onSelect, onChange]
	);

	useEffect(() => {
		if (!props.year || props.month) {
			return;
		}
		dispatch({
			type: "goto",
			year: props.year,
			month: props.month,
		});
	}, [props.year, props.month]);

	console.log({ values, state });

	const Thead = useCallback((props) => {
		const { classes } = props;
		return (
			<thead className={classes()}>
				<tr className={classes.week()}>
					{"日,月,火,水,木,金,土".split(",").map((d) => (
						<th className={classes.week.day()} key={d}>
							{d}
						</th>
					))}
				</tr>
			</thead>
		);
	}, []);
	const Cell = useCallback((props) => {
		const { classes, day, values, index } = props;
		const t = day.dateObject.getTime();
		const value = values[day.value] ? values[day.value] : null;
		const isValid = t >= minTime && t <= maxTime && !(exclude && exclude(day.dateObject));
		return (
			<td
				className={classes(weekDays[index], day.inMonth ? "is-in-month" : "is-out-month", value && ((value.classes != null && value.classes) || "is-active"), { "is-disabled": !isValid })}
				onClick={() => {
					if (isValid) {
						onSelectDayHandle(day);
					}
				}}
			>
				<span className={classes.date()}>{day.dateObject.getDate()}</span>
				{value && value.content && <div className={classes.date.content()}>{value.content}</div>}
			</td>
		);
	}, []);

	return (
		<div className={classes("is-size-" + size)}>
			<table className={classes.table()}>
				<caption className={classes.table.caption()}>
					{showYear && (
						<div className={classes.table.caption.year()}>
							{showControl && (
								<Fragment>
									<span className={classes.table.caption.year.button("is-prev10")} onClick={() => dispatch({ type: "prev10Year" })}></span>
									<span className={classes.table.caption.year.button("is-prev")} onClick={() => dispatch({ type: "prevYear" })}></span>
								</Fragment>
							)}
							<span className="current">{state.year}</span>
							{showControl && (
								<Fragment>
									<span className={classes.table.caption.year.button("is-next")} onClick={() => dispatch({ type: "nextYear" })}></span>
									<span className={classes.table.caption.year.button("is-next10")} onClick={() => dispatch({ type: "next10Year" })}></span>
								</Fragment>
							)}
						</div>
					)}
					{showMonth && (
						<div className={classes.table.caption.month()}>
							{showControl && <span className={classes.table.caption.month.button("is-prev")} onClick={() => dispatch({ type: "prevMonth" })}></span>}
							<span className={classes.table.caption.month.current()}>{state.month}</span>
							{showControl && <span className={classes.table.caption.month.button("is-next")} onClick={() => dispatch({ type: "nextMonth" })}></span>}
						</div>
					)}
				</caption>
				<Thead classes={classes.table.thead} />
				<tbody className={classes.table.tbody()}>
					{weeks.map((week, index) => {
						return (
							<tr className={classes.table.tbody.week()} key={index}>
								{week.days.map((day, index) => (
									<Cell classes={classes.table.tbody.week.day} day={day} index={index} values={values} key={index} />
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
