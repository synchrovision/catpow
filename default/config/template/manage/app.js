var app = function app(props) {
  var useCallback = wp.element.useCallback;
  var App = useCallback(function (props) {
    var _wp$element = wp.element,
        useContext = _wp$element.useContext,
        useCallback = _wp$element.useCallback,
        Fragment = _wp$element.Fragment;
    var _Catpow$Finder = Catpow.Finder,
        Nav = _Catpow$Finder.Nav,
        Spacer = _Catpow$Finder.Spacer,
        Main = _Catpow$Finder.Main,
        SelectLayout = _Catpow$Finder.SelectLayout,
        SelectColumns = _Catpow$Finder.SelectColumns,
        BulkControl = _Catpow$Finder.BulkControl,
        FilterControl = _Catpow$Finder.FilterControl,
        Download = _Catpow$Finder.Download,
        PerPage = _Catpow$Finder.PerPage,
        Status = _Catpow$Finder.Status,
        SearchResults = _Catpow$Finder.SearchResults,
        Focused = _Catpow$Finder.Focused,
        Pagenate = _Catpow$Finder.Pagenate;

    var _useContext = useContext(Catpow.FinderContext),
        state = _useContext.state,
        dispatch = _useContext.dispatch,
        info = _useContext.info;

    return wp.element.createElement(Catpow.Transition, null, state.wait ? wp.element.createElement(Fragment, {
      depth: 0
    }, wp.element.createElement(Catpow.Spinner, null)) : state.focused ? wp.element.createElement(Fragment, {
      depth: 2
    }, wp.element.createElement("div", {
      className: "icon dashicons dashicons-arrow-left-alt",
      onClick: function onClick() {
        return dispatch({
          type: 'blurItem'
        });
      }
    }), wp.element.createElement(Focused, null)) : wp.element.createElement(Fragment, {
      depth: 1
    }, wp.element.createElement(Nav, null, wp.element.createElement(BulkControl, null), wp.element.createElement(SelectLayout, null), wp.element.createElement(SelectColumns, null), wp.element.createElement(FilterControl, null), wp.element.createElement(Download, null), wp.element.createElement(Spacer, null), wp.element.createElement(PerPage, null), wp.element.createElement(Status, null)), wp.element.createElement(Main, null, wp.element.createElement(SearchResults, null)), wp.element.createElement(Pagenate, null)));
  }, []);
  return wp.element.createElement(Catpow.Finder, props, wp.element.createElement(App, null));
};
