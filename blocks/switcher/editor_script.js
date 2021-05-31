registerBlockType('catpow/switcher', {
  title: '🐾 Switcher',
  description: '日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。',
  icon: 'networking',
  category: 'catpow-functional',
  example: CP.example,
  edit: function edit(props) {
    var attributes = props.attributes,
        className = props.className,
        setAttributes = props.setAttributes,
        isSelected = props.isSelected,
        clientId = props.clientId;
    var _wp$element = wp.element,
        useState = _wp$element.useState,
        useEffect = _wp$element.useEffect,
        useMemo = _wp$element.useMemo,
        useCallback = _wp$element.useCallback;
    var _attributes$currentIn = attributes.currentIndex,
        currentIndex = _attributes$currentIn === void 0 ? 0 : _attributes$currentIn;

    var _useState = useState(false),
        _useState2 = babelHelpers.slicedToArray(_useState, 2),
        newBlocks = _useState2[0],
        setNewBlocks = _useState2[1];

    var selectiveClasses = [{
      label: 'ファクター',
      input: 'select',
      key: 'factor',
      values: {
        schedule: '日時',
        is_user_logged_in: 'ログイン',
        current_user_can: 'ユーザー権限',
        user_value: 'ユーザー情報',
        input_value: 'フォーム入力値',
        content_value: 'コンテンツ情報'
      }
    }, {
      label: 'フィールド',
      input: 'text',
      key: 'field',
      cond: ['user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1
    }, {
      label: '比較',
      input: 'buttons',
      key: 'compare',
      values: ['=', 'IN', 'BETWEEN'],
      cond: ['user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1
    }, {
      label: '値',
      input: 'textarea',
      key: 'values',
      cond: ['schedule', 'current_user_can', 'user_value', 'input_value', 'content_value'].indexOf(attributes.factor) > -1
    }];
    var values = useMemo(function () {
      return attributes.values.split("\n");
    }, [attributes.values]);
    useEffect(function () {
      var editor = wp.data.dispatch('core/block-editor');
      var blocks = wp.data.select('core/block-editor').getBlock(clientId).innerBlocks;
      var newBlocks = values.map(function (cond, index) {
        if (undefined === blocks[index]) {
          return wp.blocks.createBlock('catpow/switchercontent', {
            cond: cond
          });
        }

        editor.updateBlockAttributes(blocks[index].clientId, {
          cond: cond
        });
        return blocks[index];
      });

      if (blocks.length !== newBlocks.length) {
        setNewBlocks(newBlocks);
      }
    }, [values]);
    useEffect(function () {
      if (newBlocks) {
        var editor = wp.data.dispatch('core/block-editor');
        editor.replaceInnerBlocks(clientId, newBlocks);
        var blocks = wp.data.select('core/block-editor').getBlock(clientId).innerBlocks;
        values.map(function (cond, index) {
          editor.updateBlockAttributes(blocks[index].clientId, {
            cond: cond
          });
        });
        setNewBlocks(false);
      }
    }, [currentIndex]);
    useEffect(function () {
      switch (attributes.factor) {
        case 'schedule':
          setAttributes({
            values: "0:00~6:00\n6:00~12:00\n12:00~18:00\n18:00~24:00"
          });
          break;

        case 'is_user_logged_in':
          setAttributes({
            values: "out\nin"
          });
          break;

        case 'current_user_can':
          setAttributes({
            values: "administrator\neditor\nauthor\ncontributor\nsubscriber"
          });
          break;
      }
    }, [attributes.factor]);
    return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
      className: "switcherEdit",
      "data-current-index": currentIndex
    }, wp.element.createElement("ul", {
      className: "tabs"
    }, wp.element.createElement("li", {
      className: "tab icon"
    }, wp.element.createElement(Icon, {
      icon: "networking"
    })), values.map(function (cond, index) {
      return wp.element.createElement("li", {
        className: "tab" + (index === currentIndex ? ' active' : ''),
        onClick: function onClick() {
          setAttributes({
            currentIndex: index
          });
        }
      }, cond);
    })), wp.element.createElement("div", {
      className: "contents"
    }, wp.element.createElement(InnerBlocks, {
      template: values.map(function (cond) {
        return ['catpow/switchercontent', {
          cond: cond
        }];
      }),
      allowedBlocks: ['catpow/switchercontent']
    }))), wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      icon: "art",
      classKey: "factor",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses,
      filters: CP.filters.switcher || {},
      initialOpen: true
    })));
  },
  save: function save(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    return wp.element.createElement(InnerBlocks.Content, null);
  }
});
registerBlockType('catpow/switchercontent', {
  title: '🐾 SwitcherContent',
  icon: 'editor-code',
  category: 'catpow',
  parent: ['catpow/switcher'],
  attributes: {
    cond: {
      source: 'attribute',
      label: '条件',
      selector: 'switcherContent',
      attribute: 'cond',
      default: 'content'
    }
  },
  edit: function edit(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes,
        clientId = _ref2.clientId;
    var cond = attributes.cond;
    return wp.element.createElement("div", {
      className: 'switcherContent'
    }, wp.element.createElement(InnerBlocks, {
      template: [['core/paragraph']],
      templateLock: false
    }));
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes,
        className = _ref3.className,
        setAttributes = _ref3.setAttributes;
    var cond = attributes.cond;
    return wp.element.createElement(Fragment, null, wp.element.createElement("switcherContent", {
      cond: cond
    }, wp.element.createElement(InnerBlocks.Content, null)));
  }
});
