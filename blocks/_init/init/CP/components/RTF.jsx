import { bem, rtf } from "catpow/util";
import { Portal } from "catpow/component";

export const RTF = (props) => {
	const { className, pref = "cp-rtf", level = 3, attributes, itemKeys, keys = { text: "text" }, ...otherProps } = props;
	const item = (itemKeys ? CP.getTheItem(props) : attributes) || {};
	const text = item[keys.text] || "";
	return <div className={className} {...otherProps} dangerouslySetInnerHTML={{ __html: rtf(text, pref, level) }} />;
};
RTF.Edit = (props) => {
	const { className, pref = "cp-rtf", level = 3, setAttributes, attributes, itemKeys, keys = { text: "text" }, isSelected = true, ...otherProps } = props;
	const { useMemo, useCallback, useState } = wp.element;
	const classes = useMemo(() => bem("cp-rtf " + className), [className]);

	const item = useMemo(() => (itemKeys ? CP.getTheItem(props) : attributes) || {}, [attributes, itemKeys]);
	const text = item[keys.text] || "";
	const updateText = useCallback(
		(text) => {
			if (itemKeys) {
				const targetItem = CP.getTheItem(props);
				if (!targetItem) {
					return;
				}
				Object.assign(targetItem, { [keys.text]: text });
				CP.saveItem(props);
			} else {
				setAttributes({ [keys.text]: text });
			}
		},
		[setAttributes, attributes, itemKeys, keys],
	);
	const editorFunction = useCallback(
		(e) => {
			if (e.key === "Tab") {
				const text = e.target.value;
				const lineStart = Math.max(0, text.slice(0, e.currentTarget.selectionStart).lastIndexOf("\n"));
				const lineEnd = e.currentTarget.selectionEnd + Math.max(0, text.slice(e.currentTarget.selectionEnd).indexOf("\n"));
				let targetText = text.slice(lineStart, lineEnd);
				if (e.shiftKey) {
					targetText = targetText.replaceAll("\n\t", "\n");
				} else {
					targetText = targetText.replaceAll("\n", "\n\t");
				}
				e.target.value = text.slice(0, lineStart) + targetText + text.slice(lineEnd);
				e.target.setSelectionRange(lineStart ? lineStart + 1 : 0, lineStart + targetText.length);
				updateText(e.target.value);
				e.preventDefault();
			}
		},
		[updateText],
	);
	const [savedText, setSavedText] = useState(text);
	const [isActive, setIsActive] = useState(false);

	return (
		<>
			<div className={classes({ "is-active": isSelected && isActive })} onClick={() => setIsActive(!isActive)} {...otherProps} dangerouslySetInnerHTML={{ __html: rtf(text, pref) }} />
			<Portal id="EditRTF">
				<div className={classes.portal({ "is-active": isSelected && isActive })}>
					<div className={classes.portal.preview()} dangerouslySetInnerHTML={{ __html: rtf(text, pref, level) }} />
					<div className={classes.portal.input()}>
						<textarea
							className={classes.portal.input.edit()}
							value={text}
							onKeyDown={editorFunction}
							onChange={(e) => {
								updateText(e.target.value);
							}}
						/>
						<div className={classes.portal.input.buttons()}>
							<div className={classes.portal.input.buttons.button("is-reset")} onClick={() => updateText(savedText)}>
								Reset
							</div>
							<div
								className={classes.portal.input.buttons.button("is-save")}
								onClick={() => {
									setSavedText(text);
									setIsActive(false);
								}}
							>
								Save
							</div>
						</div>
					</div>
				</div>
			</Portal>
		</>
	);
};
