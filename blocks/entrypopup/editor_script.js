registerBlockType('catpow/entrypopup', {
  title: '🐾 EntryPopup',
  description: 'サイト・ページ訪問時に表示されるポップアップ。',
  icon: 'admin-comments',
  category: 'catpow',
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    var _wp$element = wp.element,
        Fragment = _wp$element.Fragment,
        useState = _wp$element.useState,
        useMemo = _wp$element.useMemo;

    var _useState = useState(false),
        _useState2 = babelHelpers.slicedToArray(_useState, 2),
        open = _useState2[0],
        setOpen = _useState2[1];

    var selectiveClasses = useMemo(function () {
      var selectiveClasses = [{
        input: 'buttons',
        name: 'target',
        label: '表示条件',
        values: {
          site: 'サイトで一回',
          page: 'ページで一回',
          every: '毎回表示'
        },
        key: 'target'
      }];
      wp.hooks.applyFilters('catpow.blocks.entrypopup.selectiveClasses', CP.finderProxy(selectiveClasses));
      return selectiveClasses;
    }, []);
    return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
      className: "collapsible_content " + (open ? 'open' : 'close')
    }, wp.element.createElement("div", {
      class: "label",
      onClick: function onClick() {
        return setOpen(!open);
      }
    }, "\uD83D\uDC3E EntryPopup"), wp.element.createElement("div", {
      className: attributes.classes
    }, wp.element.createElement("div", {
      className: "body"
    }, wp.element.createElement("div", {
      className: "contents"
    }, wp.element.createElement(InnerBlocks, null)), wp.element.createElement("div", {
      className: "close",
      onClick: function onClick() {
        return setOpen(false);
      }
    })), wp.element.createElement("div", {
      class: "bg"
    }))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: __('クラス', 'catpow'),
      icon: "art",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses
    })));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    return wp.element.createElement("div", {
      className: attributes.classes
    }, wp.element.createElement("div", {
      className: "body"
    }, wp.element.createElement("div", {
      className: "contents"
    }, wp.element.createElement(InnerBlocks.Content, null)), wp.element.createElement("div", {
      className: "close"
    })), wp.element.createElement("div", {
      className: "bg"
    }));
  }
});
