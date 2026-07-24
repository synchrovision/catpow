import { clsx } from "clsx";

export const Link = (props) => {
	const { className, attributes, itemKeys, keys = {}, ...otherProps } = props;

	const item = itemKeys ? CP.getTheItem(props) : attributes;
	const href = item?.[keys?.href] || "";
	const target = href.indexOf("://") !== -1 ? "_brank" : null;

	return (
		<a className={className} href={href} target={target} rel={target && "noopener"} {...otherProps}>
			{props.children}
		</a>
	);
};
Link.Edit = (props) => {
	const { className, setAttributes, attributes, itemKeys, keys = {}, isSelected = "auto", ...otherProps } = props;
	const { useMemo, useEffect, useState } = wp.element;

	const item = useMemo(() => (itemKeys ? CP.getTheItem(props) : attributes) || {}, [attributes, itemKeys]);

	const [hasSelection, setHasSelection] = useState(false);
	const [ref, setRef] = useState(false);
	const [popoverRef, setPopoverRef] = useState(false);

	useEffect(() => {
		if (!ref) {
			return;
		}
		const updateHasSelection = () => {
			setHasSelection(ref.ownerDocument.getSelection().containsNode(ref, true));
		};
		ref.ownerDocument.addEventListener("selectionchange", updateHasSelection);

		return () => {
			ref.ownerDocument.removeEventListener("selectionchange", updateHasSelection);
		};
	}, [ref, setHasSelection]);
	const states = { "is-selected": isSelected === "auto" ? hasSelection : isSelected };

	return (
		<CP.Bem>
			<span className={clsx("cp-link", className, states)} {...otherProps} ref={setRef}>
				{props.children}
				<div className="_popover" container=".editor-visual-editor" inert={!hasSelection} ref={setPopoverRef}>
					<div className="_box">
						<div
							className={clsx("_input", states)}
							contentEditable="plaintext-only"
							suppressContentEditableWarning={true}
							onBlur={(e) => {
								const href = e.target.textContent;
								if (itemKeys) {
									const targetItem = CP.getTheItem(props);
									if (!targetItem) {
										return;
									}
									Object.assign(targetItem, { [keys.href]: href });
									CP.saveItem(props);
								} else {
									setAttributes({ [keys.href]: href });
								}
							}}
						>
							{item[keys.href] || ""}
						</div>
					</div>
				</div>
			</span>
		</CP.Bem>
	);
};
