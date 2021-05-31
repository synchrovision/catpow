registerBlockType('catpow/form', {
  title: '🐾 Form',
  description: 'テーマに定義されたフォームを表示します。',
  icon: 'editor-code',
  category: 'catpow-embed',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var content_path = attributes.content_path,
        post_data_path = attributes.post_data_path,
        inputs = attributes.inputs,
        data_id = attributes.data_id,
        values = attributes.values;
    var postDataSelection = false;
    Object.keys(cpEmbeddablesTree.form).forEach(function (parentKey) {
      cpEmbeddablesTree.form[parentKey].children.map(function (item) {
        if (item.id === content_path && item.post_data_paths) {
          postDataSelection = [];
          Object.keys(item.post_data_paths).forEach(function (key) {
            postDataSelection.push({
              id: key,
              name: item.post_data_paths[key]
            });
          });
        }
      });
    });

    if (postDataSelection === false) {
      if (post_data_path) {
        setAttributes({
          post_data_path: false
        });
      }
    } else {
      if (!post_data_path || !postDataSelection.some(function (item) {
        return item['id'] === post_data_path;
      })) {
        setAttributes({
          post_data_path: postDataSelection[0]['id']
        });
      }
    }

    return [wp.element.createElement("div", {
      class: "embedded_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, content_path), wp.element.createElement(ServerSideRender, {
      block: "catpow/form",
      attributes: attributes
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "\u30D5\u30A9\u30FC\u30E0"
    }, wp.element.createElement(TreeSelect, {
      label: "path",
      selectedId: content_path,
      tree: cpEmbeddablesTree.form,
      onChange: function onChange(content_path) {
        setAttributes({
          content_path: content_path
        });
      }
    }), postDataSelection && wp.element.createElement(TreeSelect, {
      label: "form",
      selectedId: post_data_path,
      tree: postDataSelection,
      onChange: function onChange(post_data_path) {
        setAttributes({
          post_data_path: post_data_path
        });
      }
    })), wp.element.createElement(PanelBody, {
      title: "\u5165\u529B\u5024",
      initialOpen: false
    }, wp.element.createElement(TextControl, {
      label: "\u5165\u529B\u540D",
      value: inputs,
      onChange: function onChange(inputs) {
        setAttributes({
          inputs: inputs
        });
      }
    }), wp.element.createElement(TextControl, {
      label: "\u30C7\u30FC\u30BFID",
      value: data_id,
      onChange: function onChange(data_id) {
        setAttributes({
          data_id: data_id
        });
      }
    }), wp.element.createElement(TextareaControl, {
      label: "\u521D\u671F\u5024",
      value: values,
      onChange: function onChange(values) {
        setAttributes({
          values: values
        });
      }
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return 'null';
  }
});
