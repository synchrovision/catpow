(() => {
  // ../ui/PieChart/input.jsx
  Catpow.UI.PieChart = class extends wp.element.Component {
    constructor(props) {
      super(props);
      var { value, total } = props;
      var press = false;
      if (void 0 === total) {
        total = 100;
      }
      this.bodyBnd = { ox: 150, oy: 150, r: 100 };
      this.total = total;
      this.state = { value, press };
    }
    render() {
      var { value, press } = this.state;
      const val2pos = (v2) => {
        var rad = v2 / this.total * Math.PI * 2 - Math.PI / 2;
        return {
          x: Math.cos(rad) * this.bodyBnd.r + this.bodyBnd.ox,
          y: Math.sin(rad) * this.bodyBnd.r + this.bodyBnd.oy
        };
      };
      var i, d, crrVal, crrPos, pies = [];
      crrVal = 0;
      crrPos = val2pos(0);
      for (i = 0; i < 4; i++) {
        d = "M " + this.bodyBnd.ox + " " + this.bodyBnd.oy + " L " + crrPos.x + " " + crrPos.y;
        var v = Math.random() * 80;
        crrVal += Math.floor(v);
        if (crrVal > this.total) {
          break;
        }
        crrPos = val2pos(crrVal);
        d += " A " + this.bodyBnd.r + " " + this.bodyBnd.r + " 0 " + (v * 2 > this.total ? "1" : "0") + " 1 " + crrPos.x + " " + crrPos.y;
        d += " L " + this.bodyBnd.ox + " " + this.bodyBnd.oy;
        pies.push(
          /* @__PURE__ */ React.createElement("path", { d, stroke: "red" })
        );
      }
      return /* @__PURE__ */ React.createElement("div", { className: "PieChart" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 300 300" }, pies, /* @__PURE__ */ React.createElement(
        "rect",
        {
          className: "control",
          x: this.bodyBnd.l,
          y: this.bodyBnd.t,
          width: this.bodyBnd.w,
          height: this.bodyBnd.h,
          onMouseDown: (e) => {
            this.setState({ press: true });
          },
          onMouseUp: (e) => {
            this.setState({ press: false });
          },
          onMouseOut: (e) => {
            this.setState({ press: false });
          },
          onMouseMove: (e) => {
            if (!press) {
              return;
            }
            var bnd = e.target.getBoundingClientRect();
            this.setState({
              value: {
                x: parseInt((e.clientX - parseInt(bnd.left)) / bnd.width * this.valMap.w + this.valMap.x),
                y: parseInt((e.clientY - parseInt(bnd.top)) / bnd.height * this.valMap.h + this.valMap.y)
              }
            });
          }
        }
      )), /* @__PURE__ */ React.createElement(
        Catpow.UI.HiddenValues,
        {
          name: this.props.name,
          value
        }
      ));
    }
  };
})();
