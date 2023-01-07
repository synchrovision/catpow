(() => {
  // ../ui/SearchSelect/input.jsx
  Catpow.UI.SearchSelect = class extends wp.element.Component {
    constructor(props) {
      super(props);
      this.flatSelections = {};
      this.allLabels = [];
      let currentLabel = props.defaultLabel;
      const walkSelections = (sels) => {
        if (Array.isArray(sels)) {
          sels.map((val) => {
            if (typeof val === "object") {
              walkSelections(val);
            } else {
              this.flatSelections[val] = val;
              this.allLabels.push(val);
              if (val === this.props.value) {
                currentLabel = val;
              }
            }
          });
        } else {
          Object.keys(sels).map((key) => {
            let val = sels[key];
            if (typeof val === "object") {
              walkSelections(val);
            } else {
              this.flatSelections[key] = val;
              this.allLabels.push(key);
              if (val === this.props.value) {
                currentLabel = key;
              }
            }
          });
        }
      };
      walkSelections(props.selections);
      this.state = {
        value: props.value,
        selecting: false,
        currentSelections: [],
        currentLabel,
        cache: {},
        needle: ""
      };
    }
    render() {
      var classes = "SearchSelect";
      const { cache, needle, currentSelections, currentLabel } = this.state;
      const search = (needle2) => {
        if (cache[needle2]) {
          return cache[needle2];
        }
        if (needle2.length < 2) {
          return [];
        }
        let haystack;
        if (needle2.length > 3) {
          haystack = search(needle2.slice(0, -1));
        } else {
          haystack = this.allLabels;
        }
        return cache[needle2] = haystack.filter((val) => val.indexOf(needle2) >= 0);
      };
      return /* @__PURE__ */ React.createElement("div", { className: "SearchSelect" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "currentLabel",
          onClick: (e) => {
            this.setState({ selecting: !this.state.selecting });
          }
        },
        currentLabel || this.props.defaultLabel
      ), /* @__PURE__ */ React.createElement(Catpow.Popup, { open: this.state.selecting, onClose: () => this.setState({ selecting: false }) }, /* @__PURE__ */ React.createElement("div", { class: "searchBox" }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          className: "searchInput",
          value: needle,
          placeholder: this.props.placeholder,
          onChange: (e) => {
            this.setState({
              needle: e.currentTarget.value,
              currentSelections: search(e.currentTarget.value)
            });
          }
        }
      )), /* @__PURE__ */ React.createElement("div", { class: "selectBox" }, /* @__PURE__ */ React.createElement(
        Catpow.SelectTable,
        {
          selections: currentSelections,
          value: currentLabel,
          col: this.props.col || 5,
          onChange: (label) => {
            this.setState({
              value: this.flatSelections[label],
              needle: label,
              currentLabel: label,
              selecting: false
            });
          }
        }
      ))), /* @__PURE__ */ React.createElement(Catpow.UI.HiddenValues, { name: this.props.name, value: this.state.value }));
    }
  };
})();
