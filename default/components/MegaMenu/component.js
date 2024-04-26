(() => {
  // ../default/components/MegaMenu/component/SiteInfo.jsx
  var SiteInfo = (props) => {
    const { className = "MegaMenu-SiteInfo", item } = props;
    const { useMemo, useEffect, useCallback, useContext } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const data = useContext(DataContext);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("h1", { className: classes.title() }, /* @__PURE__ */ wp.element.createElement("a", { className: classes.title.body(), href: data.siteInfo.url }, data.siteInfo.logo ? /* @__PURE__ */ wp.element.createElement(
      "img",
      {
        className: classes.title.body.logo(),
        src: data.siteInfo.logo.src,
        width: data.siteInfo.logo.width,
        height: data.siteInfo.logo.height,
        alt: data.siteInfo.name
      }
    ) : /* @__PURE__ */ wp.element.createElement("span", { className: classes.title.body.text() }, data.siteInfo.name)), data.siteInfo.desc && /* @__PURE__ */ wp.element.createElement("span", { className: classes.title.desc() }, data.siteInfo.desc)));
  };

  // ../default/components/MegaMenu/component/MainMenu.jsx
  var MainMenu = (props) => {
    const { className = "MegaMenu-MainMenu", item } = props;
    const { useMemo, useEffect, useCallback, useContext } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const controls = useContext(ControlContext);
    const data = useContext(DataContext);
    const state = useContext(StateContext);
    const menuData = data.menu.main;
    if (!menuData || !menuData.items) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items() }, menuData.items.map((item2, index) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.items.item(), key: index }, /* @__PURE__ */ wp.element.createElement("a", { className: classes.items.item.link(), href: item2.link.url }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.items.item.link.title() }, item2.title), /* @__PURE__ */ wp.element.createElement("span", { className: classes.items.item.link.name() }, item2.name))))));
  };

  // ../default/components/MegaMenu/component/PrimaryMenu.jsx
  var PrimaryMenu = (props) => {
    const { className = "MegaMenu-PrimaryMenu", item } = props;
    const { useMemo, useEffect, useCallback, useContext } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const controls = useContext(ControlContext);
    const data = useContext(DataContext);
    const state = useContext(StateContext);
    const menuData = data.menu.primary;
    if (!menuData || !menuData.items) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items() }, menuData.items.map((item2, index) => /* @__PURE__ */ wp.element.createElement("li", { className: classes.items.item(), key: index }, /* @__PURE__ */ wp.element.createElement("a", { className: classes.items.item.link(), href: item2.url }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.items.item.link.title() }, item2.title), /* @__PURE__ */ wp.element.createElement("span", { className: classes.items.item.link.name() }, item2.name))))));
  };

  // ../default/components/MegaMenu/component/Panel.jsx
  var Panel = (props) => {
    const { className = "MegaMenu-Panel", item } = props;
    const { useMemo, useEffect, useCallback, useContext } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const data = useContext(DataContext);
    const state = useContext(StateContext);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-active": state.activeItem === item }) });
  };

  // ../default/components/MegaMenu/component/MenuButton.jsx
  var MenuButton = (props) => {
    const { className = "MegaMenu-MenuButton" } = props;
    const { useMemo, useEffect, useCallback, useContext } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), [className]);
    const { toggleMenu } = useContext(ControlContext);
    const state = useContext(StateContext);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(state.menuOpen ? "is-open" : "is-close"), onClick: toggleMenu }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.icon() }));
  };

  // ../default/components/MegaMenu/component/MegaMenu.jsx
  var ControlContext = wp.element.createContext({});
  var DataContext = wp.element.createContext({});
  var StateContext = wp.element.createContext({});
  var MegaMenu = (props) => {
    const { className = "MegaMenu" } = props;
    const { useMemo, useEffect, useCallback, useReducer } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const data = useMemo(() => {
      const allMenuItems = [];
      const initMenuItem = (menuItems, parentItem) => {
        if (menuItems && menuItems.forEach) {
          menuItems.forEach((item) => {
            if (item.children) {
              setRefToParent(item.children, item);
            }
          });
        }
      };
      if (props.menu) {
        for (const name in props.menu) {
          if (props.menu[name]) {
            initMenuItem(props.menu[name].items, props.menu[name]);
          }
        }
      }
      return { ...props, allMenuItems };
    }, [props]);
    const init = useCallback((state2) => {
      const itemStatusMap = /* @__PURE__ */ new Map();
      const currentUrlPath = location.pathname;
      data.allMenuItems.forEach((item) => {
        if (item.path === location.pathname) {
          let currentItem = item;
          while (currentItem.parent) {
            currentItem = currentItem.parent;
          }
        }
      });
      return state2;
    }, [data]);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "TOGGLE_MENU": {
          return { ...state2, menuOpen: !state2.menuOpen };
        }
        case "ACTIVATE_ITEM": {
          return { ...state2 };
        }
        case "DEACTIVATE_ITEM": {
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {}, init);
    const controls = useMemo(() => {
      const toggleMenu = () => {
        dispatch({ type: "TOGGLE_MENU" });
      };
      return { dispatch, toggleMenu };
    }, [dispatch]);
    return /* @__PURE__ */ wp.element.createElement(ControlContext.Provider, { value: controls }, /* @__PURE__ */ wp.element.createElement(DataContext.Provider, { value: data }, /* @__PURE__ */ wp.element.createElement(StateContext.Provider, { value: state }, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._contents() }, /* @__PURE__ */ wp.element.createElement(SiteInfo, null), /* @__PURE__ */ wp.element.createElement("div", { className: classes._contents.menus({ "is-open": state.menuOpen }) }, /* @__PURE__ */ wp.element.createElement(MainMenu, null), /* @__PURE__ */ wp.element.createElement(PrimaryMenu, null)), /* @__PURE__ */ wp.element.createElement(MenuButton, null)), /* @__PURE__ */ wp.element.createElement(Panel, null)))));
  };

  // ../default/components/MegaMenu/component/index.jsx
  window.Catpow.MegaMenu = MegaMenu;
})();
