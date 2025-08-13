(() => {
  // ../components/Finder/Message/component.jsx
  Catpow.Finder.Message = (props) => {
    const { callback } = props;
    const { useState, useCallback, useMemo, useEffect, useContext } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const { message, showMessage } = state;
    return /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: showMessage, onClose: () => dispatch({ type: "hideMessage" }), closeButton: true }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-message" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-message__body" }, message)));
  };
})();
