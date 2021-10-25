CP.config.switcher = {
  factors: {
    schedule: '日時',
    is_user_logged_in: 'ログイン',
    current_user_can: 'ユーザー権限',
    user_value: 'ユーザー情報',
    input_value: 'フォーム入力値',
    content_value: 'コンテンツ情報'
  },
  factorFlags: {
    schedule: 4,
    is_user_logged_in: 4,
    current_user_can: 4,
    user_value: 7,
    input_value: 7,
    content_value: 7
  },
  flagValues: {
    field: 1,
    compare: 2,
    values: 4
  }
};
registerBlockType('catpow/switcher', {
  title: '🐾 Switcher',
  description: '日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。',
  icon: 'networking',
  category: 'catpow-functional',
  example: CP.example,
  edit: function edit(props) {
    var _wp$data$select$getBl;

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

    var _CP$config$switcher = CP.config.switcher,
        factors = _CP$config$switcher.factors,
        factorFlags = _CP$config$switcher.factorFlags,
        flagValues = _CP$config$switcher.flagValues;
    var selectiveClasses = [{
      label: 'ファクター',
      input: 'select',
      key: 'factor',
      values: factors
    }, {
      label: 'フィールド',
      input: 'text',
      key: 'field',
      cond: factorFlags[attributes.factor] & flagValues['field']
    }, {
      label: '比較',
      input: 'buttons',
      key: 'compare',
      values: ['=', 'IN', 'BETWEEN'],
      cond: factorFlags[attributes.factor] & flagValues['compare']
    }, {
      label: '値',
      input: 'textarea',
      key: 'values',
      cond: factorFlags[attributes.factor] & flagValues['values']
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
    var currentBlockId = 'block-' + ((_wp$data$select$getBl = wp.data.select('core/block-editor').getBlock(clientId).innerBlocks[currentIndex]) === null || _wp$data$select$getBl === void 0 ? void 0 : _wp$data$select$getBl.clientId);
    return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
      className: "switcherEdit",
      "data-current-index": currentIndex
    }, wp.element.createElement("ul", {
      className: "tabs"
    }, wp.element.createElement("li", {
      className: "tab icon"
    }, wp.element.createElement(Icon, {
      icon: "networking"
    })), wp.element.createElement("li", {
      className: "tab"
    }, factors[attributes.factor]), factorFlags[attributes.factor] & flagValues['field'] ? wp.element.createElement("li", {
      className: "tab"
    }, attributes.field, factorFlags[attributes.factor] & flagValues['compare'] && '　' + attributes.compare) : false, factorFlags[attributes.factor] & flagValues['values'] ? values.map(function (cond, index) {
      return wp.element.createElement("li", {
        className: "tab" + (index === currentIndex ? ' active' : ''),
        onClick: function onClick() {
          setAttributes({
            currentIndex: index
          });
        }
      }, cond);
    }) : false), wp.element.createElement("div", {
      className: "contents"
    }, wp.element.createElement(InnerBlocks, {
      template: values.map(function (cond) {
        return ['catpow/switchercontent', {
          cond: cond
        }];
      }),
      allowedBlocks: ['catpow/switchercontent']
    }))), currentBlockId && wp.element.createElement("style", null, CP.createStyleCode(babelHelpers.defineProperty({}, '#' + currentBlockId, {
      display: 'block'
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
