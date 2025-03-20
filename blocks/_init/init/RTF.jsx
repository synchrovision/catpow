import { CP } from "./CP.jsx";
import { bem, rtf } from "catpow/util";
import { Portal } from "catpow/component";

CP.RTF = (props) => {
	const { className, pref = "rtf", attr, keys = { text: "text" }, index, ...otherProps } = props;
	const item = keys.items ? attr[keys.items][index] : attr;
	const text = item[keys.text] ? item[keys.text] : "";
	return <div className={className} {...otherProps} dangerouslySetInnerHTML={{ __html: rtf(text, pref) }} />;
};
CP.RTF.Edit = (props) => {
	const { className, pref = "rtf", set, attr, keys = { text: "text" }, index, isSelected = true, ...otherProps } = props;
	const { useMemo, useCallback, useState } = wp.element;
	const classes = useMemo(() => bem("cp-rtf " + className), [className]);

	const item = useMemo(() => (keys.items ? attr[keys.items][index] : attr), [attr, keys.items, index]);
	const text = item[keys.text];
	const updateText = useCallback(
		(text) => {
			if (keys.items) {
				Object.assign(attr[keys.items][index], { [keys.text]: text });
				set({ [keys.items]: JSON.parse(JSON.stringify(attr[keys.items])) });
			} else {
				set({ [keys.text]: text });
			}
		},
		[set, attr, keys]
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
		[updateText]
	);
	const [savedText, setSavedText] = useState(text);
	const [isActive, setIsActive] = useState(false);

	return (
		<>
			<div className={classes({ "is-active": isSelected && isActive })} onClick={() => setIsActive(!isActive)} {...otherProps} dangerouslySetInnerHTML={{ __html: rtf(item.text, pref) }} />
			<Portal id="EditRTF">
				<div className={classes.portal({ "is-active": isSelected && isActive })}>
					<div className={classes.portal.preview()} dangerouslySetInnerHTML={{ __html: rtf(item.text, pref) }} />
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
