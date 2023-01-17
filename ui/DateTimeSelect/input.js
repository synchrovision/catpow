(() => {
  // ui/DateTimeSelect/input.jsx
  Catpow.UI.DateTimeSelect = class extends wp.element.Component {
    constructor(props) {
      super(props);
      var date, min, max, step, selections, i;
      if (props.value) {
        var dateArr = props.value.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+)$/);
        date = new Date(dateArr[1], dateArr[2] - 1, dateArr[3], dateArr[4], dateArr[5]);
      } else if (props.default) {
        date = new Date(props.default);
      } else {
        date = false;
      }
      if (props.min) {
        min = new Date(props.min);
      } else {
        min = new Date(Date.now() - 1e3 * 3600 * 24 * 3e3);
      }
      if (props.max) {
        max = new Date(props.max);
      } else {
        max = new Date(Date.now() + 1e3 * 3600 * 24 * 3e3);
      }
      if (props.step) {
        step = props.step;
      } else {
        step = 5;
      }
      selections = {
        year: [],
        month: [],
        date: [],
        hours: [],
        minutes: []
      };
      for (i = min.getFullYear(); i <= max.getFullYear(); i++) {
        selections.year.push(i);
      }
      for (i = 1; i <= 12; i++) {
        selections.month.push(i);
      }
      for (i = 1; i <= 31; i++) {
        selections.date.push(i);
      }
      for (i = 0; i <= 23; i++) {
        selections.hours.push(i);
      }
      for (i = 0; i <= 59; i += step) {
        selections.minutes.push(i);
      }
      this.state = { date, selections, min, max };
    }
    render() {
      var { date, min, max } = this.state;
      if (date !== false) {
        if (min > date) {
          date = new Date(min);
        } else if (max < date) {
          date = new Date(max);
        } else {
          date = new Date(date);
        }
      }
      const nameInFunction = {
        Y: "FullYear",
        m: "Month",
        d: "Date",
        w: "Day",
        H: "Hours",
        i: "Minutes",
        s: "Seconds"
      };
      const setDate = (key, val) => {
        if (val == -1) {
          date = false;
        } else {
          if (date === false) {
            date = new Date();
          }
          val = parseInt(val);
          if (key === "m") {
            val--;
          }
          date["set" + nameInFunction[key]](val);
        }
        this.setState({ date });
      };
      const getDate = (key) => {
        if (date === false) {
          return "\u2212";
        }
        var val = date["get" + nameInFunction[key]]();
        if (key === "m") {
          val++;
        }
        return val;
      };
      return /* @__PURE__ */ wp.element.createElement("div", { className: "DateSelect" }, /* @__PURE__ */ wp.element.createElement("div", { className: "value year", onClick: () => {
        this.setState({ yearSelecting: true });
      } }, getDate("Y")), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: this.state.yearSelecting, onClose: () => this.setState({ yearSelecting: false }) }, /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectTable,
        {
          selections: this.state.selections.year,
          value: getDate("Y"),
          col: 10,
          spacer: this.state.selections.year[0] % 10,
          onChange: (label) => {
            setDate("Y", label);
            this.setState({ yearSelecting: false });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u5E74"), /* @__PURE__ */ wp.element.createElement("div", { className: "value month", onClick: () => {
        this.setState({ monthSelecting: true });
      } }, getDate("m")), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: this.state.monthSelecting, onClose: () => this.setState({ monthSelecting: false }) }, /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectTable,
        {
          selections: this.state.selections.month,
          value: getDate("m"),
          col: 6,
          onChange: (label) => {
            setDate("m", label);
            this.setState({ monthSelecting: false });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u6708"), /* @__PURE__ */ wp.element.createElement("div", { className: "value date", onClick: () => {
        this.setState({ dateSelecting: true });
      } }, getDate("d")), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: this.state.dateSelecting, onClose: () => this.setState({ dateSelecting: false }) }, /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectTable,
        {
          selections: this.state.selections.date,
          value: getDate("d"),
          col: 7,
          onChange: (label) => {
            setDate("d", label);
            this.setState({ dateSelecting: false });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u65E5"), /* @__PURE__ */ wp.element.createElement("div", { className: "value hours", onClick: () => {
        this.setState({ hoursSelecting: true });
      } }, getDate("H")), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: this.state.hoursSelecting, onClose: () => this.setState({ hoursSelecting: false }) }, /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectTable,
        {
          selections: this.state.selections.hours,
          value: getDate("H"),
          col: 12,
          onChange: (label) => {
            setDate("H", label);
            this.setState({ hoursSelecting: false });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u6642"), /* @__PURE__ */ wp.element.createElement("div", { className: "value minutes", onClick: () => {
        this.setState({ minutesSelecting: true });
      } }, getDate("i")), /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: this.state.minutesSelecting, onClose: () => this.setState({ minutesSelecting: false }) }, /* @__PURE__ */ wp.element.createElement(
        Catpow.SelectTable,
        {
          selections: this.state.selections.minutes,
          value: getDate("i"),
          col: 4,
          onChange: (label) => {
            setDate("i", label);
            this.setState({ minutesSelecting: false });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement("span", { className: "unit" }, "\u5206"), date !== false && /* @__PURE__ */ wp.element.createElement(
        Catpow.UI.HiddenValues,
        {
          name: this.props.name,
          value: Catpow.util.getDateTimeValue(date)
        }
      ));
    }
  };
})();
