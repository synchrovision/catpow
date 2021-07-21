/**
* Finderの表示項目を絞り込みするコンポーネント
*/
Catpow.Finder.FilterControl = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useContext = _wp$element.useContext;
  var __ = wp.i18n.__;

  var _useContext = useContext(Catpow.FinderContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var _useState = useState(false),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var cols = state.index.cols;
  return wp.element.createElement("div", {
    className: "FinderControl FinderFilterControl"
  }, wp.element.createElement("ul", {
    className: "items"
  }, wp.element.createElement("li", {
    className: 'item' + (Object.keys(state.query).length ? ' active' : '')
  }, wp.element.createElement("div", {
    className: "icon dashicons dashicons-filter",
    onClick: function onClick() {
      return setOpen(!open);
    }
  }), wp.element.createElement(Catpow.Popover, {
    open: open
  }, wp.element.createElement("table", {
    className: "FinderFilterControl__table"
  }, Object.keys(state.index.cols).map(function (key) {
    var col = state.index.cols[key];

    if (col.role === 'group') {
      return wp.element.createElement("tr", {
        className: "row"
      }, wp.element.createElement("th", {
        className: "label"
      }, col.label), wp.element.createElement("td", {
        className: "inputs"
      }, Object.keys(col.dict).map(function (val) {
        var isActive = state.query[key] && state.query[key].indexOf(val) !== -1;
        return wp.element.createElement(Catpow.CheckBox, {
          label: col.dict[val],
          selected: isActive,
          onChange: function onChange(selected) {
            return dispatch({
              type: (selected ? 'add' : 'remove') + 'Query',
              key: key,
              val: val
            });
          }
        });
      })));
    }

    return false;
  }))))));
};
