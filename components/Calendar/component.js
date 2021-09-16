Catpow.Calendar = function (props) {
  var Fragment = wp.element.Fragment;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect,
      useReducer = _wp$element.useReducer,
      useMemo = _wp$element.useMemo;
  var _props$className = props.className,
      className = _props$className === void 0 ? 'medium' : _props$className,
      _props$min = props.min,
      min = _props$min === void 0 ? null : _props$min,
      _props$max = props.max,
      max = _props$max === void 0 ? null : _props$max,
      values = props.values,
      onSelect = props.onSelect,
      _props$showYear = props.showYear,
      showYear = _props$showYear === void 0 ? true : _props$showYear,
      _props$showMonth = props.showMonth,
      showMonth = _props$showMonth === void 0 ? true : _props$showMonth,
      _props$showControl = props.showControl,
      showControl = _props$showControl === void 0 ? false : _props$showControl;
  var minTime = min ? Catpow.util.getDateObject(min).getTime() : Number.MIN_VALUE;
  var maxTime = max ? Catpow.util.getDateObject(max).getTime() : Number.MAX_VALUE;
  var thead = useMemo(function () {
    return wp.element.createElement("thead", null, wp.element.createElement("tr", null, "日,月,火,水,木,金,土".split(',').map(function (d) {
      return wp.element.createElement("td", null, d);
    })));
  }, [props]);
  var weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  var _useReducer = useReducer(function (state, action) {
    switch (action.type) {
      case 'goto':
        return {
          year: action.year,
          month: action.month
        };

      case 'reset':
        return {
          year: props.year,
          month: props.month
        };

      case 'prevYear':
        return {
          year: state.year - 1,
          month: state.month
        };

      case 'nextYear':
        return {
          year: state.year + 1,
          month: state.month
        };

      case 'prev10Year':
        return {
          year: state.year - 10,
          month: state.month
        };

      case 'next10Year':
        return {
          year: state.year + 10,
          month: state.month
        };

      case 'prevMonth':
        var d = new Date(state.year, state.month - 2);
        return {
          year: d.getFullYear(),
          month: d.getMonth() + 1
        };

      case 'nextMonth':
        var d = new Date(state.year, state.month);
        return {
          year: d.getFullYear(),
          month: d.getMonth() + 1
        };
    }
  }, {
    year: props.year,
    month: props.month
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var weeks = useMemo(function () {
    var r,
        c,
        d,
        dateObject,
        weeks = [],
        days;
    var msOfDay = 86400000;
    var firstDay = new Date(state.year, state.month - 1, 1);
    var lastDay = new Date(state.year, state.month, 0);
    var d = -firstDay.getDay() + 1;

    for (var r = 0; r < 6; r++) {
      days = [];

      for (c = 1; c <= 7; c++) {
        dateObject = new Date(state.year, state.month - 1, d);
        days.push({
          dateObject: dateObject,
          value: Catpow.util.getDateValue(dateObject),
          inMonth: dateObject.getMonth() == state.month - 1
        });
        d++;
      }

      weeks.push({
        days: days
      });
    }

    return weeks;
  }, [state.year, state.month]);
  useEffect(function () {
    dispatch({
      type: 'goto',
      year: props.year,
      month: props.month
    });
  }, [props.year, props.month]);
  return wp.element.createElement("div", {
    className: 'Calendar ' + className
  }, wp.element.createElement("table", null, wp.element.createElement("caption", null, showYear && wp.element.createElement("div", {
    className: "year"
  }, showControl && wp.element.createElement(Fragment, null, wp.element.createElement("span", {
    className: "btn prev10",
    onClick: function onClick() {
      return dispatch({
        type: 'prev10Year'
      });
    }
  }), wp.element.createElement("span", {
    className: "btn prev",
    onClick: function onClick() {
      return dispatch({
        type: 'prevYear'
      });
    }
  })), wp.element.createElement("span", {
    class: "current"
  }, state.year), showControl && wp.element.createElement(Fragment, null, wp.element.createElement("span", {
    className: "btn next",
    onClick: function onClick() {
      return dispatch({
        type: 'nextYear'
      });
    }
  }), wp.element.createElement("span", {
    className: "btn next10",
    onClick: function onClick() {
      return dispatch({
        type: 'next10Year'
      });
    }
  }))), showMonth && wp.element.createElement("div", {
    className: "month"
  }, showControl && wp.element.createElement("span", {
    className: "btn prev",
    onClick: function onClick() {
      return dispatch({
        type: 'prevMonth'
      });
    }
  }), wp.element.createElement("span", {
    class: "current"
  }, state.month), showControl && wp.element.createElement("span", {
    className: "btn next",
    onClick: function onClick() {
      return dispatch({
        type: 'nextMonth'
      });
    }
  }))), thead, wp.element.createElement("tbody", null, weeks.map(function (week) {
    return wp.element.createElement("tr", {
      className: "week"
    }, week.days.map(function (day, i) {
      var t = day.dateObject.getTime();
      var value = values[day.value] ? values[day.value] : null;
      var inRange = t >= minTime && t <= maxTime;
      var classes = 'day';
      classes += ' ' + weekDays[i];
      classes += day.inMonth ? ' inMonth' : ' outMonth';
      classes += inRange ? '' : ' disabled';

      if (value) {
        if (babelHelpers.typeof(value) == 'object') {
          if ('classes' in value) {
            classes += value.classes;
          }
        } else {
          if (value) {
            classes += ' active';
          }
        }
      }

      return wp.element.createElement("td", {
        className: classes,
        onClick: function onClick() {
          if (inRange) {
            onSelect(day.value, {
              day: day,
              value: value
            });
          }
        }
      }, wp.element.createElement("span", {
        class: "date"
      }, day.dateObject.getDate()), value && value.content && wp.element.createElement("div", {
        className: "content"
      }, value.content));
    }));
  }))));
};
