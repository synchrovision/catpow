(() => {
  // ../default/config/template/compose/component.jsx
  var Compose = class extends wp.element.Component {
    constructor(props) {
      super(props);
      var { myData } = props;
      var count = 0;
      this.state = { myData, count };
    }
    render() {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { class: "result" }, this.state.wait ? "waiting..." : this.state.myData + this.state.count), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: (e) => {
            this.setState({ wait: true });
            wp.apiFetch({ path: this.props.path + "/myAction", method: "post", data: this.state }).then((data) => {
              data.wait = false;
              this.setState(data);
            }).catch((e2) => {
              console.log(e2);
            });
          }
        },
        "myAction"
      ));
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
  };
})();
