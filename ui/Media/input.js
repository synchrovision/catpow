(() => {
  // ../ui/Media/input.jsx
  Catpow.UI.Media = class extends wp.element.Component {
    constructor(props) {
      super(props);
      this.state = { value: props.value };
      if (void 0 === Catpow.uploader) {
        Catpow.uploader = wp.media({
          title: "Select Image",
          button: { text: "Select" },
          multiple: false
        });
      }
    }
    render() {
      var { value } = this.state;
      var { type, mime, size, src, srcset, alt } = value;
      const el = wp.element.createElement;
      const selectMedia = () => {
        Catpow.uploader.off("select").on("select", () => {
          let image = Catpow.uploader.state().get("selection").first().toJSON();
          let value2 = {
            mime: image.mime,
            alt: image.alt
          };
          if (size && image.sizes && image.sizes[size]) {
            value2.src = image.sizes[size].url;
          } else {
            value2.src = image.url;
          }
          if (image.sizes) {
            value2.srcset = image.sizes.medium_large.url + " 480w," + image.url;
          }
          this.setState({ value: value2 });
        }).open();
      };
      return /* @__PURE__ */ React.createElement("div", { className: "Media" }, el(type, { src, className: "preview", onClick: selectMedia }), /* @__PURE__ */ React.createElement(
        Catpow.UI.HiddenValues,
        {
          name: this.props.name,
          value
        }
      ));
    }
  };
})();
