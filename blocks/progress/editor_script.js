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
        useCallback = _wp$element.useCallback;
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
        progress = attributes.progress;
    var selectiveClasses = useMemo(function () {
      return [{
        input: 'text',
        label: '設定名',
        key: 'post'
      }];
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
          selections: false
        });
      });
    }, [settings]);
    var updateSettings = useCallback(function () {
      wp.apiFetch({
        path: '/cp/v1/blocks/config/progress/settings/update',
        method: 'post',
        data: {
          post: post,
          settings: settings
        }
      });
    }, [post, settings]);
    var deleteSettings = useCallback(function () {
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
          selections: false
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
        console.log(settings);
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
    var states = settings && settings.classes ? CP.wordsToFlags(settings.classes) : {};
    return wp.element.createElement(Fragment, null, wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
      title: "\u8A2D\u5B9A",
      initialOpen: false,
      icon: "admin-generic"
    }, selections ? wp.element.createElement(SelectControl, {
      value: post,
      options: Object.keys(selections).map(function (label) {
        return {
          label: label,
          value: selections[label]
        };
      }),
      onChange: function onChange(post) {
        setAttributes({
          post: post,
          settings: false
        });
      }
    }) : wp.element.createElement(CenterSpinner, null), wp.element.createElement(CheckboxControl, {
      label: "\u756A\u53F7",
      onChange: function onChange(flag) {
        states.hasCounter = flag;
        setSettings({
          classes: CP.flagsToWords(states)
        });
      },
      checked: states.hasCounter
    }), states.hasCounter && wp.element.createElement(Fragment, null, wp.element.createElement(TextControl, {
      label: "\u756A\u53F7\u524D\u30C6\u30AD\u30B9\u30C8",
      value: settings.countPrefix,
      onChange: function onChange(countPrefix) {
        setSettings({
          countPrefix: countPrefix
        });
      }
    }), wp.element.createElement(TextControl, {
      label: "\u756A\u53F7\u5F8C\u30C6\u30AD\u30B9\u30C8",
      value: settings.countSuffix,
      onChange: function onChange(countSuffix) {
        setSettings({
          countSuffix: countSuffix
        });
      }
    })), settings ? wp.element.createElement(CP.EditItemsTable, {
      set: setSettings,
      attr: settings,
      columns: [{
        type: 'text',
        key: 'label'
      }]
    }) : wp.element.createElement(CenterSpinner, null), wp.element.createElement(Flex, {
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
    }, "\u524A\u9664")))), wp.element.createElement(CP.ItemControlInfoPanel, null)), wp.element.createElement(Fragment, null, settings ? wp.element.createElement("div", {
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
