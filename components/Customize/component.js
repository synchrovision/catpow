(() => {
  // components/Customize/component.jsx
  Catpow.Customize = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const { id, type = "Text", param } = props;
    const [value, setValue] = useState(null);
    useEffect(() => {
      wp.customize(id, (setting) => {
        setValue(setting.get());
      });
    }, [id]);
    const onChange = useCallback((value2) => {
      setValue(value2);
      wp.customize.control(id).setting.set(value2);
    }, [id]);
    if (value === null) {
      return false;
    }
    if (!(type in Catpow.Customize)) {
      console.error(`Catpow.Customize.${type} was not found`);
      return false;
    }
    return wp.element.createElement(Catpow.Customize[type], { id, value, onChange, param });
  };
})();
