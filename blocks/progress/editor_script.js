var _excluded = ["currentItemIndex"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

registerBlockType('catpow/progress', {
  title: '🐾 Progress',
  description: '進捗のブロックです。',
  icon: 'editor-ul',
  category: 'catpow',
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes,
        isSelected = _ref.isSelected;
    var _wp$element = wp.element,
        Fragment = _wp$element.Fragment,
        useMemo = _wp$element.useMemo,
        useCallback = _wp$element.useCallback,
        useEffect = _wp$element.useEffect;
    var _wp$components = wp.components,
        Flex = _wp$components.Flex,
        FlexItem = _wp$components.FlexItem,
        FlexBlock = _wp$components.FlexBlock,
        PanelBody = _wp$components.PanelBody,
        Button = _wp$components.Button,
        Spinner = _wp$components.Spinner,
        SelectControl = _wp$components.SelectControl,
        CheckboxControl = _wp$components.CheckboxControl,
        TextControl = _wp$components.TextControl;
    var post = attributes.post,
        settings = attributes.settings,
        selections = attributes.selections,
        activeLabel = attributes.activeLabel,
        progress = attributes.progress,
        _attributes$isWaiting = attributes.isWaiting,
        isWaiting = _attributes$isWaiting === void 0 ? false : _attributes$isWaiting;
    var selectiveClasses = useMemo(function () {
      return [{
        input: 'select',
        key: 'post',
        values: selections
      }, {
        input: 'range',
        key: 'step',
        min: 0,
        max: settings ? settings.items.length - 1 : 0
      }];
    }, [selections, settings]);
    var settingsSelectiveClasses = useMemo(function () {
      return [{
        type: 'buttons',
        label: 'サイズ',
        values: ['small', 'medium', 'large']
      }, {
        label: '番号',
        values: 'hasCounter',
        sub: [{
          input: 'text',
          label: '番号前テキスト',
          key: 'countPrefix'
        }, {
          input: 'text',
          label: '番号後テキスト',
          key: 'countSuffix'
        }]
      }];
    }, []);
    var sizeSettings = useMemo(function () {
      return CP.parseSelections(['small', 'medium', 'large']);
    }, []);
    var setSettings = useCallback(function (args) {
      var currentItemIndex = args.currentItemIndex,
          otherArgs = babelHelpers.objectWithoutProperties(args, _excluded);

      if (currentItemIndex !== undefined) {
        setAttributes({
          currentItemIndex: currentItemIndex
        });
      }

      setAttributes({
        settings: _objectSpread(_objectSpread({}, settings), otherArgs)
      });
    }, [setAttributes, attributes]);
    var registerSettings = useCallback(function () {
      var post_id = wp.data.select('core/editor').getCurrentPostId();
      setAttributes({
        isWaiting: true
      });
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings/register',
        method: 'post',
        data: {
          post_id: post_id,
          settings: settings
        }
      }).then(function (res) {
        setAttributes({
          post: res.post,
          selections: false,
          isWaiting: false
        });
      });
    }, [settings]);
    var updateSettings = useCallback(function () {
      setAttributes({
        isWaiting: true
      });
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings/update',
        method: 'post',
        data: {
          post: post,
          settings: settings
        }
      }).then(function (res) {
        setAttributes({
          isWaiting: false
        });
      });
    }, [post, settings]);
    var deleteSettings = useCallback(function () {
      setAttributes({
        isWaiting: true
      });
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings/delete',
        method: 'post',
        data: {
          post: post
        }
      }).then(function () {
        setAttributes({
          post: 'default',
          settings: false,
          selections: false,
          isWaiting: false
        });
      });
    }, [post]);
    var Items = useCallback(function (props) {
      var countPrefix = settings.countPrefix,
          countSuffix = settings.countSuffix;
      var states = CP.wordsToFlags(settings.classes);
      return settings.items.map(function (item, index) {
        return wp.element.createElement("li", {
          className: 'item ' + (index == attributes.step ? 'active' : ''),
          onClick: function onClick(e) {
            setAttributes({
              step: index
            });
          }
        }, states.hasCounter && wp.element.createElement("div", {
          className: "counter"
        }, countPrefix && wp.element.createElement("span", {
          class: "prefix"
        }, countPrefix), wp.element.createElement("span", {
          className: "number"
        }, index + 1), countSuffix && wp.element.createElement("span", {
          class: "suffix"
        }, countSuffix)), wp.element.createElement("div", {
          className: "label"
        }, wp.element.createElement(RichText, {
          onChange: function onChange(label) {
            item.label = label;
            setSettings(settings);
          },
          value: item.label
        })));
      });
    }, [setAttributes, attributes, setSettings, settings, isSelected]);

    if (!settings) {
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings',
        method: 'post',
        data: {
          post: post
        }
      }).then(function (settings) {
        setAttributes({
          settings: settings
        });
      });
    }

    if (!selections) {
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings/selections'
      }).then(function (selections) {
        setAttributes({
          selections: selections
        });
      });
    }

    var CenterSpinner = useCallback(function (props) {
      return wp.element.createElement(Flex, {
        justify: "center"
      }, wp.element.createElement(FlexItem, null, wp.element.createElement(Spinner, null)));
    }, []);
    useEffect(function () {
      setAttributes({
        settings: false
      });
    }, [post]);
    var states = settings && settings.classes ? CP.wordsToFlags(settings.classes) : {};
    return wp.element.createElement(Fragment, null, wp.element.createElement(InspectorControls, null, wp.element.createElement(CP.SelectClassPanel, {
      title: "\u30AF\u30E9\u30B9",
      initialOpen: true,
      icon: "admin-generic",
      set: setAttributes,
      attr: attributes,
      selectiveClasses: selectiveClasses
    }), settings ? wp.element.createElement(CP.SelectClassPanel, {
      title: "\u8A2D\u5B9A",
      initialOpen: false,
      icon: "admin-generic",
      set: setSettings,
      attr: settings,
      selectiveClasses: settingsSelectiveClasses
    }, wp.element.createElement(CP.EditItemsTable, {
      set: setSettings,
      attr: settings,
      columns: [{
        type: 'text',
        key: 'label'
      }]
    }), !isWaiting ? wp.element.createElement(Fragment, null, wp.element.createElement(Flex, {
      justify: "center"
    }, wp.element.createElement(FlexItem, null, wp.element.createElement(Button, {
      isPrimary: true,
      onClick: updateSettings
    }, "\u8A2D\u5B9A\u3092\u66F4\u65B0"))), wp.element.createElement(Flex, {
      justify: "center"
    }, wp.element.createElement(FlexItem, null, wp.element.createElement(Button, {
      isLink: true,
      onClick: registerSettings
    }, "\u767B\u9332"), "\uFF5C", wp.element.createElement(Button, {
      isLink: true,
      isDestructive: true,
      onClick: deleteSettings
    }, "\u524A\u9664")))) : wp.element.createElement(CenterSpinner, null)) : wp.element.createElement(CenterSpinner, null), wp.element.createElement(CP.ItemControlInfoPanel, null)), wp.element.createElement(Fragment, null, settings ? wp.element.createElement("div", {
      className: 'wp-block-catpow-progress ' + settings.classes
    }, wp.element.createElement("ul", {
      className: "items"
    }, wp.element.createElement(Items, null))) : wp.element.createElement(CenterSpinner, null)));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className;
    return false;
  }
});
