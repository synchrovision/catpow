import { CP } from "./CP.jsx";

CP.DataStructure = (props) => {
  return <ul className="cp-datastructure">{props.children}</ul>;
};
CP.DataStructureItem = (props) => {
  const { useState } = wp.element;
  const [open, setOpen] = useState(false);
  return (
    <li
      className={
        "item " +
        (props.children
          ? "hasChildren " + (open ? "open" : "close")
          : "noChildren")
      }
    >
      <h5 className="title" onClick={() => setOpen(!open)}>
        {props.title}
        {undefined !== props.name && <span className="name">{props.name}</span>}
      </h5>
      {!!open && !!props.children && (
        <div className="children">{props.children}</div>
      )}
    </li>
  );
};
