registerBlockType('catpow/sidebar', {
  title: '🐾 Sidebar',
  description: 'サイドバーのあるコンテンツ領域のコンテナです。',
  icon: 'editor-code',
  category: 'catpow',
  attributes: {
    classes: {
      source: 'attribute',
      selector: 'div',
      attribute: 'class',
      default: 'wp-block-catpow-sidebar left'
    }
  },
  example: CP.example,
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        className = _ref.className,
        setAttributes = _ref.setAttributes;
    var classes = attributes.classes;
    var primaryClass = 'wp-block-catpow-sidebar';

    var classArray = _.uniq((className + ' ' + classes).split(' '));

    return [wp.element.createElement("div", {
      className: classes
    }, wp.element.createElement(InnerBlocks, {
      template: [['catpow/maincolumn'], ['catpow/sidecolumn']],
      templateLock: "all"
    })), wp.element.createElement(BlockControls, null, wp.element.createElement(CP.AlignClassToolbar, {
      set: setAttributes,
      attr: attributes
    })), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
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
      value: classArray.join(' ')
    })))];
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes,
        className = _ref2.className,
        setAttributes = _ref2.setAttributes;
    var classes = attributes.classes;
    return wp.element.createElement("div", {
      className: classes
    }, wp.element.createElement(InnerBlocks.Content, null));
  }
});
registerBlockType('catpow/sidecolumn', {
  title: '🐾 SideColumn',
  icon: 'editor-code',
  category: 'catpow',
  parent: ['catpow/sidebar'],
  edit: function edit(_ref3) {
    var attributes = _ref3.attributes,
        className = _ref3.className,
        setAttributes = _ref3.setAttributes;
    return [wp.element.createElement("div", {
      className: 'column column_side'
    }, wp.element.createElement("div", {
      class: "column_side_container"
    }, wp.element.createElement(InnerBlocks, {
      template: [['catpow/articlenav']],
      templateLock: false
    })), wp.element.createElement("div", {
      class: "sidebar_button"
    }))];
  },
  save: function save(_ref4) {
    var attributes = _ref4.attributes,
        className = _ref4.className,
        setAttributes = _ref4.setAttributes;
    return wp.element.createElement("div", {
      className: 'column column_side'
    }, wp.element.createElement("div", {
      class: "column_side_container"
    }, wp.element.createElement(InnerBlocks.Content, null)), wp.element.createElement("div", {
      class: "sidebar_button"
    }));
  },
  deprecated: [{
    save: function save(_ref5) {
      var attributes = _ref5.attributes,
          className = _ref5.className,
          setAttributes = _ref5.setAttributes;
      return wp.element.createElement("div", {
        className: 'column column_side'
      }, wp.element.createElement(InnerBlocks.Content, null), wp.element.createElement("div", {
        class: "sidebar_button"
      }));
    }
  }]
});
registerBlockType('catpow/maincolumn', {
  title: '🐾 MainColumn',
  icon: 'editor-code',
  category: 'catpow',
  attributes: {
    columnType: {
      type: 'string',
      default: 'main'
    }
  },
  parent: ['catpow/sidebar'],
  edit: function edit(_ref6) {
    var attributes = _ref6.attributes,
        className = _ref6.className,
        setAttributes = _ref6.setAttributes;
    return [wp.element.createElement("div", {
      className: 'column column_main'
    }, wp.element.createElement(InnerBlocks, {
      template: [['catpow/section']],
      templateLock: false
    }))];
  },
  save: function save(_ref7) {
    var attributes = _ref7.attributes,
        className = _ref7.className,
        setAttributes = _ref7.setAttributes;
    return wp.element.createElement("div", {
      className: 'column column_main'
    }, wp.element.createElement(InnerBlocks.Content, null));
  }
});
registerBlockType('catpow/articlenav', {
  title: '🐾 ArticelNav',
  icon: 'editor-ul',
  category: 'catpow',
  parent: ['catpow/sidecolumn'],
  edit: function edit(_ref8) {
    var attributes = _ref8.attributes,
        className = _ref8.className,
        setAttributes = _ref8.setAttributes,
        clientId = _ref8.clientId;
    var useEffect = wp.element.useEffect;
    var parentClientId = wp.data.select('core/block-editor').getBlockParentsByBlockName(clientId, 'catpow/sidebar')[0];
    var mainContents = wp.data.select('core/block-editor').getBlock(parentClientId).innerBlocks[0].innerBlocks;

    var getSectionTitles = function getSectionTitles(innerBlocks) {
      return innerBlocks.filter(function (block) {
        return block.name == 'catpow/section';
      }).map(function (block) {
        return block.attributes.title;
      });
    };

    return [wp.element.createElement("div", {
      className: className
    }, wp.element.createElement("ul", {
      class: "article_nav"
    }, getSectionTitles(mainContents).map(function (title) {
      return wp.element.createElement("li", null, wp.element.createElement("h3", null, wp.element.createElement(RichText.Content, {
        value: title
      })));
    })))];
  },
  save: function save(_ref9) {
    var attributes = _ref9.attributes,
        className = _ref9.className,
        setAttributes = _ref9.setAttributes;
    return wp.element.createElement("div", {
      className: className
    });
  }
});
