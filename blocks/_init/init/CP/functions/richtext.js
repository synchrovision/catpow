export const getSelecedFormatElement = () => {
	const sel = window.getSelection();
	if (!sel.rangeCount) return null;
	const con = sel.getRangeAt(0).startContainer;
	return con.nextElementSibling || con.parentElement;
};
