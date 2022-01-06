/**
* Finderの１ページあたりの表示件数を変更
*/
Catpow.Finder.PerPage = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useContext = _wp$element.useContext;
  var __ = wp.i18n.__;

  var _useContext = useContext(Catpow.FinderContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var onChange = useCallback(function (e) {
    var itemsPerPage = Math.max(1, parseInt(e.currentTarget.value));
    dispatch({
      type: 'setItemsPerPage',
      itemsPerPage: itemsPerPage
    });
  }, [dispatch]);
  return wp.element.createElement("div", {
    className: "FinderControl FinderPerPage"
  }, wp.element.createElement("ul", {
    className: "items"
  }, wp.element.createElement("li", {
    className: "item"
  }, wp.element.createElement("div", {
    className: "inputs"
  }, wp.element.createElement("input", {
    type: "number",
    value: state.itemsPerPage,
    min: "1",
    max: "1000",
    onChange: onChange
  }), __('件/頁', 'catpow')))));
};
