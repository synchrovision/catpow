(() => {
  // ../ui/Payment/input.jsx
  Catpow.UI.Payment = class extends wp.element.Component {
    constructor(props) {
      super(props);
    }
    render() {
      var { cart, payment } = this.props;
      return /* @__PURE__ */ React.createElement("div", { className: "Payment" }, /* @__PURE__ */ React.createElement(
        Catpow.UI.HiddenValues,
        {
          name: this.props.name,
          value: this.state.value
        }
      ));
    }
  };
})();
