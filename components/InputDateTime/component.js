function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); _groups.set(_this, groups || _groups.get(re)); return babelHelpers.setPrototypeOf(_this, BabelRegExp.prototype); } babelHelpers.inherits(BabelRegExp, RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; if (babelHelpers.typeof(args[args.length - 1]) !== "object") { args = [].slice.call(args); args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

Catpow.InputDateTime = function (props) {
  var value = props.value,
      onChange = props.onChange;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useMemo = _wp$element.useMemo,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect;

  var _useState = useState(''),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      dateStr = _useState2[0],
      setDateStr = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = babelHelpers.slicedToArray(_useState3, 2),
      isValid = _useState4[0],
      setIsValid = _useState4[1];

  var update = useCallback(function (dateStr) {
    var dateData = parseDateString(dateStr);

    if (dateData) {
      var date = new Date(dateData.groups.year, parseInt(dateData.groups.month) - 1, dateData.groups.date);

      if (dateData.groups.hours) {
        date.setHours(dateData.groups.hours);
        date.setMinutes(dateData.groups.minutes);
      }

      onChange(date.getTime());
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, []);
  var getDateString = useCallback(function (date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + date.getHours() + ':' + ('00' + date.getMinutes()).slice(-2);
  }, []);
  var parseDateString = useCallback(function (dateStr) {
    return dateStr.match( /*#__PURE__*/_wrapRegExp(/^([0-9]{4})\x2D([0-9]{1,2})\x2D([0-9]{1,2})(?: ([0-9]{1,2}):([0-9]{2}))?$/, {
      year: 1,
      month: 2,
      date: 3,
      hours: 4,
      minutes: 5
    }));
  }, []);
  useEffect(function () {
    setDateStr(getDateString(new Date(value)));
  }, [value]);
  return wp.element.createElement("div", {
    className: "InputDateTime" + (isValid ? ' valid' : ' invalid')
  }, wp.element.createElement("input", {
    type: "text",
    className: "InputDateTime__date",
    placeholder: '0000-00-00 00:00',
    value: dateStr,
    onChange: function onChange(e) {
      setDateStr(e.target.value);
    },
    onBlur: function onBlur(e) {
      update(dateStr);
    },
    onKeyPress: function onKeyPress(e) {
      if (e.key == 'Enter') {
        e.preventDefault();
        update(dateStr);
      }
    }
  }));
};
