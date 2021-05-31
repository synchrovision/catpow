function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

registerBlockType('catpow/t-heading', {
  title: '🐾 T-Heading',
  description: 'HTMLメール用の見出しブロックです。',
  icon: 'editor-code',
  category: 'catpow-mail',
  parent: ['catpow/t-body', 'catpow/t-box', 'catpow/t-loop'],
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('catpow/t-heading', {
          classes: 'wp-block-catpow-t-heading header center medium',
          text: attributes.content
        });
      }
    }, {
      type: 'block',
      blocks: ['catpow/t-paragraph'],
      transform: function transform(attributes) {
        return createBlock('catpow/t-heading', {
          classes: 'wp-block-catpow-t-heading header center medium',
          title: attributes.text
        });
      }
    }]
  },
  merge: function merge(attributes, attributesToMerge) {
    return {
      title: (attributes.title || '') + (attributesToMerge.title || '')
    };
  },
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'table',
      attribute: 'class',
      default: 'wp-block-catpow-t-heading header medium center'
    },
    title: {
      source: 'children',
      selector: 'tbody td',
      default: 'Title'
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        onReplace = _ref.onReplace,
        mergeBlocks = _ref.mergeBlocks;
    var classes = attributes.classes,
        title = attributes.title;
    var primaryClass = 'wp-block-catpow-t-heading';
    var states = CP.wordsToFlags(classes);
    var selectiveClasses = ['color', {
      label: 'タイプ',
      values: ['header', 'headline', 'catch']
    }, {
      label: 'サイズ',
      values: ['large', 'medium', 'small']
    }];
    return [wp.element.createElement("table", {
      width: "100%",
      className: classes
    }, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", null, wp.element.createElement(RichText, {
      identifier: "content",
      onMerge: mergeBlocks,
      multiline: false,
      onSplit: function onSplit(val) {
        if (!val) {
          return createBlock('catpow/t-paragraph', {
            classes: 'wp-block-catpow-t-paragraph left medium'
          });
        }

        return createBlock('catpow/t-heading', _objectSpread(_objectSpread({}, attributes), {}, {
          title: val
        }));
      },
      onReplace: onReplace,
      onRemove: function onRemove() {
        return onReplace([]);
      },
      onChange: function onChange(title) {
        setAttributes({
          title: title
        });
      },
      value: title
    }))))), wp.element.createElement(BlockControls, null, wp.element.createElement(CP.AlignClassToolbar, {
      set: setAttributes,
      attr: attributes
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters['t-heading'] || {}
    }), wp.element.createElement(PanelBody, {
      title: "CLASS",
      icon: "admin-generic",
      initialOpen: false
    }, wp.element.createElement(TextareaControl, {
      label: "\u30AF\u30E9\u30B9",
      onChange: function onChange(classes) {
        return setAttributes({
          classes: classes
        });
      },
      value: classes
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var classes = attributes.classes,
        title = attributes.title;
    var primaryClass = 'wp-block-catpow-t-heading';
    return wp.element.createElement("table", {
      width: "100%",
      className: classes
    }, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", null, wp.element.createElement(RichText.Content, {
      value: title
    })))));
  }
});
