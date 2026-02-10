import { clsx } from "clsx";
import { Portal } from "catpow/component";

export const Link = (props) => {
	const { className, attr, keys, index, ...otherProps } = props;

	const item = keys.items ? attr[keys.items][index] : attr;
	const href = item[keys.href] || "";
	const target = href.indexOf("://") !== -1 ? "_brank" : null;

	return (
		<a className={className} href={href} target={target} rel={target && "noopener"} {...otherProps}>
			{props.children}
		</a>
	);
};
Link.Edit = (props) => {
	const { className, set, attr, keys, index, isSelected = "auto", ...otherProps } = props;
	const { useMemo, useEffect, useState } = wp.element;

	const item = useMemo(() => (keys.items ? attr[keys.items][index] : attr), [attr, keys.items, index]);

	const [hasSelection, setHasSelection] = useState(false);
	const [ref, setRef] = useState(false);
	const [portalBoxRef, setPortalBoxRef] = useState(false);

	useEffect(() => {
		if (!ref || !portalBoxRef) {
			return;
		}
		const updateHasSelection = () => {
			if (ref.ownerDocument.getSelection().containsNode(ref, true)) {
				tracePosition();
				setHasSelection(true);
				ref.ownerDocument.addEventListener("scroll", tracePosition);
			} else {
				setHasSelection(false);
				ref.ownerDocument.removeEventListener("scroll", tracePosition);
			}
		};
		const tracePosition = () => {
			const bnd1 = ref.getBoundingClientRect();
			portalBoxRef.style.setProperty("top", bnd1.top + "px");
			portalBoxRef.style.setProperty("left", bnd1.left + "px");
			portalBoxRef.style.setProperty("width", bnd1.width + "px");
			portalBoxRef.style.setProperty("height", bnd1.height + "px");
		};
		ref.ownerDocument.addEventListener("selectionchange", updateHasSelection);
		portalBoxRef.ownerDocument.addEventListener("selectionchange", updateHasSelection);

		return () => {
			ref.ownerDocument.removeEventListener("selectionchange", updateHasSelection);
			portalBoxRef.ownerDocument.removeEventListener("selectionchange", updateHasSelection);
		};
	}, [ref, portalBoxRef, setHasSelection]);

	const states = { "is-selected": isSelected === "auto" ? hasSelection : isSelected };

	return (
		<CP.Bem>
			<span className={clsx("cp-link", className, states)} {...otherProps} ref={setRef}>
				{props.children}
				<Portal id="cp-link" className="_portal" container=".editor-visual-editor">
					<div className="_box" ref={setPortalBoxRef}>
						<div
							className={clsx("_input", states)}
							contentEditable="plaintext-only"
							suppressContentEditableWarning={true}
							onBlur={(e) => {
								const href = e.target.textContent;
								if (keys.items) {
									Object.assign(attr[keys.items][index], { [keys.href]: href });
									set({ [keys.items]: JSON.parse(JSON.stringify(attr[keys.items])) });
								} else {
									set({ [keys.href]: href });
								}
							}}
						>
							{item[keys.href] || ""}
						</div>
					</div>
				</Portal>
			</span>
		</CP.Bem>
	);
};
