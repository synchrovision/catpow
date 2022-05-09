registerBlockType('catpow/t-box', {
  title: '🐾 T-Box',
  description: 'HTMLメール用のレイアウト調整用コンテナブロックです。',
  icon: 'editor-code',
  category: 'catpow-mail',
  parent: ['catpow/t-body', 'catpow/t-box', 'catpow/t-loop'],
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'table',
      attribute: 'class',
      default: 'wp-block-catpow-t-box large'
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    var _wp$element = wp.element,
        useState = _wp$element.useState,
        useMemo = _wp$element.useMemo;
    var classes = attributes.classes;
    var primaryClass = 'wp-block-catpow-t-box';
    var states = CP.wordsToFlags(classes);
    var selectiveClasses = useMemo(function () {
      var selectiveClasses = [{
        name: 'size',
        label: 'サイズ',
        values: ['large', 'medium', 'small']
      }];
      wp.hooks.applyFilters('catpow.blocks.t-box.selectiveClasses', CP.finderProxy(selectiveClasses));
      return selectiveClasses;
    }, []);
    return [wp.element.createElement("table", {
      className: classes
    }, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", null, wp.element.createElement(InnerBlocks, null))))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters['t-box'] || {}
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
    var classes = attributes.classes;
    var primaryClass = 'wp-block-catpow-t-box';
    var states = CP.wordsToFlags(classes);
    return wp.element.createElement("table", {
      className: classes
    }, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", null, wp.element.createElement(InnerBlocks.Content, null)))));
  }
});
