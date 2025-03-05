import { CP } from "./CP.jsx";
import { bem } from "catpow/util";

CP.Message = (props) => {
  const { useMemo } = wp.element;
  const classes = useMemo(() => bem("cp-message"), []);
  return (
    <div className={classes()}>
      <div className={classes._body()}>{props.children}</div>
    </div>
  );
};
