import { CP } from "./CP.jsx";
import { bem } from "catpow/util";

CP.BoundingBox = (props) => {
  const { targets, onDeselect, onDuplicate, onDelete, onChange } = props;
  const { useState, useCallback, useMemo, useEffect, useRef } = wp.element;
  const classes = useMemo(() => bem("cp-boundingbox"), []);
  const ref = useRef();
  const [style, setStyle] = useState({});
  const [action, setAction] = useState(false);
  const container = useMemo(
    () => props.container || document,
    [props.container]
  );

  const tracePosition = useCallback(
    (targets) => {
      const cBnd = container.getBoundingClientRect();
      const bnd =
        targets.length === 1
          ? targets[0].getBoundingClientRect()
          : targets.reduce((bnd, target) => {
              const crrBnd = target.getBoundingClientRect();
              if (bnd === false) {
                return crrBnd;
              }
              return {
                left: Math.min(bnd.left, crrBnd.left),
                right: Math.max(bnd.right, crrBnd.right),
                top: Math.min(bnd.top, crrBnd.top),
                bottom: Math.max(bnd.bottom, crrBnd.bottom),
              };
            }, false);
      setStyle({
        position: "absolute",
        left: bnd.left - cBnd.left + "px",
        top: bnd.top - cBnd.top + "px",
        width: bnd.right - bnd.left + "px",
        height: bnd.bottom - bnd.top + "px",
      });
    },
    [container]
  );
  const getRelBnd = useCallback(
    (el) => {
      const bnd1 = container.getBoundingClientRect();
      const bnd2 = el.getBoundingClientRect();
      return {
        ...bnd2,
        left: bnd2.left - bnd1.left,
        right: bnd2.right - bnd1.left,
        top: bnd2.top - bnd1.top,
        bottom: bnd2.bottom - bnd1.top,
      };
    },
    [container]
  );

  const observer = useMemo(() => {
    return new MutationObserver((mutations) => {
      tracePosition(targets);
    });
  }, [tracePosition, targets]);

  useEffect(() => {
    if (!targets.length) {
      return;
    }
    tracePosition(targets);
    targets.forEach((target) => {
      observer.observe(target, {
        attributes: true,
        attributeFilter: ["style"],
      });
    });
    return () => observer.disconnect();
  }, [targets, observer]);
  useEffect(() => {
    if (!targets.length) {
      return;
    }
    tracePosition(targets);
    const cb = () => tracePosition(targets);
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, [targets, props.viewMode]);
  useEffect(() => {
    if (!onDeselect) {
      return;
    }
    const cb = (e) => {
      if (ref.current && !e.shiftKey) {
        const bnd = ref.current.getBoundingClientRect();
        const { clientX: x, clientY: y } = e;
        if (x < bnd.left || x > bnd.right || y < bnd.top || y > bnd.bottom) {
          onDeselect();
        }
      }
    };
    container.addEventListener("click", cb);
    return () => container.removeEventListener("click", cb);
  }, [targets, container, onDeselect]);
  useEffect(() => {
    if (!onDelete) {
      return;
    }
    const cb = (e) => {
      if (
        e.isComposing ||
        e.target.nodeName === "INPUT" ||
        e.target.nodeName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }
      if (e.key === "Backspace") {
        onDelete(targets);
      }
    };
    document.addEventListener("keydown", cb);
    return () => document.removeEventListener("keydown", cb);
  }, [targets, onDelete]);

  const controls = useMemo(() => {
    const controls = [];
    ["top", "middle", "bottom"].forEach((v, vi) => {
      ["left", "center", "right"].forEach((h, hi) => {
        const isMove = vi === 1 && hi === 1;
        const d = isMove
          ? "move"
          : vi === 1
          ? "ew"
          : hi === 1
          ? "ns"
          : vi === hi
          ? "nwse"
          : "nesw";
        controls.push({
          className: [
            isMove ? "is-position-control" : "is-size-control",
            "is-" + v,
            "is-" + h,
            "is-" + d,
          ],
          action: isMove ? "move" : "resize",
          flags: (hi << 2) | vi,
        });
      });
    });
    return controls;
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      const control = e.target.closest("[data-control-action]");
      if (!control) {
        return setAction(false);
      }
      const action = control.dataset.controlAction;
      const flags = parseInt(control.dataset.controlFlags);
      if (onDuplicate && e.altKey && action === "move") {
        onDuplicate(targets);
      }
      targets.forEach((target) => {
        target.style.animation = "none";
        target.style.transition = "none";
      });
      const orgBnd = ref.current.getBoundingClientRect();
      const ox = orgBnd.right - ((flags & 12) / 8) * orgBnd.width;
      const oy = orgBnd.bottom - ((flags & 3) / 2) * orgBnd.height;
      if (action === "resize") {
        targets.forEach((target) => {
          const bnd = target.getBoundingClientRect();
          target.style["transform-origin"] = `${ox - bnd.left}px ${
            oy - bnd.top
          }px`;
        });
      }
      setAction({
        action,
        flags,
        org: { x: e.clientX, y: e.clientY, ox, oy },
        orgBnd,
        keepAspect: e.shiftKey,
        keepCenter: e.altKey,
        targets,
      });
    },
    [ref, targets, onDuplicate]
  );
  const onMouseMove = useCallback(
    (e) => {
      if (!action) {
        return;
      }
      const dx = e.clientX - action.org.x;
      const dy = e.clientY - action.org.y;
      if (action.action === "move") {
        targets.forEach((target, index) => {
          target.style.transform = `translate(${dx}px,${dy}px)`;
        });
      } else if (action.action === "resize") {
        let s;
        const sx = Math.abs(e.clientX - action.org.ox) / action.orgBnd.width;
        const sy = Math.abs(e.clientY - action.org.oy) / action.orgBnd.height;
        if (action.flags & 1) {
          s = action.keepAspect ? `scale(${sx})` : `scaleX(${sx})`;
        } else if (action.flags & 4) {
          s = action.keepAspect ? `scale(${sy})` : `scaleY(${sy})`;
        } else {
          s = action.keepAspect
            ? `scale(${Math.min(sx, sy)})`
            : `scale(${sx},${sy})`;
        }
        targets.forEach((target, index) => {
          target.style.transform = s;
        });
      }
    },
    [action]
  );
  const onMouseUp = useCallback(
    (e) => {
      if (onChange) {
        onChange(action.targets);
      }
      action.targets.map((target) => {
        target.style.animation = "";
        target.style.transition = "";
        target.style.transform = "";
        target.style["transform-origin"] = "";
      });
      setAction(false);
    },
    [action, onChange]
  );
  const onDoubleClick = useCallback(
    (e) => {
      targets.forEach((target) => {
        target.style.height = "auto";
        target.style.height = window.getComputedStyle(target).height + "px";
      });
      if (onChange) {
        onChange(targets);
      }
    },
    [targets, onChange]
  );

  if (!targets.length) {
    return false;
  }
  return (
    <div
      className={classes({ "is-doing-action": !!action })}
      style={style}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
    >
      <div className={classes.controls()}>
        {controls.map((props, i) => (
          <span
            className={classes.controls.control(props.className)}
            data-control-action={props.action}
            data-control-flags={props.flags}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
