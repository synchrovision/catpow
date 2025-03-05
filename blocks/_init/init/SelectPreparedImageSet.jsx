import { CP } from "./CP.jsx";

CP.SelectPreparedImageSet = ({
  className,
  name,
  value,
  color = 0,
  onChange,
  ...otherProps
}) => {
  const { getURLparam, setURLparam, setURLparams, removeURLparam } =
    Catpow.util;
  const [state, dispatch] = wp.element.useReducer(
    (state, action) => {
      switch (action.type) {
        case "update": {
          const newState = { ...state };
          if (action.imagesets) {
            newState.imagesets = action.imagesets;
            const bareURL = removeURLparam(value, "c");
            for (const key in newState.imagesets) {
              if (newState.imagesets[key].url === bareURL) {
                newState.imageset = {
                  ...newState.imagesets[key],
                  url: setURLparams(bareURL, { c: color, theme: wpinfo.theme }),
                };
                break;
              }
            }
          }
          if (action.imageset) {
            newState.imageset = action.imageset;
          }
          if (newState.imageset) {
            onChange(
              newState.imageset.map((item) => {
                return {
                  ...item,
                  url: setURLparams(item.url, {
                    c: color,
                    theme: wpinfo.theme,
                  }),
                };
              })
            );
          }
          return newState;
        }
      }
      return state;
    },
    { page: 0, imagesets: null, imageset: null }
  );

  CP.cache.PreparedImageSets = CP.cache.PreparedImageSets || {};

  if (state.imagesets === null) {
    if (CP.cache.PreparedImageSets[name]) {
      dispatch({ type: "update", imagesets: CP.cache.PreparedImageSets[name] });
    } else {
      wp.apiFetch({ path: "cp/v1/imageset/" + name }).then((imagesets) => {
        CP.cache.PreparedImageSets[name] = imagesets;
        dispatch({ type: "update", imagesets });
      });
    }
    return false;
  }
  return (
    <ul
      className={"cp-selectpreparedimageset " + name + " " + className}
      {...otherProps}
    >
      {Object.keys(state.imagesets).map((key) => {
        const imageset = state.imagesets[key];
        const url = setURLparams(imageset[0].url, {
          c: color,
          theme: wpinfo.theme,
        });
        return (
          <li className={"item " + (value == url ? "active" : "")} key={key}>
            <img
              src={url}
              alt={imageset[0].alt}
              onClick={() => dispatch({ type: "update", imageset })}
            />
          </li>
        );
      })}
    </ul>
  );
};
