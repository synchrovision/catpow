Catpow.Output = function (props) {
  var conf = props.conf,
      value = props.value;
  var el = wp.element.createElemnt;
  if (!value) return '';

  switch (conf.output_type) {
    case 'group':
      return wp.element.createElement("ul", {
        className: "OutputGroup"
      }, Object.keys(value).map(function (key) {
        var row = value[key];
        console.log(key);
        console.log(row);
        return wp.element.createElement("li", {
          className: "item",
          key: key
        }, Object.keys(conf.meta).map(function (name) {
          return wp.element.createElement("dl", {
            key: name
          }, wp.element.createElement("dt", null, conf.meta[name].label), wp.element.createElement("dd", null, wp.element.createElement(Catpow.Output, {
            conf: conf.meta[name],
            value: row[name]
          })));
        }));
      }));

    case 'select':
    case 'radio':
    case 'checkbox':
      {
        var labels = (Array.isArray(value) ? value : [value]).filter(function (val) {
          return !!val;
        }).map(function (val) {
          return conf.dict && conf.dict[val];
        });

        if (!labels.length) {
          return false;
        }

        return wp.element.createElement("ul", {
          clasName: "OutputLabels"
        }, labels.map(function (label) {
          return wp.element.createElement("li", {
            className: "item"
          }, label);
        }));
      }

    case 'image':
      return wp.element.createElement("ul", {
        className: "OutputImages"
      }, wp.element.createElement("li", {
        className: "item"
      }, props.images.map(function (image) {
        return wp.element.createElement("img", {
          className: "image",
          src: image.url
        });
      })));

    default:
      return value.join(',');
  }
};
