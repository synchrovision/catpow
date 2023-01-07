(() => {
  // ../components/Hexagon/component.jsx
  Catpow.Hexagon = function(props) {
    let { children, id, src, imageBounds, handler, ...otherProps } = props;
    let hexagon;
    if (src) {
      imageBounds = imageBounds || [-30, 0, 160, 120];
      hexagon = /* @__PURE__ */ React.createElement("svg", { className: "Hexagon", viewBox: "0 0 100 120" }, /* @__PURE__ */ React.createElement("clipPath", { id: id + "_clip" }, /* @__PURE__ */ React.createElement("polygon", { points: "0,30 0,90 50,120 100,90 100,30 50,0" })), /* @__PURE__ */ React.createElement("g", { "clip-path": "url(#" + id + "_clip)" }, /* @__PURE__ */ React.createElement("image", { x: imageBounds[0], y: imageBounds[1], width: imageBounds[2], height: imageBounds[3], href: src })));
    } else {
      hexagon = /* @__PURE__ */ React.createElement("svg", { className: "Hexagon", viewBox: "0 0 100 120" }, /* @__PURE__ */ React.createElement("polygon", { points: "0,30 0,90 50,120 100,90 100,30 50,0" }));
    }
    return /* @__PURE__ */ React.createElement("div", { id, ...otherProps }, hexagon, children && /* @__PURE__ */ React.createElement("div", { className: "contents" }, children), handler && /* @__PURE__ */ React.createElement("div", { className: "handlers" }, handler));
  };
})();
