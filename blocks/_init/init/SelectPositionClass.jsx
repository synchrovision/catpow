import { CP } from "./CP.jsx";

CP.SelectPositionClass = (props) => {
  const { BaseControl } = wp.components;
  const rows = [
    ["topLeft", "top", "topRight"],
    ["left", "center", "right"],
    ["bottomLeft", "bottom", "bottomRight"],
  ];
  const values = _.flatten(rows);
  const { label, help, itemsKey, index, disable } = props;
  let value = itemsKey
    ? CP.getItemSelectiveClass(props, values)
    : CP.getSelectiveClass(props, values);

  return (
    <BaseControl label={label} help={help}>
      <table className="cp-selectposition">
        <tbody>
          {rows.map((cols, index) => (
            <tr key={index}>
              {cols.map((col) => {
                var isChecked = value == col;
                if (disable && disable.includes(col)) {
                  return (
                    <td className="disable" key={col}>
                      {" "}
                    </td>
                  );
                }
                return (
                  <td
                    className={isChecked ? "active" : ""}
                    onClick={() => {
                      if (itemsKey) {
                        CP.switchItemSelectiveClass(
                          props,
                          values,
                          col,
                          props.key
                        );
                      } else {
                        CP.switchSelectiveClass(props, values, col, props.key);
                      }
                    }}
                    key={col}
                  >
                    {" "}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </BaseControl>
  );
};
