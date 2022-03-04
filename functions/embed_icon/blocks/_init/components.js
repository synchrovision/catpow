wp.hooks.addFilter('catpow.IconComponent', 'catpow/editor', function () {
  return 'EmbedIcon';
});
CP.EmbedIcon = {
  Input: function Input(props) {
    var item = props.item,
        prm = props.prm,
        save = props.save;
    var parser = new DOMParser();
    var serializer = new XMLSerializer();
    return wp.element.createElement(CP.SelectPreparedImage, {
      name: "icon",
      value: item.embedIconSrc,
      color: 0,
      onChange: function onChange(image) {
        fetch(image.url).then(function (res) {
          return res.text();
        }).then(function (text) {
          var el = parser.parseFromString(text, 'image/svg+xml');
          save({
            embedIconSrc: image.url,
            embedIconCode: serializer.serializeToString(el)
          });
        });
      }
    });
  },
  Output: function Output(props) {
    var item = props.item;
    return wp.element.createElement("div", {
      className: "icon",
      "data-src": item.embedIconSrc,
      dangerouslySetInnerHTML: {
        __html: item.embedIconCode
      }
    });
  }
};
