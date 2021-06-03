Catpow.Finder.SearchResults = function (props) {
  var _wp$element = wp.element,
      useContext = _wp$element.useContext,
      useCallback = _wp$element.useCallback,
      el = _wp$element.createElement,
      Fragment = _wp$element.Fragment;
  var __ = wp.i18n.__;

  var _useContext = useContext(Catpow.FinderContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch,
      info = _useContext.info;

  var roleGroups = info.roleGroups;
  var flagsToWords = useCallback(function (classes) {
    return Object.keys(classes).filter(function (key) {
      return classes[key];
    }).join(' ');
  }, []);
  var hasRoleGroup = useCallback(function (group) {
    return !roleGroups[group].every(function (role) {
      return !state.colsToShowByRole[role] || !state.colsToShowByRole[role].length;
    });
  }, [state.colsToShowByRole, roleGroups]);
  var ucfirst = useCallback(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, []);
  var ListView = props.listView || useCallback(function (_ref) {
    var state = _ref.state,
        info = _ref.info;
    var colsToShowByRole = state.colsToShowByRole;
    var flags = {
      list: true
    };
    Object.keys(info.roleGroups).map(function (group) {
      flags['has' + ucfirst(group)] = hasRoleGroup(group);
    });
    return wp.element.createElement("ul", {
      className: flagsToWords(flags)
    }, state.itemsInPage.map(function (row) {
      return wp.element.createElement("li", {
        className: 'item' + (row._selected ? ' selected' : ''),
        key: 'row' + row._id
      }, wp.element.createElement("div", {
        className: "contents"
      }, wp.element.createElement("div", {
        className: "control"
      }, wp.element.createElement(Catpow.CheckBox, {
        selected: row._selected,
        onChange: function onChange(selected) {
          return dispatch({
            type: selected ? 'selectRow' : 'deselectRow',
            row: row
          });
        }
      })), flags.hasImages && wp.element.createElement("div", {
        className: "images"
      }, roleGroups.images.map(function (role) {
        if (!colsToShowByRole[role] || !colsToShowByRole[role].length) {
          return false;
        }

        return colsToShowByRole[role].map(function (col) {
          return wp.element.createElement(Catpow.Output, babelHelpers.extends({
            conf: col
          }, row[col.name]));
        });
      })), wp.element.createElement("div", {
        class: "texts"
      }, Object.keys(roleGroups).map(function (group) {
        if (!hasRoleGroup(group) || group === 'images') {
          return false;
        }

        return wp.element.createElement("div", {
          className: group
        }, roleGroups[group].map(function (role) {
          if (!colsToShowByRole[role] || !colsToShowByRole[role].length) {
            return false;
          }

          return colsToShowByRole[role].map(function (col) {
            return wp.element.createElement(Catpow.Output, babelHelpers.extends({
              conf: col
            }, row[col.name]));
          });
        }));
      }), wp.element.createElement("div", {
        className: "focus",
        onClick: function onClick() {
          return dispatch({
            type: 'focusItem',
            row: row
          });
        }
      }, __('詳細を見る', 'catpow')))));
    }), babelHelpers.toConsumableArray(Array(10).keys()).map(function (i) {
      return wp.element.createElement("li", {
        className: "spacer",
        key: 'spacer' + i
      });
    }));
  }, []);
  var TableView = props.tableView || useCallback(function (_ref2) {
    var state = _ref2.state;
    return wp.element.createElement("table", {
      className: "table"
    }, wp.element.createElement("thead", {
      className: "header"
    }, wp.element.createElement("tr", {
      className: "row"
    }, wp.element.createElement("th", {
      className: "control"
    }, wp.element.createElement(Catpow.CheckBox, {
      selected: state.itemsInPage.every(function (item) {
        return item._selected;
      }),
      onChange: function onChange(selected) {
        return dispatch({
          type: selected ? 'selectAllRowsInPage' : 'deselectAllRowsInPage'
        });
      }
    })), wp.element.createElement("th", {
      className: "focus"
    }), state.colsToShow.map(function (col) {
      return wp.element.createElement("th", {
        className: "cell"
      }, col.label);
    }))), wp.element.createElement("tbody", {
      className: "body"
    }, state.itemsInPage.map(function (row) {
      return wp.element.createElement("tr", {
        className: "row" + (row._selected ? ' selected' : ''),
        key: 'row' + row._id
      }, wp.element.createElement("th", {
        className: "control"
      }, wp.element.createElement(Catpow.CheckBox, {
        selected: row._selected,
        onChange: function onChange(selected) {
          return dispatch({
            type: selected ? 'selectRow' : 'deselectRow',
            row: row
          });
        }
      })), wp.element.createElement("th", {
        className: "focus"
      }, wp.element.createElement("div", {
        className: "icon dashicons dashicons-admin-page",
        onClick: function onClick() {
          return dispatch({
            type: 'focusItem',
            row: row
          });
        }
      })), state.colsToShow.map(function (col) {
        return wp.element.createElement("td", {
          className: "cell"
        }, wp.element.createElement(Catpow.Output, babelHelpers.extends({
          conf: col
        }, row[col.name])));
      }));
    })));
  }, [props]);
  return wp.element.createElement("div", {
    className: "FinderSearchResults"
  }, wp.element.createElement(Catpow.Transition, {
    type: state.transition
  }, state.items.length > 0 ? wp.element.createElement("div", {
    className: "FinderSearchResultsItems " + state.layout + "-view",
    depth: 1,
    page: state.page,
    view: state.layout
  }, el(state.layout === 'table' ? TableView : ListView, {
    state: state,
    dispatch: dispatch,
    info: info
  })) : wp.element.createElement("div", {
    className: "message",
    depth: 1,
    page: 1,
    view: 'message'
  }, __('検索結果なし', 'catpow'))));
};
