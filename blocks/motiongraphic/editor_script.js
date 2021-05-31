/*
* 現在の投稿を規定のテンプレートを用いて表示する
* APIを用いて様々な操作を行うcomponentを表示する
*/
CP.config.motiongraphic = {};
registerBlockType('catpow/motiongraphic', {
  title: '🐾 MotionGraphic',
  icon: 'video-alt3',
  category: 'catpow-embed',
  example: CP.example,
  supports: {
    customClassName: false
  },
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        className = _ref.className;
    var useCallback = wp.element.useCallback;
    var _attributes$classes = attributes.classes,
        classes = _attributes$classes === void 0 ? '' : _attributes$classes,
        component = attributes.component,
        props = attributes.props;
    var selections = CP.config.motiongraphic.selections;
    var initSelectionItems = useCallback(function (items) {
      if (Array.isArray(items)) {
        items.map(function (item) {
          item.json = 'props';

          if (item.sub) {
            initSelectionItems(item.sub);
          }
        });
      } else {
        Object.keys(items).map(function (key) {
          initSelectionItems(items[key]);
        });
      }
    }, [attributes]);

    if (!selections) {
      wp.apiFetch({
        path: 'cp/v1/blocks/config/motiongraphic/selections'
      }).then(function (res) {
        initSelectionItems(res.items[0].sub);
        CP.config.motiongraphic.selections = res.items;
        setAttributes({
          selections: res.items
        });
      });
      return false;
    }

    var SelectedComponent = component && Catpow.Animation[component] ? Catpow.Animation[component] : false;
    return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
      class: "embedded_content"
    }, wp.element.createElement("div", {
      class: "label"
    }, component), wp.element.createElement("div", {
      className: classes
    }, wp.element.createElement("div", {
      className: "wp-block-catpow-motiongraphic__background"
    }, SelectedComponent ? wp.element.createElement(Catpow.FixedBG, null, wp.element.createElement(Catpow.Animation, null, wp.element.createElement(SelectedComponent, JSON.parse(props)))) : wp.element.createElement("p", null, "Select Component")), wp.element.createElement(InnerBlocks, null))), wp.element.createElement(InspectorControls, null, selections && wp.element.createElement(CP.SelectClassPanel, {
      classKey: "component",
      title: "\u8A2D\u5B9A",
      icon: "edit",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selections,
      initialOpen: true
    })));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var _attributes$classes2 = attributes.classes,
        classes = _attributes$classes2 === void 0 ? '' : _attributes$classes2;
    var states = CP.wordsToFlags(classes);
    return wp.element.createElement(InnerBlocks.Content, null);
  }
});
