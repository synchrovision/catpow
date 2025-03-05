import { CP } from "./CP.jsx";

wp.richText.registerFormatType("catpow/ruby", {
  title: "Ruby",
  tagName: "ruby",
  className: null,
  edit({ isActive, value, onChange }) {
    const { RichTextShortcut, RichTextToolbarButton } = wp.blockEditor;
    const { toggleFormat } = wp.richText;
    const onToggle = () => {
      if (isActive) {
        return onChange(toggleFormat(value, { type: "catpow/ruby" }));
      }
      if (wp.richText.isCollapsed(value)) {
        alert(__("ルビをつけたいテキストを選択してください"));
        return;
      }
      let rt = prompt(__("ルビを入力"));
      if (rt === null) {
        return;
      }
      return onChange(
        wp.richText.insert(
          value,
          wp.richText.create({
            html:
              "<ruby>" +
              wp.richText.slice(value).text +
              "<rt>" +
              rt +
              "</rt></ruby>",
          }),
          value.start,
          value.end
        )
      );
    };

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M3.6,19.8L8.9,6.2h1.9l5.6,13.6h-2l-1.6-4.1H7l-1.5,4.1H3.6z M7.6,14.2h4.6l-1.4-3.8c-0.4-1.1-0.8-2.1-1-2.8
				c-0.2,0.9-0.4,1.7-0.7,2.6L7.6,14.2z"
        />
        <path
          d="M10.7,4.4C10.4,4.7,10.1,4.9,9.8,5C9.6,5.1,9.3,5.1,9,5.1C8.4,5.2,8,5,7.7,4.8c-0.3-0.3-0.4-0.6-0.4-1c0-0.2,0-0.4,0.2-0.6
					C7.6,3,7.7,2.8,7.9,2.7C8,2.6,8.2,2.5,8.5,2.4c0.2,0,0.4-0.1,0.7-0.1c0.7-0.1,1.1-0.2,1.4-0.3c0-0.1,0-0.2,0-0.2
					c0-0.3-0.1-0.6-0.2-0.7c-0.2-0.2-0.5-0.3-0.9-0.3C9.1,0.8,8.8,0.9,8.6,1C8.4,1.2,8.3,1.4,8.2,1.8L7.4,1.7C7.5,1.3,7.6,1,7.8,0.8
					c0.2-0.2,0.4-0.4,0.7-0.5c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.7,0,1,0.1c0.3,0.1,0.4,0.2,0.6,0.4c0.1,0.1,0.2,0.3,0.3,0.5
					c0,0.1,0,0.4,0,0.7l0,1.1c0,0.8,0,1.2,0.1,1.4c0,0.2,0.1,0.4,0.2,0.6l-0.8,0C10.8,4.9,10.7,4.7,10.7,4.4z M10.6,2.6
					C10.3,2.8,9.9,2.9,9.3,3C9,3,8.7,3.1,8.6,3.1C8.5,3.2,8.4,3.3,8.3,3.4C8.2,3.5,8.2,3.6,8.2,3.8c0,0.2,0.1,0.4,0.3,0.5
					c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0,0.6-0.1,0.8-0.2s0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8L10.6,2.6z"
        />
      </svg>
    );

    return (
      <>
        <RichTextShortcut type={"primary"} character={"r"} onUse={onToggle} />
        <RichTextToolbarButton
          icon={icon}
          title={"Ruby"}
          onClick={onToggle}
          isActive={isActive}
          shortcutType={"primary"}
          shortcutCharacter={"r"}
        />
      </>
    );
  },
});
wp.richText.registerFormatType("catpow/rt", {
  title: "RubyText",
  tagName: "rt",
  className: null,
});
wp.richText.registerFormatType("catpow/small", {
  title: "small",
  tagName: "small",
  className: null,
  edit({ isActive, value, onChange }) {
    const { RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
    const { toggleFormat } = wp.richText;
    const onToggle = () =>
      onChange(toggleFormat(value, { type: "catpow/small" }));

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M5.6,16.7l3.6-9.4h1.3l3.8,9.4H13l-1.1-2.8H8l-1,2.8H5.6z M8.3,12.9h3.2l-1-2.6C10.2,9.5,10,8.9,9.9,8.4
		C9.7,9,9.6,9.6,9.3,10.1L8.3,12.9z"
        />
      </svg>
    );

    return (
      <>
        <RichTextShortcut type={"primary"} character={"-"} onUse={onToggle} />
        <RichTextToolbarButton
          icon={icon}
          title={"small"}
          onClick={onToggle}
          isActive={isActive}
          shortcutType={"primary"}
          shortcutCharacter={"-"}
        />
      </>
    );
  },
});
wp.richText.registerFormatType("catpow/u", {
  title: "underline",
  tagName: "u",
  className: "rtf-u",
  edit({ isActive, value, onChange }) {
    const { RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
    const { toggleFormat } = wp.richText;
    const onToggle = () => onChange(toggleFormat(value, { type: "catpow/u" }));

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M6.2,12.1h7.2l2,5.2h2.6L11,0H8.5L1.9,17.3h2.4L6.2,12.1z M8.8,5.1C9.2,4,9.5,2.9,9.7,1.8C10,2.8,10.4,4,10.9,5.4l1.8,4.8
	H6.9L8.8,5.1z M20,18v2H0v-2H20z"
        />
      </svg>
    );

    return (
      <>
        <RichTextShortcut type={"primary"} character={"_"} onUse={onToggle} />
        <RichTextToolbarButton
          icon={icon}
          title={"underline"}
          onClick={onToggle}
          isActive={isActive}
          shortcutType={"primary"}
          shortcutCharacter={"_"}
        />
      </>
    );
  },
});

