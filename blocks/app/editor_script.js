/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/
registerBlockType('catpow/app', {
  title: '🐾 App',
  icon: 'editor-code',
  category: 'catpow-embed',
  example: CP.example,
  supports: {
    customClassName: false
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var content_path = attributes.content_path,
        props = attributes.props,
        options = attributes.options;
    var useEffect = wp.element.useEffect;

    if (!options && content_path) {
      var path = content_path.substr(0, content_path.lastIndexOf('/'));
      wp.apiFetch({
        path: '/cp/v1/blocks/config/app/options?path=' + path
      }).catch(function (res) {
        console.log(res);
      }).then(function (options) {
        var newProps = JSON.parse(props);

        var initOption = function initOption(option) {
          option.json = 'props';

          if (option.hasOwnProperty('default') && !newProps.hasOwnProperty(option.key)) {
            newProps[option.key] = option.default;
          }

          if (option.sub) {
            if (Array.isArray(option.sub)) {
              option.sub.forEach(initOption);
            } else {
              Object.keys(option.sub).forEach(function (key) {
                return initOption(option.sub[key]);
              });
            }
          }
        };

        options.forEach(initOption);
        setAttributes({
          options: options,
          props: JSON.stringify(newProps)
        });
      });
    }

    return [wp.element.createElement("div", {
      class: "embedded_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, content_path), wp.element.createElement(CP.ServerSideRender, {
      block: "catpow/app",
      attributes: attributes
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "Path"
    }, wp.element.createElement(TreeSelect, {
      label: "path",
      selectedId: content_path,
      tree: cpEmbeddablesTree.app,
      onChange: function onChange(content_path) {
        var path = content_path.substr(0, content_path.lastIndexOf('/'));
        setAttributes({
          content_path: content_path,
          options: false,
          props: JSON.stringify({
            path: path
          })
        });
      }
    })), options && wp.element.createElement(CP.SelectClassPanel, {
      title: "\u8A2D\u5B9A",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: options,
      initialOpen: true
    }))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return 'null';
  }
});
