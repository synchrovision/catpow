(() => {
  // ../components/InputDateTime/component.jsx
  Catpow.InputDateTime = (props) => {
    const { value, onChange, delay = 2e3, format = "Y-m-d", placeholder = "0000-00-00" } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { getDateTimeString } = Catpow.datetime;
    const { bem } = Catpow.util;
    const classes = bem("cp-inputdatetime");
    const [dateStr, setDateStr] = useState("");
    const [isValid, setIsValid] = useState(true);
    useEffect(() => {
      const date = new Date(dateStr);
      if (!isNaN(date)) {
        setIsValid(true);
        setDateStr(getDateTimeString(date, format));
      } else {
        setIsValid(false);
      }
    }, []);
    useEffect(() => {
      const timer = setTimeout(() => {
        const date = new Date(dateStr);
        if (!isNaN(date)) {
          setIsValid(true);
          setDateStr(getDateTimeString(date, format));
          onChange(date.getTime());
        } else {
          setIsValid(false);
        }
      }, delay);
      return () => clearTimeout(timer);
    }, [dateStr, onChange, delay, format]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(dateStr ? isValid ? "is-valid" : "is-invalid" : "is-empty") }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "text",
        className: classes.date(),
        placeholder,
        value: dateStr,
        onChange: (e) => {
          setDateStr(e.target.value);
        }
      }
    ));
  };
})();