wp.richText.registerFormatType("catpow/title", {
  title: "Title",
  tagName: "span",
  className: "rtf-title",
  attributes: {
    type: "class",
  },
  edit(props) {
    const { isActive, value, onChange, activeAttributes, contentRef } = props;
    const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
    const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
    const { useMemo, useCallback } = wp.element;
    const { applyFormat, toggleFormat } = wp.richText;

    const onToggle = () => {
      return onChange(
        toggleFormat(value, {
          type: "catpow/title",
          attributes: { type: "iheader" },
        })
      );
    };
    const setAttributes = useCallback(
      (attr) => {
        onChange(
          applyFormat(value, {
            type: "catpow/title",
            attributes: Object.assign(activeAttributes, attr),
          })
        );
      },
      [value, activeAttributes]
    );

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <g>
          <path d="M6.9,15.9V2.6h2.7v5.2h5.3V2.6h2.7v13.3h-2.7v-5.8H9.6v5.8H6.9z" />
        </g>
        <rect x="1" y="1" width="4" height="18" />
        <rect x="5" y="18" width="14" height="1" />
      </svg>
    );

    return (
      <>
        {isActive && (
          <Popover
            anchor={contentRef.current}
            position="bottom left"
            focusOnMount={false}
          >
            <Card size="small">
              <CardBody>
                <CP.SelectButtons
                  options={[
                    { label: "header", value: "iheader" },
                    { label: "headline", value: "iheadline" },
                    { label: "catch", value: "icatch" },
                  ]}
                  selected={activeAttributes["type"]}
                  onChange={(type) => setAttributes({ type })}
                />
              </CardBody>
            </Card>
          </Popover>
        )}
        <BlockControls>
          <ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
        </BlockControls>
        <RichTextToolbarButton
          icon={icon}
          title={"Title"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});
wp.richText.registerFormatType("catpow/mark", {
  title: "Mark",
  tagName: "mark",
  className: "rtf-mark",
  attributes: {
    color: "class",
  },
  edit(props) {
    const { isActive, value, onChange, activeAttributes, contentRef } = props;
    const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
    const { BlockControls, RichTextShortcut, RichTextToolbarButton } =
      wp.blockEditor;
    const { useMemo, useCallback } = wp.element;
    const { applyFormat, toggleFormat } = wp.richText;

    const onToggle = () => {
      return onChange(
        toggleFormat(value, {
          type: "catpow/mark",
          attributes: { color: "color_0" },
        })
      );
    };
    const setAttributes = useCallback(
      (attr) => {
        onChange(
          applyFormat(value, {
            type: "catpow/mark",
            attributes: Object.assign(activeAttributes, attr),
          })
        );
      },
      [value, activeAttributes]
    );

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <polygon points="7.9,10.8 12.1,10.8 10,5.3 	" />
        <path d="M0,2v16h20V2H0z M13.7,15.3L12.5,12h-5l-1.2,3.4H4.7L9,4h1.9l4.3,11.3H13.7z" />
      </svg>
    );

    return (
      <>
        {isActive && (
          <Popover
            anchor={contentRef.current}
            position="bottom center"
            focusOnMount={false}
          >
            <Card size="small">
              <CardBody>
                <CP.ColorVarTracer target={contentRef.current}>
                  <CP.SelectThemeColor
                    onChange={(proxy) =>
                      setAttributes({ color: proxy.classes })
                    }
                    selected={activeAttributes["color"]}
                  />
                </CP.ColorVarTracer>
              </CardBody>
            </Card>
          </Popover>
        )}
        <BlockControls>
          <ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
        </BlockControls>
        <RichTextToolbarButton
          icon={icon}
          title={"Mark"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});
wp.richText.registerFormatType("catpow/large", {
  title: "Large",
  tagName: "strong",
  className: "rtf-large",
  attributes: {
    color: "class",
  },
  edit(props) {
    const { isActive, value, onChange, activeAttributes, contentRef } = props;
    const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
    const { useMemo, useCallback } = wp.element;
    const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
    const { applyFormat, toggleFormat } = wp.richText;

    const onToggle = () => {
      return onChange(
        toggleFormat(value, {
          type: "catpow/large",
          attributes: { color: "color_0" },
        })
      );
    };
    const setAttributes = useCallback(
      (attr) => {
        onChange(
          applyFormat(value, {
            type: "catpow/large",
            attributes: Object.assign(activeAttributes, attr),
          })
        );
      },
      [value, activeAttributes]
    );

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M4.8,0.5h5c1.6,0,2.8,0.1,3.6,0.4c0.8,0.2,1.5,0.7,2,1.5c0.5,0.8,0.8,2,0.8,3.6c0,1.1-0.2,1.9-0.5,2.4
		c-0.4,0.4-1.1,0.8-2.1,1c1.2,0.3,1.9,0.7,2.4,1.3c0.4,0.6,0.6,1.5,0.6,2.8v1.8c0,1.3-0.1,2.3-0.4,2.9c-0.3,0.6-0.8,1.1-1.4,1.3
		c-0.7,0.2-2,0.3-4,0.3H4.8V0.5z M9.8,3.8v4.3c0.2,0,0.4,0,0.5,0c0.5,0,0.8-0.1,0.9-0.4c0.1-0.2,0.2-0.9,0.2-2.1
		c0-0.6-0.1-1-0.2-1.3s-0.3-0.4-0.4-0.5C10.7,3.8,10.4,3.8,9.8,3.8z M9.8,11.1v5.4c0.7,0,1.2-0.1,1.4-0.3c0.2-0.2,0.3-0.7,0.3-1.5
		v-1.8c0-0.8-0.1-1.3-0.3-1.5C11.1,11.2,10.6,11.1,9.8,11.1z"
        />
      </svg>
    );

    return (
      <>
        {isActive && (
          <Popover
            anchor={contentRef.current}
            position="bottom center"
            focusOnMount={false}
          >
            <Card size="small">
              <CardBody>
                <CP.ColorVarTracer target={contentRef.current}>
                  <CP.SelectThemeColor
                    onChange={(proxy) =>
                      setAttributes({ color: proxy.classes })
                    }
                    selected={activeAttributes["color"]}
                  />
                </CP.ColorVarTracer>
              </CardBody>
            </Card>
          </Popover>
        )}
        <BlockControls>
          <ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
        </BlockControls>
        <RichTextToolbarButton
          icon={icon}
          title={"Large"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});

wp.richText.registerFormatType("catpow/tag", {
  title: "tag",
  tagName: "a",
  className: "rtf-tag",
  attributes: {
    url: "href",
    color: "class",
  },
  edit(props) {
    const {
      isActive,
      value,
      onChange,
      onFocus,
      activeAttributes,
      activeObject,
      contentRef,
    } = props;
    const { Popover, BaseControle, TextControl, Card, CardBody, ToolbarGroup } =
      wp.components;
    const { BlockControls, RichTextToolbarButton, RichTextShortcut } =
      wp.blockEditor;
    const { useState, useMemo, useCallback } = wp.element;
    const { removeFormat, applyFormat, toggleFormat, insert, create, slice } =
      wp.richText;

    const onToggle = () => {
      return onChange(
        toggleFormat(value, {
          type: "catpow/tag",
          attributes: { class: "color_0" },
        })
      );
    };
    const setAttributes = useCallback(
      (attr) => {
        onChange(
          applyFormat(value, {
            type: "catpow/tag",
            attributes: Object.assign(activeAttributes, attr),
          })
        );
      },
      [value, activeAttributes]
    );

    return (
      <>
        {isActive && (
          <Popover
            anchor={contentRef.current}
            position="bottom center"
            focusOnMount={false}
          >
            <Card>
              <CardBody>
                <TextControl
                  label="URL"
                  value={activeAttributes["url"]}
                  onChange={(url) => setAttributes({ url })}
                />
              </CardBody>
            </Card>
            <Card size="small">
              <CardBody>
                <CP.ColorVarTracer target={contentRef.current}>
                  <CP.SelectThemeColor
                    onChange={(proxy) =>
                      setAttributes({ color: proxy.classes })
                    }
                    selected={activeAttributes["color"]}
                  />
                </CP.ColorVarTracer>
              </CardBody>
            </Card>
          </Popover>
        )}
        <BlockControls>
          <ToolbarGroup
            controls={[{ icon: "tag", onClick: onToggle, isActive }]}
          />
        </BlockControls>
        <RichTextToolbarButton
          icon={"tag"}
          title={"tag"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});

wp.richText.registerFormatType("catpow/annotation", {
  title: "annotation",
  tagName: "small",
  className: "rtf-annotation",
  edit({ isActive, value, onChange }) {
    const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
    const { ToolbarGroup } = wp.components;
    const { toggleFormat } = wp.richText;

    const onToggle = () =>
      onChange(toggleFormat(value, { type: "catpow/annotation" }));

    const icon = (
      <svg
        role="img"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          d="M2.99,2.01l7.04,7.04l7.04-7.04l0.62,0.62l-7.04,7.04l7.04,7.04l-0.62,0.62l-7.04-7.04l-7.06,7.06l-0.62-0.62l7.06-7.06
		L2.37,2.62L2.99,2.01z M3.95,11.26c-0.87,0-1.6-0.73-1.6-1.6s0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6C5.55,10.58,4.78,11.26,3.95,11.26z
		 M8.43,3.58c0-0.87,0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6C9.11,5.18,8.43,4.42,8.43,3.58z M11.63,15.74
		c0,0.87-0.73,1.6-1.6,1.6s-1.6-0.73-1.6-1.6c0-0.88,0.73-1.6,1.6-1.6C10.94,14.14,11.63,14.91,11.63,15.74z M16.11,8.06
		c0.87,0,1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6c-0.88,0-1.6-0.73-1.6-1.6C14.51,8.75,15.28,8.06,16.11,8.06z"
        />
      </svg>
    );

    return (
      <>
        <BlockControls>
          <ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
        </BlockControls>
        <RichTextToolbarButton
          icon={icon}
          title={"annotation"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});

wp.richText.registerFormatType("catpow/custom", {
  title: "custom",
  tagName: "span",
  className: "rtf-custom",
  attributes: {
    vars: "style",
  },
  edit(props) {
    const {
      isActive,
      value,
      onChange,
      onFocus,
      activeAttributes,
      activeObject,
      contentRef,
    } = props;
    const {
      Popover,
      BaseControl,
      TextControl,
      RangeControl,
      Card,
      CardBody,
      ToolbarGroup,
    } = wp.components;
    const { BlockControls, RichTextToolbarButton, RichTextShortcut } =
      wp.blockEditor;
    const { useState, useMemo, useCallback, useReducer, useEffect } =
      wp.element;
    const { removeFormat, applyFormat, toggleFormat, insert, create, slice } =
      wp.richText;

    const onToggle = () => {
      return onChange(
        toggleFormat(value, {
          type: "catpow/custom",
          attributes: { vars: "font-size:1em;" },
        })
      );
    };
    const setAttributes = useCallback(
      (attr) => {
        onChange(
          applyFormat(value, {
            type: "catpow/custom",
            attributes: Object.assign(activeAttributes, attr),
          })
        );
      },
      [value, activeAttributes]
    );

    const extractStateFromVars = useCallback((vars) => {
      const state = {};
      if (!vars) {
        return state;
      }
      const map = {
        color: "color",
        "background-color": "bgcolor",
        "font-size": "size",
        "font-weight": "weight",
      };
      vars.split(";").forEach((chunk) => {
        const [key, val] = chunk.split(":");
        state[map[key]] = val;
      });
      return state;
    }, []);
    const extractVarsFromState = useCallback((state) => {
      let vars = "";
      const map = {
        color: "color:$;",
        bgcolor: "background-color:$;",
        size: "font-size:$em;",
        weight: "font-weight:$;",
      };
      Object.keys(map).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          vars += map[key].replace("$", "" + state[key]);
        }
      });
      return vars;
    }, []);
    const init = useCallback((state) => {
      if (state.vars) {
        const { vars } = state;
        return { vars, ...extractStateFromVars(vars) };
      }
      return { color: "inherit", size: 1, weight: 400, vars: "font-size:1em;" };
    }, []);
    const reducer = useCallback((state, action) => {
      if (action.hasOwnProperty("vars")) {
        const { vars } = action;
        return { vars, ...extractStateFromVars(vars) };
      } else {
        const newState = { ...state, ...action };
        newState.vars = extractVarsFromState(newState);
        return newState;
      }
    }, []);
    const [state, update] = useReducer(
      reducer,
      { vars: activeAttributes.vars },
      init
    );
    useEffect(() => {
      if (isActive) {
        onChange(
          applyFormat(value, {
            type: "catpow/custom",
            attributes: { vars: state.vars },
          })
        );
      }
    }, [state.vars]);
    useEffect(() => {
      update({ vars: activeAttributes.vars });
    }, [activeAttributes.vars]);

    return (
      <>
        {isActive && (
          <Popover
            anchor={contentRef.current}
            position="bottom center"
            focusOnMount={false}
          >
            <Card>
              <CardBody style={{ width: "20rem" }}>
                <TextControl
                  label="色"
                  onChange={(color) => update({ color })}
                  value={state.color || ""}
                />
                <TextControl
                  label="背景色"
                  onChange={(bgcolor) => update({ bgcolor })}
                  value={state.bgcolor || ""}
                />
                <RangeControl
                  label="サイズ"
                  onChange={(size) => update({ size })}
                  value={parseFloat(state.size || 1)}
                  min={0.1}
                  max={10}
                  step={0.1}
                />
                <RangeControl
                  label="太さ"
                  onChange={(weight) => update({ weight })}
                  value={parseFloat(state.weight || 400)}
                  min={100}
                  max={1000}
                  step={100}
                />
              </CardBody>
            </Card>
          </Popover>
        )}
        <BlockControls>
          <ToolbarGroup
            controls={[{ icon: "admin-generic", onClick: onToggle, isActive }]}
          />
        </BlockControls>
        <RichTextToolbarButton
          icon={"admin-generic"}
          title={"custom"}
          onClick={onToggle}
          isActive={isActive}
        />
      </>
    );
  },
});

wp.richText.registerFormatType("catpow/clear", {
  title: "clear",
  tagName: "div",
  className: null,
  edit({ isActive, value, onChange }) {
    const { RichTextToolbarButton } = wp.blockEditor;
    const { create } = wp.richText;
    return (
      <RichTextToolbarButton
        icon={"dismiss"}
        title={"🧹全てのスタイルをクリア"}
        onClick={() => onChange(create({ html: value.text }))}
        isActive={false}
      />
    );
  },
});
